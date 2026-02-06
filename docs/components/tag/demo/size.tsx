import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default function TagSizeDemo() {
  return (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      迷你
    </Tag>
    <Tag type="primary">小型</Tag>
    <Tag size="medium" type="primary">
      中等
    </Tag>
    <Tag size="large" type="primary">
      大型
    </Tag>
  </Space>
  )
}
