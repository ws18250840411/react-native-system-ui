import React from 'react'
import { Image, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12}>
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </Space>
)
