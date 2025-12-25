import React from 'react'
import { Text, View } from 'react-native'

import { Button, IndexBar, type IndexBarValue } from 'react-native-system-ui'

const letters = ['A', 'B', 'C', 'D']

export default () => {
  const [active, setActive] = React.useState<IndexBarValue>('A')

  return (
    <View style={{ height: 360 }}>
      <IndexBar value={active} onChange={setActive}>
        {letters.map(letter => (
          <IndexBar.Anchor key={letter} index={letter} title={`索引 ${letter}`}>
            <Text style={{ padding: 16 }}>内容 {letter}</Text>
          </IndexBar.Anchor>
        ))}
      </IndexBar>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
        {letters.map(letter => (
          <Button key={letter} text={letter} size="small" onPress={() => setActive(letter)} />
        ))}
      </View>
    </View>
  )
}
