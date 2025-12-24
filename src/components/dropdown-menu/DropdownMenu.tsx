import React from 'react'
import { Animated, Platform, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'

import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'
import { createHairlineBorderBottom } from '../../utils/hairline'
import type { DropdownMenuInstance, DropdownMenuProps } from './types'
import { DropdownMenuContext } from './DropdownMenuContext'
import { useDropdownMenuTokens } from './tokens'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const parseNumber = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

const parseDurationMs = (value: number | string | undefined, fallback: number) => {
  if (value === undefined) return fallback
  const parsed = typeof value === 'number' ? value : Number.parseFloat(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(0, parsed) * 1000
}

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
    value: valueProp,
    defaultValue: defaultValueProp,
    onChange: onChangeProp,
    onOpen,
    onClose,
    onOpened,
    onClosed,
    style,
    ...rest
  } = props

  const tokens = useDropdownMenuTokens()

  const [value, setValue] = React.useState<Record<string, string | number>>(() => {
    if (valueProp !== undefined) return valueProp
    if (defaultValueProp !== undefined) return defaultValueProp
    return {}
  })

  React.useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp)
    }
  }, [valueProp])

  const handleMenuChange = React.useCallback(
    (newValue: Record<string, string | number>) => {
      setValue(newValue)
      onChangeProp?.(newValue)
    },
    [onChangeProp]
  )

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const activeIndexRef = React.useRef(activeIndex)
  React.useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const [panel, setPanel] = React.useState<React.ReactNode>(null)
  const [mounted, setMounted] = React.useState(false)
  const [barHeight, setBarHeight] = React.useState(0)
  const barRef = React.useRef<View>(null)
  const [barFrame, setBarFrame] = React.useState<{ y: number; height: number } | null>(null)
  const { height: windowHeight } = useWindowDimensions()

  const panelRegistryRef = React.useRef(new Map<number, React.ReactNode>())

  const zIndex = React.useMemo(() => parseNumber(zIndexProp, 10), [zIndexProp])
  const durationMs = React.useMemo(() => parseDurationMs(duration, 200), [duration])
  const threshold = React.useMemo(() => {
    if (swipeThreshold === undefined) return undefined
    const parsed = parseNumber(swipeThreshold, 0)
    return parsed > 0 ? Math.floor(parsed) : undefined
  }, [swipeThreshold])

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
        useNativeDriver: Platform.OS !== 'web',
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
      setActiveIndex(index)
      setPanel(panelRegistryRef.current.get(index) ?? null)
    },
    [disabled],
  )

  const closeMenu = React.useCallback(() => {
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

  const requestMeasure = React.useCallback(() => {
    const node = barRef.current as any
    if (node && typeof node.measureInWindow === 'function') {
      node.measureInWindow((_x: number, y: number, _w: number, height: number) => {
        if (!Number.isFinite(y) || !Number.isFinite(height)) return
        setBarFrame(prev => {
          if (prev && Math.abs(prev.y - y) < 0.5 && Math.abs(prev.height - height) < 0.5) {
            return prev
          }
          return { y, height }
        })
      })
      return
    }

    setBarFrame(prev => {
      const fallback = { y: 0, height: barHeight }
      if (prev && Math.abs(prev.y - fallback.y) < 0.5 && Math.abs(prev.height - fallback.height) < 0.5) {
        return prev
      }
      return fallback
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

  const barScrollable = React.useMemo(() => {
    if (threshold === undefined) return false
    return React.Children.count(children) > threshold
  }, [children, threshold])

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
      menuValue: value,
      onMenuChange: handleMenuChange,
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
      value,
      handleMenuChange,
    ],
  )

  const shouldRenderMask = mounted && (overlay || closeOnClickOutside)
  const shouldCloseOnMask = closeOnClickOverlay || closeOnClickOutside

  const resolvedBarTop = barFrame?.y ?? 0
  const resolvedBarHeight = barFrame?.height ?? barHeight
  const resolvedBarBottom = resolvedBarTop + resolvedBarHeight
  const bottomInset = Math.max(0, windowHeight - resolvedBarTop)

  const maskInsetStyle = direction === 'up' ? { bottom: bottomInset } : { top: resolvedBarBottom }
  const panelInsetStyle = direction === 'up' ? { bottom: bottomInset } : { top: resolvedBarBottom }
  const panelRadiusStyle =
    direction === 'up'
      ? {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
      : {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }

  const panelAnimatedStyle = React.useMemo(() => {
    const offset = 8
    const translate = progress.interpolate({
      inputRange: [0, 1],
      outputRange: direction === 'up' ? [offset, 0] : [-offset, 0],
    })
    return {
      opacity: progress,
      transform: [{ translateY: translate }],
    }
  }, [direction, progress])

  const { zIndex: stackZIndex } = useOverlayStack({
    visible: mounted,
    lockScroll: shouldRenderMask,
    zIndex,
    type: 'dropdown-menu',
  })

  const resolvedZIndex = stackZIndex ?? zIndex

  const barStyle = React.useMemo(
    () => [
      styles.barWrapper,
      {
        height: tokens.sizing.barHeight,
        backgroundColor: tokens.colors.barBackground,
        paddingHorizontal: tokens.spacing.horizontal,
        ...(mounted && zIndex ? { zIndex: resolvedZIndex + 1 } : {}),
        ...tokens.shadow,
      },
      createHairlineBorderBottom(tokens.colors.divider),
    ],
    [tokens.sizing.barHeight, tokens.colors.barBackground, tokens.spacing.horizontal, tokens.colors.divider, tokens.shadow, mounted, resolvedZIndex, zIndex]
  )

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <View {...rest} style={[styles.container, style]}>
        <View
          ref={barRef}
          collapsable={false}
          style={barStyle}
          onLayout={event => {
            setBarHeight(event.nativeEvent.layout.height)
            requestMeasure()
          }}
        >
          {barScrollable ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.barScrollContent}
            >
              {React.Children.map(children, (child, index) => (
                React.isValidElement(child)
                  ? React.cloneElement(child, { index, barScrollable })
                  : child
              ))}
            </ScrollView>
          ) : (
            <View style={styles.bar}>
              {React.Children.map(children, (child, index) => (
                React.isValidElement(child)
                  ? React.cloneElement(child, { index, barScrollable })
                  : child
              ))}
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
                    maskInsetStyle,
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
                  panelInsetStyle,
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
})

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
