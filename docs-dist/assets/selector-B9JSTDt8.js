import{j as e}from"./main-O6KZrSH_.js";import{S as n}from"./Selector--VKzK5w7.js";import"./createComponentTokensHook-KzOuLm4c.js";import"./useControllableValue-_OJua4RH.js";import"./index-DvCZppP1.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-DMjZXFvR.js";import"./index-CJrLMJTa.js";const r=[{label:"选项一",value:"1"},{label:"选项二",value:"2"},{label:"选项三",value:"3"}];function l(){return e.jsx(n,{options:r,defaultValue:["1"]})}const a=`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorBasicDemo() {
  return <Selector options={options} defaultValue={['1']} />
}
`,d={code:a,sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorBasicDemo() {
  return <Selector options={options} defaultValue={['1']} />
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/selector/demo/options.ts",content:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorBasicDemo() {
  return <Selector options={options} defaultValue={['1']} />
}
`},"options.ts":{type:"FILE",value:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},title:"单选",identifier:"selector-basic",lang:"tsx",meta:{title:"单选"}};function i(){return e.jsx(n,{options:r,multiple:!0,defaultValue:["2","3"]})}const p=`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorMultipleDemo() {
  return <Selector options={options} multiple defaultValue={['2', '3']} />
}
`,m={code:p,sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorMultipleDemo() {
  return <Selector options={options} multiple defaultValue={['2', '3']} />
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/selector/demo/options.ts",content:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorMultipleDemo() {
  return <Selector options={options} multiple defaultValue={['2', '3']} />
}
`},"options.ts":{type:"FILE",value:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},title:"多选",identifier:"selector-multiple",lang:"tsx",meta:{title:"多选"}},x=[{label:"选项一",value:"1"},{label:"选项二",value:"2",disabled:!0},{label:"选项三",value:"3"}];function s(){return e.jsx(n,{options:x})}const h=`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
]

export default function SelectorDisabledDemo() {
  return <Selector options={options} />
}
`,v={code:h,sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
]

export default function SelectorDisabledDemo() {
  return <Selector options={options} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
]

export default function SelectorDisabledDemo() {
  return <Selector options={options} />
}
`}},title:"禁用状态",identifier:"selector-disabled",lang:"tsx",meta:{title:"禁用状态"}},j=[{label:"选项一",description:"描述信息",value:"1"},{label:"选项二",description:"描述信息",value:"2"}];function c(){return e.jsx(n,{options:j})}const f=`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  { label: '选项一', description: '描述信息', value: '1' },
  { label: '选项二', description: '描述信息', value: '2' },
]

export default function SelectorDescriptionDemo() {
  return <Selector options={options} />
}

`,S={code:f,sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  { label: '选项一', description: '描述信息', value: '1' },
  { label: '选项二', description: '描述信息', value: '2' },
]

export default function SelectorDescriptionDemo() {
  return <Selector options={options} />
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  { label: '选项一', description: '描述信息', value: '1' },
  { label: '选项二', description: '描述信息', value: '2' },
]

export default function SelectorDescriptionDemo() {
  return <Selector options={options} />
}

`}},title:"描述选项",identifier:"selector-description",lang:"tsx",meta:{title:"描述选项"}};function u(){return e.jsx(n,{options:r,defaultValue:["1"],showCheckMark:!1,itemStyle:{borderRadius:999,paddingVertical:6,paddingHorizontal:15}})}const b=`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorCustomStyleDemo() {
  return (
    <Selector
      options={options}
      defaultValue={['1']}
      showCheckMark={false}
      itemStyle={{ borderRadius: 999, paddingVertical: 6, paddingHorizontal: 15 }}
    />
  )
}

`,y={code:b,sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorCustomStyleDemo() {
  return (
    <Selector
      options={options}
      defaultValue={['1']}
      showCheckMark={false}
      itemStyle={{ borderRadius: 999, paddingVertical: 6, paddingHorizontal: 15 }}
    />
  )
}

`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/selector/demo/options.ts",content:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorCustomStyleDemo() {
  return (
    <Selector
      options={options}
      defaultValue={['1']}
      showCheckMark={false}
      itemStyle={{ borderRadius: 999, paddingVertical: 6, paddingHorizontal: 15 }}
    />
  )
}

`},"options.ts":{type:"FILE",value:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},title:"自定义样式",identifier:"selector-custom-style",lang:"tsx",meta:{title:"自定义样式"}},E=function({previewer:o=()=>null,api:M=()=>null}){const t=o;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"selector-选择组","data-anchor":"selector-选择组",children:"Selector 选择组"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在一组选项中选择一个或多个。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { Selector } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"单选","data-anchor":"单选",children:"单选"}),e.jsx("div",{children:e.jsx(t,{...d,children:e.jsx(l,{})})}),e.jsx("h3",{id:"多选","data-anchor":"多选",children:"多选"}),e.jsx("div",{children:e.jsx(t,{...m,children:e.jsx(i,{})})}),e.jsx("h3",{id:"禁用状态","data-anchor":"禁用状态",children:"禁用状态"}),e.jsx("div",{children:e.jsx(t,{...v,children:e.jsx(s,{})})}),e.jsx("h3",{id:"描述选项","data-anchor":"描述选项",children:"描述选项"}),e.jsx("div",{children:e.jsx(t,{...S,children:e.jsx(c,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsx("div",{children:e.jsx(t,{...y,children:e.jsx(u,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"选项列表"}),e.jsx("td",{children:e.jsx("code",{children:"SelectorOption[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsx("td",{children:"每行展示的列数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"multiple"})}),e.jsx("td",{children:"是否多选"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"禁用全部选项"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"受控选中值列表"}),e.jsx("td",{children:e.jsx("code",{children:"SelectorValue[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"非受控默认选中值"}),e.jsx("td",{children:e.jsx("code",{children:"SelectorValue[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showCheckMark"})}),e.jsx("td",{children:"是否显示勾选标记"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中项变更时触发"}),e.jsx("td",{children:e.jsxs("code",{children:["(value, ","{"," items ","}",") => void"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemStyle"})}),e.jsx("td",{children:"单个选项容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelStyle"})}),e.jsx("td",{children:"选项文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"descriptionStyle"})}),e.jsx("td",{children:"描述文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h2",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("h3",{id:"selectorvalue","data-anchor":"selectorvalue",children:"SelectorValue"}),e.jsx(t,{code:"type SelectorValue = string | number",lang:"ts"}),e.jsx("h3",{id:"selectoroption","data-anchor":"selectoroption",children:"SelectorOption"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"主文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"描述文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"唯一标识"}),e.jsx("td",{children:e.jsx("code",{children:"SelectorValue"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"禁用当前选项"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]})]})]}),e.jsx("h2",{id:"泛型","data-anchor":"泛型",children:"泛型"}),e.jsxs("p",{children:[e.jsx("code",{children:"Selector"})," 支持泛型，你可以通过下面的方式手动控制 ",e.jsx("code",{children:"value"}),"、",e.jsx("code",{children:"onChange"})," 等属性的类型："]}),e.jsx(t,{code:`<Selector<'a' | 'b' | number>
  options={options}
  defaultValue={['a']}
  onChange={(arr) => console.log(arr)}
/>`,lang:"tsx"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"components.selector"})," tokens 可统一覆盖颜色、边框、间距、圆角等视觉表现。"]})})]})})},F=[{Component:l,key:"selector-basic",sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorBasicDemo() {
  return <Selector options={options} defaultValue={['1']} />
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/selector/demo/options.ts",content:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorBasicDemo() {
  return <Selector options={options} defaultValue={['1']} />
}
`},"options.ts":{type:"FILE",value:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},title:"单选",identifier:"selector-basic",lang:"tsx",meta:{title:"单选"}},{Component:i,key:"selector-multiple",sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorMultipleDemo() {
  return <Selector options={options} multiple defaultValue={['2', '3']} />
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/selector/demo/options.ts",content:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorMultipleDemo() {
  return <Selector options={options} multiple defaultValue={['2', '3']} />
}
`},"options.ts":{type:"FILE",value:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},title:"多选",identifier:"selector-multiple",lang:"tsx",meta:{title:"多选"}},{Component:s,key:"selector-disabled",sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
]

export default function SelectorDisabledDemo() {
  return <Selector options={options} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
]

export default function SelectorDisabledDemo() {
  return <Selector options={options} />
}
`}},title:"禁用状态",identifier:"selector-disabled",lang:"tsx",meta:{title:"禁用状态"}},{Component:c,key:"selector-description",sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  { label: '选项一', description: '描述信息', value: '1' },
  { label: '选项二', description: '描述信息', value: '2' },
]

export default function SelectorDescriptionDemo() {
  return <Selector options={options} />
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

const options = [
  { label: '选项一', description: '描述信息', value: '1' },
  { label: '选项二', description: '描述信息', value: '2' },
]

export default function SelectorDescriptionDemo() {
  return <Selector options={options} />
}

`}},title:"描述选项",identifier:"selector-description",lang:"tsx",meta:{title:"描述选项"}},{Component:u,key:"selector-custom-style",sources:{_:{tsx:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorCustomStyleDemo() {
  return (
    <Selector
      options={options}
      defaultValue={['1']}
      showCheckMark={false}
      itemStyle={{ borderRadius: 999, paddingVertical: 6, paddingHorizontal: 15 }}
    />
  )
}

`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/selector/demo/options.ts",content:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Selector } from 'react-native-system-ui'

import { options } from './options'

export default function SelectorCustomStyleDemo() {
  return (
    <Selector
      options={options}
      defaultValue={['1']}
      showCheckMark={false}
      itemStyle={{ borderRadius: 999, paddingVertical: 6, paddingHorizontal: 15 }}
    />
  )
}

`},"options.ts":{type:"FILE",value:`export const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

`}},title:"自定义样式",identifier:"selector-custom-style",lang:"tsx",meta:{title:"自定义样式"}}],D={simulator:{compact:!0}},C=[{depth:1,text:"Selector 选择组",id:"selector-选择组"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"单选",id:"单选"},{depth:3,text:"多选",id:"多选"},{depth:3,text:"禁用状态",id:"禁用状态"},{depth:3,text:"描述选项",id:"描述选项"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:2,text:"API",id:"api"},{depth:2,text:"类型定义",id:"类型定义"},{depth:3,text:"SelectorValue",id:"selectorvalue"},{depth:3,text:"SelectorOption",id:"selectoroption"},{depth:2,text:"泛型",id:"泛型"}],B="/docs/components/selector.md",g="Selector 选择组",_="1765878260000",L=o=>o.children({MdContent:E,demos:F,frontmatter:D,slugs:C,filePath:B,title:g,updatedTime:_});export{E as MdContent,L as default,F as demos,B as filePath,D as frontmatter,C as slugs,g as title,_ as updatedTime};
