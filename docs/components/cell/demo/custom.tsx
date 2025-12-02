import React from 'react'

import { Cell, Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      <Cell title="短信验证码" center>
        <Button text="发送" type="primary" size="small" onPress={() => { }} />
      </Cell>
    </Cell.Group>
  </div>
)
