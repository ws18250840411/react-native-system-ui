import React from 'react'

import { ConfigProvider, Button, Rate, Slider } from 'react-native-system-ui'
import './style.css'

const theme = {
  components: {
    button: {
      toneMap: {
        primary: {
          background: '#8a46ff',
          border: '#8a46ff',
          text: '#ffffff',
        },
      },
    },
    slider: {
      track: {
        height: 4,
      },
      colors: {
        active: '#8a46ff',
        inactive: '#e5e8f0',
      },
      thumb: {
        size: 22,
      },
    },
    rate: {
      colors: {
        active: '#ffcc56',
        inactive: '#f2dcb0',
        disabled: '#d8dce7',
      },
    },
  },
}

export default () => {
  const [score, setScore] = React.useState(4)
  const [progress, setProgress] = React.useState(60)

  const handleSliderChange = (value: number | [number, number]) => {
    setProgress(Array.isArray(value) ? value[0] : value)
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="demo-config-provider demo-config-provider--theme">
        <div className="demo-config-provider__card">
          <p className="demo-config-provider__title">定制主题</p>
          <div className="demo-config-provider__row">
            <span className="demo-config-provider__label">评分</span>
            <Rate value={score} onChange={setScore} />
          </div>
          <div className="demo-config-provider__row demo-config-provider__row--slider">
            <span className="demo-config-provider__label">滑块</span>
            <div className="demo-config-provider__slider-control">
              <Slider value={progress} onChange={handleSliderChange} style={{ flex: 1 }} />
              <span className="demo-config-provider__value">{progress}</span>
            </div>
          </div>
        </div>
        <Button text="提交" type="primary" block round />
      </div>
    </ConfigProvider>
  )
}
