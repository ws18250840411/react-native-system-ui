import{s as R,R as pe,r as i,F as c,d as me,j as e,V as u}from"./main-BXb8DOxl.js";import{c as ye,T as je}from"./createComponentTokensHook-C7GS3cUR.js";import{u as fe}from"./index-4Yp_2FWl.js";import{I as ge}from"./index-BPY4IQIH.js";import{T as P}from"./Typography-Bhi67EoZ.js";import"./index-CysvSvJu.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";const Fe=r=>{const{palette:n}=r;return{defaults:{content:"WaterMark",width:120,height:64,gapX:24,gapY:48,rotate:-22,fontSize:14,opacity:.15,zIndex:2e3,fullPage:!0},layout:{absoluteFill:R.absoluteFillObject,wrapper:{flex:1},row:{flexDirection:"row"},cell:{alignItems:"center",justifyContent:"center"},mark:{alignItems:"center",justifyContent:"center"}},colors:{mark:n.default[500]}}},Ce=ye("waterMark",Fe),h=(r,n)=>c(r)?r:n,A=(r,n)=>Math.max(0,h(r,n)),D=(r,n)=>Math.max(1,h(r,n)),Ee=r=>{const{content:n,width:x,height:L,gapX:_,gapY:V,rotate:O,image:j,font:d,fontSize:U,color:$,opacity:X,zIndex:Y,fullPage:H,tokensOverride:G,style:q,onLayoutCalculated:T,textStyle:J,...K}=r,t=Ce(G),Q=n??t.defaults.content,k=h(Y,t.defaults.zIndex),l=H??t.defaults.fullPage,s=fe(),[Z,ee]=i.useState({width:0,height:0}),E=i.useRef({width:0,height:0}),f=l?s:Z,te=A(_,t.defaults.gapX),re=A(V,t.defaults.gapY),S=h(O,t.defaults.rotate),g=Math.max(0,Math.min(1,h(X,t.defaults.opacity))),b=c(d?.size)?d.size:me(d?.size)?Number.parseFloat(d.size):void 0,N=Math.max(0,h((Number.isFinite(b??Number.NaN)?b:void 0)??U,t.defaults.fontSize)),W=d?.color??$??t.colors.mark,p=D(j?.width??x,t.defaults.width),m=D(j?.height??L,t.defaults.height),y=Math.max(1,p+te),w=Math.max(1,m+re),ie=f.height?Math.ceil(f.height/w)+1:1,ne=f.width?Math.ceil(f.width/y)+1:1,v=i.useRef(T);v.current=T;const de=i.useCallback(a=>{if(l)return;const{width:o,height:B}=a.nativeEvent.layout;if(!c(o)||!c(B))return;const F=Math.max(0,o),C=Math.max(0,B);E.current.width===F&&E.current.height===C||(E.current={width:F,height:C},ee({width:F,height:C}),v.current?.({width:F,height:C}))},[l]);i.useEffect(()=>{l&&(!c(s.width)||!c(s.height)||s.width<=0||s.height<=0||v.current?.({width:s.width,height:s.height}))},[l,s.width,s.height]);const se=i.useMemo(()=>({zIndex:k}),[k]),oe=i.useMemo(()=>({width:y,height:w}),[y,w]),ae=i.useMemo(()=>({paddingLeft:y/2}),[y]),le=i.useMemo(()=>({width:p,height:m,transform:[{rotate:`${S}deg`}]}),[p,m,S]),ce=i.useMemo(()=>({width:p,height:m,opacity:g}),[p,m,g]),ue=i.useMemo(()=>({fontSize:N,color:W,opacity:g,fontFamily:d?.family,fontWeight:d?.weight}),[N,W,g,d?.family,d?.weight]),he=Array.from({length:ie},(a,o)=>o),xe=Array.from({length:ne},(a,o)=>o);return e.jsx(u,{pointerEvents:"none",style:[l?t.layout.absoluteFill:null,se,q],onLayout:de,...K,children:e.jsx(u,{style:t.layout.wrapper,children:he.map(a=>e.jsx(u,{style:[t.layout.row,a%2===0?null:ae],children:xe.map(o=>e.jsx(u,{style:[t.layout.cell,oe],children:e.jsx(u,{style:[t.layout.mark,le],children:j?e.jsx(ge,{source:{uri:j.src},style:ce,resizeMode:"contain"}):e.jsx(je,{allowFontScaling:!1,style:[ue,J],children:Q})})},`col-${a}-${o}`))},`row-${a}`))})})},M=pe.memo(Ee);M.displayName="WaterMark";const z=()=>e.jsx(M,{content:"RNSU"}),we=`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`,ve={code:we,sources:{_:{tsx:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},title:"页面水印",identifier:"water-mark-basic",lang:"tsx",meta:{title:"页面水印"}},I=()=>e.jsxs(u,{style:{padding:16,height:200,borderWidth:1,borderColor:"#ddd",borderRadius:8},children:[e.jsx(P.Title,{level:5,children:"保密文档"}),e.jsx(P.Text,{children:"示例内容，展示局部水印。"}),e.jsx(M,{content:"CONFIDENTIAL",fullPage:!1,fontSize:12,opacity:.1,rotate:-15,style:R.absoluteFill})]}),Me=`import React from 'react'
import { WaterMark, Typography } from 'react-native-system-ui'
import { View, StyleSheet } from 'react-native'

export default () => (
  <View style={{ padding: 16, height: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
    <Typography.Title level={5}>保密文档</Typography.Title>
    <Typography.Text>示例内容，展示局部水印。</Typography.Text>
    <WaterMark
      content="CONFIDENTIAL"
      fullPage={false}
      fontSize={12}
      opacity={0.1}
      rotate={-15}
      style={StyleSheet.absoluteFill}
    />
  </View>
)
`,Te={code:Me,sources:{_:{tsx:`import React from 'react'
import { WaterMark, Typography } from 'react-native-system-ui'
import { View, StyleSheet } from 'react-native'

export default () => (
  <View style={{ padding: 16, height: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
    <Typography.Title level={5}>保密文档</Typography.Title>
    <Typography.Text>示例内容，展示局部水印。</Typography.Text>
    <WaterMark
      content="CONFIDENTIAL"
      fullPage={false}
      fontSize={12}
      opacity={0.1}
      rotate={-15}
      style={StyleSheet.absoluteFill}
    />
  </View>
)
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { WaterMark, Typography } from 'react-native-system-ui'
import { View, StyleSheet } from 'react-native'

export default () => (
  <View style={{ padding: 16, height: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
    <Typography.Title level={5}>保密文档</Typography.Title>
    <Typography.Text>示例内容，展示局部水印。</Typography.Text>
    <WaterMark
      content="CONFIDENTIAL"
      fullPage={false}
      fontSize={12}
      opacity={0.1}
      rotate={-15}
      style={StyleSheet.absoluteFill}
    />
  </View>
)
`}},title:"局部覆盖",identifier:"water-mark-custom",lang:"tsx",meta:{title:"局部覆盖"}},ke=function({previewer:r=()=>null,api:n=()=>null}){const x=r;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"watermark-水印","data-anchor":"watermark-水印",children:"WaterMark 水印"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在页面或某个容器上平铺文字/图片水印，常用于防止截图泄露。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(x,{code:"import { WaterMark } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"全屏水印","data-anchor":"全屏水印",children:"全屏水印"}),e.jsx("div",{children:e.jsx(x,{...ve,children:e.jsx(z,{})})}),e.jsx("h3",{id:"区域水印","data-anchor":"区域水印",children:"区域水印"}),e.jsx("div",{children:e.jsx(x,{...Te,children:e.jsx(I,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"content"})}),e.jsx("td",{children:"水印文本"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"WaterMark"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"width"})}),e.jsx("td",{children:"单个水印宽度（文字水印）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"120"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"height"})}),e.jsx("td",{children:"单个水印高度（文字水印）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"64"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"image"})}),e.jsx("td",{children:"图片水印（存在时优先生效）"}),e.jsx("td",{children:e.jsxs("code",{children:["{"," src: string; width: number; height: number ","}"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"font"})}),e.jsx("td",{children:"文字水印字体配置"}),e.jsx("td",{children:e.jsxs("code",{children:["{"," color?: string; size?: number | string; family?: string; weight?: string ","}"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gapX"})}),e.jsx("td",{children:"水印水平间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"24"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gapY"})}),e.jsx("td",{children:"水印垂直间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"48"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rotate"})}),e.jsx("td",{children:"旋转角度（deg）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"-22"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fontSize"})}),e.jsxs("td",{children:["文本大小（兼容字段，优先级低于 ",e.jsx("code",{children:"font.size"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"14"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsxs("td",{children:["文本颜色（兼容字段，优先级低于 ",e.jsx("code",{children:"font.color"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"opacity"})}),e.jsx("td",{children:"透明度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0.15"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"2000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fullPage"})}),e.jsx("td",{children:"是否铺满整个屏幕"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"Text"})," 样式"]}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onLayoutCalculated"})}),e.jsx("td",{children:"布局计算完成回调"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," width, height ","}",") => void"]})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"fullPage=false"})," 时请传入 ",e.jsxs("code",{children:["style=","{","StyleSheet.absoluteFill","}"]}),"（或其它覆盖布局）以确保水印覆盖目标容器。"]})})]})})},Se=[{Component:z,key:"water-mark-basic",sources:{_:{tsx:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},title:"页面水印",identifier:"water-mark-basic",lang:"tsx",meta:{title:"页面水印"}},{Component:I,key:"water-mark-custom",sources:{_:{tsx:`import React from 'react'
import { WaterMark, Typography } from 'react-native-system-ui'
import { View, StyleSheet } from 'react-native'

export default () => (
  <View style={{ padding: 16, height: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
    <Typography.Title level={5}>保密文档</Typography.Title>
    <Typography.Text>示例内容，展示局部水印。</Typography.Text>
    <WaterMark
      content="CONFIDENTIAL"
      fullPage={false}
      fontSize={12}
      opacity={0.1}
      rotate={-15}
      style={StyleSheet.absoluteFill}
    />
  </View>
)
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { WaterMark, Typography } from 'react-native-system-ui'
import { View, StyleSheet } from 'react-native'

export default () => (
  <View style={{ padding: 16, height: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
    <Typography.Title level={5}>保密文档</Typography.Title>
    <Typography.Text>示例内容，展示局部水印。</Typography.Text>
    <WaterMark
      content="CONFIDENTIAL"
      fullPage={false}
      fontSize={12}
      opacity={0.1}
      rotate={-15}
      style={StyleSheet.absoluteFill}
    />
  </View>
)
`}},title:"局部覆盖",identifier:"water-mark-custom",lang:"tsx",meta:{title:"局部覆盖"}}],be={simulator:{compact:!1}},Ne=[{depth:1,text:"WaterMark 水印",id:"watermark-水印"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"全屏水印",id:"全屏水印"},{depth:3,text:"区域水印",id:"区域水印"},{depth:2,text:"API",id:"api"}],We="/docs/components/water-mark.md",Be="WaterMark 水印",Pe="1766057058000",Oe=r=>r.children({MdContent:ke,demos:Se,frontmatter:be,slugs:Ne,filePath:We,title:Be,updatedTime:Pe});export{ke as MdContent,Oe as default,Se as demos,We as filePath,be as frontmatter,Ne as slugs,Be as title,Pe as updatedTime};
