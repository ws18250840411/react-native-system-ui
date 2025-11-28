import React from "react"

import { Field } from "react-native-system-ui"

const formatBankNo = (value: string) =>
  value
    .replace(/\s/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")

export default function FieldFormatterDemo() {
  const [card, setCard] = React.useState("")

  return (
    <Field
      label="银行卡"
      placeholder="请输入卡号"
      clearable
      value={card}
      onChangeText={setCard}
      maxLength={23}
      formatter={formatBankNo}
      formatTrigger="onBlur"
      showWordLimit
      description="失焦后自动格式化"
    />
  )
}
