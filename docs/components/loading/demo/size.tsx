import React from 'react'

import { Loading, Space } from 'react-native-system-ui'

export default () => (
  <Space gap={24}>
    <Loading size={20} />
    <Loading size={36} type="spinner" />
  </Space>
)
