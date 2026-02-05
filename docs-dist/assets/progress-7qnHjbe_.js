import{r as n,j as e,a as ue,V as q,d as le,R as J}from"./main-O6KZrSH_.js";import{c as de,T as pe}from"./createComponentTokensHook-KzOuLm4c.js";import{c as me,h as xe,p as he}from"./number-BcSDXImJ.js";import{A as P}from"./Animated-qBs3E5U6.js";import{S as y}from"./Space-BUyxH04S.js";import{B as O}from"./index-DzU_0rvq.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./index-DvCZppP1.js";import"./useAriaPress-DMjZXFvR.js";import"./color-cEGfwRja.js";import"./createPlatformShadow-BbOkyb5V.js";import"./index-ANZ1PvOD.js";const ge=o=>{const r=o.palette.primary.foreground??"#ffffff";return{defaults:{percentage:0,inactive:!1,showPivot:!0,transition:!0,animationDuration:300},layout:{track:{overflow:"hidden"},indicator:{position:"absolute",left:0,top:0},pivot:{position:"absolute"},pivotText:{textAlign:"center",includeFontPadding:!1}},colors:{track:o.palette.default[100],indicator:o.palette.primary[500],pivotText:r},typography:{pivotFontSize:o.fontSize.xs},sizing:{height:4,pivotPaddingHorizontal:o.spacing.xs,pivotPaddingVertical:2}}},ve=de("progress",ge),je=/linear-gradient|radial-gradient|conic-gradient/i,K=J.createContext(null),fe=({style:o})=>{const r=n.useContext(K);if(!r)return null;const i=n.useMemo(()=>r.animatedValue.interpolate({inputRange:[0,100],outputRange:["0%","100%"]}),[r.animatedValue]),g=n.useMemo(()=>r.orientation==="vertical"?{width:r.height,height:i,bottom:0,left:0,position:"absolute"}:{height:r.height,width:i},[r.height,r.orientation,i]),c=[r.orientation==="vertical"?{position:"absolute",left:0,bottom:0}:r.layoutIndicator,{backgroundColor:r.indicatorColor,borderRadius:r.height/2,...r.isGradient&&r.gradientColor?{backgroundImage:r.gradientColor}:null},g,r.indicatorStyle,o];return e.jsx(P.View,{style:c})},d=n.memo(o=>{const{tokensOverride:r,percentage:i,strokeWidth:g,color:c,trackColor:S,pivotText:A,pivotColor:b,textColor:k,inactive:D,showPivot:R,animated:M,transition:_,animationDuration:w,style:te,pivotStyle:z,indicatorStyle:T,orientation:re,children:ne,...oe}=o,t=ve(r),p=n.useMemo(()=>me(xe(i??t.defaults.percentage),0,100),[i,t.defaults.percentage]),u=n.useMemo(()=>he(g,t.sizing.height)??t.sizing.height,[g,t.sizing.height]),v=n.useMemo(()=>D??t.defaults.inactive,[D,t.defaults.inactive]),j=re??"horizontal",V=n.useMemo(()=>j==="vertical"?!1:R??t.defaults.showPivot,[j,R,t.defaults.showPivot]),N=n.useMemo(()=>(M??_??t.defaults.transition)&&!v,[M,v,t.defaults.transition,_]),E=n.useMemo(()=>Math.max(0,w??t.defaults.animationDuration),[w,t.defaults.animationDuration]),m=le(c)&&je.test(c),F=n.useMemo(()=>S??t.colors.track,[t.colors.track,S]),f=n.useMemo(()=>v?t.colors.track:m?void 0:c??t.colors.indicator,[c,v,m,t.colors.indicator,t.colors.track]),I=n.useMemo(()=>b??(m?v?t.colors.track:t.colors.indicator:f),[v,m,b,f,t.colors.indicator,t.colors.track]),L=n.useMemo(()=>k??t.colors.pivotText,[k,t.colors.pivotText]),x=n.useMemo(()=>A??`${p}%`,[p,A]),B=n.useMemo(()=>V&&x!==null&&x!==!1,[x,V]),h=n.useRef(new P.Value(p)).current;n.useEffect(()=>{if(N&&E>0){const s=P.timing(h,{toValue:p,duration:E,useNativeDriver:!1});return s.start(),()=>s.stop()}else h.setValue(p)},[p,N,E,h]);const[W,$]=n.useState({track:0,pivot:0}),ie=n.useCallback(s=>{const a=s.nativeEvent.layout.width;$(l=>l.track===a?l:{...l,track:a})},[]),H=n.useCallback(s=>{const a=s.nativeEvent.layout.width;$(l=>l.pivot===a?l:{...l,pivot:a})},[]),se=n.useMemo(()=>[t.layout.track,j==="vertical"?{width:u,height:"100%",backgroundColor:F,borderRadius:u/2}:{height:u,backgroundColor:F,borderRadius:u/2}],[u,j,F,t.layout.track]),ae=n.useMemo(()=>{if(!B)return null;const{track:s,pivot:a}=W,l=[t.layout.pivot,{bottom:u+t.sizing.pivotPaddingVertical*2,backgroundColor:I,paddingHorizontal:t.sizing.pivotPaddingHorizontal,paddingVertical:t.sizing.pivotPaddingVertical,borderRadius:u,opacity:s>0?1:0}];let C=null;if(s>0&&a>0){const G=a/2/s*100,X=(s-a/2)/s*100;G<X?C={transform:[{translateX:h.interpolate({inputRange:[0,G,X,100],outputRange:[0,0,s-a,s-a],extrapolate:"clamp"})}]}:C={transform:[{translateX:(s-a)/2}]}}return e.jsx(P.View,{style:[l,C],pointerEvents:"none",onLayout:H,children:ue(x)?e.jsx(pe,{style:[t.layout.pivotText,{color:L,fontSize:t.typography.pivotFontSize},z],children:x}):x})},[h,B,u,W,H,x,z,I,L,t.layout.pivot,t.layout.pivotText,t.sizing.pivotPaddingHorizontal,t.sizing.pivotPaddingVertical,t.typography.pivotFontSize]),ce=n.useMemo(()=>({animatedValue:h,orientation:j,height:u,indicatorColor:f,indicatorStyle:T,isGradient:m,gradientColor:m?c:void 0,layoutIndicator:t.layout.indicator}),[h,c,u,T,m,j,f,t.layout.indicator]);return e.jsx(K.Provider,{value:ce,children:e.jsxs(q,{style:te,accessibilityRole:"progressbar",accessibilityValue:{min:0,max:100,now:p},...oe,children:[e.jsx(q,{style:se,onLayout:B?ie:void 0,children:ne??e.jsx(fe,{})}),ae]})})});d.displayName="Progress";const Q=()=>e.jsx(d,{percentage:50}),Pe=`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`,ye={code:Pe,sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},title:"基础用法",identifier:"progress-base",lang:"tsx",meta:{title:"基础用法"}},U=()=>e.jsx(d,{strokeWidth:8,percentage:30}),Ee=`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`,Fe={code:Ee,sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},title:"线条粗细",identifier:"progress-stroke",lang:"tsx",meta:{title:"线条粗细"}},Y=()=>e.jsxs(y,{direction:"vertical",gap:12,children:[e.jsx(d,{percentage:50,inactive:!0}),e.jsx(d,{percentage:30,inactive:!0,showPivot:!1})]}),Be=`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`,Ce={code:Be,sources:{_:{tsx:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},title:"置灰",identifier:"progress-inactive",lang:"tsx",meta:{title:"置灰"}},Z=()=>e.jsxs(y,{direction:"vertical",gap:12,children:[e.jsx(d,{percentage:25,color:"#f97316",pivotText:"橙色"}),e.jsx(d,{percentage:50,color:"#ef4444",pivotText:"红色"}),e.jsx(d,{percentage:75,showPivot:!1,color:"#8b5cf6"})]}),Se=`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`,Ae={code:Se,sources:{_:{tsx:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},title:"自定义样式",identifier:"progress-color",lang:"tsx",meta:{title:"自定义样式"}},be=(o,r,i)=>o<r?r:o>i?i:o,ee=()=>{const[o,r]=J.useState(50),i=g=>{r(c=>be(c+g,0,100))};return e.jsxs(y,{direction:"vertical",gap:12,children:[e.jsx(d,{percentage:o,transition:!0,animationDuration:300}),e.jsxs(y,{gap:12,children:[e.jsx(O,{size:"small",onPress:()=>i(-10),children:"减少"}),e.jsx(O,{size:"small",type:"primary",onPress:()=>i(10),children:"增加"})]})]})},ke=`import React from 'react'

import { Button, Progress, Space } from 'react-native-system-ui'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export default () => {
  const [value, setValue] = React.useState(50)

  const update = (delta: number) => {
    setValue(current => clamp(current + delta, 0, 100))
  }

  return (
    <Space direction="vertical" gap={12}>
      <Progress percentage={value} transition animationDuration={300} />
      <Space gap={12}>
        <Button size="small" onPress={() => update(-10)}>
          减少
        </Button>
        <Button size="small" type="primary" onPress={() => update(10)}>
          增加
        </Button>
      </Space>
    </Space>
  )
}
`,De={code:ke,sources:{_:{tsx:`import React from 'react'

import { Button, Progress, Space } from 'react-native-system-ui'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export default () => {
  const [value, setValue] = React.useState(50)

  const update = (delta: number) => {
    setValue(current => clamp(current + delta, 0, 100))
  }

  return (
    <Space direction="vertical" gap={12}>
      <Progress percentage={value} transition animationDuration={300} />
      <Space gap={12}>
        <Button size="small" onPress={() => update(-10)}>
          减少
        </Button>
        <Button size="small" type="primary" onPress={() => update(10)}>
          增加
        </Button>
      </Space>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Progress, Space } from 'react-native-system-ui'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export default () => {
  const [value, setValue] = React.useState(50)

  const update = (delta: number) => {
    setValue(current => clamp(current + delta, 0, 100))
  }

  return (
    <Space direction="vertical" gap={12}>
      <Progress percentage={value} transition animationDuration={300} />
      <Space gap={12}>
        <Button size="small" onPress={() => update(-10)}>
          减少
        </Button>
        <Button size="small" type="primary" onPress={() => update(10)}>
          增加
        </Button>
      </Space>
    </Space>
  )
}
`}},title:"过渡效果",identifier:"progress-transition",lang:"tsx",meta:{title:"过渡效果"}},Re=function({previewer:o=()=>null,api:r=()=>null}){const i=o;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"progress-进度条","data-anchor":"progress-进度条",children:"Progress 进度条"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于展示当前任务的完成进度，提供清晰的 API 语义。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Progress } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"percentage"})," 控制进度百分比。"]}),e.jsx("div",{children:e.jsx(i,{...ye,children:e.jsx(Q,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["可通过 ",e.jsx("code",{children:"children"})," 传入自定义填充内容。"]})}),e.jsx("h3",{id:"线条粗细","data-anchor":"线条粗细",children:"线条粗细"}),e.jsxs("p",{children:[e.jsx("code",{children:"strokeWidth"})," 可调整进度条高度。"]}),e.jsx("div",{children:e.jsx(i,{...Fe,children:e.jsx(U,{})})}),e.jsx("h3",{id:"置灰状态","data-anchor":"置灰状态",children:"置灰状态"}),e.jsxs("p",{children:[e.jsx("code",{children:"inactive"})," 会让进度条与标签变为灰色。"]}),e.jsx("div",{children:e.jsx(i,{...Ce,children:e.jsx(Y,{})})}),e.jsx("h3",{id:"自定义颜色与文案","data-anchor":"自定义颜色与文案",children:"自定义颜色与文案"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"color"}),"、",e.jsx("code",{children:"pivotText"}),"、",e.jsx("code",{children:"showPivot"})," 等属性定制外观。"]}),e.jsx("div",{children:e.jsx(i,{...Ae,children:e.jsx(Z,{})})}),e.jsx("h3",{id:"过渡效果","data-anchor":"过渡效果",children:"过渡效果"}),e.jsxs("p",{children:["默认开启过渡动画，可通过 ",e.jsx("code",{children:"transition"})," 开关控制。"]}),e.jsx("div",{children:e.jsx(i,{...De,children:e.jsx(ee,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"percentage"})}),e.jsx("td",{children:"进度百分比，0-100"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"strokeWidth"})}),e.jsxs("td",{children:["进度条高度，接受数字或 ",e.jsx("code",{children:"px"})," 字符串"]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.sizes.height"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"进度条颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.indicator"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"trackColor"})}),e.jsx("td",{children:"轨道颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.track"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactive"})}),e.jsx("td",{children:"是否置灰"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showPivot"})}),e.jsx("td",{children:"是否展示进度文案"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"orientation"})}),e.jsx("td",{children:"方向（垂直时不展示 pivot）"}),e.jsx("td",{children:e.jsx("code",{children:"horizontal | vertical"})}),e.jsx("td",{children:e.jsx("code",{children:"horizontal"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pivotText"})}),e.jsx("td",{children:"自定义进度文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsxs("code",{children:["$","{","percentage","}","%"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pivotColor"})}),e.jsx("td",{children:"文案背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"与进度条颜色一致"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textColor"})}),e.jsx("td",{children:"文案文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.pivotText"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pivotStyle"})}),e.jsx("td",{children:"文案样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indicatorStyle"})}),e.jsx("td",{children:"进度条样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"transition"})}),e.jsx("td",{children:"是否开启过渡动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animationDuration"})}),e.jsx("td",{children:"过渡动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前渐变色可通过传入 CSS ",e.jsx("code",{children:"linear-gradient"})," 字符串的方式在 RN Web 环境下生效；在纯原生端建议自定义 ",e.jsx("code",{children:"indicatorStyle"})," 以实现渐变效果。"]})})]})})},Me=[{Component:Q,key:"progress-base",sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},title:"基础用法",identifier:"progress-base",lang:"tsx",meta:{title:"基础用法"}},{Component:U,key:"progress-stroke",sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},title:"线条粗细",identifier:"progress-stroke",lang:"tsx",meta:{title:"线条粗细"}},{Component:Y,key:"progress-inactive",sources:{_:{tsx:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},title:"置灰",identifier:"progress-inactive",lang:"tsx",meta:{title:"置灰"}},{Component:Z,key:"progress-color",sources:{_:{tsx:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},title:"自定义样式",identifier:"progress-color",lang:"tsx",meta:{title:"自定义样式"}},{Component:ee,key:"progress-transition",sources:{_:{tsx:`import React from 'react'

import { Button, Progress, Space } from 'react-native-system-ui'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export default () => {
  const [value, setValue] = React.useState(50)

  const update = (delta: number) => {
    setValue(current => clamp(current + delta, 0, 100))
  }

  return (
    <Space direction="vertical" gap={12}>
      <Progress percentage={value} transition animationDuration={300} />
      <Space gap={12}>
        <Button size="small" onPress={() => update(-10)}>
          减少
        </Button>
        <Button size="small" type="primary" onPress={() => update(10)}>
          增加
        </Button>
      </Space>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Button, Progress, Space } from 'react-native-system-ui'

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export default () => {
  const [value, setValue] = React.useState(50)

  const update = (delta: number) => {
    setValue(current => clamp(current + delta, 0, 100))
  }

  return (
    <Space direction="vertical" gap={12}>
      <Progress percentage={value} transition animationDuration={300} />
      <Space gap={12}>
        <Button size="small" onPress={() => update(-10)}>
          减少
        </Button>
        <Button size="small" type="primary" onPress={() => update(10)}>
          增加
        </Button>
      </Space>
    </Space>
  )
}
`}},title:"过渡效果",identifier:"progress-transition",lang:"tsx",meta:{title:"过渡效果"}}],_e={simulator:{compact:!1}},we=[{depth:1,text:"Progress 进度条",id:"progress-进度条"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"线条粗细",id:"线条粗细"},{depth:3,text:"置灰状态",id:"置灰状态"},{depth:3,text:"自定义颜色与文案",id:"自定义颜色与文案"},{depth:3,text:"过渡效果",id:"过渡效果"},{depth:2,text:"API",id:"api"}],ze="/docs/components/progress.md",Te="Progress 进度条",Ve="1770197128000",et=o=>o.children({MdContent:Re,demos:Me,frontmatter:_e,slugs:we,filePath:ze,title:Te,updatedTime:Ve});export{Re as MdContent,et as default,Me as demos,ze as filePath,_e as frontmatter,we as slugs,Te as title,Ve as updatedTime};
