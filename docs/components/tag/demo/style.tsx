import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <Space gap={12} direction="vertical">
      <Space gap={12} wrap>
        <Tag plain type="primary">
          空心样式
        </Tag>
        <Tag round type="primary">
          圆角样式
        </Tag>
        <Tag mark type="primary">
          标记样式
        </Tag>
      </Space>
      {visible ? (
        <Tag closeable plain type="primary" onClose={() => setVisible(false)}>
          可关闭
        </Tag>
      ) : null}
    </Space>
  )
}
