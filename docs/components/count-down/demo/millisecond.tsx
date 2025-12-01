import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={3 * 1000} format="ss:SSS" millisecond onFinish={() => {}} />
)
