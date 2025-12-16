import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2" disabled>
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3" disabled>
      文字
    </Collapse.Item>
  </Collapse>
)

