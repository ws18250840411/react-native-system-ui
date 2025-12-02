import React from 'react'

import { Image } from 'react-native-system-ui'
import type { ImageFit } from 'react-native-system-ui'
import './style.css'

const fits: ImageFit[] = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => (
  <div className="demo-image__grid">
    {fits.map(fit => (
      <div className="demo-image__item" key={fit}>
        <Image width={96} height={64} fit={fit} src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" radius={12} />
        <span>{fit}</span>
      </div>
    ))}
  </div>
)
