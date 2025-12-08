import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const toggleAll = (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => {
    groupRef.current?.toggleAll(options)
  }

  return (
    <Space direction="vertical" gap={12}>
      <Space direction="horizontal" gap={8}>
        <Button size="small" onPress={() => toggleAll(true)}>
          全选
        </Button>
        <Button size="small" onPress={() => toggleAll(false)}>
          取消全选
        </Button>
        <Button size="small" type="primary" onPress={() => toggleAll({ skipDisabled: true })}>
          反选（跳过禁用）
        </Button>
      </Space>

      <Checkbox.Group ref={groupRef} defaultValue={['wechat']}>
        <Checkbox name="wechat">微信通知</Checkbox>
        <Checkbox name="email">邮件通知</Checkbox>
        <Checkbox name="sms">短信通知</Checkbox>
        <Checkbox name="push" disabled>
          推送通知（禁用）
        </Checkbox>
      </Checkbox.Group>
    </Space>
  )
}
