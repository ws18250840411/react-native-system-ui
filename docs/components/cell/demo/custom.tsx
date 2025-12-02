import React from 'react'

import { Cell, Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="自定义">
        <Button text="验证码" type="primary" size="small" />
      </Cell>
    </Cell.Group>
  </div>
)
