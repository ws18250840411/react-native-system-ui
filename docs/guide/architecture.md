# 架构设计

库的分层结构、设计系统与组件扩展约定。

> 目标：在 React Native 上复刻成熟移动端语义与体验，以 tokens + ThemeProvider + 组件内 hooks 形成可扩展骨架，同时提供国际化与 RTL 布局支持。

## 分层结构

```text
┌──────────────────────────────────────────────────┐
│  App / Business Layer                            │
├──────────────────────────────────────────────────┤
│  Components  (src/components)                    │
│  Button · Popup · Dialog · Form · Calendar ...   │
├──────────────────────────────────────────────────┤
│  Hooks  (src/hooks)                              │
│  aria · gesture · overlay · lifecycle            │
├──────────────────────────────────────────────────┤
│  Design System  (src/design-system)              │
│  ThemeProvider · createTokens · themePresets      │
├──────────────────────────────────────────────────┤
│  Platform  (src/platform)                        │
│  animation · measure · scrollLock · history      │
├──────────────────────────────────────────────────┤
│  Utils  (src/utils)                              │
│  createPlatformShadow · rtl · noop ...           │
└──────────────────────────────────────────────────┘
```

### 1. Design System（`src/design-system`）

- 仅包含基础 design tokens（颜色、间距、排版、圆角等）与 `ThemeProvider`，向 Context 下发 foundations 与 `value.components`。
- foundations 由 `createTokens` 生成；现成主题使用 `themePresets`（light / dark / aurora）。
- `createComponentTokensHook` 工厂函数为每个组件生成 `useXxxTokens` hook，自动合并 foundations → 全局组件 overrides → 实例 tokensOverride。

### 2. Components（`src/components`）

- 各组件目录自管 tokens：`tokens.ts` 定义默认值，`useXxxTokens` 合并 foundations 与 overrides，组件只依赖本地 tokens。
- 统一工程模式：`React.forwardRef` + `React.memo` + `displayName` + `StyleSheet.create`。
- 国际化：通过 `useLocale()` 获取当前语言包，所有用户可见文案使用 locale 引用而非硬编码。
- RTL：通过 `useDirection()` 获取布局方向，使用 `flipStyle()` 工具或条件样式进行镜像适配。

### 3. Hooks（`src/hooks`）

- `src/hooks/aria/*` 封装无障碍交互能力（useAriaPress、useAriaToggle、useAriaListBox、useAriaOverlay、useFocus、useFocusRing），集中导出并配套单测。
- `src/hooks/overlay/*` 管理弹层栈（OverlayStack / BackHandler / popstate / 滚动锁）。
- `src/hooks/gesture/*` 提供手势滚动等能力。
- `src/hooks/lifecycle/*` 提供生命周期相关工具。

### 4. Platform（`src/platform`）

跨平台差异抽象层：

| 模块 | 说明 |
| --- | --- |
| `animation.ts` | `nativeDriverEnabled` 根据平台决定是否启用原生动画驱动 |
| `measure.ts` | `measureInWindow` 统一 React Native 与 Web DOM 的布局测量 |
| `scrollLock.ts` | `setBodyScrollLocked` Web 端锁定背景滚动 |
| `history.ts` | `addPopStateListener` Web 端浏览器回退监听 |
| `runtime.ts` | `isWeb` / `isIOS` / `isAndroid` 平台判断 |

### 5. Utils（`src/utils`）

| 工具 | 说明 |
| --- | --- |
| `createPlatformShadow` | 根据平台生成 boxShadow（Web）或 elevation + shadow\*（Native） |
| `rtl.ts` / `flipStyle` | RTL 布局镜像工具，自动翻转 left/right 相关样式 |
| `noop` | 空函数占位 |
| 其他 | 颜色处理、数值工具等 |

## ConfigProvider 全局配置

ConfigProvider 是推荐的根节点配置组件，内置三大能力：

| 能力 | 实现 |
| --- | --- |
| **主题** | 内置 ThemeProvider，下发 foundations + components overrides |
| **国际化** | LocaleContext，内置 zhCN / enUS 两套语言包 |
| **RTL 布局** | DirectionContext，默认从 `I18nManager.isRTL` 读取 |
| **弹层挂载** | 内置 PortalHost，Toast / Popup / Dialog 等无需额外配置 |

```tsx | pure
<ConfigProvider
  theme={themePresets.dark}
  locale={enUS}
  direction="rtl"
>
  <App />
</ConfigProvider>
```

## 国际化（i18n）设计

- **Locale 定义**：`src/components/config-provider/locale/` 下的 `types.d.ts` 定义 Locale 接口，`zh-CN.ts` 和 `en-US.ts` 提供内置翻译。
- **使用方式**：组件中通过 `useLocale()` 获取当前 locale 对象，使用 `locale.vanXxx?.key ?? 'Fallback'` 模式。
- **覆盖范围**：Toast、Dialog、Picker、Calendar、Cascader、Image、Form、NumberKeyboard、ShareSheet、NoticeBar、NavBar 等组件。
- **Token 默认值**：组件 tokens 中的默认文案使用英文（如 `loadingText: 'Loading…'`），确保无 locale 时也不会显示乱码。

## RTL 布局设计

- **ConfigProvider** 通过 `direction` prop 下发布局方向。
- **useDirection()** hook 在组件内读取当前方向。
- **flipStyle()** 工具函数自动将 `marginLeft` ↔ `marginRight`、`paddingLeft` ↔ `paddingRight`、`left` ↔ `right` 等水平属性进行镜像。
- **已适配组件**：NavBar（返回箭头翻转）、Cell（右箭头翻转）、Popup（关闭图标位置）、Sidebar（指示条位置）、Tag（mark 圆角）、Stepper（按钮圆角）、NoticeBar（滚动方向）。

## 错误边界

- **ErrorBoundary** 组件基于 `componentDidCatch` + `getDerivedStateFromError` 实现。
- 支持自定义 `fallback`（静态节点或渲染函数）、`onError` 回调（对接监控平台）、命令式 `ref.reset()` 重置。
- 建议在 ConfigProvider 外层包裹 ErrorBoundary 防止全局崩溃。

## 与参考实现的对应关系

| 参考实现（Web） | React Native System UI | 说明 |
| --- | --- | --- |
| less 变量 / createNamespace | ThemeProvider + 各组件自建 tokens | foundations 替代 less，实现留在组件目录 |
| Button type/size/plain/block | type / size / plain / block / round / square / shadow | API 命名统一，必要时贴合 RN（如 shadow → elevation） |
| ConfigProvider | ConfigProvider | 统一主题、i18n、RTL、PortalHost |
| i18n 语言包 | ConfigProvider locale + useLocale() | 内置 zhCN / enUS，可自定义扩展 |
| CSS direction: rtl | ConfigProvider direction + useDirection() | 通过 Context 传递，组件条件适配 |

## 命名规范

- **Type**：`default / primary / success / info / warning / danger`
- **Size**：`large / normal / small / mini`
- **Plain/Color**：`plain + color/textColor` 替代 web 端 hairline 行为
- **Shadow**：`boolean | 1 | 2 | 3`，映射 RN 阴影与 elevation

## 组件开发 Checklist

1. 定义 tokens（metrics / states / defaults）
2. 定义 props（沿用既有命名规范）
3. 实现 `useXXXTokens` + 纯函数推导样式
4. 国际化：用户可见文案使用 `useLocale()` + locale key
5. RTL：涉及方向的组件使用 `useDirection()` 适配
6. 无障碍：接入 `useAriaPress` / `useAriaToggle` 等 aria hooks
7. 错误处理：关键渲染路径加入防御性编程
8. 文档示例不少于 3 个（基础 / 强调 / 自定义主题）
9. 使用 `react-test-renderer` 单测覆盖核心样式
10. 多端验证（iOS / Android / Web）

## Bundle 优化

- `package.json` 的 `exports` 字段为每个组件提供独立入口，支持 tree-shaking。
- `sideEffects: false` 声明无副作用。
- 同时输出 ESM（`dist/es`）和 CJS（`dist/cjs`）两种格式。
- 各组件按需引入，未使用的组件不会进入最终产物。

<!-- 覆盖主题限制，使本页内容可完整展示 -->
<style>
.doc-md-content { height: auto !important; min-height: 100%; }
.doc-container-markdown { overflow-y: visible !important; }
</style>
