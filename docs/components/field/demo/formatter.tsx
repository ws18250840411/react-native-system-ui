import React from 'react'

import { Field, FieldGroup } from 'react-native-system-ui'

const formatCard = (val: string) =>
  val
    .replace(/\s/g, '')
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

export default function FieldFormatterDemo() {
  const [value1, setValue1] = React.useState('')
  const [value2, setValue2] = React.useState('')

  return (
    <FieldGroup>
      <Field
        label="银行卡"
        placeholder="输入时自动格式化"
        value={value1}
        onChangeText={setValue1}
        formatter={formatCard}
        maxLength={23}
      />
      <Field
        label="银行卡"
        placeholder="失焦时自动格式化"
        value={value2}
        onChangeText={setValue2}
        formatter={formatCard}
        formatTrigger="onBlur"
        maxLength={23}
      />
    </FieldGroup>
  )
}
