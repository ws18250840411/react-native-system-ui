import React from 'react'
import { View } from 'react-native'

import { Button, Overlay } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Button type="primary" onPress={() => setVisible(true)}>
        显示遮罩
      </Button>
      <Overlay visible={visible} onPress={() => setVisible(false)} />
    </View>
  )
}

