import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '8:00', value: '0800' },
  { label: '9:00', value: '0900' },
  { label: '10:00', value: '1000' },
]

export default function PickerToolbarDemo() {
  return (
    <Picker
      title="会议时间"
      columns={columns}
      defaultValue="0800"
      confirmButtonText="完成"
      cancelButtonText="返回"
      toolbarPosition="bottom"
      onChange={values => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(`选中值${values[0]}，索引: ${index}`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
