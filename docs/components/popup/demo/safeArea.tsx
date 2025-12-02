import React from 'react'
import { View } from 'react-native'

import { Button, Popup, Cell } from 'react-native-system-ui'

const Placeholder = () => (
  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
    <Button type="primary">我是内容</Button>
  </View>
)

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group title="安全区域">
        <Cell title="底部安全区域" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
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
