import React from 'react'
import { Picker, Toast, type PickerOption, type PickerValue } from 'react-native-system-ui'
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

const brandColor = '#1989fa'

export default function PickerBasicDemo() {
  const [value, setValue] = React.useState(['nanjing'])

  const optionRender = React.useCallback((option: PickerOption, { active }: { columnIndex: number; active: boolean }) => {
    const color = active ? brandColor : '#323233'
    const fontWeight = active ? '600' : '400'
    return (
      <Text style={{ color, fontWeight }}>
        {option.label}
      </Text>
    )
  }, [])

  const handleConfirm = React.useCallback((vals: PickerValue[], opts: (PickerOption | undefined)[]) => {
    Toast.show({ message: `已选：${opts.map(o => o?.label ?? o?.value).join(' / ')}` })
  }, [])

  return (
    <View style={{ padding: 12, backgroundColor: '#f7f8fa' }}>
      <Picker
        title="基础使用"
        columns={columns}
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        optionRender={optionRender}
        debug
        confirmButtonText="确认"
        cancelButtonText="取消"
        readOnly={false}
      />
    </View>
  )
}
