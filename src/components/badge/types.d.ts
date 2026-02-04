import type { PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface BadgeTokens {
  defaults: {
    dot: boolean
    showZero: boolean
    pressedOpacity: number
  }
  layout: {
    wrapper: ViewStyle
    badgeAbsolute: ViewStyle
    badgeStandalone: ViewStyle
    pressableStandalone: ViewStyle
    text: TextStyle
    icon: ViewStyle
  }
  colors: {
    background: string
    dot: string
    text: string
    border: string
  }
  typography: {
    fontSize: number
    fontWeight: TextStyle['fontWeight']
    fontFamily: string
    lineHeight: number
  }
  sizing: {
    minWidth: number
    height: number
    paddingHorizontal: number
    paddingVertical: number
    dotSize: number
  }
  radii: {
    badge: number
    dot: number
  }
  borders: {
    width: number
  }
}

export type BadgeOffset = [number | string, number | string]

export interface BadgeProps extends ViewProps {
  children?: React.ReactNode
  content?: React.ReactNode
  color?: string
  textColor?: string
  dot?: boolean
  max?: number | string
  offset?: BadgeOffset
  showZero?: boolean
  badgeStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: PressableProps['onPress']
  tokensOverride?: DeepPartial<BadgeTokens>
}

export interface BadgeTextProps {
  children?: React.ReactNode
  color?: string
  style?: StyleProp<TextStyle>
}

export interface BadgeIconProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}
