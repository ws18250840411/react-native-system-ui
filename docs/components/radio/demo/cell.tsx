import React from 'react'
import { Cell, Radio } from 'react-native-system-ui'

export default function RadioCellDemo() {
  const [value, setValue] = React.useState('1')

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Cell.Group inset style={{ marginBottom: 0 }} bodyStyle={{ marginHorizontal: 0 }}>
        <Cell
          clickable
          title="单选框 1"
          onPress={() => setValue('1')}
          rightIcon={<Radio name="1" />}
        />
        <Cell
          clickable
          title="单选框 2"
          onPress={() => setValue('2')}
          rightIcon={<Radio name="2" />}
        />
      </Cell.Group>
    </Radio.Group>
  )
}
