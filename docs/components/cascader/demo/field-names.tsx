import React from 'react'
import { View } from 'react-native'
import { Cascader, CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: 'A 省',
    code: 'a',
    items: [
      {
        label: 'A-1 市',
        code: 'a1',
        items: [
          { label: 'A-1-1 区', code: 'a11' },
          { label: 'A-1-2 区', code: 'a12', disabled: true },
        ],
      },
    ],
  },
  {
    label: 'B 省',
    code: 'b',
    items: [
      {
        label: 'B-1 市',
        code: 'b1',
        items: [
          { label: 'B-1-1 区', code: 'b11' },
        ],
      },
    ],
  },
]

export default function CascaderFieldNamesDemo() {
  const [value, setValue] = React.useState<string[]>(['a'])

  return (
    <View>
      <Cascader
        options={regions as unknown as CascaderOption[]}
        value={value}
        onChange={setValue}
        fieldNames={{ text: 'label', value: 'code', children: 'items' }}
        placeholder='请选择地区'
      />
    </View>
  )
}
