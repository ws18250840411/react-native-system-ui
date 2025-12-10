import React from 'react'
import { View, Text } from 'react-native'
import { NumberKeyboard, Cell } from 'react-native-system-ui'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="自定义按键" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="完成"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        deleteButtonText="退格"
        onClose={() => setVisible(false)}
        onBlur={() => setVisible(false)}
      />
    </View>
  )
}
