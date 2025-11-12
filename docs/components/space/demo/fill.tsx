import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[0, 12]}>
    <Space fill>
      <Button size="small" type="primary" block>
        查看详情
      </Button>
      <Button size="small" type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[0, 8]}>
      <Button size="small" color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button size="small" color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
