import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ThemeProvider,
  Button,
  Input,
  Card,
  Tag,
  Icon,
  Checkbox,
  Radio,
  Rate,
  Progress,
  Slider,
  Switch,
  Calendar,
  Swiper,
  Table,
  Notification,
  ActionSheet,
  Toast,
  ToastContainer,
  Loading,
  LoadingContainer,
  Picker,
  DatePicker,
  Modal,
  responsive,
} from '../components';

const ExampleApp: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [rate, setRate] = useState(3);
  const [progress, setProgress] = useState(60);
  const [sliderValue, setSliderValue] = useState(50);
  const [switchValue, setSwitchValue] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const tableData = [
    { id: 1, name: '张三', age: 25, city: '北京' },
    { id: 2, name: '李四', age: 30, city: '上海' },
    { id: 3, name: '王五', age: 28, city: '广州' },
  ];

  const tableColumns = [
    { key: 'name', title: '姓名', width: 80 },
    { key: 'age', title: '年龄', width: 60 },
    { key: 'city', title: '城市', width: 80 },
  ];

  const actionSheetOptions = [
    { label: '拍照', value: 'camera', icon: 'camera' },
    { label: '从相册选择', value: 'gallery', icon: 'image' },
    { label: '删除', value: 'delete', icon: 'trash-2', destructive: true },
  ];

  const pickerColumns = [
    [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' },
    ],
    [
      { label: '朝阳区', value: 'chaoyang' },
      { label: '海淀区', value: 'haidian' },
      { label: '西城区', value: 'xicheng' },
      { label: '东城区', value: 'dongcheng' },
    ],
  ];

  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    Toast[type](`这是一个${type}消息`);
  };

  const showLoading = () => {
    Loading.show({ text: '加载中...' });
    setTimeout(() => {
      Loading.hide();
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    scrollContent: {
      padding: responsive(16),
    },
    section: {
      marginBottom: responsive(24),
    },
    sectionTitle: {
      fontSize: responsive(18),
      fontWeight: '600',
      marginBottom: responsive(12),
      color: '#333',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsive(12),
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsive(8),
    },
    button: {
      marginRight: responsive(8),
      marginBottom: responsive(8),
    },
    swiperContainer: {
      height: responsive(200),
      borderRadius: responsive(8),
      overflow: 'hidden',
    },
    swiperItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: responsive(8),
    },
    swiperText: {
      fontSize: responsive(24),
      fontWeight: 'bold',
      color: '#fff',
    },
  });

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 基础组件 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>基础组件</Text>
            <Card title="按钮组件" style={{ marginBottom: responsive(12) }}>
              <View style={styles.buttonRow}>
                <Button title="主要按钮" type="primary" style={styles.button} />
                <Button title="次要按钮" type="secondary" style={styles.button} />
                <Button title="成功按钮" type="success" style={styles.button} />
                <Button title="警告按钮" type="warning" style={styles.button} />
                <Button title="危险按钮" type="danger" style={styles.button} />
                <Button title="禁用按钮" disabled style={styles.button} />
              </View>
            </Card>
            
            <Card title="输入框组件" style={{ marginBottom: responsive(12) }}>
              <Input
                placeholder="请输入内容"
                value={inputValue}
                onChangeText={setInputValue}
                leftIcon="search"
                rightIcon="x"
                onRightIconPress={() => setInputValue('')}
              />
            </Card>
            
            <Card title="标签组件" style={{ marginBottom: responsive(12) }}>
              <View style={styles.buttonRow}>
                <Tag text="默认标签" />
                <Tag text="主要标签" type="primary" />
                <Tag text="成功标签" type="success" />
                <Tag text="警告标签" type="warning" />
                <Tag text="危险标签" type="danger" />
                <Tag text="可关闭" closable />
              </View>
            </Card>
          </View>

          {/* 表单组件 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>表单组件</Text>
            <Card title="选择组件" style={{ marginBottom: responsive(12) }}>
              <View style={styles.row}>
                <Checkbox
                  checked={checked}
                  onChange={setChecked}
                  label="复选框"
                />
              </View>
              <View style={styles.row}>
                <Radio
                  checked={radioValue === 'option1'}
                  onChange={() => setRadioValue('option1')}
                  label="选项1"
                />
                <Radio
                  checked={radioValue === 'option2'}
                  onChange={() => setRadioValue('option2')}
                  label="选项2"
                  style={{ marginLeft: responsive(16) }}
                />
              </View>
              <View style={styles.row}>
                <Text>评分: </Text>
                <Rate value={rate} onChange={setRate} />
              </View>
              <View style={styles.row}>
                <Text>开关: </Text>
                <Switch value={switchValue} onChange={setSwitchValue} />
              </View>
            </Card>
            
            <Card title="滑块和进度条" style={{ marginBottom: responsive(12) }}>
              <View style={styles.row}>
                <Text>进度: {progress}%</Text>
              </View>
              <Progress percent={progress} style={{ marginBottom: responsive(12) }} />
              <View style={styles.row}>
                <Text>滑块: {sliderValue}</Text>
              </View>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
              />
            </Card>
          </View>

          {/* 展示组件 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>展示组件</Text>
            <Card title="轮播图" style={{ marginBottom: responsive(12) }}>
              <View style={styles.swiperContainer}>
                <Swiper autoPlay loop>
                  <View style={[styles.swiperItem, { backgroundColor: '#ff6b6b' }]}>
                    <Text style={styles.swiperText}>页面 1</Text>
                  </View>
                  <View style={[styles.swiperItem, { backgroundColor: '#4ecdc4' }]}>
                    <Text style={styles.swiperText}>页面 2</Text>
                  </View>
                  <View style={[styles.swiperItem, { backgroundColor: '#45b7d1' }]}>
                    <Text style={styles.swiperText}>页面 3</Text>
                  </View>
                </Swiper>
              </View>
            </Card>
            
            <Card title="表格" style={{ marginBottom: responsive(12) }}>
              <Table
                columns={tableColumns}
                data={tableData}
                bordered
                striped
              />
            </Card>
          </View>

          {/* 反馈组件 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>反馈组件</Text>
            <Card title="消息提示" style={{ marginBottom: responsive(12) }}>
              <View style={styles.buttonRow}>
                <Button
                  title="成功消息"
                  type="success"
                  size="small"
                  onPress={() => showToast('success')}
                  style={styles.button}
                />
                <Button
                  title="错误消息"
                  type="danger"
                  size="small"
                  onPress={() => showToast('error')}
                  style={styles.button}
                />
                <Button
                  title="警告消息"
                  type="warning"
                  size="small"
                  onPress={() => showToast('warning')}
                  style={styles.button}
                />
                <Button
                  title="信息消息"
                  size="small"
                  onPress={() => showToast('info')}
                  style={styles.button}
                />
              </View>
            </Card>
            
            <Card title="加载和弹窗" style={{ marginBottom: responsive(12) }}>
              <View style={styles.buttonRow}>
                <Button
                  title="显示加载"
                  onPress={showLoading}
                  style={styles.button}
                />
                <Button
                  title="显示模态框"
                  onPress={() => setModalVisible(true)}
                  style={styles.button}
                />
                <Button
                  title="操作菜单"
                  onPress={() => setActionSheetVisible(true)}
                  style={styles.button}
                />
              </View>
            </Card>
          </View>

          {/* 选择器组件 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>选择器组件</Text>
            <Card title="日期和选择器" style={{ marginBottom: responsive(12) }}>
              <View style={styles.buttonRow}>
                <Button
                  title="日历选择"
                  onPress={() => setCalendarVisible(true)}
                  style={styles.button}
                />
                <Button
                  title="选择器"
                  onPress={() => setPickerVisible(true)}
                  style={styles.button}
                />
              </View>
              <DatePicker
                value={selectedDate}
                placeholder="选择日期"
                onConfirm={setSelectedDate}
                style={{ marginTop: responsive(12) }}
              />
            </Card>
          </View>
        </ScrollView>

        {/* 弹窗组件 */}
        <Modal
          visible={modalVisible}
          title="示例模态框"
          onClose={() => setModalVisible(false)}
          footer={
            <View style={styles.buttonRow}>
              <Button
                title="取消"
                type="secondary"
                onPress={() => setModalVisible(false)}
                style={styles.button}
              />
              <Button
                title="确认"
                type="primary"
                onPress={() => setModalVisible(false)}
                style={styles.button}
              />
            </View>
          }
        >
          <Text>这是一个示例模态框的内容。</Text>
        </Modal>

        <Calendar
          visible={calendarVisible}
          onClose={() => setCalendarVisible(false)}
          onConfirm={(date) => {
            console.log('选择的日期:', date);
            setCalendarVisible(false);
          }}
        />

        <ActionSheet
          visible={actionSheetVisible}
          title="选择操作"
          options={actionSheetOptions}
          onSelect={(option) => {
            console.log('选择的操作:', option);
            setActionSheetVisible(false);
          }}
          onCancel={() => setActionSheetVisible(false)}
          onClose={() => setActionSheetVisible(false)}
        />

        <Picker
          visible={pickerVisible}
          title="选择地区"
          columns={pickerColumns}
          onConfirm={(values) => {
            console.log('选择的值:', values);
            setPickerVisible(false);
          }}
          onCancel={() => setPickerVisible(false)}
          onClose={() => setPickerVisible(false)}
        />

        {/* 全局组件 */}
        <ToastContainer />
        <LoadingContainer />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default ExampleApp;