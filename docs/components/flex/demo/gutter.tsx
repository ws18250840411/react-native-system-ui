import React from 'react'

import { Flex } from 'react-native-system-ui'
import './style.css'

const Cell = ({ label }: { label: string }) => (
  <div className="demo-flex__item">
    <div className="demo-flex__cell">{label}</div>
  </div>
)

export default () => (
  <div className="demo-flex">
    <div className="demo-flex__row">
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={`row1-${index}`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </div>
    <div className="demo-flex__row">
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={`row2-${index}`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </div>
  </div>
)
