# react-native-system-ui

面向 React Native 的高性能设计系统组件库。基于 Design Tokens 驱动主题体系，50+ 组件全量覆盖移动端场景；原生 StyleSheet 零运行时开销，单组件均值 **2.7 KB gzip**；iOS / Android / Web 三端同构，API 一致、行为对齐。

## 核心优势

- **极致轻量**：全组件经过逐行精简——冗余 Hook 移除、StyleSheet 合并、计算内联、辅助函数提取；构建产物 esbuild 压缩；按需引入 + Tree Shaking，单组件平均 gzip 仅 **2.7 KB**，最小组件（SafeAreaView）仅 **0.5 KB**。
- **原生性能**：纯 StyleSheet 驱动，零 CSS-in-JS 运行时；动画基于原生 Animated / LayoutAnimation，无 JS 线程阻塞；列表类组件（Picker、Swiper、Tabs）基于 FlatList / ScrollView 原生滚动，确保 60fps 流畅交互。
- **三端同构**：iOS / Android / Web 统一 API 与交互行为；Swiper、Picker 等核心组件在 Web 端自动适配桌面鼠标拖拽与移动端触控，无需业务层额外处理。
- **设计系统**：Design Tokens + ThemeProvider 分层架构，组件自管 tokens；支持 light / dark / 品牌主题一键切换，样式定制不侵入组件实现。
- **Tailwind CSS 支持**：通过 NativeWind 集成，一行代码为全部组件开启 `className` 支持，组件增删无需改动应用侧。

## 快速开始

```bash
# 安装（推荐 pnpm/yarn）
pnpm add react-native-system-ui react-native-svg

# 如需在业务中直接使用图标组件（可 Tree Shaking）
pnpm add react-native-system-icon react-native-svg

# 同时保证项目已安装 react 和 react-native（>=18.2 / >=0.79）
```

**优先使用 ConfigProvider** 包裹根节点，Button、Toast、Popup、Dialog 等即可直接使用，无需额外配置弹层挂载点。

```tsx
import { ConfigProvider, Button, Toast } from 'react-native-system-ui'

export const App = () => (
  <ConfigProvider>
    <Button text="提交" onPress={() => Toast.show('你好')} type="primary" shadow />
  </ConfigProvider>
)
```

ConfigProvider 内置 **ThemeProvider**（主题）与 **PortalHost**（弹层挂载点）。若只包 ThemeProvider 而没挂 PortalHost，Toast/Popup/Dialog 会无法显示。

### 也可以单独使用 ThemeProvider

仅做主题、且确定不用弹层时，可只用 ThemeProvider；之后若要接 Toast/Popup/Dialog，需再包一层 `<Portal.Host>` 或改用 ConfigProvider。

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
    primary: {
      500: '#111f8f',
      600: '#0b1461',
    },
  },
})

export const App = ({ children }) => (
  <ThemeProvider
    value={{
      foundations,
      components: {
        button: {
          defaults: {
            size: 'large',
          },
        },
        datetimePicker: {
          defaults: {
            popupPlacement: 'bottom',
          },
        },
      },
    }}
  >
    {children}
  </ThemeProvider>
)
```

组件 tokens 的 key 使用驼峰命名，与导出的组件名保持一致，例如 `passwordInput`、`safeAreaView`、`shareSheet`。

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

`themePresets.light` 等价于默认主题，`themePresets.dark` 提供深色配色，`themePresets.aurora` 演示品牌化圆角/字体，通过 `ThemeProvider` 配置。

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

自动遍历组件库导出注册 `className → style` 映射，组件增删无需改动应用侧。`nativewind` 为可选依赖，不使用时无需安装。详见 [快速上手 - NativeWind](./docs/guide/quick-start.md#nativewindtailwind-css支持)。

## 架构

| 层级 | 职责 |
| --- | --- |
| `src/design-system` | 基础设计变量（颜色、排版、间距、圆角）与 ThemeProvider，仅承载公共部分 |
| `src/components/*` | 每个组件自带 `tokens.ts` / `useXXXTokens.ts`，自管 token 推导与样式，互不耦合 |

> 分层架构使"设计语言"与"交互实现"各司其职，可平滑扩展至 50+ 组件而不失控。

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

按需引入后单组件均值约 **2.7 KB**（各组件目录 gzip 相加估算，数据由 `pnpm run build && pnpm run docs:update-size` 生成）。支持 Tree Shaking，实际打包体积以构建结果为准。

| 组件 | gzip | 组件 | gzip | 组件 | gzip |
| --- | ---: | --- | ---: | --- | ---: |
| picker | 6.3 KB | tabs | 6.2 KB | form | 4.7 KB |
| dialog | 4.6 KB | cascader | 4.5 KB | field | 4.4 KB |
| calendar | 4.2 KB | slider | 4.1 KB | number-keyboard | 4.0 KB |
| toast | 3.9 KB | swiper | 3.9 KB | popup | 3.8 KB |
| notify | 3.7 KB | image-preview | 3.6 KB | checkbox | 3.6 KB |
| stepper | 3.6 KB | button | 3.6 KB | cell | 3.4 KB |
| radio | 3.3 KB | grid | 3.2 KB | tabbar | 3.0 KB |
| notice-bar | 2.9 KB | collapse | 2.8 KB | config-provider | 2.8 KB |
| password-input | 2.8 KB | action-sheet | 2.8 KB | image | 2.7 KB |
| sidebar | 2.6 KB | datetime-picker | 2.5 KB | share-sheet | 2.4 KB |
| progress | 2.3 KB | selector | 2.2 KB | nav-bar | 2.2 KB |
| portal | 2.1 KB | typography | 2.1 KB | circle | 2.0 KB |
| search | 2.0 KB | skeleton | 1.9 KB | badge | 1.9 KB |
| water-mark | 1.9 KB | tag | 1.8 KB | flex | 1.6 KB |
| space | 1.6 KB | avatar | 1.5 KB | divider | 1.4 KB |
| empty | 1.4 KB | input | 1.3 KB | area | 1.2 KB |
| count-down | 1.1 KB | loading | 1.1 KB | switch | 1.0 KB |
| overlay | 0.8 KB | error-boundary | 0.6 KB | safe-area-view | 0.5 KB |

## 版本与反馈

当前为 v1.0.5，欢迎 issue / PR。
