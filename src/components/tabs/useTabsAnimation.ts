import { useCallback, useEffect, useRef, type MutableRefObject } from 'react'
import { Animated } from 'react-native'
import type { TabsValue } from './types'

interface UseTabsAnimationParams {
  type: 'line' | 'card' | 'jumbo' | 'capsule'
  animated: boolean
  scrollable: boolean
  align: 'start' | 'center' | 'end'
  panes: Array<{ name: TabsValue; index: number }>
  nameIndexMap: Map<TabsValue, number>
  resolvedLineWidth?: number
  resolvedLineHeight: number
  resolvedDuration: number
  currentName?: TabsValue | null
  layoutMap: MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: MutableRefObject<number>
}

export const useTabsAnimation = ({
  type,
  animated,
  scrollable,
  align,
  panes,
  nameIndexMap,
  resolvedLineWidth,
  resolvedDuration,
  currentName,
  layoutMap,
  navContainerWidthRef,
}: UseTabsAnimationParams) => {
  const indicatorX = useRef(new Animated.Value(0)).current
  const indicatorWidth = useRef(new Animated.Value(0)).current
  const indicatorInitializedRef = useRef(false)

  const animateIndicator = useCallback(
    (name?: TabsValue, immediate?: boolean) => {
      if (name == null || type !== 'line') return false
      const shouldUseEqualWidth =
        !scrollable && align !== 'start' && navContainerWidthRef.current > 0 && panes.length > 0
      const index = nameIndexMap.get(name) ?? -1
      const equalTabWidth = shouldUseEqualWidth ? navContainerWidthRef.current / panes.length : 0
      const layout = shouldUseEqualWidth
        ? { x: Math.max(index, 0) * equalTabWidth, width: equalTabWidth }
        : layoutMap.current.get(name)
      if (!layout || index < 0) {
        return false
      }
      const timing = (value: Animated.Value, toValue: number) =>
        Animated.timing(value, {
          toValue,
          duration: immediate || !animated ? 0 : resolvedDuration,
          useNativeDriver: false,
        })
      const targetWidth = resolvedLineWidth ?? layout.width
      const targetX = resolvedLineWidth
        ? layout.x + (layout.width - targetWidth) / 2
        : layout.x
      Animated.parallel([
        timing(indicatorX, targetX),
        timing(indicatorWidth, targetWidth),
      ]).start()
      return true
    },
    [align, animated, indicatorWidth, indicatorX, nameIndexMap, panes.length, resolvedDuration, resolvedLineWidth, scrollable, type, layoutMap, navContainerWidthRef],
  )

  useEffect(() => {
    if (currentName == null) return
    const shouldAnimate = indicatorInitializedRef.current
    const didAnimate = animateIndicator(currentName, !shouldAnimate)
    if (didAnimate && !indicatorInitializedRef.current) {
      indicatorInitializedRef.current = true
    }
  }, [animateIndicator, currentName])

  return {
    indicatorX,
    indicatorWidth,
    indicatorInitializedRef,
    animateIndicator,
  }
}
