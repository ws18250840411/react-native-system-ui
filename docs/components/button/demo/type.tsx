import React from 'react'

import { Button } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-button">
    <Button text="Primary" type="primary" />
    <Button text="Info" type="info" />
    <Button text="Default" />
    <Button text="Warning" type="warning" />
    <Button text="Danger" type="danger" />
    <Button text="Success" type="success" />
  </div>
)
