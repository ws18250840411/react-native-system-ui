import React from 'react'
import { performance } from 'perf_hooks'
import { JSDOM } from 'jsdom'
import { act, create } from 'react-test-renderer'

import Rate from '../src/components/rate/Rate'
import PasswordInput from '../src/components/password-input/PasswordInput'
import Typography from '../src/components/typography/Typography'
import Calendar from '../src/components/calendar/Calendar'
import Cascader from '../src/components/cascader/Cascader'
import Picker from '../src/components/picker/Picker'
import Tabs from '../src/components/tabs/Tabs'
import Swiper from '../src/components/swiper/Swiper'
import SwiperItem from '../src/components/swiper/SwiperItem'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
const dom = new JSDOM('<!doctype html><html><body></body></html>')
globalThis.window = dom.window as unknown as Window & typeof globalThis
globalThis.document = dom.window.document
globalThis.navigator = dom.window.navigator
globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number
globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id as unknown as NodeJS.Timeout)

type BenchmarkConfig = {
  name: string
  iterations: number
  render: (iteration: number) => React.ReactElement
}

type BenchmarkResult = {
  name: string
  iterations: number
  totalMs: number
  avgMs: number
  renders: number
}

type BenchmarkSummary = {
  name: string
  iterations: number
  runs: number
  avgTotalMs: number
  medianTotalMs: number
  avgAvgMs: number
  medianAvgMs: number
  avgRenders: number
}

const runOnce = ({ name, iterations, render }: BenchmarkConfig): BenchmarkResult => {
  let renders = 0
  const trackRender = () => {
    renders += 1
  }

  const RenderCounter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    trackRender()
    return <>{children}</>
  }

  const wrap = (iteration: number) => (
    <RenderCounter>
      {render(iteration)}
    </RenderCounter>
  )

  let root: ReturnType<typeof create>
  act(() => {
    root = create(wrap(0))
  })

  // Warmup one update to reduce first render noise.
  act(() => {
    root.update(wrap(1))
  })

  const start = performance.now()
  for (let i = 2; i < iterations + 2; i += 1) {
    act(() => {
      root.update(wrap(i))
    })
  }
  const end = performance.now()

  act(() => {
    root.unmount()
  })

  if (typeof performance.clearMarks === 'function') {
    performance.clearMarks()
  }
  if (typeof performance.clearMeasures === 'function') {
    performance.clearMeasures()
  }

  const totalMs = end - start
  return {
    name,
    iterations,
    totalMs,
    avgMs: totalMs / iterations,
    renders,
  }
}

const median = (values: number[]) => {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

const runBenchmark = (config: BenchmarkConfig, runs = 5): BenchmarkSummary => {
  const results: BenchmarkResult[] = []
  for (let i = 0; i < runs; i += 1) {
    results.push(runOnce(config))
  }

  const totalMsList = results.map(r => r.totalMs)
  const avgMsList = results.map(r => r.avgMs)
  const rendersList = results.map(r => r.renders)

  const avg = (list: number[]) => list.reduce((sum, v) => sum + v, 0) / (list.length || 1)

  return {
    name: config.name,
    iterations: config.iterations,
    runs,
    avgTotalMs: avg(totalMsList),
    medianTotalMs: median(totalMsList),
    avgAvgMs: avg(avgMsList),
    medianAvgMs: median(avgMsList),
    avgRenders: avg(rendersList),
  }
}

const padCode = (value: number, length = 6) => String(value).padStart(length, '0').slice(-length)

const buildCascaderOptions = (depth: number, breadth: number) => {
  const makeLevel = (level: number, prefix: string): any[] => {
    return Array.from({ length: breadth }, (_, idx) => {
      const value = `${prefix}-${level}-${idx}`
      return {
        text: `Option ${value}`,
        value,
        children: level < depth ? makeLevel(level + 1, value) : undefined,
      }
    })
  }
  return makeLevel(1, 'root')
}

const cascaderOptions = buildCascaderOptions(3, 6)

const pickerColumns = [
  Array.from({ length: 20 }, (_, idx) => ({ label: `Option ${idx}`, value: idx })),
  Array.from({ length: 15 }, (_, idx) => ({ label: `B ${idx}`, value: idx })),
]

const benchmarks: BenchmarkConfig[] = [
  {
    name: 'Rate',
    iterations: 1200,
    render: (iteration) => (
      <Rate
        value={(iteration % 5) + 1}
        count={5}
        allowHalf={iteration % 2 === 0}
        size={16}
        gutter={4}
      />
    ),
  },
  {
    name: 'PasswordInput',
    iterations: 1000,
    render: (iteration) => (
      <PasswordInput
        value={padCode(iteration)}
        length={6}
        mask={iteration % 3 !== 0}
        gutter={8}
        showCursor={iteration % 2 === 0}
      />
    ),
  },
  {
    name: 'Typography.Text',
    iterations: 1500,
    render: (iteration) => (
      <Typography.Text
        type={iteration % 2 === 0 ? 'primary' : 'secondary'}
        ellipsis={iteration % 5 === 0 ? { rows: 1, expandText: '展开', collapseText: '收起' } : false}
      >
        {`Typography text ${iteration} with some extra words to render.`}
      </Typography.Text>
    ),
  },
  {
    name: 'Calendar',
    iterations: 300,
    render: (iteration) => (
      <Calendar
        poppable={false}
        type={iteration % 2 === 0 ? 'range' : 'single'}
        value={iteration % 2 === 0
          ? [new Date(2020, 5, 1), new Date(2020, 5, (iteration % 28) + 2)]
          : new Date(2020, 5, (iteration % 28) + 1)
        }
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date(2020, 11, 31)}
        showConfirm={false}
      />
    ),
  },
  {
    name: 'Cascader',
    iterations: 200,
    render: (iteration) => (
      <Cascader
        poppable={false}
        options={cascaderOptions}
        value={[`root-1-0`, `root-1-0-2`, `root-1-0-2-3`]}
        swipeable={iteration % 2 === 0}
      />
    ),
  },
  {
    name: 'Picker',
    iterations: 300,
    render: (iteration) => (
      <Picker
        columns={pickerColumns}
        value={[iteration % 20, iteration % 15]}
        showToolbar={false}
        visibleItemCount={5}
      />
    ),
  },
  {
    name: 'Tabs',
    iterations: 300,
    render: (iteration) => (
      <Tabs
        active={iteration % 3}
        animated
        swipeable={false}
      >
        <Tabs.TabPane name={0} title="Tab 0">
          <Typography.Text>Content 0</Typography.Text>
        </Tabs.TabPane>
        <Tabs.TabPane name={1} title="Tab 1">
          <Typography.Text>Content 1</Typography.Text>
        </Tabs.TabPane>
        <Tabs.TabPane name={2} title="Tab 2">
          <Typography.Text>Content 2</Typography.Text>
        </Tabs.TabPane>
      </Tabs>
    ),
  },
  {
    name: 'Swiper',
    iterations: 200,
    render: (iteration) => (
      <Swiper autoplay={false} loop={false} initialSwipe={iteration % 3}>
        <SwiperItem>
          <Typography.Text>Slide 1</Typography.Text>
        </SwiperItem>
        <SwiperItem>
          <Typography.Text>Slide 2</Typography.Text>
        </SwiperItem>
        <SwiperItem>
          <Typography.Text>Slide 3</Typography.Text>
        </SwiperItem>
      </Swiper>
    ),
  },
]

const results = benchmarks.map(config => runBenchmark(config, 5))

const format = (value: number) => value.toFixed(3)

for (const result of results) {
  console.log(
    `[bench] ${result.name} runs=${result.runs} iterations=${result.iterations} ` +
    `medianTotalMs=${format(result.medianTotalMs)} avgTotalMs=${format(result.avgTotalMs)} ` +
    `medianAvgMs=${format(result.medianAvgMs)} avgAvgMs=${format(result.avgAvgMs)} ` +
    `avgRenders=${format(result.avgRenders)}`
  )
}

if (typeof dom.window?.close === 'function') {
  dom.window.close()
}

setTimeout(() => {
  process.exit(0)
}, 0)
