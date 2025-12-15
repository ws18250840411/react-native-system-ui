import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

export default () => (
  <Space align="center" gap={16}>
    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
    <Avatar text="AB" />
    <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
  </Space>
)
