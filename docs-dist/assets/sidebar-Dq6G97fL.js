import{R as b,r as v,s as $,j as e,V as u,a as D,c as R}from"./main-CC2DK3OK.js";import{c as W,T as P}from"./createComponentTokensHook-BcXZOvON.js";import{u as L}from"./useControllableValue-BBYtc-A6.js";import{m as O}from"./mergeTokensOverride-DRt3mVLr.js";import{B as q}from"./Badge-BGCikqzS.js";import{M as G}from"./index-CN-rk8sC.js";import{u as J}from"./useAriaPress-DVn62gIQ.js";import{T as k}from"./index-CYc3exVx.js";import"./number-BG570ZaL.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";import"./Portal-D9I31KH1.js";import"./Loading-_9EKEhr2.js";import"./index-BnjI8SiS.js";import"./Checked-BJm2Hkef.js";import"./IconBase-BNmvoXvm.js";import"./Close-BKbx2ovl.js";import"./index-BP7Blb5n.js";import"./index-CCOraIhd.js";import"./Animated-C-b5K9fC.js";import"./index-Cakcz3d2.js";import"./index-D_JlQYPg.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./useOverlayStack-xa377Hoz.js";import"./animation-BpxpeSKC.js";const V=b.createContext(null),K=()=>v.useContext(V),Q=a=>{const{palette:r,fontSize:i,typography:p}=a,c=$.hairlineWidth;return{defaults:{disabled:!1},layout:{container:{flexDirection:"row"},side:{borderRightWidth:c},content:{flex:1,minWidth:0},item:{flexDirection:"row",alignItems:"center",paddingHorizontal:16},indicatorWrapper:{width:12,alignItems:"center"},itemContent:{flex:1,paddingVertical:12},indicator:{height:20},titleRow:{flexDirection:"row",alignItems:"center",gap:8},badge:{marginLeft:4},dot:{width:6,height:6,borderRadius:3},title:{includeFontPadding:!1}},colors:{background:"#ffffff",border:r.default[200],title:r.default[800],titleActive:r.primary[600],disabled:r.default[400],indicator:r.primary[600]},typography:{fontSize:i.sm,fontWeight:p.weight.medium},sizing:{width:120,itemHeight:48,indicatorWidth:4},borders:{width:c}}},_=W("sidebar",Q),U=a=>{const{children:r,sideStyle:i,style:p,tokensOverride:c,...I}=a,m=_(c),s=v.useMemo(()=>{const d=[],o=b.Children.toArray(r);for(let h=0;h<o.length;h++){const C=o[h];b.isValidElement(C)&&d.push({element:C,index:h})}return d},[r]),y=s[0]?.index??0,[S,x]=L(a,{defaultValue:y,valuePropName:"value",defaultValuePropName:"defaultValue",trigger:"onChange"}),g=v.useMemo(()=>{let d=y;for(let o=0;o<s.length;o++)if(s[o].index===S){d=S;break}return d},[S,y,s]),F=v.useMemo(()=>({activeIndex:g,onSelect:x}),[g,x]),A=v.useMemo(()=>s.map(d=>{const o=d.element.key??d.index,h=O(c,d.element.props.tokensOverride);return b.cloneElement(d.element,{key:o,index:d.index,tokensOverride:h})}),[s,c]),t=s.find(d=>d.index===g)?.element,f=t?.props?.contentStyle,l=t?.props?.children,j=l==null||l===!1?null:D(l)?e.jsx(P,{children:l}):l,B=[m.layout.container,{backgroundColor:m.colors.background},p],E=[m.layout.side,{width:m.sizing.width,borderRightColor:m.colors.border},i];return e.jsxs(u,{...I,style:B,children:[e.jsx(u,{style:E,accessibilityRole:"tablist",children:e.jsx(V.Provider,{value:F,children:A})}),e.jsx(u,{style:[m.layout.content,f],children:j})]})},T=b.memo(U);T.displayName="Sidebar";const X=a=>{const{title:r,badge:i,disabled:p,dot:c,onClick:I,textStyle:m,badgeStyle:s,contentStyle:y,style:S,index:x=0,children:g,tokensOverride:F,...A}=a,t=_(F),f=K();if(!f)return null;const l=p??t.defaults.disabled,j=f.activeIndex===x,B=l?t.colors.disabled:j?t.colors.titleActive:t.colors.title,E=J({disabled:l,onPress:()=>{I?.(x),f.onSelect(x)},extraProps:{accessibilityRole:"tab",accessibilityState:{selected:j,disabled:l},testID:`rv-sidebar-item-${x}`}}),d=[t.layout.indicator,{width:t.sizing.indicatorWidth,borderRadius:t.sizing.indicatorWidth,backgroundColor:t.colors.indicator}],o=R(r)?D(r)?e.jsx(P,{style:[t.layout.title,{color:B,fontSize:t.typography.fontSize,fontWeight:t.typography.fontWeight},m],children:r}):r:null,h=R(i)?e.jsx(u,{style:[t.layout.badge,s],children:D(i)?e.jsx(q,{content:i}):i}):null,C=c?e.jsx(u,{style:[t.layout.dot,{backgroundColor:t.colors.indicator}]}):null;return e.jsxs(G,{...A,...E.interactionProps,style:[t.layout.item,{height:t.sizing.itemHeight},S],children:[e.jsx(u,{style:t.layout.indicatorWrapper,children:j&&e.jsx(u,{style:d})}),e.jsx(u,{style:t.layout.itemContent,children:e.jsxs(u,{style:t.layout.titleRow,children:[o,h,C]})})]})},z=b.memo(X);z.displayName="Sidebar.Item";const n=Object.assign(T,{Item:z});function M(){return e.jsxs(n,{defaultValue:0,style:{height:200},children:[e.jsx(n.Item,{title:"标签名1"}),e.jsx(n.Item,{title:"标签名2"}),e.jsx(n.Item,{title:"标签名3"})]})}const Y=`import React from 'react'
import { Sidebar } from 'react-native-system-ui'

export default function SidebarBasicDemo() {
  return (
  <Sidebar defaultValue={0} style={{ height: 200 }}>
    <Sidebar.Item title="标签名1" />
    <Sidebar.Item title="标签名2" />
    <Sidebar.Item title="标签名3" />
  </Sidebar>
  )
}
`,Z={code:Y,sources:{_:{tsx:`import React from 'react'
import { Sidebar } from 'react-native-system-ui'

export default function SidebarBasicDemo() {
  return (
  <Sidebar defaultValue={0} style={{ height: 200 }}>
    <Sidebar.Item title="标签名1" />
    <Sidebar.Item title="标签名2" />
    <Sidebar.Item title="标签名3" />
  </Sidebar>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Sidebar } from 'react-native-system-ui'

export default function SidebarBasicDemo() {
  return (
  <Sidebar defaultValue={0} style={{ height: 200 }}>
    <Sidebar.Item title="标签名1" />
    <Sidebar.Item title="标签名2" />
    <Sidebar.Item title="标签名3" />
  </Sidebar>
  )
}
`}},title:"基础用法",identifier:"sidebar-basic",lang:"tsx",meta:{title:"基础用法"}};function N(){return e.jsxs(n,{defaultValue:1,style:{height:240},children:[e.jsx(n.Item,{title:"标签名",dot:!0}),e.jsx(n.Item,{title:"标签名",badge:5}),e.jsx(n.Item,{title:"标签名",disabled:!0})]})}const ee=`import React from 'react'

import { Sidebar } from 'react-native-system-ui'

export default function SidebarCustomDemo() {
  return (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="标签名" dot />
    <Sidebar.Item title="标签名" badge={5} />
    <Sidebar.Item title="标签名" disabled />
  </Sidebar>
  )
}
`,te={code:ee,sources:{_:{tsx:`import React from 'react'

import { Sidebar } from 'react-native-system-ui'

export default function SidebarCustomDemo() {
  return (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="标签名" dot />
    <Sidebar.Item title="标签名" badge={5} />
    <Sidebar.Item title="标签名" disabled />
  </Sidebar>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Sidebar } from 'react-native-system-ui'

export default function SidebarCustomDemo() {
  return (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="标签名" dot />
    <Sidebar.Item title="标签名" badge={5} />
    <Sidebar.Item title="标签名" disabled />
  </Sidebar>
  )
}
`}},title:"徽标与禁用",identifier:"sidebar-custom",lang:"tsx",meta:{title:"徽标与禁用"}};function w(){const[a,r]=b.useState(2);return e.jsxs(n,{value:a,onChange:i=>{r(i),k.info(`标签名 ${i+1}`)},style:{height:200},children:[e.jsx(n.Item,{title:"标签名1"}),e.jsx(n.Item,{title:"标签名2"}),e.jsx(n.Item,{title:"标签名3"})]})}const ie=`import React from 'react'
import { Toast, Sidebar } from 'react-native-system-ui'

export default function SidebarControlledDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`标签名 \${v + 1}\`)
      }}
      style={{ height: 200 }}
    >
      <Sidebar.Item title="标签名1" />
      <Sidebar.Item title="标签名2" />
      <Sidebar.Item title="标签名3" />
    </Sidebar>
  )
}
`,re={code:ie,sources:{_:{tsx:`import React from 'react'
import { Toast, Sidebar } from 'react-native-system-ui'

export default function SidebarControlledDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`标签名 \${v + 1}\`)
      }}
      style={{ height: 200 }}
    >
      <Sidebar.Item title="标签名1" />
      <Sidebar.Item title="标签名2" />
      <Sidebar.Item title="标签名3" />
    </Sidebar>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Toast, Sidebar } from 'react-native-system-ui'

export default function SidebarControlledDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`标签名 \${v + 1}\`)
      }}
      style={{ height: 200 }}
    >
      <Sidebar.Item title="标签名1" />
      <Sidebar.Item title="标签名2" />
      <Sidebar.Item title="标签名3" />
    </Sidebar>
  )
}
`}},title:"受控导航",identifier:"sidebar-controlled",lang:"tsx",meta:{title:"受控导航"}};function H(){const[a,r]=b.useState(0);return e.jsxs(n,{value:a,onChange:i=>{r(i),k.info(`内容区 ${i+1}`)},style:{height:240},children:[e.jsx(n.Item,{title:"内容1",contentStyle:{backgroundColor:"#fff",paddingVertical:18,paddingHorizontal:10},children:"我是内容区1"}),e.jsx(n.Item,{title:"内容2",contentStyle:{backgroundColor:"#fff",paddingVertical:18,paddingHorizontal:10},children:"我是内容区2"}),e.jsx(n.Item,{title:"内容3",contentStyle:{backgroundColor:"#fff",paddingVertical:18,paddingHorizontal:10},children:"我是内容区3"})]})}const ne=`import React from 'react'
import { Sidebar, Toast } from 'react-native-system-ui'

export default function SidebarContentDemo() {
  const [active, setActive] = React.useState(0)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`内容区 \${v + 1}\`)
      }}
      style={{ height: 240 }}
    >
      <Sidebar.Item
        title="内容1"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区1
      </Sidebar.Item>
      <Sidebar.Item
        title="内容2"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区2
      </Sidebar.Item>
      <Sidebar.Item
        title="内容3"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区3
      </Sidebar.Item>
    </Sidebar>
  )
}

`,de={code:ne,sources:{_:{tsx:`import React from 'react'
import { Sidebar, Toast } from 'react-native-system-ui'

export default function SidebarContentDemo() {
  const [active, setActive] = React.useState(0)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`内容区 \${v + 1}\`)
      }}
      style={{ height: 240 }}
    >
      <Sidebar.Item
        title="内容1"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区1
      </Sidebar.Item>
      <Sidebar.Item
        title="内容2"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区2
      </Sidebar.Item>
      <Sidebar.Item
        title="内容3"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区3
      </Sidebar.Item>
    </Sidebar>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Sidebar, Toast } from 'react-native-system-ui'

export default function SidebarContentDemo() {
  const [active, setActive] = React.useState(0)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`内容区 \${v + 1}\`)
      }}
      style={{ height: 240 }}
    >
      <Sidebar.Item
        title="内容1"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区1
      </Sidebar.Item>
      <Sidebar.Item
        title="内容2"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区2
      </Sidebar.Item>
      <Sidebar.Item
        title="内容3"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区3
      </Sidebar.Item>
    </Sidebar>
  )
}

`}},title:"自定义内容区",identifier:"sidebar-content",lang:"tsx",meta:{title:"自定义内容区"}},ae=function({previewer:a=()=>null,api:r=()=>null}){const i=a;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"sidebar-侧边导航","data-anchor":"sidebar-侧边导航",children:"Sidebar 侧边导航"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于在较宽的页面中展示垂直分类菜单，支持受控/非受控切换、徽标、禁用态等，可搭配内容区展示。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Sidebar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"defaultValue"})," 设置默认选中项。"]}),e.jsx("div",{children:e.jsx(i,{...Z,children:e.jsx(M,{})})}),e.jsx("h3",{id:"自定义徽标","data-anchor":"自定义徽标",children:"自定义徽标"}),e.jsxs("p",{children:["可在 ",e.jsx("code",{children:"Sidebar.Item"})," 上添加 ",e.jsx("code",{children:"Badge"})," 或 ",e.jsx("code",{children:"dot"}),"，并支持禁用项。"]}),e.jsx("div",{children:e.jsx(i,{...te,children:e.jsx(N,{})})}),e.jsx("h3",{id:"受控模式","data-anchor":"受控模式",children:"受控模式"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"value/onChange"})," 管理外部状态。"]}),e.jsx("div",{children:e.jsx(i,{...re,children:e.jsx(w,{})})}),e.jsx("h3",{id:"自定义内容区","data-anchor":"自定义内容区",children:"自定义内容区"}),e.jsxs("p",{children:["在 ",e.jsx("code",{children:"Sidebar.Item"})," 中传入 ",e.jsx("code",{children:"children"})," 即可渲染内容区，并可通过 ",e.jsx("code",{children:"contentStyle"})," 自定义内容区样式。"]}),e.jsx("div",{children:e.jsx(i,{...de,children:e.jsx(H,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"sidebar-props","data-anchor":"sidebar-props",children:"Sidebar Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中索引（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认索引"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"sideStyle"})}),e.jsx("td",{children:"左侧菜单容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"最外层容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"切换时回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: number) => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"sidebaritem-props","data-anchor":"sidebaritem-props",children:"Sidebar.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"文本内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"badge"})}),e.jsx("td",{children:"徽标，可传数字/字符串或自定义节点"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"dot"})}),e.jsx("td",{children:"右上角红点"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击当前项触发"}),e.jsx("td",{children:e.jsx("code",{children:"(value: number) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"标题样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsx("td",{children:"内容区域样式（仅激活项生效）"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"内容区域内容（仅激活项展示）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["差异说明：当前版本暂未提供 ",e.jsx("code",{children:"beforeChange"})," 等切换拦截能力，如需异步确认可在 ",e.jsx("code",{children:"onChange"})," 中自行处理并回退选中态。"]})})]})})},oe=[{Component:M,key:"sidebar-basic",sources:{_:{tsx:`import React from 'react'
import { Sidebar } from 'react-native-system-ui'

export default function SidebarBasicDemo() {
  return (
  <Sidebar defaultValue={0} style={{ height: 200 }}>
    <Sidebar.Item title="标签名1" />
    <Sidebar.Item title="标签名2" />
    <Sidebar.Item title="标签名3" />
  </Sidebar>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Sidebar } from 'react-native-system-ui'

export default function SidebarBasicDemo() {
  return (
  <Sidebar defaultValue={0} style={{ height: 200 }}>
    <Sidebar.Item title="标签名1" />
    <Sidebar.Item title="标签名2" />
    <Sidebar.Item title="标签名3" />
  </Sidebar>
  )
}
`}},title:"基础用法",identifier:"sidebar-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:N,key:"sidebar-custom",sources:{_:{tsx:`import React from 'react'

import { Sidebar } from 'react-native-system-ui'

export default function SidebarCustomDemo() {
  return (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="标签名" dot />
    <Sidebar.Item title="标签名" badge={5} />
    <Sidebar.Item title="标签名" disabled />
  </Sidebar>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Sidebar } from 'react-native-system-ui'

export default function SidebarCustomDemo() {
  return (
  <Sidebar defaultValue={1} style={{ height: 240 }}>
    <Sidebar.Item title="标签名" dot />
    <Sidebar.Item title="标签名" badge={5} />
    <Sidebar.Item title="标签名" disabled />
  </Sidebar>
  )
}
`}},title:"徽标与禁用",identifier:"sidebar-custom",lang:"tsx",meta:{title:"徽标与禁用"}},{Component:w,key:"sidebar-controlled",sources:{_:{tsx:`import React from 'react'
import { Toast, Sidebar } from 'react-native-system-ui'

export default function SidebarControlledDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`标签名 \${v + 1}\`)
      }}
      style={{ height: 200 }}
    >
      <Sidebar.Item title="标签名1" />
      <Sidebar.Item title="标签名2" />
      <Sidebar.Item title="标签名3" />
    </Sidebar>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Toast, Sidebar } from 'react-native-system-ui'

export default function SidebarControlledDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`标签名 \${v + 1}\`)
      }}
      style={{ height: 200 }}
    >
      <Sidebar.Item title="标签名1" />
      <Sidebar.Item title="标签名2" />
      <Sidebar.Item title="标签名3" />
    </Sidebar>
  )
}
`}},title:"受控导航",identifier:"sidebar-controlled",lang:"tsx",meta:{title:"受控导航"}},{Component:H,key:"sidebar-content",sources:{_:{tsx:`import React from 'react'
import { Sidebar, Toast } from 'react-native-system-ui'

export default function SidebarContentDemo() {
  const [active, setActive] = React.useState(0)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`内容区 \${v + 1}\`)
      }}
      style={{ height: 240 }}
    >
      <Sidebar.Item
        title="内容1"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区1
      </Sidebar.Item>
      <Sidebar.Item
        title="内容2"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区2
      </Sidebar.Item>
      <Sidebar.Item
        title="内容3"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区3
      </Sidebar.Item>
    </Sidebar>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Sidebar, Toast } from 'react-native-system-ui'

export default function SidebarContentDemo() {
  const [active, setActive] = React.useState(0)

  return (
    <Sidebar
      value={active}
      onChange={v => {
        setActive(v)
        Toast.info(\`内容区 \${v + 1}\`)
      }}
      style={{ height: 240 }}
    >
      <Sidebar.Item
        title="内容1"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区1
      </Sidebar.Item>
      <Sidebar.Item
        title="内容2"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区2
      </Sidebar.Item>
      <Sidebar.Item
        title="内容3"
        contentStyle={{ backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 10 }}
      >
        我是内容区3
      </Sidebar.Item>
    </Sidebar>
  )
}

`}},title:"自定义内容区",identifier:"sidebar-content",lang:"tsx",meta:{title:"自定义内容区"}}],se={simulator:{compact:!0}},le=[{depth:1,text:"Sidebar 侧边导航",id:"sidebar-侧边导航"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义徽标",id:"自定义徽标"},{depth:3,text:"受控模式",id:"受控模式"},{depth:3,text:"自定义内容区",id:"自定义内容区"},{depth:2,text:"API",id:"api"},{depth:3,text:"Sidebar Props",id:"sidebar-props"},{depth:3,text:"Sidebar.Item Props",id:"sidebaritem-props"}],ue="/docs/components/sidebar.md",ce="Sidebar 侧边导航",me="1766319671000",we=a=>a.children({MdContent:ae,demos:oe,frontmatter:se,slugs:le,filePath:ue,title:ce,updatedTime:me});export{ae as MdContent,we as default,oe as demos,ue as filePath,se as frontmatter,le as slugs,ce as title,me as updatedTime};
