import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, WeappNav, Wechat } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Wechat /> },
    { name: '朋友圈', icon: <Wechat /> },
    { name: '微博', icon: <Share /> },
    { name: 'QQ', icon: <ShareO /> },
  ],
  [
    { name: '复制链接', icon: <ShareO /> },
    { name: '分享海报', icon: <Photo /> },
    { name: '二维码', icon: <Qr /> },
    { name: '小程序码', icon: <WeappNav /> },
  ],
]

export default function ShareSheetGroupsDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
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
