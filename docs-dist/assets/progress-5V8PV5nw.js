import{r as a,j as e,a as ue,V as T,d as le,R as N}from"./main-BAeJvGa4.js";import{c as de,T as pe}from"./createComponentTokensHook-C-NxqfEf.js";import{c as xe,h as me,p as he}from"./number-D4GYRO_w.js";import{A as j}from"./Animated-BC0ZtReY.js";import{S as f}from"./Space-iE7quMPG.js";import{B as V}from"./index-PXiyNNr8.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-BQ9E3_S9.js";import"./index-Beiuxnvg.js";import"./index-OVYHKMmk.js";import"./index-DkwLlxr6.js";import"./useAriaPress-B7BjoQga.js";import"./color-CJcOUys4.js";import"./createPlatformShadow-BbOkyb5V.js";import"./index-tIQ9IWf_.js";const ge=n=>{const r=n.palette.primary.foreground??"#ffffff";return{defaults:{percentage:0,inactive:!1,showPivot:!0,transition:!0,animationDuration:300},layout:{track:{overflow:"hidden"},indicator:{position:"absolute",left:0,top:0},pivot:{position:"absolute"},pivotText:{textAlign:"center",includeFontPadding:!1}},colors:{track:n.palette.default[100],indicator:n.palette.primary[500],pivotText:r},typography:{pivotFontSize:n.fontSize.xs},sizing:{height:4,pivotPaddingHorizontal:n.spacing.xs,pivotPaddingVertical:2}}},ve=de("progress",ge),je=/linear-gradient|radial-gradient|conic-gradient/i,I=N.createContext(null),fe=({style:n})=>{const r=a.useContext(I);if(!r)return null;const o=a.useMemo(()=>r.animatedValue.interpolate({inputRange:[0,100],outputRange:["0%","100%"]}),[r.animatedValue]),h=a.useMemo(()=>r.orientation==="vertical"?{width:r.height,height:o,bottom:0,left:0,position:"absolute"}:{height:r.height,width:o},[r.height,r.orientation,o]),c=[r.orientation==="vertical"?{position:"absolute",left:0,bottom:0}:r.layoutIndicator,{backgroundColor:r.indicatorColor,borderRadius:r.height/2,...r.isGradient&&r.gradientColor?{backgroundImage:r.gradientColor}:null},h,r.indicatorStyle,n];return e.jsx(j.View,{style:c})},d=a.memo(n=>{const{tokensOverride:r,percentage:o,strokeWidth:h,color:c,trackColor:X,pivotText:q,pivotColor:O,textColor:J,inactive:K,showPivot:Q,animated:U,transition:Y,animationDuration:Z,style:ee,pivotStyle:C,indicatorStyle:S,orientation:te,children:re,...ne}=n,t=ve(r),x=xe(me(o??t.defaults.percentage),0,100),u=he(h,t.sizing.height)??t.sizing.height,P=K??t.defaults.inactive,v=te??"horizontal",oe=v==="vertical"?!1:Q??t.defaults.showPivot,A=(U??Y??t.defaults.transition)&&!P,y=Math.max(0,Z??t.defaults.animationDuration),g=le(c)&&je.test(c),b=X??t.colors.track,E=P?t.colors.track:g?void 0:c??t.colors.indicator,k=O??(g?P?t.colors.track:t.colors.indicator:E),D=J??t.colors.pivotText,m=q??`${x}%`,F=oe&&m!==null&&m!==!1,p=a.useRef(new j.Value(x)).current;a.useEffect(()=>{if(A&&y>0){const i=j.timing(p,{toValue:x,duration:y,useNativeDriver:!1});return i.start(),()=>i.stop()}else p.setValue(x)},[x,A,y,p]);const[R,_]=a.useState({track:0,pivot:0}),ie=a.useCallback(i=>{const s=i.nativeEvent.layout.width;_(l=>l.track===s?l:{...l,track:s})},[]),w=a.useCallback(i=>{const s=i.nativeEvent.layout.width;_(l=>l.pivot===s?l:{...l,pivot:s})},[]),se=[t.layout.track,v==="vertical"?{width:u,height:"100%",backgroundColor:b,borderRadius:u/2}:{height:u,backgroundColor:b,borderRadius:u/2}],ae=a.useMemo(()=>{if(!F)return null;const{track:i,pivot:s}=R,l=[t.layout.pivot,{bottom:u+t.sizing.pivotPaddingVertical*2,backgroundColor:k,paddingHorizontal:t.sizing.pivotPaddingHorizontal,paddingVertical:t.sizing.pivotPaddingVertical,borderRadius:u,opacity:i>0?1:0}];let B=null;if(i>0&&s>0){const M=s/2/i*100,z=(i-s/2)/i*100;M<z?B={transform:[{translateX:p.interpolate({inputRange:[0,M,z,100],outputRange:[0,0,i-s,i-s],extrapolate:"clamp"})}]}:B={transform:[{translateX:(i-s)/2}]}}return e.jsx(j.View,{style:[l,B],pointerEvents:"none",onLayout:w,children:ue(m)?e.jsx(pe,{style:[t.layout.pivotText,{color:D,fontSize:t.typography.pivotFontSize},C],children:m}):m})},[p,F,u,R,w,m,C,k,D,t.layout.pivot,t.layout.pivotText,t.sizing.pivotPaddingHorizontal,t.sizing.pivotPaddingVertical,t.typography.pivotFontSize]),ce=a.useMemo(()=>({animatedValue:p,orientation:v,height:u,indicatorColor:E,indicatorStyle:S,isGradient:g,gradientColor:g?c:void 0,layoutIndicator:t.layout.indicator}),[p,c,u,S,g,v,E,t.layout.indicator]);return e.jsx(I.Provider,{value:ce,children:e.jsxs(T,{style:ee,accessibilityRole:"progressbar",accessibilityValue:{min:0,max:100,now:x},...ne,children:[e.jsx(T,{style:se,onLayout:F?ie:void 0,children:re??e.jsx(fe,{})}),ae]})})});d.displayName="Progress";const L=()=>e.jsx(d,{percentage:50}),Pe=`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`,ye={code:Pe,sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},title:"基础用法",identifier:"progress-base",lang:"tsx",meta:{title:"基础用法"}},W=()=>e.jsx(d,{strokeWidth:8,percentage:30}),Ee=`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`,Fe={code:Ee,sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},title:"线条粗细",identifier:"progress-stroke",lang:"tsx",meta:{title:"线条粗细"}},$=()=>e.jsxs(f,{direction:"vertical",gap:12,children:[e.jsx(d,{percentage:50,inactive:!0}),e.jsx(d,{percentage:30,inactive:!0,showPivot:!1})]}),Be=`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},title:"置灰",identifier:"progress-inactive",lang:"tsx",meta:{title:"置灰"}},H=()=>e.jsxs(f,{direction:"vertical",gap:12,children:[e.jsx(d,{percentage:25,color:"#f97316",pivotText:"橙色"}),e.jsx(d,{percentage:50,color:"#ef4444",pivotText:"红色"}),e.jsx(d,{percentage:75,showPivot:!1,color:"#8b5cf6"})]}),Se=`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},title:"自定义样式",identifier:"progress-color",lang:"tsx",meta:{title:"自定义样式"}},be=(n,r,o)=>n<r?r:n>o?o:n,G=()=>{const[n,r]=N.useState(50),o=h=>{r(c=>be(c+h,0,100))};return e.jsxs(f,{direction:"vertical",gap:12,children:[e.jsx(d,{percentage:n,transition:!0,animationDuration:300}),e.jsxs(f,{gap:12,children:[e.jsx(V,{size:"small",onPress:()=>o(-10),children:"减少"}),e.jsx(V,{size:"small",type:"primary",onPress:()=>o(10),children:"增加"})]})]})},ke=`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"过渡效果",identifier:"progress-transition",lang:"tsx",meta:{title:"过渡效果"}},Re=function({previewer:n=()=>null,api:r=()=>null}){const o=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"progress-进度条","data-anchor":"progress-进度条",children:"Progress 进度条"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于展示当前任务的完成进度，提供清晰的 API 语义。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Progress } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"percentage"})," 控制进度百分比。"]}),e.jsx("div",{children:e.jsx(o,{...ye,children:e.jsx(L,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["可通过 ",e.jsx("code",{children:"children"})," 传入自定义填充内容。"]})}),e.jsx("h3",{id:"线条粗细","data-anchor":"线条粗细",children:"线条粗细"}),e.jsxs("p",{children:[e.jsx("code",{children:"strokeWidth"})," 可调整进度条高度。"]}),e.jsx("div",{children:e.jsx(o,{...Fe,children:e.jsx(W,{})})}),e.jsx("h3",{id:"置灰状态","data-anchor":"置灰状态",children:"置灰状态"}),e.jsxs("p",{children:[e.jsx("code",{children:"inactive"})," 会让进度条与标签变为灰色。"]}),e.jsx("div",{children:e.jsx(o,{...Ce,children:e.jsx($,{})})}),e.jsx("h3",{id:"自定义颜色与文案","data-anchor":"自定义颜色与文案",children:"自定义颜色与文案"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"color"}),"、",e.jsx("code",{children:"pivotText"}),"、",e.jsx("code",{children:"showPivot"})," 等属性定制外观。"]}),e.jsx("div",{children:e.jsx(o,{...Ae,children:e.jsx(H,{})})}),e.jsx("h3",{id:"过渡效果","data-anchor":"过渡效果",children:"过渡效果"}),e.jsxs("p",{children:["默认开启过渡动画，可通过 ",e.jsx("code",{children:"transition"})," 开关控制。"]}),e.jsx("div",{children:e.jsx(o,{...De,children:e.jsx(G,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"percentage"})}),e.jsx("td",{children:"进度百分比，0-100"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"strokeWidth"})}),e.jsxs("td",{children:["进度条高度，接受数字或 ",e.jsx("code",{children:"px"})," 字符串"]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.sizes.height"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"进度条颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.indicator"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"trackColor"})}),e.jsx("td",{children:"轨道颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.track"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactive"})}),e.jsx("td",{children:"是否置灰"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showPivot"})}),e.jsx("td",{children:"是否展示进度文案"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"orientation"})}),e.jsx("td",{children:"方向（垂直时不展示 pivot）"}),e.jsx("td",{children:e.jsx("code",{children:"horizontal | vertical"})}),e.jsx("td",{children:e.jsx("code",{children:"horizontal"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pivotText"})}),e.jsx("td",{children:"自定义进度文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsxs("code",{children:["$","{","percentage","}","%"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pivotColor"})}),e.jsx("td",{children:"文案背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"与进度条颜色一致"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textColor"})}),e.jsx("td",{children:"文案文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.pivotText"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pivotStyle"})}),e.jsx("td",{children:"文案样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indicatorStyle"})}),e.jsx("td",{children:"进度条样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"transition"})}),e.jsx("td",{children:"是否开启过渡动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animationDuration"})}),e.jsx("td",{children:"过渡动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前渐变色可通过传入 CSS ",e.jsx("code",{children:"linear-gradient"})," 字符串的方式在 RN Web 环境下生效；在纯原生端建议自定义 ",e.jsx("code",{children:"indicatorStyle"})," 以实现渐变效果。"]})})]})})},_e=[{Component:L,key:"progress-base",sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress percentage={50} />
)
`}},title:"基础用法",identifier:"progress-base",lang:"tsx",meta:{title:"基础用法"}},{Component:W,key:"progress-stroke",sources:{_:{tsx:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress } from 'react-native-system-ui'

export default () => (
  <Progress strokeWidth={8} percentage={30} />
)
`}},title:"线条粗细",identifier:"progress-stroke",lang:"tsx",meta:{title:"线条粗细"}},{Component:$,key:"progress-inactive",sources:{_:{tsx:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={50} inactive />
    <Progress percentage={30} inactive showPivot={false} />
  </Space>
)
`}},title:"置灰",identifier:"progress-inactive",lang:"tsx",meta:{title:"置灰"}},{Component:H,key:"progress-color",sources:{_:{tsx:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Progress, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Progress percentage={25} color="#f97316" pivotText="橙色" />
    <Progress percentage={50} color="#ef4444" pivotText="红色" />
    <Progress percentage={75} showPivot={false} color="#8b5cf6" />
  </Space>
)
`}},title:"自定义样式",identifier:"progress-color",lang:"tsx",meta:{title:"自定义样式"}},{Component:G,key:"progress-transition",sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"过渡效果",identifier:"progress-transition",lang:"tsx",meta:{title:"过渡效果"}}],we={simulator:{compact:!1}},Me=[{depth:1,text:"Progress 进度条",id:"progress-进度条"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"线条粗细",id:"线条粗细"},{depth:3,text:"置灰状态",id:"置灰状态"},{depth:3,text:"自定义颜色与文案",id:"自定义颜色与文案"},{depth:3,text:"过渡效果",id:"过渡效果"},{depth:2,text:"API",id:"api"}],ze="/docs/components/progress.md",Te="Progress 进度条",Ve="1770197128000",et=n=>n.children({MdContent:Re,demos:_e,frontmatter:we,slugs:Me,filePath:ze,title:Te,updatedTime:Ve});export{Re as MdContent,et as default,_e as demos,ze as filePath,we as frontmatter,Me as slugs,Te as title,Ve as updatedTime};
