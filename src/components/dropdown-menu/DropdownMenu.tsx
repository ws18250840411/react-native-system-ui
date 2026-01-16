import React from 'react'
import { Animated, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'

import { useControllableValue } from '../../hooks'
import { measureInWindow, nativeDriverEnabled } from '../../platform'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'
import { createHairlineBorderBottom } from '../../utils/hairline'
import { parseNumber, parseNumberLike } from '../../utils/number'
import type { DropdownMenuInstance, DropdownMenuProps } from './types'
import { DropdownMenuContext } from './DropdownMenuContext'
import { useDropdownMenuTokens } from './tokens'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const isSameFrame = (
  prev: { y: number; height: number } | null,
  next: { y: number; height: number }
) => prev != null && Math.abs(prev.y - next.y) < 0.5 && Math.abs(prev.height - next.height) < 0.5

const DropdownMenu = React.forwardRef<DropdownMenuInstance, DropdownMenuProps>((props, ref) => {
  const {
    children,
    activeColor,
    activeIcon,
    direction = 'down',
    disabled = false,
    zIndex: zIndexProp = 10,
    duration,
    overlay = true,
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

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const activeIndexRef = React.useRef<number | null>(null)

  const [panel, setPanel] = React.useState<React.ReactNode>(null)
  const [mounted, setMounted] = React.useState(false)
  const [barHeight, setBarHeight] = React.useState(0)
  const barRef = React.useRef<View>(null)
  const [barFrame, setBarFrame] = React.useState<{ y: number; height: number } | null>(null)
  const { height: windowHeight } = useWindowDimensions()

  const panelRegistryRef = React.useRef(new Map<number, React.ReactNode>())

  const zIndex = parseNumber(zIndexProp, 10)
  const durationMs =
    duration === undefined ? 200 : Math.max(0, parseNumber(duration, 0.2)) * 1000
  const thresholdRaw = swipeThreshold === undefined ? undefined : parseNumberLike(swipeThreshold)
  const threshold =
    thresholdRaw !== undefined && thresholdRaw > 0 ? Math.floor(thresholdRaw) : undefined

  const progress = React.useRef(new Animated.Value(0)).current
  const animationRef = React.useRef<Animated.CompositeAnimation | null>(null)

  const runAnimation = React.useCallback(
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

  const registerPanel = React.useCallback((index: number, content: React.ReactNode) => {
    panelRegistryRef.current.set(index, content)
    if (activeIndexRef.current === index) {
      setPanel(content)
    }
  }, [])

  const showItem = React.useCallback(
    (index: number) => {
      if (disabled) return
      activeIndexRef.current = index
      setActiveIndex(index)
      setPanel(panelRegistryRef.current.get(index) ?? null)
    },
    [disabled],
  )

  const closeMenu = React.useCallback(() => {
    activeIndexRef.current = null
    setActiveIndex(null)
  }, [])

  const toggleItem = React.useCallback(
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

  React.useImperativeHandle(
    ref,
    () => ({
      toggleItem,
      showItem,
      close: closeMenu,
    }),
    [closeMenu, showItem, toggleItem],
  )

  const requestMeasure = React.useCallback((fallbackHeight?: number) => {
    const node = barRef.current

    if (!node) {
      const fallback = { y: 0, height: fallbackHeight ?? barHeight }
      setBarFrame(prev => (isSameFrame(prev, fallback) ? prev : fallback))
      return
    }

    measureInWindow(node, rect => {
      if (rect) {
        const next = { y: rect.y, height: rect.height }
        if (!Number.isFinite(next.y) || !Number.isFinite(next.height)) return
        setBarFrame(prev => (isSameFrame(prev, next) ? prev : next))
        return
      }

      const fallback = { y: 0, height: fallbackHeight ?? barHeight }
      setBarFrame(prev => (isSameFrame(prev, fallback) ? prev : fallback))
    })
  }, [barHeight])

  const prevActiveIndexRef = React.useRef<number | null>(null)
  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!mounted) return
    requestMeasure()
  }, [mounted, requestMeasure, windowHeight])

  React.useEffect(
    () => () => {
      animationRef.current?.stop()
    },
    [],
  )

  const barScrollable = threshold !== undefined && React.Children.count(children) > threshold

  const contextValue = React.useMemo(
    () => ({
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
    }),
    [
      activeColor,
      activeIcon,
      activeIndex,
      closeMenu,
      direction,
      disabled,
      registerPanel,
      showItem,
      toggleItem,
      menuValue,
      onMenuChange,
    ],
  )

  const shouldRenderMask = mounted && (overlay || closeOnClickOutside)
  const shouldCloseOnMask = closeOnClickOverlay || closeOnClickOutside

  const resolvedBarTop = barFrame?.y ?? 0
  const resolvedBarHeight = barFrame?.height ?? barHeight
  const resolvedBarBottom = resolvedBarTop + resolvedBarHeight
  const bottomInset = Math.max(0, windowHeight - resolvedBarTop)

  const insetStyle = direction === 'up' ? { bottom: bottomInset } : { top: resolvedBarBottom }
  const panelRadiusStyle = direction === 'up' ? styles.panelUp : styles.panelDown

  const offset = 8
  const translate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: direction === 'up' ? [offset, 0] : [-offset, 0],
  })
  const panelAnimatedStyle = {
    opacity: progress,
    transform: [{ translateY: translate }],
  }

  const { zIndex: stackZIndex } = useOverlayStack({
    visible: mounted,
    lockScroll: shouldRenderMask,
    zIndex,
    type: 'dropdown-menu',
  })

  const resolvedZIndex = stackZIndex ?? zIndex

  const barChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child
    const element = child as React.ReactElement<Record<string, unknown>>
    return React.cloneElement(element, { index, barScrollable })
  })

  const barStyle = [
    styles.barWrapper,
    {
      height: tokens.sizing.barHeight,
      backgroundColor: tokens.colors.barBackground,
      paddingHorizontal: tokens.spacing.horizontal,
      zIndex: mounted ? resolvedZIndex + 1 : undefined,
      ...tokens.shadow,
    },
    createHairlineBorderBottom(tokens.colors.divider),
  ]

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <View {...rest} style={[styles.container, style]}>
        <View
          ref={barRef}
          collapsable={false}
          style={barStyle}
          onLayout={event => {
            const { height } = event.nativeEvent.layout
            setBarHeight(height)
            requestMeasure(height)
          }}
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
    left: 0,
    right: 0,
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
