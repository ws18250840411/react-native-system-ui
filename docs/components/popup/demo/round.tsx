import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group title="圆角样式">
        <Cell title="圆角弹窗" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <Popup
        visible={visible}
        placement="bottom"
        closeable
        round
        onClose={() => setVisible(false)}
        style={styles.sheet}
      >
        <View style={styles.placeholder} />
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  sheet: {
    height: 260,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
