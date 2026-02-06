import React from 'react'

import { ShoppingCartO } from 'react-native-system-icon'
import { Button, Space } from 'react-native-system-ui'

const renderCart = (color: string, size: number) => (
  <ShoppingCartO size={size} fill={color} color={color} />
)

export default function ButtonIconDemo() {
  return (
  <Space direction="vertical" gap={12}>
    <Button text="图标按钮" icon={renderCart} />
    <Button text="图标在右" icon={renderCart} iconPosition="right" />
  </Space>
  )
}
