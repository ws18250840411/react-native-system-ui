import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={["1"]}>
    <Collapse.Panel name="1" title="标题 1" description="描述信息">
      内容一
    </Collapse.Panel>
    <Collapse.Panel name="2" title="标题 2">
      内容二
    </Collapse.Panel>
    <Collapse.Panel name="3" title="标题 3">
      内容三
    </Collapse.Panel>
  </Collapse>
)
