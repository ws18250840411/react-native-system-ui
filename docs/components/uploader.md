---
simulator:
  compact: false
---

# Uploader 上传

## 介绍

用于在客户端挑选图片或文件，并展示预览、删除、状态等信息；文件获取与上传可以通过 `onUpload` 回调接入任意 RN 方案。

## 引入

```js
import { Uploader } from 'react-native-system-ui'
```

## 代码演示

### 基础用法

<code src="./uploader/demo/basic.tsx" title="基础"></code>

### 上传限制

<code src="./uploader/demo/limit.tsx" title="上传限制"></code>

### 自定义预览

<code src="./uploader/demo/custom.tsx" title="自定义预览"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 受控文件列表 | `UploaderValueItem[]` | - |
| `defaultValue` | 默认文件列表 | `UploaderValueItem[]` | `[]` |
| `onChange` | 文件列表变化回调 | `(items: UploaderValueItem[]) => void` | - |
| `onUpload` | 点击上传区域时触发，返回新增的文件（支持 Promise） | `() => UploaderValueItem \| UploaderValueItem[] \| Promise<...>` | - |
| `onClickUpload` | 点击上传区域（无论是否提供 `onUpload`） | `() => void` | - |
| `maxCount` | 最大文件数量，超出后隐藏上传区域 | `number` | `Infinity` |
| `showUpload` | 是否展示上传按钮 | `boolean` | `true` |
| `uploadText` | 上传区域文案 | `string` | - |
| `uploadIcon` | 自定义上传区域图标 | `ReactNode` | `+` |
| `previewSize` | 预览方块尺寸，单位 px | `number \| string` | `80` |
| `imageFit` | 预览图裁剪模式，参考 `Image` | `ImageFit` | `cover` |
| `previewImage` | 是否显示图片预览 | `boolean` | `true` |
| `previewFullImage` | 点击后是否打开全屏预览 | `boolean` | `true` |
| `previewOptions` | 透传给 `ImagePreview` 的配置 | `ImagePreviewProps`（除 `visible/images`） | - |
| `previewCoverRender` | 自定义覆盖在预览图上的内容 | `(item: UploaderValueItem) => ReactNode` | - |
| `statusTextRender` | 自定义上传中/失败文案 | `(status, item) => ReactNode` | - |
| `deletable` | 是否展示删除按钮 | `boolean` | `true` |
| `onDelete` | 删除前回调，返回 `false`/`Promise<false>` 阻止删除 | `(item, index) => boolean \| Promise<boolean>` | - |
| `onClickPreview` | 点击预览时触发 | `(item, index) => void` | - |
| `onClosePreview` | 关闭全屏预览时触发 | `() => void` | - |
| `disabled` | 禁用上传、删除、预览交互 | `boolean` | `false` |
| `readOnly` | 只读模式，仅展示预览 | `boolean` | `false` |

### UploaderValueItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `key` | 唯一标识，不传则自动填充 | `string \| number` |
| `url` | 图片地址 | `string` |
| `thumbnail` | 缩略图地址 | `string` |
| `source` | RN `ImageSourcePropType`，可用于本地静态资源 | `ImageSourcePropType` |
| `status` | 上传状态（`pending` \| `failed`） | `'pending' \| 'failed'` |
| `message` | 自定义描述 | `string` |

> 差异说明：RN 版本未内置文件选择能力，需要通过 `onUpload`（或 `onClickUpload` + 自行调用图片选择库）将选择的文件转换为 `UploaderValueItem` 后回填。
