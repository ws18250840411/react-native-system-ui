---
simulator:
  compact: false
---

# ConfigProvider 全局配置

## 介绍

为组件提供统一的全局配置（主题 / 语言）。

## 引入

```js
import { ConfigProvider } from 'react-native-system-ui'
```

## 代码演示

### 语言切换

通过 `locale` 属性切换语言。

<code title="语言切换" src="./config-provider/demo/locale.tsx"></code>

### 定制主题

通过 `theme` 属性覆盖设计 tokens，进而自定义组件主题。

<code title="定制主题" src="./config-provider/demo/theme.tsx"></code>

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
