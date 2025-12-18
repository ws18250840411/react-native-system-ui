import React from 'react'
import { Text, View } from 'react-native'

import { Button, Loading, Overlay } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Button onPress={() => setVisible(true)}>加载中</Button>
      <Overlay
        visible={visible}
        onPress={() => setVisible(false)}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <View style={{ alignItems: 'center' }}>
          <Loading />
          <Text style={{ marginTop: 12, color: '#fff' }}>加载中...</Text>
        </View>
      </Overlay>
    </View>
  )
}
