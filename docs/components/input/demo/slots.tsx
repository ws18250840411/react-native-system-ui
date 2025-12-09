import React from "react"
import { Button, FieldGroup, Input } from "react-native-system-ui"

export default function InputSlotsDemo() {
  const [value, setValue] = React.useState("")

  return (
    <FieldGroup title="插入内容">
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="请输入短信验证码"
        prefix="💁"
        suffix={(
          <Button size="small" type="primary" onPress={() => setValue("")}>
            发送
          </Button>
        )}
      />
    </FieldGroup>
  )
}
