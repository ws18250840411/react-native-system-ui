import React from 'react'

import { Cell, Switch } from 'react-native-system-ui'

export default function SwitchCellDemo() {
  return (
    <Cell
      center
      title="标题"
      rightIcon={
        <Switch
          size={24}
          defaultChecked
          onChange={checked => console.log(`switch to ${checked}`)}
        />
      }
    />
  )
}
