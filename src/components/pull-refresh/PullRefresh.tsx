import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, PanResponder, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

import { nativeDriverEnabled } from '../../platform'
import { parseNumberLike, isFunction, isNumber, isText, isUndefined } from '../../utils'
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

  const translateY = useRef(new Animated.Value(0)).current
  const headHeightNumber = useMemo(
    () => Math.max(0, parseNumberLike(headHeight, sizing.headHeight) ?? sizing.headHeight),
    [headHeight, sizing.headHeight],
  )
  const pullDistanceNumber = useMemo(
    () => Math.max(0, parseNumberLike(pullDistance, headHeightNumber) ?? headHeightNumber),
    [headHeightNumber, pullDistance],
  )
  const successDurationMs = useMemo(
    () =>
      Math.max(
        0,
        parseNumberLike(successDuration, DEFAULT_SUCCESS_DURATION) ?? DEFAULT_SUCCESS_DURATION,
      ),
    [successDuration],
  )
  const animationDurationMs = useMemo(
    () => Math.max(0, parseNumberLike(animationDuration, 300) ?? 300),
    [animationDuration],
  )

  const isControlled = !isUndefined(refreshing)
  const [innerRefreshing, setInnerRefreshing] = useState(!!defaultRefreshing)
  const mergedRefreshing = isControlled ? !!refreshing : innerRefreshing

  const scrollTopRef = useRef(0)
  const draggingRef = useRef(false)
  const webDragRafRef = useRef<number | null>(null)
  const webDragPendingRef = useRef<number | null>(null)
  const [distance, setDistance] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const refreshEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mergedRefreshingRef = useRef(mergedRefreshing)
  const refreshTriggeredRef = useRef(false)
  const refreshSucceededRef = useRef(false)

  const setDistanceValue = useCallback((nextDistance: number, animate = false) => {
    const normalized = Math.max(0, Math.round(nextDistance))

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

  const flushWebDrag = useCallback(() => {
    const pending = webDragPendingRef.current
    if (pending == null) return
    webDragPendingRef.current = null
    setDistanceValue(pending)
  }, [setDistanceValue])

  const cancelWebDrag = useCallback(() => {
    if (webDragRafRef.current != null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(webDragRafRef.current)
    }
    webDragRafRef.current = null
    webDragPendingRef.current = null
  }, [])

  const scheduleWebDrag = useCallback(
    (nextDistance: number) => {
      if (!isWeb || typeof requestAnimationFrame !== 'function') {
        setDistanceValue(nextDistance)
        return
      }
      webDragPendingRef.current = nextDistance
      if (webDragRafRef.current != null) return
      webDragRafRef.current = requestAnimationFrame(() => {
        webDragRafRef.current = null
        flushWebDrag()
      })
    },
    [flushWebDrag, isWeb, setDistanceValue],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (refreshEndTimerRef.current) {
        clearTimeout(refreshEndTimerRef.current)
      }
      cancelWebDrag()
    }
  }, [cancelWebDrag])

  const setRefreshing = useCallback((value: boolean) => {
    if (!isControlled) setInnerRefreshing(value)
  }, [isControlled])

  useEffect(() => {
    mergedRefreshingRef.current = mergedRefreshing
  }, [mergedRefreshing])

  const resolveStatusText = useCallback((text: PullRefreshStatusText | undefined, fallback: React.ReactNode) => {
    const resolved = isUndefined(text) ? fallback : text
    return isFunction(resolved) ? resolved({ distance }) : resolved
  }, [distance])

  const triggerSuccess = useCallback(() => {
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

  const handleRefresh = useCallback(async () => {
    if (disabled || mergedRefreshing) return
    if (!isFunction(onRefresh)) return
    setShowSuccess(false)
    refreshTriggeredRef.current = true
    refreshSucceededRef.current = false
    setRefreshing(true)
    try {
      await onRefresh()
      refreshSucceededRef.current = true
    } finally {
      setRefreshing(false)
      if (isFunction(onRefreshEnd)) {
        if (refreshEndTimerRef.current) {
          clearTimeout(refreshEndTimerRef.current)
        }
        refreshEndTimerRef.current = setTimeout(onRefreshEnd, 0)
      }

      if (refreshTriggeredRef.current && refreshSucceededRef.current && !mergedRefreshingRef.current) {
        triggerSuccess()
        refreshTriggeredRef.current = false
        refreshSucceededRef.current = false
      }
    }
  }, [disabled, mergedRefreshing, onRefresh, onRefreshEnd, setRefreshing, triggerSuccess])

  useEffect(() => {
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

  useEffect(() => {
    if (isWeb) return
    if (!mergedRefreshing && !showSuccess) return
    setDistanceValue(0)
  }, [isWeb, mergedRefreshing, setDistanceValue, showSuccess])

  useEffect(() => {
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

  const status: PullRefreshStatus = useMemo(
    () =>
      mergedRefreshing
        ? 'loading'
        : showSuccess
          ? 'success'
          : disabled || distance === 0
            ? 'normal'
            : distance < pullDistanceNumber
              ? 'pulling'
              : 'loosing',
    [disabled, distance, mergedRefreshing, pullDistanceNumber, showSuccess],
  )

  const opacity = useRef(new Animated.Value(status === 'normal' ? 0 : 1)).current
  useEffect(() => {
    const toValue = status === 'normal' ? 0 : 1
    opacity.stopAnimation()
    if (animationDurationMs <= 0) {
      opacity.setValue(toValue)
      return
    }
    Animated.timing(opacity, { toValue, duration: animationDurationMs, useNativeDriver: nativeDriverEnabled }).start()
  }, [animationDurationMs, opacity, status])

  const statusNode = useMemo(() => {
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
  }, [loadingText, locale.vanPullRefresh.loading, locale.vanPullRefresh.loosing, locale.vanPullRefresh.pulling, loosingText, pullingText, resolveStatusText, status, successText])

  const shouldReserveHead = (status === 'loading' || status === 'success') && distance === 0
  const flattenedContainerStyle = useMemo(
    () =>
      StyleSheet.flatten(scrollProps.contentContainerStyle) as { paddingTop?: unknown } | null,
    [scrollProps.contentContainerStyle],
  )
  const basePaddingTop = isNumber(flattenedContainerStyle?.paddingTop) ? flattenedContainerStyle.paddingTop : 0
  const contentContainerStyle = useMemo(
    () =>
      shouldReserveHead
        ? [scrollProps.contentContainerStyle, { paddingTop: basePaddingTop + headHeightNumber }]
        : scrollProps.contentContainerStyle,
    [basePaddingTop, headHeightNumber, scrollProps.contentContainerStyle, shouldReserveHead],
  )

  const onScrollProp = scrollProps.onScroll
  const handleScroll = useCallback(
    (event: Parameters<NonNullable<React.ComponentProps<typeof ScrollView>['onScroll']>>[0]) => {
      onScrollProp?.(event)
      const offset = event.nativeEvent.contentOffset?.y ?? 0
      if (isWeb) {
        scrollTopRef.current = Math.max(0, offset)
        return
      }
      if (disabled) return
      if (!isFunction(onRefresh) || mergedRefreshing || showSuccess) {
        setDistanceValue(0)
        return
      }
      setDistanceValue(offset < 0 ? -offset : 0)
    },
    [disabled, isWeb, mergedRefreshing, onRefresh, onScrollProp, setDistanceValue, showSuccess],
  )

  const panResponder = useMemo(() => {
    if (!isWeb || !isFunction(onRefresh)) return null
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
        scheduleWebDrag(easeDistance(raw))

          ; (event as unknown as { preventDefault?: () => void }).preventDefault?.()
      },
      onPanResponderRelease: async (_event, gestureState) => {
        draggingRef.current = false
        cancelWebDrag()
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
        cancelWebDrag()
        setDistanceValue(0, true)
      },
    })
  }, [
    disabled,
    handleRefresh,
    headHeightNumber,
    isWeb,
    pullDistanceNumber,
    cancelWebDrag,
    scheduleWebDrag,
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
          enabled={!disabled && isFunction(onRefresh)}
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
