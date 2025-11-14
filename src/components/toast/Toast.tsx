import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import Portal from '../portal/Portal'
import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import Icon from '../icon'
import Loading from '../loading'
import { createPlatformShadow } from '../../utils/createPlatformShadow'

export type ToastPosition = 'top' | 'middle' | 'bottom'
export type ToastType = 'info' | 'success' | 'fail' | 'loading'

export interface ToastProps {
  visible: boolean
  message?: React.ReactNode
  icon?: React.ReactNode
  type?: ToastType
  duration?: number
  position?: ToastPosition
  forbidClick?: boolean
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  closeOnClick?: boolean
  loadingIndicator?: React.ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

interface ToastTokens {
  colors: {
    text: string
    backdrop: string
    variants: Record<ToastType, string>
  }
  padding: number
  radius: number
  gap: number
  maxWidth: number
}

const createToastTokens = (foundations: Foundations): ToastTokens => ({
  colors: {
    text: '#fff',
    backdrop: 'rgba(0,0,0,0.35)',
    variants: {
      info: 'rgba(0,0,0,0.82)',
      success: foundations.palette.success[600],
      fail: foundations.palette.danger[600],
      loading: 'rgba(0,0,0,0.82)',
    },
  },
  padding: foundations.spacing.md,
  radius: foundations.radii.lg,
  gap: foundations.spacing.xs,
  maxWidth: 320,
})

const useToastTokens = (overrides?: DeepPartial<ToastTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createToastTokens(foundations)
    const globalOverrides = components?.toast as DeepPartial<ToastTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}

const positionStyles: Record<ToastPosition, ViewStyle> = {
  top: { justifyContent: 'flex-start', paddingTop: 60 },
  middle: { justifyContent: 'center' },
  bottom: { justifyContent: 'flex-end', paddingBottom: 60 },
}

export const Toast: React.FC<ToastProps> = props => {
  const {
    visible,
    message,
    icon,
    type = 'info',
    duration = 2000,
    position = 'middle',
    forbidClick = false,
    overlay = false,
    overlayStyle,
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
  const { mounted, animated } = usePresenceAnimation(visible, { duration: 160 })
  const prevVisibleRef = React.useRef(visible)

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

  const scale = React.useMemo(
    () =>
      animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0.92, 1],
      }),
    [animated]
  )

  React.useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      onOpen?.()
      if (onOpened) {
        const timer = setTimeout(onOpened, 160)
        return () => clearTimeout(timer)
      }
    }
    if (!visible && prevVisibleRef.current && !mounted) {
      onClosed?.()
    }
    prevVisibleRef.current = visible
  }, [mounted, onClosed, onOpen, onOpened, visible])

  const handlePress = () => {
    if (closeOnClick) {
      onClose?.()
    }
  }

  const renderIcon = () => {
    if (icon) return icon
    switch (type) {
      case 'success':
        return <Icon name="check" size={24} color={tokens.colors.text} />
      case 'fail':
        return <Icon name="close" size={24} color={tokens.colors.text} />
      case 'loading':
        return loadingIndicator ?? <Loading type="spinner" color={tokens.colors.text} size="small" />
      default:
        return null
    }
  }
  const iconNode = renderIcon()

  if (!mounted) return null

  return (
    <Portal>
      <View
        style={[
          styles.backdrop,
          positionStyles[position],
        ]}
        pointerEvents={forbidClick || overlay ? 'auto' : 'none'}
      >
        {overlay || forbidClick ? (
          <View
            style={[styles.overlay, overlay ? { backgroundColor: tokens.colors.backdrop } : null, overlayStyle]}
            pointerEvents="auto"
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
          />
        ) : null}
        <Animated.View
          style={[
            styles.toast,
            {
              padding: tokens.padding,
              borderRadius: tokens.radius,
              opacity: animated,
              transform: [{ scale }],
              backgroundColor: tokens.colors.variants[type],
              maxWidth: tokens.maxWidth,
            },
            style,
          ]}
          onTouchEnd={handlePress}
        >
          {iconNode ? (
            <View style={{ marginBottom: tokens.gap }}>{iconNode}</View>
          ) : null}
          {message ? (
            <Text style={[{ color: tokens.colors.text, textAlign: 'center' }, textStyle]}>{message}</Text>
          ) : null}
        </Animated.View>
      </View>
    </Portal>
  )
}

const toastShadow = createPlatformShadow({
  color: 'rgba(0,0,0,0.25)',
  opacity: 0.4,
  radius: 12,
  offsetY: 6,
  elevation: 8,
})

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  toast: {
    minWidth: 120,
    alignItems: 'center',
    ...toastShadow,
  },
})

Toast.displayName = 'Toast'

export default Toast
