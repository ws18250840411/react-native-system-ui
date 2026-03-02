import type { CascaderFieldNames, CascaderOption, CascaderValue } from '../../components/cascader/types'

export type FieldKeys = { textKey: string; valueKey: string; childrenKey: string }
export const getFieldKeys = (fn?: CascaderFieldNames) => ({ textKey: fn?.text ?? 'text', valueKey: fn?.value ?? 'value', childrenKey: fn?.children ?? 'children' })
export const resolveRows = (opts: CascaderOption[] = [], k: FieldKeys, vals: CascaderValue[]): CascaderOption[] => { const sel: CascaderOption[] = []; let cur: CascaderOption[] | undefined = opts; vals.forEach(val => { if (!cur?.length) return; const m = cur.find(o => o[k.valueKey] === val); if (m) { sel.push(m); cur = (m[k.childrenKey] as CascaderOption[] | undefined) ?? [] } }); return sel }
