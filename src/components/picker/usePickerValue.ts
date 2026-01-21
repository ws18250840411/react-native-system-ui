import React from 'react'

import type { PickerColumns, PickerOption, PickerProps, PickerValue } from './types'
import { normalizePicker, prepareColumns, shallowEqualArray, toArrayValue } from './utils'

interface UsePickerValueParams {
  columns?: PickerColumns
  valueProp?: PickerProps['value']
  defaultValue?: PickerProps['defaultValue']
  emitConfirmOnAutoSelect?: boolean
  onChange?: PickerProps['onChange']
  onConfirm?: PickerProps['onConfirm']
}

export const usePickerValue = ({
  columns,
  valueProp,
  defaultValue,
  emitConfirmOnAutoSelect = true,
  onChange,
  onConfirm,
}: UsePickerValueParams) => {
  const preparedColumns = React.useMemo(() => prepareColumns(columns), [columns])
  const isControlled = valueProp !== undefined

  const [innerValue, setInnerValue] = React.useState<PickerValue[]>(() => {
    const initial = toArrayValue(valueProp ?? defaultValue ?? [])
    return normalizePicker(preparedColumns, initial).values
  })
  const innerValueRef = React.useRef(innerValue)

  const commitValue = React.useCallback((next: PickerValue[]) => {
    innerValueRef.current = next
    setInnerValue(next)
  }, [])

  React.useEffect(() => {
    if (!isControlled) return
    const next = toArrayValue(valueProp)
    if (!shallowEqualArray(innerValue, next)) {
      commitValue(next)
    }
  }, [commitValue, innerValue, isControlled, valueProp])

  const normalized = React.useMemo(
    () => normalizePicker(preparedColumns, innerValue),
    [preparedColumns, innerValue],
  )

  React.useEffect(() => {
    if (isControlled) return
    if (!shallowEqualArray(innerValue, normalized.values)) {
      commitValue(normalized.values)
      onChange?.(normalized.values, normalized.options)
      if (emitConfirmOnAutoSelect) {
        onConfirm?.(normalized.values, normalized.options)
      }
    }
  }, [
    commitValue,
    emitConfirmOnAutoSelect,
    innerValue,
    isControlled,
    normalized.options,
    normalized.values,
    onChange,
    onConfirm,
  ])

  const handleSelect = React.useCallback(
    (option: PickerOption, columnIndex: number) => {
      const next = [...innerValueRef.current]
      next[columnIndex] = option.value

      if (preparedColumns.type === 'cascade') {
        next.length = columnIndex + 1
      }

      const final = normalizePicker(preparedColumns, next)
      if (shallowEqualArray(innerValueRef.current, final.values)) return
      commitValue(final.values)
      onChange?.(final.values, final.options)
    },
    [commitValue, onChange, preparedColumns],
  )

  const handleConfirm = React.useCallback(() => {
    onConfirm?.(normalized.values, normalized.options)
  }, [normalized.options, normalized.values, onConfirm])

  return {
    normalized,
    handleSelect,
    handleConfirm,
  }
}
