import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { Button, Portal } from "react-native-system-ui"

export default function PortalStaticDemo() {
  const keyRef = React.useRef<number | null>(null)

  const showToast = () => {
    const key = Portal.add(
      <View style={styles.toast}>
        <Text style={styles.toastText}>通过 Portal.add 插入节点</Text>
      </View>,
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
    <Portal.Host>
      <Button text="Portal.add 显示提示" type="success" onPress={showToast} />
    </Portal.Host>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  toastText: {
    color: "#fff",
    textAlign: "center",
  },
})
