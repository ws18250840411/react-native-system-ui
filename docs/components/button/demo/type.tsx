import React from 'react'

import { Button } from 'react-native-system-ui'
import { DemoCard, DemoGrid } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <DemoGrid>
      <Button text="主要按钮" type="primary" />
      <Button text="信息按钮" type="info" />
      <Button text="默认按钮" />
      <Button text="警告按钮" type="warning" />
      <Button text="危险按钮" type="danger" />
    </DemoGrid>
  </DemoCard>
)
