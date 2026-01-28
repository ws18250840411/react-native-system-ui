import React, { forwardRef } from 'react'
import { View, StyleSheet } from 'react-native'
import type { SwiperItemProps } from './types'

const SwiperItem = forwardRef<View, SwiperItemProps>((props, ref) => {
  const { style, children, testID } = props

  return (
    <View ref={ref} style={[styles.item, style]} testID={testID}>
      {children}
    </View>
  )
})

SwiperItem.displayName = 'SwiperItem'

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
})

export default SwiperItem

