import React from "react"

import Picker from "../picker"
import type { PickerOption } from "../picker/types"
import { Popup } from "../popup/Popup"
import { padZero, times, getTrueValue, getMonthEndDay, isValidDate } from "./utils"
import type {
  DatetimePickerColumnType,
  DatetimePickerDateProps,
  DatetimePickerProps,
  DatetimePickerTimeProps,
  DatetimePickerType,
} from "./types"

const currentYear = new Date().getFullYear()
const DEFAULT_MIN_DATE = new Date(currentYear - 10, 0, 1)
const DEFAULT_MAX_DATE = new Date(currentYear + 10, 11, 31)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const DatetimePicker: React.FC<DatetimePickerProps> = props => {
  const {
    popup,
    popupVisible,
    defaultPopupVisible,
    popupProps,
    onPopupVisibleChange,
    ...rest
  } = props as any

  const [innerVisible, setInnerVisible] = React.useState<boolean>(defaultPopupVisible ?? false)
  const mergedVisible = popupVisible ?? innerVisible

  const setVisible = React.useCallback((v: boolean) => {
    if (popupVisible === undefined) setInnerVisible(v)
    onPopupVisibleChange?.(v)
  }, [popupVisible, onPopupVisibleChange])

  const handleClose = React.useCallback(() => setVisible(false), [setVisible])

  const pickerNode = props.type === "time"
    ? (
      <TimePicker
        {...rest}
        onConfirm={(val: any) => {
          rest.onConfirm?.(val)
          if (popup) setVisible(false)
        }}
        onCancel={() => {
          rest.onCancel?.()
          if (popup) handleClose()
        }}
      />
    )
    : (
      <DatePicker
        {...rest}
        onConfirm={(val: any) => {
          rest.onConfirm?.(val)
          if (popup) setVisible(false)
        }}
        onCancel={() => {
          rest.onCancel?.()
          if (popup) handleClose()
        }}
      />
    )

  if (!popup) return pickerNode

  return (
    <Popup
      visible={mergedVisible}
      onClose={handleClose}
      placement="bottom"
      round
      {...popupProps}
    >
      {pickerNode}
    </Popup>
  )
}

const DatePicker: React.FC<DatetimePickerDateProps> = props => {
  const {
    type = "datetime",
    minDate = DEFAULT_MIN_DATE,
    maxDate = DEFAULT_MAX_DATE,
    formatter = (_type, value) => value,
    filter,
    columnsOrder,
    value,
    defaultValue,
    onChange,
    onConfirm,
    ...pickerProps
  } = props

  const formatValue = React.useCallback(
    (dateValue?: Date) => {
      const fallback = isValidDate(dateValue) ? dateValue! : new Date()
      const time = clamp(fallback.getTime(), minDate.getTime(), maxDate.getTime())
      const date = new Date(time)

      if (type === 'year-month') {
        date.setDate(1)
        date.setHours(0, 0, 0, 0)
      } else if (type === 'date') {
        date.setHours(0, 0, 0, 0)
      } else if (type === 'datehour') {
        date.setMinutes(0, 0, 0)
      } else if (type === 'month-day') {
        date.setHours(0, 0, 0, 0)
      }

      return date
    },
    [maxDate, minDate, type],
  )

  const [currentDate, setCurrentDate] = React.useState<Date>(() => formatValue(value ?? defaultValue))

  React.useEffect(() => {
    if (value && isValidDate(value)) {
      setCurrentDate(formatValue(value))
    }
  }, [formatValue, value])

  // 当可选范围变更时，保证当前值被重新 clamp，避免越界
  React.useEffect(() => {
    setCurrentDate(prev => formatValue(prev))
  }, [formatValue])

  const getBoundary = React.useCallback(
    (boundaryType: "min" | "max", date: Date) => {
      const boundaryDate = boundaryType === "min" ? minDate : maxDate
      const boundary = {
        year: boundaryDate.getFullYear(),
        month: boundaryType === "min" ? 1 : 12,
        day:
          boundaryType === "min"
            ? 1
            : getMonthEndDay(date.getFullYear(), date.getMonth() + 1),
        hour: boundaryType === "min" ? 0 : 23,
        minute: boundaryType === "min" ? 0 : 59,
      }

      if (date.getFullYear() === boundary.year) {
        boundary.month = boundaryDate.getMonth() + 1
        if (date.getMonth() + 1 === boundary.month) {
          boundary.day = boundaryDate.getDate()
          if (date.getDate() === boundary.day) {
            boundary.hour = boundaryDate.getHours()
            if (date.getHours() === boundary.hour) {
              boundary.minute = boundaryDate.getMinutes()
            }
          }
        }
      }

      return boundary
    },
    [maxDate, minDate],
  )

  const originColumns = React.useMemo(() => {
    const maxBoundary = getBoundary("max", currentDate)
    const minBoundary = getBoundary("min", currentDate)

    const baseColumns: { type: DatetimePickerColumnType; range: [number, number] }[] = [
      { type: "year", range: [minBoundary.year, maxBoundary.year] },
      { type: "month", range: [minBoundary.month, maxBoundary.month] },
      { type: "day", range: [minBoundary.day, maxBoundary.day] },
      { type: "hour", range: [minBoundary.hour, maxBoundary.hour] },
      { type: "minute", range: [minBoundary.minute, maxBoundary.minute] },
    ]

    let result = baseColumns
    switch (type) {
      case "date":
        result = baseColumns.slice(0, 3)
        break
      case "year-month":
        result = baseColumns.slice(0, 2)
        break
      case "month-day":
        result = baseColumns.slice(1, 3)
        break
      case "datehour":
        result = baseColumns.slice(0, 4)
        break
      default:
        break
    }

    if (columnsOrder?.length) {
      const order = columnsOrder.concat(result.map(col => col.type))
      result = [...result].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
    }

    return result.map(column => {
      let values = times(column.range[1] - column.range[0] + 1, index => {
        const value = column.range[0] + index
        return column.type === "year" ? String(value) : padZero(value)
      }) as string[]

      if (filter) {
        values = filter(column.type, values)
      }

      return {
        type: column.type,
        values,
      }
    })
  }, [columnsOrder, currentDate, filter, getBoundary, type])

  const columns = React.useMemo(() => {
    return originColumns.map(column =>
      column.values.map(value => ({
        label: formatter(column.type, value),
        value,
      })),
    )
  }, [formatter, originColumns])

  const pickerValue = React.useMemo(() => {
    return originColumns.map(column => {
      switch (column.type) {
        case "year":
          return String(currentDate.getFullYear())
        case "month":
          return padZero(currentDate.getMonth() + 1)
        case "day":
          return padZero(currentDate.getDate())
        case "hour":
          return padZero(currentDate.getHours())
        case "minute":
          return padZero(currentDate.getMinutes())
        default:
          return 
      }
    })
  }, [currentDate, originColumns])

  const buildDateFromValues = React.useCallback(
    (values: string[]) => {
      const getValue = (columnType: DatetimePickerColumnType) => {
        const index = originColumns.findIndex(column => column.type === columnType)
        if (index === -1) return undefined
        return getTrueValue(values[index] ?? originColumns[index].values[0])
      }

      let year = currentDate.getFullYear()
      let month = currentDate.getMonth() + 1
      let day = currentDate.getDate()

      if (type === "month-day") {
        month = getValue("month") || month
        day = getValue("day") || day
      } else {
        year = getValue("year") || year
        month = getValue("month") || month
        day = type === "year-month" ? 1 : getValue("day") || day
      }

      const maxDay = getMonthEndDay(year, month)
      day = Math.min(day, maxDay)

      let hour = 0
      let minute = 0
      if (type === "datehour" || type === "datetime") {
        hour = getValue("hour") || 0
      }
      if (type === "datetime") {
        minute = getValue("minute") || 0
      }

      return formatValue(new Date(year, month - 1, day, hour, minute))
    },
    [currentDate, formatValue, originColumns, type],
  )

  const handleChange = (selectedValues: string[], options: PickerOption[]) => {
    const nextDate = buildDateFromValues(selectedValues)
    setCurrentDate(nextDate)
    onChange?.(nextDate)
  }

  const handleConfirm = () => {
    onConfirm?.(currentDate)
  }

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      value={pickerValue}
      onChange={(val, opts) => handleChange(val as string[], opts)}
      onConfirm={handleConfirm}
      onCancel={pickerProps.onCancel}
      title={pickerProps.title}
    />
  )
}

const TimePicker: React.FC<DatetimePickerTimeProps> = props => {
  const {
    formatter = (_type, value) => value,
    filter,
    minHour = 0,
    maxHour = 23,
    minMinute = 0,
    maxMinute = 59,
    value,
    defaultValue,
    onChange,
    onConfirm,
    ...pickerProps
  } = props

  const formatTime = React.useCallback(
    (timeValue?: string) => {
      const [hour = 0, minute = 0] = (timeValue ?? '').split(':').map(num => parseInt(num, 10))
      const nextHour = clamp(Number.isNaN(hour) ? minHour : hour, minHour, maxHour)
      const nextMinute = clamp(Number.isNaN(minute) ? minMinute : minute, minMinute, maxMinute)
      return `${padZero(nextHour)}:${padZero(nextMinute)}`
    },
    [maxHour, maxMinute, minHour, minMinute],
  )

  const [currentTime, setCurrentTime] = React.useState(() => formatTime(value ?? defaultValue))
  const timeRef = React.useRef(currentTime)

  React.useEffect(() => {
    if (typeof value === 'string') {
      setCurrentTime(formatTime(value))
    }
  }, [formatTime, value])

  React.useEffect(() => {
    timeRef.current = currentTime
  }, [currentTime])

  const hourValues = React.useMemo(() => {
    let values = times(maxHour - minHour + 1, index => padZero(minHour + index)) as string[]
    if (filter) {
      values = filter('hour', values)
    }
    return values
  }, [filter, maxHour, minHour])

  const minuteValues = React.useMemo(() => {
    let values = times(maxMinute - minMinute + 1, index => padZero(minMinute + index)) as string[]
    if (filter) {
      values = filter('minute', values)
    }
    return values
  }, [filter, maxMinute, minMinute])

  const columns = React.useMemo(() => {
    return [
      hourValues.map(value => ({ label: formatter('hour', value), value })),
      minuteValues.map(value => ({ label: formatter('minute', value), value })),
    ]
  }, [formatter, hourValues, minuteValues])

  const handleChange = (values: string[]) => {
    const next = `${values[0] ?? hourValues[0]}:${values[1] ?? minuteValues[0]}`
    timeRef.current = next
    setCurrentTime(next)
    onChange?.(next)
  }

  const handleConfirm = () => {
    onConfirm?.(timeRef.current)
  }

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      value={currentTime.split(':')}
      onChange={val => handleChange(val as string[])}
      onConfirm={handleConfirm}
      onCancel={pickerProps.onCancel}
    />
  )
}

export default DatetimePicker
