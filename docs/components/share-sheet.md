---
simulator:
  compact: true
---

# ShareSheet 分享面板

## 介绍

展示常见分享渠道或快捷操作的弹层，支持多行分组与自定义内容。

## 引入

```js
import { ShareSheet } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

分享面板通过 `options` 定义分享选项。

<code src="./share-sheet/demo/basic.tsx" title="基础用法"></code>

### 展示多行选项

当分享选项较多时，可将 `options` 定义为二维数组，每个子数组会作为一行选项展示。

<code src="./share-sheet/demo/groups.tsx" title="展示多行选项"></code>

### 自定义图标

除了使用图标组件外，也可以在 `icon` 中传入图片节点来使用自定义图标。

<code src="./share-sheet/demo/custom.tsx" title="自定义图标"></code>

### 展示描述信息

通过 `description` 属性可以设置标题下方的描述文字，在 `options` 内设置 `description` 可添加分享选项描述。

<code src="./share-sheet/demo/description.tsx" title="展示描述信息"></code>

## API

### ShareSheet Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | - |
| `options` | 分享选项（支持二维数组分组） | `ShareSheetOptions` | `[]` |
| `title` | 顶部标题 | `ReactNode` | - |
| `description` | 标题下方描述 | `ReactNode` | - |
| `cancelText` | 底部取消按钮文字，传空隐藏 | `ReactNode` | `locale.vanShareSheet.cancel`（中文：取消） |
| `columns` | 每行展示数量，用于计算宽度 | `number` | `4` |
| `closeOnSelect` | 点击选项后是否关闭 | `boolean` | `true` |
| `safeAreaInsetBottom` | 是否适配底部安全区 | `boolean` | `true` |
| `onSelect` | 选择分享项回调 | `(option, index) => void` | - |
| `onCancel` | 点击取消或关闭时触发 | `() => void` | - |
| 其余 | 透传 `Popup` 的属性 | - | - |

### ShareSheetOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `name` | 分享项名称 | `ReactNode` |
| `icon` | 图标节点 | `ReactNode` |
| `description` | 副标题 | `ReactNode` |
| `onPress` | 点击回调（先于 `onSelect` 执行） | `(option) => void` |

> 当前实现聚焦分享栅格场景，暂未提供图片资源加载、懒加载等能力；如需网络图标，可在 `icon` 中传入自定义组件。

## 国际化

ShareSheet 的取消按钮文案通过 `locale.vanShareSheet.cancel` 读取，可通过 `ConfigProvider` 的 `locale` 属性切换语言。
