import React, { useCallback, useMemo } from 'react'

import Picker from '../picker'
import type { PickerOption, PickerValue } from '../picker/types'
import type { AreaProps, AreaOption } from './types'
import { buildAreaColumns } from './utils'

const normalizeCascadeValue = (
  root: PickerOption[],
  raw: AreaProps['value'] | AreaProps['defaultValue'],
  depth: number,
) => {
  if (!raw) return raw
  const input = Array.isArray(raw) ? raw.map(String) : [String(raw)]
  const result: string[] = []
  let options: PickerOption[] | undefined = root
  for (let i = 0; i < depth; i += 1) {
    if (!options?.length) break
    const wanted = input[i]
    const nextOption: PickerOption | undefined = options.find(o => String(o.value) === wanted) ?? options[0]
    if (!nextOption) break
    result.push(String(nextOption.value))
    options = nextOption.children as PickerOption[] | undefined
  }
  return result
}

const Area: React.FC<AreaProps> = props => {
  const {
    areaList,
    columnsNum = 3,
    value,
    defaultValue,
    onChange,
    onConfirm,
    interactionMode = 'sync',
    ...pickerProps
  } = props

  const resolvedColumnsNum = useMemo(
    () => (columnsNum === 1 || columnsNum === 2 || columnsNum === 3 ? columnsNum : 3),
    [columnsNum]
  )
  const { province_list, city_list, county_list } = areaList
  const columns = useMemo(
    () => buildAreaColumns({ province_list, city_list, county_list }, resolvedColumnsNum),
    [city_list, county_list, province_list, resolvedColumnsNum]
  )

  const normalizedValue = useMemo(
    () =>
      value === undefined ? undefined : normalizeCascadeValue(columns as PickerOption[], value, resolvedColumnsNum),
    [columns, resolvedColumnsNum, value]
  )

  const normalizedDefaultValue = useMemo(
    () =>
      defaultValue === undefined
        ? undefined
        : normalizeCascadeValue(columns as PickerOption[], defaultValue, resolvedColumnsNum),
    [columns, defaultValue, resolvedColumnsNum]
  )

  const handleChange = useCallback(
    (values: PickerValue[], options: (PickerOption | undefined)[]) => {
      onChange?.(values.map(String), options as (AreaOption | undefined)[])
    },
    [onChange]
  )

  const handleConfirm = useCallback(
    (values: PickerValue[], options: (PickerOption | undefined)[]) => {
      onConfirm?.(values.map(String), options as (AreaOption | undefined)[])
    },
    [onConfirm]
  )

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      interactionMode={interactionMode}
      value={normalizedValue}
      defaultValue={normalizedDefaultValue}
      onChange={onChange ? handleChange : undefined}
      onConfirm={onConfirm ? handleConfirm : undefined}
    />
  )
}

Area.displayName = 'Area'

export default Area
