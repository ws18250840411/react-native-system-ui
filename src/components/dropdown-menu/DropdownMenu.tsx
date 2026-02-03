import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Animated, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'

import { useControllableValue } from '../../hooks'
import { measureInWindow, nativeDriverEnabled } from '../../platform'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
import { parseNumber, parseNumberLike } from '../../utils/number'
import type { DropdownMenuInstance, DropdownMenuProps } from './types'
import { DropdownMenuContext } from './DropdownMenuContext'
import { useDropdownMenuTokens } from './tokens'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const isSameFrame = (
  prev: { x: number; y: number; width: number; height: number } | null,
  next: { x: number; y: number; width: number; height: number }
) =>
  prev != null &&
  Math.abs(prev.x - next.x) < 0.5 &&
  Math.abs(prev.y - next.y) < 0.5 &&
  Math.abs(prev.width - next.width) < 0.5 &&
  Math.abs(prev.height - next.height) < 0.5

const DropdownMenu = React.forwardRef<DropdownMenuInstance, DropdownMenuProps>((props, ref) => {
  const {
    children,
    activeColor,
    activeIcon,
    direction = 'down',
    disabled = false,
    zIndex: zIndexProp = 10,
    duration,
    overlay = false,
    closeOnClickOverlay = true,
    closeOnClickOutside = true,
    swipeThreshold,
    onOpen,
    onClose,
    onOpened,
    onClosed,
    tokensOverride,
    style,
    ...rest
  } = props

  const tokens = useDropdownMenuTokens(tokensOverride)

  const [menuValue = {}, onMenuChange] = useControllableValue<Record<string, string | number>>(props, {
    defaultValue: {},
  })

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeIndexRef = useRef<number | null>(null)

  const [panel, setPanel] = useState<React.ReactNode>(null)
  const [mounted, setMounted] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  const barRef = useRef<View>(null)
  const [barFrame, setBarFrame] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const [barWidth, setBarWidth] = useState(0)
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()

  const panelRegistryRef = useRef(new Map<number, React.ReactNode>())

  const zIndex = parseNumber(zIndexProp, 10)
  const durationMs =
    duration === undefined ? 200 : Math.max(0, parseNumber(duration, 0.2)) * 1000
  const thresholdRaw = swipeThreshold === undefined ? undefined : parseNumberLike(swipeThreshold)
  const threshold =
    thresholdRaw !== undefined && thresholdRaw > 0 ? Math.floor(thresholdRaw) : undefined

  const progress = useRef(new Animated.Value(0)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  const runAnimation = useCallback(
    (toValue: number, onFinished?: () => void) => {
      animationRef.current?.stop()
      if (durationMs === 0) {
        progress.setValue(toValue)
        onFinished?.()
        return
      }
      const animation = Animated.timing(progress, {
        toValue,
        duration: durationMs,
        useNativeDriver: nativeDriverEnabled,
      })
      animationRef.current = animation
      animation.start(({ finished }) => {
        if (!finished) return
        onFinished?.()
      })
    },
    [durationMs, progress],
  )

  const registerPanel = useCallback((index: number, content: React.ReactNode) => {
    panelRegistryRef.current.set(index, content)
    if (activeIndexRef.current === index) {
      setPanel(content)
    }
  }, [])

  const showItem = useCallback(
    (index: number) => {
      if (disabled) return
      activeIndexRef.current = index
      setActiveIndex(index)
      setPanel(panelRegistryRef.current.get(index) ?? null)
    },
    [disabled],
  )

  const closeMenu = useCallback(() => {
    activeIndexRef.current = null
    setActiveIndex(null)
  }, [])

  const toggleItem = useCallback(
    (index: number) => {
      if (disabled) return
      if (activeIndexRef.current === index) {
        closeMenu()
        return
      }
      showItem(index)
    },
    [closeMenu, disabled, showItem],
  )

  useImperativeHandle(
    ref,
    () => ({
      toggleItem,
      showItem,
      close: closeMenu,
    }),
    [closeMenu, showItem, toggleItem],
  )

  const requestMeasure = useCallback((fallbackHeight?: number) => {
    const node = barRef.current

    if (!node) {
      const fallback = {
        x: 0,
        y: 0,
        width: barWidth || windowWidth,
        height: fallbackHeight ?? barHeight,
      }
      setBarFrame(prev => (isSameFrame(prev, fallback) ? prev : fallback))
      return
    }

    measureInWindow(node, rect => {
      if (rect) {
        const next = { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        if (
          !Number.isFinite(next.x) ||
          !Number.isFinite(next.y) ||
          !Number.isFinite(next.width) ||
          !Number.isFinite(next.height)
        )
          return
        setBarFrame(prev => (isSameFrame(prev, next) ? prev : next))
        return
      }

      const fallback = {
        x: 0,
        y: 0,
        width: barWidth || windowWidth,
        height: fallbackHeight ?? barHeight,
      }
      setBarFrame(prev => (isSameFrame(prev, fallback) ? prev : fallback))
    })
  }, [barHeight, barWidth, windowWidth])

  const prevActiveIndexRef = useRef<number | null>(null)
  useEffect(() => {
    const prev = prevActiveIndexRef.current
    prevActiveIndexRef.current = activeIndex
    if (activeIndex !== null && prev === null) {
      setMounted(true)
      requestMeasure()
      setPanel(panelRegistryRef.current.get(activeIndex) ?? null)
      onOpen?.()
      progress.setValue(0)
      runAnimation(1, () => onOpened?.())
      return
    }
    if (activeIndex === null && prev !== null) {
      onClose?.()
      runAnimation(0, () => {
        setMounted(false)
        setPanel(null)
        onClosed?.()
      })
    }
  }, [activeIndex, onClose, onClosed, onOpen, onOpened, progress, requestMeasure, runAnimation])

  useEffect(() => {
    if (!mounted) return
    requestMeasure()
  }, [mounted, requestMeasure, windowHeight])

  useEffect(
    () => () => {
      animationRef.current?.stop()
    },
    [],
  )

  const barScrollable = threshold !== undefined && React.Children.count(children) > threshold

  const contextValue = useMemo(() => ({
    activeIndex,
    registerPanel,
    toggleItem,
    showItem,
    closeMenu,
    activeColor,
    activeIcon,
    direction,
    disabled,
    menuValue,
    onMenuChange,
  }), [activeColor, activeIcon, activeIndex, closeMenu, direction, disabled, menuValue, onMenuChange, registerPanel, showItem, toggleItem])

  const shouldRenderMask = mounted && (overlay || closeOnClickOutside)
  const shouldCloseOnMask = closeOnClickOverlay || closeOnClickOutside

  const resolvedBarTop = barFrame?.y ?? 0
  const resolvedBarHeight = barFrame?.height ?? barHeight
  const resolvedBarLeft = barFrame?.x ?? 0
  const resolvedBarWidth = barFrame?.width ?? (barWidth || windowWidth)
  const resolvedBarBottom = resolvedBarTop + resolvedBarHeight
  const bottomInset = Math.max(0, windowHeight - resolvedBarTop)

  const insetStyle = useMemo(
    () => (direction === 'up' ? { bottom: bottomInset } : { top: resolvedBarBottom }),
    [bottomInset, direction, resolvedBarBottom]
  )
  const panelPositionStyle = useMemo(
    () => ({ left: resolvedBarLeft, width: resolvedBarWidth }),
    [resolvedBarLeft, resolvedBarWidth]
  )
  const panelRadiusStyle = direction === 'up' ? styles.panelUp : styles.panelDown

  const panelAnimatedStyle = useMemo(() => ({
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: direction === 'up' ? [8, 0] : [-8, 0],
        }),
      },
    ],
  }), [direction, progress])

  const { zIndex: stackZIndex } = useOverlayStack({
    visible: mounted,
    lockScroll: shouldRenderMask,
    zIndex,
    type: 'dropdown-menu',
  })

  const resolvedZIndex = stackZIndex ?? zIndex

  const barChildren = useMemo(() => React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child
    const element = child as React.ReactElement<Record<string, unknown>>
    return React.cloneElement(element, { index, barScrollable })
  }), [barScrollable, children])

  const barStyle = useMemo(() => ([
    styles.barWrapper,
    {
      height: tokens.sizing.barHeight,
      backgroundColor: tokens.colors.barBackground,
      paddingHorizontal: tokens.spacing.horizontal,
      zIndex: mounted ? resolvedZIndex + 1 : undefined,
      ...tokens.shadow,
    },
    createHairlineBorderBottom(tokens.colors.divider),
  ]), [
    mounted,
    resolvedZIndex,
    tokens.colors.barBackground,
    tokens.colors.divider,
    tokens.shadow,
    tokens.sizing.barHeight,
    tokens.spacing.horizontal,
  ])

  const handleBarLayout = useCallback(
    (event: { nativeEvent: { layout: { height: number; width: number } } }) => {
      const { height, width } = event.nativeEvent.layout
      setBarHeight(height)
      setBarWidth(width)
      requestMeasure(height)
    },
    [requestMeasure],
  )

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <View {...rest} style={[styles.container, style]}>
        <View
          ref={barRef}
          collapsable={false}
          style={barStyle}
          onLayout={handleBarLayout}
        >
          {barScrollable ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.barScrollContent}
            >
              {barChildren}
            </ScrollView>
          ) : (
            <View style={styles.bar}>
              {barChildren}
            </View>
          )}
        </View>

        {mounted ? (
          <Portal>
            <View style={styles.portal} pointerEvents="box-none">
              {shouldRenderMask ? (
                <AnimatedPressable
                  style={[
                    styles.mask,
                    insetStyle,
                    {
                      backgroundColor: overlay ? tokens.colors.mask : 'transparent',
                      opacity: progress,
                      zIndex: resolvedZIndex,
                    },
                  ]}
                  testID="rv-dropdown-mask"
                  pointerEvents={mounted ? 'auto' : 'none'}
                  onPress={() => {
                    if (shouldCloseOnMask) {
                      closeMenu()
                    }
                  }}
                />
              ) : null}

              <Animated.View
                style={[
                  styles.panel,
                  insetStyle,
                  panelPositionStyle,
                  panelRadiusStyle,
                  panelAnimatedStyle,
                  {
                    backgroundColor: tokens.colors.panelBackground,
                    maxHeight: tokens.sizing.panelMaxHeight,
                    zIndex: resolvedZIndex + 1,
                  },
                ]}
                pointerEvents="box-none"
              >
                {panel}
              </Animated.View>
            </View>
          </Portal>
        ) : null}
      </View>
    </DropdownMenuContext.Provider>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  barWrapper: {
    flexDirection: 'row',
    position: 'relative',
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barScrollContent: {
    flexDirection: 'row',
  },
  portal: {
    ...StyleSheet.absoluteFillObject,
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
  },
  panel: {
    position: 'absolute',
    overflow: 'hidden',
  },
  panelUp: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  panelDown: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
})

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
