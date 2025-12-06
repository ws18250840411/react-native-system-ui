import React from 'react'
import { StyleSheet, Text, View, Animated, FlatList, Pressable, Platform } from 'react-native'

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

type WheelPickerRender<T> = (item: T | null, index: number) => React.ReactNode

type WheelPickerProps<T> = {
  data: T[]
  selectedIndex: number
  onChange: (index: number) => void
  renderItem: WheelPickerRender<T>
  itemHeight: number
  visibleRest: number
  readOnly?: boolean
  indicatorColor: string
  decelerationRate?: 'normal' | 'fast' | number
  scrollEventThrottle?: number
}

const WheelPicker = <T,>({
  data,
  selectedIndex,
  onChange,
  renderItem,
  itemHeight,
  visibleRest,
  readOnly,
  indicatorColor,
  decelerationRate = 'fast',
  scrollEventThrottle = 16,
}: WheelPickerProps<T>) => {
  const flatListRef = React.useRef<FlatList<T | null>>(null)
  const scrollY = React.useRef(new Animated.Value(0)).current
  const useNativeDriver = Platform.OS !== 'web'

  if (!data.length) {
    // 空数据时渲染占位，避免 FlatList initialScrollIndex 报错
    return (
      <View style={[styles.column, { height: itemHeight * (visibleRest * 2 + 1) }]}>
        <View
          style={[
            styles.indicator,
            { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor },
          ]}
          pointerEvents="none"
        />
      </View>
    )
  }

  const paddedData = React.useMemo(() => {
    const arr: (T | null)[] = [...data]
    for (let i = 0; i < visibleRest; i += 1) {
      arr.unshift(null)
      arr.push(null)
    }
    return arr
  }, [data, visibleRest])

  const offsets = React.useMemo(
    () => paddedData.map((_, i) => i * itemHeight),
    [paddedData, itemHeight]
  )

  const interpRange = React.useMemo(() => {
    const r = [0]
    for (let i = 1; i <= visibleRest + 1; i += 1) {
      r.unshift(-i)
      r.push(i)
    }
    return r
  }, [visibleRest])

  const currentScrollIndex = React.useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [scrollY, itemHeight, visibleRest]
  )

  const handleMomentumScrollEnd = (e: any) => {
    const max = itemHeight * Math.max(data.length - 1, 0)
    const offsetY = Math.min(max, Math.max(e?.nativeEvent?.contentOffset?.y ?? 0, 0))
    let index = Math.floor(offsetY / itemHeight)
    if (offsetY % itemHeight > itemHeight / 2) index += 1
    index = Math.max(0, Math.min(index, data.length - 1))
    if (index !== selectedIndex) onChange(index)
  }

  React.useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: Math.max(0, Math.min(selectedIndex, data.length ? data.length - 1 : 0)),
      animated: false,
    })
  }, [data.length, selectedIndex])

  const renderWheelItem = React.useCallback(
    ({ item, index }: { item: T | null; index: number }) => {
      const relative = Animated.subtract(index, currentScrollIndex)
      const opacity = relative.interpolate({
        inputRange: interpRange,
        outputRange: interpRange.map(x => Math.pow(1 / 3, Math.abs(x))),
      })
      const scale = relative.interpolate({
        inputRange: interpRange,
        outputRange: interpRange.map(x => (x === 0 ? 1 : 1 - 0.08 * Math.abs(x))),
      })

      return (
        <Animated.View
          style={[
            styles.option,
            {
              height: itemHeight,
              opacity,
              transform: [{ scale }],
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {renderItem(item, index - visibleRest)}
        </Animated.View>
      )
    },
    [currentScrollIndex, interpRange, itemHeight, renderItem, visibleRest]
  )

  return (
    <View style={[styles.column, { height: itemHeight * (visibleRest * 2 + 1) }]}>
      <View
        style={[
          styles.indicator,
          { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor },
        ]}
        pointerEvents="none"
      />
      <Animated.FlatList
        ref={flatListRef}
        data={paddedData}
        keyExtractor={(item, i) => `wheel-${(item as any)?.value ?? i}`}
        renderItem={renderWheelItem}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver,
        })}
        scrollEventThrottle={scrollEventThrottle}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        initialScrollIndex={Math.max(0, Math.min(selectedIndex, paddedData.length - 1))}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        scrollEnabled={!readOnly}
        nestedScrollEnabled
        removeClippedSubviews
      />
    </View>
  )
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
    decelerationRate,
    scrollEventThrottle,
  } = props
  const restVisible = Math.max(1, Math.floor((visibleItemCount - 1) / 2))

  const selectedIndex = React.useMemo(() => {
    if (!options.length) return 0
    const idx = options.findIndex(option => option.value === value)
    return findEnabledIndex(options, idx >= 0 ? idx : 0)
  }, [options, value])

  const handleChange = React.useCallback(
    (index: number) => {
      const target = findEnabledIndex(options, index)
      const option = options[target]
      if (!option || option.disabled) return
      onSelect(option, columnIndex, target)
    },
    [columnIndex, onSelect, options],
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
        indicatorColor={tokens.colors.indicator}
        decelerationRate={decelerationRate}
        scrollEventThrottle={scrollEventThrottle}
        renderItem={item => {
          if (!item) return null
          const active = item.value === value
          const disabled = !!item.disabled
          const textColor = disabled
            ? tokens.colors.textDisabled
            : active
              ? tokens.colors.text
              : tokens.colors.textMuted
          const content = optionRender ? optionRender(item, { columnIndex, active }) : item.label ?? item.value
          return (
            <View
              style={{
                opacity: disabled ? 0.5 : 1,
                minHeight: itemHeight,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {typeof content === 'string' || typeof content === 'number' ? (
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
                  {content}
                </Text>
              ) : (
                content
              )}
            </View>
          )
        }}
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
    decelerationRate = 'fast',
    scrollEventThrottle = 16,
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
