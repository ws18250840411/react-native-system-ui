---
simulator:
  compact: false
---

# Cascader 级联选择

## 介绍

多列联动的地址/分类选择器，支持受控/非受控以及自定义渲染。

## 引入

```js
import { Cascader } from react-native-system-ui
```

## 代码演示

### 基础用法

<code title="基础用法" src="./cascader/demo/basic.tsx"></code>

### Form中使用

<code title="Form中使用" src="./cascader/demo/form.tsx"></code>

### 异步加载选项

<code title="异步加载选项" src="./cascader/demo/async.tsx"></code>

### 自定义字段名

<code title="自定义字段名" src="./cascader/demo/field-names.tsx"></code>

### 受控组件

<code title="受控组件" src="./cascader/demo/value.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 级联数据源 | `CascaderOption[]` | `[]` |
| `value` | 受控值 | `(string \| number)[]` | - |
| `defaultValue` | 非受控初始值 | `(string \| number)[]` | `[]` |
| `title` | 顶部标题 | `ReactNode` | `请选择` |
| `placeholder` | 选项/标签占位文案 | `string` | `请选择` |
| `activeColor` | 选中高亮颜色 | `string` | 主题色 |
| `swipeable` | 是否允许左右滑动切换标签页（包含切换动画）；开启时需保证容器有明确宽度，组件会在宽度为 0 时自动回退为非滑动模式 | `boolean` | `true` |
| `fieldNames` | 自定义字段映射 | `{ text?: string; value?: string; children?: string }` | `{ text: 'text', value: 'value', children: 'children' }` |
| `optionRender` | 自定义选项内容 | `({ option, selected }) => ReactNode` | - |
| `showHeader` | 是否展示标题 | `boolean` | `true` |
| `closeable` | `poppable` 模式下是否展示关闭图标 | `boolean` | `true` |
| `closeIcon` | 自定义关闭图标 | `ReactNode` | - |
| `onClose` | 关闭弹层时（遮罩或图标）触发 | `() => void` | - |
| `onChange` | 选中路径变化时触发 | `(value: CascaderValue[], selectedRows: CascaderOption[]) => void` | - |
| `onFinish` | 选择到叶子节点时触发 | `(value: CascaderValue[], selectedRows: CascaderOption[]) => void` | - |
| `onTabChange` | 点击 Tab 时触发 | `(tabIndex: number) => void` | - |
| `poppable` | 是否以内置 Popup 展示 | `boolean` | `false` |
| `visible` | `poppable` 模式下的受控可见性 | `boolean` | - |
| `defaultVisible` | `poppable` 模式下的默认可见性 | `boolean` | `false` |
| `onVisibleChange` | 弹层可见性变化回调 | `(visible: boolean) => void` | - |
| `closeOnClickOverlay` | 点击遮罩是否关闭弹层 | `boolean` | `true` |
| `closeOnFinish` | 选到叶子节点后是否自动关闭弹层 | `boolean` | `true` |
| `popupPlacement` | 弹层位置，同 Popup `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| `popupRound` | 是否开启弹层圆角 | `boolean` | `true` |
| `popupProps` | 透传 Popup 额外参数 | `Partial<PopupProps>` | - |
| `children` | 可选的触发渲染；传入函数时可获得 `actions` | `ReactNode \| CascaderRenderProps` | - |

### Render Props

当 `children` 为函数时，入参为 `(value, selectedRows, actions)`：

| 参数 | 说明 |
| --- | --- |
| `value` | 当前选中值数组 |
| `selectedRows` | 当前路径对应的选项列表 |
| `actions` | `{ open, close, toggle }`，用于手动控制弹层 |

### CascaderOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `text` | 展示文案 | `ReactNode` |
| `value` | 唯一值 | `string \| number` |
| `disabled` | 是否禁用 | `boolean` |
| `color` | 文案颜色覆盖 | `string` |
| `loading` | 显示加载状态 | `boolean` |
| `children` | 下一级选项 | `CascaderOption[]` |

其余属性同 `View`，支持传入 `style` 覆盖容器样式。
