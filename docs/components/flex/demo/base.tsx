import React from 'react'

import { Flex } from 'react-native-system-ui'

const colors = ['#3b82f6', '#2563eb', '#1d4ed8']

export default () => (
  <Flex>
    {new Array(3).fill(null).map((_, index) => (
      <Flex.Item span={8} key={index}>
        <div
          style={{
            height: 48,
            borderRadius: 8,
            backgroundColor: colors[index],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
          }}
        >
          span: 8
        </div>
      </Flex.Item>
    ))}
  </Flex>
)
