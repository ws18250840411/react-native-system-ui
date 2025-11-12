import React from 'react'

import { Badge, Space } from 'react-native-system-ui'

export default () => (
  <Space gap={12}>
    <Badge content="20" />
    <Badge content="200" max="99" />
    <Badge dot color="#f97316" />
  </Space>
)
