import React from 'react'
import { ShareSheet, Button, Icon } from 'react-native-system-ui'

const options = [
  [
    { name: '微信', icon: <Icon name="info" /> },
    { name: '朋友圈', icon: <Icon name="star" /> },
    { name: '微博', icon: <Icon name="warning" /> },
    { name: '复制链接', icon: <Icon name="close" /> },
  ],
  [
    { name: '短信', icon: <Icon name="info" /> },
    { name: '邮件', icon: <Icon name="star" /> },
  ],
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="多行展示" onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="分享至"
        description="快捷分享"
        options={options}
        onClose={() => setVisible(false)}
      />
    </>
  )
}
