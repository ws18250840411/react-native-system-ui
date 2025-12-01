import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { Tabs, useGestureScroll } from 'react-native-system-ui'

const AnimatedScrollView = Animated.ScrollView

const sections = Array.from({ length: 6 }).map((_, index) => index + 1)

export default () => {
  const { scrollProps, scrollValue } = useGestureScroll()

  return (
    <AnimatedScrollView {...scrollProps} style={styles.scroll}>
      <Tabs
        sticky
        scrollValue={scrollValue}
        offsetTop={0}
        navRight={<Text style={styles.navRight}>编辑</Text>}
      >
        <Tabs.TabPane title="推荐" name="feed">
          {sections.map(section => (
            <View key={section} style={styles.block}>
              <Text style={styles.blockTitle}>推荐位 {section}</Text>
              <Text style={styles.blockDesc}>吸顶 tabs 会随着滚动保持在顶部。</Text>
            </View>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane title="关注" name="following">
          <View style={styles.block}>
            <Text style={styles.blockDesc}>这里展示您关注的作者与频道。</Text>
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane title="榜单" name="rank">
          <View style={styles.block}>
            <Text style={styles.blockDesc}>榜单内容需要搭配 ScrollView 才能滚动。</Text>
          </View>
        </Tabs.TabPane>
      </Tabs>
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    height: 480,
  },
  navRight: {
    color: '#1989fa',
    fontWeight: '500',
  },
  block: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f5f6f7',
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  blockDesc: {
    marginTop: 6,
    color: '#6b7280',
    lineHeight: 20,
  },
})
