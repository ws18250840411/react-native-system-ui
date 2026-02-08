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

通过 `locale` 属性切换语言。内置 `zhCN`（中文）与 `enUS`（英文）两套语言包，也可以自行扩展。

<code title="语言切换" src="./config-provider/demo/locale.tsx"></code>

### RTL 布局

通过 `direction` 属性设置文本与布局方向，支持阿拉伯语、希伯来语等从右到左（RTL）的语言环境。设置后，NavBar、Cell、Popup、Sidebar、Tag、Stepper、NoticeBar 等组件会自动镜像布局。

<code title="RTL 布局" src="./config-provider/demo/rtl.tsx"></code>

> `direction` 默认值由 `I18nManager.isRTL` 决定。你也可以在子组件中通过 `useDirection()` hook 读取当前方向。

### 定制主题

通过 `theme` 属性覆盖设计 tokens，进而自定义组件主题。

<code title="定制主题" src="./config-provider/demo/theme.tsx"></code>

> 如果仅需要快速切换预设，可直接传入 `themePresets.dark`、`themePresets.aurora` 等对象，无需手动创建 tokens。

### 实例级 tokensOverride（按组件覆盖）

除了通过 `ConfigProvider.theme` 做全局主题定制之外，本库的大部分组件还支持在组件实例上直接传入 `tokensOverride`，用来做“这一处”样式/尺寸等 tokens 的局部覆盖。

- 生效优先级：组件默认 tokens < `ConfigProvider.theme.components`（全局组件 tokens）< 组件 `tokensOverride`（实例覆盖）
- 类型：`tokensOverride` 的类型为 `DeepPartial<该组件对应的 Tokens>`，只需要填你要改的字段即可（TS 会自动提示）

<code title="实例级 tokensOverride" src="./config-provider/demo/tokens-override.tsx"></code>

> 注意：少数组件是“组合封装”形式，可能会提供多个覆盖入口。例如 `Input` 同时提供 `tokensOverride`（影响 Input 外层样式）与 `fieldTokensOverride`（影响内部 Field 的 tokens）。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `theme` | 主题配置，等同于 `ThemeProvider` 的 `value` | `ThemeProviderValue` | `undefined` |
| `locale` | 语言包（可与 `zhCN`、`enUS` merge） | `Locale` | `zhCN` |
| `direction` | 布局方向，用于 RTL 语言环境 | `'ltr' \| 'rtl'` | `I18nManager.isRTL ? 'rtl' : 'ltr'` |

### 相关 Hooks

| Hook | 说明 | 返回值 |
| --- | --- | --- |
| `useLocale()` | 获取当前 locale 对象 | `Locale` |
| `useDirection()` | 获取当前布局方向 | `'ltr' \| 'rtl'` |

### 类型定义

```ts
import { ConfigProvider, zhCN, enUS, useLocale, useDirection } from 'react-native-system-ui'
import type { ConfigProviderProps, Direction, Locale } from 'react-native-system-ui'
```

> React Native 环境不存在 `tag`、`prefers-color-scheme` 等 DOM 能力，如需深度主题切换，可结合 `ConfigProvider` + `ThemeProvider` 自行注入 tokens。

## 差异说明

- 本库以设计 tokens（`theme`）驱动样式，适配 React Native 的跨端渲染模型（Web 端通常通过 CSS 变量实现主题定制）。
- React Native 环境不支持 `tag` 指定根节点标签等 DOM 能力。
- 本库在 `ConfigProvider` 内置 `PortalHost`，保证弹层组件有统一的渲染出口。
