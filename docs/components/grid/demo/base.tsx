import React from 'react'
import { View, Text } from 'react-native'

import { Grid } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

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
  <DemoCard>
    <Grid>
      <Grid.Item text="订单" icon={(size, color) => <DemoIcon color={color} />} />
      <Grid.Item text="物流" icon={(size, color) => <DemoIcon color={color} />} />
      <Grid.Item text="客服" icon={(size, color) => <DemoIcon color={color} />} />
      <Grid.Item text="更多" icon={(size, color) => <DemoIcon color={color} />} />
    </Grid>
  </DemoCard>
)
