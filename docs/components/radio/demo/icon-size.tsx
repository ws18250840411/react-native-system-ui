import React from 'react'
import { Radio } from 'react-native-system-ui'

export default function RadioIconSizeDemo() {
  return (
  <Radio.Group defaultValue="1">
    <Radio name="1" iconSize={24}>
      单选框1
    </Radio>
    <Radio name="2" iconSize={24}>
      单选框2
    </Radio>
  </Radio.Group>
  )
}
