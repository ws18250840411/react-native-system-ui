import React, { useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'
import { colors, swiperStyles } from './shared'

export default function SwiperRefDemo() {
  const swiperRef = useRef<SwiperInstance>(null)
  const lastIndex = colors.length - 1

  return (
    <View style={styles.wrapper}>
      <Swiper ref={swiperRef} indicator style={swiperStyles.swiper}>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[swiperStyles.slide, { backgroundColor: color }]}>
              <Text style={swiperStyles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button size="small" text="上一张" onPress={() => swiperRef.current?.swipePrev()} />
        <View style={styles.spacer} />
        <Button size="small" text="下一张" onPress={() => swiperRef.current?.swipeNext()} />
        <View style={styles.spacer} />
        <Button size="small" text="第一张" onPress={() => swiperRef.current?.swipeTo(0)} />
        <View style={styles.spacer} />
        <Button size="small" text="最后一张" onPress={() => swiperRef.current?.swipeTo(lastIndex)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { width: 8 },
})
