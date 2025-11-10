import React from 'react'

import { Grid } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

const Label = ({ text }: { text: string }) => (
  <Grid.Item
    text={text}
    icon={() => null}
    contentStyle={{ alignItems: 'flex-start' }}
  />
)

export default () => (
  <DemoCard>
    <Grid direction="horizontal">
      <Label text="文字横排" />
      <Label text="图标在左" />
      <Label text="按钮入口" />
      <Label text="更多" />
    </Grid>
  </DemoCard>
)
