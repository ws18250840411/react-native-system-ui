import React from 'react'

import Picker from '../picker'
import { Popup } from '../popup/Popup'
import { clamp } from '../../utils/number'
import { getMonthEndDay, getTrueValue, isValidDate, padZero, times } from '../../utils/date'
import type {
  DatetimePickerColumnType,
  DatetimePickerDateProps,
  DatetimePickerProps,
  DatetimePickerTimeProps,
} from './types'

const currentYear = new Date().getFullYear()
const DEFAULT_MIN_DATE = new Date(currentYear - 10, 0, 1)
const DEFAULT_MAX_DATE = new Date(currentYear + 10, 11, 31)

const DatetimePicker: React.FC<DatetimePickerProps> = props => {
  const {
    popup,
    popupVisible,
    defaultPopupVisible,
    popupProps,
    onPopupVisibleChange,
    onConfirm,
    onCancel,
    ...rest
  } = props as any

  const [innerVisible, setInnerVisible] = React.useState(defaultPopupVisible ?? false)
  const mergedVisible = popupVisible ?? innerVisible

  const setVisible = (visible: boolean) => {
    if (popupVisible === undefined) setInnerVisible(visible)
    onPopupVisibleChange?.(visible)
  }

  const close = () => setVisible(false)

  const handleConfirm = (value: any) => {
    onConfirm?.(value)
    if (popup) close()
  }

  const handleCancel = () => {
    onCancel?.()
    if (popup) close()
  }

  const pickerNode =
    props.type === 'time' ? (
      <TimePicker {...(rest as any)} onConfirm={handleConfirm} onCancel={handleCancel} />
    ) : (
      <DatePicker {...(rest as any)} onConfirm={handleConfirm} onCancel={handleCancel} />
    )

  if (!popup) return pickerNode

  return (
    <Popup visible={mergedVisible} onClose={close} placement="bottom" round {...popupProps}>
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

  const formatValue = (dateValue?: Date) => {
    const fallback = isValidDate(dateValue) ? dateValue : new Date()
    const time = clamp(fallback.getTime(), minDate.getTime(), maxDate.getTime())
    const date = new Date(time)

    if (type === 'year-month') {
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
    } else if (type === 'date' || type === 'month-day') {
      date.setHours(0, 0, 0, 0)
    } else if (type === 'datehour') {
      date.setMinutes(0, 0, 0)
    }

    return date
  }

  const [currentDate, setCurrentDate] = React.useState<Date>(() => formatValue(value ?? defaultValue))

  React.useEffect(() => {
    setCurrentDate(prev => (value && isValidDate(value) ? formatValue(value) : formatValue(prev)))
  }, [maxDate, minDate, type, value])

  const { originColumns, columns, pickerValue } = React.useMemo(() => {
    const getBoundary = (boundaryType: 'min' | 'max', date: Date) => {
      const boundaryDate = boundaryType === 'min' ? minDate : maxDate
      const boundary = {
        year: boundaryDate.getFullYear(),
        month: boundaryType === 'min' ? 1 : 12,
        day:
          boundaryType === 'min'
            ? 1
            : getMonthEndDay(date.getFullYear(), date.getMonth() + 1),
        hour: boundaryType === 'min' ? 0 : 23,
        minute: boundaryType === 'min' ? 0 : 59,
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
    }

    const maxBoundary = getBoundary('max', currentDate)
    const minBoundary = getBoundary('min', currentDate)

    const baseColumns: { type: DatetimePickerColumnType; range: [number, number] }[] = [
      { type: 'year', range: [minBoundary.year, maxBoundary.year] },
      { type: 'month', range: [minBoundary.month, maxBoundary.month] },
      { type: 'day', range: [minBoundary.day, maxBoundary.day] },
      { type: 'hour', range: [minBoundary.hour, maxBoundary.hour] },
      { type: 'minute', range: [minBoundary.minute, maxBoundary.minute] },
    ]

    let result = baseColumns
    switch (type) {
      case 'date':
        result = baseColumns.slice(0, 3)
        break
      case 'year-month':
        result = baseColumns.slice(0, 2)
        break
      case 'month-day':
        result = baseColumns.slice(1, 3)
        break
      case 'datehour':
        result = baseColumns.slice(0, 4)
        break
      default:
        break
    }

    if (columnsOrder?.length) {
      const order = columnsOrder.concat(result.map(col => col.type))
      result = [...result].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
    }

    const originColumns = result.map(column => {
      let values = times(column.range[1] - column.range[0] + 1, index => {
        const value = column.range[0] + index
        return column.type === 'year' ? String(value) : padZero(value)
      }) as string[]

      if (filter) {
        values = filter(column.type, values)
      }

      return { type: column.type, values }
    })

    const columns = originColumns.map(column =>
      column.values.map(value => ({
        label: formatter(column.type, value),
        value,
      })),
    )

    const pickerValue = originColumns.map(column => {
      switch (column.type) {
        case 'year':
          return String(currentDate.getFullYear())
        case 'month':
          return padZero(currentDate.getMonth() + 1)
        case 'day':
          return padZero(currentDate.getDate())
        case 'hour':
          return padZero(currentDate.getHours())
        case 'minute':
          return padZero(currentDate.getMinutes())
        default:
          return column.values[0] ?? ''
      }
    })

    return { originColumns, columns, pickerValue }
  }, [columnsOrder, currentDate, filter, formatter, maxDate, minDate, type])

  const buildDateFromValues = (values: string[]) => {
    const getValue = (columnType: DatetimePickerColumnType) => {
      const index = originColumns.findIndex(column => column.type === columnType)
      if (index === -1) return undefined
      return getTrueValue(values[index] ?? originColumns[index].values[0])
    }

    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()

    if (type === 'month-day') {
      month = getValue('month') || month
      day = getValue('day') || day
    } else {
      year = getValue('year') || year
      month = getValue('month') || month
      day = type === 'year-month' ? 1 : getValue('day') || day
    }

    const maxDay = getMonthEndDay(year, month)
    day = Math.min(day, maxDay)

    let hour = 0
    let minute = 0
    if (type === 'datehour' || type === 'datetime') {
      hour = getValue('hour') || 0
    }
    if (type === 'datetime') {
      minute = getValue('minute') || 0
    }

    return formatValue(new Date(year, month - 1, day, hour, minute))
  }

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      value={pickerValue}
      onChange={val => {
        const next = buildDateFromValues(val as string[])
        setCurrentDate(next)
        onChange?.(next)
      }}
      onConfirm={() => onConfirm?.(currentDate)}
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

  const timeRef = React.useRef('')
  const formatTime = (timeValue?: string) => {
    const [hour = 0, minute = 0] = (timeValue ?? '').split(':').map(num => parseInt(num, 10))
    const nextHour = clamp(Number.isNaN(hour) ? minHour : hour, minHour, maxHour)
    const nextMinute = clamp(Number.isNaN(minute) ? minMinute : minute, minMinute, maxMinute)
    return `${padZero(nextHour)}:${padZero(nextMinute)}`
  }

  const [currentTime, setCurrentTime] = React.useState(() => {
    const initial = formatTime(value ?? defaultValue)
    timeRef.current = initial
    return initial
  })

  React.useEffect(() => {
    const next = typeof value === 'string' ? formatTime(value) : formatTime(timeRef.current)
    if (next !== timeRef.current) {
      timeRef.current = next
      setCurrentTime(next)
    }
  }, [maxHour, maxMinute, minHour, minMinute, value])

  const [hourValues, minuteValues] = React.useMemo(() => {
    let hours = times(maxHour - minHour + 1, index => padZero(minHour + index)) as string[]
    let minutes = times(maxMinute - minMinute + 1, index => padZero(minMinute + index)) as string[]
    if (filter) {
      hours = filter('hour', hours)
      minutes = filter('minute', minutes)
    }
    return [hours, minutes] as [string[], string[]]
  }, [filter, maxHour, maxMinute, minHour, minMinute])

  const columns = React.useMemo(
    () => [
      hourValues.map(value => ({ label: formatter('hour', value), value })),
      minuteValues.map(value => ({ label: formatter('minute', value), value })),
    ],
    [formatter, hourValues, minuteValues],
  )

  const handleChange = (values: string[]) => {
    const next = `${values[0] ?? hourValues[0]}:${values[1] ?? minuteValues[0]}`
    timeRef.current = next
    setCurrentTime(next)
    onChange?.(next)
  }

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      value={currentTime.split(':')}
      onChange={val => handleChange(val as string[])}
      onConfirm={() => onConfirm?.(timeRef.current)}
    />
  )
}

export default DatetimePicker
