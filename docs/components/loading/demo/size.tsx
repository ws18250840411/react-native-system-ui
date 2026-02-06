import React from 'react'

import { Loading, Space } from 'react-native-system-ui'

export default function LoadingSizeDemo() {
  return (
  <Space gap={24}>
    <Loading size={20} />
    <Loading size={28} />
  </Space>
  )
}
