import{R as O,r as a,d as B,j as e,V as f,D,s as ue}from"./main-CX5QgiXt.js";import{c as he}from"./createComponentTokensHook-Hc3l7riF.js";import{A as s}from"./Animated-rPtBS5kg.js";import{n as H}from"./animation-BpxpeSKC.js";import{S as pe}from"./Switch-DueD5EjM.js";import{T as A}from"./Typography-BCwPFU3U.js";import{S as E}from"./Space-Cp0dJ6Ia.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-BEnr4R_B.js";import"./index-CTcRCRb2.js";import"./index-BDzwQtXM.js";import"./useControllableValue-wnptCJgI.js";import"./number-DMCxwktP.js";import"./index-CQ2P49YQ.js";import"./useAriaPress-sIRcrStb.js";const xe=r=>{const{palette:n,spacing:i,radii:p}=r;return{defaults:{rowCount:3,rowWidth:"100%",lastRowWidth:"60%",rowHeight:16,avatarSize:32,titleWidth:"40%"},colors:{block:n.default[100],highlight:"#ffffff"},radius:p.sm,spacing:{containerGap:12,rowGap:i.xs},animation:{duration:1200,minOpacity:.3,maxOpacity:.85}}},me=he("skeleton",xe),R=(r,n)=>D(r)?Math.max(0,r):B(r)&&r.trim()?r.trim():n,V=(r,n,i)=>Array.from({length:r},(p,F)=>R(Array.isArray(n)?n[F]:n,i)),m=O.forwardRef((r,n)=>{const{tokensOverride:i,isLoaded:p,loading:F,animate:q,startColor:J,speed:c,avatar:K,avatarSize:Q,avatarShape:X,title:Y,titleWidth:Z,row:ee,rowWidth:te,rowHeight:b,round:re,style:P,children:ne,...W}=r,t=me(i),x=F??(p!=null?!p:!0),j=q??!0,M=K??!1,ie=Q??t.defaults.avatarSize,N=X??"round",g=Y??!1,oe=Z??t.defaults.titleWidth,_=ee??t.defaults.rowCount,w=te??t.defaults.rowWidth,y=re??!1,ae=D(c)?Math.max(.01,c):B(c)&&Number.isFinite(Number(c))&&Number(c)>0?Number(c):1,S=Math.max(0,t.animation.duration/ae),l=J??t.colors.block,o=D(_)?Math.max(0,Math.floor(_)):0,L=a.useMemo(()=>{const d=V(o,w,t.defaults.rowWidth);return!Array.isArray(w)&&o>1&&(r.rowWidth===void 0||B(r.rowWidth)&&r.rowWidth.trim()==="100%")&&(d[o-1]=t.defaults.lastRowWidth),d},[r.rowWidth,w,o,t.defaults.lastRowWidth,t.defaults.rowWidth]),k=a.useMemo(()=>V(o,b,t.defaults.rowHeight),[b,o,t.defaults.rowHeight]),I=k[0]??t.defaults.rowHeight,T=R(ie,t.defaults.avatarSize),z=R(oe,t.defaults.titleWidth),u=a.useRef(new s.Value(0)).current;a.useEffect(()=>{if(!x||!j||S<=0){u.setValue(0);return}const d=s.loop(s.sequence([s.timing(u,{toValue:1,duration:S/2,useNativeDriver:H}),s.timing(u,{toValue:0,duration:S/2,useNativeDriver:H})]));return d.start(),()=>d.stop()},[j,u,S,x]);const h=a.useMemo(()=>!x||!j?void 0:{opacity:u.interpolate({inputRange:[0,1],outputRange:[t.animation.minOpacity,t.animation.maxOpacity]})},[j,u,x,t.animation.maxOpacity,t.animation.minOpacity]),se=[C.container,{gap:t.spacing.containerGap},P],de=a.useMemo(()=>M?e.jsx(s.View,{style:[{width:T,height:T,borderRadius:N==="round"?999:t.radius,backgroundColor:l},h]}):null,[h,M,N,l,T,t.radius]),ce=a.useMemo(()=>g?e.jsx(s.View,{style:[{width:z,height:I,backgroundColor:l,borderRadius:y?t.radius:0},h]}):null,[h,l,z,y,g,I,t.radius]),le=a.useMemo(()=>o<=0?null:e.jsx(f,{style:C.rows,children:L.map((d,v)=>e.jsx(s.View,{testID:`rv-skeleton-row-${v}`,style:[{width:d,height:k[v],marginTop:v===0&&!g?0:t.spacing.rowGap,backgroundColor:l,borderRadius:y?t.radius:0},h]},v))}),[h,l,k,L,o,y,g,t.radius,t.spacing.rowGap]);return x?e.jsxs(f,{ref:n,style:se,...W,children:[de,e.jsxs(f,{style:C.content,children:[ce,le]})]}):e.jsx(f,{ref:n,style:P,...W,children:ne})}),C=ue.create({container:{flexDirection:"row",alignItems:"flex-start"},content:{flex:1},rows:{width:"100%"}});m.displayName="Skeleton";const G=()=>e.jsx(m,{title:!0,row:3}),je=`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`,ge={code:je,sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},title:"基础",identifier:"skeleton-basic",lang:"tsx",meta:{title:"基础"}},U=()=>{const[r,n]=O.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsxs(E,{align:"center",gap:8,children:[e.jsx(pe,{checked:r,onChange:i=>n(i)}),e.jsx(A.Text,{color:"#888",children:r?"加载中":"已加载"})]}),e.jsx(m,{avatar:!0,title:!0,row:2,loading:r,style:{marginTop:12},children:e.jsxs(E,{align:"center",gap:12,children:[e.jsx(m,{avatarSize:48,avatarShape:"round"}),e.jsxs(E,{direction:"vertical",gap:4,style:{flex:1},children:[e.jsx(A.Title,{level:5,children:"React Native System UI"}),e.jsx(A.Text,{color:"#888",children:"跨平台的一致体验。"})]})]})})]})},ye=`import React from 'react'
import { Skeleton, Switch, Space, Typography } from 'react-native-system-ui'

export default () => {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Space align="center" gap={8}>
        <Switch checked={loading} onChange={val => setLoading(val)} />
        <Typography.Text color="#888">{loading ? '加载中' : '已加载'}</Typography.Text>
      </Space>
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Space align="center" gap={12}>
          <Skeleton avatarSize={48} avatarShape="round" />
          <Space direction="vertical" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Space>
        </Space>
      </Skeleton>
    </>
  )
}
`,Se={code:ye,sources:{_:{tsx:`import React from 'react'
import { Skeleton, Switch, Space, Typography } from 'react-native-system-ui'

export default () => {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Space align="center" gap={8}>
        <Switch checked={loading} onChange={val => setLoading(val)} />
        <Typography.Text color="#888">{loading ? '加载中' : '已加载'}</Typography.Text>
      </Space>
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Space align="center" gap={12}>
          <Skeleton avatarSize={48} avatarShape="round" />
          <Space direction="vertical" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Space>
        </Space>
      </Skeleton>
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton, Switch, Space, Typography } from 'react-native-system-ui'

export default () => {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Space align="center" gap={8}>
        <Switch checked={loading} onChange={val => setLoading(val)} />
        <Typography.Text color="#888">{loading ? '加载中' : '已加载'}</Typography.Text>
      </Space>
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Space align="center" gap={12}>
          <Skeleton avatarSize={48} avatarShape="round" />
          <Space direction="vertical" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Space>
        </Space>
      </Skeleton>
    </>
  )
}
`}},title:"头像",identifier:"skeleton-avatar",lang:"tsx",meta:{title:"头像"}},$=()=>e.jsx(m,{title:!0,row:4,rowWidth:["100%","80%","60%","40%"],rowHeight:[18,18,12,12],round:!0}),ve=`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => (
  <Skeleton
    title
    row={4}
    rowWidth={['100%', '80%', '60%', '40%']}
    rowHeight={[18, 18, 12, 12]}
    round
  />
)
`,fe={code:ve,sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => (
  <Skeleton
    title
    row={4}
    rowWidth={['100%', '80%', '60%', '40%']}
    rowHeight={[18, 18, 12, 12]}
    round
  />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => (
  <Skeleton
    title
    row={4}
    rowWidth={['100%', '80%', '60%', '40%']}
    rowHeight={[18, 18, 12, 12]}
    round
  />
)
`}},title:"自定义",identifier:"skeleton-custom",lang:"tsx",meta:{title:"自定义"}},Fe=function({previewer:r=()=>null,api:n=()=>null}){const i=r;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"skeleton-骨架屏","data-anchor":"skeleton-骨架屏",children:"Skeleton 骨架屏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在内容加载前展示占位，避免布局抖动。目前提供标题、段落、头像等占位元素，可自定义尺寸与动画。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Skeleton } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(i,{...ge,children:e.jsx(G,{})})}),e.jsx("h3",{id:"显示头像与内容切换","data-anchor":"显示头像与内容切换",children:"显示头像与内容切换"}),e.jsx("div",{children:e.jsx(i,{...Se,children:e.jsx(U,{})})}),e.jsx("h3",{id:"自定义宽高","data-anchor":"自定义宽高",children:"自定义宽高"}),e.jsx("div",{children:e.jsx(i,{...fe,children:e.jsx($,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsxs("td",{children:["是否展示骨架屏，为 ",e.jsx("code",{children:"false"})," 时展示子节点"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLoaded"})}),e.jsxs("td",{children:["兼容 Gluestack：为 ",e.jsx("code",{children:"true"})," 时展示子节点"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animate"})}),e.jsx("td",{children:"是否启用闪烁动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"speed"})}),e.jsx("td",{children:"动画速度倍率（值越大越快）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"startColor"})}),e.jsx("td",{children:"骨架块底色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.block"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatar"})}),e.jsx("td",{children:"是否展示头像占位"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatarSize"})}),e.jsx("td",{children:"头像尺寸"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"32"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatarShape"})}),e.jsx("td",{children:"头像形状"}),e.jsx("td",{children:e.jsx("code",{children:"'round' | 'square'"})}),e.jsx("td",{children:e.jsx("code",{children:"'round'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"是否展示标题占位"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleWidth"})}),e.jsx("td",{children:"标题宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"40%"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"row"})}),e.jsx("td",{children:"段落行数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rowWidth"})}),e.jsx("td",{children:"段落宽度，可为数组"}),e.jsx("td",{children:e.jsx("code",{children:"number | string | (number | string)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"100%"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rowHeight"})}),e.jsx("td",{children:"段落高度，可为数组"}),e.jsx("td",{children:e.jsx("code",{children:"number | string | (number | string)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"16"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否使用圆角块"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"根节点样式"}),e.jsx("td",{children:e.jsx("code",{children:"ViewStyle"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["提示：当 ",e.jsx("code",{children:"rowWidth"})," 使用默认值且 ",e.jsx("code",{children:"row > 1"})," 时，最后一行会自动使用 ",e.jsx("code",{children:"60%"}),"。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["差异说明：RN 版暂未提供图片/按钮等复杂占位，若有特殊需求可通过自定义 ",e.jsx("code",{children:"children"})," + ",e.jsxs("code",{children:["loading=","{","false","}"]})," 在加载完成后渲染真实内容。"]})})]})})},we=[{Component:G,key:"skeleton-basic",sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},title:"基础",identifier:"skeleton-basic",lang:"tsx",meta:{title:"基础"}},{Component:U,key:"skeleton-avatar",sources:{_:{tsx:`import React from 'react'
import { Skeleton, Switch, Space, Typography } from 'react-native-system-ui'

export default () => {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Space align="center" gap={8}>
        <Switch checked={loading} onChange={val => setLoading(val)} />
        <Typography.Text color="#888">{loading ? '加载中' : '已加载'}</Typography.Text>
      </Space>
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Space align="center" gap={12}>
          <Skeleton avatarSize={48} avatarShape="round" />
          <Space direction="vertical" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Space>
        </Space>
      </Skeleton>
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton, Switch, Space, Typography } from 'react-native-system-ui'

export default () => {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      <Space align="center" gap={8}>
        <Switch checked={loading} onChange={val => setLoading(val)} />
        <Typography.Text color="#888">{loading ? '加载中' : '已加载'}</Typography.Text>
      </Space>
      <Skeleton avatar title row={2} loading={loading} style={{ marginTop: 12 }}>
        <Space align="center" gap={12}>
          <Skeleton avatarSize={48} avatarShape="round" />
          <Space direction="vertical" gap={4} style={{ flex: 1 }}>
            <Typography.Title level={5}>React Native System UI</Typography.Title>
            <Typography.Text color="#888">跨平台的一致体验。</Typography.Text>
          </Space>
        </Space>
      </Skeleton>
    </>
  )
}
`}},title:"头像",identifier:"skeleton-avatar",lang:"tsx",meta:{title:"头像"}},{Component:$,key:"skeleton-custom",sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => (
  <Skeleton
    title
    row={4}
    rowWidth={['100%', '80%', '60%', '40%']}
    rowHeight={[18, 18, 12, 12]}
    round
  />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => (
  <Skeleton
    title
    row={4}
    rowWidth={['100%', '80%', '60%', '40%']}
    rowHeight={[18, 18, 12, 12]}
    round
  />
)
`}},title:"自定义",identifier:"skeleton-custom",lang:"tsx",meta:{title:"自定义"}}],ke={simulator:{compact:!1}},Te=[{depth:1,text:"Skeleton 骨架屏",id:"skeleton-骨架屏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"显示头像与内容切换",id:"显示头像与内容切换"},{depth:3,text:"自定义宽高",id:"自定义宽高"},{depth:2,text:"API",id:"api"}],Ae="/docs/components/skeleton.md",Ee="Skeleton 骨架屏",Ce="1770189574000",Ue=r=>r.children({MdContent:Fe,demos:we,frontmatter:ke,slugs:Te,filePath:Ae,title:Ee,updatedTime:Ce});export{Fe as MdContent,Ue as default,we as demos,Ae as filePath,ke as frontmatter,Te as slugs,Ee as title,Ce as updatedTime};
