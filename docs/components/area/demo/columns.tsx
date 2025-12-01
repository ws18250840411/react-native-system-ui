import React from 'react'

import { Area } from 'react-native-system-ui'

const areaList = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
    '320000': '江苏省',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
    '320100': '南京市',
    '320200': '无锡市',
  },
}

export default () => (
  <Area areaList={areaList} columnsNum={2} title="省市选择" />
)
