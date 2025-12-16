import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  return (
    <Checkbox.Group defaultValue={[]} max={2}>
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
      <Checkbox name="c">复选框c</Checkbox>
    </Checkbox.Group>
  )
}
