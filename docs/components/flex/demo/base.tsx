import React from 'react'

import { Flex } from 'react-native-system-ui'
import './style.css'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <div className="demo-flex__item">
    <div className={`demo-flex__block demo-flex__block--${tone}`}>{label}</div>
  </div>
)

export default () => (
  <div className="demo-flex">
    <div className="demo-flex__row">
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </div>
    <div className="demo-flex__row">
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
    </div>
  </div>
)
