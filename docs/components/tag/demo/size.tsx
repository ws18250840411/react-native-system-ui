import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      Mini
    </Tag>
    <Tag type="primary">Small</Tag>
    <Tag size="medium" type="primary">
      Medium
    </Tag>
    <Tag size="large" type="primary">
      Large
    </Tag>
  </Space>
)
