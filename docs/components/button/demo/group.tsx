import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button.Group type="primary" round>
      <Button text="上一页" />
      <Button text="下一页" />
    </Button.Group>
  </div>
)
