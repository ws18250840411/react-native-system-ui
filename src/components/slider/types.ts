import type React from 'react'
import type { GestureResponderEvent, ViewProps } from 'react-native'

export type SliderValue = number | [number, number]

export interface SliderProps extends ViewProps {
  value?: SliderValue
  min?: number
  max?: number
  step?: number
  range?: boolean
  vertical?: boolean
  disabled?: boolean
  readOnly?: boolean
  reverse?: boolean
  activeColor?: string
  inactiveColor?: string
  barHeight?: number
  trackHeight?: number
  buttonSize?: number
  thumbSize?: number
  button?: React.ReactNode
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
