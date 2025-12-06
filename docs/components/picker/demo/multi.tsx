import React from 'react'
import { Picker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const columns = [
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
    { label: '晚上', value: 'night' },
  ],
  {
    options: [
      { label: '北京', value: 'bj' },
      { label: '上海', value: 'sh' },
      { label: '深圳', value: 'sz' },
    ],
    defaultValue: 'sh',
  },
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState(['am', 'sh'])

  return (
    <View style={{ gap: 8, padding: 12, backgroundColor: '#f7f8fa' }}>
      <Text style={{ color: '#646566' }}>当前：{value.join(' / ')}</Text>
      <Picker
        columns={columns}
        value={value}
        onChange={setValue}
        confirmButtonText="确定"
        cancelButtonText="取消"
        readOnly={false}
      />
    </View>
  )
}
