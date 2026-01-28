import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
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
  Swiper,
  SwiperItem,
  Picker,
  Form,
  Field,
  Input,
} from 'react-native-system-ui'
import './home.css'

const buttons = ['React', 'Native', 'UI']

const ButtonGroupDemo = () => {
  const [current, setCurrent] = React.useState(0)
  return (
    <Space direction="horizontal" gap={8} block>
      {buttons.map((button, index) => (
        <Button
          key={button}
          type={index === current ? 'primary' : 'default'}
          size="small"
          onPress={() => setCurrent(index)}
        >
          {button}
        </Button>
      ))}
    </Space>
  )
}

const SwiperDemo = () => {
  return (
    <Swiper autoplay={3000} loop indicator>
      <SwiperItem>
        <View style={styles.swiperItem}>
          <Typography.Text style={{ color: '#fff', fontSize: 18 }}>Slide 1</Typography.Text>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View style={[styles.swiperItem, { backgroundColor: '#7367f0' }]}>
          <Typography.Text style={{ color: '#fff', fontSize: 18 }}>Slide 2</Typography.Text>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View style={[styles.swiperItem, { backgroundColor: '#52c41a' }]}>
          <Typography.Text style={{ color: '#fff', fontSize: 18 }}>Slide 3</Typography.Text>
        </View>
      </SwiperItem>
    </Swiper>
  )
}

const Home = () => {
  const [switchValue, setSwitchValue] = React.useState(true)
  const [checkboxValue, setCheckboxValue] = React.useState(true)
  const [stepperValue, setStepperValue] = React.useState(1)
  const [pickerValue, setPickerValue] = React.useState<string[]>([])
  const formRef = Form.useForm()

  const pickerColumns = [
    [
      { text: '北京', value: 'beijing' },
      { text: '上海', value: 'shanghai' },
      { text: '广州', value: 'guangzhou' },
      { text: '深圳', value: 'shenzhen' },
    ],
  ]

  return (
    <div className="home-container">
      <div className="home-left">
        <Space direction="vertical" block align="end">
          <Typography.Title level={1}>React Native System UI</Typography.Title>
          <Typography.Title level={2} style={{ textAlign: 'right' }}>
            让成熟的
            <span className="home-primary-color">移动端交互</span>
            以 React Native 方式重生
          </Typography.Title>
          <Typography.Text
            type="secondary"
            size="lg"
            style={{ maxWidth: 520, textAlign: 'right' }}
          >
            基于 React Native 构建的高质量组件库，提供一致的 API 语义、可组合的设计系统和原生性能。
          </Typography.Text>

          <Space gap={16} style={{ marginTop: 30 }}>
            <Button
              round
              type="default"
              size="large"
              style={{ width: 148 }}
              onPress={() => {
                window.location.href = '/components'
              }}
            >
              组件列表
            </Button>
            <Button
              size="large"
              round
              type="primary"
              style={{ width: 148 }}
              onPress={() => {
                window.location.href = '/guide/quick-start'
              }}
            >
              开始使用 →
            </Button>
          </Space>
        </Space>
      </div>
      <div className="home-right">
        <div className="home-right-content">
          <h2 className="home-masonry-title">组件展示</h2>
          <div className="home-masonry">
            {/* Swiper 轮播 - 大卡片 */}
            <View className="home-card-large" style={styles.card}>
              <View style={styles.cardBody}>
                <SwiperDemo />
              </View>
            </View>

            {/* 性能卡片 - 中等卡片，红圈强调体积 */}
            <View className="home-card-medium home-card-performance home-card-gradient" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={12}>
                  <Typography.Text style={{ color: '#fff', fontSize: 14 }}>
                    ⚡️ 性能优化
                  </Typography.Text>
                  <Typography.Text style={{ color: '#fff', fontSize: 14 }}>
                    平均组件体积
                  </Typography.Text>
                  <span className="home-volume-circle">4.0KB (gzipped)</span>
                  <View style={styles.circleRow}>
                    <Circle rate={75} size={60} strokeWidth={6} color="#fff" />
                    <Typography.Text style={{ color: '#fff', fontSize: 14 }}>
                      75% 完成度
                    </Typography.Text>
                  </View>
                </Space>
              </View>
            </View>

            {/* 日历组件 - 大卡片 */}
            <View className="home-card-large" style={styles.card}>
              <View style={styles.cardBody}>
                <Calendar
                  title="日期选择"
                  showConfirm={false}
                  poppable={false}
                  style={{ height: 360 }}
                />
              </View>
            </View>

            {/* 按钮组 - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={12}>
                  <Typography.Text strong>按钮组合</Typography.Text>
                  <ButtonGroupDemo />
                </Space>
              </View>
            </View>

            {/* Switch - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={16}>
                  <Space direction="horizontal" justify="between" block>
                    <Typography.Text>开关状态</Typography.Text>
                    <Switch value={switchValue} onChange={setSwitchValue} />
                  </Space>
                  <Space direction="horizontal" justify="between" block>
                    <Typography.Text>加载中</Typography.Text>
                    <Switch loading />
                  </Space>
                  <Space direction="horizontal" justify="between" block>
                    <Checkbox value={checkboxValue} onChange={setCheckboxValue}>
                      React Native
                    </Checkbox>
                    <Checkbox>TypeScript</Checkbox>
                  </Space>
                </Space>
              </View>
            </View>

            {/* Tabs 横向滚动 - 中等卡片 */}
            <View className="home-card-medium home-tabs" style={styles.card}>
              <View style={styles.cardBody}>
                <Tabs scrollable>
                  <Tabs.TabPane title="基础组件" name="basic">
                    <View style={{ paddingVertical: 16 }}>
                      <Typography.Text>Button、Cell、Tag 等</Typography.Text>
                    </View>
                  </Tabs.TabPane>
                  <Tabs.TabPane title="表单组件" name="form">
                    <View style={{ paddingVertical: 16 }}>
                      <Typography.Text>Input、Picker、Switch 等</Typography.Text>
                    </View>
                  </Tabs.TabPane>
                  <Tabs.TabPane title="展示组件" name="display">
                    <View style={{ paddingVertical: 16 }}>
                      <Typography.Text>Image、Progress、Circle 等</Typography.Text>
                    </View>
                  </Tabs.TabPane>
                  <Tabs.TabPane title="导航组件" name="nav">
                    <View style={{ paddingVertical: 16 }}>
                      <Typography.Text>Tabs、NavBar、Tabbar 等</Typography.Text>
                    </View>
                  </Tabs.TabPane>
                  <Tabs.TabPane title="反馈组件" name="feedback">
                    <View style={{ paddingVertical: 16 }}>
                      <Typography.Text>Toast、Dialog、Notify 等</Typography.Text>
                    </View>
                  </Tabs.TabPane>
                </Tabs>
              </View>
            </View>

            {/* 步进器 - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={16}>
                  <Space direction="horizontal" justify="between" block>
                    <Typography.Text>步进器</Typography.Text>
                    <Stepper value={stepperValue} onChange={setStepperValue} />
                  </Space>
                  <Space direction="horizontal" gap={8} wrap>
                    <Tag type="primary">React</Tag>
                    <Tag type="success">Native</Tag>
                    <Tag type="warning">System</Tag>
                    <Tag type="danger">UI</Tag>
                  </Space>
                </Space>
              </View>
            </View>

            {/* Picker - 中等卡片 */}
            <View className="home-card-medium" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={12}>
                  <Typography.Text strong>选择器</Typography.Text>
                  <Picker
                    columns={pickerColumns}
                    value={pickerValue}
                    onChange={setPickerValue}
                    showToolbar={false}
                    visibleItemCount={3}
                  />
                </Space>
              </View>
            </View>

            {/* 表单 - 大卡片，跨两列 */}
            <View className="home-card-large" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={16}>
                  <Typography.Text strong>表单示例</Typography.Text>
                  <Form ref={formRef}>
                    <Form.Item name="username" label="用户名">
                      <Input placeholder="请输入用户名" clearable />
                    </Form.Item>
                    <Form.Item name="password" label="密码">
                      <Input placeholder="请输入密码" type="password" />
                    </Form.Item>
                    <Space direction="horizontal" gap={12} style={{ marginTop: 8 }}>
                      <Button
                        type="primary"
                        size="small"
                        onPress={() => formRef.current?.submit()}
                      >
                        提交
                      </Button>
                      <Button
                        type="default"
                        size="small"
                        onPress={() => formRef.current?.resetFields()}
                      >
                        重置
                      </Button>
                    </Space>
                  </Form>
                </Space>
              </View>
            </View>

            {/* 按钮展示 - 小卡片 */}
            <View className="home-card-small" style={styles.card}>
              <View style={styles.cardBody}>
                <Space direction="vertical" gap={12}>
                  <Typography.Text strong>按钮样式</Typography.Text>
                  <Space direction="vertical" gap={12} block>
                    <Button type="primary" block>
                      Primary
                    </Button>
                    <Button type="default" block>
                      Default
                    </Button>
                    <Button type="primary" block plain>
                      Plain
                    </Button>
                  </Space>
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
  },
  cardBody: {
    padding: 16,
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
    gap: 12,
    minHeight: 72,
  },
})

export default Home
