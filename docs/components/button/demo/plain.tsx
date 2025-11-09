import React from 'react'

import { Button } from 'react-native-system-ui'
import { DemoCard, DemoGrid } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <DemoGrid>
      <Button text="朴素按钮" type="primary" plain />
      <Button text="朴素按钮" type="danger" plain />
    </DemoGrid>
  </DemoCard>
)
