# 架构设计

> 目标：在 React Native 中复刻 react-vant 的语义与体验，同时借鉴 react-native-xiaoshu 在布局、tokens、hooks 上的“可扩展骨架”。

## 三层骨架

1. **Design System（`src/design-system`）**
   - 只保存基础 design tokens（颜色、间距、排版、圆角等）以及 `ThemeProvider`，负责把 foundations + `value.components` 下发到 Context。
   - `createTokens` 仅用于生成 foundations，组件级 overrides 不在这里出现。
2. **Components（`src/components`）**
   - 每个组件目录自管理 tokens：`tokens.ts` 描述默认值，`useXXXTokens.ts` 负责把 foundations + overrides 合并，组件实现只依赖这些本地工具。
   - Button 是首个样例：`button/tokens.ts` 与 `button/useButtonTokens.ts` 完全封装了按钮的设计变量。

![architecture](https://dummyimage.com/800x260/eff3ff/5b63ff&text=theme+->+system+->+components)

## 与 react-vant / react-native-xiaoshu 的映射

| react-vant | React Native System UI | React Native Xiaoshu | 说明 |
| --- | --- | --- | --- |
| `createNamespace` + less variables | `ThemeProvider` + 每个组件自建 tokens (`src/components/*/tokens.ts`) | `Theme.useStyle` | 用 foundations 替代 less 变量，借鉴 Xiaoshu 的 `varCreator/styleCreator` 思路但将实现留在组件目录。 |
| `Button` type/size/plain/block | `type / size / plain / block / round / square / shadow` | `Button` type/size/danger | API 命名保持和 react-vant 统一，只在必要时贴合 React Native（如 `shadow` 映射到 `elevation`）。 |
| `ConfigProvider` | `ThemeProvider` | `Provider` | Provider 仅负责 tokens，无全局副作用。 |

## 命名规范

- **Type**：`default / primary / success / info / warning / danger`，完全对齐 react-vant。
- **Size**：`large / normal / small / mini`，对应 react-vant 的四档高度。
- **Plain/Color**：`plain + color/textColor` 组合取代 web 端的 `plain + hairline + color` 行为。
- **Shadow**：`boolean | 1 | 2 | 3`，可映射到 RN 的阴影 & elevation。

## 组件开发 Checklist

1. 设计 tokens（metrics / states / defaults）。
2. 定义 props（优先沿用 react-vant 名称）。
3. 在组件目录实现 `useXXXTokens` + 纯函数推导样式。
4. 提供至少 3 个文档示例（基础态 / 强调态 / 自定义主题）。
5. 编写 `react-test-renderer` 单测验证核心样式。

依靠以上约束，可以持续复制 react-vant 的组件，无须再在 React Native 中维护一套 less/变量体系。
