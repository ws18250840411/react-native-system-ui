import React from 'react'
import { View } from 'react-native'

import { Button, Popup, Space } from 'react-native-system-ui'

const Placeholder = () => (
  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
    <Button type="primary">我是内容</Button>
  </View>
)

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Button onPress={() => setVisible(true)}>安全区域</Button>
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
