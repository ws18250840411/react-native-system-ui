import React, { useRef } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Swiper, Button } from 'react-native-system-ui'
import type { SwiperInstance } from 'react-native-system-ui'

const { width } = Dimensions.get('window')

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  const swiperRef = useRef<SwiperInstance>(null)

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} indicator>
        {colors.map((color, index) => (
          <Swiper.Item key={index}>
            <View style={[styles.slide, { backgroundColor: color }]}>
              <Text style={styles.text}>{index + 1}</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
      <View style={styles.controls}>
        <Button
          size="small"
          text="上一张"
          onPress={() => {
            swiperRef.current?.swipePrev()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="下一张"
          onPress={() => {
            swiperRef.current?.swipeNext()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="第一张"
          onPress={() => {
            swiperRef.current?.goToFirstIndex()
          }}
        />
        <View style={styles.spacer} />
        <Button
          size="small"
          text="最后一张"
          onPress={() => {
            swiperRef.current?.goToLastIndex()
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  slide: {
    width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 8,
  },
})

