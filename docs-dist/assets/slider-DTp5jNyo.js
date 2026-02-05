import{R as a,j as e,V as d,s as g}from"./main-O6KZrSH_.js";import{S as u}from"./Slider-CYYKu7Ji.js";import{T as i}from"./index-CCLXK9-u.js";import{T as A}from"./createComponentTokensHook-KzOuLm4c.js";import"./useAriaPress-DMjZXFvR.js";import"./index-CJrLMJTa.js";import"./useLabel-DuXHT-I6.js";import"./number-BcSDXImJ.js";import"./index-DvCZppP1.js";import"./extends-CF3RwP-h.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./Loading-CdSfkQu4.js";import"./index-ANZ1PvOD.js";import"./Checked-Cm5uhjGy.js";import"./IconBase-DZr7C-P7.js";import"./Close-DpyqkEOI.js";import"./index-Cq_gACMg.js";import"./index-DcjI-aro.js";import"./Animated-qBs3E5U6.js";import"./index--voB8Asl.js";import"./index-C_v13XD0.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./useOverlayStack-Tvvid2F1.js";import"./animation-BpxpeSKC.js";function c(){const[t,r]=a.useState(10);return e.jsx(u,{value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const S=`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderBasicDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,C={code:S,sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderBasicDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderBasicDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"基础用法",identifier:"slider-basic",lang:"tsx",meta:{title:"基础用法"}};function v(){const[t,r]=a.useState([10,50]);return e.jsx(u,{range:!0,value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const b=`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState<[number, number]>([10, 50])
  return (
    <Slider
      range
      value={value}
      onChange={val => setValue(val as [number, number])}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,E={code:b,sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState<[number, number]>([10, 50])
  return (
    <Slider
      range
      value={value}
      onChange={val => setValue(val as [number, number])}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState<[number, number]>([10, 50])
  return (
    <Slider
      range
      value={value}
      onChange={val => setValue(val as [number, number])}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"双滑块",identifier:"slider-range",lang:"tsx",meta:{title:"双滑块"}};function h(){const[t,r]=a.useState(10);return e.jsx(u,{min:-50,max:50,value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const F=`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeLimitDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,D={code:F,sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeLimitDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeLimitDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"指定选择范围",identifier:"slider-range-limit",lang:"tsx",meta:{title:"指定选择范围"}};function m(){const[t,r]=a.useState(10);return e.jsx(u,{disabled:!0,value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const V=`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderDisabledDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      disabled
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,R={code:V,sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderDisabledDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      disabled
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderDisabledDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      disabled
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"禁用",identifier:"slider-disabled",lang:"tsx",meta:{title:"禁用"}};function x(){const[t,r]=a.useState(10);return e.jsx(u,{step:10,value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const T=`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,B={code:T,sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"指定步长",identifier:"slider-step",lang:"tsx",meta:{title:"指定步长"}};function f(){const[t,r]=a.useState(10);return e.jsx(u,{barHeight:4,activeColor:"#ee0a24",value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const P=`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStyleDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      barHeight={4}
      activeColor="#ee0a24"
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,_={code:P,sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStyleDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      barHeight={4}
      activeColor="#ee0a24"
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStyleDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      barHeight={4}
      activeColor="#ee0a24"
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"自定义样式",identifier:"slider-style",lang:"tsx",meta:{title:"自定义样式"}},l=g.create({button:{width:26,height:26,borderRadius:13,backgroundColor:"#ee0a24",alignItems:"center",justifyContent:"center"},text:{color:"#ffffff",fontSize:10,fontWeight:"600"}});function p(){const[t,r]=a.useState(10);return e.jsx(u,{buttonSize:26,button:({value:n})=>e.jsx(d,{style:l.button,children:e.jsx(A,{style:l.text,children:Array.isArray(n)?n[0]:n})}),value:t,onChange:n=>r(n),onChangeAfter:n=>i.info(`值：${Array.isArray(n)?n.join(" ~ "):n}`)})}const $=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ee0a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
})

export default function SliderButtonDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      buttonSize={26}
      button={({ value: v }) => (
        <View style={styles.button}>
          <Text style={styles.text}>{Array.isArray(v) ? v[0] : v}</Text>
        </View>
      )}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`,w={code:$,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ee0a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
})

export default function SliderButtonDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      buttonSize={26}
      button={({ value: v }) => (
        <View style={styles.button}>
          <Text style={styles.text}>{Array.isArray(v) ? v[0] : v}</Text>
        </View>
      )}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ee0a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
})

export default function SliderButtonDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      buttonSize={26}
      button={({ value: v }) => (
        <View style={styles.button}>
          <Text style={styles.text}>{Array.isArray(v) ? v[0] : v}</Text>
        </View>
      )}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"自定义按钮",identifier:"slider-button",lang:"tsx",meta:{title:"自定义按钮"}};function j(){const[t,r]=a.useState(50),[n,y]=a.useState([20,50]),o=s=>{i.info(`值：${Array.isArray(s)?s.join(" ~ "):s}`)};return e.jsxs(d,{style:{height:150,paddingLeft:30,flexDirection:"row"},children:[e.jsx(u,{vertical:!0,style:{marginRight:40,height:150},value:t,onChange:s=>r(s),onChangeAfter:o}),e.jsx(u,{range:!0,vertical:!0,style:{height:150},value:n,onChange:s=>y(s),onChangeAfter:o})]})}const M=`import React from 'react'
import { View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderVerticalDemo() {
  const [value1, setValue1] = React.useState(50)
  const [value2, setValue2] = React.useState<[number, number]>([20, 50])

  const onChangeAfter = (v: number | [number, number]) => {
    Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)
  }

  return (
    <View style={{ height: 150, paddingLeft: 30, flexDirection: 'row' }}>
      <Slider
        vertical
        style={{ marginRight: 40, height: 150 }}
        value={value1}
        onChange={val => setValue1(val as number)}
        onChangeAfter={onChangeAfter}
      />
      <Slider
        range
        vertical
        style={{ height: 150 }}
        value={value2}
        onChange={val => setValue2(val as [number, number])}
        onChangeAfter={onChangeAfter}
      />
    </View>
  )
}
`,N={code:M,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderVerticalDemo() {
  const [value1, setValue1] = React.useState(50)
  const [value2, setValue2] = React.useState<[number, number]>([20, 50])

  const onChangeAfter = (v: number | [number, number]) => {
    Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)
  }

  return (
    <View style={{ height: 150, paddingLeft: 30, flexDirection: 'row' }}>
      <Slider
        vertical
        style={{ marginRight: 40, height: 150 }}
        value={value1}
        onChange={val => setValue1(val as number)}
        onChangeAfter={onChangeAfter}
      />
      <Slider
        range
        vertical
        style={{ height: 150 }}
        value={value2}
        onChange={val => setValue2(val as [number, number])}
        onChangeAfter={onChangeAfter}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderVerticalDemo() {
  const [value1, setValue1] = React.useState(50)
  const [value2, setValue2] = React.useState<[number, number]>([20, 50])

  const onChangeAfter = (v: number | [number, number]) => {
    Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)
  }

  return (
    <View style={{ height: 150, paddingLeft: 30, flexDirection: 'row' }}>
      <Slider
        vertical
        style={{ marginRight: 40, height: 150 }}
        value={value1}
        onChange={val => setValue1(val as number)}
        onChangeAfter={onChangeAfter}
      />
      <Slider
        range
        vertical
        style={{ height: 150 }}
        value={value2}
        onChange={val => setValue2(val as [number, number])}
        onChangeAfter={onChangeAfter}
      />
    </View>
  )
}
`}},title:"垂直方向",identifier:"slider-vertical",lang:"tsx",meta:{title:"垂直方向"}},L=function({previewer:t=()=>null,api:r=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"slider-滑块","data-anchor":"slider-滑块",children:"Slider 滑块"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"滑动输入条，用于在给定的范围内选择一个值。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { Slider } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(n,{...C,children:e.jsx(c,{})})}),e.jsx("h3",{id:"双滑块","data-anchor":"双滑块",children:"双滑块"}),e.jsxs("p",{children:["添加 ",e.jsx("code",{children:"range"})," 属性就可以开启双滑块模式，确保 ",e.jsx("code",{children:"value"})," 的值是一个数组。"]}),e.jsx("div",{children:e.jsx(n,{...E,children:e.jsx(v,{})})}),e.jsx("h3",{id:"指定选择范围","data-anchor":"指定选择范围",children:"指定选择范围"}),e.jsx("div",{children:e.jsx(n,{...D,children:e.jsx(h,{})})}),e.jsx("h3",{id:"禁用","data-anchor":"禁用",children:"禁用"}),e.jsx("div",{children:e.jsx(n,{...R,children:e.jsx(m,{})})}),e.jsx("h3",{id:"指定步长","data-anchor":"指定步长",children:"指定步长"}),e.jsx("div",{children:e.jsx(n,{...B,children:e.jsx(x,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsx("div",{children:e.jsx(n,{..._,children:e.jsx(f,{})})}),e.jsx("h3",{id:"自定义按钮","data-anchor":"自定义按钮",children:"自定义按钮"}),e.jsx("div",{children:e.jsx(n,{...w,children:e.jsx(p,{})})}),e.jsx("h3",{id:"垂直方向","data-anchor":"垂直方向",children:"垂直方向"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"vertical"})," 属性后，滑块会垂直展示，且高度为 100% 父元素高度。"]}),e.jsx("div",{children:e.jsx(n,{...N,children:e.jsx(j,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前进度百分比，在双滑块模式下为数组格式"}),e.jsx("td",{children:e.jsx("code",{children:"number | [number, number]"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"max"})}),e.jsx("td",{children:"最大值"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"100"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"min"})}),e.jsx("td",{children:"最小值"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"step"})}),e.jsx("td",{children:"步长"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"barHeight"})}),e.jsxs("td",{children:["进度条高度，默认单位为 ",e.jsx("code",{children:"px"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"2px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"buttonSize"})}),e.jsxs("td",{children:["滑块按钮大小，默认单位为 ",e.jsx("code",{children:"px"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"24px"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"进度条激活态颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#3f45ff"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactiveColor"})}),e.jsx("td",{children:"进度条非激活态颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#e5e5e5"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"range"})}),e.jsx("td",{children:"是否开启双滑块模式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"reverse"})}),e.jsx("td",{children:"是否将进度条反转"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用滑块"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否为只读状态，只读状态下无法修改滑块的值"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"vertical"})}),e.jsx("td",{children:"是否垂直展示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"button"})}),e.jsx("td",{children:"自定义滑块按钮"}),e.jsx("td",{children:e.jsxs("code",{children:["ReactNode | (","{"," value ","}",") => ReactNode"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftButton"})}),e.jsx("td",{children:"自定义左侧滑块按钮（双滑块模式下）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightButton"})}),e.jsx("td",{children:"自定义右侧滑块按钮 （双滑块模式下）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ariaLabel"})}),e.jsx("td",{children:"无障碍 label"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'Slider'"})})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsxs("td",{children:["进度变化时",e.jsx("strong",{children:"实时触发"})]}),e.jsx("td",{children:e.jsx("code",{children:"value: number | [number, number]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChangeAfter"})}),e.jsxs("td",{children:["进度变化且",e.jsx("strong",{children:"结束拖动后触发"})]}),e.jsx("td",{children:e.jsx("code",{children:"value: number | [number, number]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onDragStart"})}),e.jsx("td",{children:"开始拖动时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent, value: number | [number, number]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onDragEnd"})}),e.jsx("td",{children:"结束拖动时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent, value: number | [number, number]"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"trackHeight/thumbSize/thumb/leftThumb/rightThumb"})," 为历史别名，优先使用 ",e.jsx("code",{children:"barHeight/buttonSize/button/leftButton/rightButton"}),"。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["轨道点击也会直接更新数值，并触发 ",e.jsx("code",{children:"onChangeAfter"}),"；在双滑块模式下，会自动跟随离点击位置更近的一侧。"]})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["通过主题的 ",e.jsx("code",{children:"components.slider"})," 可以批量覆盖默认高度、尺寸与颜色等 tokens。"]})}),e.jsx("h2",{id:"主题定制tokens","data-anchor":"主题定制tokens",children:"主题定制（Tokens）"}),e.jsxs("p",{children:["可通过 ",e.jsx("code",{children:"ConfigProvider"})," 统一覆盖 ",e.jsx("code",{children:"Slider"})," 的默认 tokens："]}),e.jsx(n,{code:`import { ConfigProvider } from 'react-native-system-ui'

<ConfigProvider
  theme={{
    components: {
      slider: {
        track: {
          height: 4,
        },
        thumb: {
          size: 28,
          indicatorSize: 10,
        },
        colors: {
          active: '#4770ff',
          inactive: '#e3e5eb',
          thumbBackground: '#ffffff',
          thumbIndicator: '#ffffff',
        },
      },
    },
  }}
/>`,lang:"tsx"}),e.jsxs("p",{children:[e.jsx("code",{children:"components.slider"})," 支持覆盖的结构与默认值一致，详见 ",e.jsx("a",{href:"file:///Users/wangwenshan/Desktop/wws/other/react-native-system-ui/src/components/slider/tokens.ts#L8-L62",children:"tokens.ts"}),"。"]})]})})},k=[{Component:c,key:"slider-basic",sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderBasicDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderBasicDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"基础用法",identifier:"slider-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:v,key:"slider-range",sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState<[number, number]>([10, 50])
  return (
    <Slider
      range
      value={value}
      onChange={val => setValue(val as [number, number])}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState<[number, number]>([10, 50])
  return (
    <Slider
      range
      value={value}
      onChange={val => setValue(val as [number, number])}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"双滑块",identifier:"slider-range",lang:"tsx",meta:{title:"双滑块"}},{Component:h,key:"slider-range-limit",sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeLimitDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderRangeLimitDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      min={-50}
      max={50}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"指定选择范围",identifier:"slider-range-limit",lang:"tsx",meta:{title:"指定选择范围"}},{Component:m,key:"slider-disabled",sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderDisabledDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      disabled
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderDisabledDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      disabled
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"禁用",identifier:"slider-disabled",lang:"tsx",meta:{title:"禁用"}},{Component:x,key:"slider-step",sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStepDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      step={10}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"指定步长",identifier:"slider-step",lang:"tsx",meta:{title:"指定步长"}},{Component:f,key:"slider-style",sources:{_:{tsx:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStyleDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      barHeight={4}
      activeColor="#ee0a24"
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderStyleDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      barHeight={4}
      activeColor="#ee0a24"
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"自定义样式",identifier:"slider-style",lang:"tsx",meta:{title:"自定义样式"}},{Component:p,key:"slider-button",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ee0a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
})

export default function SliderButtonDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      buttonSize={26}
      button={({ value: v }) => (
        <View style={styles.button}>
          <Text style={styles.text}>{Array.isArray(v) ? v[0] : v}</Text>
        </View>
      )}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

const styles = StyleSheet.create({
  button: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ee0a24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
})

export default function SliderButtonDemo() {
  const [value, setValue] = React.useState(10)
  return (
    <Slider
      buttonSize={26}
      button={({ value: v }) => (
        <View style={styles.button}>
          <Text style={styles.text}>{Array.isArray(v) ? v[0] : v}</Text>
        </View>
      )}
      value={value}
      onChange={val => setValue(val as number)}
      onChangeAfter={v => Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)}
    />
  )
}
`}},title:"自定义按钮",identifier:"slider-button",lang:"tsx",meta:{title:"自定义按钮"}},{Component:j,key:"slider-vertical",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderVerticalDemo() {
  const [value1, setValue1] = React.useState(50)
  const [value2, setValue2] = React.useState<[number, number]>([20, 50])

  const onChangeAfter = (v: number | [number, number]) => {
    Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)
  }

  return (
    <View style={{ height: 150, paddingLeft: 30, flexDirection: 'row' }}>
      <Slider
        vertical
        style={{ marginRight: 40, height: 150 }}
        value={value1}
        onChange={val => setValue1(val as number)}
        onChangeAfter={onChangeAfter}
      />
      <Slider
        range
        vertical
        style={{ height: 150 }}
        value={value2}
        onChange={val => setValue2(val as [number, number])}
        onChangeAfter={onChangeAfter}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { Slider, Toast } from 'react-native-system-ui'

export default function SliderVerticalDemo() {
  const [value1, setValue1] = React.useState(50)
  const [value2, setValue2] = React.useState<[number, number]>([20, 50])

  const onChangeAfter = (v: number | [number, number]) => {
    Toast.info(\`值：\${Array.isArray(v) ? v.join(' ~ ') : v}\`)
  }

  return (
    <View style={{ height: 150, paddingLeft: 30, flexDirection: 'row' }}>
      <Slider
        vertical
        style={{ marginRight: 40, height: 150 }}
        value={value1}
        onChange={val => setValue1(val as number)}
        onChangeAfter={onChangeAfter}
      />
      <Slider
        range
        vertical
        style={{ height: 150 }}
        value={value2}
        onChange={val => setValue2(val as [number, number])}
        onChangeAfter={onChangeAfter}
      />
    </View>
  )
}
`}},title:"垂直方向",identifier:"slider-vertical",lang:"tsx",meta:{title:"垂直方向"}}],I={simulator:{compact:!1}},z=[{depth:1,text:"Slider 滑块",id:"slider-滑块"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"双滑块",id:"双滑块"},{depth:3,text:"指定选择范围",id:"指定选择范围"},{depth:3,text:"禁用",id:"禁用"},{depth:3,text:"指定步长",id:"指定步长"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"自定义按钮",id:"自定义按钮"},{depth:3,text:"垂直方向",id:"垂直方向"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:2,text:"主题定制（Tokens）",id:"主题定制tokens"}],H="/docs/components/slider.md",W="Slider 滑块",q="1769570039000",pe=t=>t.children({MdContent:L,demos:k,frontmatter:I,slugs:z,filePath:H,title:W,updatedTime:q});export{L as MdContent,pe as default,k as demos,H as filePath,I as frontmatter,z as slugs,W as title,q as updatedTime};
