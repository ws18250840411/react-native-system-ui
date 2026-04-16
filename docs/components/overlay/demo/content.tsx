import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={[styles.center, { pointerEvents: 'box-none' }]}>
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
