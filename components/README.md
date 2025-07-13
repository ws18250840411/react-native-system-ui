# React Native System UI Components

一个基于 React Native 的现代化 UI 组件库，提供完整的主题系统和丰富的组件集合。

## 特性

- 🎨 **完整的主题系统** - 支持亮色/暗色主题切换
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🔧 **TypeScript 支持** - 完整的类型定义
- 🎯 **高度可定制** - 灵活的样式配置
- 📦 **模块化设计** - 按需导入，减小包体积
- ♿ **无障碍支持** - 遵循无障碍设计规范

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
import React from 'react';
import { View } from 'react-native';
import { Button, Input, Card } from 'react-native-system-ui';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Card title="欢迎使用" description="React Native System UI 组件库">
        <Input placeholder="请输入内容" />
        <Button onPress={() => console.log('按钮点击')}>确认</Button>
      </Card>
    </View>
  );
}
```

## 组件列表

### 基础组件

- **Button** - 按钮组件，支持多种样式和状态
- **Icon** - 图标组件，内置丰富的图标库
- **Input** - 输入框组件，支持多种输入类型
- **Switch** - 开关组件，支持动画效果
- **Checkbox** - 复选框组件
- **Radio** - 单选框组件

### 展示组件

- **Card** - 卡片组件，用于内容展示
- **Avatar** - 头像组件，支持图片、文字、图标
- **Badge** - 徽章组件，用于消息提醒
- **Tag** - 标签组件，支持多种样式
- **Divider** - 分割线组件
- **Loading** - 加载组件，支持自定义样式
- **Empty** - 空状态组件

## 主题定制

### 使用内置主题

```tsx
import { ThemeProvider, defaultTheme, darkTheme } from 'react-native-system-ui';

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
    // ... 其他颜色配置
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // ... 其他主题配置
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### 在组件中使用主题

```tsx
import { useTheme } from 'react-native-system-ui';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      {/* 组件内容 */}
    </View>
  );
}
```

## 响应式工具

组件库提供了响应式工具函数：

```tsx
import { pt, px, responsive } from 'react-native-system-ui';

// pt: 基于设计稿宽度的响应式尺寸
const width = pt(100); // 基于 375px 设计稿

// px: 基于像素密度的尺寸转换
const fontSize = px(16);

// responsive: 自定义响应式函数
const responsiveWidth = responsive(100, 375);
```

## API 文档

详细的 API 文档请参考各组件的 TypeScript 类型定义。每个组件都提供了完整的属性说明和使用示例。

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件库。

## 许可证

MIT License