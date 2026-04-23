import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, View, type ViewStyle } from 'react-native'
import { withAlpha } from '../../utils/color'
import { shallowEqualArray, isFiniteNumber, isObject } from '../../utils/base'
import type { PickerColumn, PickerColumns, PickerOption, PickerProps, PickerValue } from './types'

export interface NormalizedPickerResult {
  columns: PickerOption[][]
  values: PickerValue[]
  options: (PickerOption | undefined)[]
}

export interface PreparedPickerColumns {
  type: 'single' | 'multiple' | 'cascade'
  columnsList: PickerOption[][]
  defaults: (PickerValue | undefined)[]
  cascadeRoot?: PickerOption[]
}

export const toArrayValue = (value?: PickerValue[] | PickerValue | null): PickerValue[] =>
  Array.isArray(value) ? value.filter(v => v !== undefined && v !== null) as PickerValue[] : value == null ? [] : [value]

const isColumnWithOptions = (col: PickerColumn | PickerOption): col is { options: PickerOption[]; defaultValue?: PickerValue } =>
  !!col && isObject(col) && 'options' in col && Array.isArray((col as { options?: unknown }).options)

const hasChildren = (option: PickerOption) =>
  !!option && isObject(option) && Array.isArray((option as { children?: unknown }).children) && (option as { children?: unknown[] }).children!.length > 0

export const findEnabledIndex = (options: PickerOption[], startIdx: number) => {
  if (!options.length) return -1
  const clampIdx = Math.min(Math.max(startIdx, 0), options.length - 1)
  if (!options[clampIdx]?.disabled) return clampIdx
  for (let i = clampIdx + 1; i < options.length; i += 1) if (!options[i]?.disabled) return i
  for (let i = clampIdx - 1; i >= 0; i -= 1) if (!options[i]?.disabled) return i
  return -1
}

const normalizeMultiple = (cols: PickerOption[][], defs: (PickerValue | undefined)[], raw: PickerValue[]): NormalizedPickerResult => {
  const vals: PickerValue[] = []
  const opts: (PickerOption | undefined)[] = []

  cols.forEach((colOptions, idx) => {
    const current = raw[idx]
    const currentIndex = colOptions.findIndex(item => item.value === current)
    const valid = currentIndex >= 0 && !colOptions[currentIndex]?.disabled
    const startIndex = valid ? currentIndex : defs[idx] !== undefined ? colOptions.findIndex(item => item.value === defs[idx]) : -1
    const targetIndex = findEnabledIndex(colOptions, startIndex >= 0 ? startIndex : 0)
    const target = targetIndex >= 0 ? colOptions[targetIndex] : undefined

    vals[idx] = (valid ? current : (target?.value ?? defs[idx] ?? colOptions[0]?.value)) as PickerValue
    opts[idx] = target
  })

  return { columns: cols, values: vals, options: opts }
}

const normalizeCascade = (root: PickerOption[], raw: PickerValue[]): NormalizedPickerResult => {
  const cols: PickerOption[][] = []
  const vals: PickerValue[] = []
  const opts: (PickerOption | undefined)[] = []
  let current: PickerOption[] | undefined = root
  let depth = 0
  const visited = new Set<PickerOption[]>()

  while (current && current.length) {
    if (visited.has(current)) break
    visited.add(current)
    cols.push(current)
    const currentValue = raw[depth]
    const startIndex = current.findIndex(item => item.value === currentValue || String(item.value) === String(currentValue))
    const targetIndex = findEnabledIndex(current, startIndex >= 0 ? startIndex : 0)
    const target: PickerOption | undefined = targetIndex >= 0 ? current[targetIndex] : current[0]
    vals[depth] = target?.value as PickerValue
    opts[depth] = target
    if (target && hasChildren(target)) {
      current = target.children
      depth += 1
    } else {
      break
    }
  }

  return { columns: cols, values: vals, options: opts }
}

export const prepareColumns = (input: PickerColumns = []): PreparedPickerColumns => {
  if (!Array.isArray(input) || input.length === 0) return { type: 'single', columnsList: [], defaults: [], cascadeRoot: [] }
  const everyPlain = input.every(item => !Array.isArray(item) && !isColumnWithOptions(item as unknown as PickerColumn | PickerOption))
  const cascade = everyPlain && input.some(item => hasChildren(item as PickerOption))
  if (cascade) return { type: 'cascade', columnsList: [], defaults: [], cascadeRoot: input as PickerOption[] }
  const cols: PickerOption[][] = []
  const defs: (PickerValue | undefined)[] = []

  if (everyPlain) {
    cols.push(input as PickerOption[])
    defs.push(undefined)
  } else {
    ;(input as unknown[]).forEach(col => {
      if (Array.isArray(col)) {
        cols.push(col as PickerOption[])
        defs.push(undefined)
      } else if (isColumnWithOptions(col as unknown as PickerColumn | PickerOption)) {
        const column = col as { options?: PickerOption[]; defaultValue?: PickerValue }
        cols.push(column.options ?? [])
        defs.push(column.defaultValue)
      }
    })
  }

  return { type: 'multiple', columnsList: cols, defaults: defs }
}

export const normalizePicker = (prepared: PreparedPickerColumns, raw: PickerValue[] = []): NormalizedPickerResult => {
  const rawValue = Array.isArray(raw) ? raw : []
  return prepared.type === 'cascade' && prepared.cascadeRoot?.length
    ? normalizeCascade(prepared.cascadeRoot, rawValue)
    : normalizeMultiple(prepared.columnsList, prepared.defaults, rawValue)
}

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_STEPS = [0.95, 0.75, 0.55, 0.35]
const GRADIENT_STEPS_REVERSED = [0.35, 0.55, 0.75, 0.95]

export function usePickerValue({ columns, valueProp, defaultValue, emitConfirmOnAutoSelect = true, onChange, onConfirm }: { columns?: PickerColumns; valueProp?: PickerProps['value']; defaultValue?: PickerProps['defaultValue']; emitConfirmOnAutoSelect?: boolean; onChange?: PickerProps['onChange']; onConfirm?: PickerProps['onConfirm'] }) {
  const prepared = useMemo(() => prepareColumns(columns), [columns]); const isControlled = valueProp !== undefined; const onChangeRef = useRef(onChange); const onConfirmRef = useRef(onConfirm); onChangeRef.current = onChange; onConfirmRef.current = onConfirm; const [innerValue, setInnerValue] = useState(() => normalizePicker(prepared, toArrayValue(valueProp ?? defaultValue)).values); const innerValueRef = useRef(innerValue); innerValueRef.current = innerValue; const commitValue = useCallback((next: PickerValue[]) => { innerValueRef.current = next; setInnerValue(next) }, [])
  useEffect(() => { if (!isControlled) return; const next = toArrayValue(valueProp); if (!shallowEqualArray(innerValueRef.current, next)) commitValue(next) }, [commitValue, isControlled, valueProp])
  const normalized = useMemo(() => normalizePicker(prepared, innerValue), [prepared, innerValue])
  useEffect(() => { if (isControlled) return; if (!shallowEqualArray(innerValue, normalized.values)) { commitValue(normalized.values); onChangeRef.current?.(normalized.values, normalized.options); if (emitConfirmOnAutoSelect) onConfirmRef.current?.(normalized.values, normalized.options) } }, [commitValue, emitConfirmOnAutoSelect, innerValue, isControlled, normalized])
  const handleSelect = useCallback((option: PickerOption, colIdx: number) => { const next = [...innerValueRef.current]; next[colIdx] = option.value; if (prepared.type === 'cascade') next.length = colIdx + 1; const final = normalizePicker(prepared, next); if (shallowEqualArray(innerValueRef.current, final.values)) return; commitValue(final.values); onChangeRef.current?.(final.values, final.options) }, [commitValue, prepared])
  const handleConfirm = useCallback(() => { onConfirmRef.current?.(normalized.values, normalized.options) }, [normalized])
  return { preparedColumns: prepared, normalized, handleSelect, handleConfirm }
}

export const getVisibleCount = (count: number) => {
  const next = isFiniteNumber(count) ? Math.max(3, Math.floor(count)) : 5
  return next % 2 === 0 ? next + 1 : next
}

export const GradientMask: React.FC<{ height: number; color: string; position: 'top' | 'bottom'; maskType: NonNullable<PickerProps['maskType']> }> = ({ height, color, position, maskType }) => {
  const edgeStyle: ViewStyle = position === 'top' ? { top: 0 } : { bottom: 0 }
  const baseStyle: ViewStyle[] = [{ position: 'absolute', left: 0, right: 0, zIndex: 2 }, { height }, edgeStyle]
  const overlayColor = withAlpha(color, GRADIENT_OVERLAY_ALPHA)
  if (maskType === 'solid') return <View style={[...baseStyle, { backgroundColor: withAlpha(color, 0.9), pointerEvents: 'none' }]} />
  if (Platform.OS === 'web') { const angle = position === 'top' ? '180deg' : '0deg'; return <View style={[...baseStyle, { backgroundColor: overlayColor, backgroundImage: `linear-gradient(${angle}, ${withAlpha(color, 0.98)}, ${withAlpha(color, 0.4)})`, pointerEvents: 'none' } as unknown as ViewStyle]} /> }
  return (<View style={[...baseStyle, { backgroundColor: overlayColor, pointerEvents: 'none' }]}>{(position === 'top' ? GRADIENT_STEPS : GRADIENT_STEPS_REVERSED).map((opacity, idx) => <View key={idx} style={{ flex: 1, backgroundColor: withAlpha(color, opacity) }} />)}</View>)
}
