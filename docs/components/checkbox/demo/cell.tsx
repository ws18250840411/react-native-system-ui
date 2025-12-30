import React from 'react'
import { Checkbox, Cell, type CheckboxValue } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<CheckboxValue[]>([])

  const toggle = (name: CheckboxValue) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group>
        <Cell
          clickable
          title="单选框1"
          onPress={() => toggle('a')}
          rightIcon={<Checkbox name="a" />}
        />
        <Cell
          clickable
          title="单选框2"
          onPress={() => toggle('b')}
          rightIcon={<Checkbox name="b" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
