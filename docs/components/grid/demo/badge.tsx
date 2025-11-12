import React from 'react'

import { Grid } from 'react-native-system-ui'

export default () => (
  <Grid>
    <Grid.Item text="消息" icon={() => null} badge={{ content: 8 }} />
    <Grid.Item text="更新" icon={() => null} dot />
    <Grid.Item text="待办" icon={() => null} badge={{ content: 'NEW', color: '#f97316' }} />
    <Grid.Item text="通知" icon={() => null} />
  </Grid>
)
