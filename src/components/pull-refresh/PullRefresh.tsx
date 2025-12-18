import React from 'react'
import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import { usePullRefreshTokens } from './tokens'
import type { PullRefreshProps, PullRefreshStatus, PullRefreshStatusText } from './types'

const DEFAULT_SUCCESS_DURATION = 500

const PullRefresh = React.forwardRef<ScrollView, PullRefreshProps>((props, ref) => {
  const {
    children,
    onRefresh,
    refreshing,
    defaultRefreshing,
    pullingText,
    loosingText,
    loadingText,
    successText = '刷新成功',
    successDuration,
    animationDuration,
    headHeight,
    pullDistance,
    disabled = false,
    style,
    ...scrollProps
  } = props

  const locale = useLocale()
  const tokens = usePullRefreshTokens()
  const headHeightNumber = React.useMemo(() => {
    const raw = typeof headHeight === 'undefined' ? tokens.sizing.headHeight : headHeight
    if (typeof raw === 'number') return raw
    const parsed = Number.parseFloat(raw)
    return Number.isFinite(parsed) ? parsed : tokens.sizing.headHeight
  }, [headHeight, tokens.sizing.headHeight])

  const pullDistanceNumber = React.useMemo(() => {
    if (typeof pullDistance === 'undefined') return headHeightNumber
    if (typeof pullDistance === 'number') return pullDistance
    const parsed = Number.parseFloat(pullDistance)
    return Number.isFinite(parsed) ? parsed : headHeightNumber
  }, [headHeightNumber, pullDistance])

  const successDurationMs = React.useMemo(() => {
    if (typeof successDuration === 'undefined') return DEFAULT_SUCCESS_DURATION
    if (typeof successDuration === 'number') return successDuration
    const parsed = Number.parseFloat(successDuration)
    return Number.isFinite(parsed) ? parsed : DEFAULT_SUCCESS_DURATION
  }, [successDuration])

  const animationDurationMs = React.useMemo(() => {
    if (typeof animationDuration === 'undefined') return 300
    if (typeof animationDuration === 'number') return animationDuration
    const parsed = Number.parseFloat(animationDuration)
    return Number.isFinite(parsed) ? parsed : 300
  }, [animationDuration])

  const isControlled = refreshing !== undefined
  const [innerRefreshing, setInnerRefreshing] = React.useState(!!defaultRefreshing)
  const mergedRefreshing = isControlled ? !!refreshing : innerRefreshing

  const distanceRef = React.useRef(0)
  const [distance, setDistance] = React.useState(0)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const mergedRefreshingRef = React.useRef(mergedRefreshing)
  const refreshTriggeredRef = React.useRef(false)
  const refreshSucceededRef = React.useRef(false)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const setRefreshing = React.useCallback((value: boolean) => {
    if (!isControlled) {
      setInnerRefreshing(value)
    }
  }, [isControlled])

  React.useEffect(() => {
    mergedRefreshingRef.current = mergedRefreshing
  }, [mergedRefreshing])

  const resolveStatusText = React.useCallback(
    (text: PullRefreshStatusText | undefined, fallback: React.ReactNode) => {
      const resolved = typeof text === 'undefined' ? fallback : text
      if (typeof resolved === 'function') {
        return resolved({ distance })
      }
      return resolved
    },
    [distance],
  )

  const triggerSuccess = React.useCallback(() => {
    if (successText === null || successText === undefined || successText === false) return
    if (successDurationMs <= 0) return
    setShowSuccess(true)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setShowSuccess(false)
    }, successDurationMs)
  }, [successDurationMs, successText])

  const handleRefresh = React.useCallback(async () => {
    if (disabled || mergedRefreshing) return
    setShowSuccess(false)
    refreshTriggeredRef.current = true
    refreshSucceededRef.current = false
    setRefreshing(true)
    try {
      await onRefresh?.()
      refreshSucceededRef.current = true
    } finally {
      setRefreshing(false)
      if (typeof props.onRefreshEnd === 'function') {
        setTimeout(() => props.onRefreshEnd?.(), 0)
      }

      if (refreshTriggeredRef.current && refreshSucceededRef.current && !mergedRefreshingRef.current) {
        triggerSuccess()
        refreshTriggeredRef.current = false
        refreshSucceededRef.current = false
      }
    }
  }, [disabled, mergedRefreshing, onRefresh, props.onRefreshEnd, setRefreshing, triggerSuccess])

  React.useEffect(() => {
    if (!refreshTriggeredRef.current) return
    if (mergedRefreshing) return
    if (!refreshSucceededRef.current) {
      refreshTriggeredRef.current = false
      refreshSucceededRef.current = false
      return
    }
    if (showSuccess) {
      refreshTriggeredRef.current = false
      refreshSucceededRef.current = false
      return
    }
    triggerSuccess()
    refreshTriggeredRef.current = false
    refreshSucceededRef.current = false
  }, [mergedRefreshing, showSuccess, triggerSuccess])

  const status = React.useMemo<PullRefreshStatus>(() => {
    if (mergedRefreshing) return 'loading'
    if (showSuccess) return 'success'
    if (disabled) return 'normal'
    if (distance === 0) return 'normal'
    return distance < pullDistanceNumber ? 'pulling' : 'loosing'
  }, [disabled, distance, mergedRefreshing, pullDistanceNumber, showSuccess])

  const opacity = React.useRef(new Animated.Value(status === 'normal' ? 0 : 1)).current
  React.useEffect(() => {
    const toValue = status === 'normal' ? 0 : 1
    if (animationDurationMs <= 0) {
      opacity.setValue(toValue)
      return
    }
    Animated.timing(opacity, { toValue, duration: animationDurationMs, useNativeDriver: true }).start()
  }, [animationDurationMs, opacity, status])

  const renderStatus = () => {
    switch (status) {
      case 'pulling':
        return resolveStatusText(pullingText, locale.vanPullRefresh.pulling)
      case 'loosing':
        return resolveStatusText(loosingText, locale.vanPullRefresh.loosing)
      case 'loading':
        return resolveStatusText(loadingText, locale.vanPullRefresh.loading)
      case 'success':
        return resolveStatusText(successText, '刷新成功')
      default:
        return null
    }
  }

  const shouldReserveHead = (status === 'loading' || status === 'success') && distance === 0
  const contentContainerStyle = React.useMemo(() => {
    if (!shouldReserveHead) return scrollProps.contentContainerStyle
    const flattened = StyleSheet.flatten(scrollProps.contentContainerStyle) as any
    const basePaddingTop = typeof flattened?.paddingTop === 'number' ? flattened.paddingTop : 0
    return [
      scrollProps.contentContainerStyle,
      {
        paddingTop: basePaddingTop + headHeightNumber,
      },
    ]
  }, [headHeightNumber, scrollProps.contentContainerStyle, shouldReserveHead])

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollProps.onScroll?.(event)
      if (disabled) return
      const offset = event.nativeEvent.contentOffset?.y ?? 0
      const nextDistance = offset < 0 ? -offset : 0
      if (Math.abs(distanceRef.current - nextDistance) < 1) return
      distanceRef.current = nextDistance
      setDistance(nextDistance)
    },
    [disabled, scrollProps],
  )

  return (
    <ScrollView
      {...scrollProps}
      ref={ref}
      style={style}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl
          refreshing={!!mergedRefreshing}
          onRefresh={handleRefresh}
          enabled={!disabled}
        />
      }
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View
        pointerEvents="none"
        style={[
          styles.head,
          {
            height: headHeightNumber,
            marginTop: -headHeightNumber,
          },
        ]}
      >
        <Animated.View style={{ opacity }}>
          {(() => {
            const node = renderStatus()
            if (typeof node === 'string' || typeof node === 'number') {
              return (
                <Text style={{ color: status === 'success' ? tokens.colors.success : tokens.colors.text }}>
                  {node}
                </Text>
              )
            }
            return node
          })()}
        </Animated.View>
      </View>
      {children}
    </ScrollView>
  )
})

PullRefresh.displayName = 'PullRefresh'

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
})

export default PullRefresh
