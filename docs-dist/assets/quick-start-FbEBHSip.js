import{j as u}from"./main-O6KZrSH_.js";const r=function({previewer:n=()=>null,api:c=()=>null}){const e=n;return u.jsx("div",{children:u.jsxs("div",{children:[u.jsx("h1",{id:"快速上手","data-anchor":"快速上手",children:"快速上手"}),u.jsx("p",{children:"安装依赖、配置根节点并引入第一个组件的标准流程。"}),u.jsx("h2",{id:"安装依赖","data-anchor":"安装依赖",children:"安装依赖"}),u.jsx(e,{code:`pnpm add react-native-system-ui react-native-svg
# 或者
yarn add react-native-system-ui react-native-svg

# 如需在业务中直接使用图标组件（可 Tree Shaking）
pnpm add react-native-system-icon
# 或者
yarn add react-native-system-icon`,lang:"bash"}),u.jsxs("p",{children:["前置要求：宿主工程已安装 ",u.jsx("code",{children:"react@>=18.2.0"}),"、",u.jsx("code",{children:"react-native@>=0.79"}),"。"]}),u.jsx("h2",{id:"配置根节点推荐-configprovider","data-anchor":"配置根节点推荐-configprovider",children:"配置根节点（推荐 ConfigProvider）"}),u.jsxs("p",{children:[u.jsx("strong",{children:"优先使用 ConfigProvider"}),"，这样 Button、Toast、Popup、Dialog 等都能直接使用，无需再配挂载点。"]}),u.jsx(e,{code:`import { ConfigProvider } from 'react-native-system-ui'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider>{children}</ConfigProvider>
)`,lang:"tsx"}),u.jsxs("p",{children:["ConfigProvider 内置 ",u.jsx("strong",{children:"ThemeProvider"}),"（主题）与 ",u.jsx("strong",{children:"PortalHost"}),"（弹层挂载点），一次配置即可支持所有基础组件和弹层（Toast / Popup / Dialog / Notify 等）。若根节点只包 ThemeProvider 而没挂 PortalHost，弹层会无法显示。"]}),u.jsx("h3",{id:"也可以单独使用-themeprovider","data-anchor":"也可以单独使用-themeprovider",children:"也可以单独使用 ThemeProvider"}),u.jsx("p",{children:"仅做主题、且确定不用 Toast/Popup/Dialog 等弹层时，可以只用 ThemeProvider："}),u.jsx(e,{code:`import { ThemeProvider } from 'react-native-system-ui'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)`,lang:"tsx"}),u.jsx("p",{children:u.jsx("strong",{children:"ConfigProvider 与 ThemeProvider 差异："})}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"能力"}),u.jsx("th",{children:"ConfigProvider"}),u.jsx("th",{children:"ThemeProvider"})]})}),u.jsxs("tbody",{children:[u.jsxs("tr",{children:[u.jsx("td",{children:"主题（tokens）"}),u.jsx("td",{children:"✅ 内置 ThemeProvider"}),u.jsx("td",{children:"✅"})]}),u.jsxs("tr",{children:[u.jsx("td",{children:"弹层挂载点（PortalHost）"}),u.jsx("td",{children:"✅ 内置"}),u.jsxs("td",{children:["❌ 需再包一层 ",u.jsx("code",{children:"<Portal.Host>"})]})]}),u.jsxs("tr",{children:[u.jsx("td",{children:"语言包（locale）"}),u.jsx("td",{children:"✅"}),u.jsx("td",{children:"❌"})]})]})]}),u.jsxs("p",{children:["若一开始用了 ThemeProvider，后来要接 Toast/Popup/Dialog，要么在根节点再包一层 ",u.jsx("code",{children:"<Portal.Host>"}),"，要么改为使用 ConfigProvider。详见 ",u.jsx("a",{href:"../components/config-provider.md",children:"ConfigProvider"})," 与 ",u.jsx("a",{href:"../components/portal.md",children:"Portal"}),"。"]}),u.jsx("h2",{id:"引入组件","data-anchor":"引入组件",children:"引入组件"}),u.jsx(e,{code:`import { Button } from 'react-native-system-ui'

export const Page = () => (
  <Button text="立即下单" type="warning" block />
)`,lang:"tsx"}),u.jsx("h2",{id:"自定义主题","data-anchor":"自定义主题",children:"自定义主题"}),u.jsxs("p",{children:["使用 ConfigProvider 时，通过 ",u.jsx("code",{children:"theme"})," 传入主题即可；内置预设可直接用："]}),u.jsx(e,{code:`import { ConfigProvider, themePresets } from 'react-native-system-ui'

export const DarkLayout = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider theme={themePresets.dark}>{children}</ConfigProvider>
)`,lang:"tsx"}),u.jsxs("p",{children:["内置 ",u.jsx("code",{children:"light"})," / ",u.jsx("code",{children:"dark"})," / ",u.jsx("code",{children:"aurora"})," 三套预设。需完全自定义时使用 ",u.jsx("code",{children:"createTokens"}),"："]}),u.jsx(e,{code:`import { ConfigProvider, createTokens } from 'react-native-system-ui'

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
)`,lang:"tsx"}),u.jsxs("p",{children:[u.jsx("code",{children:"createTokens"})," 负责 foundations 深合并；组件级覆盖通过 ",u.jsx("code",{children:"theme.components"})," 传入。若使用 ThemeProvider，则把 ",u.jsx("code",{children:"theme"})," 改为 ",u.jsx("code",{children:"value"}),"、用 ",u.jsxs("code",{children:["<ThemeProvider value=","{","...","}",">"]})," 即可。"]}),u.jsx("h2",{id:"开发约定","data-anchor":"开发约定",children:"开发约定"}),u.jsxs("ol",{children:[u.jsxs("li",{children:[u.jsx("strong",{children:"Tokens 先行"}),"：新设计维度（如间距、圆角）在 foundations 中定义，由组件消费。"]}),u.jsxs("li",{children:[u.jsx("strong",{children:"组件内聚"}),"：tokens 推导逻辑放在组件目录内（如 ",u.jsx("code",{children:"useXXXTokens"}),"），不抽到公共层。"]}),u.jsxs("li",{children:[u.jsx("strong",{children:"文档同步"}),"：组件交付时同步更新 ",u.jsx("code",{children:"docs/components/<component>"})," 说明与示例。"]})]})]})})},d=[],i=void 0,t=[{depth:1,text:"快速上手",id:"快速上手"},{depth:2,text:"安装依赖",id:"安装依赖"},{depth:2,text:"配置根节点（推荐 ConfigProvider）",id:"配置根节点推荐-configprovider"},{depth:3,text:"也可以单独使用 ThemeProvider",id:"也可以单独使用-themeprovider"},{depth:2,text:"引入组件",id:"引入组件"},{depth:2,text:"自定义主题",id:"自定义主题"},{depth:2,text:"开发约定",id:"开发约定"}],o="/docs/guide/quick-start.md",s="快速上手",F="1769673767000",E=n=>n.children({MdContent:r,demos:d,frontmatter:i,slugs:t,filePath:o,title:s,updatedTime:F});export{r as MdContent,E as default,d as demos,o as filePath,i as frontmatter,t as slugs,s as title,F as updatedTime};
