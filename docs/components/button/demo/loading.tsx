import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button demo-button--column">
    <Button text="加载中" type="primary" loading />
    <Button text="提交" type="primary" loading loadingText="提交中" />
  </div>
)
