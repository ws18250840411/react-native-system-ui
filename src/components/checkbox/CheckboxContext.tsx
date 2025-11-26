import React from 'react'
import type { CheckboxGroupState } from '@react-stately/checkbox'

import type { CheckboxGroupDirection, CheckboxShape, CheckboxValue } from './types'

export interface CheckboxGroupContextValue {
  state: CheckboxGroupState
  direction: CheckboxGroupDirection
  shape?: CheckboxShape
  iconSize?: number
  checkedColor?: string
  labelDisabled?: boolean
  max?: number
  registerValue: (key: string, raw: CheckboxValue) => void
  unregisterValue: (key: string) => void
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)
