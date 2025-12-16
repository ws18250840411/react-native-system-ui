import React from 'react'
import { View } from 'react-native'

import { Grid } from 'react-native-system-ui'

const Block = () => (
  <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: '#10b981' }} />
)

export default () => (
  <Grid gutter={10} border={false}>
    {Array.from({ length: 8 }, (_, index) => (
      <Grid.Item key={index} text="文字" icon={() => <Block />} />
    ))}
  </Grid>
)
