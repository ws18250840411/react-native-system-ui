import{j as e,R as p}from"./main-O6KZrSH_.js";import{S as n}from"./Switch-BBqakktt.js";import{S as u}from"./Space-BUyxH04S.js";import{D as x}from"./index-NcsZVNiX.js";import{C as r}from"./index-DCx-GaLs.js";import"./createComponentTokensHook-KzOuLm4c.js";import"./useControllableValue-_OJua4RH.js";import"./extends-CF3RwP-h.js";import"./number-BcSDXImJ.js";import"./index-DvCZppP1.js";import"./useAriaPress-DMjZXFvR.js";import"./index-CJrLMJTa.js";import"./useLocale-C-3I3wuL.js";import"./hairline-Dpq7rEkb.js";import"./promise-DDQXV5JQ.js";import"./Close-DpyqkEOI.js";import"./IconBase-DZr7C-P7.js";import"./index-DzU_0rvq.js";import"./color-cEGfwRja.js";import"./createPlatformShadow-BbOkyb5V.js";import"./index-ANZ1PvOD.js";import"./Popup-DvjP5SkZ.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./Animated-qBs3E5U6.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-Tvvid2F1.js";import"./index-Cq_gACMg.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./Arrow-r8D7M_Tx.js";function a(){return e.jsx(n,{defaultChecked:!0})}const f=`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchBasicDemo() {
  return <Switch defaultChecked />
}
`,C={code:f,sources:{_:{tsx:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchBasicDemo() {
  return <Switch defaultChecked />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchBasicDemo() {
  return <Switch defaultChecked />
}
`}},title:"基础用法",identifier:"switch-basic",lang:"tsx",meta:{title:"基础用法"}};function d(){return e.jsx(n,{disabled:!0,defaultChecked:!0})}const j=`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchDisabledDemo() {
  return <Switch disabled defaultChecked />
}
`,S={code:j,sources:{_:{tsx:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchDisabledDemo() {
  return <Switch disabled defaultChecked />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchDisabledDemo() {
  return <Switch disabled defaultChecked />
}
`}},title:"禁用状态",identifier:"switch-disabled",lang:"tsx",meta:{title:"禁用状态"}};function o(){return e.jsxs(u,{direction:"vertical",gap:12,children:[e.jsx(n,{size:"sm",defaultChecked:!0}),e.jsx(n,{size:"md",defaultChecked:!0}),e.jsx(n,{size:"lg",defaultChecked:!0})]})}const w=`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchSizeDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </Space>
  )
}
`,v={code:w,sources:{_:{tsx:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchSizeDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchSizeDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </Space>
  )
}
`}},title:"自定义大小",identifier:"switch-size",lang:"tsx",meta:{title:"自定义大小"}};function s(){return e.jsx(u,{direction:"vertical",gap:12,children:e.jsx(n,{activeColor:"#ee0a24",inactiveColor:"#dcdee0",defaultChecked:!0})})}const y=`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchColorDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch
        activeColor="#ee0a24"
        inactiveColor="#dcdee0"
        defaultChecked
      />
    </Space>
  )
}
`,F={code:y,sources:{_:{tsx:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchColorDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch
        activeColor="#ee0a24"
        inactiveColor="#dcdee0"
        defaultChecked
      />
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchColorDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch
        activeColor="#ee0a24"
        inactiveColor="#dcdee0"
        defaultChecked
      />
    </Space>
  )
}
`}},title:"自定义颜色",identifier:"switch-color",lang:"tsx",meta:{title:"自定义颜色"}};function l(){const[i,c]=p.useState(!1),t=async m=>{try{await x.confirm({title:"提醒",message:"是否切换开关？"}),c(m)}catch{}};return e.jsx(n,{checked:i,onChange:t})}const g=`import React from 'react'

import { Dialog, Switch } from 'react-native-system-ui'

export default function SwitchAsyncDemo() {
  const [value, setValue] = React.useState(false)

  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      })
      setValue(checked)
    } catch {
      // 取消 dialog
    }
  }

  return <Switch checked={value} onChange={onChange} />
}
`,E={code:g,sources:{_:{tsx:`import React from 'react'

import { Dialog, Switch } from 'react-native-system-ui'

export default function SwitchAsyncDemo() {
  const [value, setValue] = React.useState(false)

  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      })
      setValue(checked)
    } catch {
      // 取消 dialog
    }
  }

  return <Switch checked={value} onChange={onChange} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Dialog, Switch } from 'react-native-system-ui'

export default function SwitchAsyncDemo() {
  const [value, setValue] = React.useState(false)

  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      })
      setValue(checked)
    } catch {
      // 取消 dialog
    }
  }

  return <Switch checked={value} onChange={onChange} />
}
`}},title:"异步控制",identifier:"switch-async",lang:"tsx",meta:{title:"异步控制"}};function h(){return e.jsx(r.Group,{children:e.jsx(r,{center:!0,title:"标题",rightIcon:e.jsx(n,{size:24,defaultChecked:!0,onChange:i=>console.log(`switch to ${i}`)})})})}const D=`import React from 'react'

import { Cell, Switch } from 'react-native-system-ui'

export default function SwitchCellDemo() {
  return (
    <Cell.Group>
      <Cell
            center
            title="标题"
            rightIcon={
              <Switch
                size={24}
                defaultChecked
                onChange={checked => console.log(\`switch to \${checked}\`)}
              />
            }
          />
    </Cell.Group>
  )
}
`,k={code:D,sources:{_:{tsx:`import React from 'react'

import { Cell, Switch } from 'react-native-system-ui'

export default function SwitchCellDemo() {
  return (
    <Cell.Group>
      <Cell
            center
            title="标题"
            rightIcon={
              <Switch
                size={24}
                defaultChecked
                onChange={checked => console.log(\`switch to \${checked}\`)}
              />
            }
          />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Switch } from 'react-native-system-ui'

export default function SwitchCellDemo() {
  return (
    <Cell.Group>
      <Cell
            center
            title="标题"
            rightIcon={
              <Switch
                size={24}
                defaultChecked
                onChange={checked => console.log(\`switch to \${checked}\`)}
              />
            }
          />
    </Cell.Group>
  )
}
`}},title:"搭配单元格使用",identifier:"switch-cell",lang:"tsx",meta:{title:"搭配单元格使用"}},B=function({previewer:i=()=>null,api:c=()=>null}){const t=i;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"switch-开关","data-anchor":"switch-开关",children:"Switch 开关"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:["用于在打开和关闭状态之间进行切换，内部基于 React Native ",e.jsx("code",{children:"Switch"})," 实现。"]}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { Switch } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"defaultChecked"})," 默认开关的选中状态，",e.jsx("code",{children:"true"})," 表示开，",e.jsx("code",{children:"false"})," 表示关。"]}),e.jsx("div",{children:e.jsx(t,{...C,children:e.jsx(a,{})})}),e.jsx("h3",{id:"禁用状态","data-anchor":"禁用状态",children:"禁用状态"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"disabled"})," 属性来禁用开关，禁用状态下开关不可点击。"]}),e.jsx("div",{children:e.jsx(t,{...S,children:e.jsx(d,{})})}),e.jsx("h3",{id:"自定义大小","data-anchor":"自定义大小",children:"自定义大小"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"size"})," 属性自定义开关的大小。"]}),e.jsx("div",{children:e.jsx(t,{...v,children:e.jsx(o,{})})}),e.jsx("h3",{id:"自定义颜色","data-anchor":"自定义颜色",children:"自定义颜色"}),e.jsxs("p",{children:[e.jsx("code",{children:"activeColor"})," 属性表示打开时的背景色，",e.jsx("code",{children:"inactiveColor"})," 表示关闭时的背景色。"]}),e.jsx("div",{children:e.jsx(t,{...F,children:e.jsx(s,{})})}),e.jsx("h3",{id:"异步控制","data-anchor":"异步控制",children:"异步控制"}),e.jsxs("p",{children:["需要异步控制开关时，可以使用 ",e.jsx("code",{children:"checked"})," 属性和 ",e.jsx("code",{children:"onChange"})," 事件代替 ",e.jsx("code",{children:"defaultChecked"}),"，并在事件回调函数中手动处理开关状态。"]}),e.jsx("div",{children:e.jsx(t,{...E,children:e.jsx(l,{})})}),e.jsx("h3",{id:"搭配单元格使用","data-anchor":"搭配单元格使用",children:"搭配单元格使用"}),e.jsx("div",{children:e.jsx(t,{...k,children:e.jsx(h,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"checked"})}),e.jsx("td",{children:"开关选中状态（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"any"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultChecked"})}),e.jsx("td",{children:"默认选中状态"}),e.jsx("td",{children:e.jsx("code",{children:"any"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否为禁用状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsxs("td",{children:["开关尺寸（支持 ",e.jsx("code",{children:"sm/md/lg"})," 与数值等比缩放）"]}),e.jsx("td",{children:e.jsx("code",{children:"number | 'sm' | 'md' | 'lg' | string"})}),e.jsx("td",{children:e.jsx("code",{children:"'md'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"打开时的背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#3f45ff"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactiveColor"})}),e.jsx("td",{children:"关闭时的背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"white"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeValue"})}),e.jsx("td",{children:"打开时对应的值"}),e.jsx("td",{children:e.jsx("code",{children:"any"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactiveValue"})}),e.jsx("td",{children:"关闭时对应的值"}),e.jsx("td",{children:e.jsx("code",{children:"any"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"开关状态切换时触发"}),e.jsx("td",{children:e.jsx("code",{children:"value: any"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent"})})]})]})]})]})})},_=[{Component:a,key:"switch-basic",sources:{_:{tsx:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchBasicDemo() {
  return <Switch defaultChecked />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchBasicDemo() {
  return <Switch defaultChecked />
}
`}},title:"基础用法",identifier:"switch-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:d,key:"switch-disabled",sources:{_:{tsx:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchDisabledDemo() {
  return <Switch disabled defaultChecked />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Switch } from 'react-native-system-ui'

export default function SwitchDisabledDemo() {
  return <Switch disabled defaultChecked />
}
`}},title:"禁用状态",identifier:"switch-disabled",lang:"tsx",meta:{title:"禁用状态"}},{Component:o,key:"switch-size",sources:{_:{tsx:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchSizeDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchSizeDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </Space>
  )
}
`}},title:"自定义大小",identifier:"switch-size",lang:"tsx",meta:{title:"自定义大小"}},{Component:s,key:"switch-color",sources:{_:{tsx:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchColorDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch
        activeColor="#ee0a24"
        inactiveColor="#dcdee0"
        defaultChecked
      />
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Space, Switch } from 'react-native-system-ui'

export default function SwitchColorDemo() {
  return (
    <Space direction="vertical" gap={12}>
      <Switch
        activeColor="#ee0a24"
        inactiveColor="#dcdee0"
        defaultChecked
      />
    </Space>
  )
}
`}},title:"自定义颜色",identifier:"switch-color",lang:"tsx",meta:{title:"自定义颜色"}},{Component:l,key:"switch-async",sources:{_:{tsx:`import React from 'react'

import { Dialog, Switch } from 'react-native-system-ui'

export default function SwitchAsyncDemo() {
  const [value, setValue] = React.useState(false)

  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      })
      setValue(checked)
    } catch {
      // 取消 dialog
    }
  }

  return <Switch checked={value} onChange={onChange} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Dialog, Switch } from 'react-native-system-ui'

export default function SwitchAsyncDemo() {
  const [value, setValue] = React.useState(false)

  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      })
      setValue(checked)
    } catch {
      // 取消 dialog
    }
  }

  return <Switch checked={value} onChange={onChange} />
}
`}},title:"异步控制",identifier:"switch-async",lang:"tsx",meta:{title:"异步控制"}},{Component:h,key:"switch-cell",sources:{_:{tsx:`import React from 'react'

import { Cell, Switch } from 'react-native-system-ui'

export default function SwitchCellDemo() {
  return (
    <Cell.Group>
      <Cell
            center
            title="标题"
            rightIcon={
              <Switch
                size={24}
                defaultChecked
                onChange={checked => console.log(\`switch to \${checked}\`)}
              />
            }
          />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Switch } from 'react-native-system-ui'

export default function SwitchCellDemo() {
  return (
    <Cell.Group>
      <Cell
            center
            title="标题"
            rightIcon={
              <Switch
                size={24}
                defaultChecked
                onChange={checked => console.log(\`switch to \${checked}\`)}
              />
            }
          />
    </Cell.Group>
  )
}
`}},title:"搭配单元格使用",identifier:"switch-cell",lang:"tsx",meta:{title:"搭配单元格使用"}}],A={simulator:{compact:!1,style:{background:"#fff"}}},R=[{depth:1,text:"Switch 开关",id:"switch-开关"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"禁用状态",id:"禁用状态"},{depth:3,text:"自定义大小",id:"自定义大小"},{depth:3,text:"自定义颜色",id:"自定义颜色"},{depth:3,text:"异步控制",id:"异步控制"},{depth:3,text:"搭配单元格使用",id:"搭配单元格使用"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"}],P="/docs/components/switch.md",z="Switch 开关",M="1770085343000",xe=i=>i.children({MdContent:B,demos:_,frontmatter:A,slugs:R,filePath:P,title:z,updatedTime:M});export{B as MdContent,xe as default,_ as demos,P as filePath,A as frontmatter,R as slugs,z as title,M as updatedTime};
