import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View, Text } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Text>禁用整体</Text>
      <Stepper defaultValue={2} disabled />
      <Text>只读输入</Text>
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
