# react-native-system-ui

面向 React Native 的工程级设计系统组件库。以 Design Tokens 为核心抽象，提供 50+ 个高频业务组件，覆盖 iOS / Android / Web 三端。组件运行时轻量、可裁剪、可预测，按需引入后单组件均值 **2.7 KB gzip**，适合对性能、体积、主题一致性和跨端体验有明确要求的产品工程。

## 核心优势

- **轻量可裁剪**：支持 ESM / CJS / React Native 条件导出，配合 `sideEffects: false` 与子路径按需引入，当前运行时产物为 `dist/es 245` / `dist/cjs 245` 个文件；单组件平均 gzip 约 **2.7 KB**，最小组件约 **0.4 KB**。
- **原生优先的性能模型**：样式基于 React Native `StyleSheet`，不引入 CSS-in-JS 运行时；Picker、Swiper、Tabs 等高交互组件基于 FlatList / ScrollView / Animated 等原生能力，滚动、手势、惯性和边界状态由组件内部统一处理。
- **跨端一致的交互语义**：iOS / Android / Web 使用同一套组件 API，并内置 Pointer、Touch、BackHandler、Portal、Overlay、SafeArea、reduced motion 等平台桥接，让业务代码保持一致。
- **可演进的 Token 架构**：foundations、组件 tokens、主题级覆盖与实例级 `tokensOverride` 分层组合，既能承载 light / dark / 品牌主题，也支持单组件局部覆写；token 合并路径带缓存策略，减少重复对象创建。
- **生产级基础设施**：内置 ConfigProvider、PortalHost、Overlay Stack、locale、ErrorBoundary、SafeAreaView、NativeWind 适配和体积数据生成，覆盖业务接入、主题治理、弹层挂载、无障碍语义与构建产物追踪。

## 快速开始

```bash
# 推荐使用 pnpm / yarn
pnpm add react-native-system-ui react-native-svg

# 可选：直接使用图标组件
pnpm add react-native-system-icon react-native-svg
```

建议在应用根节点使用 `ConfigProvider`。它同时提供主题、语言包与弹层挂载点，Toast、Popup、Dialog 等命令式组件可直接使用。

```tsx
import { ConfigProvider, Button, Toast } from 'react-native-system-ui'

export const App = () => (
  <ConfigProvider>
    <Button type="primary" text="提交" onPress={() => Toast.show('提交成功')} />
  </ConfigProvider>
)
```

`ConfigProvider` 内置 **ThemeProvider** 与 **PortalHost**。如果只使用 `ThemeProvider`，请在需要 Toast / Popup / Dialog 时额外挂载 `<Portal.Host>`。

### 也可以单独使用 ThemeProvider

仅需要主题能力时，可以单独使用 `ThemeProvider`。

| 能力 | ConfigProvider | ThemeProvider |
| --- | --- | --- |
| 主题（tokens） | ✅ 内置 | ✅ |
| 弹层挂载点（PortalHost） | ✅ 内置 | ❌ 需再包 `<Portal.Host>` |
| 语言包（locale） | ✅ | ❌ |

详见 [ConfigProvider](./docs/components/config-provider.md) / [Portal](./docs/components/portal.md)。

### 自定义 Tokens

```tsx
import { ThemeProvider, createTokens } from 'react-native-system-ui'

const foundations = createTokens({
  palette: {
    primary: { 500: '#165DFF', 600: '#0E42D2' },
  },
})

export const App = ({ children }) => (
  <ThemeProvider
    value={{
      foundations,
      components: {
        button: { defaults: { size: 'large' } },
        toast: { radius: 12 },
      },
    }}
  >
    {children}
  </ThemeProvider>
)
```

组件 token key 使用驼峰命名，例如 `passwordInput`、`safeAreaView`、`shareSheet`。

### 主题预设

```tsx
import { ThemeProvider, themePresets } from 'react-native-system-ui'

export const DarkPage = () => (
  <ThemeProvider value={themePresets.dark}>
    <Button text="夜间下单" type="primary" block />
  </ThemeProvider>
)

export const AuroraBranding = () => (
  <ThemeProvider value={themePresets.aurora}>
    <Button text="Aurora" type="success" plain />
  </ThemeProvider>
)
```

`themePresets.light` 等价于默认主题，`themePresets.dark` 提供深色配色，`themePresets.aurora` 演示品牌化圆角、字体和色彩策略。

## NativeWind（Tailwind CSS）支持

项目使用了 [NativeWind](https://www.nativewind.dev/) 时，可一键为所有组件开启 `className` 支持：

```tsx
import { cssInterop } from 'nativewind'
import { enableNativeWind } from 'react-native-system-ui/nativewind'

enableNativeWind(cssInterop)
```

在应用入口调用后，所有组件均可使用 Tailwind 类名：

```tsx
<Button className="mt-4 rounded-lg" text="Tailwind 按钮" type="primary" />
```

`nativewind` 为可选依赖，不使用 Tailwind 时无需安装。详见 [快速上手 - NativeWind](./docs/guide/quick-start.md#nativewindtailwind-css支持)。

## 架构

| 层级 | 职责 |
| --- | --- |
| `src/design-system` | foundations、主题上下文、token 缓存与主题预设 |
| `src/components/*` | 组件实现、组件 tokens 与组件私有逻辑 |
| `src/internal` | 命令式 Portal、反馈生命周期、内置图标、SVG bridge 等共享 runtime |
| `src/internal/aria` | 无障碍语义与跨端交互桥接 |
| `src/platform` / `src/utils` | 平台能力封装与通用工具函数 |
| `scripts` | exports、types、dist prune、体积数据和 README 体积表生成 |

> 架构目标是让主题、交互、弹层、无障碍和构建产物都有明确边界。公共 API 保持克制，复杂实现优先下沉到组件私有逻辑或 internal runtime，避免组件规模增长后带来不可控的导入链和运行时成本。

## 组件总览

| 分类 | 组件 |
| --- | --- |
| **设计系统** | ConfigProvider、ThemeProvider、Text、createTokens、themePresets（light / dark / aurora） |
| **基础展示** | Button、Badge、Cell、Collapse、Divider、Empty、Flex、Grid、Space、Tag、Typography、Loading、Avatar |
| **反馈交互** | Toast、Dialog、ActionSheet、Notify、Overlay、Popup、Portal、NoticeBar、ShareSheet |
| **表单输入** | Form、Field、Input、PasswordInput、Checkbox、Radio、Switch、Stepper、Rate、Picker、DatetimePicker、Calendar、Search、NumberKeyboard、Area、Cascader、Selector |
| **导航布局** | Tabs、NavBar、Tabbar、Sidebar、Swiper（三端手势 + 桌面鼠标拖拽） |
| **数据展示** | Image、ImagePreview、Skeleton、Progress、Circle、Slider、CountDown、WaterMark |
| **基础设施** | SafeAreaView、ErrorBoundary、PortalHost、OverlayProvider、locale（zhCN / enUS） |

详细组件列表与开发状态见 [路线图](./docs/guide/roadmap.md)。

## 组件体积

<!-- docs:component-sizes:start -->
按需引入后单组件均值约 **2.7 KB**（各组件目录 gzip 相加估算，数据由 `pnpm run build && pnpm run docs:update-size` 生成；**本段与下表由 scripts/generate-docs-size-data.mjs 自动生成，请勿手工改数字**）。支持 Tree Shaking，实际打包体积以构建结果为准。

| 组件 | gzip | 组件 | gzip | 组件 | gzip |
| --- | ---: | --- | ---: | --- | ---: |
| tabs | 6.9 KB | picker | 6.6 KB | dialog | 4.5 KB |
| cascader | 4.5 KB | form | 4.5 KB | field | 4.4 KB |
| radio | 4.3 KB | checkbox | 4.2 KB | calendar | 4.2 KB |
| number-keyboard | 4.1 KB | slider | 4.1 KB | popup | 3.9 KB |
| swiper | 3.8 KB | stepper | 3.6 KB | toast | 3.4 KB |
| button | 3.4 KB | notify | 3.4 KB | image-preview | 3.3 KB |
| cell | 3.2 KB | grid | 3.0 KB | notice-bar | 2.8 KB |
| tabbar | 2.8 KB | collapse | 2.8 KB | action-sheet | 2.8 KB |
| password-input | 2.8 KB | image | 2.7 KB | config-provider | 2.5 KB |
| datetime-picker | 2.4 KB | sidebar | 2.4 KB | share-sheet | 2.3 KB |
| selector | 2.3 KB | progress | 2.2 KB | nav-bar | 2.2 KB |
| portal | 2.0 KB | circle | 2.0 KB | typography | 2.0 KB |
| search | 2.0 KB | tag | 1.8 KB | water-mark | 1.8 KB |
| skeleton | 1.8 KB | badge | 1.8 KB | space | 1.5 KB |
| avatar | 1.5 KB | divider | 1.4 KB | empty | 1.4 KB |
| flex | 1.4 KB | input | 1.3 KB | area | 1.2 KB |
| count-down | 1.1 KB | switch | 1.1 KB | loading | 1.0 KB |
| overlay | 0.6 KB | error-boundary | 0.6 KB | safe-area-view | 0.4 KB |
<!-- docs:component-sizes:end -->

## 版本与反馈

当前版本为 v1.1.1。欢迎通过 issue / PR 反馈跨端行为、主题扩展、无障碍语义和体积审计相关问题。
