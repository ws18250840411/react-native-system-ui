import React from 'react'

import { Area } from 'react-native-system-ui'

import { areaList } from './areaList'

export default () => (
  <Area areaList={areaList} title="选择地区" />
)
