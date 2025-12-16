import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group defaultValue={[]} direction="horizontal">
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
    </Checkbox.Group>
  )
}
