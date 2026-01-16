import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface SwitchTokens {
  defaults: {
    size: number
    disabled: boolean
    loading: boolean
    activeValue: unknown
    inactiveValue: unknown
  }
  spacing: {
    inset: number
  }
  layout: {
    container: ViewStyle
    track: ViewStyle
    handleOuter: ViewStyle
    handleInner: ViewStyle
  }
  colors: {
    activeTrack: string
    inactiveTrack: string
    handle: string
    border: string
  }
  borders: {
    width: number
  }
  opacity: {
    disabled: number
    pressed: number
  }
  animation: {
    duration: number
  }
  shadow: {
    outer: {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
    inner: {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
  }
  loader: {
    size: number
  }
}

export interface SwitchProps<V = boolean> extends Omit<ViewProps, 'onChange'> {
  checked?: V
  defaultChecked?: V
  disabled?: boolean
  loading?: boolean
  size?: number | string
  activeColor?: string
  inactiveColor?: string
  activeValue?: V
  inactiveValue?: V
  tokensOverride?: DeepPartial<SwitchTokens>
  onChange?: (val: V) => void
  onClick?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
}
