import React, { useCallback, useMemo } from 'react'

import Picker from '../picker'
import type { PickerOption, PickerValue } from '../picker/types'
import type { AreaProps, AreaOption } from './types'

const compareCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

const sortEntries = (records?: Record<string, string>) => {
  if (!records) return []
  return Object.entries(records).sort(([a], [b]) => compareCode(a, b))
}

const getProvinceCode = (code: string) => code.slice(0, 2)
const getCityCode = (code: string) => code.slice(0, 4)

const buildAreaColumns = (areaList: { province_list?: Record<string, string>; city_list?: Record<string, string>; county_list?: Record<string, string> }, columnsNum: 1 | 2 | 3 = 3): AreaOption[] => {
  const provinces = sortEntries(areaList.province_list)

  if (columnsNum === 1) {
    return provinces.map(([code, name]) => ({ label: name, value: code }))
  }

  const citiesByProvince = new Map<string, AreaOption[]>()
  sortEntries(areaList.city_list).forEach(([code, name]) => {
    const provinceKey = getProvinceCode(code)
    const option: AreaOption = { label: name, value: code }
    const existing = citiesByProvince.get(provinceKey)
    if (existing) {
      existing.push(option)
    } else {
      citiesByProvince.set(provinceKey, [option])
    }
  })

  if (columnsNum === 3) {
    const countiesByCity = new Map<string, AreaOption[]>()
    sortEntries(areaList.county_list).forEach(([code, name]) => {
      const cityKey = getCityCode(code)
      const option: AreaOption = { label: name, value: code }
      const existing = countiesByCity.get(cityKey)
      if (existing) {
        existing.push(option)
      } else {
        countiesByCity.set(cityKey, [option])
      }
    })

    citiesByProvince.forEach(cityOptions => {
      cityOptions.forEach(cityOption => {
        const cityKey = getCityCode(cityOption.value)
        const counties = countiesByCity.get(cityKey)
        if (counties && counties.length) {
          cityOption.children = counties
        }
      })
    })
  }

  return provinces.map(([code, name]) => {
    const provinceOption: AreaOption = { label: name, value: code }
    const provinceKey = getProvinceCode(code)
    const cities = citiesByProvince.get(provinceKey)
    if (cities && cities.length) {
      provinceOption.children = cities
    }
    return provinceOption
  })
}

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
