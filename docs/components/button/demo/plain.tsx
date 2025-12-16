import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 12]}>
    <Button text="朴素按钮" type="primary" plain />
    <Button text="朴素按钮" type="danger" plain />
  </Space>
)
