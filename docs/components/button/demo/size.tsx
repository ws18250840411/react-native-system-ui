import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="大型按钮" size="large" block />
    <Button text="普通按钮" />
    <Button text="小型按钮" size="small" />
    <Button text="迷你按钮" size="mini" />
  </div>
)
