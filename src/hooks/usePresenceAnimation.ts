import React from 'react'
import { Animated, Easing, Platform } from 'react-native'

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
  const [mounted, setMounted] = React.useState(visible)
  const animated = React.useRef(new Animated.Value(visible && !appear ? 1 : 0)).current
  const useNativeDriver = Platform.OS !== 'web'

  React.useEffect(() => {
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
        setMounted(false)
      })
    }
  }, [animated, duration, easing, useNativeDriver, visible])

  return { mounted, animated }
}
