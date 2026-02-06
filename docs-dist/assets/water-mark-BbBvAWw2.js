import{s as W,r as E,D as a,d as xe,j as e,V as l}from"./main-CX5QgiXt.js";import{c as pe,T as ye}from"./createComponentTokensHook-Hc3l7riF.js";import{u as je}from"./index-4qDXDIEs.js";import{I as me}from"./index-BDzwQtXM.js";import{T as S}from"./Typography-BCwPFU3U.js";import"./index-CTcRCRb2.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";const fe=r=>{const{palette:i}=r;return{defaults:{content:"WaterMark",width:120,height:64,gapX:24,gapY:48,rotate:-22,fontSize:14,opacity:.15,zIndex:2e3,fullPage:!0},layout:{absoluteFill:W.absoluteFillObject,wrapper:{flex:1},row:{flexDirection:"row"},cell:{alignItems:"center",justifyContent:"center"},mark:{alignItems:"center",justifyContent:"center"}},colors:{mark:i.default[500]}}},ge=pe("waterMark",fe),c=(r,i)=>a(r)?r:i,b=(r,i)=>Math.max(0,c(r,i)),N=(r,i)=>Math.max(1,c(r,i)),v=r=>{const{content:i,width:u,height:A,gapX:D,gapY:z,rotate:I,image:x,font:s,fontSize:R,color:_,opacity:L,zIndex:V,fullPage:O,tokensOverride:U,style:$,onLayoutCalculated:m,textStyle:X,...Y}=r,t=ge(U),H=i??t.defaults.content,G=c(V,t.defaults.zIndex),h=O??t.defaults.fullPage,n=je(),[q,J]=E.useState({width:0,height:0}),f=E.useRef({width:0,height:0}),p=h?n:q,K=b(D,t.defaults.gapX),Q=b(z,t.defaults.gapY),Z=c(I,t.defaults.rotate),w=Math.max(0,Math.min(1,c(L,t.defaults.opacity))),T=a(s?.size)?s.size:xe(s?.size)?Number.parseFloat(s.size):void 0,ee=Math.max(0,c((Number.isFinite(T??Number.NaN)?T:void 0)??R,t.defaults.fontSize)),te=s?.color??_??t.colors.mark,g=N(x?.width??u,t.defaults.width),F=N(x?.height??A,t.defaults.height),C=Math.max(1,g+K),M=Math.max(1,F+Q),re=p.height?Math.ceil(p.height/M)+1:1,ie=p.width?Math.ceil(p.width/C)+1:1,ne=o=>{if(h)return;const{width:d,height:k}=o.nativeEvent.layout;if(!a(d)||!a(k))return;const y=Math.max(0,d),j=Math.max(0,k);f.current.width===y&&f.current.height===j||(f.current={width:y,height:j},J({width:y,height:j}),m?.({width:y,height:j}))};E.useEffect(()=>{h&&(!a(n.width)||!a(n.height)||n.width<=0||n.height<=0||m?.({width:n.width,height:n.height}))},[h,m,n.width,n.height]);const de={zIndex:G},se={width:C,height:M},oe={paddingLeft:C/2},ae={width:g,height:F,transform:[{rotate:`${Z}deg`}]},le={width:g,height:F,opacity:w},ce={fontSize:ee,color:te,opacity:w,fontFamily:s?.family,fontWeight:s?.weight},ue=Array.from({length:re},(o,d)=>d),he=Array.from({length:ie},(o,d)=>d);return e.jsx(l,{pointerEvents:"none",style:[h?t.layout.absoluteFill:null,de,$],onLayout:ne,...Y,children:e.jsx(l,{style:t.layout.wrapper,children:ue.map(o=>e.jsx(l,{style:[t.layout.row,o%2===0?null:oe],children:he.map(d=>e.jsx(l,{style:[t.layout.cell,se],children:e.jsx(l,{style:[t.layout.mark,ae],children:x?e.jsx(me,{source:{uri:x.src},style:le,resizeMode:"contain"}):e.jsx(ye,{allowFontScaling:!1,style:[ce,X],children:H})})},`col-${o}-${d}`))},`row-${o}`))})})};v.displayName="WaterMark";const B=()=>e.jsx(v,{content:"RNSU"}),Fe=`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`,Ce={code:Fe,sources:{_:{tsx:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},title:"页面水印",identifier:"water-mark-basic",lang:"tsx",meta:{title:"页面水印"}},P=()=>e.jsxs(l,{style:{padding:16,height:200,borderWidth:1,borderColor:"#ddd",borderRadius:8},children:[e.jsx(S.Title,{level:5,children:"保密文档"}),e.jsx(S.Text,{children:"示例内容，展示局部水印。"}),e.jsx(v,{content:"CONFIDENTIAL",fullPage:!1,fontSize:12,opacity:.1,rotate:-15,style:W.absoluteFill})]}),Ee=`import React from 'react'
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
`,ve={code:Ee,sources:{_:{tsx:`import React from 'react'
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
`}},title:"局部覆盖",identifier:"water-mark-custom",lang:"tsx",meta:{title:"局部覆盖"}},we=function({previewer:r=()=>null,api:i=()=>null}){const u=r;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"watermark-水印","data-anchor":"watermark-水印",children:"WaterMark 水印"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在页面或某个容器上平铺文字/图片水印，常用于防止截图泄露。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(u,{code:"import { WaterMark } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"全屏水印","data-anchor":"全屏水印",children:"全屏水印"}),e.jsx("div",{children:e.jsx(u,{...Ce,children:e.jsx(B,{})})}),e.jsx("h3",{id:"区域水印","data-anchor":"区域水印",children:"区域水印"}),e.jsx("div",{children:e.jsx(u,{...ve,children:e.jsx(P,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"content"})}),e.jsx("td",{children:"水印文本"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"WaterMark"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"width"})}),e.jsx("td",{children:"单个水印宽度（文字水印）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"120"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"height"})}),e.jsx("td",{children:"单个水印高度（文字水印）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"64"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"image"})}),e.jsx("td",{children:"图片水印（存在时优先生效）"}),e.jsx("td",{children:e.jsxs("code",{children:["{"," src: string; width: number; height: number ","}"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"font"})}),e.jsx("td",{children:"文字水印字体配置"}),e.jsx("td",{children:e.jsxs("code",{children:["{"," color?: string; size?: number | string; family?: string; weight?: string ","}"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gapX"})}),e.jsx("td",{children:"水印水平间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"24"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gapY"})}),e.jsx("td",{children:"水印垂直间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"48"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rotate"})}),e.jsx("td",{children:"旋转角度（deg）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"-22"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fontSize"})}),e.jsxs("td",{children:["文本大小（兼容字段，优先级低于 ",e.jsx("code",{children:"font.size"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"14"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsxs("td",{children:["文本颜色（兼容字段，优先级低于 ",e.jsx("code",{children:"font.color"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"opacity"})}),e.jsx("td",{children:"透明度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0.15"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"2000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fullPage"})}),e.jsx("td",{children:"是否铺满整个屏幕"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"Text"})," 样式"]}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onLayoutCalculated"})}),e.jsx("td",{children:"布局计算完成回调"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," width, height ","}",") => void"]})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"fullPage=false"})," 时请传入 ",e.jsxs("code",{children:["style=","{","StyleSheet.absoluteFill","}"]}),"（或其它覆盖布局）以确保水印覆盖目标容器。"]})})]})})},Te=[{Component:B,key:"water-mark-basic",sources:{_:{tsx:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { WaterMark } from 'react-native-system-ui'

export default () => (
  <WaterMark content="RNSU" />
)
`}},title:"页面水印",identifier:"water-mark-basic",lang:"tsx",meta:{title:"页面水印"}},{Component:P,key:"water-mark-custom",sources:{_:{tsx:`import React from 'react'
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
`}},title:"局部覆盖",identifier:"water-mark-custom",lang:"tsx",meta:{title:"局部覆盖"}}],Me={simulator:{compact:!1}},ke=[{depth:1,text:"WaterMark 水印",id:"watermark-水印"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"全屏水印",id:"全屏水印"},{depth:3,text:"区域水印",id:"区域水印"},{depth:2,text:"API",id:"api"}],Se="/docs/components/water-mark.md",be="WaterMark 水印",Ne="1766057058000",_e=r=>r.children({MdContent:we,demos:Te,frontmatter:Me,slugs:ke,filePath:Se,title:be,updatedTime:Ne});export{we as MdContent,_e as default,Te as demos,Se as filePath,Me as frontmatter,ke as slugs,be as title,Ne as updatedTime};
