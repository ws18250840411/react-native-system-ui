import React from 'react'
import { Selector } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const options = [
  { label: '手机', value: 'phone' },
  { label: '电脑', value: 'pc' },
  { label: '耳机', value: 'earbuds' },
  { label: '平板', value: 'pad' },
]

export default function SelectorMultipleDemo() {
  const [value, setValue] = React.useState(['phone'])
  return (
    <View style={{ gap: 16 }}>
      <Text>多选 + 3 列展示</Text>
      <Selector
        options={options}
        multiple
        columns={3}
        value={value}
        onChange={setValue}
      />
    </View>
  )
}
