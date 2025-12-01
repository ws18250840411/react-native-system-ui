import type * as React from 'react'

import type { PickerProps, PickerOption } from '../picker/types'

export interface AreaList {
  province_list?: Record<string, string>
  city_list?: Record<string, string>
  county_list?: Record<string, string>
}

export interface AreaOption extends PickerOption {
  label: React.ReactNode
  value: string
  children?: AreaOption[]
}

export interface AreaProps
  extends Omit<PickerProps, 'columns' | 'onChange' | 'value' | 'defaultValue' | 'onConfirm'> {
  areaList: AreaList
  columnsNum?: 1 | 2 | 3
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[], options: AreaOption[]) => void
  onConfirm?: (values: string[], options: AreaOption[]) => void
}

export type AreaColumnType = 'province' | 'city' | 'county'
