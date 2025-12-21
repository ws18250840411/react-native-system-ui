import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
