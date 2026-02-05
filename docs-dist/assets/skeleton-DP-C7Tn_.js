import{R as O,r as a,D,d as R,j as e,V as F,s as le}from"./main-O6KZrSH_.js";import{c as he}from"./createComponentTokensHook-KzOuLm4c.js";import{A as d}from"./Animated-qBs3E5U6.js";import{n as V}from"./animation-BpxpeSKC.js";import{S as pe}from"./Switch-BBqakktt.js";import{T as E}from"./Typography-BwtTdol1.js";import{S as C}from"./Space-BUyxH04S.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./useControllableValue-_OJua4RH.js";import"./number-BcSDXImJ.js";import"./index-DvCZppP1.js";import"./useAriaPress-DMjZXFvR.js";const xe=n=>{const{palette:r,spacing:i,radii:h}=n,p=r.default[100];return{defaults:{rowCount:3,rowWidth:"100%",lastRowWidth:"60%",rowHeight:16,avatarSize:32,titleWidth:"40%"},colors:{block:p,highlight:"#ffffff"},radius:h.sm,spacing:{containerGap:12,rowGap:i.xs},animation:{duration:1200,minOpacity:.3,maxOpacity:.85}}},me=he("skeleton",xe),b=(n,r)=>D(n)?Math.max(0,n):R(n)&&n.trim()?n.trim():r,G=(n,r,i)=>Array.from({length:n},(h,p)=>b(Array.isArray(r)?r[p]:r,i)),g=O.forwardRef((n,r)=>{const{tokensOverride:i,isLoaded:h,loading:p,animate:J,startColor:K,speed:x,avatar:Q,avatarSize:X,avatarShape:Y,title:Z,titleWidth:ee,row:te,rowWidth:ne,rowHeight:M,round:re,style:w,children:ie,...P}=n,t=me(i),m=p??(h!=null?!h:!0),j=J??!0,W=Q??!1,oe=X??t.defaults.avatarSize,N=Y??"round",y=Z??!1,ae=ee??t.defaults.titleWidth,_=te??t.defaults.rowCount,k=ne??t.defaults.rowWidth,S=re??!1,L=a.useMemo(()=>{if(D(x))return Math.max(.01,x);if(R(x)){const o=Number(x);return Number.isFinite(o)&&o>0?o:1}return 1},[x]),v=a.useMemo(()=>Math.max(0,t.animation.duration/L),[L,t.animation.duration]),c=K??t.colors.block,s=D(_)?Math.max(0,Math.floor(_)):0,I=a.useMemo(()=>{const o=G(s,k,t.defaults.rowWidth);return!Array.isArray(k)&&s>1&&(n.rowWidth===void 0||R(n.rowWidth)&&n.rowWidth.trim()==="100%")&&(o[s-1]=t.defaults.lastRowWidth),o},[n.rowWidth,k,s,t.defaults.lastRowWidth,t.defaults.rowWidth]),T=a.useMemo(()=>G(s,M,t.defaults.rowHeight),[M,s,t.defaults.rowHeight]),z=T[0]??t.defaults.rowHeight,A=b(oe,t.defaults.avatarSize),H=b(ae,t.defaults.titleWidth),u=a.useRef(new d.Value(0)).current;a.useEffect(()=>{if(!m||!j||v<=0){u.setValue(0);return}const o=d.loop(d.sequence([d.timing(u,{toValue:1,duration:v/2,useNativeDriver:V}),d.timing(u,{toValue:0,duration:v/2,useNativeDriver:V})]));return o.start(),()=>o.stop()},[j,u,v,m]);const l=a.useMemo(()=>!m||!j?void 0:{opacity:u.interpolate({inputRange:[0,1],outputRange:[t.animation.minOpacity,t.animation.maxOpacity]})},[j,u,m,t.animation.maxOpacity,t.animation.minOpacity]),se=a.useMemo(()=>[B.container,{gap:t.spacing.containerGap},w],[w,t.spacing.containerGap]),de=a.useMemo(()=>W?e.jsx(d.View,{style:[{width:A,height:A,borderRadius:N==="round"?999:t.radius,backgroundColor:c},l]}):null,[l,W,N,c,A,t.radius]),ce=a.useMemo(()=>y?e.jsx(d.View,{style:[{width:H,height:z,backgroundColor:c,borderRadius:S?t.radius:0},l]}):null,[l,c,H,S,y,z,t.radius]),ue=a.useMemo(()=>s<=0?null:e.jsx(F,{style:B.rows,children:I.map((o,f)=>e.jsx(d.View,{testID:`rv-skeleton-row-${f}`,style:[{width:o,height:T[f],marginTop:f===0&&!y?0:t.spacing.rowGap,backgroundColor:c,borderRadius:S?t.radius:0},l]},f))}),[l,c,T,I,s,S,y,t.radius,t.spacing.rowGap]);return m?e.jsxs(F,{ref:r,style:se,...P,children:[de,e.jsxs(F,{style:B.content,children:[ce,ue]})]}):e.jsx(F,{ref:r,style:w,...P,children:ie})}),B=le.create({container:{flexDirection:"row",alignItems:"flex-start"},content:{flex:1},rows:{width:"100%"}});g.displayName="Skeleton";const U=()=>e.jsx(g,{title:!0,row:3}),ge=`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`,je={code:ge,sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},title:"基础",identifier:"skeleton-basic",lang:"tsx",meta:{title:"基础"}},$=()=>{const[n,r]=O.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsxs(C,{align:"center",gap:8,children:[e.jsx(pe,{checked:n,onChange:i=>r(i)}),e.jsx(E.Text,{color:"#888",children:n?"加载中":"已加载"})]}),e.jsx(g,{avatar:!0,title:!0,row:2,loading:n,style:{marginTop:12},children:e.jsxs(C,{align:"center",gap:12,children:[e.jsx(g,{avatarSize:48,avatarShape:"round"}),e.jsxs(C,{direction:"vertical",gap:4,style:{flex:1},children:[e.jsx(E.Title,{level:5,children:"React Native System UI"}),e.jsx(E.Text,{color:"#888",children:"跨平台的一致体验。"})]})]})})]})},ye=`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"头像",identifier:"skeleton-avatar",lang:"tsx",meta:{title:"头像"}},q=()=>e.jsx(g,{title:!0,row:4,rowWidth:["100%","80%","60%","40%"],rowHeight:[18,18,12,12],round:!0}),ve=`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义",identifier:"skeleton-custom",lang:"tsx",meta:{title:"自定义"}},Fe=function({previewer:n=()=>null,api:r=()=>null}){const i=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"skeleton-骨架屏","data-anchor":"skeleton-骨架屏",children:"Skeleton 骨架屏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在内容加载前展示占位，避免布局抖动。目前提供标题、段落、头像等占位元素，可自定义尺寸与动画。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Skeleton } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(i,{...je,children:e.jsx(U,{})})}),e.jsx("h3",{id:"显示头像与内容切换","data-anchor":"显示头像与内容切换",children:"显示头像与内容切换"}),e.jsx("div",{children:e.jsx(i,{...Se,children:e.jsx($,{})})}),e.jsx("h3",{id:"自定义宽高","data-anchor":"自定义宽高",children:"自定义宽高"}),e.jsx("div",{children:e.jsx(i,{...fe,children:e.jsx(q,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsxs("td",{children:["是否展示骨架屏，为 ",e.jsx("code",{children:"false"})," 时展示子节点"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLoaded"})}),e.jsxs("td",{children:["兼容 Gluestack：为 ",e.jsx("code",{children:"true"})," 时展示子节点"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animate"})}),e.jsx("td",{children:"是否启用闪烁动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"speed"})}),e.jsx("td",{children:"动画速度倍率（值越大越快）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"startColor"})}),e.jsx("td",{children:"骨架块底色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.block"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatar"})}),e.jsx("td",{children:"是否展示头像占位"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatarSize"})}),e.jsx("td",{children:"头像尺寸"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"32"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"avatarShape"})}),e.jsx("td",{children:"头像形状"}),e.jsx("td",{children:e.jsx("code",{children:"'round' | 'square'"})}),e.jsx("td",{children:e.jsx("code",{children:"'round'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"是否展示标题占位"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleWidth"})}),e.jsx("td",{children:"标题宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"40%"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"row"})}),e.jsx("td",{children:"段落行数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rowWidth"})}),e.jsx("td",{children:"段落宽度，可为数组"}),e.jsx("td",{children:e.jsx("code",{children:"number | string | (number | string)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"100%"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rowHeight"})}),e.jsx("td",{children:"段落高度，可为数组"}),e.jsx("td",{children:e.jsx("code",{children:"number | string | (number | string)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"16"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"round"})}),e.jsx("td",{children:"是否使用圆角块"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"根节点样式"}),e.jsx("td",{children:e.jsx("code",{children:"ViewStyle"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["提示：当 ",e.jsx("code",{children:"rowWidth"})," 使用默认值且 ",e.jsx("code",{children:"row > 1"})," 时，最后一行会自动使用 ",e.jsx("code",{children:"60%"}),"。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["差异说明：RN 版暂未提供图片/按钮等复杂占位，若有特殊需求可通过自定义 ",e.jsx("code",{children:"children"})," + ",e.jsxs("code",{children:["loading=","{","false","}"]})," 在加载完成后渲染真实内容。"]})})]})})},we=[{Component:U,key:"skeleton-basic",sources:{_:{tsx:`import React from 'react'
import { Skeleton } from 'react-native-system-ui'

export default () => <Skeleton title row={3} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义",identifier:"skeleton-custom",lang:"tsx",meta:{title:"自定义"}}],ke={simulator:{compact:!1}},Te=[{depth:1,text:"Skeleton 骨架屏",id:"skeleton-骨架屏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"显示头像与内容切换",id:"显示头像与内容切换"},{depth:3,text:"自定义宽高",id:"自定义宽高"},{depth:2,text:"API",id:"api"}],Ae="/docs/components/skeleton.md",Ee="Skeleton 骨架屏",Ce="1770189574000",Ue=n=>n.children({MdContent:Fe,demos:we,frontmatter:ke,slugs:Te,filePath:Ae,title:Ee,updatedTime:Ce});export{Fe as MdContent,Ue as default,we as demos,Ae as filePath,ke as frontmatter,Te as slugs,Ee as title,Ce as updatedTime};
