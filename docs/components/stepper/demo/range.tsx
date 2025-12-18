import React from 'react'
import { View } from 'react-native'

import { Stepper } from 'react-native-system-ui'

export default function StepperRangeDemo() {
  const [stepValue, setStepValue] = React.useState(1)
  const [rangeValue, setRangeValue] = React.useState(5)

  return (
    <View style={{ gap: 16 }}>
      <Stepper value={stepValue} step={2} onChange={v => setStepValue(v ?? 0)} />
      <Stepper value={rangeValue} min={5} max={8} onChange={v => setRangeValue(v ?? 0)} />
    </View>
  )
}

