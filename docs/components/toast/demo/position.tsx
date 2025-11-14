import React from 'react'

import { Button, Toast, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={8}>
    <Space gap={12}>
      <Button size="small" onPress={() => Toast.show({ position: 'top', message: '顶部提示' })}>
        顶部
      </Button>
      <Button size="small" onPress={() => Toast.show({ position: 'middle', message: '中部提示' })}>
        中部
      </Button>
      <Button size="small" onPress={() => Toast.show({ position: 'bottom', message: '底部提示' })}>
        底部
      </Button>
    </Space>
  </Space>
)
