import React from 'react'
import { Picker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const columns = [
  [
    { label: '8:00', value: '0800' },
    { label: '9:00', value: '0900' },
    { label: '10:00', value: '1000' },
  ],
]

export default function PickerToolbarDemo() {
  const [value, setValue] = React.useState(['0800'])

  return (
    <View style={{ gap: 8, padding: 12, backgroundColor: '#f7f8fa' }}>
      <Text style={{ color: '#646566' }}>会议时间：{value[0]}</Text>
      <Picker
        columns={columns}
        value={value}
        onChange={setValue}
        confirmButtonText="完成"
        cancelButtonText="返回"
        toolbarPosition="bottom"
        readOnly={false}
      />
    </View>
  )
}
