import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperCustomIndicatorDemo() {
  return (
    <View style={swiperStyles.container}>
      <Swiper
        indicator={(total, current) => (
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              {current + 1} / {total}
            </Text>
          </View>
        )}
        style={swiperStyles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
  },
})
