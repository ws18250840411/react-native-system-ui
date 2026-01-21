import type { GestureResponderEvent } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import { clamp, isFiniteNumber, isFunction } from '../../utils'
import type { SliderValue } from './types'

export type TrackLayout = { width: number; height: number; x: number; y: number }

export const clampValue = (value: number | undefined, min: number, max: number) => {
  if (!isFiniteNumber(value)) {
    return min
  }
  return clamp(value, min, max)
}

export const isSameLayout = (a: TrackLayout, b: TrackLayout) =>
  a.width === b.width && a.height === b.height && a.x === b.x && a.y === b.y

export const normalizeValue = (
  value: SliderValue | undefined,
  range: boolean,
  min: number,
  max: number
): number[] => {
  if (range) {
    const raw = Array.isArray(value)
      ? value
      : isFiniteNumber(value)
        ? [min, value]
        : [min, min]

    const first = clampValue(raw[0], min, max)
    const second = clampValue(raw[1] ?? raw[0], min, max)
    return first <= second ? [first, second] : [second, first]
  }

  const single = Array.isArray(value) ? value[0] : value
  return [clampValue(single, min, max)]
}

export const toSliderValue = (values: readonly number[], range: boolean, fallback: number): SliderValue => {
  if (range) {
    const start = values[0] ?? fallback
    const end = values[1] ?? start
    return [start, end]
  }
  return values[0] ?? fallback
}

export const createAccessibilityProps = (
  inputProps?: {
    role?: string
    ['aria-value']?: unknown
    accessibilityActions?: unknown
    onAccessibilityAction?: unknown
    disabled?: boolean
  } | null
) => {
  if (!inputProps) return {}
  const {
    role,
    ['aria-value']: ariaValue,
    accessibilityActions,
    onAccessibilityAction,
    disabled,
  } = inputProps

  return {
    accessible: true,
    accessibilityRole: role ?? 'adjustable',
    accessibilityValue: ariaValue,
    accessibilityActions,
    onAccessibilityAction,
    accessibilityState: { disabled },
  }
}

export const defaultNumberFormatter =
  typeof Intl !== 'undefined' && isFunction(Intl.NumberFormat)
    ? new Intl.NumberFormat()
    : ({ format: (val: number) => String(val) } as unknown as Intl.NumberFormat)

export type PressableLikeEvent = GestureResponderEvent & { preventDefault?: () => void }

export type HandlerBag = Record<string, unknown> & Partial<React.ComponentProps<typeof View>>
