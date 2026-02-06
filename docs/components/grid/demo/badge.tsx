import React from 'react'

import { Grid } from 'react-native-system-ui'
import { HomeO, Search } from 'react-native-system-icon'

export default function GridBadgeDemo() {
  return (
  <Grid columnNum={2}>
    <Grid.Item icon={(size, color) => <HomeO size={size} fill={color} color={color} />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={(size, color) => <Search size={size} fill={color} color={color} />} text="文字" badge={{ content: '99+' }} />
  </Grid>
  )
}
