import React from 'react'
import { Text, View } from 'react-native'

import { Button, Dialog, Space } from 'react-native-system-ui'

const CustomContent = () => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 32, marginBottom: 8 }}>🎉</Text>
    <Text style={{ fontSize: 16, color: '#4b5563' }}>任务完成！</Text>
  </View>
)

export default () => {
  const [visible, setVisible] = React.useState(false)

  const footer = (
    <Space direction="vertical" gap={12} style={{ width: '100%' }}>
      <Button type="primary" block text="知道了" onPress={() => setVisible(false)} />
      <Button block text="查看更多" onPress={() => setVisible(false)} />
    </Space>
  )

  return (
    <View>
      <Button text="自定义内容" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        closeable
        message={<CustomContent />}
        footer={footer}
        onClose={() => setVisible(false)}
      />
    </View>
  )
}
