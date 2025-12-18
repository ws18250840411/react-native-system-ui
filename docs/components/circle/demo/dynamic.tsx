import React from 'react'

import { Circle, Slider, Space } from 'react-native-system-ui'

export default function CircleDynamicDemo() {
  const [rate, setRate] = React.useState(30)

  return (
    <Space direction="vertical" gap={16}>
      <Circle rate={rate} size={120} strokeWidth={10}>
        {rate}%
      </Circle>
      <Slider value={rate} onChange={value => setRate(value as number)} />
    </Space>
  )
}

