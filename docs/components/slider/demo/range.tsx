import React from 'react'
import { useState } from 'react'

import { Slider } from 'react-native-system-ui'

export default () => {
  const [value, setValue] = useState<[number, number]>([20, 60])
  return <Slider range value={value} onChange={setValue} onChangeAfter={setValue} />
}
