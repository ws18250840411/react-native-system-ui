import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="块级按钮" type="primary" block />
    <Button text="块级按钮" type="danger" plain block />
  </div>
)
