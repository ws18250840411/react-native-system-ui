import type { TextProps } from 'react-native'

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
  suffixText?: string
  suffixCount?: number
  onExpand?: (expanded: boolean) => void
}

export interface TypographyBaseProps extends Omit<TextProps, 'children'> {
  children?: React.ReactNode
  type?: TypographyType
  size?: TypographySize
  level?: TypographyTitleLevel
  disabled?: boolean
  delete?: boolean
  underline?: boolean
  center?: boolean
  strong?: boolean
  ellipsis?: boolean | number | EllipsisConfig
  onPress?: TextProps['onPress']
}

export type TypographyTextProps = TypographyBaseProps
export type TypographyTitleProps = Omit<TypographyBaseProps, 'size'> & {
  level?: TypographyTitleLevel
}
export interface TypographyLinkProps extends TypographyBaseProps {
  href?: string
}
