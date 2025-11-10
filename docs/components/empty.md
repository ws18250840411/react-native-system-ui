---
simulator:
  compact: false
---

# Empty 空状态

## 介绍

用于在数据为空或异常时给出占位提示，默认提供多种语义图标，可自定义插画及底部内容。

## 引入

```js
import { Empty } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./empty/demo/base.tsx"></code>

### 图片类型

通过 `image="error|network|search"` 切换不同语义。

<code title="图片类型" src="./empty/demo/type.tsx"></code>

### 自定义图片

`image` 支持传入任意 ReactNode，例如插画、Icon 等。

<code title="自定义图片" src="./empty/demo/custom.tsx"></code>

### 底部内容

`children` 可放置按钮等交互区域。

<code title="底部内容" src="./empty/demo/footer.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `image` | 图片类型，可选 `default` `error` `network` `search`，也可传入自定义节点 | `EmptyImage \| ReactNode` | `'default'` |
| `imageSize` | 图片尺寸（px） | `number` | `tokens.sizes.image` |
| `description` | 描述文案 | `ReactNode` | - |
| `gap` | 图像与描述之间的间距 | `number` | `tokens.spacing.descriptionMargin` |
| `imageStyle` | 图片容器样式 | `StyleProp<ViewStyle>` | - |
| `descriptionStyle` | 文案样式 | `StyleProp<TextStyle>` | - |

> 当前内置的 error/network/search 采用 Unicode 占位，后续可通过 `image` 传入真实插画或品牌插图。
