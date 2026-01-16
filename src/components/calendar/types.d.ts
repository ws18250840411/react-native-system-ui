import type React from "react"
import type { TextStyle, ViewProps, ViewStyle } from "react-native"

import type { DeepPartial } from "../../types"
import type { PopupPlacement, PopupProps } from "../popup"

export type CalendarType = "single" | "range" | "multiple"

export interface CalendarTokens {
  defaults: {
    type: CalendarType
    title: React.ReactNode
    showSubtitle: boolean
    showHeader: boolean
    showConfirm: Record<CalendarType, boolean>
    confirmText: React.ReactNode
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
    weekdays: React.ReactNode[]
    allowSameDay: boolean
    poppable: boolean
    closeOnClickOverlay: boolean
    closeOnConfirm: boolean
    popupPlacement: PopupPlacement
    popupRound: boolean
  }
  layout: {
    header: ViewStyle
    headerCenter: ViewStyle
    navText: TextStyle
    headerTitle: TextStyle
    headerSubtitle: TextStyle
    weekRow: ViewStyle
    weekLabelItem: ViewStyle
    weekLabel: TextStyle
    days: ViewStyle
    dayButton: ViewStyle
    dayText: TextStyle
    dayPlaceholder: ViewStyle
    confirmButton: ViewStyle
    confirmText: TextStyle
  }
  colors: {
    text: string
    weekend: string
    disabled: string
    background: string
    selectedBackground: string
    selectedText: string
    rangeBackground: string
    headerSubtitle: string
    confirmText: string
  }
  typography: {
    headerTitleSize: number
    headerTitleWeight: NonNullable<TextStyle['fontWeight']>
    headerSubtitleSize: number
    confirmTextWeight: NonNullable<TextStyle['fontWeight']>
  }
  sizing: {
    dayMinWidth: number
    navButtonSize: number
  }
  radii: {
    day: number
    container: number
    confirmButton: number
  }
  spacing: {
    row: number
    column: number
    containerPadding: number
    headerMarginBottom: number
    weekRowMarginBottom: number
    navPaddingHorizontal: number
    dayPaddingVertical: number
    confirmMarginTop: number
    confirmPaddingVertical: number
  }
}

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
