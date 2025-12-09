import React from "react"
import { Button, Field } from "react-native-system-ui"
import type { FieldInstance } from "react-native-system-ui"

export default function FieldRefDemo() {
  const ref = React.useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={ref}
      label="文本"
      placeholder="请输入文本"
      suffix={
        <Button size="small" onPress={() => ref.current?.focus()}>
          聚焦
        </Button>
      }
    />
  )
}
