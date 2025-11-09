import React from 'react'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <span style={{ color: color ?? '#2563eb' }}>{text}</span>
)

export default () => (
  <Space align="center" divider={<span style={{ color: '#cbd5f5' }}>|</span>}>
    <Link text="Info" />
    <Link text="Edit" />
    <Link text="Delete" color="#dc2626" />
  </Space>
)
