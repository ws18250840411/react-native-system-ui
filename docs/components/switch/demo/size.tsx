import React from "react"
import { View } from "react-native"

import { Switch } from "react-native-system-ui"

export default function SwitchSizeDemo() {
  const [primary, setPrimary] = React.useState(false)
  const [custom, setCustom] = React.useState(true)

  return (
    <View style={{ gap: 16 }}>
      <Switch label="中型" checked={primary} onChange={setPrimary} />
      <Switch
        size="small"
        label="小型"
        checked={custom}
        onChange={setCustom}
        activeColor="#10b981"
        inactiveColor="#e2e8f0"
      />
    </View>
  )
}
