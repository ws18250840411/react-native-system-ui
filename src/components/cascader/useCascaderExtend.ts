

import type { CascaderOption, CascaderValue } from './types'

interface FieldKeys {
  textKey: string
  valueKey: string
  childrenKey: string
}

export const useCascaderExtend = (options: CascaderOption[] = [], keys: FieldKeys, value: CascaderValue[]) => {
  const depth = (() => {
    let maxDepth = 1
    const traverse = (opts: CascaderOption[] | undefined, level: number) => {
      if (!opts || !opts.length) return
      if (level > maxDepth) maxDepth = level
      const next = level + 1
      opts.forEach(option => {
        const hasChildrenProp = Object.prototype.hasOwnProperty.call(option, keys.childrenKey)
        if (hasChildrenProp && next > maxDepth) maxDepth = next
        const children = option[keys.childrenKey] as CascaderOption[] | undefined
        if (children && children.length) traverse(children, next)
      })
    }
    traverse(options, 1)
    return maxDepth
  })()

  const tabs = (() => {
    if (!value || !value.length) return [options]
    return value.reduce<CascaderOption[][]>(
      (acc, val, index) => {
        if (val == null) return acc
        const current = acc[index]
        if (!current) return acc
        const next = current.find(option => option[keys.valueKey] === value[index])
        const children = next?.[keys.childrenKey] as CascaderOption[] | undefined
        if (children) acc.push(children)
        return acc
      },
      [options],
    )
  })()

  const items = !value || !value.length
    ? []
    : value.map((val, index) => tabs[index]?.find(option => option[keys.valueKey] === val))

  return { tabs, items, depth }
}
