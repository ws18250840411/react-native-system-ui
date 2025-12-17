import React from 'react'
import { FloatingBall, Button } from 'react-native-system-ui'

export default () => {
  const [position, setPosition] = React.useState({ x: 50, y: 120 })
  return (
    <>
      <FloatingBall
        position={position}
        onChange={setPosition}
        adsorb={false}
      />
      <Button text="按钮" onPress={() => setPosition({ x: 260, y: 500 })} style={{ marginTop: 16 }} />
    </>
  )
}
