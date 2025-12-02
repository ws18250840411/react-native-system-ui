import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="垂直居中" label="副标题" center value="内容" />
    </Cell.Group>
  </div>
)
