import React from 'react'
import { Text, View } from 'react-native'

import { Area, Button } from 'react-native-system-ui'

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
    '310101': '黄浦区',
  },
}

export default () => {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  return (
    <View>
      <Area
        areaList={areaList}
        value={value}
        onChange={setValue}
        title="受控模式"
      />
      <Text style={{ marginTop: 12 }}>当前值：{value.join(' / ')}</Text>
      <Button
        style={{ marginTop: 12 }}
        text="切换至上海"
        onPress={() => setValue(['310000', '310100', '310101'])}
      />
    </View>
  )
}
