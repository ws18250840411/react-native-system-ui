import React, { useCallback, useMemo, useRef } from 'react'

import Picker from '../picker'
import type { PickerOption, PickerValue } from '../picker/types'
import type { AreaProps, AreaOption } from './types'
import { useAreaTokens } from './tokens'

const sortEntries = (records?: Record<string, string>) => {
  if (!records) return []
  return Object.entries(records).sort(([a], [b]) => a.localeCompare(b))
}

const getProvinceCode = (code: string) => code.slice(0, 2)
const getCityCode = (code: string) => code.slice(0, 4)

const groupBy = (list: Record<string, string> | undefined, getKey: (code: string) => string) => {
  const map = new Map<string, AreaOption[]>()
  sortEntries(list).forEach(([code, name]) => {
    const key = getKey(code)
    const arr = map.get(key)
    if (arr) arr.push({ label: name, value: code })
    else map.set(key, [{ label: name, value: code }])
  })
  return map
}

const buildAreaColumns = (areaList: { province_list?: Record<string, string>; city_list?: Record<string, string>; county_list?: Record<string, string> }, columnsNum: 1 | 2 | 3 = 3): AreaOption[] => {
  const provinces = sortEntries(areaList.province_list)

  if (columnsNum === 1) {
    return provinces.map(([code, name]) => ({ label: name, value: code }))
  }

  const citiesByProvince = groupBy(areaList.city_list, getProvinceCode)

  if (columnsNum === 3) {
    const countiesByCity = groupBy(areaList.county_list, getCityCode)

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

const AreaImpl: React.FC<AreaProps> = props => {
  const tokens = useAreaTokens()
  const {
    areaList,
    columnsNum = tokens.defaults.columnsNum,
    value,
    defaultValue,
    onChange,
    onConfirm,
    interactionMode = tokens.defaults.interactionMode,
    ...pickerProps
  } = props

  const resolvedColumnsNum = useMemo(
    () => (columnsNum >= 1 && columnsNum <= 3 ? columnsNum : tokens.defaults.columnsNum),
    [columnsNum]
  )
  const { province_list, city_list, county_list } = areaList
  const columns = useMemo(
    () => buildAreaColumns({ province_list, city_list, county_list }, resolvedColumnsNum),
    [city_list, county_list, province_list, resolvedColumnsNum]
  )

  const normalize = useCallback(
    (val?: string[]) => val === undefined ? undefined : normalizeCascadeValue(columns as PickerOption[], val, resolvedColumnsNum),
    [columns, resolvedColumnsNum]
  )

  const normalizedValue = useMemo(() => normalize(value), [normalize, value])
  const normalizedDefaultValue = useMemo(() => normalize(defaultValue), [normalize, defaultValue])

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const onConfirmRef = useRef(onConfirm)
  onConfirmRef.current = onConfirm

  const wrappedOnChange = useCallback(
    (values: PickerValue[], options: (PickerOption | undefined)[]) => {
      onChangeRef.current?.(values.map(String), options as (AreaOption | undefined)[])
    },
    []
  )
  const wrappedOnConfirm = useCallback(
    (values: PickerValue[], options: (PickerOption | undefined)[]) => {
      onConfirmRef.current?.(values.map(String), options as (AreaOption | undefined)[])
    },
    []
  )

  return (
    <Picker
      {...pickerProps}
      columns={columns}
      interactionMode={interactionMode}
      value={normalizedValue}
      defaultValue={normalizedDefaultValue}
      onChange={onChange ? wrappedOnChange : undefined}
      onConfirm={onConfirm ? wrappedOnConfirm : undefined}
    />
  )
}

const Area = React.memo(AreaImpl)
Area.displayName = 'Area'

export default Area
