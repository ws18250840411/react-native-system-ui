import{R as i,j as e,V as a}from"./main-BAeJvGa4.js";import{S as r}from"./Stepper-awon_Tca.js";import{T as x}from"./index-DyP2Y3u_.js";import"./createComponentTokensHook-C-NxqfEf.js";import"./number-D4GYRO_w.js";import"./useControllableValue-Dp7VzsJy.js";import"./promise-BSLZg49p.js";import"./index-DkwLlxr6.js";import"./extends-CF3RwP-h.js";import"./index-C2RJyUbd.js";import"./index-BQ9E3_S9.js";import"./index-CJrLMJTa.js";import"./index-Beiuxnvg.js";import"./Portal-DpGMOUoW.js";import"./Overlay-DsrHAOal.js";import"./Loading-CpmDHEQC.js";import"./index-tIQ9IWf_.js";import"./Checked-Cm_Ob0Fm.js";import"./IconBase-BXXvwLgA.js";import"./Close-Cz6HpK28.js";import"./index-DNlyIA0F.js";import"./Animated-BC0ZtReY.js";import"./index-OVYHKMmk.js";import"./SafeAreaView-DvA24sN_.js";import"./useSafeAreaPadding-CHurfSaN.js";import"./useOverlayStack-D2UM4R66.js";import"./animation-BpxpeSKC.js";import"./useAriaPress-B7BjoQga.js";function d(){const[n,u]=i.useState(1),t=s=>u(s??0);return e.jsxs(a,{style:{gap:16},children:[e.jsx(r,{value:n,onChange:t}),e.jsx(r,{defaultValue:5,min:1,max:10})]})}const m=`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperBasicDemo() {
  const [value, setValue] = React.useState(1)
  const onChange = (v: number | null) => setValue(v ?? 0)
  return (
    <View style={{ gap: 16 }}>
      <Stepper value={value} onChange={onChange} />
      <Stepper defaultValue={5} min={1} max={10} />
    </View>
  )
}
`,j={code:m,sources:{_:{tsx:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperBasicDemo() {
  const [value, setValue] = React.useState(1)
  const onChange = (v: number | null) => setValue(v ?? 0)
  return (
    <View style={{ gap: 16 }}>
      <Stepper value={value} onChange={onChange} />
      <Stepper defaultValue={5} min={1} max={10} />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperBasicDemo() {
  const [value, setValue] = React.useState(1)
  const onChange = (v: number | null) => setValue(v ?? 0)
  return (
    <View style={{ gap: 16 }}>
      <Stepper value={value} onChange={onChange} />
      <Stepper defaultValue={5} min={1} max={10} />
    </View>
  )
}
`}},title:"基础用法",identifier:"stepper-basic",lang:"tsx",meta:{title:"基础用法"}};function l(){const[n,u]=i.useState(1),[t,s]=i.useState(5);return e.jsxs(a,{style:{gap:16},children:[e.jsx(r,{value:n,step:2,onChange:c=>u(c??0)}),e.jsx(r,{value:t,min:5,max:8,onChange:c=>s(c??0)})]})}const v=`import React from 'react'
import { View } from 'react-native'

import { Stepper } from 'react-native-system-ui'

export default function StepperRangeDemo() {
  const [stepValue, setStepValue] = React.useState(1)
  const [rangeValue, setRangeValue] = React.useState(5)

  return (
    <View style={{ gap: 16 }}>
      <Stepper value={stepValue} step={2} onChange={v => setStepValue(v ?? 0)} />
      <Stepper value={rangeValue} min={5} max={8} onChange={v => setRangeValue(v ?? 0)} />
    </View>
  )
}

`,f={code:v,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Stepper } from 'react-native-system-ui'

export default function StepperRangeDemo() {
  const [stepValue, setStepValue] = React.useState(1)
  const [rangeValue, setRangeValue] = React.useState(5)

  return (
    <View style={{ gap: 16 }}>
      <Stepper value={stepValue} step={2} onChange={v => setStepValue(v ?? 0)} />
      <Stepper value={rangeValue} min={5} max={8} onChange={v => setRangeValue(v ?? 0)} />
    </View>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Stepper } from 'react-native-system-ui'

export default function StepperRangeDemo() {
  const [stepValue, setStepValue] = React.useState(1)
  const [rangeValue, setRangeValue] = React.useState(5)

  return (
    <View style={{ gap: 16 }}>
      <Stepper value={stepValue} step={2} onChange={v => setStepValue(v ?? 0)} />
      <Stepper value={rangeValue} min={5} max={8} onChange={v => setRangeValue(v ?? 0)} />
    </View>
  )
}

`}},title:"步长与范围",identifier:"stepper-range",lang:"tsx",meta:{title:"步长与范围"}};function o(){const[n,u]=i.useState(2.5),t=s=>u(s??0);return e.jsxs(a,{style:{gap:12},children:[e.jsx(r,{value:n,step:.25,decimalLength:2,min:0,max:10,onChange:t}),e.jsx(r,{theme:"round",defaultValue:3,buttonSize:28,inputWidth:40})]})}const g=`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  const onPriceChange = (v: number | null) => setPrice(v ?? 0)
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={onPriceChange}
      />
      <Stepper theme="round" defaultValue={3} buttonSize={28} inputWidth={40} />
    </View>
  )
}
`,F={code:g,sources:{_:{tsx:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  const onPriceChange = (v: number | null) => setPrice(v ?? 0)
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={onPriceChange}
      />
      <Stepper theme="round" defaultValue={3} buttonSize={28} inputWidth={40} />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  const onPriceChange = (v: number | null) => setPrice(v ?? 0)
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={onPriceChange}
      />
      <Stepper theme="round" defaultValue={3} buttonSize={28} inputWidth={40} />
    </View>
  )
}
`}},title:"自定义精度与样式",identifier:"stepper-custom",lang:"tsx",meta:{title:"自定义精度与样式"}};function p(){return e.jsxs(a,{style:{gap:16},children:[e.jsx(r,{defaultValue:2,disabled:!0}),e.jsx(r,{defaultValue:2,disableInput:!0})]})}const V=`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Stepper defaultValue={2} disabled />
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
`,S={code:V,sources:{_:{tsx:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Stepper defaultValue={2} disabled />
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Stepper defaultValue={2} disabled />
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
`}},title:"禁用与禁用输入",identifier:"stepper-disabled",lang:"tsx",meta:{title:"禁用与禁用输入"}};function h(){const[n,u]=i.useState(1);return e.jsx(a,{style:{gap:16},children:e.jsx(r,{value:n,onChange:t=>u(t??0),beforeChange:()=>{const t=x.loading({message:"校验中...",forbidClick:!0,duration:0});return new Promise(s=>{setTimeout(()=>{t.config({type:"success",message:"校验通过",duration:800}),s(!0)},500)})}})})}const C=`import React from 'react'
import { View } from 'react-native'

import { Stepper, Toast } from 'react-native-system-ui'

export default function StepperBeforeChangeDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <View style={{ gap: 16 }}>
      <Stepper
        value={value}
        onChange={v => setValue(v ?? 0)}
        beforeChange={() => {
          const toast = Toast.loading({
            message: '校验中...',
            forbidClick: true,
            duration: 0,
          })
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              toast.config({ type: 'success', message: '校验通过', duration: 800 })
              resolve(true)
            }, 500)
          })
        }}
      />
    </View>
  )
}

`,y={code:C,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Stepper, Toast } from 'react-native-system-ui'

export default function StepperBeforeChangeDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <View style={{ gap: 16 }}>
      <Stepper
        value={value}
        onChange={v => setValue(v ?? 0)}
        beforeChange={() => {
          const toast = Toast.loading({
            message: '校验中...',
            forbidClick: true,
            duration: 0,
          })
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              toast.config({ type: 'success', message: '校验通过', duration: 800 })
              resolve(true)
            }, 500)
          })
        }}
      />
    </View>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Stepper, Toast } from 'react-native-system-ui'

export default function StepperBeforeChangeDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <View style={{ gap: 16 }}>
      <Stepper
        value={value}
        onChange={v => setValue(v ?? 0)}
        beforeChange={() => {
          const toast = Toast.loading({
            message: '校验中...',
            forbidClick: true,
            duration: 0,
          })
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              toast.config({ type: 'success', message: '校验通过', duration: 800 })
              resolve(true)
            }, 500)
          })
        }}
      />
    </View>
  )
}

`}},title:"异步变更",identifier:"stepper-before-change",lang:"tsx",meta:{title:"异步变更"}},E=function({previewer:n=()=>null,api:u=()=>null}){const t=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"stepper-步进器","data-anchor":"stepper-步进器",children:"Stepper 步进器"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在允许的区间内通过加减按钮或输入框调整数值，适合价格、数量调节等场景。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { Stepper } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(t,{...j,children:e.jsx(d,{})})}),e.jsx("h3",{id:"步长与范围","data-anchor":"步长与范围",children:"步长与范围"}),e.jsx("div",{children:e.jsx(t,{...f,children:e.jsx(l,{})})}),e.jsx("h3",{id:"自定义精度与样式","data-anchor":"自定义精度与样式",children:"自定义精度与样式"}),e.jsx("div",{children:e.jsx(t,{...F,children:e.jsx(o,{})})}),e.jsx("h3",{id:"禁用与禁用输入","data-anchor":"禁用与禁用输入",children:"禁用与禁用输入"}),e.jsx("div",{children:e.jsx(t,{...S,children:e.jsx(p,{})})}),e.jsx("h3",{id:"异步变更","data-anchor":"异步变更",children:"异步变更"}),e.jsx("div",{children:e.jsx(t,{...y,children:e.jsx(h,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前输入的值"}),e.jsx("td",{children:e.jsx("code",{children:"number | null"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认值"}),e.jsx("td",{children:e.jsx("code",{children:"number | null"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"min"})}),e.jsx("td",{children:"最小值"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"max"})}),e.jsx("td",{children:"最大值"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"step"})}),e.jsx("td",{children:"步长，每次点击时改变的值"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoFixed"})}),e.jsxs("td",{children:["超出范围时是否自动修正到 ",e.jsx("code",{children:"min/max"}),"（对齐 Vant ",e.jsx("code",{children:"auto-fixed"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeChange"})}),e.jsxs("td",{children:["变更前拦截（对齐 Vant ",e.jsx("code",{children:"before-change"}),"），返回 ",e.jsx("code",{children:"false"})," 可阻止变更，支持 Promise"]}),e.jsx("td",{children:e.jsx("code",{children:"(value) => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsxs("td",{children:["标识符，可在 ",e.jsx("code",{children:"onChange"})," 回调参数中获取"]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inputWidth"})}),e.jsxs("td",{children:["输入框宽度，默认单位为 ",e.jsx("code",{children:"px"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"32px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"buttonSize"})}),e.jsxs("td",{children:["按钮大小以及输入框高度，默认单位为 ",e.jsx("code",{children:"px"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"28px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"decimalLength"})}),e.jsx("td",{children:"固定显示的小数位数"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"theme"})}),e.jsx("td",{children:"样式风格"}),e.jsx("td",{children:e.jsx("code",{children:"'default' | 'round'"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"输入框占位提示文字"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"integer"})}),e.jsx("td",{children:"是否只允许输入整数"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用步进器"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disablePlus"})}),e.jsx("td",{children:"是否禁用增加按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disableMinus"})}),e.jsx("td",{children:"是否禁用减少按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disableInput"})}),e.jsx("td",{children:"是否禁用输入框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showPlus"})}),e.jsx("td",{children:"是否显示增加按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showMinus"})}),e.jsx("td",{children:"是否显示减少按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showInput"})}),e.jsx("td",{children:"是否显示输入框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"longPress"})}),e.jsx("td",{children:"是否开启长按手势"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"allowEmpty"})}),e.jsx("td",{children:"是否允许输入的值为空"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inputProps"})}),e.jsxs("td",{children:["透传给 ",e.jsx("code",{children:"TextInput"})," 的属性"]}),e.jsx("td",{children:e.jsx("code",{children:"TextInputProps"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inputStyle"})}),e.jsx("td",{children:"输入框样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"buttonStyle"})}),e.jsx("td",{children:"按钮样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击输入框时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"当绑定值变化时触发的事件"}),e.jsx("td",{children:e.jsxs("code",{children:["value: number | null, detail?: ","{"," name?: string ","}"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOverlimit"})}),e.jsx("td",{children:"点击不可用的按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"type: 'plus' | 'minus'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPlus"})}),e.jsx("td",{children:"点击增加按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent, value: number | null"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onMinus"})}),e.jsx("td",{children:"点击减少按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent, value: number | null"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFocus"})}),e.jsx("td",{children:"输入框聚焦时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: NativeSyntheticEvent<TextInputFocusEventData>"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onBlur"})}),e.jsx("td",{children:"输入框失焦时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: NativeSyntheticEvent<TextInputFocusEventData>"})})]})]})]}),e.jsx("h2",{id:"stepperref","data-anchor":"stepperref",children:"StepperRef"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"focus()"})}),e.jsx("td",{children:"获取焦点"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blur()"})}),e.jsx("td",{children:"失去焦点"})]})]})]}),e.jsx("h2",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("p",{children:"组件导出以下类型定义："}),e.jsx(t,{code:"import type { StepperTheme, StepperInstance } from 'react-native-system-ui'",lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["支持通过主题的 ",e.jsx("code",{children:"components.stepper"})," 覆盖 tokens，统一控制按钮尺寸、配色等设计语言。"]})})]})})},B=[{Component:d,key:"stepper-basic",sources:{_:{tsx:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperBasicDemo() {
  const [value, setValue] = React.useState(1)
  const onChange = (v: number | null) => setValue(v ?? 0)
  return (
    <View style={{ gap: 16 }}>
      <Stepper value={value} onChange={onChange} />
      <Stepper defaultValue={5} min={1} max={10} />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperBasicDemo() {
  const [value, setValue] = React.useState(1)
  const onChange = (v: number | null) => setValue(v ?? 0)
  return (
    <View style={{ gap: 16 }}>
      <Stepper value={value} onChange={onChange} />
      <Stepper defaultValue={5} min={1} max={10} />
    </View>
  )
}
`}},title:"基础用法",identifier:"stepper-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:l,key:"stepper-range",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Stepper } from 'react-native-system-ui'

export default function StepperRangeDemo() {
  const [stepValue, setStepValue] = React.useState(1)
  const [rangeValue, setRangeValue] = React.useState(5)

  return (
    <View style={{ gap: 16 }}>
      <Stepper value={stepValue} step={2} onChange={v => setStepValue(v ?? 0)} />
      <Stepper value={rangeValue} min={5} max={8} onChange={v => setRangeValue(v ?? 0)} />
    </View>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Stepper } from 'react-native-system-ui'

export default function StepperRangeDemo() {
  const [stepValue, setStepValue] = React.useState(1)
  const [rangeValue, setRangeValue] = React.useState(5)

  return (
    <View style={{ gap: 16 }}>
      <Stepper value={stepValue} step={2} onChange={v => setStepValue(v ?? 0)} />
      <Stepper value={rangeValue} min={5} max={8} onChange={v => setRangeValue(v ?? 0)} />
    </View>
  )
}

`}},title:"步长与范围",identifier:"stepper-range",lang:"tsx",meta:{title:"步长与范围"}},{Component:o,key:"stepper-custom",sources:{_:{tsx:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  const onPriceChange = (v: number | null) => setPrice(v ?? 0)
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={onPriceChange}
      />
      <Stepper theme="round" defaultValue={3} buttonSize={28} inputWidth={40} />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperCustomDemo() {
  const [price, setPrice] = React.useState(2.5)
  const onPriceChange = (v: number | null) => setPrice(v ?? 0)
  return (
    <View style={{ gap: 12 }}>
      <Stepper
        value={price}
        step={0.25}
        decimalLength={2}
        min={0}
        max={10}
        onChange={onPriceChange}
      />
      <Stepper theme="round" defaultValue={3} buttonSize={28} inputWidth={40} />
    </View>
  )
}
`}},title:"自定义精度与样式",identifier:"stepper-custom",lang:"tsx",meta:{title:"自定义精度与样式"}},{Component:p,key:"stepper-disabled",sources:{_:{tsx:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Stepper defaultValue={2} disabled />
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Stepper } from 'react-native-system-ui'
import { View } from 'react-native'

export default function StepperDisabledDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Stepper defaultValue={2} disabled />
      <Stepper defaultValue={2} disableInput />
    </View>
  )
}
`}},title:"禁用与禁用输入",identifier:"stepper-disabled",lang:"tsx",meta:{title:"禁用与禁用输入"}},{Component:h,key:"stepper-before-change",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Stepper, Toast } from 'react-native-system-ui'

export default function StepperBeforeChangeDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <View style={{ gap: 16 }}>
      <Stepper
        value={value}
        onChange={v => setValue(v ?? 0)}
        beforeChange={() => {
          const toast = Toast.loading({
            message: '校验中...',
            forbidClick: true,
            duration: 0,
          })
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              toast.config({ type: 'success', message: '校验通过', duration: 800 })
              resolve(true)
            }, 500)
          })
        }}
      />
    </View>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Stepper, Toast } from 'react-native-system-ui'

export default function StepperBeforeChangeDemo() {
  const [value, setValue] = React.useState(1)

  return (
    <View style={{ gap: 16 }}>
      <Stepper
        value={value}
        onChange={v => setValue(v ?? 0)}
        beforeChange={() => {
          const toast = Toast.loading({
            message: '校验中...',
            forbidClick: true,
            duration: 0,
          })
          return new Promise<boolean>(resolve => {
            setTimeout(() => {
              toast.config({ type: 'success', message: '校验通过', duration: 800 })
              resolve(true)
            }, 500)
          })
        }}
      />
    </View>
  )
}

`}},title:"异步变更",identifier:"stepper-before-change",lang:"tsx",meta:{title:"异步变更"}}],b={simulator:{compact:!1}},P=[{depth:1,text:"Stepper 步进器",id:"stepper-步进器"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"步长与范围",id:"步长与范围"},{depth:3,text:"自定义精度与样式",id:"自定义精度与样式"},{depth:3,text:"禁用与禁用输入",id:"禁用与禁用输入"},{depth:3,text:"异步变更",id:"异步变更"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:2,text:"StepperRef",id:"stepperref"},{depth:2,text:"类型定义",id:"类型定义"}],w="/docs/components/stepper.md",D="Stepper 步进器",R="1769570039000",ie=n=>n.children({MdContent:E,demos:B,frontmatter:b,slugs:P,filePath:w,title:D,updatedTime:R});export{E as MdContent,ie as default,B as demos,w as filePath,b as frontmatter,P as slugs,D as title,R as updatedTime};
