import React from "react"
import { View } from "react-native"

import { Switch } from "react-native-system-ui"

export default function SwitchStateDemo() {
  const [syncing, setSyncing] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setSyncing(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={{ gap: 12 }}>
      <Switch label="加载中" loading checked={syncing} />
      <Switch label="禁用" disabled defaultChecked={false} />
    </View>
  )
}
