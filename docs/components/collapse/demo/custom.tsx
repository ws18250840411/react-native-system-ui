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
      <Collapse.Item name="1" title="自定义图标" label="描述信息">
        文字
      </Collapse.Item>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Item
        name="2"
        title="自定义标题"
        label="描述信息"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        文字
      </Collapse.Item>
    </Collapse>
  </Space>
)
