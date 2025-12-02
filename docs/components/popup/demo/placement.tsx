import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Cell, Popup, type PopupPlacement } from 'react-native-system-ui'

const styles = StyleSheet.create({
  horizontal: {
    height: 220,
  },
  vertical: {
    width: '60%',
    maxWidth: 260,
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

const placements: PopupPlacement[] = ['top', 'bottom', 'left', 'right']

const sizeStyles: Record<PopupPlacement, object> = {
  top: styles.horizontal,
  bottom: styles.horizontal,
  left: styles.vertical,
  right: styles.vertical,
  center: {},
}

export default () => {
  const [current, setCurrent] = React.useState<PopupPlacement | null>(null)

  const close = () => setCurrent(null)

  return (
    <>
      <Cell.Group title="弹出位置">
        <Cell title="顶部弹出" isLink onPress={() => setCurrent('top')} />
        <Cell title="底部弹出" isLink onPress={() => setCurrent('bottom')} />
        <Cell title="左侧弹出" isLink onPress={() => setCurrent('left')} />
        <Cell title="右侧弹出" isLink onPress={() => setCurrent('right')} />
      </Cell.Group>
      {placements.map(item => (
        <Popup
          key={item}
          visible={current === item}
          placement={item}
          onClose={close}
          style={sizeStyles[item]}
        >
          <View style={styles.placeholder} />
        </Popup>
      ))}
    </>
  )
}
