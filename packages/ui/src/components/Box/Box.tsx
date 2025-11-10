import React from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'

import { createFC } from '../../foundation/createFC'

export type BoxProps = ViewProps

const Box = createFC<BoxProps>(({ props, ref }) => {
  return () => <View ref={ref} {...props} />
})

export default Box
