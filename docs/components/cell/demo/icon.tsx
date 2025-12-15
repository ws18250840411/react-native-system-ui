import React from 'react'

import { Cell, Icon } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="店铺" icon={<Icon name="shop-o" />} isLink />
      <Cell title="电话" icon={<Icon name="phone-o" />} value="400-000-000" />
    </Cell.Group>
  </div>
)
