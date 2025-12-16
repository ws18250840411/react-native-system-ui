import React from 'react'
import { View } from 'react-native'

import { Grid } from 'react-native-system-ui'

const Icon = () => (
  <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#eef2ff' }} />
)

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={() => <Icon />} text="文字" />
    <Grid.Item icon={() => <Icon />} text="文字" />
    <Grid.Item icon={() => <Icon />} text="文字" />
  </Grid>
)
