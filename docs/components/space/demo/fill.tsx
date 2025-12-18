import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[0, 12]}>
    <Space fill>
      <Button type="primary" block>
        查看详情
      </Button>
      <Button type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[0, 8]}>
      <Button color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
