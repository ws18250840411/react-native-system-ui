import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, Text, View, type TextStyle } from 'react-native'
import { useControllableValue } from '../../hooks'
import { renderTextOrNode } from '../../utils'
import { isRenderable, isText } from '../../utils/validate'
import Popup from '../popup'
import { useLocale } from '../config-provider/useLocale'
import { useCalendarTokens } from './tokens'
import type { CalendarProps, CalendarType } from './types'

const DAY_MS = 24 * 60 * 60 * 1000
const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const startOfDay = (date: Date) => { const newDate = new Date(date); newDate.setHours(0, 0, 0, 0); return newDate }
const daysBetween = (a: Date, b: Date) => Math.round(Math.abs(startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY_MS)
const toArrayValue = (value?: Date | Date[] | null): Date[] => !value ? [] : Array.isArray(value) ? value.filter(Boolean).map(d => new Date(d)) : [new Date(value)]
const DEFAULT_MIN = new Date(new Date().getFullYear() - 10, 0, 1)
const DEFAULT_MAX = new Date(new Date().getFullYear() + 10, 11, 31)

const CalendarImpl: React.FC<CalendarProps> = props => {
  const { tokensOverride, value: _value, defaultValue: _defaultValue, minDate = DEFAULT_MIN, maxDate = DEFAULT_MAX, type, title, showSubtitle, showHeader, showConfirm, confirmText, weekStartsOn, weekdays, formatMonthTitle, allowSameDay, maxRange, onOverRange, poppable, visible: _visible, defaultVisible: _defaultVisible, onVisibleChange: _onVisibleChange, closeOnClickOverlay, closeOnConfirm, popupPlacement, popupRound, popupProps, onOpen, onOpened, onClose, onClosed, color, onConfirm, onSelect: _onSelect, style, ...rest } = props
  const locale = useLocale()
  const calendarLocale = locale?.vanCalendar
  const tokens = useCalendarTokens(tokensOverride)
  const resolvedTitle = title ?? (calendarLocale?.title ?? tokens.defaults.title)
  const resolvedShowSubtitle = showSubtitle ?? tokens.defaults.showSubtitle
  const resolvedShowHeader = showHeader ?? tokens.defaults.showHeader
  const resolvedConfirmText = confirmText ?? (calendarLocale?.confirm ?? tokens.defaults.confirmText)
  const resolvedWeekStartsOn = weekStartsOn ?? tokens.defaults.weekStartsOn
  const resolvedAllowSameDay = allowSameDay ?? tokens.defaults.allowSameDay
  const resolvedPoppable = poppable ?? tokens.defaults.poppable
  const resolvedCloseOnClickOverlay = closeOnClickOverlay ?? tokens.defaults.closeOnClickOverlay
  const resolvedCloseOnConfirm = closeOnConfirm ?? tokens.defaults.closeOnConfirm
  const resolvedPopupPlacement = popupPlacement ?? tokens.defaults.popupPlacement
  const resolvedPopupRound = popupRound ?? tokens.defaults.popupRound
  const resolvedType = type ?? tokens.defaults.type
  const resolvedShowConfirm = showConfirm ?? tokens.defaults.showConfirm[resolvedType]
  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, { defaultValue: false, valuePropName: 'visible', defaultValuePropName: 'defaultVisible', trigger: 'onVisibleChange' })
  const { onClose: popupOnClose, onClosed: popupOnClosed, onOpen: popupOnOpen, onOpened: popupOnOpened, closeOnOverlayPress: overlayCloseOnPress, overlay: popupOverlay, ...popupRestProps } = popupProps ?? {}
  const callbacksRef = useRef({ onConfirm, onOverRange, popupOnOpen, onOpen, popupOnOpened, onOpened, popupOnClose, onClose, popupOnClosed, onClosed })
  callbacksRef.current.onConfirm = onConfirm
  callbacksRef.current.onOverRange = onOverRange
  callbacksRef.current.popupOnOpen = popupOnOpen
  callbacksRef.current.onOpen = onOpen
  callbacksRef.current.popupOnOpened = popupOnOpened
  callbacksRef.current.onOpened = onOpened
  callbacksRef.current.popupOnClose = popupOnClose
  callbacksRef.current.onClose = onClose
  callbacksRef.current.popupOnClosed = popupOnClosed
  callbacksRef.current.onClosed = onClosed
  const closePopup = useCallback(() => { if (!resolvedPoppable) return; setPopupVisible(false) }, [resolvedPoppable, setPopupVisible])
  const handlePopupOpen = useCallback(() => { callbacksRef.current.popupOnOpen?.(); callbacksRef.current.onOpen?.() }, [])
  const handlePopupOpened = useCallback(() => { callbacksRef.current.popupOnOpened?.(); callbacksRef.current.onOpened?.() }, [])
  const handlePopupClose = useCallback(() => { closePopup(); callbacksRef.current.popupOnClose?.(); callbacksRef.current.onClose?.() }, [closePopup])
  const handlePopupClosed = useCallback(() => { callbacksRef.current.popupOnClosed?.(); callbacksRef.current.onClosed?.() }, [])
  const overlayCloseOnPressResolved = overlayCloseOnPress ?? resolvedCloseOnClickOverlay
  const overlayResolved = popupOverlay ?? true
  const [selectedValue, setSelectedValue] = useControllableValue<Date | Date[] | null>(props, { defaultValue: null, valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onSelect' })
  const value = normalizeValue(toArrayValue(selectedValue), resolvedType)
  const [currentMonth, setCurrentMonth] = useState(() => clampMonth(value.length ? value[0] : new Date(), minDate, maxDate))
  const firstValueTime = value.length ? value[0].getTime() : null
  const minDateTime = minDate.getTime()
  const maxDateTime = maxDate.getTime()
  useEffect(() => { if (!value.length) return; const first = clampMonth(value[0], minDate, maxDate); setCurrentMonth(prev => (isSameMonth(first, prev) ? prev : first)) }, [firstValueTime, minDateTime, maxDateTime])
  const monthDays = useMemo(() => buildMonth(currentMonth, resolvedWeekStartsOn), [currentMonth, resolvedWeekStartsOn])
  const monthDaysMapped = useMemo(() => monthDays.map(day => day ? { day, key: day.toISOString(), timeValue: startOfDay(day).getTime(), dateValue: day.getDate() } : null), [monthDays])
  const minDayTime = startOfDay(minDate).getTime()
  const maxDayTime = startOfDay(maxDate).getTime()
  const resolvedWeekdays = weekdays ?? calendarLocale?.weekdays ?? tokens.defaults.weekdays
  const weekLabels = useMemo(() => reorderWeekdays(resolvedWeekdays, resolvedWeekStartsOn, tokens.defaults.weekdays), [resolvedWeekdays, tokens.defaults.weekdays, resolvedWeekStartsOn])
  const monthLabel = useMemo(() => (formatMonthTitle ? formatMonthTitle(currentMonth) : calendarLocale?.monthTitle ? calendarLocale.monthTitle(currentMonth.getFullYear(), currentMonth.getMonth() + 1) : formatMonth(currentMonth)), [currentMonth, formatMonthTitle, calendarLocale])
  const minMonthStart = startOfMonth(minDate)
  const maxMonthStart = startOfMonth(maxDate)
  const canGoPrev = currentMonth.getTime() > minMonthStart.getTime()
  const canGoNext = currentMonth.getTime() < maxMonthStart.getTime()
  const goToMonth = useCallback((delta: number) => setCurrentMonth(prev => clampMonth(new Date(prev.getFullYear(), prev.getMonth() + delta, 1), minDate, maxDate)), [minDate, maxDate])
  const goPrev = useCallback(() => goToMonth(-1), [goToMonth])
  const goNext = useCallback(() => goToMonth(1), [goToMonth])
  const confirmDisabled = resolvedType === 'range' ? value.length < 2 : value.length === 0
  const columnPadding = tokens.spacing.column / 2
  const maybeAutoConfirm = useCallback((next: Date[]) => { if (resolvedShowConfirm) return; if (resolvedType === 'range' && next.length < 2) return; if (resolvedType === 'multiple' && next.length === 0) return; if (!next.length) return; callbacksRef.current.onConfirm?.(mapValue(next, resolvedType)); if (resolvedPoppable && resolvedCloseOnConfirm) closePopup() }, [resolvedShowConfirm, resolvedType, resolvedPoppable, resolvedCloseOnConfirm, closePopup])
  const handleConfirm = useCallback(() => { if (resolvedShowConfirm && confirmDisabled) return; callbacksRef.current.onConfirm?.(mapValue(value, resolvedType)); if (resolvedPoppable && resolvedCloseOnConfirm) closePopup() }, [resolvedShowConfirm, confirmDisabled, value, resolvedType, resolvedPoppable, resolvedCloseOnConfirm, closePopup])
  const isSelectionAllowed = useCallback((next: Date[]) => { if (resolvedType === 'range' && next.length === 2) { const [start, end] = next; if (!resolvedAllowSameDay && isSameDay(start, end)) return false; if (maxRange && daysBetween(start, end) + 1 > maxRange) { callbacksRef.current.onOverRange?.(maxRange); return false } } if (resolvedType === 'multiple' && maxRange && next.length > maxRange) { callbacksRef.current.onOverRange?.(maxRange); return false }; return true }, [resolvedType, resolvedAllowSameDay, maxRange])
  const handleSelectDayRef = useRef<(date: Date) => void>(undefined)
  const handleSelectDay = useCallback((date: Date) => { const dateTime = startOfDay(date).getTime(); if (dateTime < minDayTime || dateTime > maxDayTime) return; let next: Date[] = []; const nextValue = value; switch (resolvedType) { case 'single': next = [date]; break; case 'multiple': { const existing = nextValue.find(item => isSameDay(item, date)); next = existing ? nextValue.filter(item => !isSameDay(item, date)) : [...nextValue, date]; break } case 'range': { if (nextValue.length < 1 || nextValue.length > 1) { next = [date] } else { const first = nextValue[0]; if (isSameDay(first, date)) { next = resolvedAllowSameDay ? [first, date] : [date] } else { next = [first, date].sort((a, b) => a.getTime() - b.getTime()) } } break } default: next = [date] }; const normalizedNextValue = normalizeValue(next, resolvedType); if (!isSelectionAllowed(normalizedNextValue)) return; setSelectedValue(mapValue(normalizedNextValue, resolvedType)); if (!resolvedShowConfirm) maybeAutoConfirm(normalizedNextValue) }, [value, resolvedType, minDayTime, maxDayTime, resolvedAllowSameDay, isSelectionAllowed, setSelectedValue, resolvedShowConfirm, maybeAutoConfirm])
  handleSelectDayRef.current = handleSelectDay
  const selectDayPress = useCallback((date: Date) => handleSelectDayRef.current?.(date), [])
  const valueTimes = useMemo(() => value.map(item => startOfDay(item).getTime()), [value])
  const selected = useMemo(() => new Set(valueTimes), [valueTimes])
  const rangeBounds = resolvedType === 'range' && valueTimes.length === 2 ? [valueTimes[0], valueTimes[1]] : null
  const renderDay = useCallback((mapped: { day: Date; key: string; timeValue: number; dateValue: number } | null, index: number) => { if (!mapped) return <View key={`p-${index}`} style={[tokens.layout.dayPlaceholder, { paddingVertical: tokens.spacing.dayPaddingVertical, paddingHorizontal: columnPadding }]} />; const { day, key, timeValue, dateValue } = mapped; const isDisabled = timeValue < minDayTime || timeValue > maxDayTime; const isSelected = selected.has(timeValue); const inRange = resolvedType === 'range' && rangeBounds && timeValue > rangeBounds[0] && timeValue < rangeBounds[1]; const dayStyles: TextStyle[] = [tokens.layout.dayText, { borderRadius: tokens.radii.day, color: tokens.colors.text, minWidth: tokens.sizing.dayMinWidth }]; if (isDisabled) dayStyles.push({ color: tokens.colors.disabled }); else if (inRange) dayStyles.push({ backgroundColor: tokens.colors.rangeBackground }); else if (isSelected) dayStyles.push({ backgroundColor: color ?? tokens.colors.selectedBackground, color: tokens.colors.selectedText }); const accessibility = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}${isSelected ? ', selected' : ''}${isDisabled ? ', disabled' : ''}`; return <Pressable key={key} accessibilityRole="button" accessibilityLabel={accessibility} accessibilityState={{ selected: isSelected, disabled: isDisabled }} style={[tokens.layout.dayButton, { paddingVertical: tokens.spacing.dayPaddingVertical, paddingHorizontal: columnPadding }]} disabled={isDisabled} onPress={() => selectDayPress(day)} testID={getCalendarDayTestId(day)}><Text style={dayStyles}>{dateValue}</Text></Pressable> }, [selected, resolvedType, rangeBounds, minDayTime, maxDayTime, tokens, color, selectDayPress, columnPadding])
  const content = <View style={[{ backgroundColor: tokens.colors.background, padding: tokens.spacing.containerPadding, borderRadius: tokens.radii.container }, style]} {...rest}>{resolvedShowHeader ? <View style={[tokens.layout.header, { marginBottom: tokens.spacing.headerMarginBottom }]}><Pressable testID="calendar-nav-prev" accessibilityRole="button" accessibilityLabel="previous month" onPress={goPrev} disabled={!canGoPrev}><Text style={[tokens.layout.navText, { fontSize: tokens.sizing.navButtonSize, paddingHorizontal: tokens.spacing.navPaddingHorizontal }, !canGoPrev && { opacity: 0.3 }]}>{'<'}</Text></Pressable><View style={tokens.layout.headerCenter}>{isRenderable(resolvedTitle) ? renderTextOrNode(resolvedTitle, [tokens.layout.headerTitle, { color: tokens.colors.text, fontSize: tokens.typography.headerTitleSize, fontWeight: tokens.typography.headerTitleWeight }]) : null}{resolvedShowSubtitle ? renderTextOrNode(monthLabel, [tokens.layout.headerSubtitle, { color: tokens.colors.headerSubtitle, fontSize: tokens.typography.headerSubtitleSize }]) : null}</View><Pressable testID="calendar-nav-next" accessibilityRole="button" accessibilityLabel="next month" onPress={goNext} disabled={!canGoNext}><Text style={[tokens.layout.navText, { fontSize: tokens.sizing.navButtonSize, paddingHorizontal: tokens.spacing.navPaddingHorizontal }, !canGoNext && { opacity: 0.3 }]}>{'>'}</Text></Pressable></View> : null}<View style={[tokens.layout.weekRow, { marginBottom: tokens.spacing.weekRowMarginBottom }]}>{weekLabels.map((label, i) => <View key={`w-${i}`} style={[tokens.layout.weekLabelItem, { paddingHorizontal: columnPadding }]}>{renderTextOrNode(label, [tokens.layout.weekLabel, { color: tokens.colors.text }])}</View>)}</View><View style={[tokens.layout.days, { rowGap: tokens.spacing.row }]}>{monthDaysMapped.map((mapped, i) => renderDay(mapped, i))}</View>{resolvedShowConfirm ? <Pressable style={[tokens.layout.confirmButton, { backgroundColor: color ?? tokens.colors.selectedBackground, opacity: confirmDisabled ? 0.5 : 1, marginTop: tokens.spacing.confirmMarginTop, paddingVertical: tokens.spacing.confirmPaddingVertical, borderRadius: tokens.radii.confirmButton }]} onPress={handleConfirm} disabled={confirmDisabled}>{renderTextOrNode(resolvedConfirmText, [tokens.layout.confirmText, { color: tokens.colors.confirmText, fontWeight: tokens.typography.confirmTextWeight }])}</Pressable> : null}</View>
  if (!resolvedPoppable) return content
  return <Popup visible={popupVisible} placement={resolvedPopupPlacement} round={resolvedPopupRound} closeOnOverlayPress={overlayCloseOnPressResolved} overlay={overlayResolved} safeAreaInsetTop={popupRestProps?.safeAreaInsetTop != null ? popupRestProps.safeAreaInsetTop : resolvedShowHeader} safeAreaInsetBottom={popupRestProps?.safeAreaInsetBottom != null ? popupRestProps.safeAreaInsetBottom : resolvedPopupPlacement === 'bottom'} onOpen={handlePopupOpen} onOpened={handlePopupOpened} onClose={handlePopupClose} onClosed={handlePopupClosed} {...popupRestProps}>{content}</Popup>
}

function mapValue(value: Date[], type: CalendarType): Date | Date[] { if (type === 'single') return value[0] ?? new Date(); if (type === 'range' && value.length === 2) return value; return value }
function normalizeValue(value: Date[], type: CalendarType) { if (type === 'single') return value.slice(0, 1); if (type === 'range') return value.slice(0, 2).sort((a, b) => a.getTime() - b.getTime()); return value }
function formatMonth(date: Date) { return `${date.getFullYear()}/${date.getMonth() + 1}` }
function reorderWeekdays(labels: React.ReactNode[], start: number, fallback: React.ReactNode[]) { const normalizedStart = ((start % 7) + 7) % 7; const source = labels.length === 7 ? [...labels] : fallback; return [...source.slice(normalizedStart), ...source.slice(0, normalizedStart)] }
function buildMonth(month: Date, weekStartsOn: number): (Date | null)[] { const normalizedStart = ((weekStartsOn % 7) + 7) % 7; const firstDay = startOfMonth(month); const startOffset = (firstDay.getDay() - normalizedStart + 7) % 7; const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); const calendar: (Date | null)[] = []; for (let i = 0; i < startOffset; i += 1) calendar.push(null); for (let day = 1; day <= daysInMonth; day += 1) calendar.push(new Date(month.getFullYear(), month.getMonth(), day)); while (calendar.length < 42) calendar.push(null); return calendar }
function getCalendarDayTestId(date: Date) { return `calendar-day-${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}` }
function startOfMonth(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1) }
function clampMonth(date: Date, min: Date, max: Date) { const month = startOfMonth(date); const minMonth = startOfMonth(min); const maxMonth = startOfMonth(max); if (month.getTime() < minMonth.getTime()) return minMonth; if (month.getTime() > maxMonth.getTime()) return max; return month }
function isSameMonth(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() }

const Calendar = React.memo(CalendarImpl)
Calendar.displayName = 'Calendar'
export default Calendar
