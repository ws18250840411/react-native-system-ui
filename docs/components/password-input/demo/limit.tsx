import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputLimitDemo() {
  const [value, setValue] = React.useState('')
  return (
    <PasswordInput
      length={4}
      value={value}
      onChange={setValue}
      info="只允许输入 4 位"
    />
  )
}
