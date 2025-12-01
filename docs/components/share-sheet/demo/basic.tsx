import React from 'react'
import { Button, Icon, ShareSheet } from 'react-native-system-ui'

const options = [
  [
    { name: '微信', icon: <Icon name="info" /> },
    { name: '朋友圈', icon: <Icon name="star" /> },
    { name: '微博', icon: <Icon name="warning" /> },
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
