import type React from 'react'
import type { ViewProps, StyleProp, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { SpaceTokens } from './tokens'

export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
export type SpaceJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch'

export type SpaceGap = number | string | [number | string, number | string]
export type SpaceSizePreset = 'mini' | 'small' | 'normal' | 'large'

export interface SpaceProps extends ViewProps {
  children?: React.ReactNode
  gap?: SpaceGap
  size?: SpaceGap | SpaceSizePreset
  direction?: SpaceDirection
  align?: SpaceAlign
  justify?: SpaceJustify
  wrap?: boolean
  block?: boolean
  fill?: boolean
  divider?: React.ReactNode
  onClick?: ViewProps['onTouchEnd']
  tokensOverride?: DeepPartial<SpaceTokens>
}
