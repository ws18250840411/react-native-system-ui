import React from 'react'

import { Button } from 'react-native-system-ui'

export default () => (
  <>
    <Button text="块级按钮" type="primary" block style={{ marginBottom: 8 }} />
    <Button text="块级按钮" type="danger" plain block />
  </>
)
