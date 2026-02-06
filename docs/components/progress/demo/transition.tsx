import React from 'react'

import { Button, Progress, Space } from 'react-native-system-ui'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export default function ProgressTransitionDemo() {
  const [value, setValue] = React.useState(50)

  const update = (delta: number) => {
    setValue(current => clamp(current + delta, 0, 100))
  }

  return (
    <Space direction="vertical" gap={12}>
      <Progress percentage={value} transition animationDuration={300} />
      <Space gap={12}>
        <Button size="small" onPress={() => update(-10)}>
          减少
        </Button>
        <Button size="small" type="primary" onPress={() => update(10)}>
          增加
        </Button>
      </Space>
    </Space>
  )
}
