import React from 'react'
import { Animated, PanResponder, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { parseNumberLike } from '../../utils/number'
import { isText } from '../../utils/validate'
import { useLocale } from '../config-provider/useLocale'
import { usePullRefreshTokens } from './tokens'
import type { PullRefreshProps, PullRefreshStatus, PullRefreshStatusText } from './types'

const DEFAULT_SUCCESS_DURATION = 500

const PullRefresh = React.forwardRef<ScrollView, PullRefreshProps>((props, ref) => {
  const {
    children,
    onRefresh,
    onRefreshEnd,
    refreshing,
    defaultRefreshing,
    tokensOverride,
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

  const isWeb = Platform.OS === 'web'
  const locale = useLocale()
  const tokens = usePullRefreshTokens(tokensOverride)
  const { colors, sizing } = tokens

  const translateY = React.useRef(new Animated.Value(0)).current
  const headHeightNumber = parseNumberLike(headHeight, sizing.headHeight) ?? sizing.headHeight
  const pullDistanceNumber = parseNumberLike(pullDistance, headHeightNumber) ?? headHeightNumber
  const successDurationMs = parseNumberLike(successDuration, DEFAULT_SUCCESS_DURATION) ?? DEFAULT_SUCCESS_DURATION
  const animationDurationMs = parseNumberLike(animationDuration, 300) ?? 300

  const isControlled = refreshing !== undefined
  const [innerRefreshing, setInnerRefreshing] = React.useState(!!defaultRefreshing)
  const mergedRefreshing = isControlled ? !!refreshing : innerRefreshing

  const distanceRef = React.useRef(0)
  const scrollTopRef = React.useRef(0)
  const draggingRef = React.useRef(false)
  const [distance, setDistance] = React.useState(0)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const mergedRefreshingRef = React.useRef(mergedRefreshing)
  const refreshTriggeredRef = React.useRef(false)
  const refreshSucceededRef = React.useRef(false)

  const setDistanceValue = React.useCallback((nextDistance: number, animate = false) => {
    const normalized = Math.max(0, Math.round(nextDistance))
    distanceRef.current = normalized

    if (isWeb) {
      translateY.stopAnimation()
      if (animate && animationDurationMs > 0) {
        Animated.timing(translateY, {
          toValue: normalized,
          duration: animationDurationMs,
          useNativeDriver: false,
        }).start()
      } else {
        translateY.setValue(normalized)
      }
    }

    setDistance(prev => (Math.abs(prev - normalized) < 1 ? prev : normalized))
  }, [animationDurationMs, isWeb, translateY])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const setRefreshing = (value: boolean) => {
    if (!isControlled) setInnerRefreshing(value)
  }

  React.useEffect(() => {
    mergedRefreshingRef.current = mergedRefreshing
  }, [mergedRefreshing])

  const resolveStatusText = (text: PullRefreshStatusText | undefined, fallback: React.ReactNode) => {
    const resolved = typeof text === 'undefined' ? fallback : text
    return typeof resolved === 'function' ? resolved({ distance }) : resolved
  }

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
      if (typeof onRefreshEnd === 'function') setTimeout(onRefreshEnd, 0)

      if (refreshTriggeredRef.current && refreshSucceededRef.current && !mergedRefreshingRef.current) {
        triggerSuccess()
        refreshTriggeredRef.current = false
        refreshSucceededRef.current = false
      }
    }
  }, [disabled, mergedRefreshing, onRefresh, onRefreshEnd, triggerSuccess])

  // Web 端没有原生下拉回弹与 RefreshControl，需要用拖拽手势模拟内容下移。
  React.useEffect(() => {
    if (!isWeb) return
    if (draggingRef.current) return

    if (disabled) {
      setDistanceValue(0, true)
      return
    }

    if (mergedRefreshing || showSuccess) {
      setDistanceValue(headHeightNumber, true)
      return
    }

    setDistanceValue(0, true)
  }, [disabled, headHeightNumber, isWeb, mergedRefreshing, setDistanceValue, showSuccess])

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

  const status: PullRefreshStatus =
    mergedRefreshing
      ? 'loading'
      : showSuccess
        ? 'success'
        : disabled || distance === 0
          ? 'normal'
          : distance < pullDistanceNumber
            ? 'pulling'
            : 'loosing'

  const opacity = React.useRef(new Animated.Value(status === 'normal' ? 0 : 1)).current
  React.useEffect(() => {
    const toValue = status === 'normal' ? 0 : 1
    if (animationDurationMs <= 0) {
      opacity.setValue(toValue)
      return
    }
    Animated.timing(opacity, { toValue, duration: animationDurationMs, useNativeDriver: nativeDriverEnabled }).start()
  }, [animationDurationMs, opacity, status])

  const statusNode = (() => {
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
  })()

  const shouldReserveHead = (status === 'loading' || status === 'success') && distance === 0
  const flattenedContainerStyle = StyleSheet.flatten(scrollProps.contentContainerStyle) as any
  const basePaddingTop = typeof flattenedContainerStyle?.paddingTop === 'number' ? flattenedContainerStyle.paddingTop : 0
  const contentContainerStyle = shouldReserveHead
    ? [scrollProps.contentContainerStyle, { paddingTop: basePaddingTop + headHeightNumber }]
    : scrollProps.contentContainerStyle

  const handleScroll = (event: any) => {
    scrollProps.onScroll?.(event)
    const offset = event?.nativeEvent?.contentOffset?.y ?? 0
    if (isWeb) {
      scrollTopRef.current = Math.max(0, offset)
      return
    }
    if (disabled) return
    setDistanceValue(offset < 0 ? -offset : 0)
  }

  const panResponder = React.useMemo(() => {
    if (!isWeb) return null
    const easeDistance = (raw: number) => {
      const pullDistance = pullDistanceNumber
      let eased = raw
      if (eased > pullDistance) {
        eased =
          eased < pullDistance * 2
            ? pullDistance + (eased - pullDistance) / 2
            : pullDistance * 1.5 + (eased - pullDistance * 2) / 4
      }
      return Math.round(eased)
    }
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_event, gestureState) => {
        if (disabled) return false
        if (mergedRefreshingRef.current) return false
        if (showSuccess) return false
        if (scrollTopRef.current > 0) return false

        const { dx, dy } = gestureState
        if (dy <= 0) return false
        if (Math.abs(dy) <= Math.abs(dx)) return false

        return true
      },
      onPanResponderGrant: () => {
        draggingRef.current = true
      },
      onPanResponderMove: (event, gestureState) => {
        if (disabled) return
        if (mergedRefreshingRef.current) return
        if (showSuccess) return
        if (scrollTopRef.current > 0) return

        const raw = Math.max(0, gestureState.dy ?? 0)
        setDistanceValue(easeDistance(raw))

        if (typeof (event as any)?.preventDefault === 'function') {
          ; (event as any).preventDefault()
        }
      },
      onPanResponderRelease: async (_event, gestureState) => {
        draggingRef.current = false
        if (disabled) return
        if (mergedRefreshingRef.current) return
        if (showSuccess) return

        const nextDistance = easeDistance(Math.max(0, gestureState.dy))
        const shouldRefresh = nextDistance >= pullDistanceNumber

        if (shouldRefresh) {
          setDistanceValue(headHeightNumber, true)
          await handleRefresh()
          return
        }

        setDistanceValue(0, true)
      },
      onPanResponderTerminate: () => {
        draggingRef.current = false
        setDistanceValue(0, true)
      },
    })
  }, [
    disabled,
    handleRefresh,
    headHeightNumber,
    isWeb,
    pullDistanceNumber,
    setDistanceValue,
    showSuccess,
  ])

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
      <Animated.View
        {...(panResponder ? panResponder.panHandlers : {})}
        style={isWeb ? { transform: [{ translateY }] } : undefined}
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
            {isText(statusNode) ? (
              <Text style={{ color: status === 'success' ? colors.success : colors.text }}>
                {statusNode}
              </Text>
            ) : statusNode}
          </Animated.View>
        </View>
        {children}
      </Animated.View>
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
