---
simulator:
  compact: true
---

# ConfigProvider 全局配置

## 介绍

为组件提供统一的全局配置（主题 / 语言）。

## 引入

```js
import { ConfigProvider } from 'react-native-system-ui'
```

> `ConfigProvider` 内部会自动包裹 `ThemeProvider` 与 `PortalHost`，作为主题与弹层能力的统一出口（使用 `Popup`/`Toast`/`Dialog` 等无需再额外渲染 `PortalHost`）。

## 代码演示

### 语言切换

通过 `locale` 属性切换语言。

<code title="语言切换" src="./config-provider/demo/locale.tsx"></code>

### 定制主题

通过 `theme` 属性覆盖设计 tokens，进而自定义组件主题。

<code title="定制主题" src="./config-provider/demo/theme.tsx"></code>

> 如果仅需要快速切换预设，可直接传入 `themePresets.dark`、`themePresets.aurora` 等对象，无需手动创建 tokens。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `theme` | 主题配置，等同于 `ThemeProvider` 的 `value` | `ThemeProviderValue` | `undefined` |
| `locale` | 语言包（可与 `zhCN`、`enUS` merge） | `Locale` | `zhCN` |

### 类型定义

```ts
import { ConfigProvider, zhCN, enUS, useLocale } from 'react-native-system-ui'
```

> React Native 环境不存在 `tag`、`prefers-color-scheme` 等 DOM 能力，如需深度主题切换，可结合 `ConfigProvider` + `ThemeProvider` 自行注入 tokens。

## 差异说明

- React Vant 通过 `themeVars` 覆盖 CSS 变量实现主题定制；本库以设计 tokens（`theme`）驱动样式，适配 React Native 的跨端渲染模型。
- React Vant 支持 `tag` 指定根节点标签；本库在 React Native 环境不支持对应 DOM 能力。
- 本库在 `ConfigProvider` 内置 `PortalHost`，保证弹层组件有统一的渲染出口。
