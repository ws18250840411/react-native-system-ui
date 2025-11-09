import React from 'react'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <div
    style={{
      height: 40,
      borderRadius: 8,
      backgroundColor: '#e0f2fe',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0369a1',
    }}
  >
    {label}
  </div>
)

export default () => (
  <Flex gutter={[12, 12]}>
    {new Array(6).fill(null).map((_, index) => (
      <Flex.Item span={8} key={index}>
        <Cell label={`span: 8`} />
      </Flex.Item>
    ))}
  </Flex>
)
