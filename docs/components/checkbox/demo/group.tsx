import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => {
  const [value, setValue] = React.useState<string[]>(['apple'])

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox name="apple">苹果</Checkbox>
      <Checkbox name="banana">香蕉</Checkbox>
      <Checkbox name="orange">橙子</Checkbox>
    </Checkbox.Group>
  )
}
