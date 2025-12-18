import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { Cell, SwipeCell } from 'react-native-system-ui'

const Action = ({ text, background, onPress }: { text: string; background: string; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    style={{
      width: 80,
      height: '100%',
      backgroundColor: background,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: '#fff' }}>{text}</Text>
  </Pressable>
)

export default function SwipeCellBothDemo() {
  return (
    <View>
      <SwipeCell
        left={<Action text="收藏" background="#1989fa" onPress={() => {}} />}
        right={<Action text="删除" background="#ee0a24" onPress={() => {}} />}
      >
        <Cell title="左右滑动都有操作区" border={false} />
      </SwipeCell>
    </View>
  )
}

