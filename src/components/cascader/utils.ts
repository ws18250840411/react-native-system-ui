import type { CascaderOption, CascaderValue } from "./types"

interface FieldKeys {
  textKey: string
  valueKey: string
  childrenKey: string
}

export const resolveSelectedRows = (
  options: CascaderOption[] = [],
  keys: FieldKeys,
  value: CascaderValue[],
): CascaderOption[] => {
  const selected: CascaderOption[] = []
  let current: CascaderOption[] | undefined = options

  value.forEach(val => {
    if (!current) {
      return
    }
    const match = current.find(option => option[keys.valueKey] === val)
    if (match) {
      selected.push(match)
      current = (match[keys.childrenKey] as CascaderOption[]) ?? []
    } else {
      current = undefined
    }
  })

  return selected
}
