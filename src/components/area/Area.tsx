import React from 'react'

import Picker from '../picker'
import type { AreaProps, AreaOption } from './types'
import { buildAreaColumns } from './utils'

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

  const columns = buildAreaColumns(areaList, columnsNum)
  const handleChange = (values: (string | number)[], options: any[]) =>
    onChange?.(values.map(String), options as (AreaOption | undefined)[])
  const handleConfirm = onConfirm
    ? (values: (string | number)[], options: any[]) => onConfirm(values.map(String), options as (AreaOption | undefined)[])
    : undefined

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onConfirm={handleConfirm}
    />
  )
}

Area.displayName = 'Area'

export default Area
