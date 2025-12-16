import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default () => (
  <Grid border={false} columnNum={3}>
    {[
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-3.jpg',
    ].map(src => (
      <Grid.Item key={src}>
        <Image src={src} width={80} height={80} radius={8} />
      </Grid.Item>
    ))}
  </Grid>
)
