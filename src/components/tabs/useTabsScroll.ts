import { useCallback, useEffect, useRef, type MutableRefObject } from 'react'
import { Animated, ScrollView, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native'
import { cancelFrame, requestFrame } from './utils'
import type { TabsValue } from './types'

interface UseTabsScrollParams {
  scrollable: boolean
  animated: boolean
  currentName?: TabsValue | null
  resolvedDuration: number
  layoutMap: MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: MutableRefObject<number>
  navContentWidthRef: MutableRefObject<number>
}

export const useTabsScroll = ({
  scrollable,
  animated,
  currentName,
  resolvedDuration,
  layoutMap,
  navContainerWidthRef,
  navContentWidthRef,
}: UseTabsScrollParams) => {
  const navScrollRef = useRef<ScrollView>(null)
  const navScrollX = useRef(new Animated.Value(0)).current
  const navScrollAnimRef = useRef<Animated.CompositeAnimation | null>(null)
  const navAutoScrollingRef = useRef(false)
  const navLastScrollXRef = useRef(0)
  const navAutoScrollFrameRef = useRef<number | null>(null)

  const scrollIntoView = useCallback(
    (immediate?: boolean) => {
      if (!scrollable || currentName == null) return
      const layout = layoutMap.current.get(currentName)
      const containerWidth = navContainerWidthRef.current
      if (!layout || !containerWidth) return
      const contentWidth = navContentWidthRef.current
      const targetX = layout.x - (containerWidth - layout.width) / 2
      const maxScroll = Math.max(contentWidth - containerWidth, 0)
      const clampedX = Math.max(0, Math.min(targetX, maxScroll))
      if (maxScroll <= 0) {
        return
      }
      if (Math.abs(clampedX - navLastScrollXRef.current) < 1) {
        return
      }
      if (navScrollAnimRef.current) {
        navScrollAnimRef.current.stop()
        navScrollAnimRef.current = null
      }
      cancelFrame(navAutoScrollFrameRef.current)
      navAutoScrollFrameRef.current = null
      if (immediate || !animated) {
        navAutoScrollingRef.current = true
        navScrollX.setValue(clampedX)
        navAutoScrollFrameRef.current = requestFrame(() => {
          navAutoScrollFrameRef.current = null
          navAutoScrollingRef.current = false
        })
        return
      }
      navScrollX.setValue(navLastScrollXRef.current)
      navAutoScrollingRef.current = true
      navScrollAnimRef.current = Animated.timing(navScrollX, {
        toValue: clampedX,
        duration: resolvedDuration,
        useNativeDriver: false,
      })
      navScrollAnimRef.current.start(({ finished }) => {
        navScrollAnimRef.current = null
        navAutoScrollingRef.current = false
        if (!finished) {
          return
        }
        navLastScrollXRef.current = clampedX
      })
    },
    [animated, currentName, navScrollX, resolvedDuration, scrollable, layoutMap, navContainerWidthRef, navContentWidthRef],
  )

  useEffect(() => {
    if (!scrollable) return
    const listenerId = navScrollX.addListener(({ value }) => {
      const prev = navLastScrollXRef.current
      navLastScrollXRef.current = value
      if (Math.abs(value - prev) < 0.5) {
        return
      }
      navScrollRef.current?.scrollTo({ x: value, y: 0, animated: false })
    })
    return () => {
      navScrollX.removeListener(listenerId)
    }
  }, [navScrollX, scrollable])

  useEffect(() => {
    return () => {
      cancelFrame(navAutoScrollFrameRef.current)
      navAutoScrollFrameRef.current = null
    }
  }, [])

  const handleNavScrollBeginDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    navAutoScrollingRef.current = false
    if (navScrollAnimRef.current) {
      navScrollAnimRef.current.stop()
      navScrollAnimRef.current = null
    }
    navLastScrollXRef.current = event.nativeEvent.contentOffset.x
  }, [])

  const handleNavScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (navAutoScrollingRef.current) {
      return
    }
    navLastScrollXRef.current = event.nativeEvent.contentOffset.x
  }, [])

  return {
    navScrollRef,
    navScrollX,
    scrollIntoView,
    handleNavScrollBeginDrag,
    handleNavScroll,
  }
}
