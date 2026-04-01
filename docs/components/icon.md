---
simulator:
  compact: false
---

# Icon 图标

## 介绍

语义化的矢量图标。业务侧推荐从 `react-native-system-icon` 按需引入图标组件（如 `LocationO` / `ShoppingCartO` / `VolumeO`），支持 Tree Shaking。

部分内置组件在默认态下使用**库内部的极简线条图标**（如 Toast 成功/失败、导航关闭等），不强制依赖 `react-native-system-icon`，以减少包体；展示本页图标列表或自行使用 `react-native-system-icon` 时仍需安装下方依赖。

## 安装

```bash
pnpm add react-native-system-icon react-native-svg
```

> `react-native-svg` 为 peerDependency；未使用 SVG 能力（如仅 `Image` 栅格图、或仅用内置线条图标）时，可按宿主工程策略选择是否安装，详见包内 `peerDependenciesMeta`（`react-native-svg` 为 optional）。

## 引入

```tsx | pure
import { LocationO } from 'react-native-system-icon'
```

## 图标列表

<code src="./icon/demo/index.tsx" inline></code>

## 代码演示

### 基础用法

<code title="基础用法" src="./icon/demo/base.tsx"></code>

### 徽标提示

结合 `Badge` 组件可以实现带徽标的 Icon。

<code title="徽标提示" src="./icon/demo/badge.tsx"></code>

### 图标颜色

使用 `fill` 设置图标颜色。

<code title="图标颜色" src="./icon/demo/color.tsx"></code>

### 图标旋转

<code title="图标旋转" src="./icon/demo/rotate.tsx"></code>

### 自定义图标

自定义图标本质上就是你自己的组件。

<code title="自定义图标" src="./icon/demo/custom.tsx"></code>

## API

所有图标组件都支持 `react-native-svg` 的 `SvgProps`，并额外提供 `size`（同时设置 `width`/`height`，默认 `24`）。

> React Native 端需要安装 `react-native-svg`；Web 端会渲染原生 `<svg>`。

## 差异说明

- 本库以 `react-native-system-icon` 的「按需导出图标组件」形式提供业务图标（更符合 React Native 生态与 Tree Shaking 习惯），而非 Web 端常见的统一 `Icon` 组件 + iconfont 方式。
- 组件库内部另有少量非导出的 View 线条图标，用于高频默认 UI，与本文档演示的矢量图标体系可并存。
