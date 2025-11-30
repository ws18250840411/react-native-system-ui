import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import Divider from '../divider'
import { useControllableValue } from '../../hooks'
import { getDataType, buildOptions, buildSelectedValue, findDefaultValue, findNextAllColumns } from './helpers'
import PickerColumn from './PickerColumn'
import { usePickerTokens } from './tokens'
import type { PickerOption, PickerViewProps, PickerValue } from './types'

const ensureOdd = (count: number) => (count % 2 === 0 ? count + 1 : count)

const isNil = (value: unknown): value is null | undefined => value === null || value === undefined

const valuesEqual = (a: PickerValue[], b: PickerValue[]) => {
  if (a.length !== b.length) return false
  return a.every((value, index) => value === b[index])
}

const PickerView: React.FC<PickerViewProps> = props => {
  const tokens = usePickerTokens()
  const {
    columns,
    itemHeight = tokens.sizing.itemHeight,
    visibleItemCount = tokens.sizing.visibleItemCount,
    loading = false,
    style,
    testID,
  } = props

  const [value, triggerChange] = useControllableValue<PickerValue[]>(props, {
    defaultValue: [],
    trigger: 'onChange',
  })
  const hasValueProp = Object.prototype.hasOwnProperty.call(props, 'value')
  const hasDefaultValueProp = Object.prototype.hasOwnProperty.call(props, 'defaultValue')

  const dataType = React.useMemo(() => getDataType(columns), [columns])
  const normalizedVisibleCount = ensureOdd(visibleItemCount)
  const columnHeight = itemHeight * normalizedVisibleCount

  const [normalizedColumns, setNormalizedColumns] = React.useState<PickerOption[][]>([])
  const columnDefaultValues = React.useRef<PickerValue[]>([])

  React.useEffect(() => {
    if (dataType !== 'cascade') {
      return
    }
    const [opts, , cascadeValues] = buildOptions(dataType, columns, value)
    setNormalizedColumns(opts)
    if (!hasValueProp && cascadeValues.length && !valuesEqual(value, cascadeValues)) {
      const [, selected] = buildSelectedValue(cascadeValues, opts)
      triggerChange(cascadeValues, selected)
    }
  }, [columns, dataType, hasValueProp, triggerChange, value])

  React.useEffect(() => {
    if (dataType === 'cascade') {
      return
    }
    const [opts, defaults] = buildOptions(dataType, columns)
    columnDefaultValues.current = defaults
    setNormalizedColumns(opts)
    if (!hasValueProp && !hasDefaultValueProp && defaults.length && !defaults.every(val => isNil(val))) {
      const [, selected] = buildSelectedValue(defaults, opts)
      triggerChange(defaults, selected)
    }
  }, [columns, dataType, hasDefaultValueProp, hasValueProp, triggerChange])

  const columnMaskStyleTop = React.useMemo(
    () => ({
      top: 0,
      bottom: '50%',
      transform: [{ translateY: -(itemHeight / 2) }],
    }),
    [itemHeight],
  )

  const columnMaskStyleBottom = React.useMemo(
    () => ({
      top: '50%',
      bottom: 0,
      transform: [{ translateY: itemHeight / 2 }],
    }),
    [itemHeight],
  )

  const handleCascadeChange = React.useCallback(
    (option: PickerOption, columnIndex: number) => {
      const nextAll = findNextAllColumns((option.children as PickerOption[]) || [])
      const nextOptions = normalizedColumns.slice(0, columnIndex + 1).concat(nextAll.options)
      const nextValues = value.slice(0, columnIndex).concat(option.value, nextAll.values)
      const [nextValueList, selected] = buildSelectedValue(nextValues, nextOptions)
      triggerChange(nextValueList, selected)
    },
    [normalizedColumns, triggerChange, value],
  )

  const handleMultipleChange = React.useCallback(
    (option: PickerOption, columnIndex: number) => {
      const nextValues = value.slice()
      columnDefaultValues.current.forEach((defaultVal, index) => {
        if (isNil(nextValues[index])) {
          nextValues[index] = defaultVal
        }
      })
      nextValues[columnIndex] = option.value
      const [nextValueList, selected] = buildSelectedValue(nextValues, normalizedColumns)
      triggerChange(nextValueList, selected)
    },
    [normalizedColumns, triggerChange, value],
  )

  const handleSingleChange = React.useCallback(
    (option: PickerOption) => {
      triggerChange([option.value], [option])
    },
    [triggerChange],
  )

  const maskColor = tokens.colors.background

  return (
    <View testID={testID} style={[styles.container, { backgroundColor: tokens.colors.background, height: columnHeight }, style]}>
      {loading ? (
        <View style={[styles.loading, { backgroundColor: maskColor }]}>
          <ActivityIndicator />
        </View>
      ) : null}
      <View style={[styles.mask, columnMaskStyleTop, { backgroundColor: maskColor }]} pointerEvents="none">
        <Divider />
      </View>
      <View style={[styles.mask, columnMaskStyleBottom, { backgroundColor: maskColor }]} pointerEvents="none">
        <Divider />
      </View>
      <View style={styles.columns}>
        {normalizedColumns.map((column, index) => {
          const current = !isNil(value[index])
            ? value[index]
            : !props.value && !props.defaultValue
              ? columnDefaultValues.current[index] ?? findDefaultValue(column[0]?.value, column) ?? undefined
              : undefined

          return (
            <PickerColumn
              key={index}
              options={column}
              value={current}
              itemHeight={itemHeight}
              visibleItemCount={normalizedVisibleCount}
              onChange={option => {
                if (dataType === 'cascade') {
                  handleCascadeChange(option, index)
                  return
                }
                if (dataType === 'multiple') {
                  handleMultipleChange(option, index)
                  return
                }
                handleSingleChange(option)
              }}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  columns: {
    flexDirection: 'row',
    flex: 1,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0.85,
    zIndex: 3,
  },
})

export default PickerView
