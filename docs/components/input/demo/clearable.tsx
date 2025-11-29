import React from 'react'
import { Cell, Input } from 'react-native-system-ui'

const ClearableInputDemo = () => {
  const [value, setValue] = React.useState('')

  return (
    <Cell title='验证码'>
      <Input
        value={value}
        onChange={setValue}
        placeholder='请输入验证码'
        clearable
        clearTrigger='always'
      />
    </Cell>
  )
}

export default ClearableInputDemo
