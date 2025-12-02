import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group title="基础用法">
        <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <Popup visible={visible} onClose={() => setVisible(false)} placement="center">
        <View style={styles.content}>
          <Text style={styles.text}>内容</Text>
        </View>
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    minWidth: 220,
    paddingVertical: 32,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#111',
  },
})
