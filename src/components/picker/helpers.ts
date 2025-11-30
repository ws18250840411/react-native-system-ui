import type {
  PickerCascadeOption,
  PickerColumn,
  PickerDataType,
  PickerOption,
  PickerOptionMultipleWithDefault,
  PickerValue,
} from './types'

const isArray = Array.isArray

export const getDataType = (columns: PickerColumn[]): PickerDataType => {
  const first = columns[0]
  if (first) {
    if ('children' in first) {
      return 'cascade'
    }
    if ('options' in first || isArray(first)) {
      return 'multiple'
    }
  }
  return 'single'
}

export const findDefaultValue = (value: PickerValue | undefined, options: PickerOption[]): PickerValue | null => {
  if (!options.length) {
    return null
  }
  if (value !== undefined) {
    const index = options.findIndex(item => item.value === value)
    if (index >= 0 && !options[index].disabled) {
      return value
    }
  }
  const next = options.find(item => !item.disabled)
  return next ? next.value : null
}

export const findNextAllColumns = (columns: PickerCascadeOption[]) => {
  const options: PickerOption[][] = []
  const values: PickerValue[] = []

  const traverse = (children: PickerCascadeOption[]) => {
    if (!children.length) return
    options.push(children)
    values.push(children[0].value)
    traverse(children[0].children ?? [])
  }

  traverse(columns)

  return { options, values }
}

export const findAllColumnsByValues = (columns: PickerCascadeOption[], values: PickerValue[]) => {
  const options: PickerOption[][] = []
  let current = columns

  values.forEach(value => {
    options.push(current)
    const nextIndex = current.findIndex(item => item.value === value)
    current = current[nextIndex]?.children ?? []
  })

  return options
}

export const buildOptions = (
  dataType: PickerDataType,
  columns: PickerColumn[],
  values?: PickerValue[],
): [PickerOption[][], PickerValue[], PickerValue[]] => {
  switch (dataType) {
    case 'cascade': {
      if (!values?.length) {
        const data = findNextAllColumns(columns as PickerCascadeOption[])
        return [data.options, [], data.values]
      }
      return [findAllColumnsByValues(columns as PickerCascadeOption[], values), [], values]
    }
    case 'multiple': {
      const optionsList: PickerOption[][] = []
      const defaults: PickerValue[] = []

      ;(columns as (PickerOption[] | PickerOptionMultipleWithDefault)[]).forEach(item => {
        if (isArray(item)) {
          const resolved = item as PickerOption[]
          optionsList.push(resolved)
          const fallback = resolved[0]?.value
          const def = findDefaultValue(fallback, resolved)
          defaults.push(def ?? fallback ?? '')
        } else {
          const { options: resolved, defaultValue } = item as PickerOptionMultipleWithDefault
          optionsList.push(resolved)
          const fallback = defaultValue ?? resolved[0]?.value
          const def = findDefaultValue(fallback, resolved)
          defaults.push(def ?? fallback ?? '')
        }
      })

      return [optionsList, defaults, []]
    }
    default: {
      const normalized = [columns as PickerOption[]]
      const first = normalized[0][0]
      const defaults = first ? [first.value] : []
      return [normalized, defaults, []]
    }
  }
}

export const buildSelectedValue = (
  values: PickerValue[],
  options: PickerOption[][],
): [PickerValue[], PickerOption[]] => {
  const selectedOptions = values.map((value, index) => {
    const column = options[index] || []
    return column.find(option => option.value === value) ?? column[0]
  })
  return [values, selectedOptions]
}
