import React from "react"

import { Button, Input } from "react-native-system-ui"

const SlotInputDemo = () => {
  const [value, setValue] = React.useState("")

  return (
    <Input
      label="短信"
      value={value}
      onChangeText={setValue}
      placeholder="请输入短信验证码"
      prefix="💬"
      suffix={(
        <Button size="small" type="primary" onPress={() => setValue("")}>
          发送
        </Button>
      )}
      style={{ marginBottom: 12 }}
    />
  )
}

export default SlotInputDemo
