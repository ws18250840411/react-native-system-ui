import React from 'react'
import { View, Text } from 'react-native'

import { Grid } from 'react-native-system-ui'

const DemoIcon = ({ label }: { label: string }) => (
  <View
    style={{
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: '#eef2ff',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: '#4338ca', fontSize: 14 }}>{label}</Text>
  </View>
)

export default () => (
  <Grid columnNum={3} iconColor="#4338ca">
    {['待付款', '待收货', '退货', '发票', '客服', '更多'].map((label, index) => (
      <Grid.Item key={label} text={label} icon={() => <DemoIcon label={`${index + 1}`} />} />
    ))}
  </Grid>
)
