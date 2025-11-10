import React from 'react'
import { useState } from 'react'

import { Slider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => {
  const [value, setValue] = useState(45)
  return (
    <DemoCard>
      <Slider
        value={value}
        onChange={setValue}
        activeColor="#f97316"
        trackHeight={6}
        thumbSize={28}
      />
    </DemoCard>
  )
}
