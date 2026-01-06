import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { TagTokens } from './Tag'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type TagSize = 'mini' | 'small' | 'medium' | 'large'

export interface TagProps extends ViewProps {
  children?: React.ReactNode
  type?: TagType
  size?: TagSize
  color?: string
  textColor?: string
  plain?: boolean
  round?: boolean
  mark?: boolean
  show?: boolean
  closeable?: boolean
  closeIcon?: React.ReactNode | ((color: string, size: number) => React.ReactNode)
  onClose?: () => void
  onPress?: PressableProps['onPress']
  textStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<TagTokens>
}
