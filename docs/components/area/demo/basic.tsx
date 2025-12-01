import React from 'react'

import { Area } from 'react-native-system-ui'

const areaList = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '310101': '黄浦区',
  },
}

export default () => (
  <Area areaList={areaList} title="选择地区" />
)
