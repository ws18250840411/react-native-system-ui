import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button text="方形按钮" type="warning" square />
    <Button text="圆形按钮" type="danger" round />
  </Space>
)
