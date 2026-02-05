import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Badge,
  Button,
  Calendar,
  Switch,
  Checkbox,
  Tabs,
  Space,
  Flex,
  Typography,
  Tag,
  Stepper,
  Circle,
  Slider,
  Swiper,
  SwiperItem,
  Picker,
  Form,
  Field,
  Input,
} from 'react-native-system-ui'
import componentSizes from '../../component-sizes'
import './home.css'

const SwiperDemo = () => {
  return (
    <Swiper autoplay={3000} loop indicator style={{ height: 160 }}>
      <SwiperItem>
        <View style={styles.swiperItem}>
          <Typography.Text style={{ color: '#fff', fontSize: 18 }}>第一页</Typography.Text>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View style={[styles.swiperItem, { backgroundColor: '#7367f0' }]}>
          <Typography.Text style={{ color: '#fff', fontSize: 18 }}>第二页</Typography.Text>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View style={[styles.swiperItem, { backgroundColor: '#52c41a' }]}>
          <Typography.Text style={{ color: '#fff', fontSize: 18 }}>第三页</Typography.Text>
        </View>
      </SwiperItem>
    </Swiper>
  )
}

const cardTitleStyle = { fontSize: 15, alignSelf: 'flex-start' }

const Home = () => {
  const [switchValue, setSwitchValue] = React.useState(true)
  const [checkboxValue, setCheckboxValue] = React.useState(true)
  const [stepperValue, setStepperValue] = React.useState(1)
  const [pickerValue, setPickerValue] = React.useState<string[]>([])
  const [circleRate, setCircleRate] = React.useState(75)
  const formRef = Form.useForm()

  const pickerColumns = [
    [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' },
    ],
  ]

  const formatSize = (bytes: number) => (bytes / 1024).toFixed(1) + ' KB'
  const totalSize = componentSizes.reduce((acc, item) => acc + item.size, 0)
  const avgSize = componentSizes.length ? totalSize / componentSizes.length : 0
  const sortedBySize = [...componentSizes].sort((a, b) => b.size - a.size)
  const getSizeColor = (bytes: number) => {
    const kb = bytes / 1024
    if (kb > 10) return '#b91c1c'   /* 红 */
    if (kb > 5) return '#c2410c'    /* 橙 */
    if (kb > 2) return '#1d4ed8'    /* 蓝 */
    return '#15803d'                /* 绿 */
  }

  return (
    <div className="home-container">
      <div className="home-left">
        <div className="home-hero">
          <h1 className="home-hero-title">React Native System UI</h1>
          <p className="home-hero-subtitle">
            面向 React Native 的<span className="home-primary-color">设计系统级</span>组件库
          </p>
          <p className="home-hero-desc">
            Tokens + ThemeProvider 主题体系，按需引入、体积小；API 统一可组合、高效可靠，支持可访问性与多端一致。
          </p>
          <div className="home-hero-actions">
            <Button
              round
              type="default"
              size="large"
              style={{ minWidth: 140 }}
              onPress={() => { window.location.href = '/components' }}
            >
              组件列表
            </Button>
            <Button
              size="large"
              round
              type="primary"
              style={{ minWidth: 140 }}
              onPress={() => { window.location.href = '/guide/quick-start' }}
            >
              开始使用 →
            </Button>
          </div>
        </div>

        {/* 左侧：组件体积（按大到小，可滚动） */}
        <section className="home-size-section home-size-section-left">
          <h3 className="home-size-title">组件体积（gzip）</h3>
          <p className="home-size-note">
            按需引入后单组件约 {formatSize(avgSize)}（各组件目录 gzip 相加估算）。支持 Tree Shaking，实际打包体积以构建结果为准。
          </p>
          <div className="home-size-list">
            {sortedBySize.map((item) => (
              <div key={item.name} className="home-size-item">
                <span
                  className="home-size-badge"
                  style={{ backgroundColor: getSizeColor(item.size) }}
                >
                  {formatSize(item.size)}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="home-right">
        <div className="home-right-content">
          <h2 className="home-masonry-title">组件展示</h2>
          <div className="home-masonry">
            {/* Swiper 轮播 - 大卡片 */}
            <View className="home-card-large" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>轮播</Typography.Text>
                <View style={{ width: '100%', marginTop: 12 }}>
                  <SwiperDemo />
                </View>
              </View>
            </View>

            {/* 环形进度 - 动态控制（标题 + 圆环中央百分比 + Slider） */}
            <View className="home-card-medium home-card-performance" style={[styles.card, styles.cardPerformance]}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>环形进度条</Typography.Text>
                <View style={styles.circleRow}>
                  <View style={styles.circleWrapper}>
                    <Circle
                      rate={circleRate}
                      size={100}
                      strokeWidth={8}
                      color="#3f45ff"
                      layerColor="#ebedf0"
                    >
                      {circleRate}%
                    </Circle>
                  </View>
                </View>
                <View style={styles.sliderRow}>
                  <Slider
                    value={circleRate}
                    min={0}
                    max={100}
                    onChange={v => setCircleRate(Array.isArray(v) ? v[0] : v)}
                    activeColor="#3f45ff"
                    inactiveColor="#ebedf0"
                  />
                </View>
              </View>
            </View>

            {/* 日历组件 - 大卡片 */}
            <View className="home-card-large" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>日期选择</Typography.Text>
                <View style={{ width: '100%', marginTop: 12 }}>
                  <Calendar
                    title=""
                    showConfirm={false}
                    poppable={false}
                    style={{ height: 340 }}
                  />
                </View>
              </View>
            </View>

            {/* Badge 徽标 - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>徽标</Typography.Text>
                <Space direction="horizontal" gap={16} style={{ marginTop: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Badge content={5}>
                    <View style={styles.badgePlaceholder} />
                  </Badge>
                  <Badge content={99} max={99}>
                    <View style={styles.badgePlaceholder} />
                  </Badge>
                  <Badge dot>
                    <View style={styles.badgePlaceholder} />
                  </Badge>
                  <Badge content="hot" color="#3f45ff">
                    <View style={styles.badgePlaceholder} />
                  </Badge>
                </Space>
              </View>
            </View>

            {/* Switch - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>开关</Typography.Text>
                <Space direction="vertical" gap={16} style={{ width: '100%', marginTop: 12 }}>
                  <Space direction="horizontal" justify="between" block>
                    <Typography.Text>状态</Typography.Text>
                    <Switch value={switchValue} onChange={setSwitchValue} />
                  </Space>
                  <Space direction="horizontal" justify="between" block>
                    <Checkbox value={checkboxValue} onChange={setCheckboxValue}>
                      选项一
                    </Checkbox>
                    <Checkbox>选项二</Checkbox>
                  </Space>
                </Space>
              </View>
            </View>

            {/* Tabs 横向滚动 - 中等卡片 */}
            <View className="home-card-medium home-tabs" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>标签页</Typography.Text>
                <View style={{ width: '100%', marginTop: 12 }}>
                  <Tabs scrollable>
                    <Tabs.TabPane title="基础组件" name="basic">
                      <View style={{ paddingVertical: 16 }}>
                        <Typography.Text>按钮、单元格、标签等基础组件。</Typography.Text>
                      </View>
                    </Tabs.TabPane>
                    <Tabs.TabPane title="表单组件" name="form">
                      <View style={{ paddingVertical: 16 }}>
                        <Typography.Text>输入框、选择器、开关等表单控件。</Typography.Text>
                      </View>
                    </Tabs.TabPane>
                    <Tabs.TabPane title="展示组件" name="display">
                      <View style={{ paddingVertical: 16 }}>
                        <Typography.Text>图片、进度条、环形进度等。</Typography.Text>
                      </View>
                    </Tabs.TabPane>
                    <Tabs.TabPane title="导航组件" name="nav">
                      <View style={{ paddingVertical: 16 }}>
                        <Typography.Text>标签页、导航栏、标签栏等导航组件。</Typography.Text>
                      </View>
                    </Tabs.TabPane>
                    <Tabs.TabPane title="反馈组件" name="feedback">
                      <View style={{ paddingVertical: 16 }}>
                        <Typography.Text>轻提示、弹窗、通知等反馈组件。</Typography.Text>
                      </View>
                    </Tabs.TabPane>
                  </Tabs>
                </View>
              </View>
            </View>

            {/* 步进器 - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>步进器</Typography.Text>
                <Space direction="vertical" gap={16} style={{ marginTop: 12, alignItems: 'center' }}>
                  <Stepper value={stepperValue} onChange={setStepperValue} />
                  <Space direction="horizontal" gap={8} wrap style={{ justifyContent: 'center' }}>
                    <Tag type="primary">主要</Tag>
                    <Tag type="success">成功</Tag>
                    <Tag type="warning">警告</Tag>
                    <Tag type="danger">危险</Tag>
                  </Space>
                </Space>
              </View>
            </View>

            {/* Picker - 中等卡片 */}
            <View className="home-card-medium" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>选择器</Typography.Text>
                <View style={{ width: '100%', marginTop: 12 }}>
                  <Picker
                    columns={pickerColumns}
                    value={pickerValue}
                    onChange={setPickerValue}
                    showToolbar={false}
                    visibleItemCount={3}
                  />
                </View>
              </View>
            </View>

            {/* 表单 - 大卡片 */}
            <View className="home-card-large" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>表单</Typography.Text>
                <View style={{ width: '100%', marginTop: 12 }}>
                  <Form ref={formRef}>
                    <Form.Item name="username" label="用户名">
                      <Input placeholder="请输入用户名" clearable />
                    </Form.Item>
                    <Form.Item name="password" label="密码">
                      <Input placeholder="请输入密码" type="password" />
                    </Form.Item>
                    <Space direction="horizontal" gap={12} style={{ marginTop: 16 }}>
                      <Button type="primary" size="small" onPress={() => formRef.current?.submit()}>
                        提交
                      </Button>
                      <Button type="default" size="small" onPress={() => formRef.current?.resetFields()}>
                        重置
                      </Button>
                    </Space>
                  </Form>
                </View>
              </View>
            </View>

            {/* 按钮样式 - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={[styles.cardBody, styles.cardBodyCentered]}>
                <Typography.Text strong style={cardTitleStyle}>按钮</Typography.Text>
                <Space direction="vertical" gap={12} style={{ marginTop: 12, alignItems: 'center' }} block>
                  <Button type="primary" block>主要按钮</Button>
                  <Button type="success" block>成功按钮</Button>
                  <Button type="default" block>默认按钮</Button>
                  <Button type="default" block plain>朴素按钮</Button>
                </Space>
              </View>
            </View>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ebedf0',
    overflow: 'hidden',
    marginBottom: 28,
  },
  cardPerformance: {
    overflow: 'visible',
  },
  cardBody: {
    padding: 16,
  },
  cardBodyCentered: {
    alignItems: 'center',
  },
  swiperItem: {
    height: 160,
    backgroundColor: '#3f45ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  circleWrapper: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderRow: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  badgePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#ebedf0',
  },
})

export default Home
