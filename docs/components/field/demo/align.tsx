import React from 'react'
import { Field, FieldGroup } from 'react-native-system-ui'

export default function FieldAlignDemo() {
  return (
    <FieldGroup>
      <Field
        label="文本"
        placeholder="输入框内容右对齐"
        inputAlign="right"
        center
      />
    </FieldGroup>
  )
}
