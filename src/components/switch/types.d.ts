import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'

export interface SwitchTokens {
  defaults: {
    size: number
    disabled: boolean
    activeValue: unknown
    inactiveValue: unknown
  }
  colors: {
    activeTrack: string
    inactiveTrack: string
    handle: string
  }
  opacity: {
    disabled: number
    pressed: number
  }
}

export interface SwitchProps<V = boolean> extends Omit<ViewProps, 'onChange'> {
  checked?: V
  defaultChecked?: V
  disabled?: boolean
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
