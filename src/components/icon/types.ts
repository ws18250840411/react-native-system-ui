import type { PressableProps, StyleProp, ViewStyle } from 'react-native'

export type BuiltInIconName = keyof typeof import('./builtins').BUILTIN_ICONS

export interface IconProps extends Omit<PressableProps, 'style'> {
  name?: BuiltInIconName
  component?: React.ComponentType<{ size?: number; color?: string | string[]; strokeWidth?: number }>
  size?: number
  color?: string | string[]
  strokeWidth?: number
  spin?: boolean
  rotate?: number
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}
