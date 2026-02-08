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
  const tabs = !value?.length ? [options] : value.reduce<CascaderOption[][]>((acc, val, i) => {
    if (val == null) return acc
    const cur = acc[i]; if (!cur) return acc
    const ch = cur.find(o => o[keys.valueKey] === value[i])?.[keys.childrenKey] as CascaderOption[] | undefined
    if (ch) acc.push(ch); return acc
  }, [options])
  const items = !value?.length ? [] : value.map((val, i) => tabs[i]?.find(o => o[keys.valueKey] === val))
  return { tabs, items, depth }
}
