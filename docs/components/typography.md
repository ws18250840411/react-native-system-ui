---
simulator:
  compact: false
---

# Typography 文本

## 介绍

提供基础文本、标题与链接排版，支持多色、大小、加粗、删除线以及多行省略。

## 引入

```js
import { Typography } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

`Typography.Text` 可在段落内自由组合不同样式。

<code title="基础用法" src="./typography/demo/base.tsx"></code>

### 语义类型

通过 `type` 设置语义色，包含 `primary/success/warning/danger/secondary/light`。

<code title="语义类型" src="./typography/demo/type.tsx"></code>

### 文本尺寸

`size` 支持 `xs` ~ `xxl`，也可搭配 `strong`、`underline` 等修饰。

<code title="文本尺寸" src="./typography/demo/size.tsx"></code>

### 标题

`Typography.Title` 按 `level` 生成 1~6 级标题，保持统一的字重与行高。

<code title="标题" src="./typography/demo/title.tsx"></code>

### 文本省略

`ellipsis` 支持布尔、行数以及 `{ rows, expandText, collapseText }` 形式，可附带展开/收起操作。

> 开启 `ellipsis` 后，建议 `children` 为纯文本或嵌套 `Text`（如 `Typography.Text`），避免传入 `View` 等节点导致 React Native 报错。

<code title="文本省略" src="./typography/demo/ellipsis.tsx"></code>

### 链接

`Typography.Link` 默认带下划线，可绑定 `href` 自动打开外链。

<code title="链接" src="./typography/demo/link.tsx"></code>

## API

### Typography.Text Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 文本类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'secondary' \| 'light'` | `'default'` |
| `color` | 自定义文字颜色，支持直接传入颜色值或类型值（优先级高于 `type`） | `string \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'secondary' \| 'light'` | - |
| `size` | 文本大小 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | `'md'` |
| `disabled` | 是否禁用，并降低不透明度 | `boolean` | `false` |
| `strong` | 是否加粗 | `boolean` | `false` |
| `underline` | 是否显示下划线 | `boolean` | `false` |
| `delete` | 是否显示删除线 | `boolean` | `false` |
| `center` | 是否居中显示 | `boolean` | `false` |
| `ellipsis` | 多行省略，支持 `boolean` `number` 或 `EllipsisConfig` | `boolean \| number \| EllipsisConfig` | - |

### EllipsisConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rows` | 保留的行数 | `number` | `1` |
| `symbol` | 省略符号（暂不支持，传入会被忽略） | `string` | - |
| `expandText` | 展开操作文案 | `string` | - |
| `collapseText` | 收起操作文案 | `string` | - |
| `onExpand` | 展开/收起时触发 | `(expanded: boolean) => void` | - |

> 移动端依赖 `numberOfLines` 实现省略，目前仅支持 `rows/expandText/collapseText` 等基础能力；`symbol/suffixText/suffixCount/onContentClick` 等高级截断能力暂不支持。

### Typography.Title Props

同 `Text`，额外的 `level` 控制字号。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `level` | 标题层级 | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `5` |

### Typography.Link Props

在 `Text` 基础上新增：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `href` | 点击时打开的链接地址 | `string` | - |

> 如需自定义导航逻辑，可直接传入 `onPress`，此时不会自动打开 `href`。

## 差异说明

- React Native 环境使用 `Text` 渲染，事件模型以 `onPress` 替代 `onClick`。
- `Typography.Link` 暂不支持 `target` 等 DOM 属性。
