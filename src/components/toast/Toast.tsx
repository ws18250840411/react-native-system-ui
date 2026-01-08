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
import type { DeepPartial } from '../../types'
import { isText } from '../../utils/validate'
import { useToastTokens } from './tokens'
import type { ToastTokens } from './tokens'

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
  tokensOverride?: DeepPartial<ToastTokens>
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
    tokensOverride,
    style,
    textStyle,
    onClose,
    onOpen,
    onOpened,
    onClosed,
  } = props

  const tokens = useToastTokens(tokensOverride)
  const { colors } = tokens
  const { height: windowHeight } = useWindowDimensions()
  const { mounted, animated } = usePresenceAnimation(visible, { duration: tokens.animationDuration })
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'toast' })
  const prevVisibleRef = React.useRef(visible)
  const closingRef = React.useRef(false)
  const positionOffset = windowHeight > 0 ? Math.round(windowHeight * 0.2) : 60
  const positionStyle: ViewStyle =
    position === 'top'
      ? { justifyContent: 'flex-start', paddingTop: positionOffset }
      : position === 'bottom'
        ? { justifyContent: 'flex-end', paddingBottom: positionOffset }
        : { justifyContent: 'center' }

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
    let openedTimer: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      closingRef.current = false
      if (!prevVisibleRef.current) {
        onOpen?.()
        if (onOpened) {
          openedTimer = setTimeout(onOpened, tokens.animationDuration)
        }
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

  const handleClose = () => {
    onClose?.()
  }

  const toastPress = useAriaPress({
    disabled: !closeOnClick,
    onPress: handleClose,
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
        return <Checked size={resolvedIconSize} fill={colors.text} color={colors.text} />
      case 'fail':
        return <Close size={resolvedIconSize} fill={colors.text} color={colors.text} />
      case 'loading':
        return (
          loadingIndicator ?? (
            <Loading type={loadingType} color={colors.text} size={resolvedIconSize} />
          )
        )
      default:
        return null
    }
  }
  const iconNode = renderIcon()
  const isTextToast = type === 'info' && !iconNode
  const boxStyle: ViewStyle = isTextToast
    ? {
      minWidth: tokens.textMinWidth,
      minHeight: 0,
      paddingVertical: tokens.textPaddingVertical,
      paddingHorizontal: tokens.textPaddingHorizontal,
    }
    : {
      minWidth: tokens.defaultWidth,
      minHeight: tokens.defaultMinHeight,
      padding: tokens.defaultPadding,
    }
  const toastStyle = {
    borderRadius: tokens.radius,
    opacity: closeOnClick && toastPress.states.pressed ? 0.85 : animated,
    backgroundColor: tokens.colors.variants[type],
    maxWidth: tokens.maxWidth,
    ...boxStyle,
  } as Animated.WithAnimatedValue<ViewStyle>

  if (!mounted) return null

  const hasMessage = message !== undefined && message !== null && message !== false && message !== ''

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
            style={[styles.overlay, overlay ? { backgroundColor: colors.backdrop } : null, overlayStyle]}
            pointerEvents="auto"
            onPress={overlay && closeOnClickOverlay ? handleClose : undefined}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
          />
        ) : null}
        <Pressable disabled={!closeOnClick} {...toastPress.interactionProps}>
          <Animated.View
            style={[
              styles.toast,
              toastStyle,
              style,
            ]}
          >
            {iconNode ? (
              <View style={{ marginBottom: tokens.gap }}>{iconNode}</View>
            ) : null}
            {hasMessage
              ? isText(message)
                ? (
                  <Text
                    style={[
                      styles.message,
                      { color: colors.text, fontSize: tokens.fontSize, lineHeight: tokens.lineHeight },
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
