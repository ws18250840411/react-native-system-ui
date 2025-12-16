import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={`span: 8-${index + 1}`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

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
