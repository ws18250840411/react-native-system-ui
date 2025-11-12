import React from 'react'
import { View } from 'react-native'

import { Grid } from 'react-native-system-ui'

const SquareIcon = () => (
  <View
    style={{
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: '#0ea5e9',
    }}
  />
)

export default () => (
  <Grid square>
    <Grid.Item text="宫格" icon={() => <SquareIcon />} />
    <Grid.Item text="正方形" icon={() => <SquareIcon />} />
    <Grid.Item text="快捷入口" icon={() => <SquareIcon />} />
    <Grid.Item text="更多" icon={() => <SquareIcon />} />
  </Grid>
)
