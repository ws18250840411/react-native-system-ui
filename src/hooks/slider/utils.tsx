import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { GestureResponderEvent, LayoutChangeEvent } from 'react-native'
import { Platform, Pressable, View } from 'react-native'
import { clamp } from '../../utils'
import { isFiniteNumber, isFunction } from '../../utils/validate'
import type { SliderProps, SliderValue } from '../../components/slider/types'

export type TrackLayout = { width: number; height: number; x: number; y: number }
export type PressableLikeEvent = GestureResponderEvent & { preventDefault?: () => void }
export type HandlerBag = Record<string, unknown> & Partial<React.ComponentProps<typeof View>>

export const START_KEYS = ['onResponderGrant', 'onPanResponderGrant'] as const
export const MOVE_KEYS = ['onResponderMove', 'onPanResponderMove'] as const
export const END_KEYS = ['onResponderRelease', 'onResponderTerminate', 'onPanResponderRelease', 'onPanResponderTerminate'] as const

const isSameLayout = (a: TrackLayout, b: TrackLayout) => a.width === b.width && a.height === b.height && a.x === b.x && a.y === b.y

export const normalizeValue = (value: SliderValue | undefined, range: boolean, min: number, max: number): number[] => range ? (() => { const raw = Array.isArray(value) ? value : isFiniteNumber(value) ? [min, value] : [min, min]; const first = isFiniteNumber(raw[0]) ? clamp(raw[0], min, max) : min; const second = isFiniteNumber(raw[1] ?? raw[0]) ? clamp(raw[1] ?? raw[0], min, max) : min; return first <= second ? [first, second] : [second, first] })() : (() => { const single = Array.isArray(value) ? value[0] : value; return [isFiniteNumber(single) ? clamp(single, min, max) : min] })()
export const toSliderValue = (values: readonly number[], range: boolean, fallback: number): SliderValue => range ? [values[0] ?? fallback, values[1] ?? (values[0] ?? fallback)] : (values[0] ?? fallback)
export const createAccessibilityProps = (inputProps?: { role?: string; ['aria-value']?: unknown; accessibilityActions?: unknown; onAccessibilityAction?: unknown; disabled?: boolean } | null) => !inputProps ? {} : (() => { const { role, ['aria-value']: ariaValue, accessibilityActions, onAccessibilityAction, disabled } = inputProps; return { accessible: true, accessibilityRole: role ?? 'adjustable', accessibilityValue: ariaValue, accessibilityActions, onAccessibilityAction, accessibilityState: { disabled } } })()
export const defaultNumberFormatter = typeof Intl !== 'undefined' && isFunction(Intl.NumberFormat) ? new Intl.NumberFormat() : ({ format: (val: number) => String(val) } as unknown as Intl.NumberFormat)
export const mapSliderTouchDirection = (props: Pick<SliderProps, 'vertical' | 'reverse'>) => props.vertical ? props.reverse : (props.reverse || false)

export const useTrackLayout = () => {
  const trackRef = useRef<React.ElementRef<typeof Pressable> | null>(null), measureRafRef = useRef<number | null>(null), [trackLayout, setTrackLayout] = useState<TrackLayout>({ width: 0, height: 0, x: 0, y: 0 })
  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => { const { layout } = event.nativeEvent; const next = { width: Math.max(layout.width, 1), height: Math.max(layout.height, 1), x: layout.x ?? 0, y: layout.y ?? 0 }; setTrackLayout(prev => (isSameLayout(prev, next) ? prev : next)); if (Platform.OS !== 'web' || typeof requestAnimationFrame === 'undefined') return; if (measureRafRef.current != null) return; measureRafRef.current = requestAnimationFrame(() => { measureRafRef.current = null; const node = trackRef.current as unknown as { measureInWindow?: (cb: (x: number, y: number, width: number, height: number) => void) => void } | null; if (!node?.measureInWindow) return; node.measureInWindow((x, y, width, height) => { const measured = { width: Math.max(width, 1), height: Math.max(height, 1), x, y }; setTrackLayout(prev => (isSameLayout(prev, measured) ? prev : measured)) }) }) }, [])
  useEffect(() => { return () => { if (measureRafRef.current != null && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(measureRafRef.current); measureRafRef.current = null } }, [])
  return { trackRef, trackLayout, handleTrackLayout }
}
