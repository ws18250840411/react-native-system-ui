import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <div className="demo-cell__group">
      <Cell.Group card>
        <Cell title="标题" value="内容" />
        <Cell title="标题" value="内容" />
      </Cell.Group>
    </div>
  </div>
)
