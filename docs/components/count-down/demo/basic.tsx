import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownBasicDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
