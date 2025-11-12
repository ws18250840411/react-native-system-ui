import React from 'react'
import { VolumeO } from '@react-vant/icons'

import { Collapse, Icon, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse expandIcon={active => <Icon name={active ? 'minus' : 'plus'} color="#3b82f6" />}
      border={false}
    >
      <Collapse.Panel name="1" title="自定义图标" description="使用 Icon 组件">
        面板内容
      </Collapse.Panel>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Panel
        name="2"
        title="自定义标题"
        description="可以放任何元素"
        icon={<VolumeO color="#f97316" />}
      >
        面板内容
      </Collapse.Panel>
    </Collapse>
  </Space>
)
