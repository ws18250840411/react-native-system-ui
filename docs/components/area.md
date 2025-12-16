---
simulator:
  compact: true
---

# Area 省市区

## 介绍

基于 Picker 封装的省市区选择器，支持 1-3 列切换、受控模式与异步数据源。

## 引入

```js
import { Area } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

传入 `areaList` 即可渲染省市区三级联动。

<code src="./area/demo/basic.tsx" title="基础省市区"></code>

### 自定义列数

通过 `columnsNum` 控制展示的列数，例如只展示省市两级。

<code src="./area/demo/columns.tsx" title="省市两级"></code>

### 受控模式

配合 `value/onChange` 与按钮即可外部控制当前选中地区。

<code src="./area/demo/controlled.tsx" title="受控切换"></code>

## API

### Area Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `areaList` | 省市区数据 | `AreaList` | - |
| `columnsNum` | 展示列数，可选 `1/2/3` | `1 \| 2 \| 3` | `3` |
| `value` | 当前选中地区码数组（受控） | `string[]` | - |
| `defaultValue` | 默认选中值 | `string[]` | - |
| `title` | 标题 | `ReactNode` | - |
| `confirmButtonText` | 确认按钮文字 | `ReactNode` | `'确定'` |
| `cancelButtonText` | 取消按钮文字 | `ReactNode` | `'取消'` |
| `itemHeight` | 选项高度 | `number` | Picker 默认 |
| `visibleItemCount` | 可见选项个数 | `number` | Picker 默认 |
| `loading` | 是否显示加载状态 | `boolean` | `false` |
| `onChange` | 选项改变回调 | `(values: string[], options: AreaOption[]) => void` | - |
| `onConfirm` | 点击确认回调 | `(values: string[], options: AreaOption[]) => void` | - |
| `onCancel` | 点击取消回调 | `() => void` | - |

### AreaList 格式

```ts
interface AreaList {
  province_list?: Record<string, string>
  city_list?: Record<string, string>
  county_list?: Record<string, string>
}
```

> 省市区数据可复用 react-vant 的 [Area](https://vant-contrib.gitee.io/vant/v3/#/zh-CN/area) 数据结构；若需要自定义异步加载，可先处理数据再传入组件。
