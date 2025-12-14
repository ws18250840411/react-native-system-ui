import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperBasicDemo() {
  const [value, setValue] = React.useState(1)
  const onChange = (v: number | null) => setValue(v ?? 0)
  return (
    <View style={{ gap: 16 }}>
      <Stepper value={value} onChange={onChange} />
      <Stepper defaultValue={5} min={1} max={10} />
    </View>
  )
}
