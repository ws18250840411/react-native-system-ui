import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    background="#0f172a"
    tintColor="#f8fafc"
    leftArrow={false}
    rightText="更多"
    onPressRight={() => {}}
  >
    <View style={styles.center}>
      <Text style={styles.title}>沉浸式标题</Text>
      <Text style={styles.subtitle}>自定义居中内容</Text>
    </View>
  </NavBar>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#e2e8f0',
    marginTop: 2,
  },
})
