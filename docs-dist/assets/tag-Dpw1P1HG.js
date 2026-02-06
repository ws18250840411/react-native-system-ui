import{j as e,R as p}from"./main-BaO0UwhN.js";import{T as a}from"./Tag-Qx9yEnxV.js";import{S as i}from"./Space-DQzTpaN5.js";import"./Close-CwI1Rg5N.js";import"./IconBase-elbJGmhV.js";import"./createComponentTokensHook-CsVvHGcO.js";import"./hairline-BK-uo_cS.js";import"./index-DvDeiqEs.js";import"./extends-CF3RwP-h.js";import"./number-C0AOJ3fJ.js";import"./useAriaPress-vCycRA2r.js";import"./index-CJrLMJTa.js";const c=()=>e.jsxs(i,{gap:12,wrap:!0,children:[e.jsx(a,{type:"primary",children:"主要"}),e.jsx(a,{type:"success",children:"成功"}),e.jsx(a,{type:"warning",children:"警告"}),e.jsx(a,{type:"danger",children:"危险"}),e.jsx(a,{children:"默认"})]}),l=`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="danger">危险</Tag>
    <Tag>默认</Tag>
  </Space>
)
`,o={code:l,sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="danger">危险</Tag>
    <Tag>默认</Tag>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="danger">危险</Tag>
    <Tag>默认</Tag>
  </Space>
)
`}},title:"基础用法",identifier:"tag-basic",lang:"tsx",meta:{title:"基础用法"}},s=()=>{const[t,n]=p.useState(!0);return e.jsxs(i,{gap:12,direction:"vertical",children:[e.jsxs(i,{gap:12,wrap:!0,children:[e.jsx(a,{plain:!0,type:"primary",children:"空心样式"}),e.jsx(a,{round:!0,type:"primary",children:"圆角样式"}),e.jsx(a,{mark:!0,type:"primary",children:"标记样式"})]}),t?e.jsx(a,{closeable:!0,plain:!0,type:"primary",onClose:()=>n(!1),children:"可关闭"}):null]})},g=`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <Space gap={12} direction="vertical">
      <Space gap={12} wrap>
        <Tag plain type="primary">
          空心样式
        </Tag>
        <Tag round type="primary">
          圆角样式
        </Tag>
        <Tag mark type="primary">
          标记样式
        </Tag>
      </Space>
      {visible ? (
        <Tag closeable plain type="primary" onClose={() => setVisible(false)}>
          可关闭
        </Tag>
      ) : null}
    </Space>
  )
}
`,x={code:g,sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <Space gap={12} direction="vertical">
      <Space gap={12} wrap>
        <Tag plain type="primary">
          空心样式
        </Tag>
        <Tag round type="primary">
          圆角样式
        </Tag>
        <Tag mark type="primary">
          标记样式
        </Tag>
      </Space>
      {visible ? (
        <Tag closeable plain type="primary" onClose={() => setVisible(false)}>
          可关闭
        </Tag>
      ) : null}
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <Space gap={12} direction="vertical">
      <Space gap={12} wrap>
        <Tag plain type="primary">
          空心样式
        </Tag>
        <Tag round type="primary">
          圆角样式
        </Tag>
        <Tag mark type="primary">
          标记样式
        </Tag>
      </Space>
      {visible ? (
        <Tag closeable plain type="primary" onClose={() => setVisible(false)}>
          可关闭
        </Tag>
      ) : null}
    </Space>
  )
}
`}},title:"样式风格",identifier:"tag-style",lang:"tsx",meta:{title:"样式风格"}},u=()=>e.jsxs(i,{gap:12,wrap:!0,children:[e.jsx(a,{size:"mini",type:"primary",children:"迷你"}),e.jsx(a,{type:"primary",children:"小型"}),e.jsx(a,{size:"medium",type:"primary",children:"中等"}),e.jsx(a,{size:"large",type:"primary",children:"大型"})]}),m=`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      迷你
    </Tag>
    <Tag type="primary">小型</Tag>
    <Tag size="medium" type="primary">
      中等
    </Tag>
    <Tag size="large" type="primary">
      大型
    </Tag>
  </Space>
)
`,h={code:m,sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      迷你
    </Tag>
    <Tag type="primary">小型</Tag>
    <Tag size="medium" type="primary">
      中等
    </Tag>
    <Tag size="large" type="primary">
      大型
    </Tag>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      迷你
    </Tag>
    <Tag type="primary">小型</Tag>
    <Tag size="medium" type="primary">
      中等
    </Tag>
    <Tag size="large" type="primary">
      大型
    </Tag>
  </Space>
)
`}},title:"标签尺寸",identifier:"tag-size",lang:"tsx",meta:{title:"标签尺寸"}},d=()=>e.jsxs(i,{gap:12,wrap:!0,children:[e.jsx(a,{color:"#7c3aed",children:"定制背景"}),e.jsx(a,{color:"#ffe1e1",textColor:"#ad0000",children:"定制文字"}),e.jsx(a,{color:"#7c3aed",plain:!0,children:"空心配色"})]}),y=`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag color="#7c3aed">定制背景</Tag>
    <Tag color="#ffe1e1" textColor="#ad0000">
      定制文字
    </Tag>
    <Tag color="#7c3aed" plain>
      空心配色
    </Tag>
  </Space>
)
`,T={code:y,sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag color="#7c3aed">定制背景</Tag>
    <Tag color="#ffe1e1" textColor="#ad0000">
      定制文字
    </Tag>
    <Tag color="#7c3aed" plain>
      空心配色
    </Tag>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag color="#7c3aed">定制背景</Tag>
    <Tag color="#ffe1e1" textColor="#ad0000">
      定制文字
    </Tag>
    <Tag color="#7c3aed" plain>
      空心配色
    </Tag>
  </Space>
)
`}},title:"自定义颜色",identifier:"tag-color",lang:"tsx",meta:{title:"自定义颜色"}},j=function({previewer:t=()=>null,api:n=()=>null}){const r=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"tag-标签","data-anchor":"tag-标签",children:"Tag 标签"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于标记和分类的小标签，支持多种语义、尺寸与配色。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { Tag } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"type"})," 指定标签的语义色。"]}),e.jsx("div",{children:e.jsx(r,{...o,children:e.jsx(c,{})})}),e.jsx("h3",{id:"样式风格","data-anchor":"样式风格",children:"样式风格"}),e.jsx("p",{children:"支持空心、圆角、标记以及可关闭标签。"}),e.jsx("div",{children:e.jsx(r,{...x,children:e.jsx(s,{})})}),e.jsx("h3",{id:"标签尺寸","data-anchor":"标签尺寸",children:"标签尺寸"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"size"})," 控制标签高度与内边距，支持 ",e.jsx("code",{children:"mini"}),"、",e.jsx("code",{children:"small"}),"、",e.jsx("code",{children:"medium"}),"、",e.jsx("code",{children:"large"}),"。"]}),e.jsx("div",{children:e.jsx(r,{...h,children:e.jsx(u,{})})}),e.jsx("h3",{id:"自定义颜色","data-anchor":"自定义颜色",children:"自定义颜色"}),e.jsxs("p",{children:["可以通过 ",e.jsx("code",{children:"color"}),"、",e.jsx("code",{children:"textColor"})," 等属性定制标签配色。"]}),e.jsx("div",{children:e.jsx(r,{...T,children:e.jsx(d,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"tag-props","data-anchor":"tag-props",children:"Tag Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"标签类型"}),e.jsx("td",{children:e.jsx("code",{children:"'default' | 'primary' | 'success' | 'warning' | 'danger'"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"标签尺寸"}),e.jsx("td",{children:e.jsx("code",{children:"'mini' | 'small' | 'medium' | 'large'"})}),e.jsx("td",{children:e.jsx("code",{children:"'small'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"plain"})}),e.jsx("td",{children:"是否为空心样式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否为圆角样式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mark"})}),e.jsx("td",{children:"是否为标记样式（左侧为直角）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"自定义背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textColor"})}),e.jsxs("td",{children:["自定义文字颜色，优先级高于 ",e.jsx("code",{children:"color"})]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"show"})}),e.jsx("td",{children:"是否展示标签"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsxs("td",{children:["自定义关闭图标，支持函数 ",e.jsx("code",{children:"(color, size) => ReactNode"})]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (color: string, size: number) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭图标时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["React Native 不支持 DOM 中的 ",e.jsx("code",{children:"tag"})," / ",e.jsx("code",{children:"className"}),"，如需自定义样式请直接通过 ",e.jsx("code",{children:"style"}),"、",e.jsx("code",{children:"textStyle"})," 或主题 tokens 操作。"]})})]})})},f=[{Component:c,key:"tag-basic",sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="danger">危险</Tag>
    <Tag>默认</Tag>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="danger">危险</Tag>
    <Tag>默认</Tag>
  </Space>
)
`}},title:"基础用法",identifier:"tag-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:s,key:"tag-style",sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <Space gap={12} direction="vertical">
      <Space gap={12} wrap>
        <Tag plain type="primary">
          空心样式
        </Tag>
        <Tag round type="primary">
          圆角样式
        </Tag>
        <Tag mark type="primary">
          标记样式
        </Tag>
      </Space>
      {visible ? (
        <Tag closeable plain type="primary" onClose={() => setVisible(false)}>
          可关闭
        </Tag>
      ) : null}
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <Space gap={12} direction="vertical">
      <Space gap={12} wrap>
        <Tag plain type="primary">
          空心样式
        </Tag>
        <Tag round type="primary">
          圆角样式
        </Tag>
        <Tag mark type="primary">
          标记样式
        </Tag>
      </Space>
      {visible ? (
        <Tag closeable plain type="primary" onClose={() => setVisible(false)}>
          可关闭
        </Tag>
      ) : null}
    </Space>
  )
}
`}},title:"样式风格",identifier:"tag-style",lang:"tsx",meta:{title:"样式风格"}},{Component:u,key:"tag-size",sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      迷你
    </Tag>
    <Tag type="primary">小型</Tag>
    <Tag size="medium" type="primary">
      中等
    </Tag>
    <Tag size="large" type="primary">
      大型
    </Tag>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag size="mini" type="primary">
      迷你
    </Tag>
    <Tag type="primary">小型</Tag>
    <Tag size="medium" type="primary">
      中等
    </Tag>
    <Tag size="large" type="primary">
      大型
    </Tag>
  </Space>
)
`}},title:"标签尺寸",identifier:"tag-size",lang:"tsx",meta:{title:"标签尺寸"}},{Component:d,key:"tag-color",sources:{_:{tsx:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag color="#7c3aed">定制背景</Tag>
    <Tag color="#ffe1e1" textColor="#ad0000">
      定制文字
    </Tag>
    <Tag color="#7c3aed" plain>
      空心配色
    </Tag>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Tag } from 'react-native-system-ui'

export default () => (
  <Space gap={12} wrap>
    <Tag color="#7c3aed">定制背景</Tag>
    <Tag color="#ffe1e1" textColor="#ad0000">
      定制文字
    </Tag>
    <Tag color="#7c3aed" plain>
      空心配色
    </Tag>
  </Space>
)
`}},title:"自定义颜色",identifier:"tag-color",lang:"tsx",meta:{title:"自定义颜色"}}],E={simulator:{compact:!1}},F=[{depth:1,text:"Tag 标签",id:"tag-标签"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"样式风格",id:"样式风格"},{depth:3,text:"标签尺寸",id:"标签尺寸"},{depth:3,text:"自定义颜色",id:"自定义颜色"},{depth:2,text:"API",id:"api"},{depth:3,text:"Tag Props",id:"tag-props"}],v="/docs/components/tag.md",S="Tag 标签",C="1769570039000",V=t=>t.children({MdContent:j,demos:f,frontmatter:E,slugs:F,filePath:v,title:S,updatedTime:C});export{j as MdContent,V as default,f as demos,v as filePath,E as frontmatter,F as slugs,S as title,C as updatedTime};
