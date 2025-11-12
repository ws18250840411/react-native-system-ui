import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag color="#7c3aed">定制背景</Tag>
    <Tag color="#ffe1e1" textColor="#ad0000">
      定制文字
    </Tag>
    <Tag color="#7c3aed" plain>
      空心配色
    </Tag>
  </Space>
)
