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
        <View style={{ alignItems: 'center', padding: 24, borderRadius: 6, backgroundColor: '#ffffff' }}>
          <Loading>加载中...</Loading>
        </View>
      </Overlay>
    </View>
  )
}
