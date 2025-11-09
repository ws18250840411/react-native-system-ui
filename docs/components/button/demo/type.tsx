import React from 'react'

import { Button } from 'react-native-system-ui'

export default () => (
  <>
    <Button text="默认按钮" style={{ marginBottom: 8 }} />
    <Button text="主要按钮" type="primary" style={{ marginBottom: 8 }} />
    <Button text="信息按钮" type="info" style={{ marginBottom: 8 }} />
    <Button text="成功按钮" type="success" style={{ marginBottom: 8 }} />
    <Button text="警告按钮" type="warning" style={{ marginBottom: 8 }} />
    <Button text="危险按钮" type="danger" />
  </>
)
