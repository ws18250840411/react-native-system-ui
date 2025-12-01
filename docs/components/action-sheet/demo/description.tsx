import React from 'react'
import { ActionSheet, Button } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="展示描述" onPress={() => setVisible(true)} />
      <ActionSheet
        visible={visible}
        title="分享"
        description="选择你要分享的平台"
        actions={[
          { name: '朋友圈', subname: '最多 9 张' },
          { name: '好友', subname: '单条消息' },
        ]}
        cancelText="取消"
        onClose={() => setVisible(false)}
      />
    </>
  )
}
