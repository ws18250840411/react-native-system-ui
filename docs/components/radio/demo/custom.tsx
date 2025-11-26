import React from 'react'
import { Space, Radio } from 'react-native-system-ui'

export default () => (
  <Radio.Group direction="horizontal" checkedColor="#111f8f">
    <Space gap={16}>
      <Radio name="morning">上午</Radio>
      <Radio name="afternoon" defaultChecked>
        下午
      </Radio>
      <Radio name="night" labelPosition="left">
        晚间
      </Radio>
    </Space>
  </Radio.Group>
)
