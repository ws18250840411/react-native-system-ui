import React from 'react'
import { Button, Cascader, Field, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <>
      <Cascader poppable popupRound title="请选择地区" options={options} value={value} onFinish={setValue}>
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
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
