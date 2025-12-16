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
    {Array.from({ length: 8 }, (_, index) => (
      <Grid.Item key={index} text="文字" icon={() => <SquareIcon />} />
    ))}
  </Grid>
)
