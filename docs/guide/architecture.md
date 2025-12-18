# 架构设计

> 目标：在 React Native 中复刻成熟移动端组件的语义与体验，同时借鉴 react-native-xiaoshu 在布局、tokens、hooks 上的“可扩展骨架”。

## 三层骨架

1. **Design System（`src/design-system`）**
   - 只保存基础 design tokens（颜色、间距、排版、圆角等）以及 `ThemeProvider`，负责把 foundations + `value.components` 下发到 Context。
   - `createTokens` 仅用于生成 foundations，组件级 overrides 不在这里出现；如需现成主题，可直接使用 `themePresets`。
2. **Components（`src/components`）**
   - 每个组件目录自管理 tokens：`tokens.ts` 描述默认值，`useXXXTokens.ts` 负责把 foundations + overrides 合并，组件实现只依赖这些本地工具。
   - Button 是首个样例：`button/tokens.ts` 与 `button/useButtonTokens.ts` 完全封装了按钮的设计变量。
3. **Hooks（`src/hooks`）**
   - `usePresenceAnimation` 提供统一的显隐动效，`src/hooks/aria/*` 则封装 `@react-native-aria` 能力。
   - 具体使用方式参见《Guide / Aria Hooks》，遵循“集中导出 + 配套单测”的约束。

![architecture](https://dummyimage.com/800x260/eff3ff/5b63ff&text=theme+->+system+->+components)

## 与参考实现 / react-native-xiaoshu 的映射

| 参考实现（Web 端） | React Native System UI | React Native Xiaoshu | 说明 |
| --- | --- | --- | --- |
| `createNamespace` + less variables | `ThemeProvider` + 每个组件自建 tokens (`src/components/*/tokens.ts`) | `Theme.useStyle` | 用 foundations 替代 less 变量，借鉴 Xiaoshu 的 `varCreator/styleCreator` 思路但将实现留在组件目录。 |
| `Button` type/size/plain/block | `type / size / plain / block / round / square / shadow` | `Button` type/size/danger | API 命名保持统一，只在必要时贴合 React Native（如 `shadow` 映射到 `elevation`）。 |
| `ConfigProvider` | `ThemeProvider` | `Provider` | Provider 仅负责 tokens，无全局副作用。 |

## 命名规范

- **Type**：`default / primary / success / info / warning / danger`。
- **Size**：`large / normal / small / mini`。
- **Plain/Color**：`plain + color/textColor` 组合取代 web 端的 `plain + hairline + color` 行为。
- **Shadow**：`boolean | 1 | 2 | 3`，可映射到 RN 的阴影 & elevation。

## 组件开发 Checklist

1. 设计 tokens（metrics / states / defaults）。
2. 定义 props（优先沿用既有命名规范）。
3. 在组件目录实现 `useXXXTokens` + 纯函数推导样式。
4. 提供至少 3 个文档示例（基础态 / 强调态 / 自定义主题）。
5. 编写 `react-test-renderer` 单测验证核心样式。

依靠以上约束，可以持续扩展组件能力，无须再在 React Native 中维护一套 less/变量体系。
