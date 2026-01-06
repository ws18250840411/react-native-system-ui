import type React from "react"
import type { ViewProps } from "react-native"

import type { DeepPartial } from "../../types"
import type { PopupPlacement, PopupProps } from "../popup"
import type { CalendarTokens } from "./tokens"

export type CalendarType = "single" | "range" | "multiple"

export interface CalendarProps extends ViewProps {
  value?: Date | Date[] | null
  defaultValue?: Date | Date[] | null
  minDate?: Date
  maxDate?: Date
  type?: CalendarType
  title?: React.ReactNode
  showSubtitle?: boolean
  color?: string
  showHeader?: boolean
  showConfirm?: boolean
  confirmText?: React.ReactNode
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  weekdays?: React.ReactNode[]
  formatMonthTitle?: (date: Date) => React.ReactNode
  allowSameDay?: boolean
  maxRange?: number
  onOverRange?: (limit: number) => void
  poppable?: boolean
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  closeOnClickOverlay?: boolean
  closeOnConfirm?: boolean
  popupPlacement?: PopupPlacement
  popupRound?: boolean
  popupProps?: Partial<PopupProps>
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onSelect?: (value: Date | Date[]) => void
  onConfirm?: (value: Date | Date[]) => void
  tokensOverride?: DeepPartial<CalendarTokens>
}
