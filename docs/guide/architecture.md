# 架构设计

库的分层结构、设计系统与组件扩展约定。

> 目标：在 React Native 上复刻成熟移动端语义与体验，以 tokens + ThemeProvider + 组件内 hooks 形成可扩展骨架。

## 三层结构

1. **Design System（`src/design-system`）**
   - 仅包含基础 design tokens（颜色、间距、排版、圆角等）与 `ThemeProvider`，向 Context 下发 foundations 与 `value.components`。
   - foundations 由 `createTokens` 生成；现成主题使用 `themePresets`。
2. **Components（`src/components`）**
   - 各组件目录自管 tokens：`tokens.ts` 定义默认值，`useXXXTokens` 合并 foundations 与 overrides，组件只依赖本地 tokens。
   - 示例：`button/tokens.ts` + `button/useButtonTokens.ts` 封装按钮设计变量。
3. **Hooks（`src/hooks`）**
   - `src/hooks/aria/*` 封装 `@react-native-aria`，集中导出并配套单测；显隐动效由组件内实现。

![architecture](https://dummyimage.com/800x260/eff3ff/5b63ff&text=theme+->+system+->+components)

## 与参考实现的对应关系

| 参考实现（Web） | React Native System UI | 说明 |
| --- | --- | --- |
| less 变量 / createNamespace | ThemeProvider + 各组件自建 tokens | foundations 替代 less，实现留在组件目录。 |
| Button type/size/plain/block | type / size / plain / block / round / square / shadow | API 命名统一，必要时贴合 RN（如 shadow → elevation）。 |
| ConfigProvider | ThemeProvider | 仅负责 tokens 下发，无全局副作用。 |

## 命名规范

- **Type**：`default / primary / success / info / warning / danger`
- **Size**：`large / normal / small / mini`
- **Plain/Color**：`plain + color/textColor` 替代 web 端 hairline 行为
- **Shadow**：`boolean | 1 | 2 | 3`，映射 RN 阴影与 elevation

## 组件开发 Checklist

1. 定义 tokens（metrics / states / defaults）
2. 定义 props（沿用既有命名规范）
3. 实现 `useXXXTokens` + 纯函数推导样式
4. 文档示例不少于 3 个（基础 / 强调 / 自定义主题）
5. 使用 `react-test-renderer` 单测覆盖核心样式

<!-- 覆盖主题限制，使本页内容可完整展示 -->
<style>
.doc-md-content { height: auto !important; min-height: 100%; }
.doc-container-markdown { overflow-y: visible !important; }
</style>
