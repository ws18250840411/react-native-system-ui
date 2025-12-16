import React from 'react'
import { View } from 'react-native'

import { Button, Popup, Cell } from 'react-native-system-ui'

const Placeholder = () => (
  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
    <Button type="primary">内容</Button>
  </View>
)

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell title="底部安全区域" isLink onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        placement="bottom"
        safeAreaInsetBottom
        onClose={() => setVisible(false)}
      >
        <Placeholder />
      </Popup>
    </>
  )
}
