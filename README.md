# react-native-system-ui

面向 React Native 的设计系统级组件库。Tokens + ThemeProvider 主题体系，按需引入、体积可控；API 统一可组合，支持可访问性与多端一致。

## 特性

- **设计系统**：Design Tokens + ThemeProvider，无 less、基于 StyleSheet，组件不耦合具体样式，利于主题定制与按需复用。
- **体积可控**：支持 Tree Shaking 与按需引入，单组件体积可控；详见文档站「组件体积」。
- **API 统一**：语义贴近主流移动端组件库，迁移成本低；文档与示例聚焦落地与扩展。

## 快速开始

```bash
# 安装（推荐 pnpm/yarn）
pnpm add react-native-system-ui react-native-svg

# 如需在业务中直接使用图标组件（可 Tree Shaking）
pnpm add react-native-system-icon

# 同时保证项目已安装 react 和 react-native（>=18.2 / >=0.79）
```

**优先使用 ConfigProvider** 包裹根节点，这样 Button、Toast、Popup、Dialog 等都能直接使用，无需再配弹层挂载点。

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

## 架构总览

| 层级 | 说明 |
| --- | --- |
| `src/design-system` | 仅承载基础设计变量（颜色、排版、间距、圆角等）与 `ThemeProvider`，只做公共部分。 |
| `src/components/*` | 每个组件自带 `tokens.ts`/`useXXXTokens.ts` 等文件，负责自身的 token 推导与样式实现（Button 为首个示例）。 |

> 这一层次化结构让“设计语言”与“交互实现”各司其职，可快速扩展到 40+ 组件而不失控。

## 已交付能力

- **设计系统**：ConfigProvider、ThemeProvider、createTokens、themePresets（light/dark/aurora），组件自管 tokens。使用 Toast/Popup/Dialog 等弹层时推荐用 ConfigProvider 包裹根节点（内置 PortalHost）。
- **基础与展示**：Button、Badge、Cell、Collapse、Divider、Empty、Flex、Grid、Space、Tag、Typography、Loading、NoticeBar、Popup、Portal、Progress、Slider、Toast、Dialog、Image、ImagePreview、Skeleton、WaterMark 等。
- **表单与输入**：Form、Field、Input、PasswordInput、Checkbox、Radio、Switch、Stepper、Rate、Picker、DatetimePicker、Calendar、Search、NumberKeyboard、Area、Cascader、Selector 等。
- **导航与反馈**：Tabs、NavBar、Tabbar、ActionSheet、Notify、Overlay、ShareSheet、Sidebar、Swiper 等。
- **基础设施**：SafeAreaView、PortalHost、OverlayProvider、ConfigProvider 的 locale（zhCN/enUS）。
- **文档**：快速上手、架构设计、路线图及组件文档站（`docs/`）。

详细组件列表与状态见 [指南 / 路线图](./docs/guide/roadmap.md)。

## 组件体积

基于 `dist/es` 各组件目录 gzip 后相加（字节），非实际打包单 chunk 体积。当前体积较大的组件（Top 5）：

| 组件 | gzip 体积 |
| --- | --- |
| picker | ~10 KB |
| swiper | ~10 KB |
| tabs | ~9 KB |
| dropdown-menu | ~6.5 KB |
| form | ~6.3 KB |

完整列表与口径说明见文档站首页「组件体积」区域。

## 版本与反馈

当前为 v0.0.6，欢迎 issue / PR。
