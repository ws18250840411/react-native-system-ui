import React from "react"
import { StyleSheet, View } from "react-native"

import { Button, Portal } from "react-native-system-ui"

export default function PortalMultipleDemo() {
  const [firstVisible, setFirstVisible] = React.useState(false)
  const [secondVisible, setSecondVisible] = React.useState(false)

  return (
    <Portal.Host>
      <View style={styles.actions}>
        <Button text="显示提示层" onPress={() => setFirstVisible(true)} />
        <Button text="显示确认层" type="primary" onPress={() => setSecondVisible(true)} />
      </View>

      {firstVisible ? (
        <Portal>
          <View style={[styles.overlay, { backgroundColor: "rgba(15,23,42,0.35)" }]}
          >
            <Button text="关闭提示层" onPress={() => setFirstVisible(false)} />
          </View>
        </Portal>
      ) : null}

      {secondVisible ? (
        <Portal>
          <View style={[styles.overlay, { backgroundColor: "rgba(0,0,0,0.55)" }]}
          >
            <Button text="关闭确认层" type="danger" onPress={() => setSecondVisible(false)} />
          </View>
        </Portal>
      ) : null}
    </Portal.Host>
  )
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
})
