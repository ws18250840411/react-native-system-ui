import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group title="用户信息">
      <Cell title="姓名" value="张三" />
      <Cell title="电话" value="138****8888" />
    </Cell.Group>
  </div>
)
