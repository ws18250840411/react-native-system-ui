import React from 'react'

import { Avatar, Icon, Space } from 'react-native-system-ui'

export default () => (
  <Space align="center" gap={16}>
    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
    <Avatar text="AB" />
    <Avatar icon={<Icon name="user-o" color="#475569" />} backgroundColor="#e2e8f0" />
  </Space>
)
