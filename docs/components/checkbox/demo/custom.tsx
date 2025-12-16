import React from 'react'
import { Checkbox, Image, Space } from 'react-native-system-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => (
  <Space direction="vertical" gap={12}>
    <Checkbox defaultChecked shape="square">
      自定义形状
    </Checkbox>
    <Checkbox defaultChecked checkedColor="#ee0a24">
      自定义颜色
    </Checkbox>
    <Checkbox defaultChecked iconSize={24}>
      自定义大小
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      iconRender={({ checked }) => (
        <Image src={checked ? activeIcon : inactiveIcon} width={24} height={24} />
      )}
    >
      自定义图标
    </Checkbox>
  </Space>
)
