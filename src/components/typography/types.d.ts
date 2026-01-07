import type { TextProps } from 'react-native'

import type { DeepPartial } from '../../types'
import type { TypographyTokens } from './tokens'

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
