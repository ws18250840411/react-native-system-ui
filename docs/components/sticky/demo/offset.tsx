import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { Sticky, useGestureScroll } from 'react-native-system-ui'

const AnimatedScrollView = Animated.ScrollView

export default () => {
  const { scrollProps, scrollValue } = useGestureScroll()

  return (
    <AnimatedScrollView {...scrollProps} style={styles.scroll}>
      <View style={styles.fakeHeader}>
        <Text style={styles.fakeHeaderText}>自定义偏移（SafeArea 48px）</Text>
      </View>
      <Sticky
        scrollValue={scrollValue}
        offsetTop={48}
        backgroundColor="#fafafa"
        enableShadow={false}
      >
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>吸顶工具栏</Text>
          <Text style={styles.toolbarDesc}>顶部留出 48px 空间</Text>
        </View>
      </Sticky>
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={index} style={styles.block}>
          <Text style={styles.blockText}>Section {index + 1}</Text>
        </View>
      ))}
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    height: 480,
  },
  fakeHeader: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
  },
  fakeHeaderText: {
    color: '#3f51b5',
    fontWeight: '500',
  },
  toolbar: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },
  toolbarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  toolbarDesc: {
    marginTop: 4,
    color: '#8c8c8c',
  },
  block: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#f4f5f7',
  },
  blockText: {
    fontWeight: '500',
  },
})
