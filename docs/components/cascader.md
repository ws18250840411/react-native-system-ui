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

<code title="基础" src="./cascader/demo/basic.tsx"></code>

### 自定义字段名

<code title="字段映射" src="./cascader/demo/field-names.tsx"></code>

### 自定义选项渲染

<code title="自定义渲染" src="./cascader/demo/custom.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `options` | 级联数据源 | `CascaderOption[]` | `[]` |
| `value` | 受控值 | `(string \| number)[]` | - |
| `defaultValue` | 非受控初始值 | `(string \| number)[]` | `[]` |
| `title` | 顶部标题 | `ReactNode` | `请选择` |
| `placeholder` | 选项/标签占位文案 | `string` | `请选择` |
| `activeColor` | 选中高亮颜色 | `string` | 主题色 |
| `fieldNames` | 自定义字段映射 | `{ text?: string; value?: string; children?: string }` | `{ text: 'text', value: 'value', children: 'children' }` |
| `optionRender` | 自定义选项内容 | `({ option, selected }) => ReactNode` | - |
| `showHeader` | 是否展示标题 | `boolean` | `true` |
| `onChange` | 选中路径变化时触发 | `(value: CascaderValue[], selectedRows: CascaderOption[]) => void` | - |
| `onFinish` | 选择到叶子节点时触发 | `(value: CascaderValue[], selectedRows: CascaderOption[]) => void` | - |
| `onTabChange` | 点击 Tab 时触发 | `(tabIndex: number) => void` | - |

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
