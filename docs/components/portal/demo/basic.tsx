import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { Button, Portal } from "react-native-system-ui"

export default function PortalBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <Portal.Host>
      <Button text="打开浮层" type="primary" onPress={() => setVisible(true)} />
      {visible ? (
        <Portal>
          <View style={styles.overlay}>
            <View style={styles.card}>
              <Text style={styles.title}>这里是 Portal 内容</Text>
              <Button text="关闭" onPress={() => setVisible(false)} />
            </View>
          </View>
        </Portal>
      ) : null}
    </Portal.Host>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 260,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
})
