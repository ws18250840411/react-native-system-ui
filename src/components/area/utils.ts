import type { AreaList, AreaOption } from './types'

const sortEntries = (records?: Record<string, string>) => {
  if (!records) return []
  return Object.entries(records).sort(([a], [b]) => a.localeCompare(b))
}

const getProvinceCode = (code: string) => code.slice(0, 2)
const getCityCode = (code: string) => code.slice(0, 4)

export const buildAreaColumns = (areaList: AreaList, columnsNum: 1 | 2 | 3 = 3): AreaOption[] => {
  const provinces = sortEntries(areaList.province_list)

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

  const countyByCity = new Map<string, AreaOption[]>()
  sortEntries(areaList.county_list).forEach(([code, name]) => {
    const cityKey = getCityCode(code)
    const option: AreaOption = { label: name, value: code }
    const existing = countyByCity.get(cityKey)
    if (existing) {
      existing.push(option)
    } else {
      countyByCity.set(cityKey, [option])
    }
  })

  return provinces.map(([code, name]) => {
    const provinceOption: AreaOption = { label: name, value: code }
    if (columnsNum > 1) {
      const provinceKey = getProvinceCode(code)
      const cityOptions = citiesByProvince.get(provinceKey)?.map(city => ({ ...city })) ?? []
      provinceOption.children = cityOptions
      if (columnsNum > 2) {
        provinceOption.children = cityOptions.map(cityOption => {
          const cityKey = getCityCode(cityOption.value)
          const counties = countyByCity.get(cityKey)?.map(county => ({ ...county })) ?? []
          return counties.length ? { ...cityOption, children: counties } : cityOption
        })
      }
    }
    return provinceOption
  })
}
