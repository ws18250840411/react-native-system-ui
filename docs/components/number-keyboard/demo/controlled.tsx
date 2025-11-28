import React from 'react'
import { NumberKeyboard } from 'react-native-system-ui'
import { View, Button, Text } from 'react-native'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')
  return (
    <View style={{ gap: 12 }}>
      <Text>输入值：{value}</Text>
      <Button title="编辑" onPress={() => setVisible(true)} />
      <NumberKeyboard
        visible={visible}
        value={value}
        maxlength={6}
        onChange={setValue}
        onClose={() => setVisible(false)}
        blurOnClose
      />
    </View>
  )
}
