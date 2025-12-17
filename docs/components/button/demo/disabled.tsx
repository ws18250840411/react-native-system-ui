import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 12]}>
    <Button text="禁用状态" disabled type="primary" />
    <Button text="禁用状态" disabled type="info" />
  </Space>
)
