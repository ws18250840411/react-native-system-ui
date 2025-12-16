import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Stepper defaultValue={2} disabled />
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
