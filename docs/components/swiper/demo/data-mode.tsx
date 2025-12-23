import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const { width } = Dimensions.get('window')

interface SlideItem {
  id: number
  color: string
  title: string
}

const data: SlideItem[] = [
  { id: 1, color: '#ff6b6b', title: '第一张' },
  { id: 2, color: '#4ecdc4', title: '第二张' },
  { id: 3, color: '#45b7d1', title: '第三张' },
  { id: 4, color: '#f9ca24', title: '第四张' },
  { id: 5, color: '#6c5ce7', title: '第五张' },
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.subText}>ID: {item.id}</Text>
          </View>
        )}
        indicator
        autoplay={3000}
        loop
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  slide: {
    width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
})

