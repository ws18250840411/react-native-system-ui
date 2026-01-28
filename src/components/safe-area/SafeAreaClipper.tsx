import React from 'react'
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

const useSafeAreaInsetsOrZero = () => {
  const insets = React.useContext(SafeAreaInsetsContext)
  return (
    insets ?? {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  )
}

interface UseSafeAreaClipOptions {
  enabled?: boolean
  position?: 'top' | 'bottom'
  topInsetStyle?: { backgroundColor?: string }
}

export interface SafeAreaClipperProps {
  /** 是否开启顶部安全区域裁切 */
  clipTop?: boolean
  /** 样式 */
  style?: StyleProp<ViewStyle>
  /** 内容 */
  children: React.ReactNode
  /** 位置 */
  position?: 'top' | 'bottom'
}

export interface SafeAreaClipProviderProps {
  enabled?: boolean
  position?: 'top' | 'bottom'
  style?: StyleProp<ViewStyle>
  topInsetStyle?: { backgroundColor?: string }
  children: (args: { clipTop: boolean; topInset: React.ReactNode }) => React.ReactNode
}

export const useSafeAreaClip = ({
  enabled,
  position = 'top',
  topInsetStyle,
}: UseSafeAreaClipOptions) => {
  const insets = useSafeAreaInsetsOrZero()
  const isTop = position === 'top'
  const topOffset = isTop ? insets.top : 0
  const clipTop = Boolean(enabled && isTop && topOffset > 0)
  const topInset = React.useMemo(
    () =>
      !clipTop && isTop && topOffset > 0
        ? (
          <View style={[{ width: '100%', height: topOffset }, topInsetStyle]} />
        )
        : null,
    [clipTop, isTop, topOffset, topInsetStyle]
  )

  return { clipTop, topInset }
}

/**
 * 通用安全区域裁切容器
 * 逻辑：通过 padding 将内容推到安全区域下方，并利用 overflow: hidden 实现物理裁切
 */
export const SafeAreaClipper: React.FC<SafeAreaClipperProps> = ({
  clipTop,
  position = 'top',
  style,
  children,
}) => {
  const insets = useSafeAreaInsetsOrZero()

  const isTop = position === 'top'
  const topOffset = isTop ? insets.top : 0
  const shouldClip = Boolean(clipTop && isTop && topOffset > 0)

  return (
    <View style={[style, shouldClip ? { top: topOffset, overflow: 'hidden' } : null]}>
      {children}
    </View>
  )
}

/**
 * 通用安全区域裁切 Provider
 * - 内部统一处理裁切与顶部占位
 * - 组件侧只需渲染 topInset 即可
 */
export const SafeAreaClipProvider: React.FC<SafeAreaClipProviderProps> = ({
  enabled,
  position = 'top',
  style,
  topInsetStyle,
  children,
}) => {
  const effectiveEnabled = Platform.OS === 'web' ? false : enabled
  const { clipTop, topInset } = useSafeAreaClip({
    enabled: effectiveEnabled,
    position,
    topInsetStyle,
  })

  return (
    <SafeAreaClipper clipTop={clipTop} position={position} style={style}>
      {children({ clipTop, topInset })}
    </SafeAreaClipper>
  )
}

export default SafeAreaClipper
