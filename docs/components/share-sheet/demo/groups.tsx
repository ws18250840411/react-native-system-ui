import React from 'react'
import { ShareSheet, Button } from 'react-native-system-ui'
import { Close, Info, Star, Warning } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Info /> },
    { name: '朋友圈', icon: <Star /> },
    { name: '微博', icon: <Warning /> },
    { name: '复制链接', icon: <Close /> },
  ],
  [
    { name: '短信', icon: <Info /> },
    { name: '邮件', icon: <Star /> },
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
        description="描述信息"
        options={options}
        onClose={() => setVisible(false)}
      />
    </>
  )
}
