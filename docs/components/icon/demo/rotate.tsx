import React from 'react'
import { Animated, Easing, Platform, View } from 'react-native'

import { Space } from 'react-native-system-ui'
import { ChatO, FireO } from 'react-native-system-icon'

const AnimatedView = Animated.createAnimatedComponent(View)

const Spin: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const spinValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      }),
    )
    loop.start()
    return () => loop.stop()
  }, [spinValue])

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <AnimatedView style={{ transform: [{ rotate }] }}>
      {children}
    </AnimatedView>
  )
}

export default () => (
  <Space gap={20}>
    <Spin>
      <ChatO />
    </Spin>
    <Spin>
      <FireO />
    </Spin>
  </Space>
)
