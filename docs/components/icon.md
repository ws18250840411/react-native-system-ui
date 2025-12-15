---
simulator:
  compact: false
---

# Icon 图标

## 介绍

语义化的矢量图标。图标来自 `react-native-system-icon`（与 `@react-vant/icons` 同名/同源，支持 Tree Shaking）。

在业务中通常直接从 `react-native-system-icon` 按需引入图标组件（如 `LocationO` / `ShoppingCartO` / `VolumeO`）。

## 安装

```bash
pnpm add react-native-system-icon react-native-svg
```

## 引入

```tsx | pure
import { LocationO } from 'react-native-system-icon'
```

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
