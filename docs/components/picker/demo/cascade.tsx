import React from 'react'
import { Picker } from 'react-native-system-ui'

const columns = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['2', '2-2', '2-2-2'])

  return (
    <Picker columns={columns} value={value} onChange={setValue} />
  )
}
