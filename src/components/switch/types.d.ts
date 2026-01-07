import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface SwitchTokens {
  defaults: {
    size: number
  }
  colors: {
    activeTrack: string
    inactiveTrack: string
    handle: string
    border: string
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

export interface SwitchProps extends Omit<ViewProps, 'onChange'> {
  checked?: any
  defaultChecked?: any
  disabled?: boolean
  loading?: boolean
  size?: number | string
  activeColor?: string
  inactiveColor?: string
  activeValue?: any
  inactiveValue?: any
  tokensOverride?: DeepPartial<SwitchTokens>
  onChange?: (val: any) => void
  onClick?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
}
