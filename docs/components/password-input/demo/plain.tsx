import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputPlainDemo() {
  const [value, setValue] = React.useState('123')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      mask={false}
      highlightTextStyle={{ color: '#1989fa' }}
      info="明文展示并高亮当前字符"
    />
  )
}
