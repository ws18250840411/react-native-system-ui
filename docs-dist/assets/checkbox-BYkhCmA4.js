import{R as u,j as e}from"./main-BuQiU471.js";import{C as c}from"./index-BkauzKFE.js";import{S as r}from"./Space-BsyLL5rO.js";import{I as v}from"./Image-C7En2glh.js";import{T as d}from"./index-C-QcjePq.js";import{B as s}from"./index-CvolElyI.js";import{C as l}from"./index-CvjfcfGO.js";import"./useFormValidationState-B85i9Crq.js";import"./useAriaPress-D5uAXibC.js";import"./index-CJrLMJTa.js";import"./useLabel-CxgFAoPc.js";import"./extends-CF3RwP-h.js";import"./createComponentTokensHook-BZh_OSSd.js";import"./index-BRfylSA6.js";import"./number-DwcHNqSr.js";import"./index-Ct6-Nt5P.js";import"./index-BAZkLH96.js";import"./index-CA-bMxjH.js";import"./Portal-Bl5GJ6OP.js";import"./Overlay-BCBJ7Bg0.js";import"./Loading-0Dos1lSL.js";import"./Checked-CNW_UclJ.js";import"./IconBase-CrFgzAiS.js";import"./Close-6I0X32OQ.js";import"./index-COVjMqe7.js";import"./Animated-CaOvDCxr.js";import"./index-CfLKkUWT.js";import"./SafeAreaView-B7j4syYp.js";import"./useSafeAreaPadding-Dnz88xZy.js";import"./useOverlayStack-B_-drOoO.js";import"./animation-BpxpeSKC.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-DLepBbWK.js";import"./Arrow-xfLuWLNA.js";import"./hairline-MnVzd1gq.js";const h=()=>{const[n,o]=u.useState(!1);return e.jsxs(r,{direction:"vertical",gap:12,children:[e.jsx(c,{checked:n,onChange:o,children:"复选框"}),e.jsx(c,{defaultChecked:!0,onChange:t=>console.log(t),children:"默认勾选"}),e.jsx(c,{disabled:!0,children:"禁用复选框"}),e.jsx(c,{defaultChecked:!0,labelDisabled:!0,children:"禁止文本点击"})]})},f=`import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      >
        复选框
      </Checkbox>
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <Checkbox disabled>禁用复选框</Checkbox>
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </Space>
  )
}
`,F={code:f,sources:{_:{tsx:`import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      >
        复选框
      </Checkbox>
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <Checkbox disabled>禁用复选框</Checkbox>
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      >
        复选框
      </Checkbox>
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <Checkbox disabled>禁用复选框</Checkbox>
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </Space>
  )
}
`}},title:"基础用法",identifier:"checkbox-basic",lang:"tsx",meta:{title:"基础用法"}},E="https://img.yzcdn.cn/vant/user-active.png",D="https://img.yzcdn.cn/vant/user-inactive.png",x=()=>e.jsxs(r,{direction:"vertical",gap:12,children:[e.jsx(c,{defaultChecked:!0,shape:"square",onChange:n=>console.log("自定义形状",n),children:"自定义形状"}),e.jsx(c,{defaultChecked:!0,checkedColor:"#ee0a24",onChange:n=>console.log("自定义颜色",n),children:"自定义颜色"}),e.jsx(c,{defaultChecked:!0,iconSize:24,onChange:n=>console.log("自定义大小",n),children:"自定义大小"}),e.jsx(c,{defaultChecked:!0,iconSize:24,iconRender:({checked:n})=>e.jsx(v,{src:n?E:D,width:24,height:24,fit:"contain"}),onChange:n=>console.log("自定义图标",n),children:"自定义图标"})]}),y=`import React from 'react'
import { Checkbox, Image, Space } from 'react-native-system-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => (
  <Space direction="vertical" gap={12}>
    <Checkbox
      defaultChecked
      shape="square"
      onChange={val => console.log('自定义形状', val)}
    >
      自定义形状
    </Checkbox>
    <Checkbox
      defaultChecked
      checkedColor="#ee0a24"
      onChange={val => console.log('自定义颜色', val)}
    >
      自定义颜色
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      onChange={val => console.log('自定义大小', val)}
    >
      自定义大小
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      iconRender={({ checked }) => (
        <Image src={checked ? activeIcon : inactiveIcon} width={24} height={24} fit="contain" />
      )}
      onChange={val => console.log('自定义图标', val)}
    >
      自定义图标
    </Checkbox>
  </Space>
)
`,B={code:y,sources:{_:{tsx:`import React from 'react'
import { Checkbox, Image, Space } from 'react-native-system-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => (
  <Space direction="vertical" gap={12}>
    <Checkbox
      defaultChecked
      shape="square"
      onChange={val => console.log('自定义形状', val)}
    >
      自定义形状
    </Checkbox>
    <Checkbox
      defaultChecked
      checkedColor="#ee0a24"
      onChange={val => console.log('自定义颜色', val)}
    >
      自定义颜色
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      onChange={val => console.log('自定义大小', val)}
    >
      自定义大小
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      iconRender={({ checked }) => (
        <Image src={checked ? activeIcon : inactiveIcon} width={24} height={24} fit="contain" />
      )}
      onChange={val => console.log('自定义图标', val)}
    >
      自定义图标
    </Checkbox>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Image, Space } from 'react-native-system-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => (
  <Space direction="vertical" gap={12}>
    <Checkbox
      defaultChecked
      shape="square"
      onChange={val => console.log('自定义形状', val)}
    >
      自定义形状
    </Checkbox>
    <Checkbox
      defaultChecked
      checkedColor="#ee0a24"
      onChange={val => console.log('自定义颜色', val)}
    >
      自定义颜色
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      onChange={val => console.log('自定义大小', val)}
    >
      自定义大小
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      iconRender={({ checked }) => (
        <Image src={checked ? activeIcon : inactiveIcon} width={24} height={24} fit="contain" />
      )}
      onChange={val => console.log('自定义图标', val)}
    >
      自定义图标
    </Checkbox>
  </Space>
)
`}},title:"自定义",identifier:"checkbox-custom",lang:"tsx",meta:{title:"自定义"}};function C(){const[n,o]=u.useState(!1);return e.jsx(c,{checked:n,onChange:t=>{d.loading({forbidClick:!0,duration:0}),setTimeout(()=>{d.clear(),o(t)},500)},children:"复选框"})}const R=`import React from 'react'
import { Checkbox, Toast } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={val => {
        Toast.loading({ forbidClick: true, duration: 0 })

        setTimeout(() => {
          Toast.clear()
          setChecked(val)
        }, 500)
      }}
    >
      复选框
    </Checkbox>
  )
}
`,A={code:R,sources:{_:{tsx:`import React from 'react'
import { Checkbox, Toast } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={val => {
        Toast.loading({ forbidClick: true, duration: 0 })

        setTimeout(() => {
          Toast.clear()
          setChecked(val)
        }, 500)
      }}
    >
      复选框
    </Checkbox>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Toast } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={val => {
        Toast.loading({ forbidClick: true, duration: 0 })

        setTimeout(() => {
          Toast.clear()
          setChecked(val)
        }, 500)
      }}
    >
      复选框
    </Checkbox>
  )
}
`}},title:"异步更新",identifier:"checkbox-async",lang:"tsx",meta:{title:"异步更新"}},b=()=>e.jsxs(c.Group,{defaultValue:["a","b"],onChange:n=>console.log(n),children:[e.jsx(c,{name:"a",children:"复选框组a"}),e.jsx(c,{name:"b",children:"复选框组b"}),e.jsx(c,{name:"c",children:"复选框组c"})]}),S=`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => {
  return (
    <Checkbox.Group defaultValue={['a', 'b']} onChange={v => console.log(v)}>
      <Checkbox name="a">复选框组a</Checkbox>
      <Checkbox name="b">复选框组b</Checkbox>
      <Checkbox name="c">复选框组c</Checkbox>
    </Checkbox.Group>
  )
}
`,P={code:S,sources:{_:{tsx:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => {
  return (
    <Checkbox.Group defaultValue={['a', 'b']} onChange={v => console.log(v)}>
      <Checkbox name="a">复选框组a</Checkbox>
      <Checkbox name="b">复选框组b</Checkbox>
      <Checkbox name="c">复选框组c</Checkbox>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => {
  return (
    <Checkbox.Group defaultValue={['a', 'b']} onChange={v => console.log(v)}>
      <Checkbox name="a">复选框组a</Checkbox>
      <Checkbox name="b">复选框组b</Checkbox>
      <Checkbox name="c">复选框组c</Checkbox>
    </Checkbox.Group>
  )
}
`}},title:"复选框组",identifier:"checkbox-group",lang:"tsx",meta:{title:"复选框组"}};function k(){return e.jsxs(c.Group,{defaultValue:[],direction:"horizontal",children:[e.jsx(c,{name:"a",children:"复选框a"}),e.jsx(c,{name:"b",children:"复选框b"})]})}const G=`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group defaultValue={[]} direction="horizontal">
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
    </Checkbox.Group>
  )
}
`,V={code:G,sources:{_:{tsx:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group defaultValue={[]} direction="horizontal">
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group defaultValue={[]} direction="horizontal">
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
    </Checkbox.Group>
  )
}
`}},title:"水平排列",identifier:"checkbox-direction",lang:"tsx",meta:{title:"水平排列"}};function p(){return e.jsxs(c.Group,{defaultValue:[],max:2,children:[e.jsx(c,{name:"a",children:"复选框a"}),e.jsx(c,{name:"b",children:"复选框b"}),e.jsx(c,{name:"c",children:"复选框c"})]})}const I=`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  return (
    <Checkbox.Group defaultValue={[]} max={2}>
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
      <Checkbox name="c">复选框c</Checkbox>
    </Checkbox.Group>
  )
}
`,_={code:I,sources:{_:{tsx:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  return (
    <Checkbox.Group defaultValue={[]} max={2}>
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
      <Checkbox name="c">复选框c</Checkbox>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  return (
    <Checkbox.Group defaultValue={[]} max={2}>
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
      <Checkbox name="c">复选框c</Checkbox>
    </Checkbox.Group>
  )
}
`}},title:"最大可选数",identifier:"checkbox-max",lang:"tsx",meta:{title:"最大可选数"}};function m(){const n=u.useRef(null),[o,t]=u.useState(["a"]);return e.jsxs(r,{direction:"vertical",gap:12,children:[e.jsxs(c.Group,{ref:n,value:o,onChange:t,children:[e.jsx(c,{name:"a",children:"复选框组a"}),e.jsx(c,{name:"b",children:"复选框组b"}),e.jsx(c,{name:"c",children:"复选框组c"})]}),e.jsxs(r,{direction:"horizontal",gap:8,children:[e.jsx(s,{type:"primary",onPress:()=>n.current?.toggleAll(!0),children:"全选"}),e.jsx(s,{type:"primary",onPress:()=>n.current?.toggleAll(),children:"反选"})]})]})}const M=`import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const [value, setValue] = React.useState<(string | number)[]>(['a'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group ref={groupRef} value={value} onChange={setValue}>
        <Checkbox name="a">复选框组a</Checkbox>
        <Checkbox name="b">复选框组b</Checkbox>
        <Checkbox name="c">复选框组c</Checkbox>
      </Checkbox.Group>

      <Space direction="horizontal" gap={8}>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll()}>
          反选
        </Button>
      </Space>
    </Space>
  )
}
`,z={code:M,sources:{_:{tsx:`import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const [value, setValue] = React.useState<(string | number)[]>(['a'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group ref={groupRef} value={value} onChange={setValue}>
        <Checkbox name="a">复选框组a</Checkbox>
        <Checkbox name="b">复选框组b</Checkbox>
        <Checkbox name="c">复选框组c</Checkbox>
      </Checkbox.Group>

      <Space direction="horizontal" gap={8}>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll()}>
          反选
        </Button>
      </Space>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const [value, setValue] = React.useState<(string | number)[]>(['a'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group ref={groupRef} value={value} onChange={setValue}>
        <Checkbox name="a">复选框组a</Checkbox>
        <Checkbox name="b">复选框组b</Checkbox>
        <Checkbox name="c">复选框组c</Checkbox>
      </Checkbox.Group>

      <Space direction="horizontal" gap={8}>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll()}>
          反选
        </Button>
      </Space>
    </Space>
  )
}
`}},title:"全选与反选",identifier:"checkbox-ref",lang:"tsx",meta:{title:"全选与反选"}};function j(){const[n,o]=u.useState([]),t=a=>{o(i=>i.includes(a)?i.filter(g=>g!==a):[...i,a])};return e.jsx(c.Group,{value:n,onChange:o,children:e.jsxs(l.Group,{children:[e.jsx(l,{clickable:!0,title:"单选框1",onPress:()=>t("a"),rightIcon:e.jsx(c,{name:"a"})}),e.jsx(l,{clickable:!0,title:"单选框2",onPress:()=>t("b"),rightIcon:e.jsx(c,{name:"b"})})]})})}const N=`import React from 'react'
import { Checkbox, Cell, type CheckboxValue } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<CheckboxValue[]>([])

  const toggle = (name: CheckboxValue) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group>
        <Cell
          clickable
          title="单选框1"
          onPress={() => toggle('a')}
          rightIcon={<Checkbox name="a" />}
        />
        <Cell
          clickable
          title="单选框2"
          onPress={() => toggle('b')}
          rightIcon={<Checkbox name="b" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
`,T={code:N,sources:{_:{tsx:`import React from 'react'
import { Checkbox, Cell, type CheckboxValue } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<CheckboxValue[]>([])

  const toggle = (name: CheckboxValue) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group>
        <Cell
          clickable
          title="单选框1"
          onPress={() => toggle('a')}
          rightIcon={<Checkbox name="a" />}
        />
        <Cell
          clickable
          title="单选框2"
          onPress={() => toggle('b')}
          rightIcon={<Checkbox name="b" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Cell, type CheckboxValue } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<CheckboxValue[]>([])

  const toggle = (name: CheckboxValue) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group>
        <Cell
          clickable
          title="单选框1"
          onPress={() => toggle('a')}
          rightIcon={<Checkbox name="a" />}
        />
        <Cell
          clickable
          title="单选框2"
          onPress={() => toggle('b')}
          rightIcon={<Checkbox name="b" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
`}},title:"搭配单元格组件使用",identifier:"checkbox-cell",lang:"tsx",meta:{title:"搭配单元格组件使用"}},L=function({previewer:n=()=>null,api:o=()=>null}){const t=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"checkbox-复选框","data-anchor":"checkbox-复选框",children:"Checkbox 复选框"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:["用于在选中和未选中状态之间切换，可单独使用，也可通过 ",e.jsx("code",{children:"Checkbox.Group"})," 组合成列表，基于 ",e.jsx("code",{children:"@react-native-aria/checkbox"})," 提供可访问能力。"]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当 ",e.jsx("code",{children:"children"})," 为自定义节点（非纯文本）时，建议额外传入 ",e.jsx("code",{children:"accessibilityLabel"}),"（或 Web 下的 ",e.jsx("code",{children:"aria-label"}),"），以获得更好的无障碍体验。"]})}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { Checkbox } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["使用 ",e.jsx("code",{children:"defaultChecked"})," 设置默认值。"]}),e.jsxs("li",{children:["通过 ",e.jsx("code",{children:"disabled"})," 禁用交互，",e.jsx("code",{children:"labelDisabled"})," 禁用文案点击。"]})]}),e.jsx("div",{children:e.jsx(t,{...F,children:e.jsx(h,{})})}),e.jsx("h3",{id:"自定义","data-anchor":"自定义",children:"自定义"}),e.jsxs("p",{children:[e.jsx("code",{children:'shape="square"'})," 可切换形状，",e.jsx("code",{children:"checkedColor"}),"、",e.jsx("code",{children:"iconSize"}),"、",e.jsx("code",{children:"iconRender"})," 支持定制样式。"]}),e.jsx("div",{children:e.jsx(t,{...B,children:e.jsx(x,{})})}),e.jsx("h3",{id:"异步更新","data-anchor":"异步更新",children:"异步更新"}),e.jsxs("p",{children:["配合 ",e.jsx("code",{children:"checked + onChange"})," 受控模式，在回调中手动更新状态，适合异步确认的场景。"]}),e.jsx("div",{children:e.jsx(t,{...A,children:e.jsx(C,{})})}),e.jsx("h3",{id:"复选框组","data-anchor":"复选框组",children:"复选框组"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"Checkbox.Group"})," 管理一组选项，",e.jsx("code",{children:"value/onChange"})," 语义与常见实现保持一致。"]}),e.jsx("div",{children:e.jsx(t,{...P,children:e.jsx(b,{})})}),e.jsx("h3",{id:"水平排列","data-anchor":"水平排列",children:"水平排列"}),e.jsxs("p",{children:[e.jsx("code",{children:'direction="horizontal"'})," 时横向排列，",e.jsx("code",{children:"gap"})," 可调整间距。"]}),e.jsx("div",{children:e.jsx(t,{...V,children:e.jsx(k,{})})}),e.jsx("h3",{id:"最大可选数","data-anchor":"最大可选数",children:"最大可选数"}),e.jsxs("p",{children:[e.jsx("code",{children:"max"})," 用于限制可选数量，超过上限将不再切换。"]}),e.jsx("div",{children:e.jsx(t,{..._,children:e.jsx(p,{})})}),e.jsx("h3",{id:"全选与反选","data-anchor":"全选与反选",children:"全选与反选"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"ref"})," 调用 ",e.jsx("code",{children:"toggleAll"}),"，可实现全选、全不选以及跳过禁用项的反选。"]}),e.jsx("div",{children:e.jsx(t,{...z,children:e.jsx(m,{})})}),e.jsx("h3",{id:"搭配单元格使用","data-anchor":"搭配单元格使用",children:"搭配单元格使用"}),e.jsxs("p",{children:["在 ",e.jsx("code",{children:"Cell"})," 列表中放置 ",e.jsx("code",{children:"Checkbox"}),"，适合设置项等场景。"]}),e.jsx("div",{children:e.jsx(t,{...T,children:e.jsx(j,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"checkbox-props","data-anchor":"checkbox-props",children:"Checkbox Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"name"})," / ",e.jsx("code",{children:"value"})]}),e.jsxs("td",{children:["选项标识，",e.jsx("code",{children:"Checkbox.Group"})," 中必填"]}),e.jsx("td",{children:e.jsx("code",{children:"CheckboxValue"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"checked"})}),e.jsx("td",{children:"是否选中（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultChecked"})}),e.jsx("td",{children:"默认选中状态（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"shape"})}),e.jsx("td",{children:"图标形状"}),e.jsx("td",{children:e.jsx("code",{children:"'round' | 'square'"})}),e.jsx("td",{children:e.jsx("code",{children:"'round'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconSize"})}),e.jsx("td",{children:"图标大小"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"20"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconRender"})}),e.jsx("td",{children:"自定义图标渲染"}),e.jsx("td",{children:e.jsx("code",{children:"CheckboxIconRender"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"checkedColor"})}),e.jsx("td",{children:"选中时的背景与描边颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题主色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelPosition"})}),e.jsxs("td",{children:["文案位置，",e.jsx("code",{children:"left"})," / ",e.jsx("code",{children:"right"})]}),e.jsx("td",{children:e.jsx("code",{children:"CheckboxLabelPosition"})}),e.jsx("td",{children:e.jsx("code",{children:"right"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelDisabled"})}),e.jsx("td",{children:"是否禁用文案点击"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"bindGroup"})}),e.jsxs("td",{children:["是否与外层 ",e.jsx("code",{children:"Checkbox.Group"})," 关联（单独使用时可关闭）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中状态变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(checked: boolean) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击图标或文案触发"}),e.jsx("td",{children:e.jsx("code",{children:"(event: GestureResponderEvent) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelStyle"})}),e.jsx("td",{children:"文案样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"checkboxgroup-props","data-anchor":"checkboxgroup-props",children:"Checkbox.Group Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"选中项集合（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"CheckboxValue[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中集合（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"CheckboxValue[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选项变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: CheckboxValue[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用整组"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsx("td",{children:"布局方向"}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal' | 'vertical'"})}),e.jsx("td",{children:e.jsx("code",{children:"'vertical'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"max"})}),e.jsx("td",{children:"最多可选几个项目"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"shape"})}),e.jsxs("td",{children:["统一设置子项 ",e.jsx("code",{children:"shape"})]}),e.jsx("td",{children:e.jsx("code",{children:"'round' | 'square'"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconSize"})}),e.jsx("td",{children:"统一设置子项图标大小"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconRender"})}),e.jsx("td",{children:"统一设置子项自定义图标"}),e.jsx("td",{children:e.jsx("code",{children:"CheckboxIconRender"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"checkedColor"})}),e.jsx("td",{children:"统一设置选中颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelDisabled"})}),e.jsxs("td",{children:["统一设置 ",e.jsx("code",{children:"labelDisabled"})]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gap"})}),e.jsx("td",{children:"子项间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"主题 spacing.md（默认 12）"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["需要动态渲染选项时，确保每个 ",e.jsx("code",{children:"Checkbox"})," 提供唯一的 ",e.jsx("code",{children:"name"}),"，否则无法正确管理选中状态。"]})}),e.jsx("h3",{id:"checkbox-事件","data-anchor":"checkbox-事件",children:"Checkbox 事件"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中状态变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"checked: boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击图标或文案时触发"}),e.jsx("td",{children:e.jsx("code",{children:"event: GestureResponderEvent"})})]})]})]}),e.jsx("h3",{id:"checkboxgroup-事件","data-anchor":"checkboxgroup-事件",children:"Checkbox.Group 事件"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中集合变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"value: CheckboxValue[]"})})]})})]}),e.jsx("h3",{id:"checkboxgroup-方法","data-anchor":"checkboxgroup-方法",children:"Checkbox.Group 方法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"ref"})," 获取实例后调用。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"toggleAll"})}),e.jsxs("td",{children:["切换所有子项；传 ",e.jsx("code",{children:"true"})," 全选，",e.jsx("code",{children:"false"})," 全不选，",e.jsxs("code",{children:["{"," skipDisabled: true ","}"]})," 可跳过禁用项"]}),e.jsx("td",{children:e.jsxs("code",{children:["boolean | ","{"," checked?: boolean; skipDisabled?: boolean ","}"]})}),e.jsx("td",{children:e.jsx("code",{children:"void"})})]})})]}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Checkbox.Group"})," 的默认值属性命名为 ",e.jsx("code",{children:"defaultValue"}),"（遵循 React Native 受控/非受控写法）；在一些实现中默认值属性名为 ",e.jsx("code",{children:"defaultChecked"}),"。"]}),e.jsxs("li",{children:["暂未暴露单个 ",e.jsx("code",{children:"Checkbox"})," 的实例方法/类型（",e.jsx("code",{children:"toggle"}),"、",e.jsx("code",{children:"CheckboxInstance"}),"），批量操作请使用受控模式或 ",e.jsx("code",{children:"Group.toggleAll"}),"。"]})]})]})})},w=[{Component:h,key:"checkbox-basic",sources:{_:{tsx:`import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      >
        复选框
      </Checkbox>
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <Checkbox disabled>禁用复选框</Checkbox>
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Space, Checkbox } from 'react-native-system-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      >
        复选框
      </Checkbox>
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <Checkbox disabled>禁用复选框</Checkbox>
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </Space>
  )
}
`}},title:"基础用法",identifier:"checkbox-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:x,key:"checkbox-custom",sources:{_:{tsx:`import React from 'react'
import { Checkbox, Image, Space } from 'react-native-system-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => (
  <Space direction="vertical" gap={12}>
    <Checkbox
      defaultChecked
      shape="square"
      onChange={val => console.log('自定义形状', val)}
    >
      自定义形状
    </Checkbox>
    <Checkbox
      defaultChecked
      checkedColor="#ee0a24"
      onChange={val => console.log('自定义颜色', val)}
    >
      自定义颜色
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      onChange={val => console.log('自定义大小', val)}
    >
      自定义大小
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      iconRender={({ checked }) => (
        <Image src={checked ? activeIcon : inactiveIcon} width={24} height={24} fit="contain" />
      )}
      onChange={val => console.log('自定义图标', val)}
    >
      自定义图标
    </Checkbox>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Image, Space } from 'react-native-system-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => (
  <Space direction="vertical" gap={12}>
    <Checkbox
      defaultChecked
      shape="square"
      onChange={val => console.log('自定义形状', val)}
    >
      自定义形状
    </Checkbox>
    <Checkbox
      defaultChecked
      checkedColor="#ee0a24"
      onChange={val => console.log('自定义颜色', val)}
    >
      自定义颜色
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      onChange={val => console.log('自定义大小', val)}
    >
      自定义大小
    </Checkbox>
    <Checkbox
      defaultChecked
      iconSize={24}
      iconRender={({ checked }) => (
        <Image src={checked ? activeIcon : inactiveIcon} width={24} height={24} fit="contain" />
      )}
      onChange={val => console.log('自定义图标', val)}
    >
      自定义图标
    </Checkbox>
  </Space>
)
`}},title:"自定义",identifier:"checkbox-custom",lang:"tsx",meta:{title:"自定义"}},{Component:C,key:"checkbox-async",sources:{_:{tsx:`import React from 'react'
import { Checkbox, Toast } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={val => {
        Toast.loading({ forbidClick: true, duration: 0 })

        setTimeout(() => {
          Toast.clear()
          setChecked(val)
        }, 500)
      }}
    >
      复选框
    </Checkbox>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Toast } from 'react-native-system-ui'

export default function CheckboxAsyncDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={val => {
        Toast.loading({ forbidClick: true, duration: 0 })

        setTimeout(() => {
          Toast.clear()
          setChecked(val)
        }, 500)
      }}
    >
      复选框
    </Checkbox>
  )
}
`}},title:"异步更新",identifier:"checkbox-async",lang:"tsx",meta:{title:"异步更新"}},{Component:b,key:"checkbox-group",sources:{_:{tsx:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => {
  return (
    <Checkbox.Group defaultValue={['a', 'b']} onChange={v => console.log(v)}>
      <Checkbox name="a">复选框组a</Checkbox>
      <Checkbox name="b">复选框组b</Checkbox>
      <Checkbox name="c">复选框组c</Checkbox>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default () => {
  return (
    <Checkbox.Group defaultValue={['a', 'b']} onChange={v => console.log(v)}>
      <Checkbox name="a">复选框组a</Checkbox>
      <Checkbox name="b">复选框组b</Checkbox>
      <Checkbox name="c">复选框组c</Checkbox>
    </Checkbox.Group>
  )
}
`}},title:"复选框组",identifier:"checkbox-group",lang:"tsx",meta:{title:"复选框组"}},{Component:k,key:"checkbox-direction",sources:{_:{tsx:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group defaultValue={[]} direction="horizontal">
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxDirectionDemo() {
  return (
    <Checkbox.Group defaultValue={[]} direction="horizontal">
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
    </Checkbox.Group>
  )
}
`}},title:"水平排列",identifier:"checkbox-direction",lang:"tsx",meta:{title:"水平排列"}},{Component:p,key:"checkbox-max",sources:{_:{tsx:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  return (
    <Checkbox.Group defaultValue={[]} max={2}>
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
      <Checkbox name="c">复选框c</Checkbox>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox } from 'react-native-system-ui'

export default function CheckboxMaxDemo() {
  return (
    <Checkbox.Group defaultValue={[]} max={2}>
      <Checkbox name="a">复选框a</Checkbox>
      <Checkbox name="b">复选框b</Checkbox>
      <Checkbox name="c">复选框c</Checkbox>
    </Checkbox.Group>
  )
}
`}},title:"最大可选数",identifier:"checkbox-max",lang:"tsx",meta:{title:"最大可选数"}},{Component:m,key:"checkbox-ref",sources:{_:{tsx:`import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const [value, setValue] = React.useState<(string | number)[]>(['a'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group ref={groupRef} value={value} onChange={setValue}>
        <Checkbox name="a">复选框组a</Checkbox>
        <Checkbox name="b">复选框组b</Checkbox>
        <Checkbox name="c">复选框组c</Checkbox>
      </Checkbox.Group>

      <Space direction="horizontal" gap={8}>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll()}>
          反选
        </Button>
      </Space>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Button, Space } from 'react-native-system-ui'

export default function CheckboxToggleAllDemo() {
  const groupRef = React.useRef<{
    toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void
  } | null>(null)

  const [value, setValue] = React.useState<(string | number)[]>(['a'])

  return (
    <Space direction="vertical" gap={12}>
      <Checkbox.Group ref={groupRef} value={value} onChange={setValue}>
        <Checkbox name="a">复选框组a</Checkbox>
        <Checkbox name="b">复选框组b</Checkbox>
        <Checkbox name="c">复选框组c</Checkbox>
      </Checkbox.Group>

      <Space direction="horizontal" gap={8}>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type="primary" onPress={() => groupRef.current?.toggleAll()}>
          反选
        </Button>
      </Space>
    </Space>
  )
}
`}},title:"全选与反选",identifier:"checkbox-ref",lang:"tsx",meta:{title:"全选与反选"}},{Component:j,key:"checkbox-cell",sources:{_:{tsx:`import React from 'react'
import { Checkbox, Cell, type CheckboxValue } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<CheckboxValue[]>([])

  const toggle = (name: CheckboxValue) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group>
        <Cell
          clickable
          title="单选框1"
          onPress={() => toggle('a')}
          rightIcon={<Checkbox name="a" />}
        />
        <Cell
          clickable
          title="单选框2"
          onPress={() => toggle('b')}
          rightIcon={<Checkbox name="b" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Checkbox, Cell, type CheckboxValue } from 'react-native-system-ui'

export default function CheckboxCellDemo() {
  const [value, setValue] = React.useState<CheckboxValue[]>([])

  const toggle = (name: CheckboxValue) => {
    setValue(list =>
      list.includes(name) ? list.filter(item => item !== name) : [...list, name]
    )
  }

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Cell.Group>
        <Cell
          clickable
          title="单选框1"
          onPress={() => toggle('a')}
          rightIcon={<Checkbox name="a" />}
        />
        <Cell
          clickable
          title="单选框2"
          onPress={() => toggle('b')}
          rightIcon={<Checkbox name="b" />}
        />
      </Cell.Group>
    </Checkbox.Group>
  )
}
`}},title:"搭配单元格组件使用",identifier:"checkbox-cell",lang:"tsx",meta:{title:"搭配单元格组件使用"}}],$={simulator:{compact:!1}},q=[{depth:1,text:"Checkbox 复选框",id:"checkbox-复选框"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义",id:"自定义"},{depth:3,text:"异步更新",id:"异步更新"},{depth:3,text:"复选框组",id:"复选框组"},{depth:3,text:"水平排列",id:"水平排列"},{depth:3,text:"最大可选数",id:"最大可选数"},{depth:3,text:"全选与反选",id:"全选与反选"},{depth:3,text:"搭配单元格使用",id:"搭配单元格使用"},{depth:2,text:"API",id:"api"},{depth:3,text:"Checkbox Props",id:"checkbox-props"},{depth:3,text:"Checkbox.Group Props",id:"checkboxgroup-props"},{depth:3,text:"Checkbox 事件",id:"checkbox-事件"},{depth:3,text:"Checkbox.Group 事件",id:"checkboxgroup-事件"},{depth:3,text:"Checkbox.Group 方法",id:"checkboxgroup-方法"},{depth:2,text:"差异说明",id:"差异说明"}],W="/docs/components/checkbox.md",H="Checkbox 复选框",J="1769570039000",Re=n=>n.children({MdContent:L,demos:w,frontmatter:$,slugs:q,filePath:W,title:H,updatedTime:J});export{L as MdContent,Re as default,w as demos,W as filePath,$ as frontmatter,q as slugs,H as title,J as updatedTime};
