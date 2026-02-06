import React from 'react'
import { Cell, Input } from 'react-native-system-ui'

export default function InputStatusDemo() {
  return (
    <Cell.Group>
      <Input value="只读模式" readOnly />
      <Input value="禁用模式" disabled />
    </Cell.Group>
  )
}
