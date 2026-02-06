import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        description="描述信息"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}

