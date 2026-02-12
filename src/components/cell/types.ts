import type React from 'react'
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type CellArrowDirection = 'left' | 'right' | 'up' | 'down'
export type CellSize = 'normal' | 'large'

export interface CellTokens {
  defaults: {
    border: boolean
    size: CellSize
    arrowDirection: CellArrowDirection
    activeOpacity: number
    groupBorder: boolean
    groupInset: boolean
    groupCard: boolean
  }
  layout: {
    container: ViewStyle
    containerLarge: ViewStyle
    center: ViewStyle
    body: ViewStyle
    titleRow: ViewStyle
    value: TextStyle
    valueOnly: TextStyle
    valueContainer: ViewStyle
    valueOnlyContainer: ViewStyle
    valueCenter: ViewStyle
    customContent: ViewStyle
    iconWrapper: ViewStyle
    rightIconWrapper: ViewStyle
    hairline: ViewStyle
    groupCardShadow: ViewStyle
    arrowTransforms: Record<CellArrowDirection, ViewStyle>
  }
  colors: {
    background: string
    ripple: string
    title: string
    label: string
    value: string
    required: string
    border: string
    arrow: string
    groupTitle: string
    groupBodyBackground: string
  }
  typography: {
    titleSize: number
    lineHeight: number
    titleWeight: TextStyle['fontWeight']
    largeTitleSize: number
    labelSize: number
    largeLabelSize: number
    valueSize: number
    largeValueSize: number
    groupTitleSize: number
  }
  sizing: {
    paddingVertical: number
    paddingHorizontal: number
    largePaddingVertical: number
    arrowSize: number
    iconSize: number
    groupMarginBottom: number
    groupTitlePaddingHorizontal: number
    groupTitlePaddingVertical: number
    groupInsetMarginHorizontal: number
  }
  radii: {
    groupInset: number
  }
  borders: {
    width: number
  }
  spacing: {
    iconGap: number
    valueGap: number
    extraGap: number
    labelMarginTop: number
  }
}

export interface CellProps extends Omit<PressableProps, 'style' | 'children'> {
  title?: React.ReactNode
  value?: React.ReactNode
  label?: React.ReactNode
  extra?: React.ReactNode
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  border?: boolean
  clickable?: boolean
  isLink?: boolean
  required?: boolean
  center?: boolean
  size?: CellSize
  arrowDirection?: CellArrowDirection
  tokensOverride?: DeepPartial<CellTokens>
  children?: React.ReactNode
  titleStyle?: StyleProp<TextStyle>
  valueStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
}

export interface CellGroupProps {
  children?: React.ReactNode
  title?: React.ReactNode
  border?: boolean
  inset?: boolean
  card?: boolean
  style?: StyleProp<ViewStyle>
  bodyStyle?: StyleProp<ViewStyle>
  tokensOverride?: DeepPartial<CellTokens>
}
