import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

