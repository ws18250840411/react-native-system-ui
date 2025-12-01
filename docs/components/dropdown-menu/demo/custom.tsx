import React from 'react'
import { Button, DropdownMenu } from 'react-native-system-ui'

export default () => (
  <DropdownMenu>
    <DropdownMenu.Item label="自定义">
      <Button text="重置" style={{ marginBottom: 12 }} />
      <Button text="确认" type="primary" />
    </DropdownMenu.Item>
  </DropdownMenu>
)
