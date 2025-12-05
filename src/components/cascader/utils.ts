import type { CascaderOption, CascaderValue } from "./types"

export const resolveSelectedRows = (
  options: CascaderOption[] = [],
  keys: { textKey: string; valueKey: string; childrenKey: string },
  value: CascaderValue[],
): CascaderOption[] => {
  const selected: CascaderOption[] = []
  let current: CascaderOption[] | undefined = options
  value.forEach(val => {
    if (!current || !current.length) return
    const match = current.find(option => option[keys.valueKey] === val)
    if (match) {
      selected.push(match)
      current = (match[keys.childrenKey] as CascaderOption[] | undefined) ?? []
    }
  })
  return selected
}
