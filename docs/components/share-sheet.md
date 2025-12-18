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

最常见的分享渠道列表。

<code src="./share-sheet/demo/basic.tsx" title="基础示例"></code>

### 分组展示

当分享渠道较多时可自动换行，并通过多组数据分隔。

<code src="./share-sheet/demo/groups.tsx" title="分组展示"></code>

### 自定义内容

可以在底部插入自定义按钮或说明，并控制是否点击后自动关闭。

<code src="./share-sheet/demo/custom.tsx" title="自定义区域"></code>

## API

### ShareSheet Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示 | `boolean` | - |
| `options` | 分享选项（支持二维数组分组） | `ShareSheetOptions` | `[]` |
| `title` | 顶部标题 | `ReactNode` | - |
| `description` | 标题下方描述 | `ReactNode` | - |
| `cancelText` | 底部取消按钮文字，传空隐藏 | `ReactNode` | `'取消'` |
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
