import React from 'react'
import { Radio } from 'react-native-system-ui'

export default () => (
  <Radio.Group defaultValue="1">
    <Radio name="1" iconSize={24}>
      单选框 1
    </Radio>
    <Radio name="2" iconSize={24}>
      单选框 2
    </Radio>
  </Radio.Group>
)

