import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Popup, Icon, Cell } from 'react-native-system-ui'

type DemoType = 'default' | 'custom' | 'left' | null

export default () => {
  const [visible, setVisible] = React.useState<DemoType>(null)

  const renderPopup = (type: Exclude<DemoType, null>, extraProps?: React.ComponentProps<typeof Popup>) => (
    <Popup
      key={type}
      visible={visible === type}
      placement="bottom"
      closeable
      round
      onClose={() => setVisible(null)}
      style={styles.sheet}
      {...extraProps}
    >
      <View style={styles.placeholder}>
        <Text style={styles.text}>内容</Text>
      </View>
    </Popup>
  )

  return (
    <>
      <Cell.Group title="关闭图标">
        <Cell title="关闭图标" isLink onPress={() => setVisible('default')} />
        <Cell title="自定义关闭图标" isLink onPress={() => setVisible('custom')} />
        <Cell title="图标位置" isLink onPress={() => setVisible('left')} />
      </Cell.Group>
      {renderPopup('default')}
      {renderPopup('custom', { closeIcon: <Text>关闭</Text> })}
      {renderPopup('left', { closeIconPosition: 'top-left' })}
    </>
  )
}

const styles = StyleSheet.create({
  sheet: {
    height: 260,
  },
  placeholder: {
    flex: 1,
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#111',
  },
})
