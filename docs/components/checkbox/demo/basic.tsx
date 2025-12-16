import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox checked={checked} onChange={setChecked}>
        复选框
      </Checkbox>
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <Checkbox disabled>禁用复选框</Checkbox>
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </Space>
  )
}
