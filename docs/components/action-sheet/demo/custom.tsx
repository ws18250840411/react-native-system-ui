import React from 'react'
import { Info, Star } from 'react-native-system-icon'
import { ActionSheet, Button } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="自定义内容" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        title="标题"
        actions={[
          { name: '复制链接', icon: <Info /> },
          { name: '收藏', icon: <Star /> },
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
