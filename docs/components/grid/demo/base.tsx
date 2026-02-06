import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default function GridBaseDemo() {
  return (
  <Grid>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
  )
}
