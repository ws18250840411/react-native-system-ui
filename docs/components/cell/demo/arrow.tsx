import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="右箭头" isLink />
      <Cell title="上箭头" isLink arrowDirection="up" />
      <Cell title="下箭头" isLink arrowDirection="down" />
    </Cell.Group>
  </div>
)
