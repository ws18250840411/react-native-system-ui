import React from 'react'
import { View, Text } from 'react-native'

import { Grid } from 'react-native-system-ui'

const DemoIcon = ({ color }: { color: string }) => (
  <View
    style={{
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: '#fff', fontSize: 16 }}>◎</Text>
  </View>
)

export default () => (
  <Grid>
    <Grid.Item text="文字" icon={(size, color) => <DemoIcon color={color} />} />
    <Grid.Item text="文字" icon={(size, color) => <DemoIcon color={color} />} />
    <Grid.Item text="文字" icon={(size, color) => <DemoIcon color={color} />} />
    <Grid.Item text="文字" icon={(size, color) => <DemoIcon color={color} />} />
  </Grid>
)
