# 快速上手

安装依赖、配置 ThemeProvider 并引入第一个组件的标准流程。

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

## 配置 ThemeProvider

```tsx | pure
import { ThemeProvider } from 'react-native-system-ui'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)
```

未包裹时组件自动使用默认主题；包裹后通过 Context 下发 tokens。

## 引入组件

```tsx | pure
import { Button } from 'react-native-system-ui'

export const Page = () => (
  <Button text="立即下单" type="warning" block />
)
```

## 自定义主题

内置预设可直接使用：

```tsx | pure
import { ThemeProvider, themePresets } from 'react-native-system-ui'

export const DarkLayout = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider value={themePresets.dark}>{children}</ThemeProvider>
)
```

内置 `light` / `dark` / `aurora` 三套预设。需完全自定义时使用 `createTokens`：

```tsx | pure
import { ThemeProvider, createTokens } from 'react-native-system-ui'

const foundations = createTokens({
  palette: {
    success: {
      500: '#0f9960',
      600: '#0a6a42',
    },
  },
})

export const App = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    value={{
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
  </ThemeProvider>
)
```

`createTokens` 负责 foundations 深合并；组件级覆盖通过 `value.components` 传入。

## 开发约定

1. **Tokens 先行**：新设计维度（如间距、圆角）在 foundations 中定义，由组件消费。
2. **组件内聚**：tokens 推导逻辑放在组件目录内（如 `useXXXTokens`），不抽到公共层。
3. **文档同步**：组件交付时同步更新 `docs/components/<component>` 说明与示例。
