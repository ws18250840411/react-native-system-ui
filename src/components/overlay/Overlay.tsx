import React from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { usePresenceAnimation } from '../../hooks/usePresenceAnimation'
import Portal from '../portal/Portal'
import { useOverlayStack } from './useOverlayStack'

export interface OverlayProps {
  visible?: boolean
  /**
   * 背景色
   */
  color?: string
  /**
   * 动画时长（ms）
   * @default 300
   */
  duration?: number | string
  /**
   * 是否锁定页面滚动（主要影响 Web）
   * @default true
   */
  lockScroll?: boolean
  /**
   * Android 返回键是否关闭遮罩
   * @default false
   */
  closeOnBackPress?: boolean
  /**
   * 点击遮罩触发
   */
  onPress?: () => void
  /** 与 Web/官方命名对齐：同 onPress */
  onClick?: () => void
  /**
   * 自定义样式
   */
  style?: StyleProp<ViewStyle>
  /**
   * 传给 Pressable 的 testID
   */
  testID?: string
  /**
   * a11y label
   * @default '关闭遮罩'
   */
  accessibilityLabel?: string
  /**
   * 自定义 zIndex，默认由 OverlayStack 自动管理
   */
  zIndex?: number | string
  children?: React.ReactNode
}

interface OverlayTokens {
  colors: {
    backdrop: string
  }
  animationDuration: number
}

const createOverlayTokens = (_foundations: Foundations): OverlayTokens => ({
  colors: {
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  animationDuration: 300,
})

const useOverlayTokens = (overrides?: DeepPartial<OverlayTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createOverlayTokens(foundations)
    const globalOverrides = components?.overlay as DeepPartial<OverlayTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const parseNumberLike = (value: number | string | undefined, fallback?: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  return fallback
}

export const Overlay: React.FC<OverlayProps> = props => {
  const {
    visible = false,
    color,
    duration,
    lockScroll = true,
    closeOnBackPress = false,
    onPress,
    onClick,
    style,
    testID = 'rv-overlay',
    accessibilityLabel = '关闭遮罩',
    zIndex,
    children,
  } = props

  const tokens = useOverlayTokens()
  const resolvedDuration = Math.max(0, parseNumberLike(duration, tokens.animationDuration) ?? tokens.animationDuration)
  const { mounted, animated } = usePresenceAnimation(visible, { duration: resolvedDuration })

  const handlePress = React.useCallback(() => {
    onPress?.()
    onClick?.()
  }, [onClick, onPress])

  const { zIndex: stackZIndex } = useOverlayStack({
    visible: mounted,
    onClose: handlePress,
    closeOnBack: closeOnBackPress,
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
            } as any,
          ]}
          pointerEvents={mounted ? 'auto' : 'none'}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={onPress || onClick ? '双击即可关闭遮罩' : undefined}
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
