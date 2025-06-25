# React Native System UI 组件库

一个现代化的 React Native UI 组件库，提供丰富的组件和主题系统。

## 特性

- 🎨 **主题系统**: 支持亮色/暗色主题，可自定义主题配置
- 📱 **响应式设计**: 自动适配不同屏幕尺寸
- 🔧 **TypeScript**: 完整的 TypeScript 类型定义
- 🎯 **易于使用**: 简洁的 API 设计
- 🚀 **高性能**: 优化的组件实现

## 安装

```bash
npm install react-native-system-ui
# 或
yarn add react-native-system-ui
```

## 快速开始

### 1. 配置主题提供者

```tsx
import React from 'react';
import { ThemeProvider, defaultTheme } from 'react-native-system-ui';
import App from './App';

export default function Root() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  );
}
```

### 2. 使用组件

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Input,
  Card,
  Switch,
  Checkbox,
} from 'react-native-system-ui';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Card title="示例卡片">
        <Input
          value={inputValue}
          placeholder="请输入内容"
          onChangeText={setInputValue}
        />
        
        <Button
          title="提交"
          variant="primary"
          onPress={() => console.log('提交:', inputValue)}
        />
        
        <Switch
          value={switchValue}
          onChange={setSwitchValue}
        />
        
        <Checkbox
          checked={checkboxValue}
          onChange={setCheckboxValue}
          label="我同意用户协议"
        />
      </Card>
    </View>
  );
}
```

## 组件列表

### 基础组件

- **Button**: 按钮组件，支持多种样式和状态
- **Icon**: 图标组件，内置常用图标
- **Avatar**: 头像组件，支持图片和文字头像
- **Badge**: 徽章组件，用于显示数字或状态
- **Tag**: 标签组件，支持多种颜色和可关闭
- **Divider**: 分割线组件，支持水平和垂直方向

### 表单组件

- **Input**: 输入框组件，支持多种状态和验证
- **Switch**: 开关组件，用于布尔值切换
- **Checkbox**: 复选框组件，支持半选状态
- **Radio**: 单选框组件，用于单选操作

### 反馈组件

- **Loading**: 加载指示器，支持多种尺寸和样式
- **Empty**: 空状态组件，用于显示无数据状态

### 布局组件

- **Card**: 卡片容器，用于内容分组

## 主题系统

### 使用预设主题

```tsx
import { ThemeProvider, defaultTheme, darkTheme } from 'react-native-system-ui';

// 使用亮色主题
<ThemeProvider theme={defaultTheme}>
  <App />
</ThemeProvider>

// 使用暗色主题
<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>
```

### 自定义主题

```tsx
import { createTheme, ThemeProvider } from 'react-native-system-ui';

const customTheme = createTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    // ... 其他颜色配置
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // ... 其他配置
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### 在组件中使用主题

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-system-ui';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        使用主题颜色
      </Text>
    </View>
  );
}
```

## 工具函数

组件库提供了一系列实用的工具函数：

```tsx
import {
  responsive,
  px,
  pt,
  getSizeValue,
  getFontSizeValue,
  getSpacingValue,
  isIOS,
  isAndroid,
  hexToRgba,
  isDarkColor,
} from 'react-native-system-ui';

// 响应式尺寸
const width = responsive(100); // 根据屏幕密度调整

// 像素转换
const size = px(16); // PixelRatio 转换
const designSize = pt(100); // 设计稿尺寸转换

// 主题值获取
const buttonSize = getSizeValue('medium'); // 获取中等尺寸
const fontSize = getFontSizeValue('large'); // 获取大字体
const spacing = getSpacingValue('md'); // 获取中等间距

// 平台判断
if (isIOS()) {
  // iOS 特定逻辑
}

// 颜色处理
const rgba = hexToRgba('#FF0000', 0.5); // 转换为 rgba
const isDark = isDarkColor('#333333'); // 判断是否为深色
```

## TypeScript 支持

组件库完全使用 TypeScript 编写，提供完整的类型定义：

```tsx
import { ButtonProps, InputProps, Theme } from 'react-native-system-ui';

// 组件属性类型
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false,
};

// 主题类型
const theme: Theme = {
  colors: {
    primary: '#007AFF',
    // ...
  },
  // ...
};
```

## 响应式设计

组件库内置响应式设计支持，自动适配不同屏幕尺寸：

```tsx
// 组件会根据屏幕密度自动调整尺寸
<Button size="medium" title="自适应按钮" />

// 手动使用响应式函数
const styles = StyleSheet.create({
  container: {
    padding: responsive(16), // 自动适配的内边距
    width: pt(300), // 设计稿尺寸转换
  },
});
```

## 性能优化

- 所有组件都使用 `React.memo` 进行优化
- 样式计算使用 `useMemo` 缓存
- 事件处理使用 `useCallback` 优化
- 支持按需导入，减少包体积

## 许可证

MIT License