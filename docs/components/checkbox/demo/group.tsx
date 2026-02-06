import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxGroupDemo() {
  return (
    <Checkbox.Group defaultValue={['a', 'b']} onChange={v => console.log(v)}>
      <Checkbox name="a">复选框组a</Checkbox>
      <Checkbox name="b">复选框组b</Checkbox>
      <Checkbox name="c">复选框组c</Checkbox>
    </Checkbox.Group>
  )
}
