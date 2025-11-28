import React from 'react'
import { NumberKeyboard } from 'react-native-system-ui'
import { View, Button, Text } from 'react-native'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <View style={{ gap: 16 }}>
      <Button title="自定义按键" onPress={() => setVisible(true)} />
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="关闭"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}
