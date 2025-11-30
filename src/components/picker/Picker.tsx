import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { usePickerTokens } from './tokens'
import PickerView from './PickerView'
import type { PickerOption, PickerProps, PickerValue } from './types'

const Picker: React.FC<PickerProps> = rawProps => {
  const tokens = usePickerTokens()
  const {
    title,
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    showToolbar = true,
    toolbarPosition = 'top',
    onConfirm,
    onCancel,
    style,
    ...viewProps
  } = rawProps
  const { onChange, style: pickerViewStyle, ...restViewProps } = viewProps

  const [latestValue, setLatestValue] = React.useState<PickerValue[]>(rawProps.value ?? rawProps.defaultValue ?? [])
  const [latestOptions, setLatestOptions] = React.useState<PickerOption[]>([])

  React.useEffect(() => {
    if (rawProps.value !== undefined) {
      setLatestValue(rawProps.value)
    }
  }, [rawProps.value])

  const handleChange = React.useCallback(
    (values: PickerValue[], options: PickerOption[]) => {
      setLatestValue(values)
      setLatestOptions(options)
      onChange?.(values, options)
    },
    [onChange],
  )

  const handleConfirm = React.useCallback(() => {
    if (onConfirm) {
      onConfirm(latestValue, latestOptions)
    }
  }, [latestOptions, latestValue, onConfirm])

  const toolbar = (
    <View style={[styles.toolbar, { padding: tokens.spacing.toolbarPadding, backgroundColor: tokens.colors.toolbarBackground }]}>
      <Text style={[styles.action, { color: tokens.colors.toolbarText }]} onPress={onCancel}>
        {cancelButtonText}
      </Text>
      <Text style={[styles.title, { color: tokens.colors.toolbarText }]}>{title}</Text>
      <Text style={[styles.action, { color: tokens.colors.toolbarText }]} onPress={handleConfirm}>
        {confirmButtonText}
      </Text>
    </View>
  )

  return (
    <View style={[styles.container, style]}>
      {showToolbar && toolbarPosition === 'top' ? toolbar : null}
      <PickerView {...restViewProps} style={pickerViewStyle} onChange={handleChange} />
      {showToolbar && toolbarPosition === 'bottom' ? toolbar : null}
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
})

Picker.displayName = 'Picker'

export default Picker
