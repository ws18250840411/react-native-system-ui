import React from 'react'
import { View } from 'react-native'

import type { DropdownItemInstance, DropdownMenuInstance } from 'react-native-system-ui'
import { Button, Cell, DropdownMenu, Switch } from 'react-native-system-ui'

export default () => {
  const menuRef = React.useRef<DropdownMenuInstance>(null)
  const itemRef = React.useRef<DropdownItemInstance>(null)

  const [freeShipping, setFreeShipping] = React.useState(false)
  const [groupBuying, setGroupBuying] = React.useState(false)

  const onConfirm = () => {
    itemRef.current?.toggle()
    // 或者：
    // menuRef.current?.close()
  }

  return (
    <DropdownMenu ref={menuRef}>
      <DropdownMenu.Item
        options={[
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 },
        ]}
        defaultValue={0}
      />
      <DropdownMenu.Item ref={itemRef} title="筛选">
        <Cell center title="包邮" value={<Switch checked={freeShipping} onChange={setFreeShipping} />} />
        <Cell center title="团购" value={<Switch checked={groupBuying} onChange={setGroupBuying} />} />
        <View style={{ padding: 12 }}>
          <Button type="primary" block round text="确认" onPress={onConfirm} />
        </View>
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}

