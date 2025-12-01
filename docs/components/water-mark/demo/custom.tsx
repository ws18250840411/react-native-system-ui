import React from 'react'
import { WaterMark, Typography } from 'react-native-system-ui'
import { View, StyleSheet } from 'react-native'

export default () => (
  <View style={{ padding: 16, height: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
    <Typography.Title level={5}>保密文档</Typography.Title>
    <Typography.Text>示例内容，展示局部水印。</Typography.Text>
    <WaterMark
      content="CONFIDENTIAL"
      fullPage={false}
      fontSize={12}
      opacity={0.1}
      rotate={-15}
      style={StyleSheet.absoluteFill}
    />
  </View>
)
