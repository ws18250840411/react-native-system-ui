import React from 'react'

import { Button, Empty } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Empty description="暂无内容">
      <Button text="重新加载" type="primary" size="small" />
    </Empty>
  </DemoCard>
)
