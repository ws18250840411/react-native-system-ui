import React from 'react'
import { useState } from 'react'

import { Slider } from 'react-native-system-ui'

export default () => {
  const [value, setValue] = useState(45)
  return (
    <Slider value={value} onChange={setValue} activeColor="#f97316" trackHeight={6} thumbSize={28} />
  )
}
