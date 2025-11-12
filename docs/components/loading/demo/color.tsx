import React from 'react'

import { Loading, Space } from 'react-native-system-ui'

export default () => (
  <Space gap={24}>
    <Loading color="#3b82f6" />
    <Loading type="spinner" color="#f97316" />
  </Space>
)
