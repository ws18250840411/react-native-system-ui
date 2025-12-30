import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ee0a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
})

export default function SliderButtonDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      buttonSize={26}
      button={({ value: v }) => (
        <View style={styles.button}>
          <Text style={styles.text}>{Array.isArray(v) ? v[0] : v}</Text>
        </View>
      )}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(`值：${Array.isArray(v) ? v.join(' ~ ') : v}`)}
    />
  )
}
