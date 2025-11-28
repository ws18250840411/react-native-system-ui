import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { usePickerTokens } from './tokens'
import PickerColumn from './PickerColumn'
import type { PickerOption, PickerProps, PickerValue } from './types'

const normalizeColumns = (columns: PickerProps['columns']): PickerOption[][] => {
  if (!Array.isArray(columns)) {
    return [[{ label: '', value: '' }]]
  }
  if (columns.length && !Array.isArray(columns[0])) {
    return [columns as PickerOption[]]
  }
  return columns as PickerOption[][]
}

const Picker: React.FC<PickerProps> = props => {
  const tokens = usePickerTokens()
  const {
    columns,
    value: valueProp,
    defaultValue = [],
    onChange,
    onConfirm,
    onCancel,
    title,
    showToolbar = true,
    itemHeight = tokens.sizing.itemHeight,
    visibleItemCount = tokens.sizing.visibleItemCount,
    style,
    ...rest
  } = props

  const normalizedColumns = React.useMemo(() => normalizeColumns(columns), [columns])
  const [internalValue, setInternalValue] = React.useState<PickerValue[]>(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp ?? [] : internalValue

  const updateValue = React.useCallback(
    (next: PickerValue[]) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      const selectedOptions = normalizedColumns.map((column, index) => {
        const current = next[index]
        return column.find(option => option.value === current) ?? column[0]
      })
      onChange?.(next, selectedOptions)
    },
    [isControlled, normalizedColumns, onChange],
  )

  const handleColumnChange = (option: PickerOption, columnIndex: number) => {
    const next = [...value]
    next[columnIndex] = option.value
    updateValue(next)
  }

  const columnHeight = itemHeight * visibleItemCount

  return (
    <View {...rest} style={[styles.container, style]}>
      {showToolbar && (
        <View style={[styles.toolbar, { padding: tokens.spacing.toolbarPadding, backgroundColor: tokens.colors.toolbarBackground }]}>
          <Text onPress={onCancel} style={[styles.action, { color: tokens.colors.toolbarText }]}>取消</Text>
          <Text style={[styles.title, { color: tokens.colors.toolbarText }]}>{title}</Text>
          <Text
            onPress={() => onConfirm?.(value, normalizedColumns.map((column, index) => column.find(option => option.value === value[index]) ?? column[0]))}
            style={[styles.action, { color: tokens.colors.toolbarText }]}
          >
            确定
          </Text>
        </View>
      )}
      <View style={[styles.picker, { height: columnHeight, backgroundColor: tokens.colors.background }] }>
        <View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              top: (columnHeight - itemHeight) / 2,
              height: itemHeight,
              backgroundColor: tokens.colors.indicator,
              borderColor: tokens.colors.indicatorBorder,
            },
          ]}
        />
        {normalizedColumns.map((column, index) => (
          <View key={index} style={styles.column}>
            <PickerColumn
              options={column}
              value={value[index]}
              onChange={option => handleColumnChange(option, index)}
              columnHeight={columnHeight}
              itemHeight={itemHeight}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  action: {
    fontSize: 16,
  },
  picker: {
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  column: {
    flex: 1,
  },
})

Picker.displayName = 'Picker'

export default Picker
