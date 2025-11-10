import React from 'react'
import { useState } from 'react'

import { Slider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => {
  const [value, setValue] = useState<[number, number]>([20, 60])
  return (
    <DemoCard>
      <Slider range value={value} onChange={setValue} onChangeAfter={setValue} />
    </DemoCard>
  )
}
