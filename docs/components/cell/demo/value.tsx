import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell value="只设置 value" />
    </Cell.Group>
  </div>
)
