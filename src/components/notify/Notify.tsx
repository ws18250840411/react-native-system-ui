import React from 'react'
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { isFunction, isText } from '../../utils/validate'
import { useAriaPress } from '../../hooks'
import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'
export type NotifyPosition = 'top' | 'bottom'

export interface NotifyProps {
  visible: boolean
  message?: React.ReactNode
  type?: NotifyType
  duration?: number
  position?: NotifyPosition
  color?: string
  background?: string
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
  zIndex?: number
  closeOnClick?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<NotifyTokens>
  onClick?: () => void
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

export interface NotifyTokens {
  colors: {
    variants: Record<NotifyType, { background: string; text: string }>
  }
  fontSize: number
  lineHeight: number
  paddingVertical: number
  paddingHorizontal: number
  minHeight: number
  animationDuration: number
  defaultDuration: number
}

const createNotifyTokens = (foundations: Foundations): NotifyTokens => ({
  colors: {
    variants: {
      primary: {
        background: foundations.palette.primary[500],
        text: foundations.palette.primary.foreground ?? '#ffffff',
      },
      success: {
        background: foundations.palette.success[500],
        text: foundations.palette.success.foreground ?? '#ffffff',
      },
      danger: {
        background: foundations.palette.danger[500],
        text: foundations.palette.danger.foreground ?? '#ffffff',
      },
      warning: {
        background: foundations.palette.warning[500],
        text: foundations.palette.warning.foreground ?? '#261400',
      },
    },
  },
  fontSize: foundations.fontSize.sm,
  lineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
  paddingVertical: foundations.spacing.sm,
  paddingHorizontal: foundations.spacing.md,
  minHeight: 40,
  animationDuration: 180,
  defaultDuration: 3000,
})

const useNotifyTokens = createComponentTokensHook('notify', createNotifyTokens)

export const Notify: React.FC<NotifyProps> = props => {
  const {
    visible,
    message,
    type = 'primary',
    duration,
    position = 'top',
    color,
    background,
    safeAreaInsetTop = position === 'top',
    safeAreaInsetBottom = position === 'bottom',
    zIndex,
    closeOnClick = false,
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
  const variant = tokens.colors.variants[type]
  const resolvedBackground = background ?? variant.background
  const resolvedTextColor = color ?? variant.text
  const resolvedDuration = duration ?? tokens.defaultDuration

  // 关键：静态调用时 Notify 初次挂载的 visible=true，需要执行进入动画
  const { mounted, animated } = usePresenceAnimation(visible, {
    duration: tokens.animationDuration,
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
        if (onOpened) openedTimer = setTimeout(onOpened, tokens.animationDuration)
      }
    } else if (prevVisibleRef.current) {
      closingRef.current = true
    }
    prevVisibleRef.current = visible
    return () => {
      if (openedTimer) clearTimeout(openedTimer)
    }
  }, [onOpen, onOpened, tokens.animationDuration, visible])

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

  const translateDistance = barHeight || tokens.minHeight
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
          styles.portal,
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
              styles.container,
              {
                backgroundColor: resolvedBackground,
                opacity: animated,
                transform: [{ translateY }],
              },
              style,
            ]}
          >
            {safeAreaInsetTop ? <SafeAreaView style={styles.safeArea} /> : null}
            <View
              style={[
                styles.content,
                {
                  paddingHorizontal: tokens.paddingHorizontal,
                  paddingVertical: tokens.paddingVertical,
                  minHeight: tokens.minHeight,
                },
              ]}
            >
              {hasMessage
                ? isText(message)
                  ? (
                    <Text
                      style={[
                        styles.text,
                        {
                          color: resolvedTextColor,
                          fontSize: tokens.fontSize,
                          lineHeight: tokens.lineHeight,
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
            {safeAreaInsetBottom ? <SafeAreaView style={styles.safeArea} /> : null}
          </Animated.View>
        </Pressable>
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  portal: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  container: {
    width: '100%',
  },
  safeArea: {
    width: '100%',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})

Notify.displayName = 'Notify'

export default Notify
