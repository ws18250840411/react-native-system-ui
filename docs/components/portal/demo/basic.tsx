import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Portal.Host>
      <Cell.Group>
        <Cell title="显示浮层" isLink onPress={() => setVisible(true)} />
        {visible ? (
          <Portal>
            <View style={styles.layer} pointerEvents="box-none">
              <Pressable style={styles.mask} onPress={() => setVisible(false)} />
              <View style={styles.dialog}>
                <Text style={styles.title}>这里是 Portal 内容</Text>
                <Button type="primary" block onPress={() => setVisible(false)}>
                  我知道了
                </Button>
              </View>
            </View>
          </Portal>
        ) : null}
      </Cell.Group>
    </Portal.Host>
  )
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
  },
  dialog: {
    width: 260,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 18,
  },
})
