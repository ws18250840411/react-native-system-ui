import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(true)

  return (
    <Space direction="vertical" gap={16}>
      <Checkbox checked={checked} onChange={setChecked}>
        我已阅读协议
      </Checkbox>
      <Checkbox defaultChecked={false} disabled>
        禁用状态
      </Checkbox>
    </Space>
  )
}
