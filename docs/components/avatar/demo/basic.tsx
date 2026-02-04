import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

function AvatarBasicDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
      <Avatar text="AB" />
      <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
    </Space>
  )
}

export default AvatarBasicDemo
