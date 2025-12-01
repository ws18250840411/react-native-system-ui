import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { Sticky, Switch, useGestureScroll } from 'react-native-system-ui'

const AnimatedScrollView = Animated.ScrollView

export default () => {
  const { scrollProps, scrollValue } = useGestureScroll()
  const [disabled, setDisabled] = React.useState(false)

  return (
    <AnimatedScrollView {...scrollProps} style={styles.scroll}>
      <Sticky scrollValue={scrollValue} disabled={disabled}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>动态开关</Text>
          <Switch
            checked={!disabled}
            onChange={checked => setDisabled(!checked)}
            label={disabled ? '已关闭' : '已开启'}
            labelPosition="left"
          />
        </View>
      </Sticky>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>内容区块 {index + 1}</Text>
        </View>
      ))}
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    height: 400,
  },
  panel: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#f7f8fa',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
})
