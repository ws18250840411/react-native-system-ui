import type React from 'react'
import type { ViewProps, StyleProp, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

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

export interface SpaceTokens {
  defaults: {
    direction: SpaceDirection
    wrap: boolean
    gapPreset: SpaceSizePreset
  }
  layout: {
    container: ViewStyle
  }
  typography: {
    fontFamily: string
    fontSize: number
  }
  sizing: {
    presets: Record<SpaceSizePreset, number>
  }
}

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
