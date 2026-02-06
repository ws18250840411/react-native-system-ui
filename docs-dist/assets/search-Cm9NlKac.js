import{R as r,j as e}from"./main-BuQiU471.js";import{S as a}from"./Search-u5RaMV-D.js";import{T as c}from"./index-C-QcjePq.js";import{M as x}from"./index-BRfylSA6.js";import{T as j}from"./createComponentTokensHook-BZh_OSSd.js";import"./Search-BiBiRWIm.js";import"./IconBase-CrFgzAiS.js";import"./useLocale-37vdikYq.js";import"./Field-u5r-1eRM.js";import"./index-CvjfcfGO.js";import"./Arrow-xfLuWLNA.js";import"./hairline-MnVzd1gq.js";import"./useAriaPress-D5uAXibC.js";import"./index-CJrLMJTa.js";import"./index-C8B1H8uh.js";import"./promise-CJeOJGOl.js";import"./Close-6I0X32OQ.js";import"./index-CvolElyI.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-DLepBbWK.js";import"./number-DwcHNqSr.js";import"./index-CA-bMxjH.js";import"./extends-CF3RwP-h.js";import"./Popup-Bft8PaUM.js";import"./Portal-Bl5GJ6OP.js";import"./Overlay-BCBJ7Bg0.js";import"./Animated-CaOvDCxr.js";import"./index-CfLKkUWT.js";import"./index-BAZkLH96.js";import"./index-Ct6-Nt5P.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-B_-drOoO.js";import"./index-COVjMqe7.js";import"./SafeAreaView-B7j4syYp.js";import"./useSafeAreaPadding-Dnz88xZy.js";import"./index-CG41vsan.js";import"./useControllableValue-A2U09wcf.js";import"./Loading-0Dos1lSL.js";import"./Checked-CNW_UclJ.js";function s(){const[t,n]=r.useState("");return e.jsx(a,{value:t,onChange:n,clearable:!0,placeholder:"请输入搜索关键词"})}const p=`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBasicDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      value={value}
      onChange={setValue}
      clearable
      placeholder="请输入搜索关键词"
    />
  )
}
`,m={code:p,sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBasicDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      value={value}
      onChange={setValue}
      clearable
      placeholder="请输入搜索关键词"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBasicDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      value={value}
      onChange={setValue}
      clearable
      placeholder="请输入搜索关键词"
    />
  )
}
`}},title:"基础用法",identifier:"search-basic",lang:"tsx",meta:{title:"基础用法"}};function l(){const[t,n]=r.useState("");return e.jsx(a,{value:t,onChange:n,placeholder:"请输入搜索关键词",showAction:!0,onSearch:u=>{c.info(u),n(u)},onCancel:()=>{c.info("取消"),n("")},onClear:()=>{c.info("清除"),n("")},onClickInput:()=>{c.info("点击输入区域时触发")}})}const v=`import React from 'react'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchEventDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={val => {
        Toast.info(val)
        setValue(val)
      }}
      onCancel={() => {
        Toast.info('取消')
        setValue('')
      }}
      onClear={() => {
        Toast.info('清除')
        setValue('')
      }}
      onClickInput={() => {
        Toast.info('点击输入区域时触发')
      }}
    />
  )
}
`,f={code:v,sources:{_:{tsx:`import React from 'react'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchEventDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={val => {
        Toast.info(val)
        setValue(val)
      }}
      onCancel={() => {
        Toast.info('取消')
        setValue('')
      }}
      onClear={() => {
        Toast.info('清除')
        setValue('')
      }}
      onClickInput={() => {
        Toast.info('点击输入区域时触发')
      }}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchEventDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={val => {
        Toast.info(val)
        setValue(val)
      }}
      onCancel={() => {
        Toast.info('取消')
        setValue('')
      }}
      onClear={() => {
        Toast.info('清除')
        setValue('')
      }}
      onClickInput={() => {
        Toast.info('点击输入区域时触发')
      }}
    />
  )
}
`}},title:"事件监听",identifier:"search-event",lang:"tsx",meta:{title:"事件监听"}};function i(){const[t,n]=r.useState("");return e.jsx(a,{value:t,onChange:n,align:"center",placeholder:"请输入搜索关键词"})}const F=`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchAlignDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      align="center"
      placeholder="请输入搜索关键词"
    />
  )
}

`,E={code:F,sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchAlignDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      align="center"
      placeholder="请输入搜索关键词"
    />
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchAlignDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      align="center"
      placeholder="请输入搜索关键词"
    />
  )
}

`}},title:"搜索框内容对齐",identifier:"search-align",lang:"tsx",meta:{title:"搜索框内容对齐"}};function o(){const[t,n]=r.useState("");return e.jsx(a,{disabled:!0,value:t,onChange:n,placeholder:"请输入搜索关键词"})}const C=`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchDisabledDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      disabled
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`,S={code:C,sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchDisabledDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      disabled
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchDisabledDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      disabled
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},title:"禁用搜索框",identifier:"search-disabled",lang:"tsx",meta:{title:"禁用搜索框"}};function d(){const[t,n]=r.useState("");return e.jsx(a,{shape:"round",background:"#4fc08d",value:t,onChange:n,placeholder:"请输入搜索关键词"})}const g=`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBackgroundDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      shape="round"
      background="#4fc08d"
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`,B={code:g,sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBackgroundDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      shape="round"
      background="#4fc08d"
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBackgroundDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      shape="round"
      background="#4fc08d"
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},title:"自定义背景色",identifier:"search-background",lang:"tsx",meta:{title:"自定义背景色"}};function h(){const[t,n]=r.useState("");return e.jsx(a,{showAction:!0,label:"地址",value:t,onChange:n,placeholder:"请输入搜索关键词",actionText:e.jsx(x,{onPress:()=>c.info(t),accessibilityRole:"button",children:e.jsx(j,{style:{color:"#4770ff",fontWeight:"500"},children:"搜索"})})})}const D=`import React from 'react'
import { Pressable, Text } from 'react-native'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchActionTextDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      showAction
      label='地址'
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      actionText={
        <Pressable onPress={() => Toast.info(value)} accessibilityRole="button">
          <Text style={{ color: '#4770ff', fontWeight: '500' }}>搜索</Text>
        </Pressable>
      }
    />
  )
}
`,y={code:D,sources:{_:{tsx:`import React from 'react'
import { Pressable, Text } from 'react-native'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchActionTextDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      showAction
      label='地址'
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      actionText={
        <Pressable onPress={() => Toast.info(value)} accessibilityRole="button">
          <Text style={{ color: '#4770ff', fontWeight: '500' }}>搜索</Text>
        </Pressable>
      }
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, Text } from 'react-native'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchActionTextDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      showAction
      label='地址'
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      actionText={
        <Pressable onPress={() => Toast.info(value)} accessibilityRole="button">
          <Text style={{ color: '#4770ff', fontWeight: '500' }}>搜索</Text>
        </Pressable>
      }
    />
  )
}
`}},title:"自定义按钮",identifier:"search-action-text",lang:"tsx",meta:{title:"自定义按钮"}},A=function({previewer:t=()=>null,api:n=()=>null}){const u=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"search-搜索","data-anchor":"search-搜索",children:"Search 搜索"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于搜索场景的输入框组件。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(u,{code:"import { Search } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:[e.jsx("code",{children:"value"})," 用于控制搜索框中的文字，",e.jsx("code",{children:"background"})," 可以自定义搜索框外部背景色。"]}),e.jsx("div",{children:e.jsx(u,{...m,children:e.jsx(s,{})})}),e.jsx("h3",{id:"事件监听","data-anchor":"事件监听",children:"事件监听"}),e.jsxs("p",{children:["Search 组件提供了 ",e.jsx("code",{children:"onSearch"})," 和 ",e.jsx("code",{children:"onCancel"})," 事件，",e.jsx("code",{children:"onSearch"})," 事件在点击键盘上的搜索/回车按钮后触发，",e.jsx("code",{children:"onCancel"})," 事件在点击搜索框右侧取消按钮时触发。"]}),e.jsx("div",{children:e.jsx(u,{...f,children:e.jsx(l,{})})}),e.jsx("h3",{id:"搜索框内容对齐","data-anchor":"搜索框内容对齐",children:"搜索框内容对齐"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"align"})," 属性设置搜索框内容的对齐方式。"]}),e.jsx("div",{children:e.jsx(u,{...E,children:e.jsx(i,{})})}),e.jsx("h3",{id:"禁用搜索框","data-anchor":"禁用搜索框",children:"禁用搜索框"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"disabled"})," 属性禁用搜索框。"]}),e.jsx("div",{children:e.jsx(u,{...S,children:e.jsx(o,{})})}),e.jsx("h3",{id:"自定义背景色","data-anchor":"自定义背景色",children:"自定义背景色"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"background"})," 属性可以设置搜索框外部的背景色，通过 ",e.jsx("code",{children:"shape"})," 属性设置搜索框的形状。"]}),e.jsx("div",{children:e.jsx(u,{...B,children:e.jsx(d,{})})}),e.jsx("h3",{id:"自定义按钮","data-anchor":"自定义按钮",children:"自定义按钮"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"actionText"})," 属性可以自定义右侧按钮的内容；当 ",e.jsx("code",{children:"actionText"})," 为自定义节点时，默认取消逻辑将不再生效（由自定义节点自行处理点击）。"]}),e.jsx("div",{children:e.jsx(u,{...y,children:e.jsx(h,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"搜索框左侧文本"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"shape"})}),e.jsx("td",{children:"搜索框形状"}),e.jsx("td",{children:e.jsx("code",{children:"'square' | 'round'"})}),e.jsx("td",{children:e.jsx("code",{children:"square"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"搜索框外部背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题默认色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxLength"})}),e.jsx("td",{children:"输入的最大字符数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"占位提示文字"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearable"})}),e.jsx("td",{children:"是否启用清除图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearIcon"})}),e.jsx("td",{children:"清除图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"clear"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearTrigger"})}),e.jsx("td",{children:"显示清除图标的时机"}),e.jsx("td",{children:e.jsx("code",{children:"'always' | 'focus'"})}),e.jsx("td",{children:e.jsx("code",{children:"focus"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoFocus"})}),e.jsx("td",{children:"是否自动聚焦"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showAction"})}),e.jsx("td",{children:"是否在搜索框右侧显示取消按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"actionText"})}),e.jsx("td",{children:"取消按钮文字/自定义按钮内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"locale.cancel"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"action"})}),e.jsx("td",{children:"自定义右侧操作内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用输入框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否只读"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"error"})}),e.jsx("td",{children:"是否将输入内容标红"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"errorMessage"})}),e.jsx("td",{children:"底部错误提示文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatter"})}),e.jsx("td",{children:"输入内容格式化函数"}),e.jsx("td",{children:e.jsx("code",{children:"(val: string) => string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatTrigger"})}),e.jsx("td",{children:"格式化函数触发时机"}),e.jsx("td",{children:e.jsx("code",{children:"'onBlur' | 'onChange'"})}),e.jsx("td",{children:e.jsx("code",{children:"onChange"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"输入框内容对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'center' | 'right'"})}),e.jsx("td",{children:e.jsx("code",{children:"left"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftIcon"})}),e.jsx("td",{children:"输入框左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"搜索图标"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightIcon"})}),e.jsx("td",{children:"输入框右侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldStyle"})}),e.jsxs("td",{children:["内部 ",e.jsx("code",{children:"Field"})," 容器样式"]}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldContentStyle"})}),e.jsx("td",{children:"内部内容区样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"输入框内容变化时触发（推荐）"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChangeText"})}),e.jsx("td",{children:"输入框内容变化时触发（兼容）"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSearch"})}),e.jsx("td",{children:"确认搜索时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["其余属性与事件同 ",e.jsx("code",{children:"Field"}),"，例如 ",e.jsx("code",{children:"maxLength"}),"、",e.jsx("code",{children:"formatter"}),"、",e.jsx("code",{children:"readOnly"})," 等将直接透传给内部的 ",e.jsx("code",{children:"TextInput"}),"。"]})}),e.jsx("h2",{id:"searchref","data-anchor":"searchref",children:"SearchRef"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"focus()"})}),e.jsx("td",{children:"获取焦点"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blur()"})}),e.jsx("td",{children:"失去焦点"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clear()"})}),e.jsx("td",{children:"清空输入内容"})]})]})]})]})})},b=[{Component:s,key:"search-basic",sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBasicDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      value={value}
      onChange={setValue}
      clearable
      placeholder="请输入搜索关键词"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBasicDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      value={value}
      onChange={setValue}
      clearable
      placeholder="请输入搜索关键词"
    />
  )
}
`}},title:"基础用法",identifier:"search-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:l,key:"search-event",sources:{_:{tsx:`import React from 'react'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchEventDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={val => {
        Toast.info(val)
        setValue(val)
      }}
      onCancel={() => {
        Toast.info('取消')
        setValue('')
      }}
      onClear={() => {
        Toast.info('清除')
        setValue('')
      }}
      onClickInput={() => {
        Toast.info('点击输入区域时触发')
      }}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchEventDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      showAction
      onSearch={val => {
        Toast.info(val)
        setValue(val)
      }}
      onCancel={() => {
        Toast.info('取消')
        setValue('')
      }}
      onClear={() => {
        Toast.info('清除')
        setValue('')
      }}
      onClickInput={() => {
        Toast.info('点击输入区域时触发')
      }}
    />
  )
}
`}},title:"事件监听",identifier:"search-event",lang:"tsx",meta:{title:"事件监听"}},{Component:i,key:"search-align",sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchAlignDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      align="center"
      placeholder="请输入搜索关键词"
    />
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchAlignDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      value={value}
      onChange={setValue}
      align="center"
      placeholder="请输入搜索关键词"
    />
  )
}

`}},title:"搜索框内容对齐",identifier:"search-align",lang:"tsx",meta:{title:"搜索框内容对齐"}},{Component:o,key:"search-disabled",sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchDisabledDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      disabled
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchDisabledDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      disabled
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},title:"禁用搜索框",identifier:"search-disabled",lang:"tsx",meta:{title:"禁用搜索框"}},{Component:d,key:"search-background",sources:{_:{tsx:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBackgroundDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      shape="round"
      background="#4fc08d"
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Search } from 'react-native-system-ui'

export default function SearchBackgroundDemo() {
  const [value, setValue] = React.useState('')
  return (
    <Search
      shape="round"
      background="#4fc08d"
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
    />
  )
}

`}},title:"自定义背景色",identifier:"search-background",lang:"tsx",meta:{title:"自定义背景色"}},{Component:h,key:"search-action-text",sources:{_:{tsx:`import React from 'react'
import { Pressable, Text } from 'react-native'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchActionTextDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      showAction
      label='地址'
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      actionText={
        <Pressable onPress={() => Toast.info(value)} accessibilityRole="button">
          <Text style={{ color: '#4770ff', fontWeight: '500' }}>搜索</Text>
        </Pressable>
      }
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, Text } from 'react-native'
import { Search, Toast } from 'react-native-system-ui'

export default function SearchActionTextDemo() {
  const [value, setValue] = React.useState('')

  return (
    <Search
      showAction
      label='地址'
      value={value}
      onChange={setValue}
      placeholder="请输入搜索关键词"
      actionText={
        <Pressable onPress={() => Toast.info(value)} accessibilityRole="button">
          <Text style={{ color: '#4770ff', fontWeight: '500' }}>搜索</Text>
        </Pressable>
      }
    />
  )
}
`}},title:"自定义按钮",identifier:"search-action-text",lang:"tsx",meta:{title:"自定义按钮"}}],R={simulator:{compact:!0}},V=[{depth:1,text:"Search 搜索",id:"search-搜索"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"事件监听",id:"事件监听"},{depth:3,text:"搜索框内容对齐",id:"搜索框内容对齐"},{depth:3,text:"禁用搜索框",id:"禁用搜索框"},{depth:3,text:"自定义背景色",id:"自定义背景色"},{depth:3,text:"自定义按钮",id:"自定义按钮"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:2,text:"SearchRef",id:"searchref"}],T="/docs/components/search.md",P="Search 搜索",_="1769570039000",Fe=t=>t.children({MdContent:A,demos:b,frontmatter:R,slugs:V,filePath:T,title:P,updatedTime:_});export{A as MdContent,Fe as default,b as demos,T as filePath,R as frontmatter,V as slugs,P as title,_ as updatedTime};
