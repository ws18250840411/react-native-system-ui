import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View, Platform, StyleSheet, type TextStyle } from 'react-native'

import { withAlpha } from '../../utils/color'
import { isObject } from '../../utils'
import { isFiniteNumber, isText } from '../../utils/validate'
import { usePickerTokens } from './tokens'
import WheelPicker from './WheelPicker'
import type { PickerColumn, PickerColumnProps, PickerColumns, PickerOption, PickerProps, PickerValue } from './types'

export function usePickerValue({
  columns,
  valueProp,
  defaultValue,
  emitConfirmOnAutoSelect = true,
  onChange,
  onConfirm,
}: {
  columns?: PickerColumns
  valueProp?: PickerProps['value']
  defaultValue?: PickerProps['defaultValue']
  emitConfirmOnAutoSelect?: boolean
  onChange?: PickerProps['onChange']
  onConfirm?: PickerProps['onConfirm']
}) {
  const preparedColumns = useMemo(() => prepareColumns(columns), [columns])
  const isControlled = valueProp !== undefined

  const [innerValue, setInnerValue] = useState<PickerValue[]>(() => {
    const initial = toArrayValue(valueProp ?? defaultValue)
    return normalizePicker(preparedColumns, initial).values
  })
  const innerValueRef = useRef(innerValue)

  const commitValue = useCallback((next: PickerValue[]) => {
    innerValueRef.current = next
    setInnerValue(next)
  }, [])

  useEffect(() => {
    if (!isControlled) return
    const next = toArrayValue(valueProp)
    if (!shallowEqualArray(innerValueRef.current, next)) {
      commitValue(next)
    }
  }, [commitValue, isControlled, valueProp])

  const normalized = useMemo(
    () => normalizePicker(preparedColumns, innerValue),
    [preparedColumns, innerValue]
  )

  useEffect(() => {
    if (isControlled) return
    if (!shallowEqualArray(innerValue, normalized.values)) {
      commitValue(normalized.values)
      onChange?.(normalized.values, normalized.options)
      if (emitConfirmOnAutoSelect) {
        onConfirm?.(normalized.values, normalized.options)
      }
    }
  }, [
    commitValue,
    emitConfirmOnAutoSelect,
    innerValue,
    isControlled,
    normalized,
    onChange,
    onConfirm,
  ])

  const handleSelect = useCallback(
    (option: PickerOption, columnIndex: number) => {
      const next = [...innerValueRef.current]
      next[columnIndex] = option.value

      if (preparedColumns.type === 'cascade') {
        next.length = columnIndex + 1
      }

      const final = normalizePicker(preparedColumns, next)
      if (shallowEqualArray(innerValueRef.current, final.values)) return
      commitValue(final.values)
      // onChange?.(final.values, final.options)
    },
    [commitValue, onChange, preparedColumns],
  )

  const handleConfirm = useCallback(() => {
    onConfirm?.(normalized.values, normalized.options)
  }, [normalized, onConfirm])

  return {
    preparedColumns,
    normalized,
    handleSelect,
    handleConfirm,
  }
}

const getVisibleCount = (count: number) => {
  const normalized = isFiniteNumber(count) ? Math.max(3, Math.floor(count)) : 5
  return normalized % 2 === 0 ? normalized + 1 : normalized
}

const GradientMask: React.FC<{
  height: number
  color: string
  position: 'top' | 'bottom'
}> = ({ height, color, position }) => {
  const opacity = 0.6
  return (
    <View
      pointerEvents="none"
      style={[
        styles.gradientMask,
        { height, backgroundColor: withAlpha(color, opacity) },
        position === 'top' ? { top: 0 } : { bottom: 0 },
      ]}
    />
  )
}

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
  const clampIndex = Math.min(Math.max(startIndex, 0), options.length - 1)
  if (!options[clampIndex]?.disabled) return clampIndex
  for (let i = clampIndex + 1; i < options.length; i += 1) {
    if (!options[i]?.disabled) return i
  }
  for (let i = clampIndex - 1; i >= 0; i -= 1) {
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
    const startIndex = currentIndex >= 0 ? currentIndex : defaultIndex >= 0 ? defaultIndex : 0
    const targetIndex = findEnabledIndex(opts, startIndex)
    const target = targetIndex >= 0 ? opts[targetIndex] : undefined
    const valid = currentIndex >= 0 && !opts[currentIndex]?.disabled
    values[index] = (valid ? current : (target?.value ?? defaults[index] ?? opts[0]?.value)) as PickerValue
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
  while (currentOptions && currentOptions.length && depth < 10) {
    columns.push(currentOptions)
    const current = rawValue[depth]
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
        const c = col as { options?: PickerOption[]; defaultValue?: PickerValue }
        columnsList.push(c.options ?? [])
        defaults.push(c.defaultValue)
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

const PickerColumn: React.FC<
  PickerColumnProps & {
    textColor: string
    textMutedColor: string
    textDisabledColor: string
    optionSize: number
    fontFamily: string
    optionWeight: TextStyle['fontWeight']
  }
> = React.memo(
  props => {
    const {
      columnIndex,
      options,
      value,
      itemHeight,
      visibleItemCount,
      onSelect,
      textColor,
      textMutedColor,
      textDisabledColor,
      optionSize,
      fontFamily,
      optionWeight,
      readOnly,
      decelerationRate,
    } = props
    const restVisible = Math.max(1, Math.floor((visibleItemCount - 1) / 2))

    const valueIndexMap = useMemo(
      () => new Map(options.map((option, idx) => [option.value, idx] as const)),
      [options]
    )
    const selectedIndex = useMemo(() => {
      if (!options.length) return 0
      const idx = valueIndexMap.get(value as PickerValue)
      const startIndex = typeof idx === 'number' && idx >= 0 ? idx : 0
      return findEnabledIndex(options, startIndex)
    }, [options, value, valueIndexMap])

    const handleChange = useCallback((index: number) => {
      const target = findEnabledIndex(options, index)
      const option = options[target]
      if (!option || option.disabled) return
      onSelect(option, columnIndex, target)
    }, [columnIndex, onSelect, options])

    const renderOption = useCallback(
      (item: PickerOption, _index: number, meta?: { active: boolean; disabled: boolean }) => {
        const active = meta?.active ?? false
        const disabled = meta?.disabled ?? false
        const resolvedTextColor = disabled ? textDisabledColor : (active ? textColor : textMutedColor)
        const content = item.label ?? item.value
        return (
          <View style={[styles.option, { opacity: disabled ? 0.5 : 1, minHeight: itemHeight }]}>
            {isText(content) ? (
              <Text numberOfLines={1} style={[styles.optionText, {
                color: resolvedTextColor,
                fontSize: optionSize,
                fontFamily,
                fontWeight: optionWeight,
              }]}>{content}</Text>
            ) : content}
          </View>
        )
      },
      [
        columnIndex,
        fontFamily,
        itemHeight,
        optionSize,
        optionWeight,
        textColor,
        textDisabledColor,
        textMutedColor,
      ],
    )

    return (
      <View style={[styles.column, { height: itemHeight * visibleItemCount }]}>
        <WheelPicker
          data={options}
          itemHeight={itemHeight}
          visibleRest={restVisible}
          selectedIndex={Math.max(0, selectedIndex)}
          onChange={handleChange}
          readOnly={readOnly}
          decelerationRate={decelerationRate}
          renderItem={renderOption}
        />
      </View>
    )
  }
)

const Picker: React.FC<PickerProps> = props => {
  const { tokensOverride } = props
  const tokens = usePickerTokens(tokensOverride)
  const {
    columns = [],
    value: valueProp,
    defaultValue,
    title,
    showToolbar = tokens.defaults.showToolbar,
    toolbarPosition = tokens.defaults.toolbarPosition,
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    itemHeight = tokens.defaults.itemHeight,
    visibleItemCount: visibleItemCountProp = tokens.defaults.visibleItemCount,
    loading = false,
    readOnly = false,
    decelerationRate = Platform.OS === 'android' ? 0.99 : 'fast',
    emitConfirmOnAutoSelect = true,
    maskColor,
    onChange,
    onConfirm,
    onCancel,
    style,
    testID,
    ...rest
  } = props

  const visibleItemCount = getVisibleCount(visibleItemCountProp ?? tokens.defaults.visibleItemCount)

  const { normalized, handleSelect, handleConfirm, preparedColumns } = usePickerValue({
    columns,
    valueProp,
    defaultValue,
    emitConfirmOnAutoSelect,
    onChange,
    onConfirm,
  })
  const isCascade = preparedColumns.type === 'cascade'


  const renderActionContent = useCallback((content: React.ReactNode, color: string) => {
    if (React.isValidElement(content)) return <View style={{ minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>{content}</View>
    if (isText(content)) return <Text numberOfLines={1} style={[styles.actionText, {
      color,
      fontSize: tokens.typography.toolbarSize,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.toolbarWeight,
    }]}>{content}</Text>
    return <View style={{ minWidth: 44 }} />
  }, [tokens])

  const renderTitleContent = useCallback((content: React.ReactNode) => {
    if (content == null) return <View />
    if (React.isValidElement(content)) return <View style={[styles.title, { alignItems: 'center', justifyContent: 'center' }]}>{content}</View>
    return <Text style={[styles.title, {
      fontSize: tokens.typography.toolbarSize,
      fontFamily: tokens.typography.fontFamily,
      color: tokens.colors.text,
      fontWeight: tokens.typography.toolbarWeight,
    }]} numberOfLines={1}>{content}</Text>
  }, [tokens])

  const toolbar = useMemo(() => {
    if (!showToolbar) return null
    return (
      <View style={[styles.toolbar, {
        height: tokens.spacing.toolbarHeight,
        borderColor: tokens.colors.indicator,
        paddingHorizontal: tokens.spacing.actionPadding,
      }]}>
        <Pressable onPress={onCancel} accessibilityRole="button">
          {renderActionContent(cancelButtonText, tokens.colors.cancel)}
        </Pressable>
        {renderTitleContent(title)}
        <Pressable onPress={handleConfirm} accessibilityRole="button">
          {renderActionContent(confirmButtonText, tokens.colors.confirm)}
        </Pressable>
      </View>
    )
  }, [cancelButtonText, confirmButtonText, handleConfirm, onCancel, renderActionContent, renderTitleContent, showToolbar, title, tokens])

  const wrapperHeight = itemHeight * visibleItemCount
  const maskVisibleCount = Math.max(1, Math.floor((visibleItemCount - 1) / 2))
  const indicatorOffset = itemHeight * maskVisibleCount
  const maskHeight = indicatorOffset
  const hasColumns = normalized.columns.length > 0
  const effectiveMaskColor = maskColor ?? tokens.colors.mask
  const columnsContent = useMemo(() => {
    if (!hasColumns) return null
    return normalized.columns.map((column, columnIndex) => {
      const key = isCascade ? `${columnIndex}-${normalized.values.slice(0, columnIndex).map(String).join('|')}` : String(columnIndex)
      return (
        <PickerColumn
          key={key}
          columnIndex={columnIndex}
          options={column}
          value={normalized.values[columnIndex]}
          itemHeight={itemHeight}
          visibleItemCount={visibleItemCount}
          decelerationRate={decelerationRate}
          readOnly={readOnly}
          onSelect={handleSelect}
          textColor={tokens.colors.text}
          textMutedColor={tokens.colors.textMuted}
          textDisabledColor={tokens.colors.textDisabled}
          optionSize={tokens.typography.optionSize}
          fontFamily={tokens.typography.fontFamily}
          optionWeight={tokens.typography.optionWeight}
        />
      )
    })
  }, [
    decelerationRate,
    handleSelect,
    hasColumns,
    isCascade,
    itemHeight,
    normalized,
    readOnly,
    tokens,
    visibleItemCount,
  ])

  return (
    <View
      {...rest}
      style={[
        styles.container,
        { backgroundColor: tokens.colors.background, borderRadius: tokens.radius.container },
        style,
      ]}
      testID={testID}
    >
      {toolbarPosition === 'top' && toolbar}
      <View style={[styles.body, { height: wrapperHeight }]}>
        <View style={styles.columns} pointerEvents={loading ? 'none' : 'auto'}>
          {columnsContent}
          {hasColumns && (
            <>
              <View pointerEvents="none" style={[styles.indicator, {
                top: indicatorOffset,
                height: itemHeight,
                borderColor: tokens.colors.indicator,
              }]} />
              <GradientMask position="top" height={maskHeight} color={effectiveMaskColor} />
              <GradientMask position="bottom" height={maskHeight} color={effectiveMaskColor} />
            </>
          )}
        </View>
        {loading && (
          <View style={[styles.loading, { backgroundColor: tokens.colors.loadingMask }]}>
            <ActivityIndicator size="small" color={tokens.colors?.text ?? '#666'} />
          </View>
        )}
      </View>
      {toolbarPosition === 'bottom' && toolbar}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  body: {
    position: 'relative',
    overflow: 'hidden',
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    includeFontPadding: false,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 3,
  },
  gradientMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  actionText: {
    minWidth: 44,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

Picker.displayName = 'Picker'

export default Picker
