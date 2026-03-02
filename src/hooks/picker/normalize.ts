import { isObject } from '../../utils'
import type { PickerColumn, PickerColumns, PickerOption, PickerValue } from '../../components/picker/types'

export interface NormalizedPickerResult { columns: PickerOption[][]; values: PickerValue[]; options: (PickerOption | undefined)[] }
export interface PreparedPickerColumns { type: 'single' | 'multiple' | 'cascade'; columnsList: PickerOption[][]; defaults: (PickerValue | undefined)[]; cascadeRoot?: PickerOption[] }

export const toArrayValue = (value?: PickerValue[] | PickerValue | null): PickerValue[] =>
  Array.isArray(value) ? value.filter(v => v !== undefined && v !== null) as PickerValue[] : value == null ? [] : [value]

const isColumnWithOptions = (col: PickerColumn | PickerOption): col is { options: PickerOption[]; defaultValue?: PickerValue } =>
  !!col && isObject(col) && 'options' in col && Array.isArray((col as { options?: unknown }).options)

const hasChildren = (option: PickerOption) =>
  !!option && isObject(option) && Array.isArray((option as any).children) && (option as any).children.length > 0

export const findEnabledIndex = (options: PickerOption[], startIdx: number) => {
  if (!options.length) return -1
  const clampIdx = Math.min(Math.max(startIdx, 0), options.length - 1)
  if (!options[clampIdx]?.disabled) return clampIdx
  for (let i = clampIdx + 1; i < options.length; i += 1) { if (!options[i]?.disabled) return i }
  for (let i = clampIdx - 1; i >= 0; i -= 1) { if (!options[i]?.disabled) return i }
  return -1
}

const normalizeMultiple = (cols: PickerOption[][], defs: (PickerValue | undefined)[], raw: PickerValue[]): NormalizedPickerResult => {
  const vals: PickerValue[] = [], opts: (PickerOption | undefined)[] = []
  cols.forEach((colOpts, idx) => {
    const curr = raw[idx]; const defIdx = defs[idx] !== undefined ? colOpts.findIndex(item => item.value === defs[idx]) : -1; const currIdx = colOpts.findIndex(item => item.value === curr)
    const startIdx = currIdx >= 0 ? currIdx : defIdx >= 0 ? defIdx : 0; const tgtIdx = findEnabledIndex(colOpts, startIdx); const tgt = tgtIdx >= 0 ? colOpts[tgtIdx] : undefined
    const valid = currIdx >= 0 && !colOpts[currIdx]?.disabled
    vals[idx] = (valid ? curr : (tgt?.value ?? defs[idx] ?? colOpts[0]?.value)) as PickerValue; opts[idx] = tgt
  })
  return { columns: cols, values: vals, options: opts }
}

const normalizeCascade = (root: PickerOption[], raw: PickerValue[]): NormalizedPickerResult => {
  const cols: PickerOption[][] = [], vals: PickerValue[] = [], opts: (PickerOption | undefined)[] = []; let curr: PickerOption[] | undefined = root; let d = 0
  const visited = new Set<PickerOption[]>()
  while (curr && curr.length) {
    if (visited.has(curr)) break
    visited.add(curr)
    cols.push(curr); const c = raw[d]; const startIdx = curr.findIndex(item => item.value === c || String(item.value) === String(c)); const tgtIdx = findEnabledIndex(curr, startIdx >= 0 ? startIdx : 0); const tgt: PickerOption | undefined = tgtIdx >= 0 ? curr[tgtIdx] : curr[0]
    vals[d] = tgt?.value as PickerValue; opts[d] = tgt
    if (tgt && hasChildren(tgt)) { curr = tgt.children; d += 1 } else break
  }
  return { columns: cols, values: vals, options: opts }
}

export const prepareColumns = (input: PickerColumns = []): PreparedPickerColumns => {
  if (!Array.isArray(input) || input.length === 0) return { type: 'single', columnsList: [], defaults: [], cascadeRoot: [] }
  const everyPlain = input.every(item => !Array.isArray(item) && !isColumnWithOptions(item as unknown as PickerColumn | PickerOption)); const cascade = everyPlain && input.some(item => hasChildren(item as PickerOption))
  if (cascade) return { type: 'cascade', columnsList: [], defaults: [], cascadeRoot: input as PickerOption[] }
  const asArray = input as unknown[]; const cols: PickerOption[][] = [], defs: (PickerValue | undefined)[] = []; const treatAsSingle = everyPlain && !cascade
  if (treatAsSingle) { cols.push(input as PickerOption[]); defs.push(undefined) }
  else asArray.forEach(col => { if (Array.isArray(col)) { cols.push(col as PickerOption[]); defs.push(undefined) } else if (isColumnWithOptions(col as unknown as PickerColumn | PickerOption)) { const c = col as { options?: PickerOption[]; defaultValue?: PickerValue }; cols.push(c.options ?? []); defs.push(c.defaultValue) } })
  return { type: 'multiple', columnsList: cols, defaults: defs }
}

export const normalizePicker = (prep: PreparedPickerColumns, raw: PickerValue[] = []): NormalizedPickerResult => {
  const rawVal = Array.isArray(raw) ? raw : []
  return prep.type === 'cascade' && prep.cascadeRoot?.length ? normalizeCascade(prep.cascadeRoot, rawVal) : normalizeMultiple(prep.columnsList, prep.defaults, rawVal)
}
