import React from 'react'

import Picker from '../picker'
import type { PickerOption } from '../picker/types'
import type { AreaProps, AreaOption } from './types'
import { buildAreaColumns } from './utils'

const noop = () => {}

const Area: React.FC<AreaProps> = props => {
  const {
    areaList,
    columnsNum = 3,
    value,
    defaultValue,
    onChange,
    onConfirm,
    ...pickerProps
  } = props

  const columns = React.useMemo(() => buildAreaColumns(areaList, columnsNum), [areaList, columnsNum])

  const handleChange = React.useCallback(
    (values: (string | number)[], options: PickerOption[]) => {
      onChange?.(values.map(String), options as AreaOption[])
    },
    [onChange]
  )

  const handleConfirm = React.useCallback(
    (values: (string | number)[], options: PickerOption[]) => {
      onConfirm?.(values.map(String), options as AreaOption[])
    },
    [onConfirm]
  )

  const pickerValueProps = React.useMemo(() => {
    const next: Record<string, any> = {}
    if (value !== undefined) {
      next.value = value
    }
    if (defaultValue !== undefined) {
      next.defaultValue = defaultValue
    }
    return next
  }, [defaultValue, value])

  return (
    <Picker
      {...pickerValueProps}
      {...pickerProps}
      columns={columns}
      onChange={handleChange}
      onConfirm={onConfirm ? handleConfirm : undefined}
    />
  )
}

Area.displayName = 'Area'

export default Area
