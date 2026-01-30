import React, { useMemo } from 'react'
import {
  Animated,
  Platform,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native'

import { isFunction, isText } from '../../utils'
import { useAriaPress, useSafeAreaPadding } from '../../hooks'
import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'
import type { NotifyProps, NotifyPosition } from './types'
import { useNotifyTokens } from './tokens'

export type { NotifyProps, NotifyPosition, NotifyType, NotifyTokens } from './types'

export const Notify: React.FC<NotifyProps> = props => {
  const {
    visible,
    message,
    type: typeProp,
    duration: durationProp,
    position: positionProp,
    offset: offsetProp,
    color,
    background,
    zIndex,
    closeOnClick: closeOnClickProp,
    style,
    textStyle,
    tokensOverride,
    onClick,
    onClose,
    onOpen,
    onOpened,
    onClosed,
  } = props

  const tokens = useNotifyTokens(tokensOverride)
  const paddingVertical = tokens.spacing.paddingVertical
  const safeAreaPadding = useSafeAreaPadding({
    top: 0,
    bottom: 0,
  })
  const type = typeProp ?? tokens.defaults.type
  const position: NotifyPosition = positionProp ?? tokens.defaults.position
  const closeOnClick = closeOnClickProp ?? tokens.defaults.closeOnClick
  const safeAreaInsetTop =
    props.safeAreaInsetTop ??
    (position === 'top' ? tokens.defaults.safeAreaInsetTop : false)
  const safeAreaInsetBottom =
    props.safeAreaInsetBottom ??
    (position === 'bottom' ? tokens.defaults.safeAreaInsetBottom : false)
  const safeTop = safeAreaInsetTop && position === 'top'
    ? safeAreaPadding.paddingTop
    : 0
  const safeBottom = safeAreaInsetBottom && position === 'bottom'
    ? safeAreaPadding.paddingBottom
    : 0
  const offset = typeof offsetProp === 'number' && Number.isFinite(offsetProp) ? Math.max(0, offsetProp) : 0
  const addOffset = (value: number | string, delta: number) =>
    typeof value === 'string' ? `calc(${value} + ${delta}px)` : value + delta
  const safeBottomInset =
    safeAreaInsetBottom && position === 'bottom' && typeof safeBottom === 'number'
      ? safeBottom + offset
      : offset
  const webTopPadding =
    Platform.OS === 'web' && position === 'top'
      ? addOffset(safeTop, offset)
      : undefined
  const webBottomPadding =
    Platform.OS === 'web' && safeAreaInsetBottom && position === 'bottom'
      ? addOffset(safeBottom, offset)
      : undefined

  const variant = tokens.colors.variants[type]
  const resolvedBackground = background ?? variant.background
  const resolvedTextColor = color ?? variant.text
  const resolvedDuration = durationProp ?? tokens.defaults.duration

  const [barHeight, setBarHeight] = React.useState(0)
  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height
    if (!height) return
    setBarHeight(prev => (prev === height ? prev : height))
  }

  // 关键：静态调用时 Notify 初次挂载的 visible=true，需要执行进入动画
  const canAnimate = barHeight > 0
  const { mounted, animated } = usePresenceAnimation(visible, {
    duration: tokens.defaults.animationDuration,
    appear: true,
    canAnimate,
  })
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'notify', zIndex })
  const resolvedZIndex = stackZIndex ?? zIndex

  const prevVisibleRef = React.useRef(visible)
  const closingRef = React.useRef(false)

  React.useEffect(() => {
    let openedTimer: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      closingRef.current = false
      if (!prevVisibleRef.current) {
        onOpen?.()
        if (onOpened) openedTimer = setTimeout(onOpened, tokens.defaults.animationDuration)
      }
    } else if (prevVisibleRef.current) {
      closingRef.current = true
    }
    prevVisibleRef.current = visible
    return () => {
      if (openedTimer) clearTimeout(openedTimer)
    }
  }, [onOpen, onOpened, tokens.defaults.animationDuration, visible])

  React.useEffect(() => {
    if (!mounted && closingRef.current) {
      closingRef.current = false
      onClosed?.()
    }
  }, [mounted, onClosed])

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (visible && resolvedDuration > 0) {
      timer = setTimeout(() => {
        onClose?.()
      }, resolvedDuration)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [onClose, resolvedDuration, visible])

  const contentHeight = barHeight > 0 ? barHeight : tokens.sizing.minHeight

  const interactive = closeOnClick || isFunction(onClick)
  const handlePress = () => {
    onClick?.()
    if (closeOnClick) onClose?.()
  }
  const accessibilityRole = interactive ? 'button' : 'alert'
  const press = useAriaPress({
    disabled: !interactive,
    onPress: handlePress,
    extraProps: {
      accessibilityRole,
      accessibilityLiveRegion: 'assertive',
    },
  })

  const translateY = useMemo(
    () =>
      position === 'bottom'
        ? animated.interpolate({
          inputRange: [0, 1],
          outputRange: [contentHeight, 0],
        })
        : animated.interpolate({
          inputRange: [0, 1],
          outputRange: [-contentHeight, 0],
        }),
    [animated, contentHeight, position],
  )

  const hasMessage = message !== undefined && message !== null && message !== false && message !== ''

  if (!mounted) return null

  const bar = (
    <View
      style={[
        tokens.layout.container,
        position === 'top'
          ? ({ paddingTop: webTopPadding ?? addOffset(safeTop, offset) } as ViewStyle)
          : null,
        webBottomPadding !== undefined
          ? ({ paddingBottom: webBottomPadding } as ViewStyle)
          : null,
      ]}
    >
      <View style={{ height: contentHeight, overflow: 'hidden' }}>
        <Animated.View
          testID="rv-notify-bar"
          accessibilityRole={!interactive ? accessibilityRole : undefined}
          accessibilityLiveRegion={!interactive ? 'assertive' : undefined}
          onLayout={handleLayout}
          style={[
            tokens.layout.container,
            {
              opacity: animated,
              transform: [{ translateY }],
            } as ViewStyle,
            style,
          ]}
        >
          <View style={{ backgroundColor: resolvedBackground }}>
            <View
              style={[
                tokens.layout.content,
                {
                  paddingHorizontal: tokens.spacing.paddingHorizontal,
                  paddingVertical,
                  minHeight: tokens.sizing.minHeight,
                },
              ]}
            >
              {hasMessage
                ? isText(message)
                  ? (
                    <Text
                      style={[
                        tokens.layout.text,
                        {
                          color: resolvedTextColor,
                          fontSize: tokens.typography.fontSize,
                          lineHeight: tokens.typography.lineHeight,
                        },
                        textStyle,
                      ]}
                    >
                      {message}
                    </Text>
                  )
                  : (
                    message
                  )
                : null}
            </View>
          </View>
        </Animated.View>
      </View>
      {position === 'bottom' ? <View style={{ height: safeBottomInset }} /> : null}
    </View>
  )

  return (
    <Portal>
      <View
        testID="rv-notify"
        pointerEvents={interactive ? 'box-none' : 'none'}
        style={[
          tokens.layout.portal,
          position === 'bottom' ? { bottom: 0 } : { top: 0 },
          resolvedZIndex !== undefined && resolvedZIndex !== null
            ? { zIndex: resolvedZIndex }
            : null,
        ]}
      >
        {interactive ? (
          <Pressable {...press.interactionProps} disabled={!interactive}>
            {bar}
          </Pressable>
        ) : (
          bar
        )}
      </View>
    </Portal>
  )
}

Notify.displayName = 'Notify'

export default Notify
