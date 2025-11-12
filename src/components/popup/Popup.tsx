import React from 'react'
import {
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type ViewProps,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface PopupProps extends ViewProps {
  visible: boolean
  placement?: PopupPlacement
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  closeOnOverlayPress?: boolean
  round?: boolean
  safeArea?: boolean
  duration?: number
  children?: React.ReactNode
  onClose?: () => void
}

interface PopupTokens {
  colors: {
    overlay: string
    background: string
  }
  radius: {
    round: number
  }
}

const createPopupTokens = (foundations: Foundations): PopupTokens => ({
  colors: {
    overlay: 'rgba(0,0,0,0.5)',
    background: '#fff',
  },
  radius: {
    round: foundations.radii.lg,
  },
})

const usePopupTokens = (overrides?: DeepPartial<PopupTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createPopupTokens(foundations)
    const globalOverrides = components?.popup as DeepPartial<PopupTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}

const placementConfig: Record<PopupPlacement, { container: ViewStyle; axis: 'x' | 'y'; from: number }> = {
  top: { container: { justifyContent: 'flex-start', alignItems: 'center' }, axis: 'y', from: -300 },
  bottom: { container: { justifyContent: 'flex-end', alignItems: 'center' }, axis: 'y', from: 300 },
  left: { container: { justifyContent: 'center', alignItems: 'flex-start' }, axis: 'x', from: -300 },
  right: { container: { justifyContent: 'center', alignItems: 'flex-end' }, axis: 'x', from: 300 },
  center: { container: { justifyContent: 'center', alignItems: 'center' }, axis: 'y', from: 0 },
}

export const Popup: React.FC<PopupProps> = props => {
  const {
    visible,
    placement = 'bottom',
    overlay = true,
    overlayStyle,
    closeOnOverlayPress = true,
    round,
    safeArea = false,
    duration = 200,
    children,
    onClose,
    style,
    ...rest
  } = props

  const tokens = usePopupTokens()
  const [mounted, setMounted] = React.useState(visible)
  const animated = React.useRef(new Animated.Value(visible ? 1 : 0)).current

  React.useEffect(() => {
    if (visible) {
      setMounted(true)
      Animated.timing(animated, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(() => {
        setMounted(false)
        onClose?.()
      })
    }
  }, [animated, duration, onClose, visible])

  const config = placementConfig[placement]
  const translateStyle = config.from
    ? {
        transform: [
          config.axis === 'y'
            ? {
                translateY: animated.interpolate({ inputRange: [0, 1], outputRange: [config.from, 0] }),
              }
            : {
                translateX: animated.interpolate({ inputRange: [0, 1], outputRange: [config.from, 0] }),
              },
        ],
      }
    : {}

  if (!mounted) return null

  const content = (
    <Animated.View
      style={[
        styles.popup,
        { backgroundColor: tokens.colors.background, borderRadius: round ? tokens.radius.round : 0 },
        translateStyle,
        style,
      ]}
      {...rest}
    >
      {safeArea ? <SafeAreaView>{children}</SafeAreaView> : children}
    </Animated.View>
  )

  return (
    <Modal transparent visible animationType="fade" statusBarTranslucent>
      <View style={[styles.container, config.container]}>
        {overlay ? (
          <Pressable
            style={[styles.overlay, { backgroundColor: tokens.colors.overlay }, overlayStyle]}
            onPress={closeOnOverlayPress ? onClose : undefined}
          />
        ) : null}
        {content}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  popup: {
    minWidth: '60%',
    maxWidth: '90%',
    padding: 16,
  },
})

Popup.displayName = 'Popup'

export default Popup
