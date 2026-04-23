import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type TagSize = 'mini' | 'small' | 'medium' | 'large'

export interface TagTokens {
  defaults: {
    type: TagType
    size: TagSize
    plain: boolean
    round: boolean
    mark: boolean
    show: boolean
    pressedOpacity: number
  }
  layout: {
    container: ViewStyle
    close: ViewStyle
  }
  colors: {
    plainBackground: string
    toneMap: Record<TagType, { background: string; text: string }>
  }
  typography: {
    fontFamily: string
    lineHeightMultiplier: number
    fontWeight: TextStyle['fontWeight']
  }
  sizing: {
    sizes: Record<
      TagSize,
      { fontSize: number; paddingHorizontal: number; paddingVertical: number; borderRadius: number; lineHeight: number }
    >
    closeIconSize: number
  }
  radii: {
    round: number
    markLeading: number
  }
  borders: {
    width: number
  }
  spacing: {
    closeGap: number
    closeHitSlop: number
  }
}

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
