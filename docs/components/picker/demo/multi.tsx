import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'
import { View } from 'react-native'

const createOptions = (labels: string[]): PickerOption[] => labels.map(label => ({ label, value: label }))

const columns = [
  createOptions(['周一', '周二', '周三', '周四', '周五']),
  createOptions(['上午', '下午', '晚上']),
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['周二', '晚上'])

  return (
    <View>
      <Picker
        columns={columns}
        value={value}
        onChange={setValue}
        onConfirm={vals => Toast.info(`值：${vals.join(' / ')}`)}
      />
    </View>
  )
}
