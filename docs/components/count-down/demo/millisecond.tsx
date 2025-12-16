import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
