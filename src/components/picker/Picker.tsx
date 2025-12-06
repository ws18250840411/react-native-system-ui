import React from 'react'
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import Loading from '../loading'
import { usePickerTokens } from './tokens'
import type { PickerColumnProps, PickerOption, PickerProps, PickerValue } from './types'
import {
  findEnabledIndex,
  normalizePicker,
  shallowEqualArray,
  toArrayValue,
  type NormalizedPickerResult,
} from './utils'

const getVisibleCount = (count: number) => {
  const normalized = Number.isFinite(count) ? Math.max(3, Math.floor(count)) : 5
  return normalized % 2 === 0 ? normalized + 1 : normalized
}

const PickerColumn: React.FC<PickerColumnProps & { tokens: ReturnType<typeof usePickerTokens> }> = props => {
  const {
    columnIndex,
    options,
    value,
    itemHeight,
    visibleItemCount,
    optionRender,
    onSelect,
    tokens,
    readOnly,
  } = props
  const listRef = React.useRef<FlatList<PickerOption>>(null)

  const selectedIndex = React.useMemo(() => {
    const idx = options.findIndex(option => option.value === value)
    return findEnabledIndex(options, idx >= 0 ? idx : 0)
  }, [options, value])

  const contentPadding = ((visibleItemCount - 1) / 2) * itemHeight

  const scrollToIndex = React.useCallback(
    (index: number, animated = true) => {
      const target = findEnabledIndex(options, index)
      if (target < 0) return
      listRef.current?.scrollToOffset({
        offset: target * itemHeight,
        animated,
      })
    },
    [itemHeight, options],
  )

  React.useEffect(() => {
    if (!options.length) return
    scrollToIndex(selectedIndex, false)
  }, [options, scrollToIndex, selectedIndex])

  const handleScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!options.length) return
      const offsetY = event.nativeEvent.contentOffset.y
      const index = Math.round(offsetY / itemHeight)
      const target = findEnabledIndex(options, index)
      const option = options[target]
      if (option) {
        if (target !== index) {
          scrollToIndex(target)
        }
        onSelect(option, columnIndex, target)
      }
    },
    [columnIndex, itemHeight, onSelect, options, scrollToIndex],
  )

  const renderItem = ({ item, index }: { item: PickerOption; index: number }) => {
    const active = item.value === value
    const disabled = !!item.disabled
    const textColor = disabled
      ? tokens.colors.textDisabled
      : active
        ? tokens.colors.text
        : tokens.colors.textMuted
    const opacity = disabled ? 0.5 : 1

    return (
      <Pressable
        onPress={() => {
          if (disabled) return
          scrollToIndex(index)
          onSelect(item, columnIndex, index)
        }}
        accessibilityRole="button"
        accessibilityState={{ disabled, selected: active }}
        style={[styles.option, { height: itemHeight }]}
      >
        <View style={{ opacity }}>
          {optionRender ? (
            optionRender(item, { columnIndex, active })
          ) : (
            <Text
              numberOfLines={1}
              style={[
                styles.optionText,
                {
                  color: textColor,
                  fontSize: tokens.typography.optionSize,
                  fontFamily: tokens.typography.fontFamily,
                  fontWeight: tokens.typography.optionWeight,
                },
              ]}
            >
              {item.label ?? item.value}
            </Text>
          )}
        </View>
      </Pressable>
    )
  }

  return (
    <View style={[styles.column, { height: itemHeight * visibleItemCount }]}>
      <FlatList
        ref={listRef}
        data={options}
        keyExtractor={(item, index) => `${String(item.value)}-${index}`}
        renderItem={renderItem}
        initialScrollIndex={options.length ? selectedIndex : undefined}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: contentPadding }}
        nestedScrollEnabled
        scrollEnabled={!readOnly}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
      />
    </View>
  )
}

const Picker: React.FC<PickerProps> = props => {
  const tokens = usePickerTokens()
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
    optionRender,
    onChange,
    onConfirm,
    onCancel,
    style,
    testID,
    ...rest
  } = props

  const visibleItemCount = React.useMemo(
    () => getVisibleCount(visibleItemCountProp ?? tokens.defaults.visibleItemCount),
    [tokens.defaults.visibleItemCount, visibleItemCountProp],
  )

  const isControlled = valueProp !== undefined
  const [innerValue, setInnerValue] = React.useState<PickerValue[]>(() =>
    toArrayValue(valueProp ?? defaultValue ?? []),
  )

  React.useEffect(() => {
    if (isControlled) {
      setInnerValue(toArrayValue(valueProp))
    }
  }, [isControlled, valueProp])

  const normalized: NormalizedPickerResult = React.useMemo(() => {
    return normalizePicker(columns, innerValue)
  }, [columns, innerValue])

  React.useEffect(() => {
    if (!isControlled && !shallowEqualArray(innerValue, normalized.values)) {
      setInnerValue(normalized.values)
    }
  }, [innerValue, isControlled, normalized.values])

  const handleSelect = React.useCallback(
    (option: PickerOption, columnIndex: number) => {
      const base = [...normalized.values]
      base[columnIndex] = option.value
      const next = normalizePicker(columns, base)
      if (!isControlled) {
        setInnerValue(next.values)
      }
      if (!shallowEqualArray(normalized.values, next.values)) {
        onChange?.(next.values, next.options)
      }
    },
    [columns, isControlled, normalized.values, onChange],
  )

  const handleConfirm = React.useCallback(() => {
    onConfirm?.(normalized.values, normalized.options)
  }, [normalized.options, normalized.values, onConfirm])

  const handleCancel = React.useCallback(() => {
    onCancel?.()
  }, [onCancel])

  const renderToolbar = () => {
    if (!showToolbar) return null
    return (
      <View
        style={[
          styles.toolbar,
          {
            height: tokens.spacing.toolbarHeight,
            borderColor: tokens.colors.indicator,
            paddingHorizontal: tokens.spacing.actionPadding,
          },
        ]}
      >
        <Pressable onPress={handleCancel} accessibilityRole="button">
          <Text
            style={[
              styles.actionText,
              {
                color: tokens.colors.cancel,
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.toolbarWeight,
              },
            ]}
          >
            {cancelButtonText}
          </Text>
        </Pressable>
        {title ? (
          <Text
            style={[
              styles.title,
              {
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                color: tokens.colors.text,
                fontWeight: tokens.typography.toolbarWeight,
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          <View />
        )}
        <Pressable onPress={handleConfirm} accessibilityRole="button">
          <Text
            style={[
              styles.actionText,
              {
                color: tokens.colors.confirm,
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.toolbarWeight,
              },
            ]}
          >
            {confirmButtonText}
          </Text>
        </Pressable>
      </View>
    )
  }

  const wrapperHeight = itemHeight * visibleItemCount
  const maskHeight = (wrapperHeight - itemHeight) / 2

  return (
    <View {...rest} style={[styles.container, { backgroundColor: tokens.colors.background }, style]} testID={testID}>
      {toolbarPosition === 'top' ? renderToolbar() : null}
      <View style={[styles.body, { height: wrapperHeight }]}>
        <View style={styles.columns} pointerEvents={loading ? 'none' : 'auto'}>
          {normalized.columns.map((column, columnIndex) => (
            <PickerColumn
              key={columnIndex}
              columnIndex={columnIndex}
              options={column}
              value={normalized.values[columnIndex]}
          itemHeight={itemHeight}
          visibleItemCount={visibleItemCount}
          optionRender={optionRender}
          readOnly={readOnly}
          onSelect={handleSelect}
          tokens={tokens}
        />
      ))}
          <View
            pointerEvents="none"
            style={[
              styles.indicator,
              {
                top: maskHeight,
                height: itemHeight,
                borderColor: tokens.colors.indicator,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.mask,
              { height: maskHeight, backgroundColor: tokens.colors.mask },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.mask,
              { height: maskHeight, bottom: 0, backgroundColor: tokens.colors.mask },
            ]}
          />
        </View>
        {loading ? (
          <View style={styles.loading}>
            <Loading />
          </View>
        ) : null}
      </View>
      {toolbarPosition === 'bottom' ? renderToolbar() : null}
    </View>
  )
}

Picker.displayName = 'Picker'

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
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
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
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
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
})

export default Picker
