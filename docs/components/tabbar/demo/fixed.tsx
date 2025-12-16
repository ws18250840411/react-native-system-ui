import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { Tabbar, useGestureScroll } from 'react-native-system-ui'

const AnimatedScrollView = Animated.ScrollView

const blocks = Array.from({ length: 12 }).map((_, index) => index + 1)

export default () => {
  const { scrollProps } = useGestureScroll()

  return (
    <View style={styles.wrapper}>
      <AnimatedScrollView {...scrollProps} style={styles.scroll}>
        {blocks.map(block => (
          <View key={block} style={styles.block}>
            <Text style={styles.blockTitle}>内容 {block}</Text>
            <Text style={styles.blockDesc}>描述信息</Text>
          </View>
        ))}
      </AnimatedScrollView>
      <Tabbar fixed placeholder>
        <Tabbar.Item name="tab1">标签名1</Tabbar.Item>
        <Tabbar.Item name="tab2">标签名2</Tabbar.Item>
        <Tabbar.Item name="tab3">标签名3</Tabbar.Item>
      </Tabbar>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 480,
  },
  scroll: {
    flex: 1,
  },
  block: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f6fa',
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  blockDesc: {
    marginTop: 4,
    color: '#6b7280',
  },
})
