import type React from 'react'
import type { GestureResponderEvent, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type RadioValue = string | number
export type RadioLabelPosition = 'left' | 'right'
export type RadioGroupDirection = 'horizontal' | 'vertical'
export type RadioShape = 'round' | 'square'
export type RadioIconRender = (params: { checked: boolean; disabled: boolean }) => React.ReactNode

export interface RadioTokens {
  defaults: {
    iconSize: number
    labelPosition: RadioLabelPosition
    shape: RadioShape
    labelDisabled: boolean
    groupDisabled: boolean
    groupDirection: RadioGroupDirection
  }
  layout: {
    container: ViewStyle
    iconWrapper: ViewStyle
    labelWrapper: ViewStyle
    icon: ViewStyle
    label: TextStyle
    groupHorizontal: ViewStyle
    groupVertical: ViewStyle
    groupItem: ViewStyle
  }
  colors: {
    border: string
    background: string
    checkedBackground: string
    disabledBorder: string
    disabledBackground: string
    checkmark: string
    label: string
    labelDisabled: string
  }
  typography: {
    fontSize: number
    fontFamily: string
    fontWeight: string
    lineHeightMultiplier: number
  }
  sizing: {
    dotScale: number
  }
  radii: {
    round: number
    square: number
  }
  borders: {
    width: number
  }
  spacing: {
    gap: number
    groupGap: number
  }
}

export interface RadioProps extends Omit<ViewProps, 'children'> {
  name?: RadioValue
  value?: RadioValue
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  iconSize?: number | string
  checkedColor?: string
  shape?: RadioShape
  iconRender?: RadioIconRender
  labelPosition?: RadioLabelPosition
  labelDisabled?: boolean
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  tokensOverride?: DeepPartial<RadioTokens>
  onClick?: (event: GestureResponderEvent) => void
  onChange?: (checked: boolean) => void
}

export interface RadioGroupProps extends ViewProps {
  value?: RadioValue
  defaultValue?: RadioValue
  onChange?: (value: RadioValue) => void
  disabled?: boolean
  direction?: RadioGroupDirection
  iconSize?: number | string
  checkedColor?: string
  labelDisabled?: boolean
  gap?: number
  name?: string
  children?: React.ReactNode
  tokensOverride?: DeepPartial<RadioTokens>
}
