---
simulator:
  compact: false
---

# Text 主题文案

## 介绍

基于 RN 原生 `Text` 的轻量封装，自动从 `ThemeProvider` / `ConfigProvider` 读取 `foundations.typography.fontFamily`，便于业务中统一使用全局字体。RN 无样式继承，组件库内部文案已通过 Token 覆盖；业务侧手写 `<Text>` 时可用本组件替代原生 `Text`，即可跟随主题字体。

## 引入

```js
import { Text } from 'react-native-system-ui'
```

## 代码演示

### 全局字体

在根节点用 `ConfigProvider` 配置 `theme.foundations.typography.fontFamily` 后，使用 `Text` 的文案会自动应用该字体。

<code title="全局字体" src="./text/demo/global-font.tsx"></code>

### 局部覆盖

通过 `style.fontFamily` 可对单处文案覆盖主题字体。

<code title="局部覆盖" src="./text/demo/override.tsx"></code>

## API

与 `react-native` 的 `Text` 保持一致，支持 `forwardRef` 及所有原生 Props。仅行为上会先注入主题 `fontFamily`，再与传入的 `style` 合并（传入的 `style.fontFamily` 优先级更高）。

| 说明     | 类型 |
|----------|------|
| 继承 RN `Text` 全部 Props | `TextProps` |

## 与 Typography 区别

| 组件        | 适用场景 |
|-------------|----------|
| `Text`      | 仅需跟随全局字体，API 与 RN Text 一致，极简。 |
| `Typography.Text` | 需要语义色、尺寸、省略、链接等排版能力时使用。 |
