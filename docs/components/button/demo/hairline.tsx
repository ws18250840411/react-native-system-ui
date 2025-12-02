import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="细边按钮" type="primary" plain hairline />
    <Button text="细边按钮" type="danger" plain hairline />
  </div>
)
