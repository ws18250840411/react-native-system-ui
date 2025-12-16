import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={{ text: 'label', value: 'code', children: 'items' }}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
