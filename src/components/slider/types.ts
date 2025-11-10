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
  trackHeight?: number
  thumbSize?: number
  thumb?: React.ReactNode
  leftThumb?: React.ReactNode
  rightThumb?: React.ReactNode
  onChange?: (value: SliderValue) => void
  onChangeAfter?: (value: SliderValue) => void
  onDragStart?: (event: GestureResponderEvent, value: SliderValue) => void
  onDragEnd?: (event: GestureResponderEvent, value: SliderValue) => void
}
