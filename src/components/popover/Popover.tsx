import React from 'react'
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import Portal from '../portal/Portal'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { useOverlayStack } from '../overlay'
import { usePopoverTokens } from './tokens'
import type { PopoverAction, PopoverInstance, PopoverPlacement, PopoverProps } from './types'

interface AnchorRect {
  x: number
  y: number
  width: number
  height: number
}

const getPlacementParts = (placement: PopoverPlacement) => {
  const [side, align] = placement.split('-') as [
    'top' | 'bottom' | 'left' | 'right',
    'start' | 'end' | undefined,
  ]
  return { side, align }
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const renderActionText = (action: PopoverAction, fallbackColor: string, fontSize: number) => {
  const text = action.text
  return (
    <Text
      style={{
        flex: 1,
        color: action.color ?? fallbackColor,
        fontSize,
      }}
      numberOfLines={1}
    >
      {text}
    </Text>
  )
}

const Popover = React.forwardRef<PopoverInstance, PopoverProps>((props, ref) => {
  const {
    reference,
    trigger = 'click',
    actions,
    children,
    visible,
    defaultVisible,
    placement = 'bottom',
    offset = [0, 8],
    theme = 'light',
    duration = 300,
    showArrow = true,
    overlay = false,
    overlayStyle,
    closeOnClickAction = true,
    closeOnClickOverlay = true,
    closeOnClickOutside = true,
    onVisibleChange,
    onSelect,
    onClickOverlay,
    onOpen,
    onClose,
    onOpened,
    onClosed,
    contentStyle,
    style,
    ...rest
  } = props

  const tokens = usePopoverTokens()
  const viewportMargin = tokens.layout?.viewportMargin ?? 8
  const arrowSize = tokens.layout?.arrowSize ?? 6
  const actionPanelMinWidth = tokens.layout?.actionPanelMinWidth ?? 128
  const customPanelMinWidth = tokens.layout?.customPanelMinWidth ?? 160
  const customPanelPadding = tokens.spacing?.customPanelPadding ?? 12
  const actionPanelPaddingVertical = tokens.spacing?.actionPanelPaddingVertical ?? 4
  const actionPaddingHorizontal = tokens.spacing?.actionPaddingHorizontal ?? 12
  const actionGap = tokens.spacing?.actionGap ?? 8
  const actionHeight = tokens.sizing?.actionHeight ?? 44
  const actionIconWidth = tokens.sizing?.actionIconWidth ?? 20
  const actionFontSize = tokens.typography?.actionFontSize ?? 14
  const actionPressedOpacity = tokens.opacity?.actionPressed ?? 0.85
  const actionDisabledOpacity = tokens.opacity?.actionDisabled ?? 0.5
  const hiddenScale = tokens.motion?.hiddenScale ?? 0.96
  const wrapperRef = React.useRef<View | null>(null)
  const layoutRef = React.useRef<AnchorRect | null>(null)
  const [anchor, setAnchor] = React.useState<AnchorRect | null>(null)
  const [panelSize, setPanelSize] = React.useState({ width: 0, height: 0 })
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const mountedRef = React.useRef(false)
  const isActionMode = !!actions?.length && !children

  const [internalVisible, setInternalVisible] = useControllableValue<boolean>(
    props,
    {
      defaultValue: false,
      trigger: 'onVisibleChange',
      valuePropName: 'visible',
      defaultValuePropName: 'defaultVisible',
    }
  )

  const [mounted, setMounted] = React.useState(internalVisible)
  const opacity = React.useRef(new Animated.Value(internalVisible ? 1 : 0)).current
  const scale = React.useRef(new Animated.Value(internalVisible ? 1 : hiddenScale)).current

  const requestMeasure = React.useCallback(() => {
    const node = wrapperRef.current as any

    if (node && typeof node.measureInWindow === 'function') {
      node.measureInWindow((x: number, y: number, width: number, height: number) => {
        setAnchor({ x, y, width, height })
      })
      return
    }

    if (Platform.OS === 'web' && node && typeof node.getBoundingClientRect === 'function') {
      const rect = node.getBoundingClientRect()
      setAnchor({ x: rect.left, y: rect.top, width: rect.width, height: rect.height })
      return
    }

    if (layoutRef.current) {
      setAnchor(layoutRef.current)
    }
  }, [])

  const show = React.useCallback(() => {
    requestMeasure()
    setInternalVisible(true)
  }, [requestMeasure, setInternalVisible])

  const hide = React.useCallback(() => {
    setInternalVisible(false)
  }, [setInternalVisible])

  React.useImperativeHandle(ref, () => ({ show, hide }), [hide, show])

  const handleReferencePress = React.useCallback(
    () => {
      if (trigger !== 'click') return
      if (internalVisible) {
        hide()
      } else {
        show()
      }
    },
    [hide, internalVisible, show, trigger],
  )

  const referenceNode = React.useMemo(() => {
    if (React.isValidElement(reference)) {
      if (trigger !== 'click') {
        return reference
      }
      const originalOnPress = (reference.props as any)?.onPress
      return React.cloneElement(reference as any, {
        ...(reference.props ?? {}),
        onPress: (event: Parameters<NonNullable<React.ComponentProps<typeof Pressable>['onPress']>>[0]) => {
          originalOnPress?.(event)
          handleReferencePress()
        },
      })
    }

    const node =
      typeof reference === 'string' || typeof reference === 'number'
        ? <Text>{reference}</Text>
        : reference

    return (
      <Pressable
        testID="rv-popover-reference"
        disabled={trigger !== 'click'}
        onPress={trigger === 'click' ? handleReferencePress : undefined}
      >
        {node}
      </Pressable>
    )
  }, [handleReferencePress, reference, trigger])

  const position = React.useMemo(() => {
    if (!anchor) {
      return null
    }
    const { side, align } = getPlacementParts(placement)
    const [skid, distance] = offset
    const width = panelSize.width || (isActionMode ? actionPanelMinWidth : customPanelMinWidth)
    const height = panelSize.height || 0

    let left = 0
    let top = 0

    if (side === 'bottom' || side === 'top') {
      if (align === 'start') {
        left = anchor.x + skid
      } else if (align === 'end') {
        left = anchor.x + anchor.width - width + skid
      } else {
        left = anchor.x + anchor.width / 2 - width / 2 + skid
      }

      top = side === 'bottom'
        ? anchor.y + anchor.height + distance
        : anchor.y - height - distance
    } else {
      if (align === 'start') {
        top = anchor.y + skid
      } else if (align === 'end') {
        top = anchor.y + anchor.height - height + skid
      } else {
        top = anchor.y + anchor.height / 2 - height / 2 + skid
      }

      left = side === 'right'
        ? anchor.x + anchor.width + distance
        : anchor.x - width - distance
    }

    left = clamp(left, viewportMargin, windowWidth - width - viewportMargin)
    top = clamp(top, viewportMargin, windowHeight - height - viewportMargin)

    return { top, left, width, height, side }
  }, [
    actionPanelMinWidth,
    anchor,
    customPanelMinWidth,
    isActionMode,
    offset,
    panelSize.height,
    panelSize.width,
    placement,
    viewportMargin,
    windowHeight,
    windowWidth,
  ])

  const arrowStyle = React.useMemo(() => {
    if (!anchor || !position || !showArrow) return null
    const centerX = anchor.x + anchor.width / 2
    const centerY = anchor.y + anchor.height / 2
    const background = theme === 'dark'
      ? (tokens.colors.backgroundDark ?? '#4a4a4a')
      : tokens.colors.background

    const arrowX = clamp(centerX - position.left - arrowSize, arrowSize, position.width - arrowSize * 3)
    const arrowY = clamp(centerY - position.top - arrowSize, arrowSize, position.height - arrowSize * 3)

    if (position.side === 'bottom') {
      return {
        width: 0,
        height: 0,
        borderLeftWidth: arrowSize,
        borderRightWidth: arrowSize,
        borderBottomWidth: arrowSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: background,
        position: 'absolute' as const,
        top: -arrowSize,
        left: arrowX,
      }
    }

    if (position.side === 'top') {
      return {
        width: 0,
        height: 0,
        borderLeftWidth: arrowSize,
        borderRightWidth: arrowSize,
        borderTopWidth: arrowSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: background,
        position: 'absolute' as const,
        top: position.height,
        left: arrowX,
      }
    }

    if (position.side === 'left') {
      return {
        width: 0,
        height: 0,
        borderTopWidth: arrowSize,
        borderBottomWidth: arrowSize,
        borderLeftWidth: arrowSize,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: background,
        position: 'absolute' as const,
        left: position.width,
        top: arrowY,
      }
    }

    return {
      width: 0,
      height: 0,
      borderTopWidth: arrowSize,
      borderBottomWidth: arrowSize,
      borderRightWidth: arrowSize,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: background,
      position: 'absolute' as const,
      left: -arrowSize,
      top: arrowY,
    }
  }, [anchor, arrowSize, position, showArrow, theme, tokens.colors.background, tokens.colors.backgroundDark])

  const { zIndex: stackZIndex, isTopMost } = useOverlayStack({
    visible: internalVisible,
    onClose: hide,
    closeOnBack: true,
    lockScroll: overlay,
    type: 'popover',
  })

  const backdropEnabled = overlay ? true : closeOnClickOutside

  const handleBackdropPress = React.useCallback(() => {
    if (!isTopMost) return
    if (overlay) {
      onClickOverlay?.()
      if (closeOnClickOverlay) {
        hide()
      }
      return
    }
    if (closeOnClickOutside) {
      hide()
    }
  }, [closeOnClickOutside, closeOnClickOverlay, hide, isTopMost, onClickOverlay, overlay])

  const handleActionPress = React.useCallback(
    (action: PopoverAction, index: number) => {
      if (action.disabled) return
      onSelect?.(action, index)
      if (closeOnClickAction) {
        hide()
      }
    },
    [closeOnClickAction, hide, onSelect],
  )

  React.useEffect(() => {
    if (internalVisible) {
      requestMeasure()
      setMounted(true)
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(scale, { toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }),
      ]).start(() => {
        mountedRef.current = true
        onOpened?.()
      })
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(scale, { toValue: hiddenScale, duration, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }),
      ]).start(() => {
        mountedRef.current = false
        setMounted(false)
        onClosed?.()
      })
    }
  }, [duration, hiddenScale, internalVisible, mounted, onClosed, onOpened, opacity, requestMeasure, scale])

  const prevVisibleRef = React.useRef(internalVisible)
  React.useEffect(() => {
    const prev = prevVisibleRef.current
    prevVisibleRef.current = internalVisible
    if (prev === internalVisible) return
    if (internalVisible) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }, [internalVisible, onClose, onOpen])

  React.useEffect(() => {
    if (!mounted) return
    requestMeasure()
  }, [mounted, requestMeasure, windowHeight, windowWidth])

  const panelBackground = theme === 'dark'
    ? (tokens.colors.backgroundDark ?? '#4a4a4a')
    : tokens.colors.background
  const panelText = theme === 'dark'
    ? (tokens.colors.textDark ?? '#ffffff')
    : tokens.colors.text

  return (
    <>
      <View
        ref={wrapperRef}
        collapsable={false}
        onLayout={event => {
          const { x, y, width, height } = event.nativeEvent.layout
          layoutRef.current = { x, y, width, height }
        }}
        testID="rv-popover-wrapper"
      >
        {referenceNode}
      </View>
      {mounted ? (
        <Portal>
          <View style={[StyleSheet.absoluteFill, stackZIndex ? { zIndex: stackZIndex } : null]} pointerEvents="box-none">
            {backdropEnabled ? (
              <Pressable
                testID="rv-popover-backdrop"
                style={[
                  styles.backdrop,
                  overlay ? { backgroundColor: tokens.colors.overlay } : styles.transparent,
                  overlayStyle,
                ]}
                onPress={handleBackdropPress}
              />
            ) : null}
            {position ? (
              <Animated.View
                style={[
                  styles.content,
                  {
                    top: position.top,
                    left: position.left,
                    minWidth: isActionMode ? actionPanelMinWidth : customPanelMinWidth,
                    backgroundColor: panelBackground,
                    borderRadius: tokens.radii.panel,
                    shadowColor: tokens.colors.shadow,
                    opacity,
                    transform: [{ scale }],
                    ...createPlatformShadow({
                      color: tokens.colors.shadow,
                      opacity: tokens.shadow.opacity,
                      radius: tokens.shadow.radius,
                      offsetY: tokens.shadow.offsetY,
                    }),
                  },
                  isActionMode
                    ? [styles.actionPanel, { paddingVertical: actionPanelPaddingVertical, minWidth: actionPanelMinWidth }]
                    : [styles.customPanel, { padding: customPanelPadding, minWidth: customPanelMinWidth }],
                  contentStyle,
                ]}
                onLayout={event => {
                  const { width, height } = event.nativeEvent.layout
                  setPanelSize(prev => (prev.width === width && prev.height === height ? prev : { width, height }))
                }}
              >
                {arrowStyle ? <View style={arrowStyle} /> : null}
                <View {...rest} style={style}>
                  {children
                    ? children
                    : actions?.length
                      ? (
                        <View style={[styles.actions, { minWidth: actionPanelMinWidth }]}>
                          {actions.map((action, index) => {
                            const disabled = !!action.disabled
                            return (
                              <Pressable
                                key={`${action.text}-${index}`}
                                testID={`rv-popover-action-${index}`}
                                disabled={disabled}
                                style={({ pressed }) => [
                                  styles.action,
                                  {
                                    paddingHorizontal: actionPaddingHorizontal,
                                    height: actionHeight,
                                    gap: actionGap,
                                  },
                                  pressed && !disabled ? { opacity: actionPressedOpacity } : null,
                                  disabled ? { opacity: actionDisabledOpacity } : null,
                                ]}
                                onPress={() => handleActionPress(action, index)}
                              >
                                {action.icon
                                  ? <View style={[styles.actionIcon, { width: actionIconWidth }]}>{action.icon}</View>
                                  : null}
                                {renderActionText(action, panelText, actionFontSize)}
                              </Pressable>
                            )
                          })}
                        </View>
                      )
                      : null}
                </View>
              </Animated.View>
            ) : null}
          </View>
        </Portal>
      ) : null}
    </>
  )
})

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  content: {
    position: 'absolute',
  },
  customPanel: {},
  actionPanel: {},
  actions: {},
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

Popover.displayName = 'Popover'

export default Popover
