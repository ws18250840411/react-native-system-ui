import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, View, type ViewStyle } from 'react-native'
import { withAlpha } from '../../utils/color'
import { isFiniteNumber } from '../../utils/validate'
import { shallowEqualArray } from '../../utils'
import type { PickerOption, PickerProps, PickerValue, PickerColumns } from '../../components/picker/types'
import { normalizePicker, prepareColumns, toArrayValue } from './normalize'

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_STEPS = [0.95, 0.75, 0.55, 0.35]
const GRADIENT_STEPS_REVERSED = [0.35, 0.55, 0.75, 0.95]

export function usePickerValue({ columns, valueProp, defaultValue, emitConfirmOnAutoSelect = true, onChange, onConfirm }: { columns?: PickerColumns; valueProp?: PickerProps['value']; defaultValue?: PickerProps['defaultValue']; emitConfirmOnAutoSelect?: boolean; onChange?: PickerProps['onChange']; onConfirm?: PickerProps['onConfirm'] }) {
  const prep = useMemo(() => prepareColumns(columns), [columns]); const isControlled = valueProp !== undefined; const onChangeRef = useRef(onChange); const onConfirmRef = useRef(onConfirm); onChangeRef.current = onChange; onConfirmRef.current = onConfirm; const [innerValue, setInnerValue] = useState(() => normalizePicker(prep, toArrayValue(valueProp ?? defaultValue)).values); const innerValueRef = useRef(innerValue); innerValueRef.current = innerValue; const commitValue = useCallback((next: PickerValue[]) => { innerValueRef.current = next; setInnerValue(next) }, []); useEffect(() => { if (!isControlled) return; const next = toArrayValue(valueProp); if (!shallowEqualArray(innerValueRef.current, next)) commitValue(next) }, [commitValue, isControlled, valueProp]); const norm = useMemo(() => normalizePicker(prep, innerValue), [prep, innerValue]); useEffect(() => { if (isControlled) return; if (!shallowEqualArray(innerValue, norm.values)) { commitValue(norm.values); onChangeRef.current?.(norm.values, norm.options); if (emitConfirmOnAutoSelect) onConfirmRef.current?.(norm.values, norm.options) } }, [commitValue, emitConfirmOnAutoSelect, innerValue, isControlled, norm]); const handleSelect = useCallback((option: PickerOption, colIdx: number) => { const next = [...innerValueRef.current]; next[colIdx] = option.value; if (prep.type === 'cascade') next.length = colIdx + 1; const final = normalizePicker(prep, next); if (shallowEqualArray(innerValueRef.current, final.values)) return; commitValue(final.values); onChangeRef.current?.(final.values, final.options) }, [commitValue, prep]); const handleConfirm = useCallback(() => { onConfirmRef.current?.(norm.values, norm.options) }, [norm]); return { preparedColumns: prep, normalized: norm, handleSelect, handleConfirm }
}

export const getVisibleCount = (count: number) => { const n = isFiniteNumber(count) ? Math.max(3, Math.floor(count)) : 5; return n % 2 === 0 ? n + 1 : n }

export const GradientMask: React.FC<{ height: number; color: string; position: 'top' | 'bottom'; maskType: NonNullable<PickerProps['maskType']> }> = ({ height, color, position, maskType }) => {
  const edgeStyle: ViewStyle = position === 'top' ? { top: 0 } : { bottom: 0 }
  const baseStyle: ViewStyle[] = [{ position: 'absolute', left: 0, right: 0, zIndex: 2 }, { height }, edgeStyle]
  const overlayColor = withAlpha(color, GRADIENT_OVERLAY_ALPHA)
  if (maskType === 'solid') return <View pointerEvents="none" style={[...baseStyle, { backgroundColor: withAlpha(color, 0.9) }]} />
  if (Platform.OS === 'web') { const angle = position === 'top' ? '180deg' : '0deg'; return <View pointerEvents="none" style={[...baseStyle, ({ backgroundColor: overlayColor, backgroundImage: `linear-gradient(${angle}, ${withAlpha(color, 0.98)}, ${withAlpha(color, 0.4)})` } as unknown as ViewStyle)]} /> }
  return (<View pointerEvents="none" style={[...baseStyle, { backgroundColor: overlayColor }]}>{(position === 'top' ? GRADIENT_STEPS : GRADIENT_STEPS_REVERSED).map((opacity, idx) => <View key={idx} style={{ flex: 1, backgroundColor: withAlpha(color, opacity) }} />)}</View>)
}
