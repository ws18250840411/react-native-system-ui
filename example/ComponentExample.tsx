import React, { useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import {
  ThemeProvider,
  Button,
  Input,
  Icon,
  Card,
  Avatar,
  Badge,
  Tag,
  Divider,
  Empty,
  Loading,
  Switch,
  Checkbox,
  Radio,
  Progress,
  Rate,
  Slider,
  Steps,
  Step,
  Tabs,
  TabPane,
  Collapse,
  CollapsePanel,
  Drawer,
  Modal,
  Popover,
  Tooltip,
} from '../components';

const ComponentExample: React.FC = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState(false);
  const [rateValue, setRateValue] = useState(3);
  const [sliderValue, setSliderValue] = useState(50);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [collapseKey, setCollapseKey] = useState(['panel1']);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <ThemeProvider>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          React Native System UI 组件库示例
        </Text>

        {/* 基础组件 */}
        <Card title="基础组件" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <Button title="主要按钮" variant="primary" onPress={() => Alert.alert('按钮点击')} />
            <Button title="次要按钮" variant="secondary" size="small" />
            <Button title="加载中" loading />
            
            <Input 
              placeholder="请输入内容" 
              onChangeText={(text) => console.log(text)}
            />
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="star" size={24} color="#FFD700" />
              <Icon name="heart" size={24} color="#FF6B6B" />
              <Icon name="settings" size={24} color="#4ECDC4" />
            </View>
          </View>
        </Card>

        {/* 数据展示组件 */}
        <Card title="数据展示" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar name="张三" size="medium" />
              <Avatar source={{ uri: 'https://via.placeholder.com/50' }} size="large" />
              <Badge count={5}>
                <Avatar name="李四" size="medium" />
              </Badge>
            </View>
            
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Tag variant="primary">主要标签</Tag>
              <Tag variant="success" closable onClose={() => console.log('关闭')}>成功标签</Tag>
              <Tag variant="warning" size="small">警告标签</Tag>
            </View>
            
            <Divider />
            
            <Progress percent={75} showInfo />
            <Progress percent={100} status="success" />
            <Progress percent={50} status="error" strokeWidth={12} />
          </View>
        </Card>

        {/* 反馈组件 */}
        <Card title="反馈组件" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <Loading text="加载中..." />
            <Loading size="small" color="#FF6B6B" vertical />
            
            <Empty description="暂无数据" />
          </View>
        </Card>

        {/* 表单组件 */}
        <Card title="表单组件" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text>开关:</Text>
              <Switch 
                value={switchValue} 
                onChange={setSwitchValue}
                activeColor="#4ECDC4"
              />
            </View>
            
            <Checkbox 
              checked={checkboxValue}
              onChange={setCheckboxValue}
              label="复选框选项"
            />
            
            <Radio 
              checked={radioValue}
              onChange={setRadioValue}
              label="单选框选项"
            />
            
            <View>
              <Text style={{ marginBottom: 8 }}>评分: {rateValue}</Text>
              <Rate value={rateValue} onChange={setRateValue} allowHalf />
            </View>
            
            <View>
              <Text style={{ marginBottom: 8 }}>滑块: {sliderValue}</Text>
              <Slider 
                value={sliderValue} 
                onChange={setSliderValue}
                min={0}
                max={100}
                step={1}
              />
            </View>
          </View>
        </Card>

        {/* 导航组件 */}
        <Card title="导航组件" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <View>
              <Text style={{ marginBottom: 8 }}>步骤条:</Text>
              <Steps current={currentStep}>
                <Step title="第一步" description="完成基础配置" />
                <Step title="第二步" description="进行中" />
                <Step title="第三步" description="等待处理" />
              </Steps>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Button 
                  title="上一步" 
                  size="small" 
                  disabled={currentStep === 0}
                  onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
                />
                <Button 
                  title="下一步" 
                  size="small" 
                  disabled={currentStep === 2}
                  onPress={() => setCurrentStep(Math.min(2, currentStep + 1))}
                />
              </View>
            </View>
            
            <View style={{ height: 200 }}>
              <Text style={{ marginBottom: 8 }}>标签页:</Text>
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane key="tab1" tab="标签1">
                  <Text>这是标签1的内容</Text>
                </TabPane>
                <TabPane key="tab2" tab="标签2">
                  <Text>这是标签2的内容</Text>
                </TabPane>
                <TabPane key="tab3" tab="标签3" disabled>
                  <Text>这是标签3的内容</Text>
                </TabPane>
              </Tabs>
            </View>
          </View>
        </Card>

        {/* 布局组件 */}
        <Card title="布局组件" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <Collapse activeKey={collapseKey} onChange={setCollapseKey}>
              <CollapsePanel key="panel1" header="面板1">
                <Text>这是面板1的内容，可以包含任意组件。</Text>
              </CollapsePanel>
              <CollapsePanel key="panel2" header="面板2">
                <Text>这是面板2的内容，支持展开和收起。</Text>
              </CollapsePanel>
              <CollapsePanel key="panel3" header="禁用面板" disabled>
                <Text>这个面板被禁用了。</Text>
              </CollapsePanel>
            </Collapse>
          </View>
        </Card>

        {/* 弹出层组件 */}
        <Card title="弹出层组件" style={{ marginBottom: 16 }}>
          <View style={{ gap: 12 }}>
            <Button 
              title="打开抽屉" 
              onPress={() => setDrawerVisible(true)}
            />
            
            <Button 
              title="打开模态框" 
              variant="secondary"
              onPress={() => setModalVisible(true)}
            />
            
            <Popover 
              content="这是一个弹出框的内容，可以包含更多信息。"
              title="弹出框标题"
              placement="top"
              visible={popoverVisible}
              onVisibleChange={setPopoverVisible}
            >
              <Button title="点击显示弹出框" variant="info" />
            </Popover>
            
            <Tooltip title="这是一个工具提示" placement="top">
              <Button title="悬停显示提示" variant="warning" />
            </Tooltip>
          </View>
        </Card>

        {/* 抽屉 */}
        <Drawer
          visible={drawerVisible}
          title="侧边抽屉"
          placement="left"
          onClose={() => setDrawerVisible(false)}
        >
          <Text>这是抽屉的内容</Text>
          <Button 
            title="关闭抽屉" 
            onPress={() => setDrawerVisible(false)}
            style={{ marginTop: 16 }}
          />
        </Drawer>

        {/* 模态框 */}
        <Modal
          visible={modalVisible}
          title="确认对话框"
          onOk={() => {
            Alert.alert('确认', '您点击了确定按钮');
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        >
          <Text>这是模态框的内容，您确定要执行此操作吗？</Text>
        </Modal>

        <View style={{ height: 50 }} />
      </ScrollView>
    </ThemeProvider>
  );
};

export default ComponentExample;