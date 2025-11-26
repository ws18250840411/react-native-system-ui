import React from 'react'
import { Radio } from 'react-native-system-ui'

export default () => {
  const [value, setValue] = React.useState('wechat')

  return (
    <Radio.Group value={value} onChange={setValue}>
      <Radio name="wechat">微信</Radio>
      <Radio name="email">邮件</Radio>
      <Radio name="sms" disabled>
        短信
      </Radio>
    </Radio.Group>
  )
}
