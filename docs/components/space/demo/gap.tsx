import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default function SpaceGapDemo() {
  return (
  <Space gap={20}>
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
  )
}
