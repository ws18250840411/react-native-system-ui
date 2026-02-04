import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Cell, Portal } from 'react-native-system-ui'

export default function PortalMultipleDemo() {
  const [tipVisible, setTipVisible] = React.useState(false)
  const [confirmVisible, setConfirmVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="显示提示层" isLink onPress={() => setTipVisible(true)} />
      <Cell title="显示确认层" isLink onPress={() => setConfirmVisible(true)} />

      {(tipVisible || confirmVisible) && (
        <Portal>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
            {tipVisible ? (
              <View style={[styles.toast, styles.tipToast]}>
                <Text style={styles.toastText}>这里是提示层</Text>
                <Button size="mini" onPress={() => setTipVisible(false)}>
                  关闭提示层
                </Button>
              </View>
            ) : null}
            {confirmVisible ? (
              <View style={[styles.toast, styles.confirmToast]}>
                <Text style={styles.toastText}>这里是确认层</Text>
                <Button size="mini" type="primary" onPress={() => setConfirmVisible(false)}>
                  关闭确认层
                </Button>
              </View>
            ) : null}
          </View>
        </Portal>
      )}
    </Cell.Group>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
    gap: 12,
    alignItems: 'flex-start',
  },
  tipToast: {
    top: 120,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  confirmToast: {
    top: 200,
    backgroundColor: '#1d4ed8',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
})
