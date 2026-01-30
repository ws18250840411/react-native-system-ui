import React, { useCallback, useEffect, useRef, useState } from 'react'

import Picker from '../picker'
import { Popup, type PopupProps } from '../popup/Popup'
import { useControllableValue } from '../../hooks'
import { clamp, getMonthEndDay, getTrueValue, isValidDate, padZero, times, isString } from '../../utils'
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
  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'popupVisible',
    defaultValuePropName: 'defaultPopupVisible',
    trigger: 'onPopupVisibleChange',
  })

  const close = useCallback(() => setPopupVisible(false), [setPopupVisible])
  const renderPopup = useCallback(
    (node: React.ReactElement, popup?: boolean, popupProps?: Omit<PopupProps, 'visible' | 'children'>) => {
      if (!popup) return node
      return (
        <Popup
          visible={popupVisible}
          onClose={close}
          placement="bottom"
          round
          safeAreaInsetBottom={true}
          {...popupProps}
        >
          {node}
        </Popup>
      )
    },
    [close, popupVisible],
  )

  if (props.type === 'time') {
    const {
      popup,
      popupVisible: _popupVisible,
      defaultPopupVisible: _defaultPopupVisible,
      popupProps,
      onPopupVisibleChange: _onPopupVisibleChange,
      onConfirm,
      onCancel,
      ...pickerProps
    } = props

    const handleConfirm = useCallback(
      (value: string) => {
        onConfirm?.(value)
        if (popup) close()
      },
      [close, onConfirm, popup],
    )

    const handleCancel = useCallback(() => {
      onCancel?.()
      if (popup) close()
    }, [close, onCancel, popup])

    const pickerNode = (
      <TimePicker {...pickerProps} onConfirm={handleConfirm} onCancel={handleCancel} />
    )

    return renderPopup(pickerNode, popup, popupProps)
  }

  const {
    popup,
    popupVisible: _popupVisible,
    defaultPopupVisible: _defaultPopupVisible,
    popupProps,
    onPopupVisibleChange: _onPopupVisibleChange,
    onConfirm,
    onCancel,
    ...pickerProps
  } = props

  const handleConfirm = useCallback(
    (value: Date) => {
      onConfirm?.(value)
      if (popup) close()
    },
    [close, onConfirm, popup],
  )

  const handleCancel = useCallback(() => {
    onCancel?.()
    if (popup) close()
  }, [close, onCancel, popup])

  const pickerNode = (
    <DatePicker {...pickerProps} onConfirm={handleConfirm} onCancel={handleCancel} />
  )

  return renderPopup(pickerNode, popup, popupProps)
}

const DatePicker: React.FC<DatetimePickerDateProps> = props => {
  const {
    type = 'datetime',
    minDate = DEFAULT_MIN_DATE,
    maxDate = DEFAULT_MAX_DATE,
    formatter = (_type, value) => value,
    filter,
    columnsOrder,
    interactionMode = 'freeze',
    value,
    defaultValue,
    onChange,
    onConfirm,
    ...pickerProps
  } = props

  const formatValue = useCallback(
    (dateValue?: Date) => {
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
    },
    [maxDate, minDate, type],
  )

  const [currentDate, setCurrentDate] = useState<Date>(() =>
    formatValue(value ?? defaultValue),
  )

  useEffect(() => {
    setCurrentDate(prev => (value && isValidDate(value) ? formatValue(value) : formatValue(prev)))
  }, [formatValue, value])

  const { originColumns, columns, pickerValue } = (() => {
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
      })

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
  })()

  const buildDateFromValues = useCallback(
    (values: string[]) => {
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
    },
    [currentDate, formatValue, originColumns, type],
  )

  const handleChange = useCallback(
    (values: (string | number)[]) => {
      const next = buildDateFromValues(values.map(String))
      setCurrentDate(next)
      onChange?.(next)
    },
    [buildDateFromValues, onChange],
  )

  const handleConfirm = useCallback(() => onConfirm?.(currentDate), [currentDate, onConfirm])

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      interactionMode={interactionMode}
      value={pickerValue}
      onChange={handleChange}
      onConfirm={handleConfirm}
    />
  )
}

const TimePicker: React.FC<DatetimePickerTimeProps> = props => {
  const {
    type: _type,
    formatter = (_type, value) => value,
    filter,
    columnsOrder: _columnsOrder,
    minHour = 0,
    maxHour = 23,
    minMinute = 0,
    maxMinute = 59,
    interactionMode = 'freeze',
    value,
    defaultValue,
    onChange,
    onConfirm,
    ...pickerProps
  } = props

  const timeRef = useRef<string>('')
  const formatTime = useCallback(
    (timeValue?: string) => {
      const [hour = 0, minute = 0] = (timeValue ?? '').split(':').map(num => parseInt(num, 10))
      const nextHour = clamp(Number.isNaN(hour) ? minHour : hour, minHour, maxHour)
      const nextMinute = clamp(Number.isNaN(minute) ? minMinute : minute, minMinute, maxMinute)
      return `${padZero(nextHour)}:${padZero(nextMinute)}`
    },
    [maxHour, maxMinute, minHour, minMinute],
  )

  const [currentTime, setCurrentTime] = useState(() => {
    const initial = formatTime(value ?? defaultValue)
    timeRef.current = initial
    return initial
  })

  useEffect(() => {
    const next = isString(value) ? formatTime(value) : formatTime(timeRef.current)
    if (next !== timeRef.current) {
      timeRef.current = next
      setCurrentTime(next)
    }
  }, [formatTime, value])

  const [hourValues, minuteValues] = (() => {
    let hours = times(maxHour - minHour + 1, index => padZero(minHour + index))
    let minutes = times(maxMinute - minMinute + 1, index => padZero(minMinute + index))
    if (filter) {
      hours = filter('hour', hours)
      minutes = filter('minute', minutes)
    }
    return [hours, minutes] as [string[], string[]]
  })()

  const columns = [
    hourValues.map(value => ({ label: formatter('hour', value), value })),
    minuteValues.map(value => ({ label: formatter('minute', value), value })),
  ]

  const handleChange = useCallback(
    (values: (string | number)[]) => {
      const nextHour = values[0] ?? hourValues[0]
      const nextMinute = values[1] ?? minuteValues[0]
      const next = `${String(nextHour)}:${String(nextMinute)}`
      timeRef.current = next
      setCurrentTime(next)
      onChange?.(next)
    },
    [hourValues, minuteValues, onChange],
  )

  const handleConfirm = useCallback(() => onConfirm?.(timeRef.current), [onConfirm])
  const pickerValue = currentTime.split(':')

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      interactionMode={interactionMode}
      value={pickerValue}
      onChange={handleChange}
      onConfirm={handleConfirm}
    />
  )
}

export default DatetimePicker
