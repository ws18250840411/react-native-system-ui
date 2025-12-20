---
simulator:
  compact: false
  style:
    background: '#fff'
---

# Uploader 文件上传

## 介绍

用于将本地的图片或文件上传至服务器。

## 引入

```js
import { Uploader } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code title="基础用法" src="./uploader/demo/base.tsx"></code>

### 自动上传

通过 `upload` 方法可以完成文件自动上传。

<code title="自动上传" src="./uploader/demo/upload.tsx"></code>

### 上传限制

`maxCount` `maxSize` 可以设置最大上传尺寸和最大数量。

<code title="上传限制" src="./uploader/demo/limit.tsx"></code>

### 自定义预览

- `previewCoverRender` 可以自定义预览信息
- 想要自定义尺寸则可以使用 `previewSize`

<code title="自定义预览" src="./uploader/demo/preview.tsx"></code>

### 异步关闭

`onDelete` 支持返回 `Promise`，可以很方便的用 `Dialog` 来完成确认功能。

<code title="异步关闭" src="./uploader/demo/close.tsx"></code>

### 表单中使用

`Uploader` 组件支持 `Form.Item` 嵌套，如果你需要对数据结构进行处理，可以参考下面的例子。

<code title="表单中使用" src="./uploader/demo/form.tsx"></code>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 已上传的文件列表 | `UploaderValueItem[]` | - |
| `defaultValue` | 默认上传的文件列表 | `UploaderValueItem[]` | `[]` |
| `accept` | 允许上传的文件类型 | `string` | `image/*` |
| `name` | 标识符（可用于业务侧区分） | `number \| string` | - |
| `isImageUrl` | 手动指定是否为图片 | `(file: UploaderValueItem) => boolean` | - |
| `previewSize` | 预览图和上传区域的尺寸，默认单位为 `px` | `number \| string` | `80px` |
| `previewImage` | 是否在上传完成后展示预览图 | `boolean` | `true` |
| `previewFullImage` | 是否在点击预览图后展示全屏图片预览 | `boolean` | `true` |
| `previewCoverRender` | 自定义覆盖在预览区域上方的内容 | `(item: UploaderValueItem) => ReactNode` | - |
| `previewOptions` | 全屏图片预览的配置项 | `object` | - |
| `multiple` | 是否开启图片多选 | `boolean` | `false` |
| `disabled` | 是否禁用文件上传 | `boolean` | `false` |
| `readOnly` | 是否将上传区域设置为只读状态 | `boolean` | `false` |
| `deletable` | 是否展示删除按钮 | `boolean` | `true` |
| `deleteRender` | 自定义删除按钮视图 | `(del: () => void) => ReactNode` | - |
| `showUpload` | 是否展示上传区域 | `boolean` | `true` |
| `capture` | 图片选取模式，可选值为 `camera`（Web 端） | `string` | - |
| `maxSize` | 文件大小限制，单位为 `byte`（Web 下 `file` 为 `File`） | `number \| string \| (file: UploaderFile) => boolean` | `Number.MAX_VALUE` |
| `maxCount` | 文件上传数量限制 | `number \| string` | `Number.MAX_VALUE` |
| `resultType` | 文件读取结果类型（Web 端） | `'dataUrl' \| 'text' \| 'file'` | `'dataUrl'` |
| `uploadText` | 上传区域文字提示 | `string` | - |
| `statusTextRender` | 自定义上传状态文案 | `(status: 'failed' \| 'pending') => ReactNode` | - |
| `imageFit` | 预览图裁剪模式 | `ImageFit` | `cover` |
| `uploadIcon` | 上传区域图标 | `ReactNode` | `+` |
| `children` | 自定义上传按钮 | `ReactNode` | - |

> `disabled/readOnly` 仅影响「上传区域」点击与文件选择，不影响预览与删除。如果需要禁用删除，请设置 `deletable={false}`。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `upload` | 上传方法（Web 端文件选择时触发；Web 下 `file` 为 `File`） | `(file: UploaderFile) => Promise<UploaderValueItem>` |
| `onChange` | 组件值更新时调用 | `(value: UploaderValueItem[]) => void` |
| `onOversize` | 文件大小超过限制时触发（Web 端；Web 下 `file` 为 `File`） | `(files: UploaderFile[]) => void` |
| `onClickUpload` | 点击上传区域时触发 | `(event: GestureResponderEvent) => void` |
| `onClickPreview` | 点击预览图时触发 | `(item: UploaderValueItem, index: number) => void` |
| `onClosePreview` | 关闭全屏图片预览时触发 | `() => void` |
| `onDelete` | 删除文件预览时触发 | `(item: UploaderValueItem) => boolean \| Promise<boolean> \| void` |
| `beforeRead` | 文件读取前回调，返回 `false` 可终止读取（Web 端；Web 下 `file` 为 `File`） | `(file: UploaderFile, files: UploaderFile[]) => Promise<UploaderFile \| false> \| UploaderFile \| false` |

### UploaderValueItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 唯一标识，不传则自动填充 | `string \| number` |
| `url` | 图片地址 | `string` |
| `thumbnail` | 缩略图地址 | `string` |
| `source` | RN `ImageSourcePropType`，可用于本地静态资源 | `ImageSourcePropType` |
| `file` | 原始文件（Web 下为 `File`；原生端可自定义结构） | `UploaderFile` |
| `status` | 上传状态（`pending` \| `failed`） | `'pending' \| 'failed'` |
| `message` | 自定义描述 | `string` |

### 类型定义

组件导出以下类型定义：

```ts
import type { UploaderInstance, UploaderResultType, UploaderValueItem } from 'react-native-system-ui'
```

`UploaderInstance` 用法如下：

```ts
const uploaderRef = React.useRef<UploaderInstance>(null)
uploaderRef.current?.chooseFile()
```

## 差异说明（React Native）

- Web 端内置文件选择能力，支持 `accept/multiple/capture/beforeRead/maxSize/onOversize/resultType/upload` 等能力。
- RN 原生端没有内置文件选择能力，可通过 `onUpload`（扩展能力）或 `onClickUpload` 自行接入图片选择库，然后回填 `value`。
