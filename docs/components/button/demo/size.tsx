import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default function ButtonSizeDemo() {
  return (
  <Space direction="vertical" gap={12}>
    <Button text="大型按钮" size="large" block />
    <Button text="普通按钮" />
    <Button text="小型按钮" size="small" />
    <Button text="迷你按钮" size="mini" />
  </Space>
  )
}
