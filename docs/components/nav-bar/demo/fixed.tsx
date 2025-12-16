import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { NavBar, useGestureScroll } from 'react-native-system-ui'

const AnimatedScrollView = Animated.ScrollView

const sections = Array.from({ length: 8 }).map((_, index) => index + 1)

export default () => {
  const { scrollProps } = useGestureScroll()

  return (
    <View style={styles.wrapper}>
      <NavBar fixed placeholder title="标题" rightText="按钮" onPressRight={() => {}} />
      <AnimatedScrollView {...scrollProps} style={styles.scroll}>
        {sections.map(section => (
          <View key={section} style={styles.section}>
            <Text style={styles.sectionTitle}>内容 {section}</Text>
            <Text style={styles.sectionDesc}>描述信息</Text>
          </View>
        ))}
      </AnimatedScrollView>
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
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionDesc: {
    marginTop: 6,
    color: '#6b7280',
  },
})
