import React from 'react'
import { Radio } from 'react-native-system-ui'

export default function RadioDirectionDemo() {
  return (
  <Radio.Group defaultValue="1" direction="horizontal">
    <Radio name="1">单选框1</Radio>
    <Radio name="2">单选框2</Radio>
  </Radio.Group>
  )
}
