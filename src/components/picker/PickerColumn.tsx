import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import type { PickerColumnProps, PickerOption } from './types'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

const PickerColumn: React.FC<PickerColumnProps> = props => {
  const { options, value, onChange, columnHeight, itemHeight } = props
  const scrollRef = React.useRef<ScrollView>(null)
  const getIndex = React.useCallback(
    (val?: PickerOption | PickerOption['value']) => {
      if (val && typeof val === 'object') {
        const option = val as PickerOption
        return options.findIndex(opt => opt.value === option.value)
      }
      return value ? options.findIndex(opt => opt.value === value) : 0
    },
    [options, value],
  )

  const scrollToIndex = React.useCallback(
    (index: number, animated = true) => {
      const y = index * itemHeight
      scrollRef.current?.scrollTo({ y, animated })
    },
    [itemHeight],
  )

  React.useEffect(() => {
    const index = getIndex(value)
    if (index >= 0) {
      scrollToIndex(index, false)
    }
  }, [getIndex, scrollToIndex, value])

  const handleMomentumEnd = (offsetY: number) => {
    const rawIndex = Math.round(offsetY / itemHeight)
    const index = clamp(rawIndex, 0, options.length - 1)
    const option = options[index]
    scrollToIndex(index)
    if (option && option.value !== value) {
      onChange?.(option)
    }
  }

  const placeholderCount = Math.floor((columnHeight - itemHeight) / 2 / itemHeight)

  return (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemHeight}
      decelerationRate="fast"
      onMomentumScrollEnd={event => handleMomentumEnd(event.nativeEvent.contentOffset.y)}
      contentContainerStyle={{ paddingVertical: placeholderCount * itemHeight }}
    >
      {options.map(option => {
        const active = option.value === value
        return (
          <View key={String(option.value)} style={[styles.item, { height: itemHeight }] }>
            <Text style={[styles.text, active && styles.active]}>{option.label}</Text>
          </View>
        )
      })}
    </ScrollView>
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
  active: {
    color: '#111111',
    fontWeight: '600',
  },
})

export default PickerColumn
