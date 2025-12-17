import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 12]}>
    <Button loading type="primary" />
    <Button loading type="primary" loadingType="spinner" />
    <Button loading loadingText="加载中..." type="info" />
  </Space>
)
