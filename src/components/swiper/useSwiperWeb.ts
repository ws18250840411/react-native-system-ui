import { useRef, useCallback, useMemo, useEffect } from 'react'
import { Platform, Animated, Easing, PanResponder, type ViewStyle } from 'react-native'
import { clamp } from '../../utils'
import type { SwiperProps } from './types'
import { stopWebEvent, type WebCancelableEvent } from './utils'

interface UseSwiperWebParams {
  isWeb: boolean
  enabledState: boolean
  touchable: boolean
  vertical: boolean
  count: number
  shouldLoop: boolean
  displayCount: number
  slideSizeValue: number
  nonLoopMinOffset: number
  nonLoopMaxOffset: number
  durationMs: number
  preventScroll: boolean
  trackOffsetPx: number
  swipeToRef: React.MutableRefObject<(index: number, animated?: boolean) => void>
}

export const useSwiperWeb = ({
  isWeb,
  enabledState,
  touchable,
  vertical,
  count,
  shouldLoop,
  displayCount,
  slideSizeValue,
  nonLoopMinOffset,
  nonLoopMaxOffset,
  durationMs,
  preventScroll,
  trackOffsetPx,
  swipeToRef,
}: UseSwiperWebParams) => {
  const canUseRaf = typeof requestAnimationFrame === 'function' && typeof cancelAnimationFrame === 'function'
  const webOffsetRef = useRef(0)
  const startOffsetRef = useRef(0)
  const panLockRef = useRef(false)
  const webTranslateXAnim = useRef(new Animated.Value(0)).current
  const webTranslateYAnim = useRef(new Animated.Value(0)).current

  const panLatestRef = useRef({
    enabledState,
    touchable,
    vertical,
    count,
    shouldLoop,
    displayCount,
    slideSizeValue,
    nonLoopMinOffset,
    nonLoopMaxOffset,
    maxOffsetLoop: Math.max(0, displayCount - 1) * slideSizeValue,
    duration: durationMs,
    preventScroll,
  })

  panLatestRef.current = {
    enabledState,
    touchable,
    vertical,
    count,
    shouldLoop,
    displayCount,
    slideSizeValue,
    nonLoopMinOffset,
    nonLoopMaxOffset,
    maxOffsetLoop: Math.max(0, displayCount - 1) * slideSizeValue,
    duration: durationMs,
    preventScroll,
  }

  const webRafIdRef = useRef<number | null>(null)
  const webPendingOffsetRef = useRef<number | null>(null)

  const flushWebTranslate = useCallback(() => {
    const pending = webPendingOffsetRef.current
    if (pending == null) return
    webPendingOffsetRef.current = null
    const latest = panLatestRef.current
    ;(latest.vertical ? webTranslateYAnim : webTranslateXAnim).setValue(pending)
  }, [])

  const scheduleWebTranslate = useCallback((next: number) => {
    webPendingOffsetRef.current = next
    if (webRafIdRef.current != null) return
    if (canUseRaf) {
      webRafIdRef.current = requestAnimationFrame(() => {
        webRafIdRef.current = null
        flushWebTranslate()
      })
      return
    }
    webRafIdRef.current = setTimeout(() => {
      webRafIdRef.current = null
      flushWebTranslate()
    }, 16) as unknown as number
  }, [canUseRaf, flushWebTranslate])

  const cancelWebRaf = useCallback(() => {
    if (webRafIdRef.current != null) {
      if (canUseRaf) {
        cancelAnimationFrame(webRafIdRef.current)
      } else {
        clearTimeout(webRafIdRef.current)
      }
      webRafIdRef.current = null
    }
    webPendingOffsetRef.current = null
  }, [canUseRaf])

  const webSnapAnimRef = useRef<Animated.CompositeAnimation | null>(null)
  const stopWebSnapAnim = useCallback(() => {
    const anim = webSnapAnimRef.current
    if (anim) {
      anim.stop()
      webSnapAnimRef.current = null
    }
    const latest = panLatestRef.current
    const activeAnim = latest.vertical ? webTranslateYAnim : webTranslateXAnim
    let nextOffset = webOffsetRef.current
    activeAnim.stopAnimation((value) => {
      if (typeof value === 'number') {
        nextOffset = value
      }
    })
    ;(latest.vertical ? webTranslateXAnim : webTranslateYAnim).stopAnimation()
    webOffsetRef.current = nextOffset
  }, [])

  const webTrackTransform = useMemo(() => {
    if (vertical) {
      return trackOffsetPx
        ? [{ translateY: trackOffsetPx }, { translateY: webTranslateYAnim }]
        : [{ translateY: webTranslateYAnim }]
    }
    return trackOffsetPx
      ? [{ translateX: trackOffsetPx }, { translateX: webTranslateXAnim }]
      : [{ translateX: webTranslateXAnim }]
  }, [trackOffsetPx, vertical, webTranslateXAnim, webTranslateYAnim])

  const panResponder = useMemo(() => {
    if (!isWeb) return null

    return PanResponder.create({
      onStartShouldSetPanResponder: () => {
        const latest = panLatestRef.current
        return !!latest.enabledState && !!latest.touchable && latest.count > 1
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const latest = panLatestRef.current
        if (!latest.enabledState || !latest.touchable || latest.count <= 1) return false
        if (latest.vertical) {
          return Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        }
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
      },
      onPanResponderGrant: () => {
        const latest = panLatestRef.current
        if (!latest.enabledState || !latest.touchable || latest.count <= 1) return
        panLockRef.current = true
        cancelWebRaf()
        stopWebSnapAnim()
        startOffsetRef.current = webOffsetRef.current
      },
      onPanResponderMove: (event, gestureState) => {
        if (!panLockRef.current) return
        const latest = panLatestRef.current
        if (latest.preventScroll) {
          stopWebEvent(event as unknown as WebCancelableEvent)
        }
        const delta = latest.vertical ? gestureState.dy : gestureState.dx
        const nextRaw = startOffsetRef.current + delta
        const next = latest.shouldLoop
          ? clamp(nextRaw, -latest.maxOffsetLoop, 0)
          : clamp(nextRaw, -latest.nonLoopMaxOffset, -latest.nonLoopMinOffset)
        webOffsetRef.current = next
        scheduleWebTranslate(next)
      },
      onPanResponderRelease: (_, gestureState) => {
        const latest = panLatestRef.current
        panLockRef.current = false
        cancelWebRaf()
        flushWebTranslate()
        const distance = latest.vertical ? gestureState.dy : gestureState.dx
        const velocity = latest.vertical ? gestureState.vy : gestureState.vx

        const dir = velocity !== 0 ? (velocity > 0 ? 1 : -1) : distance !== 0 ? (distance > 0 ? 1 : -1) : 0
        const velocityOffset = Math.min(Math.abs(velocity) * 2000, latest.slideSizeValue) * dir
        let targetOffset = startOffsetRef.current + distance + velocityOffset

        targetOffset = latest.shouldLoop
          ? clamp(targetOffset, -latest.maxOffsetLoop, 0)
          : clamp(targetOffset, -latest.nonLoopMaxOffset, -latest.nonLoopMinOffset)

        const targetIndex = Math.round(-targetOffset / latest.slideSizeValue)
        const displayIndex = latest.shouldLoop
          ? clamp(targetIndex, 0, latest.displayCount - 1)
          : clamp(targetIndex, 0, latest.count - 1)

        const realIndex = latest.shouldLoop
          ? displayIndex === 0
            ? latest.count - 1
            : displayIndex === latest.displayCount - 1
              ? 0
              : displayIndex - 1
          : displayIndex

        swipeToRef.current(realIndex, true)
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => {
        panLockRef.current = false
        cancelWebRaf()
        stopWebSnapAnim()
      },
    })
  }, [isWeb, cancelWebRaf, stopWebSnapAnim, scheduleWebTranslate, flushWebTranslate, swipeToRef])

  useEffect(() => {
    return () => {
      cancelWebRaf()
      stopWebSnapAnim()
    }
  }, [cancelWebRaf, stopWebSnapAnim])

  return {
    webOffsetRef,
    webTranslateXAnim,
    webTranslateYAnim,
    webTrackTransform,
    panResponder,
    stopWebSnapAnim,
    cancelWebRaf,
    flushWebTranslate,
    scheduleWebTranslate,
    webSnapAnimRef,
  }
}
