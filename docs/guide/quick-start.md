# 快速上手

安装依赖、配置根节点并引入第一个组件的标准流程。

## 安装依赖

```bash
pnpm add react-native-system-ui react-native-svg
# 或者
yarn add react-native-system-ui react-native-svg

# 如需在业务中直接使用图标组件（可 Tree Shaking）
pnpm add react-native-system-icon
# 或者
yarn add react-native-system-icon
```

前置要求：宿主工程已安装 `react@>=18.2.0`、`react-native@>=0.79`。

## 配置根节点（推荐 ConfigProvider）

**优先使用 ConfigProvider**，这样 Button、Toast、Popup、Dialog 等都能直接使用，无需再配挂载点。

```tsx | pure
import { ConfigProvider } from 'react-native-system-ui'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider>{children}</ConfigProvider>
)
```

ConfigProvider 内置 **ThemeProvider**（主题）与 **PortalHost**（弹层挂载点），一次配置即可支持所有基础组件和弹层（Toast / Popup / Dialog / Notify 等）。若根节点只包 ThemeProvider 而没挂 PortalHost，弹层会无法显示。

### 也可以单独使用 ThemeProvider

仅做主题、且确定不用 Toast/Popup/Dialog 等弹层时，可以只用 ThemeProvider：

```tsx | pure
import { ThemeProvider } from 'react-native-system-ui'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)
```

**ConfigProvider 与 ThemeProvider 差异：**

| 能力 | ConfigProvider | ThemeProvider |
| --- | --- | --- |
| 主题（tokens） | ✅ 内置 ThemeProvider | ✅ |
| 弹层挂载点（PortalHost） | ✅ 内置 | ❌ 需再包一层 `<Portal.Host>` |
| 语言包（locale） | ✅ | ❌ |
| RTL 布局方向（direction） | ✅ | ❌ |

若一开始用了 ThemeProvider，后来要接 Toast/Popup/Dialog，要么在根节点再包一层 `<Portal.Host>`，要么改为使用 ConfigProvider。详见 [ConfigProvider](../components/config-provider.md) 与 [Portal](../components/portal.md)。

## 引入组件

```tsx | pure
import { Button } from 'react-native-system-ui'

export const Page = () => (
  <Button text="立即下单" type="warning" block />
)
```

## 国际化

ConfigProvider 内置 `locale` 属性切换语言，自带 `zhCN`（中文，默认）和 `enUS`（英文）两套语言包。组件中的默认文案（确认、取消、加载中等）均会随之切换。

```tsx | pure
import { ConfigProvider, enUS } from 'react-native-system-ui'

export const EnApp = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider locale={enUS}>{children}</ConfigProvider>
)
```

语言包覆盖了 Toast、Dialog、Picker、Calendar、Cascader、Image、Form、NumberKeyboard、ShareSheet、NoticeBar、NavBar 等组件的文案。你也可以使用 `useLocale()` 在自定义组件中读取当前语言。

## RTL 布局

通过 `direction` 属性支持从右到左（RTL）的语言环境（如阿拉伯语、希伯来语）。设置后 NavBar、Cell、Popup、Sidebar、Tag、Stepper、NoticeBar 等组件会自动镜像布局。

```tsx | pure
import { ConfigProvider } from 'react-native-system-ui'

export const RTLApp = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider direction="rtl">{children}</ConfigProvider>
)
```

> `direction` 默认值由 `I18nManager.isRTL` 决定；也可在子组件中通过 `useDirection()` hook 读取当前方向。

## 自定义主题

使用 ConfigProvider 时，通过 `theme` 传入主题即可；内置预设可直接用：

```tsx | pure
import { ConfigProvider, themePresets } from 'react-native-system-ui'

export const DarkLayout = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider theme={themePresets.dark}>{children}</ConfigProvider>
)
```

内置 `light` / `dark` / `aurora` 三套预设。需完全自定义时使用 `createTokens`：

```tsx | pure
import { ConfigProvider, createTokens } from 'react-native-system-ui'

const foundations = createTokens({
  palette: {
    success: {
      500: '#0f9960',
      600: '#0a6a42',
    },
  },
})

export const App = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider
    theme={{
      foundations,
      components: {
        button: {
          defaults: {
            type: 'success',
            plain: true,
          },
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
)
```

`createTokens` 负责 foundations 深合并；组件级覆盖通过 `theme.components` 传入。若使用 ThemeProvider，则把 `theme` 改为 `value`、用 `<ThemeProvider value={...}>` 即可。

## NativeWind（Tailwind CSS）支持

如果项目使用了 [NativeWind](https://www.nativewind.dev/)，可一键为所有组件开启 `className` 支持，无需逐个注册：

```tsx | pure
import { cssInterop } from 'nativewind'
import { enableNativeWind } from 'react-native-system-ui/nativewind'

enableNativeWind(cssInterop)
```

在应用入口文件顶部调用即可，iOS / Android / Web 三端统一生效。之后所有组件均可使用 `className`：

```tsx | pure
<Button className="mt-4 rounded-lg" text="Tailwind 按钮" type="primary" />
```

**说明：**

- `enableNativeWind` 会自动遍历组件库导出，将所有 React 组件注册 `className → style` 映射，组件库新增/删除组件时无需改动应用侧代码。
- 当前仅映射 `className → style`，如需扩展其他 prop 映射（如 `contentContainerClassName`），可通过 `cssInterop` 对单个组件自行注册。
- 若自引用导入在特殊环境下不可用，可手动传入模块对象作为降级：

```tsx | pure
import * as SystemUI from 'react-native-system-ui'
import { cssInterop } from 'nativewind'
import { enableNativeWind } from 'react-native-system-ui/nativewind'

enableNativeWind(cssInterop, SystemUI)
```

> `nativewind` 为可选 peerDependency，不使用 NativeWind 时无需安装。

## 开发约定

1. **Tokens 先行**：新设计维度（如间距、圆角）在 foundations 中定义，由组件消费。
2. **组件内聚**：tokens 推导逻辑放在组件目录内（如 `useXXXTokens`），不抽到公共层。
3. **文档同步**：组件交付时同步更新 `docs/components/<component>` 说明与示例。
