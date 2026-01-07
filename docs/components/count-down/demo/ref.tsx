import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef<CountDownInstance>(null)

  return (
    <Space direction="vertical" gap={8}>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Space gap={8}>
        <Button text="开始" onPress={() => ref.current?.start()} />
        <Button text="暂停" onPress={() => ref.current?.pause()} />
        <Button text="重置" onPress={() => ref.current?.reset()} />
      </Space>
    </Space>
  )
}
