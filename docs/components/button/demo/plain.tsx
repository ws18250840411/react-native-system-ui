import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button">
    <Button text="朴素按钮" type="primary" plain />
    <Button text="朴素按钮" type="danger" plain />
  </div>
)
