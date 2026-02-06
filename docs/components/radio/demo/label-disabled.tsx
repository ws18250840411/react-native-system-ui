import React from 'react'
import { Radio } from 'react-native-system-ui'

export default function RadioLabelDisabledDemo() {
  return (
  <Radio.Group defaultValue="1">
    <Radio name="1" labelDisabled>
      单选框1
    </Radio>
    <Radio name="2" labelDisabled>
      单选框2
    </Radio>
  </Radio.Group>
  )
}
