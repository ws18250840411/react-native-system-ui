import React from 'react'
import { Radio } from 'react-native-system-ui'

export default () => (
  <Radio.Group defaultValue="1">
    <Radio name="1">单选框1</Radio>
    <Radio name="2">单选框2</Radio>
  </Radio.Group>
)
