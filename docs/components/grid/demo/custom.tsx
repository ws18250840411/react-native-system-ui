import React from 'react'
import { View, Text } from 'react-native'

import { Grid } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => (
  <DemoCard>
    <Grid columnNum={2} border={false} gutter={12}>
      <Grid.Item>
        <View style={{ padding: 12, backgroundColor: '#edf2ff', borderRadius: 12 }}>
          <Text style={{ fontWeight: '600', marginBottom: 6 }}>自定义内容</Text>
          <Text>可以任意组合图文内容。</Text>
        </View>
      </Grid.Item>
      <Grid.Item>
        <View style={{ padding: 12, backgroundColor: '#fef3c7', borderRadius: 12 }}>
          <Text style={{ fontWeight: '600', marginBottom: 6 }}>集成卡片</Text>
          <Text>支持 children 完全接管。</Text>
        </View>
      </Grid.Item>
    </Grid>
  </DemoCard>
)
