import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputGutterDemo() {
  const [value, setValue] = React.useState('')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      gutter={12}
      length={6}
      info="格子之间增加间距"
    />
  )
}
