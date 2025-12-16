import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  { label: '选项一', description: '描述信息', value: '1' },
  { label: '选项二', description: '描述信息', value: '2' },
]

export default function SelectorDescriptionDemo() {
  return <Selector options={options} />
}

