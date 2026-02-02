import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button text="品牌色" color="#111f8f" shadow />
    <Button text="朴素色" plain color="#ff5500" />
  </Space>
)
