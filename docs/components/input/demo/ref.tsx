import React from "react"

import { Input, type InputInstance } from "react-native-system-ui"

export default function InputRefDemo() {
  const inputRef = React.useRef<InputInstance>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Input
      ref={inputRef}
      label="搜索"
      placeholder="请输入关键词"
      onChangeText={() => {}}
    />
  )
}
