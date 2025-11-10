---
simulator:
  compact: false
---

# Typography 文本

## 介绍

提供基础文本、标题与链接排版，API 与 react-vant 对齐，支持多色、大小、加粗、删除线以及多行省略。

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

<code title="文本省略" src="./typography/demo/ellipsis.tsx"></code>

### 链接

`Typography.Link` 默认带下划线，可绑定 `href` 自动打开外链。

<code title="链接" src="./typography/demo/link.tsx"></code>

## API

### Typography.Text Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 文本类型，可选 `default` `primary` `success` `warning` `danger` `secondary` `light` | `TypographyType` | `default` |
| `size` | 文本大小，可选 `xs` `sm` `md` `lg` `xl` `xxl` | `TypographySize` | `md` |
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
| `expandText` | 展开操作文案 | `string` | - |
| `collapseText` | 收起操作文案 | `string` | - |
| `suffixText` | 省略后追加的后缀文本 | `string` | - |
| `suffixCount` | 省略时强制保留末尾字符数量（仅 `children` 为纯文本时生效） | `number` | - |
| `onExpand` | 展开/收起时触发 | `(expanded: boolean) => void` | - |

> 移动端依赖 `numberOfLines` 实现省略，`symbol` 自定义符号暂不支持，suffix 能力仅在纯文本内容下生效。

### Typography.Title Props

同 `Text`，额外的 `level` 控制字号。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `level` | 标题层级 `1-6` | `TypographyTitleLevel` | `5` |

### Typography.Link Props

在 `Text` 基础上新增：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `href` | 点击时打开的链接地址 | `string` | - |

> 如需自定义导航逻辑，可直接传入 `onPress`，此时不会自动打开 `href`。
