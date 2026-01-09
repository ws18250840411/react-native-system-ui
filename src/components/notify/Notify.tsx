import React from 'react'
import {
  Animated,
  Pressable,
  SafeAreaView,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native'

import { isFunction, isText } from '../../utils/validate'
import { useAriaPress } from '../../hooks'
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
  const type = typeProp ?? tokens.defaults.type
  const position: NotifyPosition = positionProp ?? tokens.defaults.position
  const closeOnClick = closeOnClickProp ?? tokens.defaults.closeOnClick
  const safeAreaInsetTop =
    props.safeAreaInsetTop ??
    (position === 'top' ? tokens.defaults.safeAreaInsetTop : false)
  const safeAreaInsetBottom =
    props.safeAreaInsetBottom ??
    (position === 'bottom' ? tokens.defaults.safeAreaInsetBottom : false)

  const variant = tokens.colors.variants[type]
  const resolvedBackground = background ?? variant.background
  const resolvedTextColor = color ?? variant.text
  const resolvedDuration = durationProp ?? tokens.defaults.duration

  // 关键：静态调用时 Notify 初次挂载的 visible=true，需要执行进入动画
  const { mounted, animated } = usePresenceAnimation(visible, {
    duration: tokens.defaults.animationDuration,
    appear: true,
  })
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'notify', zIndex })

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

  const interactive = closeOnClick || isFunction(onClick)
  const handlePress = () => {
    onClick?.()
    if (closeOnClick) onClose?.()
  }
  const press = useAriaPress({
    disabled: !interactive,
    onPress: handlePress,
    extraProps: {
      accessibilityRole: interactive ? 'button' : 'alert',
      accessibilityLiveRegion: 'assertive',
    },
  })

  const [barHeight, setBarHeight] = React.useState(0)
  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height
    if (!height) return
    setBarHeight(prev => (prev === height ? prev : height))
  }

  const translateDistance = barHeight || tokens.sizing.minHeight
  const translateY =
    position === 'bottom'
      ? animated.interpolate({
        inputRange: [0, 1],
        outputRange: [translateDistance, 0],
      })
      : animated.interpolate({
        inputRange: [0, 1],
        outputRange: [-translateDistance, 0],
      })

  const hasMessage = message !== undefined && message !== null && message !== false && message !== ''

  if (!mounted) return null

  const resolvedZIndex = stackZIndex ?? zIndex

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
        <Pressable
          {...press.interactionProps}
          disabled={!interactive}
        >
          <Animated.View
            testID="rv-notify-bar"
            onLayout={handleLayout}
            style={[
              tokens.layout.container,
              {
                backgroundColor: resolvedBackground,
                opacity: animated,
                transform: [{ translateY }],
              },
              style,
            ]}
          >
            {safeAreaInsetTop ? <SafeAreaView style={tokens.layout.safeArea} /> : null}
            <View
              style={[
                tokens.layout.content,
                {
                  paddingHorizontal: tokens.spacing.paddingHorizontal,
                  paddingVertical: tokens.spacing.paddingVertical,
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
            {safeAreaInsetBottom ? <SafeAreaView style={tokens.layout.safeArea} /> : null}
          </Animated.View>
        </Pressable>
      </View>
    </Portal>
  )
}

Notify.displayName = 'Notify'

export default Notify
