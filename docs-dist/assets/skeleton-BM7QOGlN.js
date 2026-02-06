import{R as b,r as a,d as B,j as e,V as v,D,s as he}from"./main-BuQiU471.js";import{c as pe}from"./createComponentTokensHook-BZh_OSSd.js";import{A as s}from"./Animated-CaOvDCxr.js";import{n as V}from"./animation-BpxpeSKC.js";import{S as xe}from"./Switch-DaiWzsrn.js";import{T as A}from"./Typography-C0C-_2nD.js";import{S as E}from"./Space-BsyLL5rO.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-CfLKkUWT.js";import"./index-BAZkLH96.js";import"./index-Ct6-Nt5P.js";import"./useControllableValue-A2U09wcf.js";import"./number-DwcHNqSr.js";import"./index-BRfylSA6.js";import"./useAriaPress-D5uAXibC.js";const me=n=>{const{palette:r,spacing:i,radii:p}=n;return{defaults:{rowCount:3,rowWidth:"100%",lastRowWidth:"60%",rowHeight:16,avatarSize:32,titleWidth:"40%"},colors:{block:r.default[100],highlight:"#ffffff"},radius:p.sm,spacing:{containerGap:12,rowGap:i.xs},animation:{duration:1200,minOpacity:.3,maxOpacity:.85}}},je=pe("skeleton",me),R=(n,r)=>D(n)?Math.max(0,n):B(n)&&n.trim()?n.trim():r,O=(n,r,i)=>Array.from({length:n},(p,F)=>R(Array.isArray(r)?r[F]:r,i)),ge=(n,r)=>{const{tokensOverride:i,isLoaded:p,loading:F,animate:J,startColor:K,speed:c,avatar:Q,avatarSize:X,avatarShape:Y,title:Z,titleWidth:ee,row:te,rowWidth:ne,rowHeight:P,round:re,style:W,children:ie,...M}=n,t=je(i),x=F??(p!=null?!p:!0),m=J??!0,N=Q??!1,oe=X??t.defaults.avatarSize,_=Y??"round",j=Z??!1,ae=ee??t.defaults.titleWidth,L=te??t.defaults.rowCount,w=ne??t.defaults.rowWidth,g=re??!1,se=D(c)?Math.max(.01,c):B(c)&&Number.isFinite(Number(c))&&Number(c)>0?Number(c):1,y=Math.max(0,t.animation.duration/se),l=K??t.colors.block,o=D(L)?Math.max(0,Math.floor(L)):0,I=a.useMemo(()=>{const d=O(o,w,t.defaults.rowWidth);return!Array.isArray(w)&&o>1&&(n.rowWidth===void 0||B(n.rowWidth)&&n.rowWidth.trim()==="100%")&&(d[o-1]=t.defaults.lastRowWidth),d},[n.rowWidth,w,o,t.defaults.lastRowWidth,t.defaults.rowWidth]),k=a.useMemo(()=>O(o,P,t.defaults.rowHeight),[P,o,t.defaults.rowHeight]),z=k[0]??t.defaults.rowHeight,T=R(oe,t.defaults.avatarSize),H=R(ae,t.defaults.titleWidth),u=a.useRef(new s.Value(0)).current;a.useEffect(()=>{if(!x||!m||y<=0){u.setValue(0);return}const d=s.loop(s.sequence([s.timing(u,{toValue:1,duration:y/2,useNativeDriver:V}),s.timing(u,{toValue:0,duration:y/2,useNativeDriver:V})]));return d.start(),()=>d.stop()},[m,u,y,x]);const h=a.useMemo(()=>!x||!m?void 0:{opacity:u.interpolate({inputRange:[0,1],outputRange:[t.animation.minOpacity,t.animation.maxOpacity]})},[m,u,x,t.animation.maxOpacity,t.animation.minOpacity]),de=[C.container,{gap:t.spacing.containerGap},W],ce=a.useMemo(()=>N?e.jsx(s.View,{style:[{width:T,height:T,borderRadius:_==="round"?999:t.radius,backgroundColor:l},h]}):null,[h,N,_,l,T,t.radius]),le=a.useMemo(()=>j?e.jsx(s.View,{style:[{width:H,height:z,backgroundColor:l,borderRadius:g?t.radius:0},h]}):null,[h,l,H,g,j,z,t.radius]),ue=a.useMemo(()=>o<=0?null:e.jsx(v,{style:C.rows,children:I.map((d,S)=>e.jsx(s.View,{testID:`rv-skeleton-row-${S}`,style:[{width:d,height:k[S],marginTop:S===0&&!j?0:t.spacing.rowGap,backgroundColor:l,borderRadius:g?t.radius:0},h]},S))}),[h,l,k,I,o,g,j,t.radius,t.spacing.rowGap]);return x?e.jsxs(v,{ref:r,style:de,...M,children:[ce,e.jsxs(v,{style:C.content,children:[le,ue]})]}):e.jsx(v,{ref:r,style:W,...M,children:ie})},C=he.create({container:{flexDirection:"row",alignItems:"flex-start"},content:{flex:1},rows:{width:"100%"}}),G=b.forwardRef(ge);G.displayName="Skeleton";const f=b.memo(G),U=()=>e.jsx(f,{title:!0,row:3}),ye=`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`,Se={code:ye,sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},title:"基础",identifier:"skeleton-basic",lang:"tsx",meta:{title:"基础"}},$=()=>{const[n,r]=b.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsxs(E,{align:"center",gap:8,children:[e.jsx(xe,{checked:n,onChange:i=>r(i)}),e.jsx(A.Text,{color:"#888",children:n?"加载中":"已加载"})]}),e.jsx(f,{avatar:!0,title:!0,row:2,loading:n,style:{marginTop:12},children:e.jsxs(E,{align:"center",gap:12,children:[e.jsx(f,{avatarSize:48,avatarShape:"round"}),e.jsxs(E,{direction:"vertical",gap:4,style:{flex:1},children:[e.jsx(A.Title,{level:5,children:"React Native System UI"}),e.jsx(A.Text,{color:"#888",children:"跨平台的一致体验。"})]})]})})]})},ve=`import React from 'react'
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
`,fe={code:ve,sources:{_:{tsx:`import React from 'react'
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
`}},title:"头像",identifier:"skeleton-avatar",lang:"tsx",meta:{title:"头像"}},q=()=>e.jsx(f,{title:!0,row:4,rowWidth:["100%","80%","60%","40%"],rowHeight:[18,18,12,12],round:!0}),Fe=`import React from 'react'
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
`,we={code:Fe,sources:{_:{tsx:`import React from 'react'
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
`}},title:"自定义",identifier:"skeleton-custom",lang:"tsx",meta:{title:"自定义"}},ke=function({previewer:n=()=>null,api:r=()=>null}){const i=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"skeleton-骨架屏","data-anchor":"skeleton-骨架屏",children:"Skeleton 骨架屏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在内容加载前展示占位，避免布局抖动。目前提供标题、段落、头像等占位元素，可自定义尺寸与动画。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Skeleton } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(i,{...Se,children:e.jsx(U,{})})}),e.jsx("h3",{id:"显示头像与内容切换","data-anchor":"显示头像与内容切换",children:"显示头像与内容切换"}),e.jsx("div",{children:e.jsx(i,{...fe,children:e.jsx($,{})})}),e.jsx("h3",{id:"自定义宽高","data-anchor":"自定义宽高",children:"自定义宽高"}),e.jsx("div",{children:e.jsx(i,{...we,children:e.jsx(q,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsxs("td",{children:["是否展示骨架屏，为 ",e.jsx("code",{children:"false"})," 时展示子节点"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLoaded"})}),e.jsxs("td",{children:["兼容 Gluestack：为 ",e.jsx("code",{children:"true"})," 时展示子节点"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animate"})}),e.jsx("td",{children:"是否启用闪烁动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"speed"})}),e.jsx("td",{children:"动画速度倍率（值越大越快）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"startColor"})}),e.jsx("td",{children:"骨架块底色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.block"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatar"})}),e.jsx("td",{children:"是否展示头像占位"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatarSize"})}),e.jsx("td",{children:"头像尺寸"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"32"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatarShape"})}),e.jsx("td",{children:"头像形状"}),e.jsx("td",{children:e.jsx("code",{children:"'round' | 'square'"})}),e.jsx("td",{children:e.jsx("code",{children:"'round'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"是否展示标题占位"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleWidth"})}),e.jsx("td",{children:"标题宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"40%"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"row"})}),e.jsx("td",{children:"段落行数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rowWidth"})}),e.jsx("td",{children:"段落宽度，可为数组"}),e.jsx("td",{children:e.jsx("code",{children:"number | string | (number | string)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"100%"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rowHeight"})}),e.jsx("td",{children:"段落高度，可为数组"}),e.jsx("td",{children:e.jsx("code",{children:"number | string | (number | string)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"16"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否使用圆角块"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"根节点样式"}),e.jsx("td",{children:e.jsx("code",{children:"ViewStyle"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["提示：当 ",e.jsx("code",{children:"rowWidth"})," 使用默认值且 ",e.jsx("code",{children:"row > 1"})," 时，最后一行会自动使用 ",e.jsx("code",{children:"60%"}),"。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["差异说明：RN 版暂未提供图片/按钮等复杂占位，若有特殊需求可通过自定义 ",e.jsx("code",{children:"children"})," + ",e.jsxs("code",{children:["loading=","{","false","}"]})," 在加载完成后渲染真实内容。"]})})]})})},Te=[{Component:U,key:"skeleton-basic",sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},title:"基础",identifier:"skeleton-basic",lang:"tsx",meta:{title:"基础"}},{Component:$,key:"skeleton-avatar",sources:{_:{tsx:`import React from 'react'
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
`}},title:"头像",identifier:"skeleton-avatar",lang:"tsx",meta:{title:"头像"}},{Component:q,key:"skeleton-custom",sources:{_:{tsx:`import React from 'react'
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
`}},title:"自定义",identifier:"skeleton-custom",lang:"tsx",meta:{title:"自定义"}}],Ae={simulator:{compact:!1}},Ee=[{depth:1,text:"Skeleton 骨架屏",id:"skeleton-骨架屏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"显示头像与内容切换",id:"显示头像与内容切换"},{depth:3,text:"自定义宽高",id:"自定义宽高"},{depth:2,text:"API",id:"api"}],Ce="/docs/components/skeleton.md",Be="Skeleton 骨架屏",De="1770189574000",qe=n=>n.children({MdContent:ke,demos:Te,frontmatter:Ae,slugs:Ee,filePath:Ce,title:Be,updatedTime:De});export{ke as MdContent,qe as default,Te as demos,Ce as filePath,Ae as frontmatter,Ee as slugs,Be as title,De as updatedTime};
