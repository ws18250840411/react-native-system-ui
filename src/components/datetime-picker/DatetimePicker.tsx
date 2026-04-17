import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Picker from '../picker'
import { Popup, type PopupProps } from '../popup/Popup'
import useControllableValue from '../../hooks/useControllableValue'
import { clamp } from '../../utils/number'
import { getMonthEndDay, getTrueValue, isValidDate, padZero, times } from '../../utils/date'
import { isString } from '../../utils/base'
import type { DatetimePickerColumnType, DatetimePickerDateProps, DatetimePickerProps, DatetimePickerTimeProps } from './types'
import { useDatetimePickerTokens } from './tokens'

const currentYear = new Date().getFullYear()
const DEFAULT_YEAR_RANGE_OFFSET = 10
const DEFAULT_MIN_DATE = new Date(currentYear - DEFAULT_YEAR_RANGE_OFFSET, 0, 1)
const DEFAULT_MAX_DATE = new Date(currentYear + DEFAULT_YEAR_RANGE_OFFSET, 11, 31)

const DatetimePickerImpl: React.FC<DatetimePickerProps> = props => {
  const tokens = useDatetimePickerTokens(); const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, { defaultValue: false, valuePropName: 'popupVisible', defaultValuePropName: 'defaultPopupVisible', trigger: 'onPopupVisibleChange' }); const handleClose = useCallback(() => setPopupVisible(false), [setPopupVisible]); const renderPopup = useCallback((node: React.ReactElement, popup?: boolean, popupProps?: Omit<PopupProps, 'visible' | 'children'>) => !popup ? node : <Popup visible={popupVisible} onClose={handleClose} placement={tokens.defaults.popupPlacement} round={tokens.defaults.popupRound} safeAreaInsetBottom={tokens.defaults.popupSafeAreaInsetBottom} {...popupProps}>{node}</Popup>, [handleClose, popupVisible, tokens.defaults.popupPlacement, tokens.defaults.popupRound, tokens.defaults.popupSafeAreaInsetBottom]); const { popup, popupVisible: _popupVisible, defaultPopupVisible: _defaultPopupVisible, popupProps, onPopupVisibleChange: _onPopupVisibleChange, onConfirm, onCancel, ...pickerProps } = props; const onConfirmRef = useRef(onConfirm); const onCancelRef = useRef(onCancel); onConfirmRef.current = onConfirm; onCancelRef.current = onCancel; const handleConfirm = useCallback((value: Date | string) => { (onConfirmRef.current as ((v: Date | string) => void) | undefined)?.(value); if (popup) handleClose() }, [handleClose, popup]); const handleCancel = useCallback(() => { onCancelRef.current?.(); if (popup) handleClose() }, [handleClose, popup]); const pickerNode = props.type === 'time' ? <TimePicker {...pickerProps as DatetimePickerTimeProps} onConfirm={handleConfirm} onCancel={handleCancel} /> : <DatePicker {...pickerProps as DatetimePickerDateProps} onConfirm={handleConfirm} onCancel={handleCancel} />; return renderPopup(pickerNode, popup, popupProps)
}

const DatePicker: React.FC<DatetimePickerDateProps> = props => {
  const { type = 'datetime', minDate = DEFAULT_MIN_DATE, maxDate = DEFAULT_MAX_DATE, formatter = (_type, value) => value, filter, columnsOrder, interactionMode = 'freeze', value, defaultValue, onChange, onConfirm, ...pickerProps } = props; const formatValue = useCallback((dateValue?: Date) => { const fb = isValidDate(dateValue) ? dateValue : new Date(); const date = new Date(clamp(fb.getTime(), minDate.getTime(), maxDate.getTime())); if (type === 'year-month') { date.setDate(1); date.setHours(0, 0, 0, 0) } else if (type === 'date' || type === 'month-day') { date.setHours(0, 0, 0, 0) } else if (type === 'datehour') { date.setMinutes(0, 0, 0) }; return date }, [maxDate, minDate, type]); const [currentDate, setCurrentDate] = useState<Date>(() => formatValue(value ?? defaultValue)); useEffect(() => { setCurrentDate(prev => (value && isValidDate(value) ? formatValue(value) : formatValue(prev))) }, [formatValue, value])

  const { originColumns, columns, pickerValue } = useMemo(() => {
    const getBoundary = (boundaryType: 'min' | 'max', date: Date) => {
      const boundaryDate = boundaryType === 'min' ? minDate : maxDate
      const boundary = { year: boundaryDate.getFullYear(), month: boundaryType === 'min' ? 1 : 12, day: boundaryType === 'min' ? 1 : getMonthEndDay(date.getFullYear(), date.getMonth() + 1), hour: boundaryType === 'min' ? 0 : 23, minute: boundaryType === 'min' ? 0 : 59 }
      if (date.getFullYear() === boundary.year) {
        boundary.month = boundaryDate.getMonth() + 1
        if (date.getMonth() + 1 === boundary.month) {
          boundary.day = boundaryDate.getDate()
          if (date.getDate() === boundary.day) {
            boundary.hour = boundaryDate.getHours()
            if (date.getHours() === boundary.hour) boundary.minute = boundaryDate.getMinutes()
          }
        }
      }
      return boundary
    }
    const maxBoundary = getBoundary('max', currentDate), minBoundary = getBoundary('min', currentDate)
    const baseColumns: { type: DatetimePickerColumnType; range: [number, number] }[] = [{ type: 'year', range: [minBoundary.year, maxBoundary.year] }, { type: 'month', range: [minBoundary.month, maxBoundary.month] }, { type: 'day', range: [minBoundary.day, maxBoundary.day] }, { type: 'hour', range: [minBoundary.hour, maxBoundary.hour] }, { type: 'minute', range: [minBoundary.minute, maxBoundary.minute] }]
    let result = baseColumns
    switch (type) {
      case 'date': result = baseColumns.slice(0, 3); break
      case 'year-month': result = baseColumns.slice(0, 2); break
      case 'month-day': result = baseColumns.slice(1, 3); break
      case 'datehour': result = baseColumns.slice(0, 4); break
      default: break
    }
    if (columnsOrder?.length) {
      const order = columnsOrder.concat(result.map(col => col.type))
      result = [...result].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
    }
    const originColumns = result.map(column => {
      let values = times(column.range[1] - column.range[0] + 1, index => column.type === 'year' ? String(column.range[0] + index) : padZero(column.range[0] + index))
      if (filter) values = filter(column.type, values)
      return { type: column.type, values }
    })
    const columns = originColumns.map(column => column.values.map(value => ({ label: formatter(column.type, value), value })))
    const pickerValue = originColumns.map(column => {
      switch (column.type) {
        case 'year': return String(currentDate.getFullYear())
        case 'month': return padZero(currentDate.getMonth() + 1)
        case 'day': return padZero(currentDate.getDate())
        case 'hour': return padZero(currentDate.getHours())
        case 'minute': return padZero(currentDate.getMinutes())
        default: return column.values[0] ?? ''
      }
    })
    return { originColumns, columns, pickerValue }
  }, [columnsOrder, currentDate, filter, formatter, maxDate, minDate, type])

  const buildDateFromValues = useCallback((values: string[]) => {
    const getValue = (columnType: DatetimePickerColumnType) => { const index = originColumns.findIndex(column => column.type === columnType); return index === -1 ? undefined : getTrueValue(values[index] ?? originColumns[index].values[0]) }
    let year = currentDate.getFullYear(), month = currentDate.getMonth() + 1, day = currentDate.getDate()
    if (type === 'month-day') { month = getValue('month') || month; day = getValue('day') || day }
    else { year = getValue('year') || year; month = getValue('month') || month; day = type === 'year-month' ? 1 : getValue('day') || day }
    day = Math.min(day, getMonthEndDay(year, month))
    let hour = 0, minute = 0
    if (type === 'datehour' || type === 'datetime') hour = getValue('hour') || 0
    if (type === 'datetime') minute = getValue('minute') || 0
    return formatValue(new Date(year, month - 1, day, hour, minute))
  }, [currentDate, formatValue, originColumns, type])

  const onChangeRef = useRef(onChange); const onConfirmRef = useRef(onConfirm); onChangeRef.current = onChange; onConfirmRef.current = onConfirm; const handleChange = useCallback((values: (string | number)[]) => { const next = buildDateFromValues(values.map(String)); setCurrentDate(next); onChangeRef.current?.(next) }, [buildDateFromValues]); const curDateRef = useRef(currentDate); curDateRef.current = currentDate; const handleConfirm = useCallback(() => onConfirmRef.current?.(curDateRef.current), []); return <Picker {...pickerProps} columns={columns} interactionMode={interactionMode} value={pickerValue} onChange={handleChange} onConfirm={handleConfirm} />
}

const TimePicker: React.FC<DatetimePickerTimeProps> = props => {
  const { type: _type, formatter = (_type, value) => value, filter, columnsOrder: _columnsOrder, minHour = 0, maxHour = 23, minMinute = 0, maxMinute = 59, interactionMode = 'freeze', value, defaultValue, onChange, onConfirm, ...pickerProps } = props; const timeRef = useRef<string>(''); const formatTime = useCallback((timeValue?: string) => { const [hour = 0, minute = 0] = (timeValue ?? '').split(':').map(num => parseInt(num, 10)); return `${padZero(clamp(Number.isNaN(hour) ? minHour : hour, minHour, maxHour))}:${padZero(clamp(Number.isNaN(minute) ? minMinute : minute, minMinute, maxMinute))}` }, [maxHour, maxMinute, minHour, minMinute]); const [currentTime, setCurrentTime] = useState(() => { const init = formatTime(value ?? defaultValue); timeRef.current = init; return init }); useEffect(() => { const next = isString(value) ? formatTime(value) : formatTime(timeRef.current); if (next !== timeRef.current) { timeRef.current = next; setCurrentTime(next) } }, [formatTime, value]); const [hourValues, minuteValues] = useMemo(() => { let h = times(maxHour - minHour + 1, i => padZero(minHour + i)); let m = times(maxMinute - minMinute + 1, i => padZero(minMinute + i)); if (filter) { h = filter('hour', h); m = filter('minute', m) }; return [h, m] as [string[], string[]] }, [filter, maxHour, maxMinute, minHour, minMinute]); const columns = useMemo(() => [hourValues.map(v => ({ label: formatter('hour', v), value: v })), minuteValues.map(v => ({ label: formatter('minute', v), value: v }))], [formatter, hourValues, minuteValues]); const onChangeRef = useRef(onChange); const onConfirmRef = useRef(onConfirm); onChangeRef.current = onChange; onConfirmRef.current = onConfirm; const handleChange = useCallback((values: (string | number)[]) => { const next = `${String(values[0] ?? hourValues[0])}:${String(values[1] ?? minuteValues[0])}`; timeRef.current = next; setCurrentTime(next); onChangeRef.current?.(next) }, [hourValues, minuteValues]); const handleConfirm = useCallback(() => onConfirmRef.current?.(timeRef.current), []); return <Picker {...pickerProps} columns={columns} interactionMode={interactionMode} value={currentTime.split(':')} onChange={handleChange} onConfirm={handleConfirm} />
}

const DatetimePicker = React.memo(DatetimePickerImpl)
export default DatetimePicker
