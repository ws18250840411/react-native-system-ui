import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="单元格" value="内容" />
      <Cell title="单元格" value="内容" label="描述信息" />
    </Cell.Group>
  </div>
)
