import React from 'react'
import { Animated, ScrollView, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native'
import { requestFrame } from './utils'
import type { TabsValue } from './types'

interface UseTabsScrollParams {
  scrollable: boolean
  animated: boolean
  currentName?: TabsValue | null
  resolvedDuration: number
  layoutMap: React.MutableRefObject<Map<TabsValue, { x: number; width: number }>>
  navContainerWidthRef: React.MutableRefObject<number>
  navContentWidthRef: React.MutableRefObject<number>
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
  const navScrollRef = React.useRef<ScrollView>(null)
  const navScrollX = React.useRef(new Animated.Value(0)).current
  const navScrollAnimRef = React.useRef<Animated.CompositeAnimation | null>(null)
  const navAutoScrollingRef = React.useRef(false)
  const navLastScrollXRef = React.useRef(0)

  const scrollIntoView = React.useCallback(
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
      if (immediate || !animated) {
        navAutoScrollingRef.current = true
        navScrollX.setValue(clampedX)
        requestFrame(() => {
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
    [animated, currentName, navScrollX, resolvedDuration, scrollable],
  )

  React.useEffect(() => {
    const listenerId = navScrollX.addListener(({ value }) => {
      navLastScrollXRef.current = value
      navScrollRef.current?.scrollTo({ x: value, y: 0, animated: false })
    })
    return () => {
      navScrollX.removeListener(listenerId)
    }
  }, [navScrollX])

  const handleNavScrollBeginDrag = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    navAutoScrollingRef.current = false
    if (navScrollAnimRef.current) {
      navScrollAnimRef.current.stop()
      navScrollAnimRef.current = null
    }
    navLastScrollXRef.current = event.nativeEvent.contentOffset.x
  }, [])

  const handleNavScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
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
