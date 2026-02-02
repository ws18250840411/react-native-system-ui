import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchColorDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch
        activeColor="#ee0a24"
        inactiveColor="#dcdee0"
        defaultChecked
      />
    </Space>
  )
}
