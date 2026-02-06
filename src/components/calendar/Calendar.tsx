import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, Text, View, type TextStyle } from 'react-native'

import { useControllableValue } from '../../hooks'
import { isText } from '../../utils/validate'
import Popup from '../popup'
import { useCalendarTokens } from './tokens'
import type { CalendarProps, CalendarType } from './types'

const DAY_MS = 24 * 60 * 60 * 1000

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const startOfDay = (date: Date) => {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

const daysBetween = (a: Date, b: Date) =>
  Math.round(Math.abs(startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY_MS)

const toArrayValue = (value?: Date | Date[] | null): Date[] => {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean).map(date => new Date(date)) : [new Date(value)]
}

const DEFAULT_MIN = new Date(new Date().getFullYear() - 10, 0, 1)
const DEFAULT_MAX = new Date(new Date().getFullYear() + 10, 11, 31)

const CalendarImpl: React.FC<CalendarProps> = props => {
  const {
    tokensOverride,
    value: _value,
    defaultValue: _defaultValue,
    minDate = DEFAULT_MIN,
    maxDate = DEFAULT_MAX,
    type: typeProp,
    title: titleProp,
    showSubtitle: showSubtitleProp,
    showHeader: showHeaderProp,
    showConfirm: showConfirmProp,
    confirmText: confirmTextProp,
    weekStartsOn: weekStartsOnProp,
    weekdays,
    formatMonthTitle,
    allowSameDay: allowSameDayProp,
    maxRange,
    onOverRange,
    poppable: poppableProp,
    visible: _visible,
    defaultVisible: _defaultVisible,
    onVisibleChange: _onVisibleChange,
    closeOnClickOverlay: closeOnClickOverlayProp,
    closeOnConfirm: closeOnConfirmProp,
    popupPlacement: popupPlacementProp,
    popupRound: popupRoundProp,
    popupProps: popupPropsOverrides,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    color,
    onConfirm,
    onSelect: _onSelect,
    style,
    ...rest
  } = props
  const tokens = useCalendarTokens(tokensOverride)
  const title = titleProp ?? tokens.defaults.title
  const showSubtitle = showSubtitleProp ?? tokens.defaults.showSubtitle
  const showHeader = showHeaderProp ?? tokens.defaults.showHeader
  const confirmText = confirmTextProp ?? tokens.defaults.confirmText
  const weekStartsOn = weekStartsOnProp ?? tokens.defaults.weekStartsOn
  const allowSameDay = allowSameDayProp ?? tokens.defaults.allowSameDay
  const poppable = poppableProp ?? tokens.defaults.poppable
  const closeOnClickOverlay = closeOnClickOverlayProp ?? tokens.defaults.closeOnClickOverlay
  const closeOnConfirm = closeOnConfirmProp ?? tokens.defaults.closeOnConfirm
  const popupPlacement = popupPlacementProp ?? tokens.defaults.popupPlacement
  const popupRound = popupRoundProp ?? tokens.defaults.popupRound
  const type = typeProp ?? tokens.defaults.type
  const showConfirm = showConfirmProp ?? tokens.defaults.showConfirm[type]
  const [popupVisible, setPopupVisible] = useControllableValue<boolean>(props, {
    defaultValue: false,
    valuePropName: 'visible',
    defaultValuePropName: 'defaultVisible',
    trigger: 'onVisibleChange',
  })

  const {
    onClose: popupOnClose,
    onClosed: popupOnClosed,
    onOpen: popupOnOpen,
    onOpened: popupOnOpened,
    closeOnOverlayPress: overrideCloseOnOverlayPress,
    overlay: popupOverlay,
    ...popupRestProps
  } = popupPropsOverrides ?? {}


  const onConfirmRef = useRef(onConfirm)
  onConfirmRef.current = onConfirm
  const onOverRangeRef = useRef(onOverRange)
  onOverRangeRef.current = onOverRange
  const popupOnOpenRef = useRef(popupOnOpen)
  popupOnOpenRef.current = popupOnOpen
  const onOpenRef = useRef(onOpen)
  onOpenRef.current = onOpen
  const popupOnOpenedRef = useRef(popupOnOpened)
  popupOnOpenedRef.current = popupOnOpened
  const onOpenedRef = useRef(onOpened)
  onOpenedRef.current = onOpened
  const popupOnCloseRef = useRef(popupOnClose)
  popupOnCloseRef.current = popupOnClose
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const popupOnClosedRef = useRef(popupOnClosed)
  popupOnClosedRef.current = popupOnClosed
  const onClosedRef = useRef(onClosed)
  onClosedRef.current = onClosed

  const closePopup = useCallback(() => {
    if (!poppable) return
    setPopupVisible(false)
  }, [poppable, setPopupVisible])

  const handlePopupOpen = useCallback(() => {
    popupOnOpenRef.current?.()
    onOpenRef.current?.()
  }, [])

  const handlePopupOpened = useCallback(() => {
    popupOnOpenedRef.current?.()
    onOpenedRef.current?.()
  }, [])

  const handlePopupClose = useCallback(() => {
    closePopup()
    popupOnCloseRef.current?.()
    onCloseRef.current?.()
  }, [closePopup])

  const handlePopupClosed = useCallback(() => {
    popupOnClosedRef.current?.()
    onClosedRef.current?.()
  }, [])

  const resolvedCloseOnOverlayPress = overrideCloseOnOverlayPress ?? closeOnClickOverlay
  const resolvedOverlay = popupOverlay ?? true

  const [selectedValue, setSelectedValue] = useControllableValue<Date | Date[] | null>(props, {
    defaultValue: null,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onSelect',
  })
  const value = normalizeValue(toArrayValue(selectedValue), type)

  const [currentMonth, setCurrentMonth] = useState(() => {
    const initial = value.length ? value[0] : new Date()
    return clampMonth(initial, minDate, maxDate)
  })

  const firstValueTime = value.length ? value[0].getTime() : null
  const minDateTime = minDate.getTime()
  const maxDateTime = maxDate.getTime()

  useEffect(() => {
    if (!value.length) {
      return
    }
    const first = clampMonth(value[0], minDate, maxDate)
    setCurrentMonth(prev => (isSameMonth(first, prev) ? prev : first))
  }, [firstValueTime, minDateTime, maxDateTime])

  const monthDays = useMemo(
    () => buildMonth(currentMonth, weekStartsOn),
    [currentMonth, weekStartsOn]
  )

  const monthDayMeta = useMemo(
    () => monthDays.map(day => (
      day
        ? {
          day,
          key: day.toISOString(),
          timeValue: startOfDay(day).getTime(),
          dateValue: day.getDate(),
        }
        : null
    )),
    [monthDays]
  )

  const minDay = startOfDay(minDate).getTime()
  const maxDay = startOfDay(maxDate).getTime()

  const weekLabels = useMemo(
    () =>
      reorderWeekdays(
        weekdays ?? tokens.defaults.weekdays,
        weekStartsOn,
        tokens.defaults.weekdays,
      ),
    [tokens.defaults.weekdays, weekStartsOn, weekdays]
  )

  const monthLabel = useMemo(
    () => (formatMonthTitle ? formatMonthTitle(currentMonth) : formatMonth(currentMonth)),
    [currentMonth, formatMonthTitle]
  )

  const minMonthStart = startOfMonth(minDate)
  const maxMonthStart = startOfMonth(maxDate)
  const canGoPrev = currentMonth.getTime() > minMonthStart.getTime()
  const canGoNext = currentMonth.getTime() < maxMonthStart.getTime()

  const goToMonth = useCallback(
    (delta: number) => {
      setCurrentMonth(prev =>
        clampMonth(new Date(prev.getFullYear(), prev.getMonth() + delta, 1), minDate, maxDate)
      )
    },
    [minDate, maxDate]
  )

  const goPrev = useCallback(() => goToMonth(-1), [goToMonth])
  const goNext = useCallback(() => goToMonth(1), [goToMonth])

  const confirmDisabled = type === 'range' ? value.length < 2 : value.length === 0
  const columnPadding = tokens.spacing.column / 2

  const maybeAutoConfirm = useCallback(
    (next: Date[]) => {
      if (showConfirm) return
      if (type === 'range' && next.length < 2) return
      if (type === 'multiple' && next.length === 0) return
      if (!next.length) return
      onConfirmRef.current?.(mapValue(next, type))
      if (poppable && closeOnConfirm) {
        closePopup()
      }
    },
    [showConfirm, type, poppable, closeOnConfirm, closePopup]
  )

  const handleConfirm = useCallback(() => {
    if (showConfirm && confirmDisabled) {
      return
    }
    onConfirmRef.current?.(mapValue(value, type))
    if (poppable && closeOnConfirm) {
      closePopup()
    }
  }, [showConfirm, confirmDisabled, value, type, poppable, closeOnConfirm, closePopup])

  const isSelectionAllowed = useCallback(
    (next: Date[]) => {
      if (type === 'range' && next.length === 2) {
        const [start, end] = next
        if (!allowSameDay && isSameDay(start, end)) {
          return false
        }
        if (maxRange && daysBetween(start, end) + 1 > maxRange) {
          onOverRangeRef.current?.(maxRange)
          return false
        }
      }
      if (type === 'multiple' && maxRange && next.length > maxRange) {
        onOverRangeRef.current?.(maxRange)
        return false
      }
      return true
    },
    [type, allowSameDay, maxRange]
  )

  const handleSelectDayRef = useRef<(day: Date) => void>(undefined)

  const handleSelectDay = useCallback((day: Date) => {
    const dayTime = startOfDay(day).getTime()
    if (dayTime < minDay || dayTime > maxDay) {
      return
    }

    let next: Date[] = []
    const normalized = value
    switch (type) {
      case 'single': {
        next = [day]
        break
      }
      case 'multiple': {
        const exists = normalized.find(item => isSameDay(item, day))
        next = exists ? normalized.filter(item => !isSameDay(item, day)) : [...normalized, day]
        break
      }
      case 'range': {
        if (normalized.length < 1 || normalized.length > 1) {
          next = [day]
        } else {
          const first = normalized[0]
          if (isSameDay(first, day)) {
            next = allowSameDay ? [first, day] : [day]
          } else {
            next = [first, day].sort((a, b) => a.getTime() - b.getTime())
          }
        }
        break
      }
      default:
        next = [day]
    }
    const normalizedNext = normalizeValue(next, type)
    if (!isSelectionAllowed(normalizedNext)) {
      return
    }
    setSelectedValue(mapValue(normalizedNext, type))
    if (!showConfirm) {
      maybeAutoConfirm(normalizedNext)
    }
  }, [value, type, minDay, maxDay, allowSameDay, isSelectionAllowed, setSelectedValue, showConfirm, maybeAutoConfirm])
  handleSelectDayRef.current = handleSelectDay


  const stableDayPress = useCallback((day: Date) => {
    handleSelectDayRef.current?.(day)
  }, [])

  const valueTimes = useMemo(
    () => value.map(item => startOfDay(item).getTime()),
    [value]
  )
  const selectedSet = useMemo(() => new Set(valueTimes), [valueTimes])
  const rangeBounds = type === 'range' && valueTimes.length === 2
    ? [valueTimes[0], valueTimes[1]]
    : null

  const renderDay = useCallback((meta: { day: Date; key: string; timeValue: number; dateValue: number } | null, index: number) => {
    if (!meta) {
      return (
        <View
          key={`placeholder-${index}`}
          style={[
            tokens.layout.dayPlaceholder,
            { paddingVertical: tokens.spacing.dayPaddingVertical, paddingHorizontal: columnPadding },
          ]}
        />
      )
    }
    const { day, key, timeValue, dateValue } = meta
    const isDisabled = timeValue < minDay || timeValue > maxDay
    const isSelected = selectedSet.has(timeValue)
    const inRange =
      type === 'range' &&
      rangeBounds &&
      timeValue > rangeBounds[0] &&
      timeValue < rangeBounds[1]

    const dayStyle: TextStyle[] = [
      tokens.layout.dayText,
      {
        borderRadius: tokens.radii.day,
        color: tokens.colors.text,
        minWidth: tokens.sizing.dayMinWidth,
      },
    ]

    if (isDisabled) {
      dayStyle.push({ color: tokens.colors.disabled })
    } else if (inRange) {
      dayStyle.push({ backgroundColor: tokens.colors.rangeBackground })
    } else if (isSelected) {
      dayStyle.push({ backgroundColor: color ?? tokens.colors.selectedBackground, color: tokens.colors.selectedText })
    }

    const a11yLabel = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}${isSelected ? ', selected' : ''}${isDisabled ? ', disabled' : ''}`

    return (
      <Pressable
        key={key}
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        accessibilityState={{ selected: isSelected, disabled: isDisabled }}
        style={[
          tokens.layout.dayButton,
          { paddingVertical: tokens.spacing.dayPaddingVertical, paddingHorizontal: columnPadding },
        ]}
        disabled={isDisabled}
        onPress={() => stableDayPress(day)}
        testID={getCalendarDayTestId(day)}
      >
        <Text style={dayStyle}>{dateValue}</Text>
      </Pressable>
    )
  }, [selectedSet, type, rangeBounds, minDay, maxDay, tokens, color, stableDayPress, columnPadding])

  const content = (
    <View
      style={[
        {
          backgroundColor: tokens.colors.background,
          padding: tokens.spacing.containerPadding,
          borderRadius: tokens.radii.container,
        },
        style,
      ]}
      {...rest}
    >
      {showHeader ? (
        <View style={[tokens.layout.header, { marginBottom: tokens.spacing.headerMarginBottom }]}>
          <Pressable
            testID="calendar-nav-prev"
            accessibilityRole="button"
            accessibilityLabel="previous month"
            onPress={goPrev}
            disabled={!canGoPrev}
          >
            <Text
              style={[
                tokens.layout.navText,
                {
                  fontSize: tokens.sizing.navButtonSize,
                  paddingHorizontal: tokens.spacing.navPaddingHorizontal,
                },
                !canGoPrev && { opacity: 0.3 },
              ]}
            >
              {'<'}
            </Text>
          </Pressable>
          <View style={tokens.layout.headerCenter}>
            {title !== undefined && title !== null && title !== false
              ? isText(title)
                ? (
                  <Text
                    style={[
                      tokens.layout.headerTitle,
                      {
                        color: tokens.colors.text,
                        fontSize: tokens.typography.headerTitleSize,
                        fontWeight: tokens.typography.headerTitleWeight,
                      },
                    ]}
                  >
                    {title}
                  </Text>
                )
                : title
              : null}
            {showSubtitle ? (
              isText(monthLabel)
                ? (
                  <Text
                    style={[
                      tokens.layout.headerSubtitle,
                      {
                        color: tokens.colors.headerSubtitle,
                        fontSize: tokens.typography.headerSubtitleSize,
                      },
                    ]}
                  >
                    {monthLabel}
                  </Text>
                )
                : monthLabel
            ) : null}
          </View>
          <Pressable
            testID="calendar-nav-next"
            accessibilityRole="button"
            accessibilityLabel="next month"
            onPress={goNext}
            disabled={!canGoNext}
          >
            <Text
              style={[
                tokens.layout.navText,
                {
                  fontSize: tokens.sizing.navButtonSize,
                  paddingHorizontal: tokens.spacing.navPaddingHorizontal,
                },
                !canGoNext && { opacity: 0.3 },
              ]}
            >
              {'>'}
            </Text>
          </Pressable>
        </View>
      ) : null}
      <View style={[tokens.layout.weekRow, { marginBottom: tokens.spacing.weekRowMarginBottom }]}>
        {weekLabels.map((label, index) => (
          <View
            key={`weekday-${index}`}
            style={[tokens.layout.weekLabelItem, { paddingHorizontal: columnPadding }]}
          >
            {isText(label)
              ? (
                <Text style={[tokens.layout.weekLabel, { color: tokens.colors.text }]}>
                  {label}
                </Text>
              )
              : label}
          </View>
        ))}
      </View>
      <View style={[tokens.layout.days, { rowGap: tokens.spacing.row }]}>
        {monthDayMeta.map((meta, index) => renderDay(meta, index))}
      </View>
      {showConfirm ? (
        <Pressable
          style={[
            tokens.layout.confirmButton,
            {
              backgroundColor: color ?? tokens.colors.selectedBackground,
              opacity: confirmDisabled ? 0.5 : 1,
              marginTop: tokens.spacing.confirmMarginTop,
              paddingVertical: tokens.spacing.confirmPaddingVertical,
              borderRadius: tokens.radii.confirmButton,
            },
          ]}
          onPress={handleConfirm}
          disabled={confirmDisabled}
        >
          {isText(confirmText)
            ? (
              <Text
                style={[
                  tokens.layout.confirmText,
                  {
                    color: tokens.colors.confirmText,
                    fontWeight: tokens.typography.confirmTextWeight,
                  },
                ]}
              >
                {confirmText}
              </Text>
            )
            : confirmText}
        </Pressable>
      ) : null}
    </View>
  )

  if (!poppable) {
    return content
  }

  return (
    <Popup
      visible={popupVisible}
      placement={popupPlacement}
      round={popupRound}
      closeOnOverlayPress={resolvedCloseOnOverlayPress}
      overlay={resolvedOverlay}
      safeAreaInsetTop={
        popupRestProps?.safeAreaInsetTop !== undefined
          ? popupRestProps.safeAreaInsetTop
          : showHeader
      }
      safeAreaInsetBottom={
        popupRestProps?.safeAreaInsetBottom !== undefined
          ? popupRestProps.safeAreaInsetBottom
          : popupPlacement === 'bottom'
      }
      onOpen={handlePopupOpen}
      onOpened={handlePopupOpened}
      onClose={handlePopupClose}
      onClosed={handlePopupClosed}
      {...popupRestProps}
    >
      {content}
    </Popup>
  )
}

function mapValue(value: Date[], type: CalendarType): Date | Date[] {
  if (type === 'single') {
    return value[0] ?? new Date()
  }
  if (type === 'range' && value.length === 2) {
    return value
  }
  return value
}

function normalizeValue(value: Date[], type: CalendarType) {
  if (type === 'single') {
    return value.slice(0, 1)
  }
  if (type === 'range') {
    return value
      .slice(0, 2)
      .sort((a, b) => a.getTime() - b.getTime())
  }
  return value
}

function formatMonth(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

function reorderWeekdays(labels: React.ReactNode[], start: number, fallback: React.ReactNode[]) {
  const normalizedStart = ((start % 7) + 7) % 7
  const source = labels.length === 7 ? [...labels] : fallback
  return [...source.slice(normalizedStart), ...source.slice(0, normalizedStart)]
}

function buildMonth(month: Date, weekStartsOn: number): (Date | null)[] {
  const normalizedStart = ((weekStartsOn % 7) + 7) % 7
  const firstDay = startOfMonth(month)
  const startOffset = (firstDay.getDay() - normalizedStart + 7) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = []

  for (let i = 0; i < startOffset; i += 1) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day))
  }
  while (cells.length < 42) {
    cells.push(null)
  }
  return cells
}

function getCalendarDayTestId(day: Date) {
  return `calendar-day-${day.getFullYear()}-${`${day.getMonth() + 1}`.padStart(2, '0')}-${`${day.getDate()}`.padStart(2, '0')}`
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function clampMonth(date: Date, min: Date, max: Date) {
  const month = startOfMonth(date)
  const minMonth = startOfMonth(min)
  const maxMonth = startOfMonth(max)
  if (month.getTime() < minMonth.getTime()) return minMonth
  if (month.getTime() > maxMonth.getTime()) return maxMonth
  return month
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

const Calendar = React.memo(CalendarImpl)
Calendar.displayName = 'Calendar'

export default Calendar
