import React from 'react'
import { Cell, Input } from 'react-native-system-ui'

export default function InputErrorPositionDemo() {
  return (
    <Cell.Group>
      <Input
        label="默认（inner）"
        placeholder="错误提示在输入框内部"
        error
        errorMessage="手机号格式错误"
      />
      <Input
        label="外部（outer）"
        placeholder="错误提示在输入框外部"
        error
        errorMessage="手机号格式错误"
        errorMessagePosition="outer"
        border={false}
      />
    </Cell.Group>
  )
}
