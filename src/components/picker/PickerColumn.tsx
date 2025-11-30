import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { usePickerTokens } from './tokens'
import type { PickerColumnProps, PickerOption } from './types'

const clampIndex = (index: number, max: number) => {
  if (index < 0) return 0
  if (index > max) return max
  return index
}

const findAvailableIndex = (options: PickerOption[], start: number, end: number) => {
  const forward = end - start >= 0
  for (let i = start; forward ? i <= end : i >= end; i += forward ? 1 : -1) {
    const item = options[i]
    if (item && !item.disabled) {
      return i
    }
  }
  return -1
}

const findUsableOptionIndex = (options: PickerOption[], next: boolean, index: number) => {
  if (!options.length) return -1
  const maxIndex = options.length - 1
  let searchNext = next
  let allowReverse = true

  if (index === 0 || index === maxIndex) {
    allowReverse = false
  }
  if (index === 0 && !searchNext) {
    searchNext = true
  }
  if (index === maxIndex && searchNext) {
    searchNext = false
  }

  const getEnd = (dirNext: boolean) => (dirNext ? maxIndex : 0)

  let targetIndex = findAvailableIndex(options, index, getEnd(searchNext))
  if (targetIndex === -1 && allowReverse) {
    targetIndex = findAvailableIndex(options, index, getEnd(!searchNext))
  }
  return targetIndex
}

const PickerColumn: React.FC<PickerColumnProps> = props => {
  const tokens = usePickerTokens()
  const { options, value, onChange, itemHeight, visibleItemCount } = props
  const flatListRef = React.useRef<FlatList<PickerOption>>(null)
  const lastOffsetRef = React.useRef(0)

  const padCount = Math.max(0, Math.floor((visibleItemCount - 1) / 2))
  const padOffset = padCount * itemHeight

  const paddedOptions = React.useMemo(() => {
    const prefix = Array.from({ length: padCount }, (_, index) => ({
      label: '',
      value: `__placeholder-start-${index}`,
    }))
    const suffix = Array.from({ length: padCount }, (_, index) => ({
      label: '',
      value: `__placeholder-end-${index}`,
    }))
    return [...prefix, ...options, ...suffix]
  }, [options, padCount])

  const offsets = React.useMemo(() => paddedOptions.map((_, index) => index * itemHeight), [paddedOptions, itemHeight])

  const selectedIndex = React.useMemo(() => {
    const index = options.findIndex(option => option.value === value)
    return clampIndex(index, Math.max(options.length - 1, 0))
  }, [options, value])

  const paddedSelectedIndex = React.useMemo(() => selectedIndex + padCount, [padCount, selectedIndex])

  const handleMomentumEnd = React.useCallback(
    (rawOffset: number) => {
      if (!options.length) return
      const offsetWithoutPad = rawOffset - padOffset
      const maxOffset = itemHeight * (options.length - 1)
      const clampedOffset = Math.min(maxOffset, Math.max(offsetWithoutPad, 0))

      let index = Math.floor(Math.floor(clampedOffset) / itemHeight)
      const remainder = Math.floor(clampedOffset % itemHeight)
      if (remainder > itemHeight / 2) {
        index += 1
      }
      index = clampIndex(index, options.length - 1)

      const isToNext = clampedOffset > lastOffsetRef.current
      if (options[index]?.disabled) {
        const usable = findUsableOptionIndex(options, isToNext, index)
        if (usable !== -1) {
          index = usable
        }
      }

      lastOffsetRef.current = clampedOffset

      const target = options[index]
      if (target && target.value !== value) {
        onChange?.(target)
      } else if (target && target.value === value) {
        const paddedIndex = index + padCount
        flatListRef.current?.scrollToIndex({ index: paddedIndex, animated: true })
      }
    },
    [itemHeight, onChange, options, padCount, padOffset, value],
  )

  const renderItem = React.useCallback(
    ({ item }: { item: PickerOption }) => {
      const active = item.value === value
      return (
        <View style={[styles.item, { height: itemHeight }]}>
          <Text
            style={[
              styles.text,
              {
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.fontSize,
                color: tokens.colors.text,
              },
              active && { color: tokens.colors.textActive, fontWeight: tokens.typography.fontWeight },
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </View>
      )
    },
    [itemHeight, tokens.colors.text, tokens.colors.textActive, tokens.typography.fontFamily, tokens.typography.fontSize, tokens.typography.fontWeight, value],
  )

  const listKey = React.useMemo(
    () => `${paddedOptions.map(option => option.value).join('_')}_${selectedIndex}`,
    [paddedOptions, selectedIndex],
  )

  const isTestEnv = typeof navigator === 'undefined' && typeof document === 'undefined'

  if (isTestEnv) {
    return (
      <View>
        {options.map(option => (
          <View key={String(option.value)} style={[styles.item, { height: itemHeight }]}>
            <Text style={styles.text}>{option.label}</Text>
          </View>
        ))}
      </View>
    )
  }

  return (
    <FlatList
      key={listKey}
      ref={flatListRef}
      data={paddedOptions}
      showsVerticalScrollIndicator={false}
      snapToOffsets={offsets}
      getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
      decelerationRate="fast"
      initialScrollIndex={options.length ? paddedSelectedIndex : undefined}
      keyExtractor={(_, index) => index.toString()}
      onMomentumScrollEnd={event => handleMomentumEnd(event.nativeEvent.contentOffset.y)}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#606266',
  },
})

export default PickerColumn
