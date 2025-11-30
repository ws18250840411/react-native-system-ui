import type React from 'react'

import type { PickerProps } from '../picker/types'

export type DatetimePickerColumnType = 'year' | 'month' | 'day' | 'hour' | 'minute'

export type DatetimePickerType = 'date' | 'time' | 'datetime' | 'datehour' | 'month-day' | 'year-month'

export interface DatetimePickerSharedProps
  extends Omit<PickerProps, 'columns' | 'value' | 'defaultValue' | 'onChange' | 'onConfirm'> {
  type?: DatetimePickerType
  formatter?: (type: DatetimePickerColumnType, value: string) => string
  filter?: (type: DatetimePickerColumnType, values: string[]) => string[]
  columnsOrder?: DatetimePickerColumnType[]
  children?: React.ReactNode
}

export interface DatetimePickerDateProps extends DatetimePickerSharedProps {
  type?: Exclude<DatetimePickerType, 'time'>
  value?: Date
  defaultValue?: Date
  minDate?: Date
  maxDate?: Date
  onChange?: (value: Date) => void
  onConfirm?: (value: Date) => void
}

export interface DatetimePickerTimeProps extends DatetimePickerSharedProps {
  type: 'time'
  value?: string
  defaultValue?: string
  minHour?: number
  maxHour?: number
  minMinute?: number
  maxMinute?: number
  onChange?: (value: string) => void
  onConfirm?: (value: string) => void
}

export type DatetimePickerProps = DatetimePickerDateProps | DatetimePickerTimeProps
