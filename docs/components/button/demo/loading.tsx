import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Button text="加载中" type="primary" loading />
    <Button text="提交" type="primary" loading loadingText="提交中" />
  </Space>
)
