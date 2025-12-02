import React from 'react'

import { Button } from 'react-native-system-ui'
import { ShoppingCartO } from '@react-vant/icons'
import './style.css'

const renderCart = (color: string, size: number) => (
  <ShoppingCartO color={color} size={size} />
)

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="加入购物车" icon={renderCart} />
    <Button text="图标在右" icon={renderCart} iconPosition="right" />
  </div>
)
