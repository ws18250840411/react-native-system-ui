import React from 'react'

import { Field } from 'react-native-system-ui'

export default function FieldBasicDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field
      label="文本"
      tooltip="说明文字"
      placeholder="请输入文本"
      description="We must make sure that you are a human."
      value={value}
      onChangeText={setValue}
    />
  )
}
