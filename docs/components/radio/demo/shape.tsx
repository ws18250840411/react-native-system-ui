import React from 'react'
import { Radio } from 'react-native-system-ui'

export default function RadioShapeDemo() {
  return (
  <Radio.Group defaultValue="1">
    <Radio shape="square" name="1">
      单选框1
    </Radio>
    <Radio shape="square" name="2">
      单选框2
    </Radio>
  </Radio.Group>
  )
}

