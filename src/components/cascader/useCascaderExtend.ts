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
      if (!opts || !opts.length) return
      if (level > maxDepth) maxDepth = level
      const next = level + 1
      opts.forEach(option => {
        const children = option[keys.childrenKey] as CascaderOption[] | undefined
        if (children && children.length) traverse(children, next)
      })
    }
    traverse(normalizedOptions, 1)
    return maxDepth || 1
  }, [keys.childrenKey, normalizedOptions])

  const tabs = React.useMemo(() => {
    const list: CascaderOption[][] = [normalizedOptions]
    if (!value || !value.length) return list
    value.forEach((val, index) => {
      const current = list[index]
      if (!current || !current.length) return
      const match = current.find(option => option[keys.valueKey] === val)
      if (match) {
        const children = (match[keys.childrenKey] as CascaderOption[]) ?? []
        if (children.length) list.push(children)
      }
    })
    return list
  }, [keys.childrenKey, keys.valueKey, normalizedOptions, value])

  const items = React.useMemo(() => {
    if (!value || !value.length) return []
    return value.map((val, index) => tabs[index]?.find(option => option[keys.valueKey] === val))
  }, [keys.valueKey, tabs, value])

  return { tabs, items, depth }
}
