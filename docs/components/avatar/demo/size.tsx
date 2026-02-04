import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'

function AvatarSizeDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar text="S" size="small" />
      <Avatar text="M" />
      <Avatar text="L" size="large" />
      <Avatar text="48" size={48} />
    </Space>
  )
}

export default AvatarSizeDemo
