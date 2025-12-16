import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const [value, setValue] = React.useState<(string | number)[]>(['a'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group ref={groupRef} value={value} onChange={setValue}>
        <Checkbox name="a">复选框组a</Checkbox>
        <Checkbox name="b">复选框组b</Checkbox>
        <Checkbox name="c">复选框组c</Checkbox>
      </Checkbox.Group>

      <Space direction="horizontal" gap={8}>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll()}>
          反选
        </Button>
      </Space>
    </Space>
  )
}
