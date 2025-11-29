import React from 'react'
import { Button, Cell, Input } from 'react-native-system-ui'

const SlotInputDemo = () => {
  const [value, setValue] = React.useState('')

  return (
    <Cell>
      <Input
        value={value}
        onChange={setValue}
        prefix='💬'
        suffix={(
          <Button size='small' type='primary' onPress={() => setValue('')}>
            发送
          </Button>
        )}
        placeholder='请输入短信验证码'
      />
    </Cell>
  )
}

export default SlotInputDemo
