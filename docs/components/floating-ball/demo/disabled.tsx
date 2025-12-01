import React from 'react'
import { FloatingBall, Switch } from 'react-native-system-ui'

export default () => {
  const [disabled, setDisabled] = React.useState(false)
  return (
    <>
      <Switch value={disabled} onValueChange={setDisabled} text={disabled ? '已禁用' : '可拖动'} />
      <FloatingBall disabled={disabled} style={{ top: 200, left: 40 }} />
    </>
  )
}
