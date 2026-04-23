import type React from 'react'
import type { GestureResponderEvent, ViewProps } from 'react-native'

import type { DeepPartial } from '../../types'
import type { SliderTokens } from './tokens'

export type SliderValue = number | [number, number]
export type SliderNumberish = number | string

export interface SliderProps extends ViewProps {
  value?: SliderValue
  min?: SliderNumberish
  max?: SliderNumberish
  step?: SliderNumberish
  range?: boolean
  vertical?: boolean
  disabled?: boolean
  readOnly?: boolean
  reverse?: boolean
  debug?: boolean
  activeColor?: string
  inactiveColor?: string
  barHeight?: SliderNumberish
  trackHeight?: SliderNumberish
  buttonSize?: SliderNumberish
  thumbSize?: SliderNumberish
  tokensOverride?: DeepPartial<SliderTokens>
  button?: React.ReactNode | (({ value }: { value: SliderValue }) => React.ReactNode)
  thumb?: React.ReactNode
  leftThumb?: React.ReactNode
  rightThumb?: React.ReactNode
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
  ariaLabel?: string
  onChange?: (value: SliderValue) => void
  onChangeAfter?: (value: SliderValue) => void
  onDragStart?: (event: GestureResponderEvent, value: SliderValue) => void
  onDragEnd?: (event: GestureResponderEvent, value: SliderValue) => void
}
