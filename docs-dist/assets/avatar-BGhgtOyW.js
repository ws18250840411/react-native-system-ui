import{R as u,i as T,j as e,V as q,s as L}from"./main-BXb8DOxl.js";import{S as Q}from"./UserO-zUnHrx8j.js";import{I as U}from"./Image-BkUMp8ay.js";import{c as W,T as H}from"./createComponentTokensHook-C7GS3cUR.js";import{M as J}from"./index-DkTYenKX.js";import{S as j}from"./Space-Q2CXJN-f.js";import"./IconBase-5wkEN6D1.js";import"./index-BPY4IQIH.js";import"./extends-CF3RwP-h.js";import"./index-CysvSvJu.js";import"./index-9yrhdMQu.js";import"./number-BrRWL1fO.js";import"./useAriaPress-6bm6-278.js";import"./index-CJrLMJTa.js";const V=t=>({defaults:{size:"medium",shape:"circle"},layout:{container:{alignItems:"center",justifyContent:"center",overflow:"hidden"},text:{includeFontPadding:!1,textAlignVertical:"center"},image:{width:"100%",height:"100%"},iconWrapper:{alignItems:"center",justifyContent:"center"}},colors:{background:t.palette.default[100],text:t.palette.default[800],transparent:"transparent"},typography:{fontWeight:"600",fallbackTextScale:.5},sizing:{sizes:{small:24,medium:32,large:40},iconMaxSize:32,loadingSize:12},radii:{squareMin:6,squareDivisor:6}}),x=W("avatar",V),v=u.forwardRef(({children:t,color:c,style:a},d)=>{const s=x();return e.jsx(H,{ref:d,style:L.flatten([s.layout.text,{color:c??s.colors.text,fontWeight:s.typography.fontWeight},a]),numberOfLines:1,children:t})});v.displayName="Avatar.FallbackText";const A=u.forwardRef((t,c)=>{const a=x();return e.jsx(U,{ref:c,...t,containerStyle:[{backgroundColor:a.colors.transparent},t.containerStyle],style:[a.layout.image,t.style],fit:t.fit??"cover",loadingText:t.loadingText??null,loadingSize:t.loadingSize??a.sizing.loadingSize,showError:t.showError??!0})});A.displayName="Avatar.Image";const $=(t,c)=>{const{src:a,source:d,icon:s,text:h,size:y,width:S,height:E,shape:C,fit:B,color:b,backgroundColor:z,style:D,textStyle:M,contentStyle:k,children:P,tokensOverride:w,...N}=t,r=x(w),l=y??r.defaults.size,R=C??r.defaults.shape,p=T(l)?l:r.sizing.sizes[l],n=S??p,o=E??p,O=R==="circle"?Math.min(n,o)/2:Math.max(r.radii.squareMin,Math.min(n,o)/r.radii.squareDivisor),_={backgroundColor:r.colors.transparent},m=s?e.jsx(q,{style:[r.layout.iconWrapper,{width:Math.min(n,r.sizing.iconMaxSize),height:Math.min(o,r.sizing.iconMaxSize)},k],children:s}):h&&e.jsx(v,{color:b,style:[{fontSize:Math.min(n,o)*r.typography.fallbackTextScale},M],children:h.trim().slice(0,2).toUpperCase()}),I=P??(a||d?e.jsx(A,{src:a,source:d,containerStyle:_,style:r.layout.image,fit:B??"cover",loadingText:null,loadingSize:r.sizing.loadingSize,showError:!0,fallback:m}):m);return e.jsx(J,{ref:c,style:[r.layout.container,{width:n,height:o,borderRadius:O,backgroundColor:z??r.colors.background},D],...N,children:I})},f=u.forwardRef($);f.displayName="Avatar";const i=u.memo(f);function g(){return e.jsxs(j,{align:"center",gap:16,children:[e.jsx(i,{src:"https://api.dicebear.com/7.x/miniavs/svg?seed=1"}),e.jsx(i,{src:"https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"}),e.jsx(i,{text:"AB"}),e.jsx(i,{icon:e.jsx(Q,{fill:"#475569",color:"#475569"}),backgroundColor:"#e2e8f0"})]})}const G=`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

function AvatarBasicDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
      <Avatar text="AB" />
      <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
    </Space>
  )
}

export default AvatarBasicDemo
`,K={code:G,sources:{_:{tsx:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

function AvatarBasicDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
      <Avatar text="AB" />
      <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
    </Space>
  )
}

export default AvatarBasicDemo
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

function AvatarBasicDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
      <Avatar text="AB" />
      <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
    </Space>
  )
}

export default AvatarBasicDemo
`}},title:"基础用法",identifier:"avatar-basic",lang:"tsx",meta:{title:"基础用法"}};function F(){return e.jsxs(j,{align:"center",gap:16,children:[e.jsx(i,{text:"S",size:"small"}),e.jsx(i,{text:"M"}),e.jsx(i,{text:"L",size:"large"}),e.jsx(i,{text:"48",size:48})]})}const X=`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'

function AvatarSizeDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar text="S" size="small" />
      <Avatar text="M" />
      <Avatar text="L" size="large" />
      <Avatar text="48" size={48} />
    </Space>
  )
}

export default AvatarSizeDemo
`,Y={code:X,sources:{_:{tsx:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'

function AvatarSizeDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar text="S" size="small" />
      <Avatar text="M" />
      <Avatar text="L" size="large" />
      <Avatar text="48" size={48} />
    </Space>
  )
}

export default AvatarSizeDemo
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'

function AvatarSizeDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar text="S" size="small" />
      <Avatar text="M" />
      <Avatar text="L" size="large" />
      <Avatar text="48" size={48} />
    </Space>
  )
}

export default AvatarSizeDemo
`}},title:"尺寸",identifier:"avatar-size",lang:"tsx",meta:{title:"尺寸"}},Z=function({previewer:t=()=>null,api:c=()=>null}){const a=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"avatar-头像","data-anchor":"avatar-头像",children:"Avatar 头像"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用来展示用户头像或代表性的图标，支持图片、文本和自定义节点。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(a,{code:"import { Avatar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["头像默认是圆形的，支持传入 ",e.jsx("code",{children:"src"}),"、",e.jsx("code",{children:"text"})," 或自定义 ",e.jsx("code",{children:"icon"}),"。"]}),e.jsx("div",{children:e.jsx(a,{...K,children:e.jsx(g,{})})}),e.jsx("h3",{id:"尺寸","data-anchor":"尺寸",children:"尺寸"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"size"})," 设置头像尺寸，内置 ",e.jsx("code",{children:"small"}),"·",e.jsx("code",{children:"medium"}),"·",e.jsx("code",{children:"large"}),"，也支持直接传入数字。"]}),e.jsx("div",{children:e.jsx(a,{...Y,children:e.jsx(F,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"src"})}),e.jsxs("td",{children:["图片地址，字符串会自动转换为 ",e.jsx("code",{children:"Image"})," 的 ",e.jsx("code",{children:"uri"})]}),e.jsx("td",{children:e.jsx("code",{children:"string | ImageSourcePropType"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"自定义图标内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsx("td",{children:"文本，占位时会自动取前两个字符"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsxs("td",{children:["头像大小，支持 ",e.jsx("code",{children:"small"})," ",e.jsx("code",{children:"medium"})," ",e.jsx("code",{children:"large"})," 或数字"]}),e.jsx("td",{children:e.jsx("code",{children:"'small' | 'medium' | 'large' | number"})}),e.jsx("td",{children:e.jsx("code",{children:"'medium'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"width"})}),e.jsxs("td",{children:["自定义宽度，优先级高于 ",e.jsx("code",{children:"size"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"height"})}),e.jsxs("td",{children:["自定义高度，优先级高于 ",e.jsx("code",{children:"size"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"shape"})}),e.jsx("td",{children:"形状"}),e.jsx("td",{children:e.jsx("code",{children:"'circle' | 'square'"})}),e.jsx("td",{children:e.jsx("code",{children:"'circle'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"文本颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"palette.default[800]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"backgroundColor"})}),e.jsx("td",{children:"背景颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"palette.default[100]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsxs("td",{children:["自定义内容容器样式（用于自定义 ",e.jsx("code",{children:"icon"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"外层样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsxs("td",{children:["自定义内容（会覆盖 ",e.jsx("code",{children:"src/icon/text"})," 渲染）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"Avatar"})," 继承 ",e.jsx("code",{children:"Pressable"}),"，可以直接传入 ",e.jsx("code",{children:"onPress"}),"、",e.jsx("code",{children:"onLongPress"})," 等事件。"]})})]})})},ee=[{Component:g,key:"avatar-basic",sources:{_:{tsx:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

function AvatarBasicDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
      <Avatar text="AB" />
      <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
    </Space>
  )
}

export default AvatarBasicDemo
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'
import { UserO } from 'react-native-system-icon'

function AvatarBasicDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" />
      <Avatar text="AB" />
      <Avatar icon={<UserO fill="#475569" color="#475569" />} backgroundColor="#e2e8f0" />
    </Space>
  )
}

export default AvatarBasicDemo
`}},title:"基础用法",identifier:"avatar-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:F,key:"avatar-size",sources:{_:{tsx:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'

function AvatarSizeDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar text="S" size="small" />
      <Avatar text="M" />
      <Avatar text="L" size="large" />
      <Avatar text="48" size={48} />
    </Space>
  )
}

export default AvatarSizeDemo
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Avatar, Space } from 'react-native-system-ui'

function AvatarSizeDemo() {
  return (
    <Space align="center" gap={16}>
      <Avatar text="S" size="small" />
      <Avatar text="M" />
      <Avatar text="L" size="large" />
      <Avatar text="48" size={48} />
    </Space>
  )
}

export default AvatarSizeDemo
`}},title:"尺寸",identifier:"avatar-size",lang:"tsx",meta:{title:"尺寸"}}],te={simulator:{compact:!1}},re=[{depth:1,text:"Avatar 头像",id:"avatar-头像"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"尺寸",id:"尺寸"},{depth:2,text:"API",id:"api"}],ae="/docs/components/avatar.md",ie="Avatar 头像",ce="1770197128000",ge=t=>t.children({MdContent:Z,demos:ee,frontmatter:te,slugs:re,filePath:ae,title:ie,updatedTime:ce});export{Z as MdContent,ge as default,ee as demos,ae as filePath,te as frontmatter,re as slugs,ie as title,ce as updatedTime};
