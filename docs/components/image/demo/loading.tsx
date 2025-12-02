import React from 'react'
import { Text } from 'react-native'

import { Image } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-image__grid">
    <div className="demo-image__item">
      <Image
        width={120}
        height={80}
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
        loadingText="加载中..."
      />
      <span>加载提示</span>
    </div>
    <div className="demo-image__item">
      <Image
        width={120}
        height={80}
        src="https://example.com/404.png"
        fallback={<Text>自定义错误</Text>}
      />
      <span>失败占位</span>
    </div>
  </div>
)
