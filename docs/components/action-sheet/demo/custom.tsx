import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ActionSheet, Cell } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const onCancel = () => setVisible(false)
  return (
    <>
      <Cell title="自定义面板" isLink onPress={() => setVisible(true)} />
      <ActionSheet visible={visible} onCancel={onCancel}>
        <View style={styles.content}>
          <Text>内容</Text>
        </View>
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 160,
  },
})
