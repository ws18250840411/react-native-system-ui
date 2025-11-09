import React from 'react'

import { Button } from 'react-native-system-ui'

export default () => (
  <>
    <Button text="大型按钮" size="large" block style={{ marginBottom: 8 }} />
    <Button text="普通按钮" style={{ marginBottom: 8 }} />
    <Button text="小型按钮" size="small" style={{ marginBottom: 8 }} />
    <Button text="迷你按钮" size="mini" />
  </>
)
