import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default function ButtonGroupDemo() {
  return (
  <Space direction="vertical" gap={12}>
    <Button.Group type="primary" round>
      <Button text="上一页" />
      <Button text="下一页" />
    </Button.Group>
  </Space>
  )
}
