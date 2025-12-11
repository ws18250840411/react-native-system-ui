import React from 'react'
import { View, Text } from 'react-native'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputBasicDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: `输入的密码：${val}` })
  }, [])

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: '#646566' }}>请输入 6 位数字密码</Text>
      <PasswordInput
        value={value}
        onChange={setValue}
        type="number"
        info="输入完成后会自动触发 onSubmit"
        onSubmit={handleSubmit}
      />
    </View>
  )
}
