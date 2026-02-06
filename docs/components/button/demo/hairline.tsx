import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default function ButtonHairlineDemo() {
  return (
  <Space wrap gap={[8, 12]}>
    <Button text="细边框按钮" type="primary" plain hairline />
    <Button text="细边框按钮" type="warning" plain hairline />
  </Space>
  )
}
