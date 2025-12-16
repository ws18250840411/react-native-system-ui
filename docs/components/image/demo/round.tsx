import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <Text style={styles.label}>圆形</Text>
    </View>
    <View style={styles.item}>
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <Text style={styles.label}>自定义圆角</Text>
    </View>
  </Space>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#667085',
  },
})
