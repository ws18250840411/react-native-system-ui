import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { useCalendarTokens } from "./tokens"
import type { CalendarProps } from "./types"
import { useControllableValue } from "../../hooks"

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const clampDate = (date: Date, min: Date, max: Date) => {
  if (date.getTime() < min.getTime()) return new Date(min)
  if (date.getTime() > max.getTime()) return new Date(max)
  return date
}

const toArrayValue = (value?: Date | Date[] | null): Date[] => {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean).map(date => new Date(date)) : [new Date(value)]
}

const DEFAULT_MIN = new Date(new Date().getFullYear() - 10, 0, 1)
const DEFAULT_MAX = new Date(new Date().getFullYear() + 10, 11, 31)

const weekDays = ["日", "一", "二", "三", "四", "五", "六"]

const Calendar: React.FC<CalendarProps> = props => {
  const tokens = useCalendarTokens()
  const {
    minDate = DEFAULT_MIN,
    maxDate = DEFAULT_MAX,
    type = "single",
    title = "选择日期",
    showHeader = true,
    showConfirm = type !== "single",
    confirmText = "确定",
    weekStartsOn = 0,
    color,
    onConfirm,
    onSelect,
    style,
    ...rest
  } = props

  const controllableSelection: {
    value?: Date[]
    defaultValue?: Date[]
    onChange: (value?: Date[]) => void
  } = {
    onChange: value => {
      const normalized = normalizeValue(value ?? [], type)
      onSelect?.(mapValue(normalized, type))
    },
  }

  if (Object.prototype.hasOwnProperty.call(props, "value")) {
    controllableSelection.value = toArrayValue(props.value)
  }

  if (Object.prototype.hasOwnProperty.call(props, "defaultValue")) {
    controllableSelection.defaultValue = toArrayValue(props.defaultValue)
  }

  const [selected, setSelected] = useControllableValue<Date[]>(controllableSelection, { defaultValue: [] as Date[] })

  const value = selected ?? []

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    if (value.length) return new Date(value[0])
    return new Date()
  })

  const monthDays = React.useMemo(() => buildMonth(currentMonth, weekStartsOn, minDate, maxDate), [currentMonth, weekStartsOn, minDate, maxDate])

  const handleSelectDay = (day: Date) => {
    if (day.getTime() < minDate.getTime() || day.getTime() > maxDate.getTime()) {
      return
    }

    let next: Date[] = []
    const normalized = value.map(item => new Date(item))
    switch (type) {
      case "single": {
        next = [day]
        break
      }
      case "multiple": {
        const exists = normalized.find(item => isSameDay(item, day))
        next = exists ? normalized.filter(item => !isSameDay(item, day)) : [...normalized, day]
        break
      }
      case "range": {
        if (normalized.length < 1 || normalized.length > 1) {
          next = [day]
        } else {
          const first = normalized[0]
          if (isSameDay(first, day)) {
            next = [day]
          } else {
            next = [first, day].sort((a, b) => a.getTime() - b.getTime())
          }
        }
        break
      }
      default:
        next = [day]
    }
    setSelected(next)
  }

  const selectedMap = value.map(item => item.getTime())

  const renderDay = (day: Date | null, index: number) => {
    if (!day) {
      return <View key={`placeholder-${index}`} style={styles.dayPlaceholder} />
    }
    const isDisabled = day.getTime() < minDate.getTime() || day.getTime() > maxDate.getTime()
    const isSelected = selectedMap.some(time => isSameDay(new Date(time), day))
    const inRange = type === "range" && value.length === 2 && day > value[0] && day < value[1]

    const dayStyle = [
      styles.day,
      {
        borderRadius: tokens.radii.day,
        color: tokens.colors.text,
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
        style={styles.dayButton}
        disabled={isDisabled}
        onPress={() => handleSelectDay(day)}
        testID={getCalendarDayTestId(day)}
      >
        <Text style={dayStyle}>{day.getDate()}</Text>
      </Pressable>
    )
  }

  const handleConfirm = () => {
    onConfirm?.(mapValue(value, type))
  }

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.background }, style]} {...rest}>
      {showHeader ? (
        <View style={styles.header}>
          <Pressable onPress={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
            <Text style={styles.navButton}>{"<"}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{formatMonth(currentMonth)}</Text>
          <Pressable onPress={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
            <Text style={styles.navButton}>{">"}</Text>
          </Pressable>
        </View>
      ) : null}
      <View style={styles.weekRow}>
        {reorderWeekdays(weekStartsOn).map(label => (
          <Text key={label} style={[styles.weekLabel, { color: tokens.colors.text }]}>
            {label}
          </Text>
        ))}
      </View>
      <View style={[styles.days, { rowGap: tokens.spacing.row, columnGap: tokens.spacing.column }]}>
        {monthDays.map((day, index) => renderDay(day, index))}
      </View>
      {showConfirm ? (
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>{confirmText}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const mapValue = (value: Date[], type: CalendarType): Date | Date[] => {
  if (type === "single") {
    return value[0] ?? new Date()
  }
  if (type === "range" && value.length === 2) {
    return value
  }
  return value
}

const normalizeValue = (value: Date[], type: CalendarType) => {
  if (type === "single") {
    return value.slice(0, 1)
  }
  if (type === "range") {
    return value.slice(0, 2)
  }
  return value
}

const formatMonth = (date: Date) => `${date.getFullYear()}年${date.getMonth() + 1}月`

const reorderWeekdays = (start: 0 | 1) => {
  if (start === 1) {
    return [...weekDays.slice(1), weekDays[0]]
  }
  return weekDays
}

const buildMonth = (month: Date, weekStartsOn: 0 | 1, minDate: Date, maxDate: Date): (Date | null)[] => {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const startOffset = (firstDay.getDay() - weekStartsOn + 7) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = []

  for (let i = 0; i < startOffset; i += 1) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), day)
    cells.push(clampDate(date, minDate, maxDate))
  }
  while (cells.length < 42) {
    cells.push(null)
  }
  return cells
}

const getCalendarDayTestId = (day: Date) =>
  `calendar-day-${day.getFullYear()}-${`${day.getMonth() + 1}`.padStart(2, "0")}-${`${day.getDate()}`.padStart(2, "0")}`

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  navButton: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekLabel: {
    width: `${100 / 7}%`,
    textAlign: "center",
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayButton: {
    width: `${100 / 7}%`,
    paddingVertical: 6,
    alignItems: "center",
  },
  day: {
    textAlign: "center",
    minWidth: 32,
  },
  dayPlaceholder: {
    width: `${100 / 7}%`,
    paddingVertical: 6,
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: "#1989fa",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
})

export default Calendar
