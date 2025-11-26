import React from 'react'
import { View } from 'react-native'

import { Button, Dialog, Space } from 'react-native-system-ui'

export default () => (
  <View>
    <Space gap={12} wrap block align="start">
      <Button
        text="Dialog.show"
        onPress={() =>
          Dialog.show({
            title: '系统提示',
            message: '静态调用同样支持自定义内容',
            showCancelButton: true,
          })
        }
      />
      <Button
        text="Dialog.confirm"
        type="primary"
        onPress={async () => {
          try {
            await Dialog.confirm({
              title: '确认提交',
              message: '提交后将无法撤回，是否继续？',
            })
          } catch {
            // 用户取消
          }
        }}
      />
      <Button
        text="Dialog.alert"
        type="success"
        onPress={() =>
          Dialog.alert({
            title: '成功',
            message: '操作完成，点击确认关闭',
          })
        }
      />
    </Space>
    {/* 把 Host 放在末尾，保证遮罩渲染在 demo 内容之上 */}
    <Dialog.Host />
  </View>
)
