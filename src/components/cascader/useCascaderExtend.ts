import * as React from "react"

import type { CascaderOption, CascaderValue } from "./types"

interface FieldKeys {
  textKey: string
  valueKey: string
  childrenKey: string
}

export const useCascaderExtend = (options: CascaderOption[] = [], keys: FieldKeys, value: CascaderValue[]) => {
  const depth = React.useMemo(() => {
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
  }, [keys.childrenKey, options])

  const tabs = React.useMemo(() => {
    if (!value || !value.length) return [options]
    return value.reduce<CascaderOption[][]>(
      (acc, val, index) => {
        if (val === undefined || val === null) return acc
        const current = acc[index]
        if (!current) return acc
        const next = current.find(option => option[keys.valueKey] === value[index])
        const children = (next?.[keys.childrenKey] as CascaderOption[] | undefined) ?? undefined
        if (children) acc.push(children)
        return acc
      },
      [options],
    )
  }, [keys.childrenKey, keys.valueKey, options, value])

  const items = React.useMemo(() => {
    if (!value || !value.length) return []
    return value.map((val, index) => tabs[index]?.find(option => option[keys.valueKey] === val))
  }, [keys.valueKey, tabs, value])

  return { tabs, items, depth }
}
