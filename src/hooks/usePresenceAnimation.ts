import { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

import { nativeDriverEnabled } from '../platform'

interface PresenceOptions {
  duration?: number
  easing?: (value: number) => number
  /**
   * 是否允许执行动画（用于等待测量结果等）
   * @default true
   */
  canAnimate?: boolean
  /**
   * 初次挂载时是否执行进入动画
   * @default false
   */
  appear?: boolean
}

export const usePresenceAnimation = (
  visible: boolean,
  {
    duration = 180,
    easing = Easing.out(Easing.cubic),
    appear = false,
    canAnimate = true,
  }: PresenceOptions = {}
) => {
  const [mounted, setMounted] = useState(visible)
  const animated = useRef(new Animated.Value(visible && !appear ? 1 : 0)).current
  const useNativeDriver = nativeDriverEnabled
  const animationIdRef = useRef(0)

  useEffect(() => {
    animationIdRef.current += 1
    const animationId = animationIdRef.current
    animated.stopAnimation()
    if (visible) {
      setMounted(true)
      if (!canAnimate) {
        animated.setValue(0)
        return
      }
      Animated.timing(animated, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver,
      }).start()
    } else {
      if (!canAnimate) {
        animated.setValue(0)
        setMounted(false)
        return
      }
      Animated.timing(animated, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver,
      }).start(() => {
        if (animationId !== animationIdRef.current) return
        setMounted(false)
      })
    }
  }, [animated, canAnimate, duration, easing, useNativeDriver, visible])

  return { mounted, animated }
}
