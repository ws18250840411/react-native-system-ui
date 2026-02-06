import { StyleSheet } from 'react-native'

export const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7']

export const swiperStyles = StyleSheet.create({
  container: { height: 200 },
  swiper: { height: 200 },
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
