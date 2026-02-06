import React from 'react'

import { Loading, Space } from 'react-native-system-ui'

export default function LoadingColorDemo() {
  return (
  <Space gap={24}>
    <Loading color="#3b82f6" />
    <Loading color="#f97316" />
  </Space>
  )
}
