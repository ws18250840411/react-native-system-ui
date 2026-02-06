import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Image, Space } from 'react-native-system-ui'

export default function ImageLoadingDemo() {
  return (
  <Space wrap gap={12}>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <Text style={styles.label}>加载提示</Text>
    </View>
    <View style={styles.item}>
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <Text style={styles.label}>失败占位</Text>
    </View>
  </Space>
  )
}

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
