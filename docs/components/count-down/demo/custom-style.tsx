import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CountDown } from 'react-native-system-ui'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#1989fa',
    color: '#ffffff',
    textAlign: 'center',
  },
  colon: {
    marginHorizontal: 4,
    color: '#1989fa',
  },
})

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS">
    {current => (
      <View style={styles.row}>
        <Text style={styles.block}>{current.hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.seconds}</Text>
      </View>
    )}
  </CountDown>
)

