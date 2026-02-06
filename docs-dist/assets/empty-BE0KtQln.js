import{j as e}from"./main-CC2DK3OK.js";import{E as t}from"./Empty-C5GtAOg8.js";import{T as n}from"./index-Ccpl5y1z.js";import{B as m}from"./index-BfHwmVBQ.js";import"./Fail-CcM6ImRM.js";import"./IconBase-BNmvoXvm.js";import"./Search-BPqLbHJr.js";import"./Image-B67890TJ.js";import"./createComponentTokensHook-BcXZOvON.js";import"./index-D_JlQYPg.js";import"./extends-CF3RwP-h.js";import"./index-CCOraIhd.js";import"./index-BnjI8SiS.js";import"./index-CN-rk8sC.js";import"./number-BG570ZaL.js";import"./useControllableValue-BBYtc-A6.js";import"./Animated-C-b5K9fC.js";import"./index-CJrLMJTa.js";import"./index-Cakcz3d2.js";import"./useAriaPress-DVn62gIQ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./hairline-Bq3nniT3.js";import"./color-BplLcdBL.js";function a(){return e.jsx(t,{description:"描述信息"})}const c=`import React from 'react'
import { Empty } from 'react-native-system-ui'

export default function EmptyBaseDemo() {
  return <Empty description="描述信息" />
}
`,p={code:c,sources:{_:{tsx:`import React from 'react'
import { Empty } from 'react-native-system-ui'

export default function EmptyBaseDemo() {
  return <Empty description="描述信息" />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Empty } from 'react-native-system-ui'

export default function EmptyBaseDemo() {
  return <Empty description="描述信息" />
}
`}},title:"基础用法",identifier:"empty-base",lang:"tsx",meta:{title:"基础用法"}};function u(){return e.jsxs(n,{defaultActive:"error",children:[e.jsx(n.TabPane,{name:"error",title:"错误",children:e.jsx(t,{image:"error",description:"描述信息"})}),e.jsx(n.TabPane,{name:"network",title:"网络",children:e.jsx(t,{image:"network",description:"描述信息"})}),e.jsx(n.TabPane,{name:"search",title:"搜索",children:e.jsx(t,{image:"search",description:"描述信息"})})]})}const d=`import React from 'react'

import { Empty, Tabs } from 'react-native-system-ui'

export default function EmptyTypeDemo() {
  return (
  <Tabs defaultActive="error">
    <Tabs.TabPane name="error" title="错误">
      <Empty image="error" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="network" title="网络">
      <Empty image="network" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="search" title="搜索">
      <Empty image="search" description="描述信息" />
    </Tabs.TabPane>
  </Tabs>
  )
}
`,l={code:d,sources:{_:{tsx:`import React from 'react'

import { Empty, Tabs } from 'react-native-system-ui'

export default function EmptyTypeDemo() {
  return (
  <Tabs defaultActive="error">
    <Tabs.TabPane name="error" title="错误">
      <Empty image="error" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="network" title="网络">
      <Empty image="network" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="search" title="搜索">
      <Empty image="search" description="描述信息" />
    </Tabs.TabPane>
  </Tabs>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Empty, Tabs } from 'react-native-system-ui'

export default function EmptyTypeDemo() {
  return (
  <Tabs defaultActive="error">
    <Tabs.TabPane name="error" title="错误">
      <Empty image="error" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="network" title="网络">
      <Empty image="network" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="search" title="搜索">
      <Empty image="search" description="描述信息" />
    </Tabs.TabPane>
  </Tabs>
  )
}
`}},title:"图片类型",identifier:"empty-type",lang:"tsx",meta:{title:"图片类型"}};function o(){return e.jsx(t,{image:"https://img.yzcdn.cn/vant/custom-empty-image.png",imageSize:90,description:"描述信息"})}const y=`import React from 'react'

import { Empty } from 'react-native-system-ui'

export default function EmptyCustomDemo() {
  return (
  <Empty
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    imageSize={90}
    description="描述信息"
  />
  )
}
`,x={code:y,sources:{_:{tsx:`import React from 'react'

import { Empty } from 'react-native-system-ui'

export default function EmptyCustomDemo() {
  return (
  <Empty
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    imageSize={90}
    description="描述信息"
  />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Empty } from 'react-native-system-ui'

export default function EmptyCustomDemo() {
  return (
  <Empty
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    imageSize={90}
    description="描述信息"
  />
  )
}
`}},title:"自定义图片",identifier:"empty-custom",lang:"tsx",meta:{title:"自定义图片"}};function s(){return e.jsx(t,{description:"描述信息",children:e.jsx(m,{text:"按钮",type:"primary",round:!0,style:{width:160}})})}const E=`import React from 'react'

import { Button, Empty } from 'react-native-system-ui'

export default function EmptyFooterDemo() {
  return (
  <Empty description="描述信息">
    <Button text="按钮" type="primary" round style={{ width: 160 }} />
  </Empty>
  )
}
`,h={code:E,sources:{_:{tsx:`import React from 'react'

import { Button, Empty } from 'react-native-system-ui'

export default function EmptyFooterDemo() {
  return (
  <Empty description="描述信息">
    <Button text="按钮" type="primary" round style={{ width: 160 }} />
  </Empty>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Empty } from 'react-native-system-ui'

export default function EmptyFooterDemo() {
  return (
  <Empty description="描述信息">
    <Button text="按钮" type="primary" round style={{ width: 160 }} />
  </Empty>
  )
}
`}},title:"底部内容",identifier:"empty-footer",lang:"tsx",meta:{title:"底部内容"}},f=function({previewer:i=()=>null,api:B=()=>null}){const r=i;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"empty-空状态","data-anchor":"empty-空状态",children:"Empty 空状态"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于在数据为空或异常时给出占位提示，默认提供多种语义图标，可自定义插画及底部内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { Empty } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(r,{...p,children:e.jsx(a,{})})}),e.jsx("h3",{id:"图片类型","data-anchor":"图片类型",children:"图片类型"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:'image="default|error|network|search"'})," 切换不同语义。"]}),e.jsx("div",{children:e.jsx(r,{...l,children:e.jsx(u,{})})}),e.jsx("h3",{id:"自定义图片","data-anchor":"自定义图片",children:"自定义图片"}),e.jsxs("p",{children:[e.jsx("code",{children:"image"})," 支持传入任意 ReactNode，例如插画、Icon 等。"]}),e.jsx("div",{children:e.jsx(r,{...x,children:e.jsx(o,{})})}),e.jsx("h3",{id:"底部内容","data-anchor":"底部内容",children:"底部内容"}),e.jsxs("p",{children:[e.jsx("code",{children:"children"})," 可放置按钮等交互区域。"]}),e.jsx("div",{children:e.jsx(r,{...h,children:e.jsx(s,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"image"})}),e.jsx("td",{children:"图片类型，支持传入图片 URL 或自定义节点"}),e.jsx("td",{children:e.jsx("code",{children:"'default' | 'error' | 'network' | 'search' | string | ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"imageSize"})}),e.jsx("td",{children:"图片尺寸（px）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.sizes.image"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"描述文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gap"})}),e.jsx("td",{children:"图像与描述之间的间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.spacing.descriptionMargin"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"imageStyle"})}),e.jsx("td",{children:"图片容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"descriptionStyle"})}),e.jsx("td",{children:"文案样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]})]})]})]})})},j=[{Component:a,key:"empty-base",sources:{_:{tsx:`import React from 'react'
import { Empty } from 'react-native-system-ui'

export default function EmptyBaseDemo() {
  return <Empty description="描述信息" />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Empty } from 'react-native-system-ui'

export default function EmptyBaseDemo() {
  return <Empty description="描述信息" />
}
`}},title:"基础用法",identifier:"empty-base",lang:"tsx",meta:{title:"基础用法"}},{Component:u,key:"empty-type",sources:{_:{tsx:`import React from 'react'

import { Empty, Tabs } from 'react-native-system-ui'

export default function EmptyTypeDemo() {
  return (
  <Tabs defaultActive="error">
    <Tabs.TabPane name="error" title="错误">
      <Empty image="error" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="network" title="网络">
      <Empty image="network" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="search" title="搜索">
      <Empty image="search" description="描述信息" />
    </Tabs.TabPane>
  </Tabs>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Empty, Tabs } from 'react-native-system-ui'

export default function EmptyTypeDemo() {
  return (
  <Tabs defaultActive="error">
    <Tabs.TabPane name="error" title="错误">
      <Empty image="error" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="network" title="网络">
      <Empty image="network" description="描述信息" />
    </Tabs.TabPane>
    <Tabs.TabPane name="search" title="搜索">
      <Empty image="search" description="描述信息" />
    </Tabs.TabPane>
  </Tabs>
  )
}
`}},title:"图片类型",identifier:"empty-type",lang:"tsx",meta:{title:"图片类型"}},{Component:o,key:"empty-custom",sources:{_:{tsx:`import React from 'react'

import { Empty } from 'react-native-system-ui'

export default function EmptyCustomDemo() {
  return (
  <Empty
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    imageSize={90}
    description="描述信息"
  />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Empty } from 'react-native-system-ui'

export default function EmptyCustomDemo() {
  return (
  <Empty
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    imageSize={90}
    description="描述信息"
  />
  )
}
`}},title:"自定义图片",identifier:"empty-custom",lang:"tsx",meta:{title:"自定义图片"}},{Component:s,key:"empty-footer",sources:{_:{tsx:`import React from 'react'

import { Button, Empty } from 'react-native-system-ui'

export default function EmptyFooterDemo() {
  return (
  <Empty description="描述信息">
    <Button text="按钮" type="primary" round style={{ width: 160 }} />
  </Empty>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Empty } from 'react-native-system-ui'

export default function EmptyFooterDemo() {
  return (
  <Empty description="描述信息">
    <Button text="按钮" type="primary" round style={{ width: 160 }} />
  </Empty>
  )
}
`}},title:"底部内容",identifier:"empty-footer",lang:"tsx",meta:{title:"底部内容"}}],T={simulator:{compact:!0}},b=[{depth:1,text:"Empty 空状态",id:"empty-空状态"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"图片类型",id:"图片类型"},{depth:3,text:"自定义图片",id:"自定义图片"},{depth:3,text:"底部内容",id:"底部内容"},{depth:2,text:"API",id:"api"}],v="/docs/components/empty.md",F="Empty 空状态",g="1769570039000",Q=i=>i.children({MdContent:f,demos:j,frontmatter:T,slugs:b,filePath:v,title:F,updatedTime:g});export{f as MdContent,Q as default,j as demos,v as filePath,T as frontmatter,b as slugs,F as title,g as updatedTime};
