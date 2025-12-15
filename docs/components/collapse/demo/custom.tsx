import React from 'react'

import { Minus, Plus, VolumeO } from 'react-native-system-icon'
import { Collapse, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse
      expandIcon={active =>
        active ? <Minus fill="#3b82f6" color="#3b82f6" /> : <Plus fill="#3b82f6" color="#3b82f6" />
      }
      border={false}
    >
      <Collapse.Panel name="1" title="自定义图标" description="使用 react-native-system-icon">
        面板内容
      </Collapse.Panel>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Panel
        name="2"
        title="自定义标题"
        description="可以放任何元素"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        面板内容
      </Collapse.Panel>
    </Collapse>
  </Space>
)
