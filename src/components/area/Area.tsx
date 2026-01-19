import React from 'react'

import Picker from '../picker'
import type { PickerOption, PickerValue } from '../picker/types'
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

  const resolvedColumnsNum = columnsNum === 1 || columnsNum === 2 || columnsNum === 3 ? columnsNum : 3
  const { province_list, city_list, county_list } = areaList
  const columns = React.useMemo(
    () => buildAreaColumns({ province_list, city_list, county_list }, resolvedColumnsNum),
    [province_list, city_list, county_list, resolvedColumnsNum]
  )

  const handleChange = React.useCallback(
    (values: PickerValue[], options: (PickerOption | undefined)[]) => {
      onChange?.(values.map(String), options as (AreaOption | undefined)[])
    },
    [onChange]
  )

  const handleConfirm = React.useCallback(
    (values: PickerValue[], options: (PickerOption | undefined)[]) => {
      onConfirm?.(values.map(String), options as (AreaOption | undefined)[])
    },
    [onConfirm]
  )

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange ? handleChange : undefined}
      onConfirm={onConfirm ? handleConfirm : undefined}
    />
  )
}

Area.displayName = 'Area'

export default Area
