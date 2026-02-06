import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default function SpaceWrapDemo() {
  return (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="按钮" key={index} />
    ))}
  </Space>
  )
}
