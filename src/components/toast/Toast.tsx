import React from 'react'
import {
  Animated,
  Modal,
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

export type ToastPosition = 'top' | 'middle' | 'bottom'

export interface ToastProps {
  visible: boolean
  message?: React.ReactNode
  icon?: React.ReactNode
  duration?: number
  position?: ToastPosition
  forbidClick?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onClose?: () => void
}

interface ToastTokens {
  colors: {
    background: string
    text: string
  }
  padding: number
  radius: number
  gap: number
}

const createToastTokens = (foundations: Foundations): ToastTokens => ({
  colors: {
    background: 'rgba(0,0,0,0.75)',
    text: '#fff',
  },
  padding: foundations.spacing.md,
  radius: foundations.radii.lg,
  gap: foundations.spacing.xs,
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
  top: { justifyContent: 'flex-start', paddingTop: 80 },
  middle: { justifyContent: 'center' },
  bottom: { justifyContent: 'flex-end', paddingBottom: 80 },
}

export const Toast: React.FC<ToastProps> = props => {
  const {
    visible,
    message,
    icon,
    duration = 2000,
    position = 'middle',
    forbidClick = false,
    style,
    textStyle,
    onClose,
  } = props

  const tokens = useToastTokens()
  const [mounted, setMounted] = React.useState(visible)
  const opacity = React.useRef(new Animated.Value(visible ? 1 : 0)).current

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      setMounted(true)
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
      if (duration > 0) {
        timer = setTimeout(() => {
          onClose?.()
        }, duration)
      }
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setMounted(false))
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [duration, onClose, opacity, visible])

  if (!mounted) return null

  return (
    <Modal transparent visible statusBarTranslucent>
      <View
        style={[
          styles.backdrop,
          positionStyles[position],
          forbidClick && { pointerEvents: 'auto' },
        ]}
        pointerEvents={forbidClick ? 'auto' : 'none'}
      >
        <Animated.View
          style={[
            styles.toast,
            {
              padding: tokens.padding,
              borderRadius: tokens.radius,
              opacity,
            },
            style,
          ]}
        >
          {icon ? <View style={{ marginBottom: tokens.gap }}>{icon}</View> : null}
          {message ? (
            <Text style={[{ color: tokens.colors.text, textAlign: 'center' }, textStyle]}>{message}</Text>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    minWidth: 120,
    maxWidth: '80%',
    alignItems: 'center',
  },
})

Toast.displayName = 'Toast'

export default Toast
