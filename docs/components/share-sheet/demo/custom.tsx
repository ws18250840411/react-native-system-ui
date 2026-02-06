import React from 'react'
import { Cell, Image, ShareSheet } from 'react-native-system-ui'

const options = [
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
]

export default function ShareSheetCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
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
