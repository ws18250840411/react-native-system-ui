import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '南京', value: 0 },
  { label: '苏州', value: 1 },
  { label: '常州', value: 2 },
  { label: '淮安', value: 3 },
  { label: '扬州', value: 4 },
  { label: '南通', value: 5 },
  { label: '宿迁', value: 6 },
  { label: '泰州', value: 7 },
  { label: '无锡', value: 8 },
  { label: '长沙', value: 9 },
]

export default function PickerBasicDemo() {
  return (
    <Picker
      title="基础使用"
      columns={columns}
      defaultValue={0}
      onChange={(values, opts) => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(`选中值${values[0]}，索引: ${index}`)
        console.log('选中项: ', opts)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
