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

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
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
