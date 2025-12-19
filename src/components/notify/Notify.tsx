import React from 'react'
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
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
  onClick?: () => void
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

interface NotifyTokens {
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

const useNotifyTokens = (overrides?: DeepPartial<NotifyTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createNotifyTokens(foundations)
    const globalOverrides = components?.notify as DeepPartial<NotifyTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

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
    onClick,
    onClose,
    onOpen,
    onOpened,
    onClosed,
  } = props

  const tokens = useNotifyTokens()
  const variant = tokens.colors.variants[type]
  const resolvedBackground = background ?? variant.background
  const resolvedTextColor = color ?? variant.text
  const resolvedDuration = duration ?? tokens.defaultDuration
  const { width: windowWidth } = useWindowDimensions()

  // 关键：静态调用时 Notify 初次挂载的 visible=true，需要执行进入动画
  const { mounted, animated } = usePresenceAnimation(visible, {
    duration: tokens.animationDuration,
    appear: true,
  })
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'notify', zIndex })

  const prevVisibleRef = React.useRef(visible)
  const closingRef = React.useRef(false)

  React.useEffect(() => {
    if (visible) {
      closingRef.current = false
      if (!prevVisibleRef.current) {
        onOpen?.()
        if (onOpened) {
          const timer = setTimeout(onOpened, tokens.animationDuration)
          return () => clearTimeout(timer)
        }
      }
      return
    }

    if (prevVisibleRef.current) {
      closingRef.current = true
    }
  }, [onOpen, onOpened, tokens.animationDuration, visible])

  React.useEffect(() => {
    if (!mounted && closingRef.current) {
      closingRef.current = false
      onClosed?.()
    }
  }, [mounted, onClosed])

  React.useEffect(() => {
    prevVisibleRef.current = visible
  }, [visible])

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

  const press = useAriaPress({
    disabled: !onClick && !closeOnClick,
    onPress: () => {
      onClick?.()
      if (closeOnClick) {
        onClose?.()
      }
    },
    extraProps: {
      accessibilityRole: closeOnClick || !!onClick ? 'button' : 'alert',
      accessibilityLiveRegion: 'assertive',
    },
  })

  const [barHeight, setBarHeight] = React.useState(0)
  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height
    if (height && height !== barHeight) setBarHeight(height)
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

  const hasMessage =
    message !== undefined &&
    message !== null &&
    message !== false &&
    !(typeof message === 'string' && message.length === 0)

  if (!mounted) return null

  const resolvedZIndex = stackZIndex ?? zIndex

  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[
          styles.portal,
          position === 'bottom' ? { bottom: 0 } : { top: 0 },
          resolvedZIndex !== undefined && resolvedZIndex !== null
            ? { zIndex: resolvedZIndex }
            : null,
        ]}
      >
        <AnimatedPressable
          {...press.interactionProps}
          onLayout={handleLayout}
          style={[
            styles.container,
            {
              width: windowWidth || '100%',
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
              ? typeof message === 'string' || typeof message === 'number'
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
        </AnimatedPressable>
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
