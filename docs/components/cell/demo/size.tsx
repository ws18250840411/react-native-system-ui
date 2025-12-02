import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="普通大小" value="内容" />
      <Cell title="大号" value="内容" size="large" />
    </Cell.Group>
  </div>
)
