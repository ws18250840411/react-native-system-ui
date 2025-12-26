import * as React from "react"

import type { CascaderOption, CascaderValue } from "./types"

interface FieldKeys {
  textKey: string
  valueKey: string
  childrenKey: string
}

export const useCascaderExtend = (options: CascaderOption[] = [], keys: FieldKeys, value: CascaderValue[]) => {
  const normalizedOptions = React.useMemo(() => options ?? [], [options])

  const depth = React.useMemo(() => {
    let maxDepth = 0
    const traverse = (opts: CascaderOption[] | undefined, level: number) => {
      if (!opts) return
      if (level > maxDepth) maxDepth = level
      const next = level + 1
      opts.forEach(option => {
        const children = option[keys.childrenKey] as CascaderOption[] | undefined
        if (children) traverse(children, next)
      })
    }
    traverse(normalizedOptions, 1)
    return maxDepth || 1
  }, [keys.childrenKey, normalizedOptions])

  const tabs = React.useMemo(() => {
    if (!value || !value.length) return [normalizedOptions]
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
      [normalizedOptions],
    )
  }, [keys.childrenKey, keys.valueKey, normalizedOptions, value])

  const items = React.useMemo(() => {
    if (!value || !value.length) return []
    return value.map((val, index) => tabs[index]?.find(option => option[keys.valueKey] === val))
  }, [keys.valueKey, tabs, value])

  return { tabs, items, depth }
}
