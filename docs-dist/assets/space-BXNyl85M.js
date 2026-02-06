import{j as e,V as f,s as l}from"./main-BXb8DOxl.js";import{S as r}from"./Space-Q2CXJN-f.js";import{B as n}from"./index-B_Jsx0Km.js";import{T as i}from"./createComponentTokensHook-C7GS3cUR.js";import"./index-DkTYenKX.js";import"./extends-CF3RwP-h.js";import"./number-BrRWL1fO.js";import"./useAriaPress-6bm6-278.js";import"./index-CJrLMJTa.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-DX_kf2WP.js";import"./index-9yrhdMQu.js";const s=()=>e.jsxs(r,{align:"center",children:["文字",e.jsx(n,{text:"按钮",type:"primary"}),e.jsx(n,{text:"按钮"})]}),j=`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space align="center">
    文字
    <Button text="按钮" type="primary" />
    <Button text="按钮" />
  </Space>
)
`,B={code:j,sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space align="center">
    文字
    <Button text="按钮" type="primary" />
    <Button text="按钮" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space align="center">
    文字
    <Button text="按钮" type="primary" />
    <Button text="按钮" />
  </Space>
)
`}},title:"基础用法",identifier:"space-base",lang:"tsx",meta:{title:"基础用法"}},d=({text:t,color:o})=>e.jsx(i,{style:{color:o??"#2563eb"},children:t}),p=()=>e.jsxs(r,{align:"center",divider:e.jsx(i,{style:{color:"#cbd5f5"},children:"|"}),children:[e.jsx(d,{text:"信息"}),e.jsx(d,{text:"编辑"}),e.jsx(d,{text:"删除",color:"#dc2626"})]}),v=`import React from 'react'
import { Text } from 'react-native'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <Text style={{ color: color ?? '#2563eb' }}>{text}</Text>
)

export default () => (
  <Space align="center" divider={<Text style={{ color: '#cbd5f5' }}>|</Text>}>
    <Link text="信息" />
    <Link text="编辑" />
    <Link text="删除" color="#dc2626" />
  </Space>
)
`,S={code:v,sources:{_:{tsx:`import React from 'react'
import { Text } from 'react-native'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <Text style={{ color: color ?? '#2563eb' }}>{text}</Text>
)

export default () => (
  <Space align="center" divider={<Text style={{ color: '#cbd5f5' }}>|</Text>}>
    <Link text="信息" />
    <Link text="编辑" />
    <Link text="删除" color="#dc2626" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Text } from 'react-native'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <Text style={{ color: color ?? '#2563eb' }}>{text}</Text>
)

export default () => (
  <Space align="center" divider={<Text style={{ color: '#cbd5f5' }}>|</Text>}>
    <Link text="信息" />
    <Link text="编辑" />
    <Link text="删除" color="#dc2626" />
  </Space>
)
`}},title:"分隔符",identifier:"space-divider",lang:"tsx",meta:{title:"分隔符"}},x=()=>e.jsxs(r,{direction:"vertical",children:[e.jsx(n,{text:"按钮"}),e.jsx(n,{text:"按钮"})]}),C=`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical">
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`,E={code:C,sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical">
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical">
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},title:"垂直间距",identifier:"space-vertical",lang:"tsx",meta:{title:"垂直间距"}},h=()=>e.jsxs(r,{gap:20,children:[e.jsx(n,{text:"按钮"}),e.jsx(n,{text:"按钮"})]}),g=`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space gap={20}>
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`,T={code:g,sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space gap={20}>
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space gap={20}>
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},title:"间距大小",identifier:"space-gap",lang:"tsx",meta:{title:"间距大小"}},u=({children:t})=>e.jsx(f,{style:a.card,children:typeof t=="string"||typeof t=="number"?e.jsx(i,{style:a.cardText,children:t}):t}),m=()=>e.jsxs(r,{direction:"vertical",gap:16,children:[e.jsxs(r,{justify:"center",block:!0,children:[e.jsx(u,{children:"1"}),e.jsx(u,{children:e.jsxs(i,{style:a.cardText,children:["2",`
`,"2"]})}),e.jsx(u,{children:e.jsxs(i,{style:a.cardText,children:["3",`
`,"3",`
`,"3"]})})]}),e.jsxs(r,{align:"end",children:[e.jsx(u,{children:"1"}),e.jsx(u,{children:e.jsxs(i,{style:a.cardText,children:["2",`
`,"2"]})}),e.jsx(u,{children:e.jsxs(i,{style:a.cardText,children:["3",`
`,"3",`
`,"3"]})})]})]}),a=l.create({card:{padding:12,borderWidth:l.hairlineWidth,borderColor:"#e5e7eb",borderRadius:6,backgroundColor:"#ffffff"},cardText:{color:"#111827",lineHeight:18}}),b=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.cardText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default () => (
  <Space direction="vertical" gap={16}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
  </Space>
)

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    color: '#111827',
    lineHeight: 18,
  },
})
`,D={code:b,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.cardText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default () => (
  <Space direction="vertical" gap={16}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
  </Space>
)

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    color: '#111827',
    lineHeight: 18,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.cardText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default () => (
  <Space direction="vertical" gap={16}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
  </Space>
)

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    color: '#111827',
    lineHeight: 18,
  },
})
`}},title:"对齐方式",identifier:"space-align",lang:"tsx",meta:{title:"对齐方式"}},y=()=>e.jsx(r,{wrap:!0,gap:[8,20],children:new Array(6).fill(null).map((t,o)=>e.jsx(n,{text:"按钮"},o))}),A=`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="按钮" key={index} />
    ))}
  </Space>
)
`,k={code:A,sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="按钮" key={index} />
    ))}
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="按钮" key={index} />
    ))}
  </Space>
)
`}},title:"自动换行",identifier:"space-wrap",lang:"tsx",meta:{title:"自动换行"}},F=()=>e.jsxs(r,{direction:"vertical",fill:!0,gap:[6,12],children:[e.jsxs(r,{fill:!0,children:[e.jsx(n,{type:"primary",block:!0,children:"查看详情"}),e.jsx(n,{type:"success",block:!0,children:"提交"})]}),e.jsxs(r,{direction:"vertical",fill:!0,gap:[6,8],children:[e.jsx(n,{color:"#ef4444",plain:!0,block:!0,children:"红色按钮"}),e.jsx(n,{color:"#8b5cf6",plain:!0,block:!0,children:"紫色按钮"})]})]}),R=`import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[6, 12]}>
    <Space fill>
      <Button type="primary" block>
        查看详情
      </Button>
      <Button type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[6, 8]}>
      <Button color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
`,_={code:R,sources:{_:{tsx:`import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[6, 12]}>
    <Space fill>
      <Button type="primary" block>
        查看详情
      </Button>
      <Button type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[6, 8]}>
      <Button color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[6, 12]}>
    <Space fill>
      <Button type="primary" block>
        查看详情
      </Button>
      <Button type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[6, 8]}>
      <Button color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
`}},title:"填充模式",identifier:"space-fill",lang:"tsx",meta:{title:"填充模式"}},P=function({previewer:t=()=>null,api:o=()=>null}){const c=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"space-间距","data-anchor":"space-间距",children:"Space 间距"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"设置组件之间的间距，避免元素紧贴在一起。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(c,{code:"import { Space } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"相邻组件水平间距。"}),e.jsx("div",{children:e.jsx(c,{...B,children:e.jsx(s,{})})}),e.jsx("h3",{id:"分隔符","data-anchor":"分隔符",children:"分隔符"}),e.jsx("p",{children:"为相邻组件设置分隔符。"}),e.jsx("div",{children:e.jsx(c,{...S,children:e.jsx(p,{})})}),e.jsx("h3",{id:"垂直间距","data-anchor":"垂直间距",children:"垂直间距"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:'direction="vertical"'})," 后改为垂直排列，可配合 ",e.jsx("code",{children:"block"})," 独占一行。"]}),e.jsx("div",{children:e.jsx(c,{...E,children:e.jsx(x,{})})}),e.jsx("h3",{id:"间距大小","data-anchor":"间距大小",children:"间距大小"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"size"})," 或 ",e.jsx("code",{children:"gap"})," 自定义间距大小，",e.jsx("code",{children:"size"})," 支持 ",e.jsx("code",{children:"mini"})," ",e.jsx("code",{children:"small"})," ",e.jsx("code",{children:"normal"})," ",e.jsx("code",{children:"large"})," 这几种预设；数组形式为 ",e.jsx("code",{children:"[vertical, horizontal]"}),"（同 CSS ",e.jsx("code",{children:"gap"})," 语义）。"]}),e.jsx("div",{children:e.jsx(c,{...T,children:e.jsx(h,{})})}),e.jsx("h3",{id:"对齐方式","data-anchor":"对齐方式",children:"对齐方式"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"justify"})," 控制主轴对齐，通过 ",e.jsx("code",{children:"align"})," 控制交叉轴对齐。"]}),e.jsx("div",{children:e.jsx(c,{...D,children:e.jsx(m,{})})}),e.jsx("h3",{id:"自动换行","data-anchor":"自动换行",children:"自动换行"}),e.jsxs("p",{children:["在水平方向下设置 ",e.jsx("code",{children:"wrap"})," 可自动换行。"]}),e.jsx("div",{children:e.jsx(c,{...k,children:e.jsx(y,{})})}),e.jsx("h3",{id:"填充模式","data-anchor":"填充模式",children:"填充模式"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"fill"})," 可以让子元素沿主轴平分可用空间，配合 ",e.jsx("code",{children:'direction="vertical"'})," 可让子元素独占整行。"]}),e.jsx("div",{children:e.jsx(c,{..._,children:e.jsx(F,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsxs("td",{children:["间距大小，支持预设，也接受数字或像素字符串；数组形式为 ",e.jsx("code",{children:"[vertical, horizontal]"})]}),e.jsx("td",{children:e.jsx("code",{children:"'mini' | 'small' | 'normal' | 'large' | number | string | [number | string, number | string]"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gap"})}),e.jsxs("td",{children:["自定义间距，语义同 ",e.jsx("code",{children:"size"}),"，优先级更高；数组形式为 ",e.jsx("code",{children:"[vertical, horizontal]"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | string | [number | string, number | string]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"justify"})}),e.jsx("td",{children:"主轴对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"交叉轴对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'end' | 'center' | 'baseline' | 'stretch'"})}),e.jsxs("td",{children:[e.jsx("code",{children:"'center'"}),"（",e.jsx("code",{children:'direction="vertical"'})," 时默认为 ",e.jsx("code",{children:"stretch"}),"）"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsx("td",{children:"间距方向"}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal' | 'vertical'"})}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"wrap"})}),e.jsx("td",{children:"是否自动换行，仅在水平方向生效"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"block"})}),e.jsxs("td",{children:["是否渲染为块级元素（",e.jsx("code",{children:'direction="vertical"'})," 未显式设置时会自动占满一行）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fill"})}),e.jsx("td",{children:"子元素是否占满主轴空间"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"divider"})}),e.jsx("td",{children:"分隔符"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击时触发"}),e.jsx("td",{children:e.jsx("code",{children:"ViewProps['onTouchEnd']"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["在 React Native 环境中，分隔符会作为额外的子元素插入，建议传入纯视觉节点（如 ",e.jsx("code",{children:"View"})," 或 ",e.jsx("code",{children:"Text"}),"）。 由于 React Native 暂不支持 ",e.jsx("code",{children:"justifyContent: 'stretch'"}),"，当 ",e.jsx("code",{children:'justify="stretch"'})," 时组件会自动启用与 ",e.jsx("code",{children:"fill"})," 相同的逻辑（仅水平方向生效），以便子元素沿主轴等分可用空间。"]})}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["React Vant 仅提供 ",e.jsx("code",{children:"gap"}),"，本库额外提供 ",e.jsx("code",{children:"size"}),"（预设间距）与 ",e.jsx("code",{children:"fill"}),"（主轴填充）以便更贴近 React Native 端的常用写法。"]}),e.jsxs("li",{children:["React Vant 未传 ",e.jsx("code",{children:"align"})," 时在 CSS 中等同 ",e.jsx("code",{children:"alignItems: stretch"}),"；本库在 ",e.jsx("code",{children:'direction="horizontal"'})," 时默认 ",e.jsx("code",{children:'align="center"'}),"，如需保持一致可显式传 ",e.jsx("code",{children:'align="stretch"'}),"。"]}),e.jsxs("li",{children:["本库在 ",e.jsx("code",{children:'direction="vertical"'})," 且未显式传 ",e.jsx("code",{children:"block"})," 时会默认占满宽度（便于列表/表单场景）；如需与 React Vant 的“非 block”一致，可传 ",e.jsxs("code",{children:["block=","{","false","}"]}),"。"]})]})]})})},M=[{Component:s,key:"space-base",sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space align="center">
    文字
    <Button text="按钮" type="primary" />
    <Button text="按钮" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space align="center">
    文字
    <Button text="按钮" type="primary" />
    <Button text="按钮" />
  </Space>
)
`}},title:"基础用法",identifier:"space-base",lang:"tsx",meta:{title:"基础用法"}},{Component:p,key:"space-divider",sources:{_:{tsx:`import React from 'react'
import { Text } from 'react-native'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <Text style={{ color: color ?? '#2563eb' }}>{text}</Text>
)

export default () => (
  <Space align="center" divider={<Text style={{ color: '#cbd5f5' }}>|</Text>}>
    <Link text="信息" />
    <Link text="编辑" />
    <Link text="删除" color="#dc2626" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Text } from 'react-native'

import { Space } from 'react-native-system-ui'

const Link = ({ text, color }: { text: string; color?: string }) => (
  <Text style={{ color: color ?? '#2563eb' }}>{text}</Text>
)

export default () => (
  <Space align="center" divider={<Text style={{ color: '#cbd5f5' }}>|</Text>}>
    <Link text="信息" />
    <Link text="编辑" />
    <Link text="删除" color="#dc2626" />
  </Space>
)
`}},title:"分隔符",identifier:"space-divider",lang:"tsx",meta:{title:"分隔符"}},{Component:x,key:"space-vertical",sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical">
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical">
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},title:"垂直间距",identifier:"space-vertical",lang:"tsx",meta:{title:"垂直间距"}},{Component:h,key:"space-gap",sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space gap={20}>
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space gap={20}>
    <Button text="按钮" />
    <Button text="按钮" />
  </Space>
)
`}},title:"间距大小",identifier:"space-gap",lang:"tsx",meta:{title:"间距大小"}},{Component:m,key:"space-align",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.cardText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default () => (
  <Space direction="vertical" gap={16}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
  </Space>
)

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    color: '#111827',
    lineHeight: 18,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Space } from 'react-native-system-ui'

const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.cardText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default () => (
  <Space direction="vertical" gap={16}>
    <Space justify="center" block>
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
    <Space align="end">
      <Card>1</Card>
      <Card>
        <Text style={styles.cardText}>
          2{'\\n'}2
        </Text>
      </Card>
      <Card>
        <Text style={styles.cardText}>
          3{'\\n'}3{'\\n'}3
        </Text>
      </Card>
    </Space>
  </Space>
)

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    color: '#111827',
    lineHeight: 18,
  },
})
`}},title:"对齐方式",identifier:"space-align",lang:"tsx",meta:{title:"对齐方式"}},{Component:y,key:"space-wrap",sources:{_:{tsx:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="按钮" key={index} />
    ))}
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Button } from 'react-native-system-ui'

export default () => (
  <Space wrap gap={[8, 20]}>
    {new Array(6).fill(null).map((_, index) => (
      <Button text="按钮" key={index} />
    ))}
  </Space>
)
`}},title:"自动换行",identifier:"space-wrap",lang:"tsx",meta:{title:"自动换行"}},{Component:F,key:"space-fill",sources:{_:{tsx:`import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[6, 12]}>
    <Space fill>
      <Button type="primary" block>
        查看详情
      </Button>
      <Button type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[6, 8]}>
      <Button color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" fill gap={[6, 12]}>
    <Space fill>
      <Button type="primary" block>
        查看详情
      </Button>
      <Button type="success" block>
        提交
      </Button>
    </Space>
    <Space direction="vertical" fill gap={[6, 8]}>
      <Button color="#ef4444" plain block>
        红色按钮
      </Button>
      <Button color="#8b5cf6" plain block>
        紫色按钮
      </Button>
    </Space>
  </Space>
)
`}},title:"填充模式",identifier:"space-fill",lang:"tsx",meta:{title:"填充模式"}}],N={simulator:{compact:!1}},w=[{depth:1,text:"Space 间距",id:"space-间距"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"分隔符",id:"分隔符"},{depth:3,text:"垂直间距",id:"垂直间距"},{depth:3,text:"间距大小",id:"间距大小"},{depth:3,text:"对齐方式",id:"对齐方式"},{depth:3,text:"自动换行",id:"自动换行"},{depth:3,text:"填充模式",id:"填充模式"},{depth:2,text:"API",id:"api"},{depth:2,text:"差异说明",id:"差异说明"}],L="/docs/components/space.md",V="Space 间距",I="1769570039000",Y=t=>t.children({MdContent:P,demos:M,frontmatter:N,slugs:w,filePath:L,title:V,updatedTime:I});export{P as MdContent,Y as default,M as demos,L as filePath,N as frontmatter,w as slugs,V as title,I as updatedTime};
