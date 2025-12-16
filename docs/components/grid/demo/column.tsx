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
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, index) => (
      <Grid.Item
        key={index}
        text="文字"
        icon={() => <DemoIcon label={`${index + 1}`} />}
      />
    ))}
  </Grid>
)
