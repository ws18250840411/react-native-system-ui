import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse accordion defaultValue="a">
    <Collapse.Panel name="a" title="单选 1">
      仅允许展开一个面板。
    </Collapse.Panel>
    <Collapse.Panel name="b" title="单选 2">
      切换后自动收起上一个。
    </Collapse.Panel>
    <Collapse.Panel name="c" title="单选 3">
      React Native System UI.
    </Collapse.Panel>
  </Collapse>
)
