import React from 'react'

import { Flex } from 'react-native-system-ui'

const Box = ({ label }: { label: string }) => (
  <div
    style={{
      width: 60,
      height: 32,
      borderRadius: 6,
      backgroundColor: '#fde68a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#92400e',
    }}
  >
    {label}
  </div>
)

const Group = ({ direction }: { direction: 'row' | 'column' }) => (
  <Flex direction={direction} gutter={[8, 8]}>
    <Flex.Item>
      <Box label="span" />
    </Flex.Item>
    <Flex.Item>
      <Box label="span" />
    </Flex.Item>
    <Flex.Item>
      <Box label="span" />
    </Flex.Item>
  </Flex>
)

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Group direction="row" />
    <Group direction="column" />
  </div>
)
