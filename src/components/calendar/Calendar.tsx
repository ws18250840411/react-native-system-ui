import React from 'react'
import { Pressable, StyleSheet, Text, View, type TextStyle } from 'react-native'

import { useControllableValue } from '../../hooks'
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

const defaultWeekDays = ['日', '一', '二', '三', '四', '五', '六']

const isTextLike = (node: React.ReactNode): node is string | number =>
  typeof node === "string" || typeof node === "number"

const Calendar: React.FC<CalendarProps> = props => {
  const {
    tokensOverride,
    value: _value,
    defaultValue: _defaultValue,
    minDate = DEFAULT_MIN,
    maxDate = DEFAULT_MAX,
    type = 'single',
    title = '选择日期',
    showSubtitle = true,
    showHeader = true,
    showConfirm = type !== 'single',
    confirmText = '确定',
    weekStartsOn = 0,
    weekdays,
    formatMonthTitle,
    allowSameDay = false,
    maxRange,
    onOverRange,
    poppable = false,
    visible: _visible,
    defaultVisible: _defaultVisible,
    onVisibleChange: _onVisibleChange,
    closeOnClickOverlay = true,
    closeOnConfirm = true,
    popupPlacement = 'bottom',
    popupRound = true,
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

  const closePopup = React.useCallback(() => {
    if (!poppable) return
    setPopupVisible(false)
  }, [poppable, setPopupVisible])

  const handlePopupOpen = React.useCallback(() => {
    popupOnOpen?.()
    onOpen?.()
  }, [popupOnOpen, onOpen])

  const handlePopupOpened = React.useCallback(() => {
    popupOnOpened?.()
    onOpened?.()
  }, [popupOnOpened, onOpened])

  const handlePopupClose = React.useCallback(() => {
    closePopup()
    popupOnClose?.()
    onClose?.()
  }, [closePopup, popupOnClose, onClose])

  const handlePopupClosed = React.useCallback(() => {
    popupOnClosed?.()
    onClosed?.()
  }, [popupOnClosed, onClosed])

  const resolvedCloseOnOverlayPress = overrideCloseOnOverlayPress ?? closeOnClickOverlay
  const resolvedOverlay = popupOverlay ?? true

  const [selectedValue, setSelectedValue] = useControllableValue<Date | Date[] | null>(props, {
    defaultValue: null,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onSelect',
  })
  const value = toArrayValue(selectedValue)

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const initial = value.length ? value[0] : new Date()
    return clampMonth(initial, minDate, maxDate)
  })

  const firstValueTime = value.length ? value[0].getTime() : null
  const minDateTime = minDate.getTime()
  const maxDateTime = maxDate.getTime()

  React.useEffect(() => {
    if (!value.length) {
      return
    }
    const first = clampMonth(value[0], minDate, maxDate)
    setCurrentMonth(prev => (isSameMonth(first, prev) ? prev : first))
  }, [firstValueTime, minDateTime, maxDateTime])

  const monthDays = React.useMemo(
    () => buildMonth(currentMonth, weekStartsOn),
    [currentMonth, weekStartsOn]
  )

  const minDay = React.useMemo(() => startOfDay(minDate).getTime(), [minDate])
  const maxDay = React.useMemo(() => startOfDay(maxDate).getTime(), [maxDate])

  const weekLabels = React.useMemo(
    () => reorderWeekdays(weekdays ?? defaultWeekDays, weekStartsOn),
    [weekdays, weekStartsOn]
  )

  const monthLabel = React.useMemo(
    () => (formatMonthTitle ? formatMonthTitle(currentMonth) : formatMonth(currentMonth)),
    [formatMonthTitle, currentMonth]
  )

  const minMonthStart = React.useMemo(() => startOfMonth(minDate), [minDate])
  const maxMonthStart = React.useMemo(() => startOfMonth(maxDate), [maxDate])
  const canGoPrev = currentMonth.getTime() > minMonthStart.getTime()
  const canGoNext = currentMonth.getTime() < maxMonthStart.getTime()

  const goToMonth = React.useCallback(
    (delta: number) => {
      setCurrentMonth(prev =>
        clampMonth(new Date(prev.getFullYear(), prev.getMonth() + delta, 1), minDate, maxDate)
      )
    },
    [minDate, maxDate]
  )

  const confirmDisabled = type === 'range' ? value.length < 2 : value.length === 0

  const maybeAutoConfirm = React.useCallback(
    (next: Date[]) => {
      if (showConfirm) return
      if (type === 'range' && next.length < 2) return
      if (type === 'multiple' && next.length === 0) return
      if (!next.length) return
      onConfirm?.(mapValue(next, type))
      if (poppable && closeOnConfirm) {
        closePopup()
      }
    },
    [showConfirm, type, onConfirm, poppable, closeOnConfirm, closePopup]
  )

  const handleConfirm = React.useCallback(() => {
    if (showConfirm && confirmDisabled) {
      return
    }
    onConfirm?.(mapValue(value, type))
    if (poppable && closeOnConfirm) {
      closePopup()
    }
  }, [showConfirm, confirmDisabled, onConfirm, value, type, poppable, closeOnConfirm, closePopup])

  const isSelectionAllowed = React.useCallback(
    (next: Date[]) => {
      if (type === 'range' && next.length === 2) {
        const [start, end] = next
        if (!allowSameDay && isSameDay(start, end)) {
          return false
        }
        if (maxRange && daysBetween(start, end) + 1 > maxRange) {
          onOverRange?.(maxRange)
          return false
        }
      }
      if (type === 'multiple' && maxRange && next.length > maxRange) {
        onOverRange?.(maxRange)
        return false
      }
      return true
    },
    [type, allowSameDay, maxRange, onOverRange]
  )

  const handleSelectDay = React.useCallback((day: Date) => {
    const dayTime = startOfDay(day).getTime()
    if (dayTime < minDay || dayTime > maxDay) {
      return
    }

    let next: Date[] = []
    const normalized = value.map(item => new Date(item))
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

  const selectedMap = value.map(item => startOfDay(item).getTime())
  const rangeBounds = type === 'range' && value.length === 2
    ? [startOfDay(value[0]).getTime(), startOfDay(value[1]).getTime()]
    : null

  const renderDay = React.useCallback((day: Date | null, index: number) => {
    if (!day) {
      return (
        <View
          key={`placeholder-${index}`}
          style={[styles.dayPlaceholder, { paddingVertical: tokens.spacing.dayPaddingVertical }]}
        />
      )
    }
    const timeValue = startOfDay(day).getTime()
    const isDisabled = timeValue < minDay || timeValue > maxDay
    const isSelected = selectedMap.includes(timeValue)
    const inRange =
      type === 'range' &&
      rangeBounds &&
      timeValue > rangeBounds[0] &&
      timeValue < rangeBounds[1]

    const dayStyle: TextStyle[] = [
      styles.day,
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

    return (
      <Pressable
        key={day.toISOString()}
        style={[styles.dayButton, { paddingVertical: tokens.spacing.dayPaddingVertical }]}
        disabled={isDisabled}
        onPress={() => handleSelectDay(day)}
        testID={getCalendarDayTestId(day)}
      >
        <Text style={dayStyle}>{day.getDate()}</Text>
      </Pressable>
    )
  }, [selectedMap, type, rangeBounds, minDay, maxDay, tokens, color, handleSelectDay])

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
        <View style={[styles.header, { marginBottom: tokens.spacing.headerMarginBottom }]}>
          <Pressable
            testID="calendar-nav-prev"
            onPress={() => canGoPrev && goToMonth(-1)}
            disabled={!canGoPrev}
          >
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontSize: tokens.sizing.navButtonSize,
                  paddingHorizontal: tokens.spacing.navPaddingHorizontal,
                },
                !canGoPrev && { opacity: 0.3 },
              ]}
            >
              {'<'}
            </Text>
          </Pressable>
          <View style={styles.headerCenter}>
            {title !== undefined && title !== null && title !== false
              ? isTextLike(title)
                ? (
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        color: tokens.colors.text,
                        fontSize: tokens.typography.headerTitleSize,
                        fontWeight: tokens.typography.headerTitleWeight as any,
                      },
                    ]}
                  >
                    {title}
                  </Text>
                )
                : title
              : null}
            {showSubtitle ? (
              isTextLike(monthLabel)
                ? (
                  <Text
                    style={[
                      {
                        textAlign: 'center',
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
            onPress={() => canGoNext && goToMonth(1)}
            disabled={!canGoNext}
          >
            <Text
              style={[
                {
                  textAlign: 'center',
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
      <View style={[styles.weekRow, { marginBottom: tokens.spacing.weekRowMarginBottom }]}>
        {weekLabels.map((label, index) => (
          <View key={`weekday-${index}`} style={styles.weekLabelItem}>
            {isTextLike(label)
              ? (
                <Text style={{ textAlign: 'center', color: tokens.colors.text }}>
                  {label}
                </Text>
              )
              : label}
          </View>
        ))}
      </View>
      <View style={[styles.days, { rowGap: tokens.spacing.row, columnGap: tokens.spacing.column }]}>
        {monthDays.map((day, index) => renderDay(day, index))}
      </View>
      {showConfirm ? (
        <Pressable
          style={[
            styles.confirmButton,
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
          {isTextLike(confirmText)
            ? (
              <Text
                style={[
                  {
                    textAlign: 'center',
                    color: tokens.colors.confirmText,
                    fontWeight: tokens.typography.confirmTextWeight as any,
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

function reorderWeekdays(labels: React.ReactNode[], start: number) {
  const normalizedStart = ((start % 7) + 7) % 7
  const source = labels.length === 7 ? [...labels] : defaultWeekDays
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekLabelItem: {
    width: `${100 / 7}%`,
    alignItems: 'center',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: `${100 / 7}%`,
    alignItems: 'center',
  },
  day: {
    textAlign: 'center',
  },
  dayPlaceholder: {
    width: `${100 / 7}%`,
  },
  confirmButton: {
    alignItems: 'center',
  },
})

export default Calendar
