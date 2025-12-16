import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button text="禁用按钮" disabled />
    <Button text="禁用按钮" type="danger" plain disabled />
  </Space>
)
