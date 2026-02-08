---
simulator:
  compact: true
---

# Cascader 级联选择

## 介绍

级联选择框，用于多层级数据的选择，典型场景为省市区选择。

## 引入

```js
import { Cascader } from 'react-native-system-ui';
```

## 代码演示

### 基础用法

<code title="基础用法" src="./cascader/demo/base.tsx" />

### Form中使用

<code title="Form中使用" src="./cascader/demo/form.tsx" />

### 异步加载选项

可以监听 `onChange` 事件并动态设置 `options`，实现异步加载选项。

<code title="异步加载选项" src="./cascader/demo/async.tsx" />

### 自定义字段名

通过 `fieldNames` 属性可以自定义 `options` 里的字段名称。

<code title="自定义字段名" src="./cascader/demo/fieldNames.tsx" />

### 受控组件

通过 `value` 属性可以 Cascader 成为受控组件。

<code title="受控组件" src="./cascader/demo/value.tsx" />

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 顶部标题 | `ReactNode` | - |
| `value` | 当前选中的值 | `(string \| number)[]` | - |
| `defaultValue` | 默认选中的值 | `(string \| number)[]` | - |
| `options` | 可选项数据源 | `CascaderOption[]` | `[]` |
| `optionRender` | 自定义选项文字 | `({ option: CascaderOption, selected: boolean }) => ReactNode` | - |
| `placeholder` | 未选中时的提示文案 | `string` | `locale.vanCascader.select`（中文：请选择） |
| `activeColor` | 选中状态的高亮颜色 | `string` | - |
| `closeable` | 是否显示关闭图标 | `boolean` | `true` |
| `closeIcon` | 关闭图标 | `ReactNode` | - |
| `fieldNames` | 自定义 `options` 结构中的字段 | `object` | `{ text: 'text', value: 'value', children: 'children' }` |
| `swipeable` | 是否开启手势左右滑动切换 | `boolean` | `true` |
| `children` | 渲染函数 | `(val: (string \| number)[], selectedRows: CascaderOption[], actions: CascaderActions) => ReactNode` | - |

### Events

| 事件 | 说明 | 类型 |
| --- | --- | --- |
| `onChange` | 选中项变化时触发 | `(val: (string \| number)[], selectedRows: CascaderOption[]) => void` |
| `onFinish` | 全部选项选择完成后触发 | `(val: (string \| number)[], selectedRows: CascaderOption[]) => void` |
| `onClose` | 点击关闭图标时触发 | `() => void` |
| `onClickTab` | 点击标签时触发 | `(tabIndex: number, title: string) => void` |

### CascaderOption 数据结构

`options` 属性是一个由对象构成的数组，数组中的每个对象配置一个可选项，对象可以包含以下值：

| 键名      | 说明                     | 类型                        |
| --------- | ------------------------ | --------------------------- |
| `text`    | 选项文字（必填）         | `string`                    |
| `value`   | 选项对应的值（必填）     | `string \| number`          |
| `color`   | 选项文字颜色             | `string`                    |
| `children`| 子选项列表               | `CascaderOption[]`          |
| `disabled`| 是否禁用选项             | `boolean`                   |

> 支持通过主题的 `components.cascader` 覆盖 tokens，统一控制标题、选中色、选项高度等设计语言。

## 国际化

Cascader 的占位文案、关闭按钮等通过 `locale.vanCascader` 读取，可通过 `ConfigProvider` 的 `locale` 属性切换语言。
