import React from 'react'
import { Button, ShareSheet } from 'react-native-system-ui'
import { Info, Star, Warning } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Info /> },
    { name: '朋友圈', icon: <Star /> },
    { name: '微博', icon: <Warning /> },
  ],
]

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Button text="打开 ShareSheet" onPress={() => setVisible(true)} />
      <ShareSheet visible={visible} options={options} onClose={() => setVisible(false)} />
    </>
  )
}
