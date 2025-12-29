import React from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import Portal from '../portal/Portal'
import { useAriaPress } from '../../hooks'
import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import Loading from '../loading'
import { Checked, Close } from 'react-native-system-icon'
import { useOverlayStack } from '../overlay'
import type { LoadingType } from '../loading'
import { useToastTokens } from './tokens'

export type ToastPosition = 'top' | 'middle' | 'bottom'
export type ToastType = 'info' | 'success' | 'fail' | 'loading'

export interface ToastProps {
  visible: boolean
  message?: React.ReactNode
  icon?: React.ReactNode
  type?: ToastType
  iconSize?: number
  loadingType?: LoadingType
  duration?: number
  position?: ToastPosition
  forbidClick?: boolean
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  closeOnClickOverlay?: boolean
  closeOnClick?: boolean
  loadingIndicator?: React.ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

export const Toast: React.FC<ToastProps> = props => {
  const {
    visible,
    message,
    icon,
    type = 'info',
    iconSize,
    loadingType = 'circular',
    duration = 2000,
    position = 'middle',
    forbidClick = false,
    overlay = false,
    overlayStyle,
    closeOnClickOverlay = false,
    closeOnClick = false,
    loadingIndicator,
    style,
    textStyle,
    onClose,
    onOpen,
    onOpened,
    onClosed,
  } = props

  const tokens = useToastTokens()
  const { height: windowHeight } = useWindowDimensions()
  const { mounted, animated } = usePresenceAnimation(visible, { duration: tokens.animationDuration })
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'toast' })
  const prevVisibleRef = React.useRef(visible)
  const closingRef = React.useRef(false)
  const positionOffset = windowHeight > 0 ? Math.round(windowHeight * 0.2) : 60
  const positionStyle = React.useMemo<ViewStyle>(() => {
    if (position === 'top') return { justifyContent: 'flex-start', paddingTop: positionOffset }
    if (position === 'bottom') return { justifyContent: 'flex-end', paddingBottom: positionOffset }
    return { justifyContent: 'center' }
  }, [position, positionOffset])

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      if (duration > 0) {
        timer = setTimeout(() => {
          onClose?.()
        }, duration)
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [duration, onClose, visible])

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

  const handleCloseOnPress = React.useCallback(() => {
    onClose?.()
  }, [onClose])

  const toastPress = useAriaPress({
    disabled: !closeOnClick,
    onPress: handleCloseOnPress,
    extraProps: {
      accessibilityRole: closeOnClick ? 'button' : 'alert',
      accessibilityHint: closeOnClick ? '双击关闭提示' : undefined,
      accessibilityLiveRegion: 'assertive',
    },
  })

  const renderIcon = () => {
    if (icon) return icon
    const resolvedIconSize = iconSize ?? tokens.iconSize
    switch (type) {
      case 'success':
        return <Checked size={resolvedIconSize} fill={tokens.colors.text} color={tokens.colors.text} />
      case 'fail':
        return <Close size={resolvedIconSize} fill={tokens.colors.text} color={tokens.colors.text} />
      case 'loading':
        return (
          loadingIndicator ?? (
            <Loading type={loadingType} color={tokens.colors.text} size={resolvedIconSize} />
          )
        )
      default:
        return null
    }
  }
  const iconNode = renderIcon()
  const isTextToast = type === 'info' && !iconNode

  if (!mounted) return null

  const hasMessage =
    message !== undefined &&
    message !== null &&
    message !== false &&
    !(typeof message === 'string' && message.length === 0)

  return (
    <Portal>
      <View
        style={[
          styles.backdrop,
          positionStyle,
          stackZIndex ? { zIndex: stackZIndex } : null,
        ]}
        pointerEvents={forbidClick || overlay || closeOnClick ? 'auto' : 'none'}
      >
        {overlay || forbidClick ? (
          <Pressable
            testID="rv-toast-overlay"
            style={[styles.overlay, overlay ? { backgroundColor: tokens.colors.backdrop } : null, overlayStyle]}
            pointerEvents="auto"
            onPress={overlay && closeOnClickOverlay ? handleCloseOnPress : undefined}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
          />
        ) : null}
        <Pressable disabled={!closeOnClick} {...toastPress.interactionProps}>
          <Animated.View
            style={[
              styles.toast,
              ({
                borderRadius: tokens.radius,
                opacity: closeOnClick && toastPress.states.pressed ? 0.85 : animated,
                backgroundColor: tokens.colors.variants[type],
                maxWidth: tokens.maxWidth,
                ...(isTextToast
                  ? ({
                    minWidth: tokens.textMinWidth,
                    minHeight: 0,
                    paddingVertical: tokens.textPaddingVertical,
                    paddingHorizontal: tokens.textPaddingHorizontal,
                  } as ViewStyle)
                  : ({
                    minWidth: tokens.defaultWidth,
                    minHeight: tokens.defaultMinHeight,
                    padding: tokens.defaultPadding,
                  } as ViewStyle)),
              } as Animated.WithAnimatedValue<ViewStyle>),
              style,
            ]}
          >
            {iconNode ? (
              <View style={{ marginBottom: tokens.gap }}>{iconNode}</View>
            ) : null}
            {hasMessage
              ? typeof message === 'string' || typeof message === 'number'
                ? (
                  <Text
                    style={[
                      styles.message,
                      { color: tokens.colors.text, fontSize: tokens.fontSize, lineHeight: tokens.lineHeight },
                      textStyle,
                    ]}
                  >
                    {message}
                  </Text>
                )
                : (
                  <View style={{ alignItems: 'center' }}>{message}</View>
                )
              : null}
          </Animated.View>
        </Pressable>
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  toast: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
  },
})

Toast.displayName = 'Toast'

export default Toast
