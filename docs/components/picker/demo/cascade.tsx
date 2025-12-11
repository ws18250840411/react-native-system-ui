import React from 'react'
import { Picker, Toast, type PickerOption, type PickerValue } from 'react-native-system-ui'
import { View, Text } from 'react-native'

const columns = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [
          { label: '鄞州区', value: 'yinzhou' },
          { label: '海曙区', value: 'haishu' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '秦淮区', value: 'qinhuai' },
          { label: '鼓楼区', value: 'gulou' },
        ],
      },
      {
        label: '苏州市',
        value: 'suzhou',
        children: [
          { label: '姑苏区', value: 'gusu' },
          { label: '吴中区', value: 'wuzhong' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<PickerValue[]>(['zhejiang', 'hangzhou', 'xihu'])

  const handleConfirm = React.useCallback((vals: PickerValue[], opts: (PickerOption | undefined)[]) => {
    Toast.show({ message: `已选：${opts.map(o => o?.label ?? o?.value).join(' / ')}` })
  }, [])

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: '#646566' }}>当前：{value.join(' / ')}</Text>
      <Picker
        columns={columns}
        value={value}
        onChange={setValue}
        onConfirm={handleConfirm}
        debug
        confirmButtonText="确定"
        cancelButtonText="取消"
        readOnly={false}
      />
    </View>
  )
}
