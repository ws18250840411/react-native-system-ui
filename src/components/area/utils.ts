import type { AreaList, AreaOption } from './types'

const compareCode = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

const sortEntries = (records?: Record<string, string>) => {
  if (!records) return []
  return Object.entries(records).sort(([a], [b]) => compareCode(a, b))
}

const getProvinceCode = (code: string) => code.slice(0, 2)
const getCityCode = (code: string) => code.slice(0, 4)

export const buildAreaColumns = (areaList: AreaList, columnsNum: 1 | 2 | 3 = 3): AreaOption[] => {
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
