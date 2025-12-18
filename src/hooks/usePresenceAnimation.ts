import React from 'react'
import { Animated, Easing } from 'react-native'

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

  React.useEffect(() => {
    if (visible) {
      setMounted(true)
      Animated.timing(animated, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver: true,
      }).start(() => {
        setMounted(false)
      })
    }
  }, [animated, duration, easing, visible])

  return { mounted, animated }
}
