import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default function FlexGutterDemo() {
  return (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={`row1-${index}`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={`row2-${index}`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
