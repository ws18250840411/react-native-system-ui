import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="danger">危险</Tag>
    <Tag>默认</Tag>
  </Space>
)
