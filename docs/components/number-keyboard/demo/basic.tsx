import React from 'react'
import { NumberKeyboard } from 'react-native-system-ui'
import { View, Button } from 'react-native'

export default function NumberKeyboardBasicDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('')
  return (
    <View style={{ gap: 16 }}>
      <Button title="打开数字键盘" onPress={() => setVisible(true)} />
      <NumberKeyboard
        visible={visible}
        title="请输入金额"
        value={value}
        onChange={setValue}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}
