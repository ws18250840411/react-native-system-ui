---
simulator:
  compact: false
---

# Dialog 对话框

## 介绍

模态弹窗，提供异步确认、警告提示等能力，风格与 react-vant 保持一致。

## 引入

```js
import { Dialog } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

传入 `title` 与 `message`，同时开启 `showCancelButton` 即可获得最常见的确认/取消弹窗。

<code title="基础用法" src="./dialog/demo/basic.tsx"></code>

### 自定义内容与底部

`message` 支持任意 `ReactNode`，也可以直接使用 `children` 完全自定义主体，同时通过 `footer` 传入自定义底部内容。

<code title="自定义内容" src="./dialog/demo/custom.tsx"></code>

### 圆角按钮主题

将 `theme` 设为 `round-button`，即可渲染和 react-vant 一致的圆角按钮样式，适合营销场景。

<code title="圆角按钮" src="./dialog/demo/theme.tsx"></code>

### 静态调用

Dialog 暴露了与 react-vant 一致的静态方法，可在业务逻辑中直接调用。

<code title="静态调用" src="./dialog/demo/imperative.tsx"></code>

## API

### Dialog Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示对话框 | `boolean` | `false` |
| `title` | 标题内容 | `ReactNode` | - |
| `message` | 文本或自定义节点，不传时可直接使用 `children` | `ReactNode` | - |
| `messageAlign` | 文案对齐方式 | `'left' \| 'center' \| 'right'` | `center` |
| `theme` | 样式风格，可选 `round-button` | `'default' \| 'round-button'` | `default` |
| `width` | 自定义宽度，接受数字或百分比字符串 | `number \| string` | `80%` |
| `closeable` | 是否展示右上角关闭按钮 | `boolean` | `false` |
| `closeIcon` | 自定义关闭图标 | `ReactNode` | - |
| `overlay` | 是否显示遮罩 | `boolean` | `true` |
| `overlayStyle` | 遮罩样式 | `StyleProp<ViewStyle>` | - |
| `closeOnOverlayPress` | 点击遮罩是否触发 `onClose` | `boolean` | `false` |
| `showCancelButton` | 是否展示取消按钮 | `boolean` | `false` |
| `cancelButtonText` | 取消按钮文案 | `ReactNode` | `locale.cancel` |
| `cancelButtonColor` | 取消按钮文字颜色 | `string` | - |
| `cancelProps` | 取消按钮状态 | `DialogActionState` | - |
| `showConfirmButton` | 是否展示确认按钮 | `boolean` | `true` |
| `confirmButtonText` | 确认按钮文案 | `ReactNode` | `locale.confirm` |
| `confirmButtonColor` | 确认按钮文字颜色 | `string` | - |
| `confirmProps` | 确认按钮状态 | `DialogActionState` | - |
| `footer` | 自定义底部区域，存在时覆盖默认按钮 | `ReactNode` | - |
| `contentStyle` | 主体区域样式 | `StyleProp<ViewStyle>` | - |
| `titleStyle` | 标题文本样式 | `StyleProp<TextStyle>` | - |
| `messageStyle` | 文案样式 | `StyleProp<TextStyle>` | - |
| `style` | 容器样式 | `StyleProp<ViewStyle>` | - |
| `onCancel` | 点击取消按钮时触发 | `() => void` | - |
| `onConfirm` | 点击确认按钮时触发 | `() => void` | - |
| `onClose` | 遮罩/关闭按钮/系统返回触发时回调，用于外部更新 `visible` | `() => void` | - |
| `onClosed` | 退出动画结束后的回调 | `() => void` | - |

### DialogActionState

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `loading` | 是否展示加载状态，加载中会禁用点击 | `boolean` |
| `disabled` | 是否禁用按钮 | `boolean` |

> `Dialog` 为受控组件，所有关闭逻辑都需要在 `onConfirm`/`onCancel`/`onClose` 中显式改变 `visible`。

### 静态方法

当需要在业务逻辑中直接弹出对话框时，可以使用以下静态方法。若项目未使用 `ConfigProvider`（它会自动挂载 `<Dialog.Host />`），记得在应用根部渲染一次 `<Dialog.Host />`，否则静态弹窗不会出现在界面上。

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `Dialog.show(options)` | 展示一个对话框，返回关闭函数 | `() => void` |
| `Dialog.alert(options)` | 展示仅含确认按钮的弹窗，确认后 Promise 解析 | `Promise<void>` |
| `Dialog.confirm(options)` | 展示确认+取消的弹窗，确认 resolve、取消 reject | `Promise<boolean>` |
| `Dialog.clear()` | 关闭所有通过静态方法创建的对话框 | `void` |
| `Dialog.setDefaultOptions(optionsOrMode, options?)` | 配置全局或指定类型（`'show' | 'alert' | 'confirm'`）的默认参数 | `void` |
| `Dialog.resetDefaultOptions(mode?)` | 重置所有或指定类型的默认参数 | `void` |
| `Dialog.Host` | 手动挂载静态弹窗的渲染容器 | `ReactElement` |

> 通过 `Dialog.show` 返回的关闭函数或 `Dialog.clear()` 主动关闭，对话框同样会走退出动画与 `onClosed` 回调，不会跳过过渡。

```js
Dialog.setDefaultOptions({
  confirmButtonText: '继续',
})

Dialog.setDefaultOptions('confirm', {
  showCancelButton: true,
  cancelButtonText: '返回',
})

// 恢复 confirm 类型默认值
Dialog.resetDefaultOptions('confirm')
```
