import React from 'react'

import { Cell } from 'react-native-system-ui'
import './style.css'

const Avatar = ({ index }: { index: number }) => (
  <div className="demo-cell__avatar">{index}</div>
)

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      {Array.from({ length: 4 }).map((_, index) => (
        <Cell
          key={index}
          center
          title={`Avatar ${index}`}
          label="Deserunt dolor"
          icon={<Avatar width={40} height={40} index={index} />}
          isLink
        />
      ))}
    </Cell.Group>
  </div>
)
