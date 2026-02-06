import React from 'react'
import { View } from 'react-native'

import { Area, Button, Field } from 'react-native-system-ui'

import { areaList } from './areaList'

export default function AreaControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area
        areaList={areaList}
        value={value}
        onChange={setValue}
        title="受控模式"
      />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button
        text="切换至上海"
        onPress={() => setValue(['310000', '310100', '310101'])}
      />
    </View>
  )
}
