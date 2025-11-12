import React from 'react'

import { Icon, Space } from 'react-native-system-ui'

export default () => (
  <Space gap={24}>
    <Icon name="loading" spin />
    <Icon name="loading" spin color="#3b82f6" />
    <Icon name="loading" spin rotate={90} />
  </Space>
)
