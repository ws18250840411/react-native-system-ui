import React from 'react'

import { Button } from 'react-native-system-ui'

export default () => (
  <>
    <Button text="禁用按钮" disabled style={{ marginBottom: 8 }} />
    <Button text="禁用按钮" type="danger" plain disabled />
  </>
)
