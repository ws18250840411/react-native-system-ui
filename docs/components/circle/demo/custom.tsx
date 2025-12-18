import React from 'react'

import { Circle, Space } from 'react-native-system-ui'

export default function CircleCustomDemo() {
  return (
    <Space gap={16}>
      <Circle rate={40} size={96} strokeWidth={8} color="#07c160">
        40%
      </Circle>
      <Circle rate={80} size={96} strokeWidth={8} color="#ee0a24" clockwise={false}>
        80%
      </Circle>
    </Space>
  )
}

