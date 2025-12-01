import React from 'react'
import { Button, CountDown } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef(null)

  return (
    <>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Button text="开始" style={{ marginTop: 12 }} onPress={() => ref.current?.start()} />
      <Button text="暂停" style={{ marginTop: 8 }} onPress={() => ref.current?.pause()} />
      <Button text="重置" style={{ marginTop: 8 }} onPress={() => ref.current?.reset()} />
    </>
  )
}
