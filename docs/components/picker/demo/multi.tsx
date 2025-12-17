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
        onChange={vals => {
          const indexes = columns.map((columnOptions, columnIndex) =>
            columnOptions.findIndex(option => option.value === vals[columnIndex])
          )
          Toast.info(`当前值：${vals}，当前索引：${indexes}`)
          setValue(vals)
        }}
      />
    </View>
  )
}
