import React from 'react'
import { Image } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-image__grid">
    <Image width={120} height={120} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" round />
    <Image width={140} height={100} radius={16} fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
  </div>
)
