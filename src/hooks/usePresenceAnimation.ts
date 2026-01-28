import { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

import { nativeDriverEnabled } from '../platform'

interface PresenceOptions {
  duration?: number
  easing?: (value: number) => number
  /**
   * 初次挂载时是否执行进入动画
   * @default false
   */
  appear?: boolean
}

export const usePresenceAnimation = (
  visible: boolean,
  { duration = 180, easing = Easing.out(Easing.cubic), appear = false }: PresenceOptions = {}
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
      Animated.timing(animated, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver,
      }).start()
    } else {
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
  }, [animated, duration, easing, useNativeDriver, visible])

  return { mounted, animated }
}
