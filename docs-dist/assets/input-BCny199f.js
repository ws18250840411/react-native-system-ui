import{R as a,j as e}from"./main-O6KZrSH_.js";import{C as l}from"./index-DCx-GaLs.js";import{I as t}from"./Input-eR_pFUgK.js";import{B as v}from"./index-DzU_0rvq.js";import{T as C}from"./index-CCLXK9-u.js";import"./Arrow-r8D7M_Tx.js";import"./IconBase-DZr7C-P7.js";import"./createComponentTokensHook-KzOuLm4c.js";import"./hairline-Dpq7rEkb.js";import"./index-DvCZppP1.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-DMjZXFvR.js";import"./index-CJrLMJTa.js";import"./Field-Ckp9NSMz.js";import"./index-NcsZVNiX.js";import"./useLocale-C-3I3wuL.js";import"./promise-DDQXV5JQ.js";import"./Close-DpyqkEOI.js";import"./Popup-DvjP5SkZ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./Animated-qBs3E5U6.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-Tvvid2F1.js";import"./index-Cq_gACMg.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./index-ANZ1PvOD.js";import"./index-B3Y2P23a.js";import"./color-cEGfwRja.js";import"./number-BcSDXImJ.js";import"./Loading-CdSfkQu4.js";import"./Checked-Cm5uhjGy.js";function o(){const[n,r]=a.useState({text:"",tel:"",digit:"",number:"",password:""}),u=i=>m=>r(j=>({...j,[i]:m}));return e.jsxs(l.Group,{children:[e.jsx(t,{value:n.text,onChangeText:u("text"),placeholder:"请输入文本",clearable:!0}),e.jsx(t,{value:n.tel,type:"tel",onChangeText:u("tel"),placeholder:"请输入手机号"}),e.jsx(t,{value:n.digit,type:"digit",onChangeText:u("digit"),placeholder:"请输入整数"}),e.jsx(t,{value:n.number,type:"number",onChangeText:u("number"),placeholder:"请输入数字"}),e.jsx(t,{value:n.password,type:"password",onChangeText:u("password"),placeholder:"请输入密码"})]})}const g=`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputBasicDemo() {
  const [state, setState] = React.useState({
    text: "",
    tel: "",
    digit: "",
    number: "",
    password: "",
  })

  const update = (key: keyof typeof state) => (val: string) =>
    setState(prev => ({ ...prev, [key]: val }))

  return (
    <Cell.Group>
      <Input
        value={state.text}
        onChangeText={update("text")}
        placeholder="请输入文本"
        clearable
      />
      <Input
        value={state.tel}
        type="tel"
        onChangeText={update("tel")}
        placeholder="请输入手机号"
      />
      <Input
        value={state.digit}
        type="digit"
        onChangeText={update("digit")}
        placeholder="请输入整数"
      />
      <Input
        value={state.number}
        type="number"
        onChangeText={update("number")}
        placeholder="请输入数字"
      />
      <Input
        value={state.password}
        type="password"
        onChangeText={update("password")}
        placeholder="请输入密码"
      />
    </Cell.Group>
  )
}
`,f={code:g,sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputBasicDemo() {
  const [state, setState] = React.useState({
    text: "",
    tel: "",
    digit: "",
    number: "",
    password: "",
  })

  const update = (key: keyof typeof state) => (val: string) =>
    setState(prev => ({ ...prev, [key]: val }))

  return (
    <Cell.Group>
      <Input
        value={state.text}
        onChangeText={update("text")}
        placeholder="请输入文本"
        clearable
      />
      <Input
        value={state.tel}
        type="tel"
        onChangeText={update("tel")}
        placeholder="请输入手机号"
      />
      <Input
        value={state.digit}
        type="digit"
        onChangeText={update("digit")}
        placeholder="请输入整数"
      />
      <Input
        value={state.number}
        type="number"
        onChangeText={update("number")}
        placeholder="请输入数字"
      />
      <Input
        value={state.password}
        type="password"
        onChangeText={update("password")}
        placeholder="请输入密码"
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputBasicDemo() {
  const [state, setState] = React.useState({
    text: "",
    tel: "",
    digit: "",
    number: "",
    password: "",
  })

  const update = (key: keyof typeof state) => (val: string) =>
    setState(prev => ({ ...prev, [key]: val }))

  return (
    <Cell.Group>
      <Input
        value={state.text}
        onChangeText={update("text")}
        placeholder="请输入文本"
        clearable
      />
      <Input
        value={state.tel}
        type="tel"
        onChangeText={update("tel")}
        placeholder="请输入手机号"
      />
      <Input
        value={state.digit}
        type="digit"
        onChangeText={update("digit")}
        placeholder="请输入整数"
      />
      <Input
        value={state.number}
        type="number"
        onChangeText={update("number")}
        placeholder="请输入数字"
      />
      <Input
        value={state.password}
        type="password"
        onChangeText={update("password")}
        placeholder="请输入密码"
      />
    </Cell.Group>
  )
}
`}},title:"基础用法",identifier:"input-basic",lang:"tsx",meta:{title:"基础用法"}};function s(){const[n,r]=a.useState("");return e.jsx(l.Group,{children:e.jsx(t,{placeholder:"请输入文本",value:n,onChangeText:r,clearable:!0,clearTrigger:"always"})})}const I=`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </Cell.Group>
  )
}
`,y={code:I,sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </Cell.Group>
  )
}
`}},title:"清除按钮",identifier:"input-clearable",lang:"tsx",meta:{title:"清除按钮"}};function d(){const[n,r]=a.useState("");return e.jsx(l.Group,{children:e.jsx(t,{value:n,onChangeText:r,placeholder:"请输入短信验证码",prefix:"💁",suffix:e.jsx(v,{size:"small",type:"primary",onPress:()=>r(""),children:"发送"})})})}const F=`import React from "react"
import { Button, Cell, Input } from "react-native-system-ui"

export default function InputSlotsDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="请输入短信验证码"
        prefix="💁"
        suffix={(
          <Button size="small" type="primary" onPress={() => setValue("")}>
            发送
          </Button>
        )}
      />
    </Cell.Group>
  )
}
`,T={code:F,sources:{_:{tsx:`import React from "react"
import { Button, Cell, Input } from "react-native-system-ui"

export default function InputSlotsDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="请输入短信验证码"
        prefix="💁"
        suffix={(
          <Button size="small" type="primary" onPress={() => setValue("")}>
            发送
          </Button>
        )}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Button, Cell, Input } from "react-native-system-ui"

export default function InputSlotsDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="请输入短信验证码"
        prefix="💁"
        suffix={(
          <Button size="small" type="primary" onPress={() => setValue("")}>
            发送
          </Button>
        )}
      />
    </Cell.Group>
  )
}
`}},title:"插入内容",identifier:"input-slots",lang:"tsx",meta:{title:"插入内容"}};function c(){return e.jsxs(l.Group,{children:[e.jsx(t.TextArea,{placeholder:"多行输入"}),e.jsx(t.TextArea,{placeholder:"自适应高度",autoSize:!0}),e.jsx(t.TextArea,{placeholder:"最小高度80，最大高度120",autoSize:{minHeight:80,maxHeight:120}})]})}const A=`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputTextareaDemo() {
  return (
    <Cell.Group>
      <Input.TextArea placeholder="多行输入" />
      <Input.TextArea placeholder="自适应高度" autoSize />
      <Input.TextArea
        placeholder="最小高度80，最大高度120"
        autoSize={{ minHeight: 80, maxHeight: 120 }}
      />
    </Cell.Group>
  )
}
`,E={code:A,sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputTextareaDemo() {
  return (
    <Cell.Group>
      <Input.TextArea placeholder="多行输入" />
      <Input.TextArea placeholder="自适应高度" autoSize />
      <Input.TextArea
        placeholder="最小高度80，最大高度120"
        autoSize={{ minHeight: 80, maxHeight: 120 }}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputTextareaDemo() {
  return (
    <Cell.Group>
      <Input.TextArea placeholder="多行输入" />
      <Input.TextArea placeholder="自适应高度" autoSize />
      <Input.TextArea
        placeholder="最小高度80，最大高度120"
        autoSize={{ minHeight: 80, maxHeight: 120 }}
      />
    </Cell.Group>
  )
}
`}},title:"多行输入",identifier:"input-textarea",lang:"tsx",meta:{title:"多行输入"}};function p(){return e.jsxs(l.Group,{children:[e.jsx(t,{placeholder:"最多输入10个字符",maxLength:10,onOverlimit:()=>C.info("不能超过10个字符哦🍺")}),e.jsx(t.TextArea,{placeholder:"字数统计",maxLength:50,showWordLimit:!0}),e.jsx(t.TextArea,{placeholder:"自定义输出",maxLength:80,showWordLimit:({currentCount:n,maxLength:r})=>`已经输入${n}/${r??"∞"}个字啦 ✍️`})]})}const B=`import React from "react"
import { Cell, Input, Toast } from "react-native-system-ui"

export default function InputWordLimitDemo() {
  return (
    <Cell.Group>
      <Input
        placeholder="最多输入10个字符"
        maxLength={10}
        onOverlimit={() => Toast.info("不能超过10个字符哦🍺")}
      />
      <Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit />
      <Input.TextArea
        placeholder="自定义输出"
        maxLength={80}
        showWordLimit={({ currentCount, maxLength }) => \`已经输入\${currentCount}/\${maxLength ?? "∞"}个字啦 ✍️\`}
      />
    </Cell.Group>
  )
}
`,D={code:B,sources:{_:{tsx:`import React from "react"
import { Cell, Input, Toast } from "react-native-system-ui"

export default function InputWordLimitDemo() {
  return (
    <Cell.Group>
      <Input
        placeholder="最多输入10个字符"
        maxLength={10}
        onOverlimit={() => Toast.info("不能超过10个字符哦🍺")}
      />
      <Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit />
      <Input.TextArea
        placeholder="自定义输出"
        maxLength={80}
        showWordLimit={({ currentCount, maxLength }) => \`已经输入\${currentCount}/\${maxLength ?? "∞"}个字啦 ✍️\`}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input, Toast } from "react-native-system-ui"

export default function InputWordLimitDemo() {
  return (
    <Cell.Group>
      <Input
        placeholder="最多输入10个字符"
        maxLength={10}
        onOverlimit={() => Toast.info("不能超过10个字符哦🍺")}
      />
      <Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit />
      <Input.TextArea
        placeholder="自定义输出"
        maxLength={80}
        showWordLimit={({ currentCount, maxLength }) => \`已经输入\${currentCount}/\${maxLength ?? "∞"}个字啦 ✍️\`}
      />
    </Cell.Group>
  )
}
`}},title:"字数统计",identifier:"input-word-limit",lang:"tsx",meta:{title:"字数统计"}};function x(){const[n,r]=a.useState("");return e.jsxs(l.Group,{children:[e.jsx(t,{placeholder:"内容居中",value:n,onChangeText:r,align:"center"}),e.jsx(t,{placeholder:"内容右对齐",value:n,onChangeText:r,align:"right"})]})}const R=`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={value}
        onChangeText={setValue}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={value}
        onChangeText={setValue}
        align="right"
      />
    </Cell.Group>
  )
}
`,G={code:R,sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={value}
        onChangeText={setValue}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={value}
        onChangeText={setValue}
        align="right"
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={value}
        onChangeText={setValue}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={value}
        onChangeText={setValue}
        align="right"
      />
    </Cell.Group>
  )
}
`}},title:"对齐方式",identifier:"input-align",lang:"tsx",meta:{title:"对齐方式"}};function h(){const[n,r]=a.useState("只读模式"),[u,i]=a.useState("禁用模式");return e.jsxs(l.Group,{children:[e.jsx(t,{value:n,onChangeText:r,readOnly:!0}),e.jsx(t,{value:u,onChangeText:i,disabled:!0})]})}const b=`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputStatusDemo() {
  const [value1, setValue1] = React.useState("只读模式")
  const [value2, setValue2] = React.useState("禁用模式")

  return (
    <Cell.Group>
      <Input value={value1} onChangeText={setValue1} readOnly />
      <Input value={value2} onChangeText={setValue2} disabled />
    </Cell.Group>
  )
}
`,S={code:b,sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputStatusDemo() {
  const [value1, setValue1] = React.useState("只读模式")
  const [value2, setValue2] = React.useState("禁用模式")

  return (
    <Cell.Group>
      <Input value={value1} onChangeText={setValue1} readOnly />
      <Input value={value2} onChangeText={setValue2} disabled />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputStatusDemo() {
  const [value1, setValue1] = React.useState("只读模式")
  const [value2, setValue2] = React.useState("禁用模式")

  return (
    <Cell.Group>
      <Input value={value1} onChangeText={setValue1} readOnly />
      <Input value={value2} onChangeText={setValue2} disabled />
    </Cell.Group>
  )
}
`}},title:"输入框状态",identifier:"input-status",lang:"tsx",meta:{title:"输入框状态"}},L=function({previewer:n=()=>null,api:r=()=>null}){const u=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"input-输入框","data-anchor":"input-输入框",children:"Input 输入框"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:["基础输入组件，可直接搭配 ",e.jsx("code",{children:"Cell"}),"/",e.jsx("code",{children:"Form"})," 使用；同时提供 ",e.jsx("code",{children:"Input.TextArea"})," 处理多行输入、字数统计、自动增高等场景。"]}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(u,{code:"import { Input, type InputInstance } from 'react-native-system-ui'",lang:"ts"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(u,{...f,children:e.jsx(o,{})})}),e.jsx("h3",{id:"清除按钮","data-anchor":"清除按钮",children:"清除按钮"}),e.jsx("div",{children:e.jsx(u,{...y,children:e.jsx(s,{})})}),e.jsx("h3",{id:"插入内容","data-anchor":"插入内容",children:"插入内容"}),e.jsx("div",{children:e.jsx(u,{...T,children:e.jsx(d,{})})}),e.jsx("h3",{id:"多行输入","data-anchor":"多行输入",children:"多行输入"}),e.jsx("div",{children:e.jsx(u,{...E,children:e.jsx(c,{})})}),e.jsx("h3",{id:"字数统计","data-anchor":"字数统计",children:"字数统计"}),e.jsx("div",{children:e.jsx(u,{...D,children:e.jsx(p,{})})}),e.jsx("h3",{id:"对齐方式","data-anchor":"对齐方式",children:"对齐方式"}),e.jsx("div",{children:e.jsx(u,{...G,children:e.jsx(x,{})})}),e.jsx("h3",{id:"输入框状态","data-anchor":"输入框状态",children:"输入框状态"}),e.jsx("div",{children:e.jsx(u,{...S,children:e.jsx(h,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"input-props","data-anchor":"input-props",children:"Input Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"输入值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"初始值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"占位符"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsxs("td",{children:["输入类型；",e.jsx("code",{children:"number"})," 自动映射为 ",e.jsx("code",{children:"decimal-pad"}),"，",e.jsx("code",{children:"digit"})," 映射为 ",e.jsx("code",{children:"number-pad"}),"，",e.jsx("code",{children:"tel"})," 映射为 ",e.jsx("code",{children:"phone-pad"}),"（若显式传入 ",e.jsx("code",{children:"keyboardType"})," 则以其为准）"]}),e.jsx("td",{children:e.jsx("code",{children:"text | number | digit | password | tel | search"})}),e.jsx("td",{children:e.jsx("code",{children:"text"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"文本对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"left | center | right"})}),e.jsx("td",{children:e.jsx("code",{children:"left"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearable"})}),e.jsx("td",{children:"是否显示清除按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearTrigger"})}),e.jsx("td",{children:"清除按钮展示时机"}),e.jsx("td",{children:e.jsx("code",{children:"always | focus"})}),e.jsx("td",{children:e.jsx("code",{children:"focus"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearIcon"})}),e.jsx("td",{children:"自定义清除图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"prefix"})}),e.jsx("td",{children:"前置内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"suffix"})}),e.jsx("td",{children:"后置内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxLength"})}),e.jsx("td",{children:"限制输入长度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showWordLimit"})}),e.jsx("td",{children:"显示/自定义字数统计"}),e.jsx("td",{children:e.jsxs("code",{children:["boolean | (","{"," currentCount, maxLength ","}",") => ReactNode"]})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatter"})}),e.jsx("td",{children:"自定义格式化函数"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatTrigger"})}),e.jsx("td",{children:"格式化触发时机"}),e.jsx("td",{children:e.jsx("code",{children:"onChange | onBlur"})}),e.jsx("td",{children:e.jsx("code",{children:"onChange"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"输入变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClear"})}),e.jsx("td",{children:"点击清除按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOverlimit"})}),e.jsxs("td",{children:["超过 ",e.jsx("code",{children:"maxLength"})," 时触发"]}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inputStyle"})}),e.jsx("td",{children:"输入框样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldTokensOverride"})}),e.jsx("td",{children:"覆盖 Field tokens"}),e.jsx("td",{children:e.jsx("code",{children:"DeepPartial<FieldTokens>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tokensOverride"})}),e.jsx("td",{children:"覆盖 Input tokens"}),e.jsx("td",{children:e.jsx("code",{children:"DeepPartial<InputTokens>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余属性"}),e.jsxs("td",{children:["透传给内部 ",e.jsx("code",{children:"TextInput"})]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"inputtextarea-props","data-anchor":"inputtextarea-props",children:"Input.TextArea Props"}),e.jsxs("p",{children:[e.jsx("code",{children:"Input.TextArea"})," 支持除 ",e.jsx("code",{children:"type/align"})," 之外的所有 ",e.jsx("code",{children:"Input"})," 属性，并额外支持："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rows"})}),e.jsx("td",{children:"文本域行数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"2"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoSize"})}),e.jsxs("td",{children:["文本域自动高度设置，可传入 ",e.jsxs("code",{children:["{"," minHeight?: number; maxHeight?: number ","}"]}),"（单位：dp），会自动换算成 ",e.jsx("code",{children:"Field"})," 的 ",e.jsx("code",{children:"minRows/maxRows"})]}),e.jsx("td",{children:e.jsxs("code",{children:["boolean | ","{"," minHeight?: number; maxHeight?: number ","}"]})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"showWordLimit"})," 传入函数时，可使用 ",e.jsxs("code",{children:["(","{"," currentCount, maxLength ","}",") => ReactNode"]})," 自定义内容。"]})}),e.jsx("h3",{id:"ref-方法","data-anchor":"ref-方法",children:"Ref 方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"focus()"})}),e.jsx("td",{children:"让输入框获取焦点"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blur()"})}),e.jsx("td",{children:"让输入框失去焦点"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clear()"})}),e.jsxs("td",{children:["清空内容并触发 ",e.jsx("code",{children:"onChange"}),"/",e.jsx("code",{children:"onChangeText"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nativeElement"})}),e.jsxs("td",{children:["获取内部 ",e.jsx("code",{children:"TextInput"})," 引用"]})]})]})]})]})})},V=[{Component:o,key:"input-basic",sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputBasicDemo() {
  const [state, setState] = React.useState({
    text: "",
    tel: "",
    digit: "",
    number: "",
    password: "",
  })

  const update = (key: keyof typeof state) => (val: string) =>
    setState(prev => ({ ...prev, [key]: val }))

  return (
    <Cell.Group>
      <Input
        value={state.text}
        onChangeText={update("text")}
        placeholder="请输入文本"
        clearable
      />
      <Input
        value={state.tel}
        type="tel"
        onChangeText={update("tel")}
        placeholder="请输入手机号"
      />
      <Input
        value={state.digit}
        type="digit"
        onChangeText={update("digit")}
        placeholder="请输入整数"
      />
      <Input
        value={state.number}
        type="number"
        onChangeText={update("number")}
        placeholder="请输入数字"
      />
      <Input
        value={state.password}
        type="password"
        onChangeText={update("password")}
        placeholder="请输入密码"
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputBasicDemo() {
  const [state, setState] = React.useState({
    text: "",
    tel: "",
    digit: "",
    number: "",
    password: "",
  })

  const update = (key: keyof typeof state) => (val: string) =>
    setState(prev => ({ ...prev, [key]: val }))

  return (
    <Cell.Group>
      <Input
        value={state.text}
        onChangeText={update("text")}
        placeholder="请输入文本"
        clearable
      />
      <Input
        value={state.tel}
        type="tel"
        onChangeText={update("tel")}
        placeholder="请输入手机号"
      />
      <Input
        value={state.digit}
        type="digit"
        onChangeText={update("digit")}
        placeholder="请输入整数"
      />
      <Input
        value={state.number}
        type="number"
        onChangeText={update("number")}
        placeholder="请输入数字"
      />
      <Input
        value={state.password}
        type="password"
        onChangeText={update("password")}
        placeholder="请输入密码"
      />
    </Cell.Group>
  )
}
`}},title:"基础用法",identifier:"input-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:s,key:"input-clearable",sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputClearableDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="请输入文本"
        value={value}
        onChangeText={setValue}
        clearable
        clearTrigger="always"
      />
    </Cell.Group>
  )
}
`}},title:"清除按钮",identifier:"input-clearable",lang:"tsx",meta:{title:"清除按钮"}},{Component:d,key:"input-slots",sources:{_:{tsx:`import React from "react"
import { Button, Cell, Input } from "react-native-system-ui"

export default function InputSlotsDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="请输入短信验证码"
        prefix="💁"
        suffix={(
          <Button size="small" type="primary" onPress={() => setValue("")}>
            发送
          </Button>
        )}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Button, Cell, Input } from "react-native-system-ui"

export default function InputSlotsDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="请输入短信验证码"
        prefix="💁"
        suffix={(
          <Button size="small" type="primary" onPress={() => setValue("")}>
            发送
          </Button>
        )}
      />
    </Cell.Group>
  )
}
`}},title:"插入内容",identifier:"input-slots",lang:"tsx",meta:{title:"插入内容"}},{Component:c,key:"input-textarea",sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputTextareaDemo() {
  return (
    <Cell.Group>
      <Input.TextArea placeholder="多行输入" />
      <Input.TextArea placeholder="自适应高度" autoSize />
      <Input.TextArea
        placeholder="最小高度80，最大高度120"
        autoSize={{ minHeight: 80, maxHeight: 120 }}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputTextareaDemo() {
  return (
    <Cell.Group>
      <Input.TextArea placeholder="多行输入" />
      <Input.TextArea placeholder="自适应高度" autoSize />
      <Input.TextArea
        placeholder="最小高度80，最大高度120"
        autoSize={{ minHeight: 80, maxHeight: 120 }}
      />
    </Cell.Group>
  )
}
`}},title:"多行输入",identifier:"input-textarea",lang:"tsx",meta:{title:"多行输入"}},{Component:p,key:"input-word-limit",sources:{_:{tsx:`import React from "react"
import { Cell, Input, Toast } from "react-native-system-ui"

export default function InputWordLimitDemo() {
  return (
    <Cell.Group>
      <Input
        placeholder="最多输入10个字符"
        maxLength={10}
        onOverlimit={() => Toast.info("不能超过10个字符哦🍺")}
      />
      <Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit />
      <Input.TextArea
        placeholder="自定义输出"
        maxLength={80}
        showWordLimit={({ currentCount, maxLength }) => \`已经输入\${currentCount}/\${maxLength ?? "∞"}个字啦 ✍️\`}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input, Toast } from "react-native-system-ui"

export default function InputWordLimitDemo() {
  return (
    <Cell.Group>
      <Input
        placeholder="最多输入10个字符"
        maxLength={10}
        onOverlimit={() => Toast.info("不能超过10个字符哦🍺")}
      />
      <Input.TextArea placeholder="字数统计" maxLength={50} showWordLimit />
      <Input.TextArea
        placeholder="自定义输出"
        maxLength={80}
        showWordLimit={({ currentCount, maxLength }) => \`已经输入\${currentCount}/\${maxLength ?? "∞"}个字啦 ✍️\`}
      />
    </Cell.Group>
  )
}
`}},title:"字数统计",identifier:"input-word-limit",lang:"tsx",meta:{title:"字数统计"}},{Component:x,key:"input-align",sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={value}
        onChangeText={setValue}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={value}
        onChangeText={setValue}
        align="right"
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputAlignDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Cell.Group>
      <Input
        placeholder="内容居中"
        value={value}
        onChangeText={setValue}
        align="center"
      />
      <Input
        placeholder="内容右对齐"
        value={value}
        onChangeText={setValue}
        align="right"
      />
    </Cell.Group>
  )
}
`}},title:"对齐方式",identifier:"input-align",lang:"tsx",meta:{title:"对齐方式"}},{Component:h,key:"input-status",sources:{_:{tsx:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputStatusDemo() {
  const [value1, setValue1] = React.useState("只读模式")
  const [value2, setValue2] = React.useState("禁用模式")

  return (
    <Cell.Group>
      <Input value={value1} onChangeText={setValue1} readOnly />
      <Input value={value2} onChangeText={setValue2} disabled />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Cell, Input } from "react-native-system-ui"

export default function InputStatusDemo() {
  const [value1, setValue1] = React.useState("只读模式")
  const [value2, setValue2] = React.useState("禁用模式")

  return (
    <Cell.Group>
      <Input value={value1} onChangeText={setValue1} readOnly />
      <Input value={value2} onChangeText={setValue2} disabled />
    </Cell.Group>
  )
}
`}},title:"输入框状态",identifier:"input-status",lang:"tsx",meta:{title:"输入框状态"}}],w={simulator:{compact:!0}},P=[{depth:1,text:"Input 输入框",id:"input-输入框"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"清除按钮",id:"清除按钮"},{depth:3,text:"插入内容",id:"插入内容"},{depth:3,text:"多行输入",id:"多行输入"},{depth:3,text:"字数统计",id:"字数统计"},{depth:3,text:"对齐方式",id:"对齐方式"},{depth:3,text:"输入框状态",id:"输入框状态"},{depth:2,text:"API",id:"api"},{depth:3,text:"Input Props",id:"input-props"},{depth:3,text:"Input.TextArea Props",id:"inputtextarea-props"},{depth:3,text:"Ref 方法",id:"ref-方法"}],_="/docs/components/input.md",M="Input 输入框",N="1770111044000",Fe=n=>n.children({MdContent:L,demos:V,frontmatter:w,slugs:P,filePath:_,title:M,updatedTime:N});export{L as MdContent,Fe as default,V as demos,_ as filePath,w as frontmatter,P as slugs,M as title,N as updatedTime};
