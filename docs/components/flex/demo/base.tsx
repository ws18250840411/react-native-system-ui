import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default function FlexBaseDemo() {
  return (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
