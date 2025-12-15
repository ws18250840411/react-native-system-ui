import React from 'react'

import { ShoppingCartO } from 'react-native-system-icon'
import { Button } from 'react-native-system-ui'
import './style.css'

const renderCart = (color: string, size: number) => (
  <ShoppingCartO size={size} fill={color} color={color} />
)

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="加入购物车" icon={renderCart} />
    <Button text="图标在右" icon={renderCart} iconPosition="right" />
  </div>
)
