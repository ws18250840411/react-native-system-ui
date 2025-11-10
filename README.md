# react-native-system-ui

React Native 端的 react-vant 式移动组件库，参考 **react-vant** 的交互与 API、一致性借鉴 **react-native-xiaoshu** 的原子化设计，目标是产出“极简、强韧、低心智”体验的系统化 UI 资产。

## 愿景 / Goals

- ✅ 用统一的设计令 react-vant 的体验可以在原生端复用，同时尊重 React Native 的运行特性（无 less、依赖 StyleSheet）。
- ✅ 提供轻量的设计系统（tokens + provider + hooks），组件不直接耦合具体样式，利于按需复用与主题定制。
- ✅ 默认约束与 API 语义与 react-vant 对齐，保证后续迁移成本极低。
- ✅ 文档与示例聚焦“如何落地 + 如何扩展”，减少探索成本。

## 快速开始

```bash
# 安装（推荐 pnpm/yarn）
pnpm add react-native-system-ui

# 同时保证项目已安装 react 和 react-native（>=19 / >=0.79）
```

```tsx
import { ThemeProvider, Button } from 'react-native-system-ui'

export const Demo = () => (
  <ThemeProvider>
    <Button text="提交" type="primary" shadow />
  </ThemeProvider>
)
```

### 自定义 Tokens

```tsx
import { ThemeProvider, createTokens } from 'react-native-system-ui'

const foundations = createTokens({
  palette: {
    primary: {
      500: '#111f8f',
      600: '#0b1461',
    },
  },
})

export const App = ({ children }) => (
  <ThemeProvider
    value={{
      foundations,
      components: {
        button: {
          defaults: {
            size: 'large',
          },
        },
      },
    }}
  >
    {children}
  </ThemeProvider>
)
```

## 架构总览

| 层级 | 说明 |
| --- | --- |
| `src/design-system` | 仅承载基础设计变量（颜色、排版、间距、圆角等）与 `ThemeProvider`，只做公共部分。 |
| `src/components/*` | 每个组件自带 `tokens.ts`/`useXXXTokens.ts` 等文件，负责自身的 token 推导与样式实现（Button 为首个示例）。 |

> 这一层次化结构让“设计语言”与“交互实现”各司其职，可快速复制 react-vant 的 40+ 组件而不失控。

## 目前进度

- ✳️ **Design System v0.1**：仅提供配色/间距/排版等基础变量与 `ThemeProvider` 通道，组件 token 由各自目录维护。
- ✳️ **Button 组件**：完整覆盖 react-vant 的 `type/size/plain/block/round/square/shadow` 语义，支持 `color`、`loading`、`icon` 等能力。
- ✳️ **Flex 组件**：提供 24 栅格的 RN 封装，支持 `gutter`/`direction`/`wrap`/`Flex.Item span` 等能力，与 react-vant 的 Flex API 对齐。
- ✳️ **Space 组件**：覆盖 react-vant 的 `gap`、`divider`、`direction`、`wrap`、`align`、`justify` 等交互，并提供一套完整文档及 demo。
- ✳️ **Cell 组件**：实现 `Cell`/`Cell.Group` 组合、`icon/isLink/arrowDirection/size` 等语义，兼容必填星号与自定义内容。
- ✳️ **Divider 组件**：支持水平/垂直、虚线、细边框与文本定位 (`left/center/right`)，并开放 `lineColor` 与文本样式扩展。
- ✳️ **Tag 组件**：对齐 react-vant 的 `type/size/plain/round/mark/closeable` API，可自定义 `color/textColor` 及关闭图标。
- ✳️ **Badge 组件**：提供数字/红点、`max` 截断、`offset` 偏移、自定义 `content`/`color` 与独立展示模式。
- ✳️ **Grid 组件**：支持 `columnNum/gutter/square/border/direction/reverse` 等语义，`Grid.Item` 兼容 `badge/dot` 与 children 自定义内容。
- ✳️ **Typography 组件**：提供 `Text/Title/Link`，支持 `type/size/ellipsis/strong/underline` 以及展开/收起、多语义排版。
- ✳️ **Icon 组件**：内置常用图标（当前使用 Unicode 占位），支持 `size/color/rotate/spin`，并可通过 `component`/`children` 引入任意 `react-native-svg` 图形。
- ✳️ **Loading 组件**：实现 `circular/spinner` 两种指示器、`color/size/text/vertical` 等配置，满足过渡加载场景。
- ✳️ **Empty 组件**：提供 `image/description/children` 语义，占位符支持默认/错误/网络/搜索以及自定义插画。
- ✳️ **Progress 组件**：复刻 `percentage/strokeWidth/color/pivot` 语义，支持文案与置灰配置。
- ✳️ **NoticeBar 组件**：支持滚动/换行、`mode=closeable|link`、自定义左右图标及配色。
- ✳️ **Slider 组件**：支持单/双滑块、滚动/垂直/反向、步长与自定义按钮，拖动事件对齐 react-vant。
- ✳️ **ConfigProvider**：统一封装主题与多语言，支持 `theme` tokens 覆盖与 `locale` 切换，文档示例对齐 react-vant。
- ✳️ **文档**：Quick Start、架构说明、Button 指南已经上线（`docs/`）。

## 路线图（下一步）

1. **基础交互组件**：Cell、Icon、Space、Typography —— 打通排版/图标体系。
2. **反馈组件**：Toast、Loading、Dialog —— 依赖 Portal 能力（计划内）。
3. **表单组件**：Field、Switch、Checkbox —— 与 rc-form 生态对接。
4. **暗色模式**：扩展 tokens palette，支持按需切换。

欢迎 issue / PR，一起把 react-vant 的体验带到原生世界 ✨
