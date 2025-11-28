import React from "react"

import { Switch } from "react-native-system-ui"

export default function SwitchBasicDemo() {
  const [checked, setChecked] = React.useState(true)

  return (
    <Switch
      label={checked ? "通知已开启" : "通知已关闭"}
      checked={checked}
      onChange={setChecked}
    />
  )
}
