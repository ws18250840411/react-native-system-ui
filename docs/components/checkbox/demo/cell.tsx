import React from 'react'
import { Checkbox, Cell } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<string[]>([])

  const toggle = (name: string) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group inset>
        <Cell
          clickable
          title="到店自提"
          label="支持指定时间取货"
          onPress={() => toggle('pickup')}
          rightIcon={<Checkbox name="pickup" />}
        />
        <Cell
          clickable
          title="同城配送"
          label="最快 2 小时送达"
          onPress={() => toggle('city')}
          rightIcon={<Checkbox name="city" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
