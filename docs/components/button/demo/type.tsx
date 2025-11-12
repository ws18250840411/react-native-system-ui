import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={12} block>
    <Button text="主要按钮" type="primary" />
    <Button text="信息按钮" type="info" />
    <Button text="默认按钮" />
    <Button text="警告按钮" type="warning" />
    <Button text="危险按钮" type="danger" />
  </Space>
)
