import React from 'react'
import { Text, View } from 'react-native'
import { Cascader } from 'react-native-system-ui'

const shopOptions = [
  {
    text: '饮品',
    value: 'drink',
    children: [
      { text: '鲜榨果汁', value: 'juice' },
      { text: '气泡水', value: 'soda' },
    ],
  },
  {
    text: '主食',
    value: 'food',
    children: [
      { text: '三明治', value: 'sandwich' },
      { text: '披萨', value: 'pizza' },
    ],
  },
]

export default function CascaderCustomDemo() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Cascader
      options={shopOptions}
      value={value}
      onChange={setValue}
      optionRender={({ option, selected }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text>{option.text}</Text>
          {selected ? <Text style={{ color: '#1989fa' }}>已选</Text> : null}
        </View>
      )}
    />
  )
}
