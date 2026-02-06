import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default function GridCustomDemo() {
  return (
  <Grid border={false} columnNum={3}>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" width={84} height={70} />
    </Grid.Item>
  </Grid>
  )
}
