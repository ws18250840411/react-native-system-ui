---
simulator:
  compact: true
---

# Form 表单

## 介绍

提供表单上下文，协调 Field 值的收集、验证与提交。

## 引入

```js
import { Form } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./form/demo/basic.tsx"></code>

### 校验规则

<code title="校验规则" src="./form/demo/rules.tsx"></code>

### 表单项类型

<code title="表单项类型" src="./form/demo/type.tsx"></code>

### 动态增减表单项

<code title="动态增减表单项" src="./form/demo/list.tsx"></code>

### 弹层选择

<code title="弹层选择" src="./form/demo/popup.tsx"></code>

### 自定义表单项

<code title="自定义表单项" src="./form/demo/custom.tsx"></code>

### 条件渲染/shouldUpdate

<code title="条件渲染/shouldUpdate" src="./form/demo/shouldUpdate.tsx"></code>

### 订阅

<code title="订阅" src="./form/demo/subscribe.tsx"></code>

### useWatch

<code title="useWatch" src="./form/demo/watch.tsx"></code>

> `Form.List` 支持动态增删/移动数组项：`add(value?, index?)`、`remove(index)`、`move(from, to)`，子项 name 使用路径写法，如 `name={[field.name, 'name']}`。

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `initialValues` | 初始表单值 | `Record<string, any>` | `{}` |
| `colon` | 是否在 label 后展示冒号（下发给 Field） | `boolean` | `false` |
| `labelWidth` | label 统一宽度（下发给 Field） | `number` | `96` |
| `showValidateMessage` | 是否默认展示 Form.Item 的验证信息 | `boolean` | `true` |
| `footer` | 底部区域，一般放提交按钮 | `ReactNode` | - |
| `onValuesChange` | 任一字段变化时触发 | `(values, name, value) => void` | - |
| `onFinish` | 调用 `submit` 且全部字段通过校验时触发 | `(values) => void` | - |

### Form 实例方法

通过 `const formRef = Form.useForm()` 获取 ref，在 `<Form ref={formRef} />` 中使用。

| 方法 | 说明 |
| --- | --- |
| `submit()` | 触发 `onFinish`，返回当前值 |
| `getFieldsValue()` | 获取全部字段值 |
| `setFieldsValue(values)` | 批量设置字段值 |
| `resetFields()` | 重置为 `initialValues` |
| `validateFields(names?)` | 主动触发校验（默认校验全部字段），成功时返回最新值，失败时抛出错误 |
| `getFieldError(name)` | 获取某个字段的错误信息 | `string[]` |
| `subscribe(listener)` | 订阅字段变更，返回取消订阅函数 | `(changedValues, allValues) => void` |
| `useWatch(name?, formRef?)` | hook 形式监听字段或全部值 | - |

### Form.Item Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 字段名 | `string` | - |
| `label` | 标签文案（透传给子组件） | `ReactNode` | - |
| `description` | 描述文案（透传给子组件） | `ReactNode` | - |
| `intro` | 额外提示信息（透传给 Field） | `ReactNode` | - |
| `tooltip` | 标签提示信息（透传给 Field） | `ReactNode` | - |
| `rules` | 校验规则，支持 `required` / `pattern` / `min` / `max` / `len` / `validator` 等 | `FormItemRule[]` | - |
| `valuePropName` | 绑定值的 prop 名 | `string` | `value` |
| `trigger` | 触发更新的事件名 | `string` | `onChangeText` |
| `validateTrigger` | 触发校验的事件，默认为 `trigger` | `string \| string[]` | `onChangeText` |
| `showValidateMessage` | 是否展示该表单项的错误提示 | `boolean` | `true` |
| `required` | 强制展示必填星号（默认为 `rules` 中的 required 值） | `boolean` | - |
| `noStyle` | 不渲染额外样式容器（当前实现中等价于默认表现） | `boolean` | `false` |
| `shouldUpdate` | 是否在依赖字段变化时重新渲染，可用于条件渲染 | `(prev, next) => boolean` | - |
| `initialValue` | 该字段的初始值（当表单没有同名初始值时生效） | `any` | - |
| `dependencies` | 依赖的字段名，依赖字段变化时触发当前项校验 | `string[]` | - |
| `children` | 必须是受控组件，如 Field | `ReactElement` | - |

> `FormItemRule` 类型可通过 `import type { FormItemRule } from 'react-native-system-ui'` 获取。

> Form.Item 会自动向子组件注入 `value`、`trigger`、`validateTrigger`、`errorMessage`、`labelWidth/colon` 等属性，用来与 Field 协作。

### 规则结构

Form.Item 的 `rules` 属性支持以下字段：

| 键名 | 说明 |
| --- | --- |
| `required` | 是否为必填字段，支持配合 `message` 或默认提示 |
| `pattern` | 正则表达式校验，通常用于手机号、邮箱等格式 |
| `min`/`max` | 字符串长度或数字大小范围 |
| `len` | 固定长度或特定数值 |
| `validator` | 自定义校验函数 `(value, values) => boolean \| string \| Promise`，返回 `false` 或字符串代表失败 |
| `validateTrigger` | 限定规则触发的事件名 |
| `message` | 当前规则失败时展示的文案 |

### 订阅与监听

- `Form.Subscribe`：`children(changedValues, form) => ReactNode`，可通过 `to` 指定监听字段。
- `Form.useWatch(name?, formRef?)`：实时返回指定字段或整个表单的值，保持受控/非受控同步。
