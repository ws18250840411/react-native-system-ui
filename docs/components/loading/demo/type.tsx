import React from 'react'

import { Loading, Space } from 'react-native-system-ui'

export default function LoadingTypeDemo() {
  return (
  <Space gap={24} direction="horizontal" align="center">
    <Loading />
    <Loading size={20} />
    <Loading size={40} />
  </Space>
  )
}
