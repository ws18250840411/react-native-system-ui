import React from 'react'
import { View, Text } from 'react-native'

import { Cell, Popup } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const [safeVisible, setSafeVisible] = React.useState(false)
  const [safeBottomVisible, setSafeBottomVisible] = React.useState(false)

  return (
    <Cell.Group>
      <Cell title="展示弹出层" isLink onPress={() => setVisible(true)} />
      <Cell title="顶部安全区域可视化" isLink onPress={() => setSafeVisible(true)} />
      <Cell title="底部安全区域可视化" isLink onPress={() => setSafeBottomVisible(true)} />
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
          <Text>内容</Text>
        </View>
      </Popup>
      <Popup
        visible={safeVisible}
        onClose={() => setSafeVisible(false)}
        placement="top"
        safeAreaInsetTop
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>顶部安全区为浅橙色</Text>
        </View>
      </Popup>
      <Popup
        visible={safeBottomVisible}
        onClose={() => setSafeBottomVisible(false)}
        placement="bottom"
        safeAreaInsetBottom
        style={{ backgroundColor: '#ffe7ba' }}
      >
        <View style={{ paddingVertical: 24, paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <Text>底部安全区为浅橙色</Text>
        </View>
      </Popup>
    </Cell.Group>
  )
}
