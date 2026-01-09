import type React from 'react'
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'

import type { DeepPartial } from '../../types'

export type CheckboxShape = 'round' | 'square'
export type CheckboxLabelPosition = 'left' | 'right'
export type CheckboxGroupDirection = 'horizontal' | 'vertical'
export type CheckboxValue = string | number
export type CheckboxIconRender = (params: { checked: boolean; disabled: boolean }) => React.ReactNode

export interface CheckboxTokens {
  defaults: {
    shape: CheckboxShape
    iconSize: number
    labelPosition: CheckboxLabelPosition
    labelDisabled: boolean
    bindGroup: boolean
    groupDisabled: boolean
    groupDirection: CheckboxGroupDirection
  }
  layout: {
    container: ViewStyle
    iconWrapper: ViewStyle
    icon: ViewStyle
    checkmark: TextStyle
    label: TextStyle
    labelWrapper: ViewStyle
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
    fontWeight: TextStyle['fontWeight']
    lineHeightMultiplier: number
  }
  spacing: {
    gap: number
    groupGap: number
  }
  radii: {
    square: number
  }
  borders: {
    width: number
  }
  icon: {
    scale: number
  }
}

export interface CheckboxProps extends Omit<PressableProps, 'onPress'> {
  name?: CheckboxValue
  value?: CheckboxValue
  shape?: CheckboxShape
  iconSize?: number
  iconRender?: CheckboxIconRender
  checkedColor?: string
  labelPosition?: CheckboxLabelPosition
  labelDisabled?: boolean
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<CheckboxTokens>
  children?: React.ReactNode
  bindGroup?: boolean
  onClick?: (event: GestureResponderEvent) => void
  onChange?: (checked: boolean) => void
}

export interface CheckboxGroupProps extends ViewProps {
  value?: CheckboxValue[]
  defaultValue?: CheckboxValue[]
  disabled?: boolean
  max?: number
  direction?: CheckboxGroupDirection
  shape?: CheckboxShape
  iconSize?: number
  iconRender?: CheckboxIconRender
  checkedColor?: string
  labelDisabled?: boolean
  gap?: number
  tokensOverride?: DeepPartial<CheckboxTokens>
  /** 跟随 React Vant，水平/垂直排列 */
  onChange?: (value: CheckboxValue[]) => void
  children?: React.ReactNode
}
