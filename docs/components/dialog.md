---
simulator:
  compact: true
---

# Dialog 弹出框

## 介绍

模态对话框组件，常用于消息提示、操作确认等场景，同时支持函数式调用（`Dialog.alert` / `Dialog.confirm`）与受控组件两种用法。

弹出框组件支持函数调用和组件调用两种方式。使用前需在应用根节点包裹 **ConfigProvider** 或 **Portal.Host**，否则弹层无法挂载。详见 [ConfigProvider](./config-provider.md) / [Portal](./portal.md)。

### 函数调用

Dialog 是一个函数，调用后会直接在页面中弹出相应的模态框。

```js
import { Dialog } from 'react-native-system-ui';
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮。

<code title="基础用法" card src="./dialog/demo/base.tsx" />

### Promise 调用

Dialog 支持 promise

<code title="Promise调用" card src="./dialog/demo/promise.tsx" />

### 圆角按钮风格

将 theme 选项设置为 `round-button` 可以展示圆角按钮风格的弹窗。

<code title="圆角按钮风格" card src="./dialog/demo/theme.tsx" />

### 自定义内容

通过 `children` 属性可以传入 `ReactNode`, 来自定义显示的内容。

<code title="自定义内容" card src="./dialog/demo/custom.tsx" />

### 关闭弹出框

通过 `onConfirm` 和 `onCancel` 属性返回`Promise`函数，在弹窗关闭前进行特定操作。

<code title="关闭弹出框" card src="./dialog/demo/close.tsx" />

### 关闭按钮

通过 `closeable` 可以显示关闭按钮你，通过 `closeIcon` 可以自定义按钮内容。

<code title="关闭按钮" card src="./dialog/demo/closeIcon.tsx" />

### 组件调用

如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。

<code title="组件调用" card src="./dialog/demo/component.tsx" />

## API

### 方法

| 方法名         | 说明             | 参数      | 返回值            |
| -------------- | ---------------- | --------- | ----------------- |
| `Dialog`       | 弹窗组件         | `options` | `React.ReactNode` |
| `Dialog.show`  | 展示提示弹窗     | `options` | `Promise`         |
| `Dialog.alert` | 展示消息提示弹窗 | `options` | `Promise`         |
| `Dialog.confirm` | 展示消息确认弹窗 | `options` | `Promise`         |

#### 注意

对于指令式创建出来的 `Dialog`，并不会感知父组件的重渲染和其中 `state` 的更新，因此下面这种写法是完全错误的：

```jsx | pure
export default function App() {
  const [captcha, setCaptcha] = useState('');
  const showCaptcha = () => {
    return Dialog.confirm({
      title: '短信验证',
      message: (
        <Field
          placeholder="请输入验证码"
          value={captcha} // App 中 captcha 的更新是不会传递到 Dialog 中的
          onChange={setCaptcha}
        />
      ),
    });
  };
  return <Button onPress={showCaptcha} text="Show Dialog" />;
}
```

> 如果你需要在 `Dialog` 中包含很多复杂的状态和逻辑，那么可以使用**声明式**的语法，或者考虑自己将内部状态和逻辑单独封装一个组件出来([demo](https://stackblitz.com/edit/react-ubsjro-tbmdt8?file=src%2FApp.tsx))

### Props

通过函数调用 `Dialog` 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `visible` | 是否显示弹窗 | `boolean` | - |
| `title` | 标题 | `ReactNode` | - |
| `width` | 弹窗宽度，默认单位为 `px` | `number \| string` | `320` |
| `message` | 文本内容，支持通过 `\n` 换行 | `ReactNode` | - |
| `messageAlign` | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| `theme` | 样式风格 | `'default' \| 'round-button'` | `'default'` |
| `closeable` | 是否展示关闭图标 | `boolean` | `false` |
| `closeIcon` | 自定义关闭图标 | `ReactNode` | - |
| `showConfirmButton` | 是否展示确认按钮 | `boolean` | `true` |
| `showCancelButton` | 是否展示取消按钮 | `boolean` | `false` |
| `confirmButtonText` | 确认按钮文案 | `ReactNode` | `'确认'` |
| `confirmButtonColor` | 确认按钮颜色 | `string` | 主题色 |
| `confirmProps` | 确认按钮扩展状态（`loading`/`disabled`） | `DialogActionState` | - |
| `cancelButtonText` | 取消按钮文案 | `ReactNode` | `'取消'` |
| `cancelButtonColor` | 取消按钮颜色 | `string` | 主题默认色 |
| `cancelProps` | 取消按钮扩展状态（`loading`/`disabled`） | `DialogActionState` | - |
| `overlay` | 是否展示遮罩层 | `boolean` | `true` |
| `overlayStyle` | 自定义遮罩层样式 | `StyleProp<ViewStyle>` | - |
| `closeOnBackPress` | Android 返回键是否关闭 | `boolean` | `false` |
| `closeOnPopstate` | 浏览器返回（popstate）是否关闭 | `boolean` | `true` |
| `closeOnOverlayPress` / `closeOnClickOverlay` | 点击遮罩层后是否关闭弹窗 | `boolean` | `false` |
| `beforeClose` | 关闭前回调，返回 `false` 可阻止关闭（支持 Promise） | `(action: 'confirm' \| 'cancel' \| 'close') => boolean \| Promise<boolean>` | - |
| `footer` | 自定义底部按钮区域 | `ReactNode` | - |
| `contentStyle` | 内容区样式 | `StyleProp<ViewStyle>` | - |
| `titleStyle` | 标题样式 | `StyleProp<TextStyle>` | - |
| `messageStyle` | 消息文本样式 | `StyleProp<TextStyle>` | - |
| `tokensOverride` | 覆盖 Dialog tokens | `DeepPartial<DialogTokens>` | - |
| `onCancel` | 点击取消按钮时触发 | `() => void` | - |
| `onConfirm` | 点击确认按钮时触发 | `() => void` | - |
| `onClose` | Dialog 关闭时的回调 | `() => void` | - |
| `onClosed` | Dialog 完全关闭（动画结束）时的回调 | `() => void` | - |

> 支持通过主题的 `components.dialog` 覆盖 tokens，统一控制弹窗宽度、圆角、配色等设计语言。
