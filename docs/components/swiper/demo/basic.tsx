import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export default () => {
  return (
    <View style={styles.container}>
      <Swiper indicator style={styles.swiper}>
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

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
})
