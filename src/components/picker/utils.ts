import type { PickerColumn, PickerColumns, PickerOption, PickerValue } from './types'
import { isObject } from '../../utils'

export interface NormalizedPickerResult {
  columns: PickerOption[][]
  values: PickerValue[]
  options: (PickerOption | undefined)[]
}

export interface PreparedPickerColumns {
  type: 'single' | 'multiple' | 'cascade'
  columnsList: PickerOption[][]
  defaults: (PickerValue | undefined)[]
  cascadeRoot?: PickerOption[]
}

export const toArrayValue = (value?: PickerValue[] | PickerValue | null): PickerValue[] => {
  if (Array.isArray(value)) return value.filter(v => v !== undefined && v !== null) as PickerValue[]
  if (value === undefined || value === null) return []
  return [value]
}

const isColumnWithOptions = (col: PickerColumn | PickerOption): col is { options: PickerOption[]; defaultValue?: PickerValue } =>
  !!col &&
  isObject(col) &&
  'options' in col &&
  Array.isArray((col as { options?: unknown }).options)

const hasChildren = (option: PickerOption) => {
  return (
    !!option &&
    isObject(option) &&
    Array.isArray((option as any).children) &&
    (option as any).children.length > 0
  )
}

export const findEnabledIndex = (options: PickerOption[], startIndex: number) => {
  if (!options.length) return -1
  const clamp = Math.min(Math.max(startIndex, 0), options.length - 1)
  if (!options[clamp]?.disabled) return clamp
  for (let i = clamp + 1; i < options.length; i += 1) {
    if (!options[i]?.disabled) return i
  }
  for (let i = clamp - 1; i >= 0; i -= 1) {
    if (!options[i]?.disabled) return i
  }
  return -1
}

const normalizeMultiple = (
  columnsList: PickerOption[][],
  defaults: (PickerValue | undefined)[],
  rawValue: PickerValue[],
): NormalizedPickerResult => {
  const values: PickerValue[] = []
  const options: (PickerOption | undefined)[] = []

  columnsList.forEach((opts, index) => {
    const current = rawValue[index]
    const defaultIndex = defaults[index] !== undefined ? opts.findIndex(item => item.value === defaults[index]) : -1
    const currentIndex = opts.findIndex(item => item.value === current)
    
    // 如果 currentIndex >= 0，说明当前值在选项中，直接使用
    // 否则尝试使用 defaultValue，再否则使用第一个选项
    const startIndex = currentIndex >= 0 ? currentIndex : defaultIndex >= 0 ? defaultIndex : 0
    const targetIndex = findEnabledIndex(opts, startIndex)
    const target = targetIndex >= 0 ? opts[targetIndex] : undefined
    
    // 修正：只有当当前值存在且未被禁用时，才保留当前值
    const isCurrentValid = currentIndex >= 0 && !opts[currentIndex]?.disabled
    values[index] = (isCurrentValid ? current : (target?.value ?? defaults[index] ?? opts[0]?.value)) as PickerValue
    options[index] = target
  })

  return {
    columns: columnsList,
    values,
    options,
  }
}

const normalizeCascade = (rootOptions: PickerOption[], rawValue: PickerValue[]): NormalizedPickerResult => {
  const columns: PickerOption[][] = []
  const values: PickerValue[] = []
  const options: (PickerOption | undefined)[] = []

  let currentOptions: PickerOption[] | undefined = rootOptions
  let depth = 0
  
  // 限制最大深度，防止数据异常导致死循环
  while (currentOptions && currentOptions.length && depth < 10) {
    columns.push(currentOptions)
    const current = rawValue[depth]
    
    // 使用更宽松的匹配逻辑，并优先保证匹配到 startIndex
    const startIndex = currentOptions.findIndex(item => 
      item.value === current || String(item.value) === String(current)
    )
    
    const targetIndex = findEnabledIndex(currentOptions, startIndex >= 0 ? startIndex : 0)
    const target: PickerOption | undefined =
      targetIndex >= 0 ? currentOptions[targetIndex] : currentOptions[0]
    
    values[depth] = target?.value as PickerValue
    options[depth] = target

    if (target && hasChildren(target)) {
      currentOptions = target.children
      depth += 1
    } else {
      break
    }
  }

  return {
    columns,
    values,
    options,
  }
}

export const prepareColumns = (columnsInput: PickerColumns = []): PreparedPickerColumns => {
  if (!Array.isArray(columnsInput) || columnsInput.length === 0) {
    return { type: 'single', columnsList: [], defaults: [], cascadeRoot: [] }
  }

  const everyPlainOption = columnsInput.every(item =>
    !Array.isArray(item) && !isColumnWithOptions(item as unknown as PickerColumn | PickerOption)
  )
  const cascade = everyPlainOption && columnsInput.some(item => hasChildren(item as PickerOption))

  if (cascade) {
    return {
      type: 'cascade',
      columnsList: [],
      defaults: [],
      cascadeRoot: columnsInput as PickerOption[],
    }
  }

  const asArray = columnsInput as unknown[]
  const columnsList: PickerOption[][] = []
  const defaults: (PickerValue | undefined)[] = []

  const treatAsSingleColumn = everyPlainOption && !cascade
  if (treatAsSingleColumn) {
    columnsList.push(columnsInput as PickerOption[])
    defaults.push(undefined)
  } else {
    asArray.forEach(col => {
      if (Array.isArray(col)) {
        columnsList.push(col as PickerOption[])
        defaults.push(undefined)
      } else if (isColumnWithOptions(col as unknown as PickerColumn | PickerOption)) {
        const column = col as unknown as { options: PickerOption[]; defaultValue?: PickerValue }
        columnsList.push(column.options ?? [])
        defaults.push(column.defaultValue)
      }
    })
  }

  return {
    type: 'multiple',
    columnsList,
    defaults,
  }
}

export const normalizePicker = (
  prepared: PreparedPickerColumns,
  rawValueInput: PickerValue[] = [],
): NormalizedPickerResult => {
  const rawValue = Array.isArray(rawValueInput) ? rawValueInput : []

  if (prepared.type === 'cascade' && prepared.cascadeRoot?.length) {
    return normalizeCascade(prepared.cascadeRoot, rawValue)
  }

  return normalizeMultiple(prepared.columnsList, prepared.defaults, rawValue)
}

export const shallowEqualArray = (a: PickerValue[] = [], b: PickerValue[] = []) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false
  }
  return true
}
