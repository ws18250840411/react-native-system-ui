import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  FlatList,
  Platform,
  View,
  StyleSheet,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'

import { clamp } from '../../utils'
import type { PickerOption } from './types'

const findEnabledIndex = (options: PickerOption[], startIndex: number) => {
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

const adjustIndex = (index: number, options: PickerOption[]) => {
  const total = options.length
  if (!total) return 0
  const i = clamp(index, 0, total - 1)
  const next = findEnabledIndex(options, i)
  return next >= 0 ? next : i
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 3,
  },
})

type WheelPickerRender<T> = (
  item: T,
  index: number,
  meta: { active: boolean; disabled: boolean }
) => React.ReactNode

type WheelPickerItemProps<T> = {
  item: T
  index: number
  itemHeight: number
  active: boolean
  disabled: boolean
  renderItem: WheelPickerRender<T>
}

const WheelPickerItemInner = <T extends PickerOption>({
  item,
  index,
  itemHeight,
  active,
  disabled,
  renderItem,
}: WheelPickerItemProps<T>) => {
  const content = renderItem(item, index, { active, disabled })
  return (
    <View style={[styles.option, { height: itemHeight }]}>
      {content}
    </View>
  )
}

const WheelPickerItem = React.memo(
  WheelPickerItemInner,
  (prev, next) =>
    prev.item === next.item &&
    prev.index === next.index &&
    prev.itemHeight === next.itemHeight &&
    prev.active === next.active &&
    prev.disabled === next.disabled &&
    prev.renderItem === next.renderItem
) as <T extends PickerOption>(props: WheelPickerItemProps<T>) => React.JSX.Element

export type WheelPickerProps<T extends PickerOption = PickerOption> = {
  data: T[]
  selectedIndex: number
  onChange: (index: number) => void
  onInteractStart?: () => void
  onInteractEnd?: () => void
  renderItem: WheelPickerRender<T>
  itemHeight: number
  visibleRest: number
  readOnly?: boolean
  indicatorColor: string
  decelerationRate?: 'normal' | 'fast' | number
  scrollEventThrottle?: number
  swipeDuration?: number
}

const WheelPickerInner = <T extends PickerOption,>({
  data,
  selectedIndex,
  onChange,
  onInteractStart,
  onInteractEnd,
  renderItem,
  itemHeight,
  visibleRest,
  readOnly,
  indicatorColor,
  decelerationRate = Platform.OS === 'android' ? 0.99 : 'fast',
  scrollEventThrottle = 16,
}: WheelPickerProps<T>) => {
  const listRef = useRef<FlatList<T>>(null)
  const isMomentumRef = useRef(false)
  const endDragTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    return () => {
      if (endDragTimerRef.current) {
        clearTimeout(endDragTimerRef.current)
        endDragTimerRef.current = null
      }
    }
  }, [])

  const selectedIndexRef = useRef(0)
  const total = data.length
  const safeSelectedIndex = adjustIndex(selectedIndex, data)
  const visibleCount = visibleRest * 2 + 1
  const paddingHeight = visibleRest * itemHeight
  const containerHeight = itemHeight * visibleCount
  const batchSize = Math.max(visibleCount * 3, 15)

  const indicatorStyle = useMemo(
    () => [styles.indicator, { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor }],
    [itemHeight, visibleRest, indicatorColor]
  )

  const scrollToIndex = useCallback(
    (index: number, animated: boolean) => {
      const offset = index * itemHeight
      listRef.current?.scrollToOffset({ offset, animated })
    },
    [itemHeight],
  )

  useEffect(() => {
    if (!total) return
    scrollToIndex(safeSelectedIndex, false)
  }, [safeSelectedIndex, scrollToIndex, total])

  useEffect(() => {
    selectedIndexRef.current = safeSelectedIndex
  }, [safeSelectedIndex])

  const emitIndexFromOffset = useCallback(
    (offsetY: number, animated: boolean) => {
      if (!total || readOnly) return
      const rawIndex = Math.round(offsetY / itemHeight)
      const nextIndex = adjustIndex(rawIndex, data)
      const targetOffset = nextIndex * itemHeight
      if (Math.abs(targetOffset - offsetY) > 0.5) {
        scrollToIndex(nextIndex, animated)
      }
      if (nextIndex !== safeSelectedIndex) {
        onChange(nextIndex)
      }
    },
    [data, itemHeight, onChange, readOnly, safeSelectedIndex, scrollToIndex, total],
  )

  const renderWheelItem = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <WheelPickerItem
        item={item}
        index={index}
        itemHeight={itemHeight}
        active={index === selectedIndexRef.current}
        disabled={!!item.disabled}
        renderItem={renderItem}
      />
    ),
    [itemHeight, renderItem],
  )

  return (
    <View
      style={[styles.column, { height: containerHeight }]}
      collapsable={false}
    >
      <View style={indicatorStyle} pointerEvents="none" />
      <FlatList
        ref={listRef}
        data={data}
        extraData={safeSelectedIndex}
        keyExtractor={(item, index) => `${index}-${String(item.value ?? '')}`}
        renderItem={renderWheelItem}
        contentContainerStyle={{ paddingVertical: paddingHeight }}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: paddingHeight + itemHeight * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={scrollEventThrottle}
        decelerationRate={decelerationRate}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        bounces={false}
        overScrollMode="never"
        windowSize={7}
        initialNumToRender={batchSize}
        maxToRenderPerBatch={batchSize}
        updateCellsBatchingPeriod={16}
        removeClippedSubviews={Platform.OS === 'android'}
        onScrollBeginDrag={() => {
          if (readOnly) return
          isMomentumRef.current = false
          if (endDragTimerRef.current) {
            clearTimeout(endDragTimerRef.current)
            endDragTimerRef.current = null
          }
          onInteractStart?.()
        }}
        onMomentumScrollBegin={() => {
          if (readOnly) return
          isMomentumRef.current = true
          if (endDragTimerRef.current) {
            clearTimeout(endDragTimerRef.current)
            endDragTimerRef.current = null
          }
          onInteractStart?.()
        }}
        onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (readOnly || isMomentumRef.current) return
          if (endDragTimerRef.current) {
            clearTimeout(endDragTimerRef.current)
          }
          endDragTimerRef.current = setTimeout(() => {
            if (isMomentumRef.current) return
            emitIndexFromOffset(e.nativeEvent.contentOffset.y, true)
            onInteractEnd?.()
          }, 240)
        }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (readOnly) return
          isMomentumRef.current = false
          emitIndexFromOffset(e.nativeEvent.contentOffset.y, false)
          onInteractEnd?.()
        }}
        scrollEnabled={!readOnly}
      />
    </View>
  )
}

const WheelPicker = React.memo(WheelPickerInner) as typeof WheelPickerInner

export default WheelPicker
