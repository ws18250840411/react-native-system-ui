import React from 'react'

import { Cell } from 'react-native-system-ui'
import { ShopO, PhoneO } from '@react-vant/icons'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="店铺" icon={<ShopO />} isLink />
      <Cell title="电话" icon={<PhoneO />} value="400-000-000" />
    </Cell.Group>
  </div>
)
