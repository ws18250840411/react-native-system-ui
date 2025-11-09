import React from 'react'

import { Button } from 'react-native-system-ui'

export default () => (
  <>
    <Button text="方形按钮" type="warning" square style={{ marginBottom: 8 }} />
    <Button text="圆形按钮" type="danger" round />
  </>
)
