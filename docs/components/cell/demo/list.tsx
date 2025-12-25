import React from 'react'

import { Cell, Image } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    {Array.from({ length: 4 }).map((_, idx) => (
      <Cell
        key={idx}
        center
        title={`Avatar ${idx}`}
        label="Deserunt dolor"
        icon={
          <Image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width={44}
            height={44}
            round
          />
        }
        isLink
      />
    ))}
  </Cell.Group>
)
