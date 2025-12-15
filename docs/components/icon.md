---
simulator:
  compact: false
---

# Icon 图标

## 介绍

语义化的图标渲染，内置 Vant 同款（与 `@react-vant/icons` 同名）的全量图标（如 `add-o` / `shopping-cart-o` / `volume-o` 等），并额外提供 `loading`。同时保留 `check` 作为 `checked` 的兼容别名。

- Web 端：直接渲染原生 `<svg>` 标签
- React Native 端：基于 `react-native-svg` 渲染

## 引入

```js
import { Icon } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

通过 `name` 选择内置图标。

<code title="基础用法" src="./icon/demo/base.tsx"></code>

### 自定义颜色与尺寸

使用 `color`、`size` 即可快速定制图标样式。

<code title="颜色尺寸" src="./icon/demo/color.tsx"></code>

### 旋转与加载动画

`rotate` 可以旋转指定角度，`spin` 开启动画旋转，适合 Loading 场景。

<code title="旋转动画" src="./icon/demo/spin.tsx"></code>

### 自定义图标

通过 `component` 或 `children` 传入任意 `react-native-svg` 图形，自由构建品牌化图标。

<code title="自定义图标" src="./icon/demo/custom.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 内置图标名称 | `BuiltInIconName` | - |
| `component` | 自定义图标组件，参数包含 `size` `color` `strokeWidth` | `React.ComponentType` | - |
| `size` | 图标尺寸，单位 px | `number` | `24` |
| `color` | 颜色，支持传入字符串或渐变数组 | `string \| string[]` | `#111827` |
| `strokeWidth` | 线条宽度 | `number` | `2` |
| `spin` | 是否开启动画旋转 | `boolean` | `false` |
| `rotate` | 静态旋转角度（度） | `number` | `0` |
| `style` | 外层容器样式 | `StyleProp<ViewStyle>` | - |
| 其他 `Pressable` 属性 | 在传入 `onPress` 时生效 | - | - |

> React Native 端需要安装 `react-native-svg`；如需更多（或品牌）图标仍可封装为 `component` 传入。
