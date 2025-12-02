import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="禁用按钮" disabled />
    <Button text="禁用按钮" type="danger" plain disabled />
  </div>
)
