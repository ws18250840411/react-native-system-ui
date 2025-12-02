import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="方形按钮" type="warning" square />
    <Button text="圆形按钮" type="danger" round />
  </div>
)
