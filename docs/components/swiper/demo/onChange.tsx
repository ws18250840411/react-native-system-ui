import React from 'react'
import { View, Text } from 'react-native'
import { Swiper, Toast } from 'react-native-system-ui'
import { colors, swiperStyles as styles } from './shared'

export default function SwiperOnChangeDemo() {
  return (
    <View style={styles.container}>
      <Swiper
        indicator
        onChange={(index) => Toast.info(`当前索引: ${index}`)}
        style={styles.swiper}
      >
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  )
}
