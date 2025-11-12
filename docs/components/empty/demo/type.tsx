import React from 'react'

import { Empty, Space } from 'react-native-system-ui'

const types: Array<{ key: 'default' | 'error' | 'network' | 'search'; label: string }> = [
  { key: 'default', label: '默认' },
  { key: 'error', label: '错误' },
  { key: 'network', label: '网络' },
  { key: 'search', label: '搜索' },
]

export default () => (
  <Space direction="vertical" gap={16}>
    {types.map(item => (
      <Empty key={item.key} image={item.key} description={`${item.label}状态`} />
    ))}
  </Space>
)
