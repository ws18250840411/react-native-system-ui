import React from 'react'
import { View } from 'react-native'

import { Grid } from 'react-native-system-ui'

const Icon = () => (
  <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#eef2ff' }} />
)

export default () => (
  <Grid columnNum={2}>
    <Grid.Item icon={() => <Icon />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={() => <Icon />} text="文字" badge={{ content: '99+' }} />
  </Grid>
)
