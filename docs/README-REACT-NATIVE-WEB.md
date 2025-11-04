# Vite React Native Web 插件

这个插件实现了类似 `babel-plugin-react-native-web` 的功能，将 `react-native` 的导入重写为 `react-native-web` 的特定模块路径。

## 功能

该插件会将以下导入：

```typescript
import { View, Text, StyleSheet } from 'react-native'
```

转换为：

```typescript
import View from 'react-native-web/dist/exports/View'
import Text from 'react-native-web/dist/exports/Text'
import StyleSheet from 'react-native-web/dist/exports/StyleSheet'
```

这样可以实现按需导入，减少打包体积。

## 使用方法

插件已经在 `vite.config.ts` 中配置好了。确保你的项目安装了 `react-native-web`：

```bash
npm install react-native-web
```

## 工作原理

1. **resolve.alias**: 将 `react-native` 默认指向 `react-native-web`
2. **插件转换**: 在构建时，将命名导入转换为 `react-native-web/dist/exports/模块名` 的形式

## 支持的模块

插件支持所有 `react-native-web` 导出的模块，包括：
- View, Text, Image, ScrollView 等基础组件
- StyleSheet, Platform, Dimensions 等工具
- Animated, FlatList, SectionList 等高级组件
- 等等...

## 配置选项

插件支持以下选项：

```typescript
reactNativeWeb({
  commonjs: false, // 是否使用 CommonJS 格式（默认 false）
})
```

