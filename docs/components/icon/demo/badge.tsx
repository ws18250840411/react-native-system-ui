import React from 'react'

import { Badge, Space } from 'react-native-system-ui'
import { ChatO } from 'react-native-system-icon'

export default function IconBadgeDemo() {
  return (
  <Space gap={20}>
    <Badge dot>
      <ChatO />
    </Badge>
    <Badge content="99+">
      <ChatO />
    </Badge>
  </Space>
  )
}
