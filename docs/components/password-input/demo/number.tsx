import React from 'react'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputNumberDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: `提交的值：${val}` })
  }, [])

  return (
    <PasswordInput
      type="number"
      value={value}
      onChange={setValue}
      validator={val => /^[0-9]*$/.test(val)}
      info="只允许数字输入"
      onSubmit={handleSubmit}
    />
  )
}
