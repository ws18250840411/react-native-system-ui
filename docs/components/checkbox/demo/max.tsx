import React from 'react'
import { Text } from 'react-native'
import { Checkbox, Space } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  const [value, setValue] = React.useState<string[]>(['email'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group value={value} onChange={setValue} max={2}>
        <Checkbox name="email">邮件通知</Checkbox>
        <Checkbox name="sms">短信通知</Checkbox>
        <Checkbox name="push">推送通知</Checkbox>
        <Checkbox name="phone">电话通知</Checkbox>
      </Checkbox.Group>
      <Text style={{ color: '#666' }}>
        已选：{value.length ? value.join('、') : '暂未选择'}（最多 2 项）
      </Text>
    </Space>
  )
}
