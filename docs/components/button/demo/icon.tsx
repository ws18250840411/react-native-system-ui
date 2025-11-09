import React from 'react'

import { Button } from 'react-native-system-ui'
import { ShoppingCartO } from '@react-vant/icons'

const renderCart = (color: string, size: number) => (
  <ShoppingCartO color={color} size={size} />
)

export default () => (
  <>
    <Button text="加入购物车" icon={renderCart} style={{ marginBottom: 8 }} />
    <Button text="图标在右" icon={renderCart} iconPosition="right" />
  </>
)
