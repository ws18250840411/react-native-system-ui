import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Add, Close, Search } from 'react-native-system-icon'
import { FloatingBall, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const createItem = (label: string, icon: React.ReactNode) => (
  <Pressable
    accessibilityRole="button"
    style={styles.item}
    onPress={() => Toast.info(label)}
  >
    {icon}
  </Pressable>
)

export default () => (
  <FloatingBall
    menu={{
      items: [
        createItem('选项一', <Add fill="#1989fa" color="#1989fa" />),
        createItem('选项二', <Search fill="#1989fa" color="#1989fa" />),
        createItem('选项三', <Close fill="#1989fa" color="#1989fa" />),
      ],
    }}
  />
)
