import{j as e,R as a}from"./main-BAeJvGa4.js";import{C as i}from"./Circle-Dp6MRBbR.js";import{S as n}from"./Space-iE7quMPG.js";import{S as u}from"./Slider-B-kBbvzy.js";import"./createComponentTokensHook-C-NxqfEf.js";import"./Animated-BC0ZtReY.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-BQ9E3_S9.js";import"./index-Beiuxnvg.js";import"./index-OVYHKMmk.js";import"./number-D4GYRO_w.js";import"./index-DkwLlxr6.js";import"./useAriaPress-B7BjoQga.js";import"./useLabel-BW9XyE5e.js";function s(){return e.jsx(i,{rate:70,children:"70%"})}const o=`import React from 'react'

import { Circle } from 'react-native-system-ui'

export default function CircleBasicDemo() {
  return (
    <Circle rate={70}>70%</Circle>
  )
}

`,h={code:o,sources:{_:{tsx:`import React from 'react'

import { Circle } from 'react-native-system-ui'

export default function CircleBasicDemo() {
  return (
    <Circle rate={70}>70%</Circle>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Circle } from 'react-native-system-ui'

export default function CircleBasicDemo() {
  return (
    <Circle rate={70}>70%</Circle>
  )
}

`}},title:"基础用法",identifier:"circle-basic",lang:"tsx",meta:{title:"基础用法"}};function l(){return e.jsxs(n,{gap:16,children:[e.jsx(i,{rate:40,size:96,strokeWidth:8,color:"#07c160",children:"40%"}),e.jsx(i,{rate:80,size:96,strokeWidth:8,color:"#ee0a24",clockwise:!1,children:"80%"})]})}const x=`import React from 'react'

import { Circle, Space } from 'react-native-system-ui'

export default function CircleCustomDemo() {
  return (
    <Space gap={16}>
      <Circle rate={40} size={96} strokeWidth={8} color="#07c160">
        40%
      </Circle>
      <Circle rate={80} size={96} strokeWidth={8} color="#ee0a24" clockwise={false}>
        80%
      </Circle>
    </Space>
  )
}

`,m={code:x,sources:{_:{tsx:`import React from 'react'

import { Circle, Space } from 'react-native-system-ui'

export default function CircleCustomDemo() {
  return (
    <Space gap={16}>
      <Circle rate={40} size={96} strokeWidth={8} color="#07c160">
        40%
      </Circle>
      <Circle rate={80} size={96} strokeWidth={8} color="#ee0a24" clockwise={false}>
        80%
      </Circle>
    </Space>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Circle, Space } from 'react-native-system-ui'

export default function CircleCustomDemo() {
  return (
    <Space gap={16}>
      <Circle rate={40} size={96} strokeWidth={8} color="#07c160">
        40%
      </Circle>
      <Circle rate={80} size={96} strokeWidth={8} color="#ee0a24" clockwise={false}>
        80%
      </Circle>
    </Space>
  )
}

`}},title:"自定义样式",identifier:"circle-custom",lang:"tsx",meta:{title:"自定义样式"}};function d(){const[t,c]=a.useState(30);return e.jsxs(n,{direction:"vertical",gap:16,children:[e.jsxs(i,{rate:t,size:120,strokeWidth:10,children:[t,"%"]}),e.jsx(u,{value:t,onChange:r=>c(r)})]})}const p=`import React from 'react'

import { Circle, Slider, Space } from 'react-native-system-ui'

export default function CircleDynamicDemo() {
  const [rate, setRate] = React.useState(30)

  return (
    <Space direction="vertical" gap={16}>
      <Circle rate={rate} size={120} strokeWidth={10}>
        {rate}%
      </Circle>
      <Slider value={rate} onChange={value => setRate(value as number)} />
    </Space>
  )
}

`,j={code:p,sources:{_:{tsx:`import React from 'react'

import { Circle, Slider, Space } from 'react-native-system-ui'

export default function CircleDynamicDemo() {
  const [rate, setRate] = React.useState(30)

  return (
    <Space direction="vertical" gap={16}>
      <Circle rate={rate} size={120} strokeWidth={10}>
        {rate}%
      </Circle>
      <Slider value={rate} onChange={value => setRate(value as number)} />
    </Space>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Circle, Slider, Space } from 'react-native-system-ui'

export default function CircleDynamicDemo() {
  const [rate, setRate] = React.useState(30)

  return (
    <Space direction="vertical" gap={16}>
      <Circle rate={rate} size={120} strokeWidth={10}>
        {rate}%
      </Circle>
      <Slider value={rate} onChange={value => setRate(value as number)} />
    </Space>
  )
}

`}},title:"动态控制",identifier:"circle-dynamic",lang:"tsx",meta:{title:"动态控制"}},C=function({previewer:t=()=>null,api:c=()=>null}){const r=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"circle-环形进度条","data-anchor":"circle-环形进度条",children:"Circle 环形进度条"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于展示任务进度的环形进度条。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { Circle } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(r,{...h,children:e.jsx(s,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsx("div",{children:e.jsx(r,{...m,children:e.jsx(l,{})})}),e.jsx("h3",{id:"动态控制","data-anchor":"动态控制",children:"动态控制"}),e.jsx("div",{children:e.jsx(r,{...j,children:e.jsx(d,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rate"})}),e.jsx("td",{children:"进度百分比（0-100）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"圆环尺寸"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"100"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"strokeWidth"})}),e.jsx("td",{children:"圆环宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"6"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"进度条颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.color"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"layerColor"})}),e.jsx("td",{children:"轨道颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.colors.layerColor"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fill"})}),e.jsx("td",{children:"圆环内部填充色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"transparent"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clockwise"})}),e.jsx("td",{children:"是否顺时针"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"startPosition"})}),e.jsx("td",{children:"起始位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'right' | 'bottom' | 'left'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lineCap"})}),e.jsx("td",{children:"线帽"}),e.jsx("td",{children:e.jsx("code",{children:"'round' | 'butt' | 'square'"})}),e.jsx("td",{children:e.jsx("code",{children:"'round'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animated"})}),e.jsx("td",{children:"是否开启过渡动画（Native 端生效）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animationDuration"})}),e.jsx("td",{children:"动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"圆环中间内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Web 端默认使用 ",e.jsx("code",{children:"conic-gradient"})," 实现圆环；React Native 端依赖 ",e.jsx("code",{children:"react-native-svg"}),"。"]})})]})})},f=[{Component:s,key:"circle-basic",sources:{_:{tsx:`import React from 'react'

import { Circle } from 'react-native-system-ui'

export default function CircleBasicDemo() {
  return (
    <Circle rate={70}>70%</Circle>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Circle } from 'react-native-system-ui'

export default function CircleBasicDemo() {
  return (
    <Circle rate={70}>70%</Circle>
  )
}

`}},title:"基础用法",identifier:"circle-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:l,key:"circle-custom",sources:{_:{tsx:`import React from 'react'

import { Circle, Space } from 'react-native-system-ui'

export default function CircleCustomDemo() {
  return (
    <Space gap={16}>
      <Circle rate={40} size={96} strokeWidth={8} color="#07c160">
        40%
      </Circle>
      <Circle rate={80} size={96} strokeWidth={8} color="#ee0a24" clockwise={false}>
        80%
      </Circle>
    </Space>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Circle, Space } from 'react-native-system-ui'

export default function CircleCustomDemo() {
  return (
    <Space gap={16}>
      <Circle rate={40} size={96} strokeWidth={8} color="#07c160">
        40%
      </Circle>
      <Circle rate={80} size={96} strokeWidth={8} color="#ee0a24" clockwise={false}>
        80%
      </Circle>
    </Space>
  )
}

`}},title:"自定义样式",identifier:"circle-custom",lang:"tsx",meta:{title:"自定义样式"}},{Component:d,key:"circle-dynamic",sources:{_:{tsx:`import React from 'react'

import { Circle, Slider, Space } from 'react-native-system-ui'

export default function CircleDynamicDemo() {
  const [rate, setRate] = React.useState(30)

  return (
    <Space direction="vertical" gap={16}>
      <Circle rate={rate} size={120} strokeWidth={10}>
        {rate}%
      </Circle>
      <Slider value={rate} onChange={value => setRate(value as number)} />
    </Space>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Circle, Slider, Space } from 'react-native-system-ui'

export default function CircleDynamicDemo() {
  const [rate, setRate] = React.useState(30)

  return (
    <Space direction="vertical" gap={16}>
      <Circle rate={rate} size={120} strokeWidth={10}>
        {rate}%
      </Circle>
      <Slider value={rate} onChange={value => setRate(value as number)} />
    </Space>
  )
}

`}},title:"动态控制",identifier:"circle-dynamic",lang:"tsx",meta:{title:"动态控制"}}],F={simulator:{compact:!1}},v=[{depth:1,text:"Circle 环形进度条",id:"circle-环形进度条"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"动态控制",id:"动态控制"},{depth:2,text:"API",id:"api"}],y="/docs/components/circle.md",S="Circle 环形进度条",E="1766057058000",L=t=>t.children({MdContent:C,demos:f,frontmatter:F,slugs:v,filePath:y,title:S,updatedTime:E});export{C as MdContent,L as default,f as demos,y as filePath,F as frontmatter,v as slugs,S as title,E as updatedTime};
