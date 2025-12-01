import * as React from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { Animated } from 'react-native'

export type StickyPosition = 'top' | 'bottom'

export interface StickyObserverOptions {
  scrollValue?: Animated.Value
  offset?: number
  position?: StickyPosition
  disabled?: boolean
  onStateChange?: (isSticky: boolean) => void
  onScroll?: (payload: { scrollTop: number; isFixed: boolean }) => void
}

export interface StickyObserverResult {
  isSticky: boolean
  placeholderHeight: number
  onLayout: (event: LayoutChangeEvent) => void
}

const getAnimatedValue = (value: Animated.Value | undefined) => {
  if (!value) return 0
  try {
    // Animated.Value exposes __getValue for reading the current state in JS.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error - __getValue is not part of the public typings.
    return value.__getValue() as number
  } catch (err) {
    return 0
  }
}

export const useStickyObserver = (
  options: StickyObserverOptions
): StickyObserverResult => {
  const {
    scrollValue,
    offset = 0,
    position = 'top',
    disabled = false,
    onStateChange,
    onScroll,
  } = options

  const layoutYRef = React.useRef(0)
  const lastScrollRef = React.useRef(0)
  const measuredRef = React.useRef(false)
  const stickyRef = React.useRef(false)
  const warnedBottomRef = React.useRef(false)

  const [isSticky, setIsSticky] = React.useState(false)
  const [placeholderHeight, setPlaceholderHeight] = React.useState(0)

  React.useEffect(() => {
    if (position === 'bottom' && !warnedBottomRef.current) {
      warnedBottomRef.current = true
      console.warn('[Sticky] position="bottom" 暂未支持，将按 `top` 处理。')
    }
  }, [position])

  const evaluate = React.useCallback(
    (scrollTop: number) => {
      lastScrollRef.current = scrollTop

      let shouldStick = false
      if (!disabled && measuredRef.current) {
        const stickyStart = Math.max(layoutYRef.current - offset, 0)
        shouldStick = scrollTop >= stickyStart
      }

      if (stickyRef.current !== shouldStick) {
        stickyRef.current = shouldStick
        setIsSticky(shouldStick)
        onStateChange?.(shouldStick)
      }

      onScroll?.({ scrollTop, isFixed: shouldStick })
    },
    [disabled, offset, onScroll, onStateChange]
  )

  React.useEffect(() => {
    evaluate(lastScrollRef.current)
  }, [evaluate])

  React.useEffect(() => {
    if (!scrollValue) {
      evaluate(0)
      return
    }

    const initial = getAnimatedValue(scrollValue)
    evaluate(initial)

    const id = scrollValue.addListener(({ value }) => {
      evaluate(value)
    })

    return () => {
      scrollValue.removeListener(id)
    }
  }, [evaluate, scrollValue])

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent
      layoutYRef.current = layout.y
      measuredRef.current = true
      if (layout.height !== placeholderHeight) {
        setPlaceholderHeight(layout.height)
      }
      evaluate(lastScrollRef.current)
    },
    [evaluate, placeholderHeight]
  )

  return {
    isSticky,
    placeholderHeight,
    onLayout: handleLayout,
  }
}

export default useStickyObserver
