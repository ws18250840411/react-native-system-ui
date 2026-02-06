import React from 'react'
import { Cell, Dialog } from 'react-native-system-ui'
import { Text, View } from 'react-native'

export default function DialogCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义内容"
        isLink
        onPress={() =>
          Dialog.alert({
            title: '标题',
            closeable: true,
            theme: 'round-button',
            message: (
              <View style={{ alignItems: 'center', margin: 16 }}>
                <Text style={{ textAlign: 'center' }}>
                  自定义内容：代码是写出来给人看的，附带能在机器上运行
                </Text>
              </View>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
