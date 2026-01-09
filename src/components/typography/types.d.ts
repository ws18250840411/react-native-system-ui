import type { TextProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type TypographyType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'light'

export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type TypographyTitleLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface TypographyTokens {
  defaults: {
    type: TypographyType
    size: TypographySize
    disabled: boolean
  }
  layout: {
    centerWrapper: ViewStyle
    actionRow: ViewStyle
  }
  colors: Record<TypographyType, string>
  sizing: {
    sizes: Record<TypographySize, number>
    titles: Record<TypographyTitleLevel, { fontSize: number; lineHeight: number }>
    lineHeightMultiplier: number
    actionMarginLeft: number
  }
  typography: {
    fontFamily: string
    weight: {
      regular: string
      medium: string
      strong: string
    }
  }
  opacity: {
    disabled: number
  }
}

export interface EllipsisConfig {
  rows?: number
  symbol?: string
  expandText?: string
  collapseText?: string
  onExpand?: (expanded: boolean) => void
}

export interface TypographyBaseProps extends Omit<TextProps, 'children'> {
  children?: React.ReactNode
  type?: TypographyType
  color?: string | TypographyType
  size?: TypographySize
  level?: TypographyTitleLevel
  disabled?: boolean
  delete?: boolean
  underline?: boolean
  center?: boolean
  strong?: boolean
  ellipsis?: boolean | number | EllipsisConfig
  tokensOverride?: DeepPartial<TypographyTokens>
  onPress?: TextProps['onPress']
}

export type TypographyTextProps = TypographyBaseProps
export type TypographyTitleProps = Omit<TypographyBaseProps, 'size'> & {
  level?: TypographyTitleLevel
}
export interface TypographyLinkProps extends TypographyBaseProps {
  href?: string
}
