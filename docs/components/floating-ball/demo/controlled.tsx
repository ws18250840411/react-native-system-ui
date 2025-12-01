import React from 'react'
import { FloatingBall, Button } from 'react-native-system-ui'

export default () => {
  const [position, setPosition] = React.useState({ x: 50, y: 120 })
  return (
    <>
      <FloatingBall
        position={position}
        onChange={setPosition}
        magnetic={false}
      />
      <Button text="回到右下" onPress={() => setPosition({ x: 260, y: 500 })} style={{ marginTop: 16 }} />
    </>
  )
}
