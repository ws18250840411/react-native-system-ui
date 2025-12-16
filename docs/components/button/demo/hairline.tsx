import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button text="细边按钮" type="primary" plain hairline />
    <Button text="细边按钮" type="danger" plain hairline />
  </Space>
)
