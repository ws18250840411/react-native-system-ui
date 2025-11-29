import React from 'react'
import { Cell, Input } from 'react-native-system-ui'

const BasicInputDemo = () => {
  const [value, setValue] = React.useState('')

  return (
    <Cell title='姓名'>
      <Input
        value={value}
        onChange={setValue}
        placeholder='请输入姓名'
      />
    </Cell>
  )
}

export default BasicInputDemo
