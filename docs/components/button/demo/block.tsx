import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default function ButtonBlockDemo() {
  return (
  <Space direction="vertical" gap={12}>
    <Button text="块级按钮" type="primary" block />
    <Button text="块级按钮" type="danger" plain block />
  </Space>
  )
}
