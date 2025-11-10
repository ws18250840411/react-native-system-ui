import React from 'react'
import { useState } from 'react'

import { Slider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => {
  const [value, setValue] = useState(30)
  return (
    <DemoCard>
      <Slider value={value} onChange={setValue} onChangeAfter={setValue} />
    </DemoCard>
  )
}
