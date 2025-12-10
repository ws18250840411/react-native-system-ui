import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputBasicDemo() {
  const [state, setState] = React.useState({
    text: "",
    tel: "",
    digit: "",
    number: "",
    password: "",
  })

  const update = (key: keyof typeof state) => (val: string) =>
    setState(prev => ({ ...prev, [key]: val }))

  return (
    <Cell.Group>
      <Input
        value={state.text}
        onChangeText={update("text")}
        placeholder="请输入文本"
        clearable
      />
      <Input
        value={state.tel}
        type="tel"
        onChangeText={update("tel")}
        placeholder="请输入手机号"
      />
      <Input
        value={state.digit}
        type="digit"
        onChangeText={update("digit")}
        placeholder="请输入整数"
      />
      <Input
        value={state.number}
        type="number"
        onChangeText={update("number")}
        placeholder="请输入数字"
      />
      <Input
        value={state.password}
        type="password"
        onChangeText={update("password")}
        placeholder="请输入密码"
      />
    </Cell.Group>
  )
}
