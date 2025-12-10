import React from 'react'
import { View } from 'react-native'
import { Field, NumberKeyboard } from 'react-native-system-ui'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')

  return (
    <View style={{ gap: 12 }}>
      <Field
        label="双向绑定"
        value={value}
        readOnly
        placeholder="点击唤起键盘"
        onClick={() => setVisible(true)}
      />
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
