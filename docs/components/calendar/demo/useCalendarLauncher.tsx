import React from "react"
import { Calendar, Cell } from "react-native-system-ui"
import type { CalendarProps } from "react-native-system-ui"

type CalendarMode = NonNullable<CalendarProps["type"]>
type CalendarValue = Date | Date[] | null

type CalendarOverrides = Partial<
  Omit<
    CalendarProps,
    | "poppable"
    | "visible"
    | "defaultVisible"
    | "value"
    | "defaultValue"
    | "onVisibleChange"
    | "onSelect"
    | "onConfirm"
  >
>

type CellExtraProps = Omit<React.ComponentProps<typeof Cell>, "title" | "value" | "onPress">

export interface CalendarLauncherOptions extends CalendarOverrides {
  key: string
  title: string
  type?: CalendarMode
  showConfirm?: boolean
  initialValue?: CalendarValue
  valueFormatter?: (value: CalendarValue, type: CalendarMode) => React.ReactNode
  cellProps?: CellExtraProps
  onChange?: (value: CalendarValue, type: CalendarMode) => void
}

export interface CalendarLauncherResult {
  cell: React.ReactElement
  calendar: React.ReactElement
}

const cloneValue = (value: CalendarValue): CalendarValue => {
  if (!value) return value
  if (Array.isArray(value)) {
    return value.map(date => new Date(date))
  }
  return new Date(value)
}

export const formatCalendarValue = (value: CalendarValue, type: CalendarMode) => {
  if (!value) {
    return "请选择日期"
  }
  if (type === "single") {
    return value instanceof Date ? value.toLocaleDateString() : "请选择日期"
  }
  if (type === "multiple") {
    return Array.isArray(value) && value.length ? `已选${value.length}个日期` : "请选择日期"
  }
  if (Array.isArray(value) && value.length === 2) {
    return `${value[0].toLocaleDateString()} ~ ${value[1].toLocaleDateString()}`
  }
  return "请选择日期"
}

export const useCalendarLauncher = (options: CalendarLauncherOptions): CalendarLauncherResult => {
  const {
    key,
    title,
    type = "single",
    showConfirm,
    cellProps,
    initialValue,
    valueFormatter,
    onChange,
    ...calendarOverrides
  } = options

  const [visible, setVisible] = React.useState(false)
  const [confirmedValue, setConfirmedValue] = React.useState<CalendarValue>(() => cloneValue(initialValue ?? null))
  const [draftValue, setDraftValue] = React.useState<CalendarValue>(null)

  const resolvedShowConfirm = showConfirm ?? (type !== "single")

  const handleVisibleChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        setDraftValue(cloneValue(confirmedValue))
      } else {
        setDraftValue(null)
      }
      setVisible(next)
    },
    [confirmedValue]
  )

  const handleSelect = React.useCallback(
    (next: Date | Date[]) => {
      const normalized = cloneValue(next as CalendarValue)
      setDraftValue(normalized)
      if (!resolvedShowConfirm) {
        setConfirmedValue(normalized)
        onChange?.(normalized, type)
      }
    },
    [resolvedShowConfirm, onChange, type]
  )

  const handleConfirm = React.useCallback((next: Date | Date[]) => {
    const normalized = cloneValue(next as CalendarValue)
    setConfirmedValue(normalized)
    onChange?.(normalized, type)
  }, [onChange, type])

  const displayValue = valueFormatter
    ? valueFormatter(confirmedValue, type)
    : formatCalendarValue(confirmedValue, type)

  const calendarsValue = draftValue ?? confirmedValue

  return {
    cell: (
      <Cell
        key={`cell-${key}`}
        title={title}
        value={displayValue}
        isLink
        onPress={() => handleVisibleChange(true)}
        {...cellProps}
      />
    ),
    calendar: (
      <Calendar
        key={`calendar-${key}`}
        {...calendarOverrides}
        poppable
        type={type}
        visible={visible}
        value={calendarsValue ?? null}
        showConfirm={resolvedShowConfirm}
        onVisibleChange={handleVisibleChange}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    ),
  }
}
