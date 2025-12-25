import React from 'react'
import { View, Text } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
