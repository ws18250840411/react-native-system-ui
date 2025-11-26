import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => (
  <Checkbox.Group direction="horizontal" checkedColor="#111f8f">
    <Checkbox name="wechat" shape="square">
      微信通知
    </Checkbox>
    <Checkbox name="email" shape="square" defaultChecked>
      邮件通知
    </Checkbox>
    <Checkbox name="sms" shape="square" disabled>
      短信通知
    </Checkbox>
  </Checkbox.Group>
)
