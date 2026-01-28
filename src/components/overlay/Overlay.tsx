import React, { useCallback } from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native'

import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import { parseNumberLike } from '../../utils'
import Portal from '../portal/Portal'
import { useOverlayStack } from './useOverlayStack'
import { useOverlayTokens } from './tokens'
import type { OverlayProps } from './types'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Overlay: React.FC<OverlayProps> = props => {
  const {
    color,
    tokensOverride,
    onPress,
    onClick,
    style,
    zIndex,
    children,
    visible: visibleProp,
    duration: durationProp,
    lockScroll: lockScrollProp,
    closeOnBackPress: closeOnBackPressProp,
    testID: testIDProp,
    accessibilityLabel: accessibilityLabelProp,
  } = props

  const hasAction = !!onPress || !!onClick

  const tokens = useOverlayTokens(tokensOverride)
  const visible = visibleProp ?? tokens.defaults.visible
  const lockScroll = lockScrollProp ?? tokens.defaults.lockScroll
  const closeOnBackPress = closeOnBackPressProp ?? tokens.defaults.closeOnBackPress
  const testID = testIDProp ?? tokens.defaults.testID
  const accessibilityLabel = accessibilityLabelProp ?? tokens.defaults.accessibilityLabel
  const duration = durationProp ?? tokens.defaults.duration
  const resolvedDuration = Math.max(
    0,
    parseNumberLike(duration, tokens.defaults.duration) ?? tokens.defaults.duration
  )
  const { mounted, animated } = usePresenceAnimation(visible, { duration: resolvedDuration })

  const handlePress = useCallback(() => {
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
          tokens.layout.portal,
          resolvedZIndex !== undefined && resolvedZIndex !== null
            ? { zIndex: resolvedZIndex }
            : null,
          style,
        ]}
      >
        <AnimatedPressable
          testID={testID}
          style={[
            tokens.layout.overlay,
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

Overlay.displayName = 'Overlay'

export default Overlay
