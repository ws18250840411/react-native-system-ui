import React from 'react'
import { View } from 'react-native'

import { Grid } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

const Block = () => (
  <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: '#10b981' }} />
)

export default () => (
  <DemoCard>
    <Grid gutter={12} border={false}>
      <Grid.Item text="12px" icon={() => <Block />} />
      <Grid.Item text="间距" icon={() => <Block />} />
      <Grid.Item text="可调" icon={() => <Block />} />
      <Grid.Item text="尺寸" icon={() => <Block />} />
    </Grid>
  </DemoCard>
)
