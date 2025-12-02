import React from 'react'

import { Cell, Avatar } from 'react-native-system-ui'
import './style.css'

export default () => (
  <div className="demo-cell__section">
    <Cell.Group>
      {Array.from({ length: 4 }).map((_, index) => (
        <Cell
          key={index}
          center
          title={`Avatar ${index}`}
          label="Deserunt dolor"
          icon={<Avatar size={40} />}
          isLink
        />
      ))}
    </Cell.Group>
  </div>
)
