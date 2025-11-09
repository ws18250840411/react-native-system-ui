import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="Button" key={index} />
    ))}
  </Space>
)
