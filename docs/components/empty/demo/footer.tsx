import React from 'react'

import { Button, Empty } from 'react-native-system-ui'

export default function EmptyFooterDemo() {
  return (
  <Empty description="描述信息">
    <Button text="按钮" type="primary" round style={{ width: 160 }} />
  </Empty>
  )
}
