import React from 'react'

import { Uploader } from 'react-native-system-ui'

const defaultValue = [
  {
    url: 'https://img.yzcdn.cn/vant/sand.jpg',
  },
  {
    url: 'https://img.yzcdn.cn/vant/sand.text',
    filename: 'sand.text',
  },
]

export default () => {
  return <Uploader accept="*" defaultValue={defaultValue} onChange={v => console.log(v)} />
}
