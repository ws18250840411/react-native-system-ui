# 快速上手

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

请确保宿主工程已经安装 `react@>=19.0` 与 `react-native@>=0.79`。

## 包裹 ThemeProvider

```tsx | pure
import { ThemeProvider } from 'react-native-system-ui'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)
```

`ThemeProvider` 会把 tokens 下发给所有组件，未包裹时会自动回落到默认主题。

## 使用第一个组件

```tsx | pure
import { Button } from 'react-native-system-ui'

export const Page = () => (
  <Button text="立即下单" type="warning" block />
)
```

## 自定义 Tokens

在大多数场景中，只需直接套用内置预设即可：

```tsx | pure
import { ThemeProvider, themePresets } from 'react-native-system-ui'

export const DarkLayout = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider value={themePresets.dark}>{children}</ThemeProvider>
)
```

除了默认的 `light` 外，还提供 `dark` 与品牌化的 `aurora` 预设，方便快速交付多主题界面。

需要完全控制 tokens 时，可继续使用 `createTokens`：

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

`createTokens` 只负责基础 tokens 的深合并；组件级 overrides 则通过 `ThemeProvider value.components` 传入，由对应组件目录消费。

## 推荐开发流程

1. **从设计系统开始**：如果需要新的维度（如新的间距命名），优先在 foundations 中定义再被组件消费。
2. **在组件目录内暴露 hooks**：例如 `button/useButtonTokens.ts`，把 tokens 推导逻辑收敛在组件内部，而不是放到公共骨架。
3. **及时同步文档**：组件完成后在 `docs/components/{component}.md` 增加说明与示例。
