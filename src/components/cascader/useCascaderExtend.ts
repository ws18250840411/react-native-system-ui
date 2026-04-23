import type { CascaderOption, CascaderValue } from './types'

interface FieldKeys { textKey: string; valueKey: string; childrenKey: string }

const getDepth = (options: CascaderOption[], childrenKey: string): number => {
  let max = 1
  const traverse = (opts: CascaderOption[] | undefined, level: number) => {
    if (!opts?.length) return
    if (level > max) max = level
    opts.forEach(o => {
      const has = Object.prototype.hasOwnProperty.call(o, childrenKey)
      if (has && level + 1 > max) max = level + 1
      const ch = o[childrenKey] as CascaderOption[] | undefined
      if (ch?.length) traverse(ch, level + 1)
    })
  }
  traverse(options, 1)
  return max
}

export const useCascaderExtend = (options: CascaderOption[] = [], keys: FieldKeys, value: CascaderValue[]) => {
  const depth = getDepth(options, keys.childrenKey)
  const tabs: CascaderOption[][] = [options]
  const items: (CascaderOption | undefined)[] = []
  if (value?.length) {
    let currentOptions: CascaderOption[] | undefined = options
    for (let i = 0; i < value.length; i += 1) {
      const currentValue = value[i]
      if (currentValue == null || !currentOptions?.length) break
      const matched: CascaderOption | undefined = currentOptions.find(option => option[keys.valueKey] === currentValue)
      if (!matched) break
      items.push(matched)
      const hasChildrenField = Object.prototype.hasOwnProperty.call(matched, keys.childrenKey)
      if (!hasChildrenField) break
      const children: CascaderOption[] = (matched[keys.childrenKey] as CascaderOption[] | undefined) ?? []
      tabs.push(children)
      currentOptions = children
    }
  }
  return { tabs, items, depth }
}
