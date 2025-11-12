import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">Primary</Tag>
    <Tag type="success">Success</Tag>
    <Tag type="warning">Warning</Tag>
    <Tag type="danger">Danger</Tag>
    <Tag>Default</Tag>
  </Space>
)
