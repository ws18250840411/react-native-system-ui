import React from 'react'
import { useState } from 'react'
import { View } from 'react-native'

import { Slider } from 'react-native-system-ui'
import { DemoCard } from '../../common/DemoCard'

export default () => {
  const [value, setValue] = useState(50)
  return (
    <DemoCard>
      <View style={{ height: 160, alignItems: 'center' }}>
        <Slider
          vertical
          style={{ height: 160 }}
          value={value}
          onChange={setValue}
          onChangeAfter={setValue}
        />
      </View>
    </DemoCard>
  )
}
