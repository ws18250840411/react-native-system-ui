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

export default function SwipeCellBasicDemo() {
  return (
    <View>
      <SwipeCell
        right={
          <Action
            text="删除"
            background="#ee0a24"
            onPress={() => {}}
          />
        }
      >
        <Cell title="向左滑动试试" border={false} />
      </SwipeCell>
    </View>
  )
}

