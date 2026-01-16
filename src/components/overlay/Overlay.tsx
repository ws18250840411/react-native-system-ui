import React from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'
import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import { parseNumberLike } from '../../utils/number'
import Portal from '../portal/Portal'
import { useOverlayStack } from './useOverlayStack'
import type { OverlayTokens } from './tokens'
import { useOverlayTokens } from './tokens'

export interface OverlayProps {
  visible?: boolean
  color?: string
  duration?: number | string
  lockScroll?: boolean
  closeOnBackPress?: boolean
  onPress?: () => void
  /** 与 Web/官方命名对齐：同 onPress */
  onClick?: () => void
  style?: StyleProp<ViewStyle>
  testID?: string
  accessibilityLabel?: string
  zIndex?: number | string
  tokensOverride?: DeepPartial<OverlayTokens>
  children?: React.ReactNode
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Overlay: React.FC<OverlayProps> = props => {
  const {
    visible = false,
    color,
    duration,
    lockScroll = true,
    closeOnBackPress = false,
    tokensOverride,
    onPress,
    onClick,
    style,
    testID = 'rv-overlay',
    accessibilityLabel = '关闭遮罩',
    zIndex,
    children,
  } = props

  const hasAction = !!onPress || !!onClick

  const tokens = useOverlayTokens(tokensOverride)
  const resolvedDuration = Math.max(
    0,
    parseNumberLike(duration, tokens.animationDuration) ?? tokens.animationDuration
  )
  const { mounted, animated } = usePresenceAnimation(visible, { duration: resolvedDuration })

  const handlePress = React.useCallback(() => {
    if (onPress) {
      onPress()
      return
    }
    onClick?.()
  }, [onClick, onPress])

  const { zIndex: stackZIndex } = useOverlayStack({
    visible: mounted,
    onClose: hasAction ? handlePress : undefined,
    closeOnBack: hasAction ? closeOnBackPress : false,
    lockScroll,
    zIndex: parseNumberLike(zIndex),
    type: 'overlay',
  })

  if (!mounted) return null

  const resolvedZIndex = stackZIndex ?? parseNumberLike(zIndex)
  const styleBackgroundColor = StyleSheet.flatten(style)?.backgroundColor as string | undefined
  const resolvedColor = color ?? styleBackgroundColor ?? tokens.colors.backdrop

  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[
          styles.portal,
          resolvedZIndex !== undefined && resolvedZIndex !== null
            ? { zIndex: resolvedZIndex }
            : null,
          style,
        ]}
      >
        <AnimatedPressable
          testID={testID}
          style={[
            styles.overlay,
            {
              backgroundColor: resolvedColor,
              opacity: animated,
              touchAction: lockScroll ? 'none' : undefined,
            } as unknown as ViewStyle,
          ]}
          pointerEvents={mounted ? 'auto' : 'none'}
          accessible={hasAction}
          accessibilityRole={hasAction ? 'button' : undefined}
          accessibilityLabel={hasAction ? accessibilityLabel : undefined}
          accessibilityHint={hasAction ? '双击即可关闭遮罩' : undefined}
          onPress={handlePress}
        />
        {children}
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  portal: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
})

Overlay.displayName = 'Overlay'

export default Overlay
