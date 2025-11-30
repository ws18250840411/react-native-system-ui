import type React from "react"
import type { ViewProps } from "react-native"

export type CalendarType = "single" | "range" | "multiple"

export interface CalendarProps extends ViewProps {
  value?: Date | Date[] | null
  defaultValue?: Date | Date[] | null
  minDate?: Date
  maxDate?: Date
  type?: CalendarType
  title?: React.ReactNode
  color?: string
  showHeader?: boolean
  showConfirm?: boolean
  confirmText?: React.ReactNode
  weekStartsOn?: 0 | 1
  onSelect?: (value: Date | Date[]) => void
  onConfirm?: (value: Date | Date[]) => void
}
