import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default function GridColumnDemo() {
  return (
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
  )
}
