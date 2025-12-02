import React from 'react'

import { Flex } from 'react-native-system-ui'
import './style.css'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <div className="demo-flex__item">
    <div className={`demo-flex__block demo-flex__block--${tone}`}>{label}</div>
  </div>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <div className="demo-flex__row">
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={`span: 8-${index + 1}`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </div>
  )
}

export default () => (
  <div className="demo-flex">
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </div>
)
