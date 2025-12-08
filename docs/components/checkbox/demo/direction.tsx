import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group direction="horizontal" defaultValue={['walk']} gap={16}>
      <Checkbox name="walk">步行</Checkbox>
      <Checkbox name="bike">骑行</Checkbox>
      <Checkbox name="bus">公交</Checkbox>
      <Checkbox name="metro">地铁</Checkbox>
    </Checkbox.Group>
  )
}
