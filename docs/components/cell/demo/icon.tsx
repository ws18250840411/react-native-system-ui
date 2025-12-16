import React from 'react'

import { FireO, LocationO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <>
    <Cell title="单元格" icon={<LocationO />} />
    <Cell title="单元格" icon={<FireO />} />
  </>
)
