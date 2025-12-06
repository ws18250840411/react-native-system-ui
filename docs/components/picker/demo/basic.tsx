import React from 'react'
import { Picker } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const columns = [
  [
    { label: '南京', value: 'nanjing' },
    { label: '苏州', value: 'suzhou' },
    { label: '常州', value: 'changzhou' },
    { label: '淮安', value: 'huaian' },
    { label: '扬州', value: 'yangzhou' },
    { label: '南通', value: 'nantong' },
    { label: '宿迁', value: 'suqian' },
    { label: '泰州', value: 'taizhou' },
    { label: '无锡', value: 'wuxi' },
    { label: '长沙', value: 'changsha' },
  ],
]

export default function PickerBasicDemo() {
  const [value, setValue] = React.useState(['nanjing'])
  return (
    <View style={{ padding: 12, backgroundColor: '#f7f8fa' }}>
      <Picker
        title="基础使用"
        columns={columns}
        value={value}
        onChange={setValue}
        confirmButtonText="确认"
        cancelButtonText="取消"
        readOnly={false}
      />
    </View>
  )
}
