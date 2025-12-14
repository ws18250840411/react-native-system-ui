import React from 'react'
import type { RadioGroupState } from '@react-stately/radio'

import type { RadioGroupDirection, RadioValue } from './types'

export interface RadioGroupContextValue {
  state: RadioGroupState
  direction: RadioGroupDirection
  iconSize?: number | string
  checkedColor?: string
  labelDisabled?: boolean
  registerValue: (key: string, raw: RadioValue) => void
  unregisterValue: (key: string) => void
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)
