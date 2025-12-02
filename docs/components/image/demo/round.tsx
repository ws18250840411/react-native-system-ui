import React from 'react'

import { Image } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-image__grid">
    <div className="demo-image__item">
      <Image width={96} height={96} round src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" />
      <span>圆形</span>
    </div>
    <div className="demo-image__item">
      <Image width={120} height={80} radius={20} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg" />
      <span>自定义圆角</span>
    </div>
  </div>
)
