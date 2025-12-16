import React from 'react'
import { Text } from 'react-native'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <Text style={{ color: color ?? '#2563eb' }}>{text}</Text>
)

export default () => (
  <Space align="center" divider={<Text style={{ color: '#cbd5f5' }}>|</Text>}>
    <Link text="信息" />
    <Link text="编辑" />
    <Link text="删除" color="#dc2626" />
  </Space>
)
