import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Swiper } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
]

export default () => {
  return (
    <View style={styles.container}>
      <Swiper autoplay={3000} indicator style={styles.swiper}>
        {images.map((uri) => (
          <Swiper.Item key={uri}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
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
  image: {
    width: '100%',
    height: '100%',
  },
})


