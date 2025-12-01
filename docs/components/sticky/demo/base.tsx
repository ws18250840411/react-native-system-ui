import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { Sticky, useGestureScroll } from 'react-native-system-ui'

const ITEMS = Array.from({ length: 12 }).map((_, index) => index + 1)

const AnimatedScrollView = Animated.ScrollView

export default () => {
  const { scrollProps, scrollValue } = useGestureScroll()

  return (
    <AnimatedScrollView {...scrollProps} style={styles.scroll}>
      <Sticky scrollValue={scrollValue}>
        <View style={styles.nav}>
          <Text style={styles.navTitle}>置顶导航</Text>
          <Text style={styles.navDesc}>滚动后保持在顶部</Text>
        </View>
      </Sticky>
      {ITEMS.map(item => (
        <View key={item} style={styles.card}>
          <Text style={styles.cardTitle}>卡片 {item}</Text>
          <Text style={styles.cardDesc}>这是 Sticky 组件的基础示例，向下滑动查看吸顶效果。</Text>
        </View>
      ))}
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    height: 480,
  },
  nav: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  navDesc: {
    marginTop: 4,
    color: '#666666',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f6fa',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardDesc: {
    marginTop: 6,
    color: '#6f6f6f',
    lineHeight: 20,
  },
})
