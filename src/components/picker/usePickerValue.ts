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

  const [innerValue, setInnerValue] = React.useState<PickerValue[]>(() =>
    toArrayValue(valueProp ?? defaultValue ?? []),
  )

  const mergedValue = React.useMemo(
    () => (isControlled ? toArrayValue(valueProp) : innerValue),
    [innerValue, isControlled, valueProp],
  )

  const normalized = React.useMemo(
    () => normalizePicker(preparedColumns, mergedValue),
    [preparedColumns, mergedValue],
  )

  const didInitRef = React.useRef(false)

  React.useEffect(() => {
    if (!isControlled) return
    const next = toArrayValue(valueProp)
    if (!shallowEqualArray(innerValue, next)) {
      setInnerValue(next)
    }
  }, [innerValue, isControlled, valueProp])

  React.useEffect(() => {
    if (isControlled) return

    if (!didInitRef.current) {
      didInitRef.current = true
      if (!shallowEqualArray(innerValue, normalized.values)) {
        setInnerValue(normalized.values)
      }
      return
    }

    if (!shallowEqualArray(mergedValue, normalized.values)) {
      setInnerValue(normalized.values)
      onChange?.(normalized.values, normalized.options)
      if (emitConfirmOnAutoSelect) {
        onConfirm?.(normalized.values, normalized.options)
      }
    }
  }, [
    emitConfirmOnAutoSelect,
    innerValue,
    isControlled,
    mergedValue,
    normalized.options,
    normalized.values,
    onChange,
    onConfirm,
  ])

  const handleSelect = React.useCallback(
    (option: PickerOption, columnIndex: number) => {
      const base = [...mergedValue]
      base[columnIndex] = option.value

      const next = normalizePicker(preparedColumns, base)

      if (!isControlled) {
        setInnerValue(next.values)
      }
      if (!shallowEqualArray(normalized.values, next.values)) {
        onChange?.(next.values, next.options)
      }
    },
    [mergedValue, preparedColumns, isControlled, normalized.values, onChange],
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
