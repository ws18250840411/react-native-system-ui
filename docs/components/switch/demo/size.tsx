import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchSizeDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </Space>
  )
}
