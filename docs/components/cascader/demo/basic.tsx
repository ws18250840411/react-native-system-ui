import React from 'react'
import { Text, View } from 'react-native'
import { Cascader } from 'react-native-system-ui'

const options = [
  {
    text: '浙江省',
    value: 'zhejiang',
    children: [
      {
        text: '杭州市',
        value: 'hangzhou',
        children: [
          { text: '西湖区', value: 'xihu' },
          { text: '余杭区', value: 'yuhang' },
        ],
      },
      {
        text: '宁波市',
        value: 'ningbo',
        children: [
          { text: '海曙区', value: 'haishu' },
          { text: '鄞州区', value: 'yinzhou' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: 'jiangsu',
    children: [
      {
        text: '苏州市',
        value: 'suzhou',
        children: [
          { text: '园区', value: 'yuanqu' },
          { text: '吴江区', value: 'wujiang' },
        ],
      },
    ],
  },
]

export default function CascaderBasicDemo() {
  const [value, setValue] = React.useState<string[]>([])
  const [label, setLabel] = React.useState('未选择')

  return (
    <View style={{ gap: 12 }}>
      <Cascader
        options={options}
        value={value}
        onChange={(nextValue, rows) => {
          setValue(nextValue)
          setLabel(rows.map(row => row?.text).filter(Boolean).join(' / ') || '未选择')
        }}
        onFinish={(nextValue, rows) => {
          setValue(nextValue)
          setLabel(rows.map(row => row?.text).filter(Boolean).join(' / '))
        }}
      />
      <Text>当前选择：{label}</Text>
    </View>
  )
}
