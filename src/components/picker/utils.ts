import type { PickerColumn, PickerColumns, PickerOption, PickerValue } from './types'

export interface NormalizedPickerResult {
  columns: PickerOption[][]
  values: PickerValue[]
  options: (PickerOption | undefined)[]
  indexes: number[]
  isCascade: boolean
}

export const toArrayValue = (value?: PickerValue[] | PickerValue | null): PickerValue[] => {
  if (Array.isArray(value)) return value.filter(v => v !== undefined && v !== null) as PickerValue[]
  if (value === undefined || value === null) return []
  return [value]
}

const isColumnWithOptions = (col: PickerColumn | PickerOption): col is { options: PickerOption[]; defaultValue?: PickerValue } =>
  !!col && typeof col === 'object' && 'options' in col && Array.isArray((col as any).options)

const hasChildren = (option: PickerOption) =>
  !!option && Array.isArray(option.children) && (option.children as PickerOption[]).length > 0

const normalizeMultiple = (
  columnsList: PickerOption[][],
  defaults: (PickerValue | undefined)[],
  rawValue: PickerValue[],
): NormalizedPickerResult => {
  const values: PickerValue[] = []
  const options: (PickerOption | undefined)[] = []
  const indexes: number[] = []

  columnsList.forEach((opts, index) => {
    const current = rawValue[index]
    let targetIndex = opts.findIndex(item => item.value === current)
    if (targetIndex < 0 && defaults[index] !== undefined) {
      targetIndex = opts.findIndex(item => item.value === defaults[index])
    }
    if (targetIndex < 0 && opts.length > 0) {
      targetIndex = 0
    }

    const target = targetIndex >= 0 ? opts[targetIndex] : undefined
    values[index] = (target?.value ?? current) as PickerValue
    options[index] = target
    indexes[index] = targetIndex
  })

  return {
    columns: columnsList,
    values,
    options,
    indexes,
    isCascade: false,
  }
}

const normalizeCascade = (rootOptions: PickerOption[], rawValue: PickerValue[]): NormalizedPickerResult => {
  const columns: PickerOption[][] = []
  const values: PickerValue[] = []
  const options: (PickerOption | undefined)[] = []
  const indexes: number[] = []

  let currentOptions: PickerOption[] | undefined = rootOptions
  let depth = 0
  while (currentOptions && currentOptions.length) {
    columns.push(currentOptions)
    const current = rawValue[depth]
    let targetIndex = currentOptions.findIndex(item => item.value === current)
    if (targetIndex < 0) targetIndex = 0
    const target = targetIndex >= 0 ? currentOptions[targetIndex] : undefined
    values[depth] = (target?.value ?? current) as PickerValue
    options[depth] = target
    indexes[depth] = targetIndex

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
    indexes,
    isCascade: true,
  }
}

export const normalizePicker = (
  columnsInput: PickerColumns = [],
  rawValueInput: PickerValue[] = [],
): NormalizedPickerResult => {
  const rawValue = Array.isArray(rawValueInput) ? rawValueInput : []
  if (!Array.isArray(columnsInput) || columnsInput.length === 0) {
    return { columns: [], values: rawValue, options: [], indexes: [], isCascade: false }
  }

  const everyPlainOption = columnsInput.every(item => !Array.isArray(item) && !isColumnWithOptions(item as any))
  const cascade = everyPlainOption && columnsInput.some(item => hasChildren(item as PickerOption))

  if (cascade) {
    return normalizeCascade(columnsInput as PickerOption[], rawValue)
  }

  const asArray = columnsInput as any[]
  const columnsList: PickerOption[][] = []
  const defaults: (PickerValue | undefined)[] = []

  // 单列扁平结构也视为多列的第一列
  const treatAsSingleColumn = everyPlainOption && !cascade
  if (treatAsSingleColumn) {
    columnsList.push(columnsInput as PickerOption[])
    defaults.push(undefined)
  } else {
    asArray.forEach(col => {
      if (Array.isArray(col)) {
        columnsList.push(col)
        defaults.push(undefined)
      } else if (isColumnWithOptions(col)) {
        columnsList.push(col.options ?? [])
        defaults.push(col.defaultValue)
      }
    })
  }

  return normalizeMultiple(columnsList, defaults, rawValue)
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
  return clamp
}

export const shallowEqualArray = (a: PickerValue[] = [], b: PickerValue[] = []) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false
  }
  return true
}
