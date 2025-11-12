import React from 'react'
import { useState } from 'react'

import { Slider } from 'react-native-system-ui'

export default () => {
  const [value, setValue] = useState(30)
  return <Slider value={value} onChange={setValue} onChangeAfter={setValue} />
}
