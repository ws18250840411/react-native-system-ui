import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Cell, Portal } from 'react-native-system-ui'

const Host: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'web' ? <Portal.Host fixed>{children}</Portal.Host> : <>{children}</>

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.toast}>
          <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
        </View>
      </View>
    )
    keyRef.current = key
    setTimeout(() => {
      Portal.remove(key)
      if (keyRef.current === key) {
        keyRef.current = null
      }
    }, 1500)
  }

  React.useEffect(() => {
    return () => {
      if (keyRef.current !== null) {
        Portal.remove(keyRef.current)
      }
    }
  }, [])

  return (
    <Host>
      <Cell.Group>
        <Cell title="Portal.add 显示提示" isLink onPress={showToast} />
      </Cell.Group>
    </Host>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
})
