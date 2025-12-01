import React from 'react'
import { Button, ShareSheet } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="自定义" onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={[{ name: '保存到相册', icon: <Button text="存" size="small" /> }]}
        cancelText="关闭"
        closeOnSelect={false}
        onClose={() => setVisible(false)}
      >
        <Button text="更多设置" style={{ marginTop: 12 }} onPress={() => setVisible(false)} />
      </ShareSheet>
    </>
  )
}
