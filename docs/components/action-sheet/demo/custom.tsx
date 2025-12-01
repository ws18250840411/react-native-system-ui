import React from 'react'
import { ActionSheet, Button, Icon } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="带图标" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        actions={[
          { name: '复制链接', icon: <Icon name="info" /> },
          { name: '收藏', icon: <Icon name="star" /> },
          { name: '举报', color: '#fa5151' },
        ]}
        onSelect={() => setVisible(false)}
        cancelText="关闭"
        onClose={() => setVisible(false)}
      >
        <Button text="自定义区域" style={{ marginTop: 12 }} onPress={() => setVisible(false)} />
      </ActionSheet>
    </>
  )
}
