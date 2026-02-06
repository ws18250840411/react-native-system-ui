import{R as r,j as e}from"./main-BXb8DOxl.js";import{F as i}from"./Field-CRK4EWhd.js";import{T as c}from"./createComponentTokensHook-C7GS3cUR.js";import{S as B}from"./ArrowDown-hbEDMMgd.js";import{B as x}from"./index-B_Jsx0Km.js";import{M as E}from"./index-DkTYenKX.js";import{P as D}from"./Popup-CKHRlZsm.js";import{P as R}from"./Picker-BV-pEfjz.js";import{a as h}from"./index-BSmhLq_l.js";import"./IconBase-5wkEN6D1.js";import"./index-C4pDPcGj.js";import"./useLocale-PK1ub-S0.js";import"./hairline-BrrexFH9.js";import"./promise-nIQVXYv7.js";import"./Close-BDE-d6Lo.js";import"./Animated-BshxiKK9.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-ZIcEKt2e.js";import"./index-CysvSvJu.js";import"./index-BPY4IQIH.js";import"./index-9yrhdMQu.js";import"./animation-BpxpeSKC.js";import"./Portal-DNoXqwcq.js";import"./index-CUJhPZZs.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-DX_kf2WP.js";import"./number-BrRWL1fO.js";import"./useAriaPress-6bm6-278.js";import"./useOverlayStack-VZ9qA3Du.js";import"./index-4Yp_2FWl.js";import"./SafeAreaView-DgWhFFT_.js";import"./useSafeAreaPadding-C6K9c3C6.js";import"./Loading-C0Kht0oY.js";import"./compare-B0QhPEQa.js";import"./Arrow-D1qxk6Xz.js";function m(){const[n,l]=r.useState("");return e.jsx(i,{label:"文本",tooltip:"说明文字",placeholder:"请输入文本",description:"We must make sure that you are a human.",value:n,onChangeText:l})}const P=`import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldBasicDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field
      label="文本"
      tooltip="说明文字"
      placeholder="请输入文本"
      description="We must make sure that you are a human."
      value={value}
      onChangeText={setValue}
    />
  )
}
`,T={code:P,sources:{_:{tsx:`import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldBasicDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field
      label="文本"
      tooltip="说明文字"
      placeholder="请输入文本"
      description="We must make sure that you are a human."
      value={value}
      onChangeText={setValue}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldBasicDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field
      label="文本"
      tooltip="说明文字"
      placeholder="请输入文本"
      description="We must make sure that you are a human."
      value={value}
      onChangeText={setValue}
    />
  )
}
`}},title:"基础用法",identifier:"field-basic",lang:"tsx",meta:{title:"基础用法"}};function p(){const[n,l]=r.useState(""),[t,a]=r.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(i,{label:"文本",leftIcon:e.jsx(c,{children:"📦"}),tooltip:"提示",placeholder:"请输入内容",center:!0,value:t,onChangeText:a}),e.jsx(i,{label:"文本",leftIcon:e.jsx(c,{children:"📱"}),placeholder:"请输入手机号",center:!0,clearable:!0,value:n,onChangeText:l})]})}const S=`import React from "react"
import { Text } from "react-native"

import { Field } from "react-native-system-ui"

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <>
      <Field
        label="文本"
        leftIcon={<Text>📦</Text>}
        tooltip="提示"
        placeholder="请输入内容"
        center
        value={name}
        onChangeText={setName}
      />
      <Field
        label="文本"
        leftIcon={<Text>📱</Text>}
        placeholder="请输入手机号"
        center
        clearable
        value={phone}
        onChangeText={setPhone}
      />
    </>
  )
}
`,V={code:S,sources:{_:{tsx:`import React from "react"
import { Text } from "react-native"

import { Field } from "react-native-system-ui"

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <>
      <Field
        label="文本"
        leftIcon={<Text>📦</Text>}
        tooltip="提示"
        placeholder="请输入内容"
        center
        value={name}
        onChangeText={setName}
      />
      <Field
        label="文本"
        leftIcon={<Text>📱</Text>}
        placeholder="请输入手机号"
        center
        clearable
        value={phone}
        onChangeText={setPhone}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Text } from "react-native"

import { Field } from "react-native-system-ui"

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <>
      <Field
        label="文本"
        leftIcon={<Text>📦</Text>}
        tooltip="提示"
        placeholder="请输入内容"
        center
        value={name}
        onChangeText={setName}
      />
      <Field
        label="文本"
        leftIcon={<Text>📱</Text>}
        placeholder="请输入手机号"
        center
        clearable
        value={phone}
        onChangeText={setPhone}
      />
    </>
  )
}
`}},title:"图标与清除",identifier:"field-icon",lang:"tsx",meta:{title:"图标与清除"}};function f(){const[n,l]=r.useState(""),[t,a]=r.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(i,{required:!0,label:"用户名",placeholder:"请输入用户名",value:n,onChangeText:l,error:!0}),e.jsx(i,{required:!0,label:"手机号",placeholder:"请输入手机号",value:t,onChangeText:a,keyboardType:"number-pad",errorMessage:"手机号格式错误"})]})}const N=`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")

  return (
    <>
      <Field
        required
        label="用户名"
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        error
      />
      <Field
        required
        label="手机号"
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        errorMessage="手机号格式错误"
      />
    </>
  )
}
`,I={code:N,sources:{_:{tsx:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")

  return (
    <>
      <Field
        required
        label="用户名"
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        error
      />
      <Field
        required
        label="手机号"
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        errorMessage="手机号格式错误"
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")

  return (
    <>
      <Field
        required
        label="用户名"
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        error
      />
      <Field
        required
        label="手机号"
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        errorMessage="手机号格式错误"
      />
    </>
  )
}
`}},title:"错误提示",identifier:"field-error",lang:"tsx",meta:{title:"错误提示"}};function j(){const[n,l]=r.useState(""),[t,a]=r.useState(!1),[s,g]=r.useState(["86"]),[d,u]=r.useState(["86"]),y=[[{label:"86 🇨🇳",value:"86"},{label:"87 🇺🇸",value:"87"},{label:"88 🏳️‍🌈",value:"88"},{label:"89 🏳️‍⚧️",value:"89"},{label:"90 🇵🇪",value:"90"},{label:"91 🇩🇪",value:"91"},{label:"92 🇯🇵",value:"92"}]];return e.jsxs(e.Fragment,{children:[e.jsx(i,{center:!0,controlAlign:"center",label:"短信验证码",prefix:e.jsxs(E,{style:{flexDirection:"row",alignItems:"center"},onPress:()=>{u(s),a(!0)},children:[e.jsxs(c,{children:["+",s[0]]}),e.jsx(B,{size:16,fill:"#969799",color:"#969799",style:{marginLeft:8}})]}),suffix:e.jsx(x,{size:"small",type:"primary",children:"发送"}),placeholder:"手机号",value:n,onChangeText:l,onClickInput:()=>{u(s),a(!0)}}),e.jsx(D,{visible:t,round:!0,position:"bottom",onClose:()=>a(!1),children:e.jsx(R,{title:"选择区号",columns:y,value:d,onChange:A=>u(A),onConfirm:()=>{g(d),a(!1)},onCancel:()=>a(!1)})})]})}const _=`import React from "react"
import { Text, Pressable } from "react-native"
import { ArrowDown } from "react-native-system-icon"
import { Button, Field, Popup, Picker } from "react-native-system-ui"

export default function FieldButtonDemo() {
  const [code, setCode] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [area, setArea] = React.useState(["86"])
  const [tempArea, setTempArea] = React.useState(["86"])
  const columns = [
    [
      { label: "86 🇨🇳", value: "86" },
      { label: "87 🇺🇸", value: "87" },
      { label: "88 🏳️‍🌈", value: "88" },
      { label: "89 🏳️‍⚧️", value: "89" },
      { label: "90 🇵🇪", value: "90" },
      { label: "91 🇩🇪", value: "91" },
      { label: "92 🇯🇵", value: "92" },
    ],
  ]

  return (
    <>
      <Field
        center
        controlAlign="center"
        label="短信验证码"
        prefix={
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setTempArea(area)
              setVisible(true)
            }}
          >
            <Text>+{area[0]}</Text>
            <ArrowDown size={16} fill="#969799" color="#969799" style={{ marginLeft: 8 }} />
          </Pressable>
        }
        suffix={
          <Button size="small" type="primary">
            发送
          </Button>
        }
        placeholder="手机号"
        value={code}
        onChangeText={setCode}
        onClickInput={() => {
          setTempArea(area)
          setVisible(true)
        }}
      />

      <Popup visible={visible} round position="bottom" onClose={() => setVisible(false)}>
        <Picker
          title="选择区号"
          columns={columns}
          value={tempArea}
          onChange={val => setTempArea(val as string[])}
          onConfirm={() => {
            setArea(tempArea)
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}
`,M={code:_,sources:{_:{tsx:`import React from "react"
import { Text, Pressable } from "react-native"
import { ArrowDown } from "react-native-system-icon"
import { Button, Field, Popup, Picker } from "react-native-system-ui"

export default function FieldButtonDemo() {
  const [code, setCode] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [area, setArea] = React.useState(["86"])
  const [tempArea, setTempArea] = React.useState(["86"])
  const columns = [
    [
      { label: "86 🇨🇳", value: "86" },
      { label: "87 🇺🇸", value: "87" },
      { label: "88 🏳️‍🌈", value: "88" },
      { label: "89 🏳️‍⚧️", value: "89" },
      { label: "90 🇵🇪", value: "90" },
      { label: "91 🇩🇪", value: "91" },
      { label: "92 🇯🇵", value: "92" },
    ],
  ]

  return (
    <>
      <Field
        center
        controlAlign="center"
        label="短信验证码"
        prefix={
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setTempArea(area)
              setVisible(true)
            }}
          >
            <Text>+{area[0]}</Text>
            <ArrowDown size={16} fill="#969799" color="#969799" style={{ marginLeft: 8 }} />
          </Pressable>
        }
        suffix={
          <Button size="small" type="primary">
            发送
          </Button>
        }
        placeholder="手机号"
        value={code}
        onChangeText={setCode}
        onClickInput={() => {
          setTempArea(area)
          setVisible(true)
        }}
      />

      <Popup visible={visible} round position="bottom" onClose={() => setVisible(false)}>
        <Picker
          title="选择区号"
          columns={columns}
          value={tempArea}
          onChange={val => setTempArea(val as string[])}
          onConfirm={() => {
            setArea(tempArea)
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Text, Pressable } from "react-native"
import { ArrowDown } from "react-native-system-icon"
import { Button, Field, Popup, Picker } from "react-native-system-ui"

export default function FieldButtonDemo() {
  const [code, setCode] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [area, setArea] = React.useState(["86"])
  const [tempArea, setTempArea] = React.useState(["86"])
  const columns = [
    [
      { label: "86 🇨🇳", value: "86" },
      { label: "87 🇺🇸", value: "87" },
      { label: "88 🏳️‍🌈", value: "88" },
      { label: "89 🏳️‍⚧️", value: "89" },
      { label: "90 🇵🇪", value: "90" },
      { label: "91 🇩🇪", value: "91" },
      { label: "92 🇯🇵", value: "92" },
    ],
  ]

  return (
    <>
      <Field
        center
        controlAlign="center"
        label="短信验证码"
        prefix={
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setTempArea(area)
              setVisible(true)
            }}
          >
            <Text>+{area[0]}</Text>
            <ArrowDown size={16} fill="#969799" color="#969799" style={{ marginLeft: 8 }} />
          </Pressable>
        }
        suffix={
          <Button size="small" type="primary">
            发送
          </Button>
        }
        placeholder="手机号"
        value={code}
        onChangeText={setCode}
        onClickInput={() => {
          setTempArea(area)
          setVisible(true)
        }}
      />

      <Popup visible={visible} round position="bottom" onClose={() => setVisible(false)}>
        <Picker
          title="选择区号"
          columns={columns}
          value={tempArea}
          onChange={val => setTempArea(val as string[])}
          onConfirm={() => {
            setArea(tempArea)
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}
`}},title:"插入按钮",identifier:"field-custom",lang:"tsx",meta:{title:"插入按钮"}},o=n=>n.replace(/\s/g,"").replace(/\D/g,"").slice(0,19).replace(/(\d{4})(?=\d)/g,"$1 ");function F(){const[n,l]=r.useState(""),[t,a]=r.useState("");return e.jsxs(h,{children:[e.jsx(i,{label:"银行卡",placeholder:"输入时自动格式化",value:n,onChangeText:l,formatter:o,maxLength:23}),e.jsx(i,{label:"银行卡",placeholder:"失焦时自动格式化",value:t,onChangeText:a,formatter:o,formatTrigger:"onBlur",maxLength:23,onBlur:()=>a(o(t))})]})}const w=`import React from "react"

import { Field, FieldGroup } from "react-native-system-ui"

const formatCard = (val: string) =>
  val
    .replace(/\\s/g, "")
    .replace(/\\D/g, "")
    .slice(0, 19)
    .replace(/(\\d{4})(?=\\d)/g, "$1 ")

export default function FieldFormatterDemo() {
  const [value1, setValue1] = React.useState("")
  const [value2, setValue2] = React.useState("")

  return (
    <FieldGroup>
      <Field
        label="银行卡"
        placeholder="输入时自动格式化"
        value={value1}
        onChangeText={setValue1}
        formatter={formatCard}
        maxLength={23}
      />
      <Field
        label="银行卡"
        placeholder="失焦时自动格式化"
        value={value2}
        onChangeText={setValue2}
        formatter={formatCard}
        formatTrigger="onBlur"
        maxLength={23}
        onBlur={() => setValue2(formatCard(value2))}
      />
    </FieldGroup>
  )
}
`,k={code:w,sources:{_:{tsx:`import React from "react"

import { Field, FieldGroup } from "react-native-system-ui"

const formatCard = (val: string) =>
  val
    .replace(/\\s/g, "")
    .replace(/\\D/g, "")
    .slice(0, 19)
    .replace(/(\\d{4})(?=\\d)/g, "$1 ")

export default function FieldFormatterDemo() {
  const [value1, setValue1] = React.useState("")
  const [value2, setValue2] = React.useState("")

  return (
    <FieldGroup>
      <Field
        label="银行卡"
        placeholder="输入时自动格式化"
        value={value1}
        onChangeText={setValue1}
        formatter={formatCard}
        maxLength={23}
      />
      <Field
        label="银行卡"
        placeholder="失焦时自动格式化"
        value={value2}
        onChangeText={setValue2}
        formatter={formatCard}
        formatTrigger="onBlur"
        maxLength={23}
        onBlur={() => setValue2(formatCard(value2))}
      />
    </FieldGroup>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"

import { Field, FieldGroup } from "react-native-system-ui"

const formatCard = (val: string) =>
  val
    .replace(/\\s/g, "")
    .replace(/\\D/g, "")
    .slice(0, 19)
    .replace(/(\\d{4})(?=\\d)/g, "$1 ")

export default function FieldFormatterDemo() {
  const [value1, setValue1] = React.useState("")
  const [value2, setValue2] = React.useState("")

  return (
    <FieldGroup>
      <Field
        label="银行卡"
        placeholder="输入时自动格式化"
        value={value1}
        onChangeText={setValue1}
        formatter={formatCard}
        maxLength={23}
      />
      <Field
        label="银行卡"
        placeholder="失焦时自动格式化"
        value={value2}
        onChangeText={setValue2}
        formatter={formatCard}
        formatTrigger="onBlur"
        maxLength={23}
        onBlur={() => setValue2(formatCard(value2))}
      />
    </FieldGroup>
  )
}
`}},title:"格式化输入内容",identifier:"field-formatter",lang:"tsx",meta:{title:"格式化输入内容"}};function v(){const[n,l]=r.useState("");return e.jsx(i,{label:"留言",type:"textarea",rows:1,autoSize:!0,placeholder:"请输入留言",value:n,onChangeText:l})}const L=`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldTextareaAutoDemo() {
  const [content, setContent] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={1}
      autoSize
      placeholder="请输入留言"
      value={content}
      onChangeText={setContent}
    />
  )
}
`,G={code:L,sources:{_:{tsx:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldTextareaAutoDemo() {
  const [content, setContent] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={1}
      autoSize
      placeholder="请输入留言"
      value={content}
      onChangeText={setContent}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldTextareaAutoDemo() {
  const [content, setContent] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={1}
      autoSize
      placeholder="请输入留言"
      value={content}
      onChangeText={setContent}
    />
  )
}
`}},title:"高度自适应",identifier:"field-textarea",lang:"tsx",meta:{title:"高度自适应"}};function b(){return e.jsx(h,{children:e.jsx(i,{label:"文本",placeholder:"输入框内容右对齐",inputAlign:"right",center:!0})})}const z=`import React from "react"
import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldAlignDemo() {
  return (
    <FieldGroup>
      <Field
        label="文本"
        placeholder="输入框内容右对齐"
        inputAlign="right"
        center
      />
    </FieldGroup>
  )
}
`,$={code:z,sources:{_:{tsx:`import React from "react"
import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldAlignDemo() {
  return (
    <FieldGroup>
      <Field
        label="文本"
        placeholder="输入框内容右对齐"
        inputAlign="right"
        center
      />
    </FieldGroup>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldAlignDemo() {
  return (
    <FieldGroup>
      <Field
        label="文本"
        placeholder="输入框内容右对齐"
        inputAlign="right"
        center
      />
    </FieldGroup>
  )
}
`}},title:"输入框内容对齐",identifier:"field-align",lang:"tsx",meta:{title:"输入框内容对齐"}};function C(){const n=r.useRef(null);return e.jsx(i,{center:!0,ref:n,label:"文本",placeholder:"请输入文本",suffix:e.jsx(x,{size:"small",onPress:()=>n.current?.focus(),children:"聚焦"})})}const q=`import React from "react"
import { Button, Field } from "react-native-system-ui"
import type { FieldInstance } from "react-native-system-ui"

export default function FieldRefDemo() {
  const ref = React.useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={ref}
      label="文本"
      placeholder="请输入文本"
      suffix={
        <Button size="small" onPress={() => ref.current?.focus()}>
          聚焦
        </Button>
      }
    />
  )
}
`,U={code:q,sources:{_:{tsx:`import React from "react"
import { Button, Field } from "react-native-system-ui"
import type { FieldInstance } from "react-native-system-ui"

export default function FieldRefDemo() {
  const ref = React.useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={ref}
      label="文本"
      placeholder="请输入文本"
      suffix={
        <Button size="small" onPress={() => ref.current?.focus()}>
          聚焦
        </Button>
      }
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Button, Field } from "react-native-system-ui"
import type { FieldInstance } from "react-native-system-ui"

export default function FieldRefDemo() {
  const ref = React.useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={ref}
      label="文本"
      placeholder="请输入文本"
      suffix={
        <Button size="small" onPress={() => ref.current?.focus()}>
          聚焦
        </Button>
      }
    />
  )
}
`}},title:"ref 调用",identifier:"field-ref",lang:"tsx",meta:{title:"ref 调用"}},W=function({previewer:n=()=>null,api:l=()=>null}){const t=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"field-输入框","data-anchor":"field-输入框",children:"Field 输入框"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"表单项容器，支持标签、清除按钮、提示文案、左右插槽等能力。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { Field } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(t,{...T,children:e.jsx(m,{})})}),e.jsx("h3",{id:"图标与清除","data-anchor":"图标与清除",children:"图标与清除"}),e.jsx("div",{children:e.jsx(t,{...V,children:e.jsx(p,{})})}),e.jsx("h3",{id:"错误提示","data-anchor":"错误提示",children:"错误提示"}),e.jsx("div",{children:e.jsx(t,{...I,children:e.jsx(f,{})})}),e.jsx("h3",{id:"插入按钮","data-anchor":"插入按钮",children:"插入按钮"}),e.jsx("div",{children:e.jsx(t,{...M,children:e.jsx(j,{})})}),e.jsx("h3",{id:"格式化输入内容","data-anchor":"格式化输入内容",children:"格式化输入内容"}),e.jsx("div",{children:e.jsx(t,{...k,children:e.jsx(F,{})})}),e.jsx("h3",{id:"高度自适应","data-anchor":"高度自适应",children:"高度自适应"}),e.jsx("div",{children:e.jsx(t,{...G,children:e.jsx(v,{})})}),e.jsx("blockquote",{children:e.jsx("p",{children:"默认字数统计文案右对齐，字号 12px，使用次级文本色；自定义时建议返回字符串以复用样式。"})}),e.jsx("h3",{id:"输入框内容对齐","data-anchor":"输入框内容对齐",children:"输入框内容对齐"}),e.jsx("div",{children:e.jsx(t,{...$,children:e.jsx(b,{})})}),e.jsx("h3",{id:"ref-调用","data-anchor":"ref-调用",children:"ref 调用"}),e.jsx("div",{children:e.jsx(t,{...U,children:e.jsx(C,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"左侧标题内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelWidth"})}),e.jsx("td",{children:"标题宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"72"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelAlign"})}),e.jsx("td",{children:"标题对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"left | center | right"})}),e.jsx("td",{children:e.jsx("code",{children:"left"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"required"})}),e.jsx("td",{children:"是否显示必填星号"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"colon"})}),e.jsx("td",{children:"是否在标题后展示冒号"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"intro"})}),e.jsxs("td",{children:["额外提示信息（与 ",e.jsx("code",{children:"description"})," 互斥）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tooltip"})}),e.jsxs("td",{children:["标题提示气泡，支持传入字符串或 ",e.jsx("code",{children:"Dialog.show"})," 参数"]}),e.jsx("td",{children:e.jsxs("code",{children:["ReactNode | DialogShowOptions & ","{"," icon?: ReactNode ","}"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"描述文案（无错误时展示）"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"error"})}),e.jsx("td",{children:"是否标红输入区域"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"errorMessage"})}),e.jsx("td",{children:"底部错误提示文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearable"})}),e.jsx("td",{children:"是否展示清除按钮"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearTrigger"})}),e.jsx("td",{children:"清除按钮触发时机"}),e.jsx("td",{children:e.jsx("code",{children:"always | focus"})}),e.jsx("td",{children:e.jsx("code",{children:"focus"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClear"})}),e.jsx("td",{children:"点击清除按钮回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inputAlign"})}),e.jsx("td",{children:"输入内容对齐"}),e.jsx("td",{children:e.jsx("code",{children:"left | center | right"})}),e.jsx("td",{children:e.jsx("code",{children:"left"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"controlAlign"})}),e.jsx("td",{children:"输入控件区域对齐方式（水平）"}),e.jsx("td",{children:e.jsx("code",{children:"left | center | right"})}),e.jsx("td",{children:e.jsx("code",{children:"left"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"center"})}),e.jsx("td",{children:"是否垂直居中整体行内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示底部分隔线"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"行高尺寸"}),e.jsx("td",{children:e.jsx("code",{children:"normal | large"})}),e.jsx("td",{children:e.jsx("code",{children:"normal"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clickable"})}),e.jsx("td",{children:"是否展示点击态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLink"})}),e.jsx("td",{children:"是否展示右侧箭头"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"arrowDirection"})}),e.jsx("td",{children:"箭头方向"}),e.jsx("td",{children:e.jsx("code",{children:"left | right | up | down"})}),e.jsx("td",{children:e.jsx("code",{children:"right"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftIcon"})}),e.jsx("td",{children:"输入框左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightIcon"})}),e.jsxs("td",{children:["输入框右侧图标（",e.jsx("code",{children:"clearable"})," 时被替换）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"prefix"})}),e.jsx("td",{children:"输入框前置插槽"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"suffix"})}),e.jsx("td",{children:"输入框后置插槽"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"button"})}),e.jsxs("td",{children:[e.jsx("code",{children:"suffix"})," 的兼容写法"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"extra"})}),e.jsx("td",{children:"行尾额外内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"受控值"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"初始值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"输入类型"}),e.jsx("td",{children:e.jsx("code",{children:"text | number | digit | password | textarea | tel | search"})}),e.jsx("td",{children:e.jsx("code",{children:"text"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rows"})}),e.jsxs("td",{children:[e.jsx("code",{children:'type="textarea"'})," 行数"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"2"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoSize"})}),e.jsxs("td",{children:["文本域自动增高（兼容 ",e.jsx("code",{children:"autosize"}),"）"]}),e.jsx("td",{children:e.jsxs("code",{children:["boolean | ","{"," minRows?: number; maxRows?: number ","}"]})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatter"})}),e.jsx("td",{children:"自定义格式化函数"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"formatTrigger"})}),e.jsx("td",{children:"格式化触发时机"}),e.jsx("td",{children:e.jsx("code",{children:"onChange | onBlur"})}),e.jsx("td",{children:e.jsx("code",{children:"onChange"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clearIcon"})}),e.jsx("td",{children:"自定义清除图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showWordLimit"})}),e.jsxs("td",{children:["是否展示字数统计，支持传入函数自定义展示内容，需要设置 ",e.jsx("code",{children:"maxLength"})]}),e.jsx("td",{children:e.jsxs("code",{children:["boolean | (","{"," currentCount, maxLength ","}",") => ReactNode"]})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxLength"})}),e.jsxs("td",{children:["文本最大长度，超出时触发 ",e.jsx("code",{children:"onOverlimit"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOverlimit"})}),e.jsxs("td",{children:["超过 ",e.jsx("code",{children:"maxLength"})," 时回调"]}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否只读"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击整行时回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickInput"})}),e.jsx("td",{children:"点击输入区域时回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickLeftIcon"})}),e.jsx("td",{children:"点击左侧图标回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickRightIcon"})}),e.jsx("td",{children:"点击右侧图标回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"androidRipple"})}),e.jsx("td",{children:"自定义 Android 波纹色，仅在可点击场景生效"}),e.jsx("td",{children:e.jsx("code",{children:"PressableProps['android_ripple']"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsxs("p",{children:["其余属性同 ",e.jsx("code",{children:"TextInput"}),"。"]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["💡 ",e.jsx("code",{children:"Field.Group"})," 直接复用 ",e.jsx("code",{children:"Cell.Group"})," 的容器能力，",e.jsx("code",{children:"inset"}),"/",e.jsx("code",{children:"card"}),"/",e.jsx("code",{children:"border"})," 等配置完全一致，可结合其它 Cell 系列组件混排。"]})})]})})},O=[{Component:m,key:"field-basic",sources:{_:{tsx:`import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldBasicDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field
      label="文本"
      tooltip="说明文字"
      placeholder="请输入文本"
      description="We must make sure that you are a human."
      value={value}
      onChangeText={setValue}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"

import { Field } from "react-native-system-ui"

export default function FieldBasicDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field
      label="文本"
      tooltip="说明文字"
      placeholder="请输入文本"
      description="We must make sure that you are a human."
      value={value}
      onChangeText={setValue}
    />
  )
}
`}},title:"基础用法",identifier:"field-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:p,key:"field-icon",sources:{_:{tsx:`import React from "react"
import { Text } from "react-native"

import { Field } from "react-native-system-ui"

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <>
      <Field
        label="文本"
        leftIcon={<Text>📦</Text>}
        tooltip="提示"
        placeholder="请输入内容"
        center
        value={name}
        onChangeText={setName}
      />
      <Field
        label="文本"
        leftIcon={<Text>📱</Text>}
        placeholder="请输入手机号"
        center
        clearable
        value={phone}
        onChangeText={setPhone}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Text } from "react-native"

import { Field } from "react-native-system-ui"

export default function FieldIconDemo() {
  const [phone, setPhone] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <>
      <Field
        label="文本"
        leftIcon={<Text>📦</Text>}
        tooltip="提示"
        placeholder="请输入内容"
        center
        value={name}
        onChangeText={setName}
      />
      <Field
        label="文本"
        leftIcon={<Text>📱</Text>}
        placeholder="请输入手机号"
        center
        clearable
        value={phone}
        onChangeText={setPhone}
      />
    </>
  )
}
`}},title:"图标与清除",identifier:"field-icon",lang:"tsx",meta:{title:"图标与清除"}},{Component:f,key:"field-error",sources:{_:{tsx:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")

  return (
    <>
      <Field
        required
        label="用户名"
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        error
      />
      <Field
        required
        label="手机号"
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        errorMessage="手机号格式错误"
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldErrorDemo() {
  const [username, setUsername] = React.useState("")
  const [phone, setPhone] = React.useState("")

  return (
    <>
      <Field
        required
        label="用户名"
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
        error
      />
      <Field
        required
        label="手机号"
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        errorMessage="手机号格式错误"
      />
    </>
  )
}
`}},title:"错误提示",identifier:"field-error",lang:"tsx",meta:{title:"错误提示"}},{Component:j,key:"field-custom",sources:{_:{tsx:`import React from "react"
import { Text, Pressable } from "react-native"
import { ArrowDown } from "react-native-system-icon"
import { Button, Field, Popup, Picker } from "react-native-system-ui"

export default function FieldButtonDemo() {
  const [code, setCode] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [area, setArea] = React.useState(["86"])
  const [tempArea, setTempArea] = React.useState(["86"])
  const columns = [
    [
      { label: "86 🇨🇳", value: "86" },
      { label: "87 🇺🇸", value: "87" },
      { label: "88 🏳️‍🌈", value: "88" },
      { label: "89 🏳️‍⚧️", value: "89" },
      { label: "90 🇵🇪", value: "90" },
      { label: "91 🇩🇪", value: "91" },
      { label: "92 🇯🇵", value: "92" },
    ],
  ]

  return (
    <>
      <Field
        center
        controlAlign="center"
        label="短信验证码"
        prefix={
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setTempArea(area)
              setVisible(true)
            }}
          >
            <Text>+{area[0]}</Text>
            <ArrowDown size={16} fill="#969799" color="#969799" style={{ marginLeft: 8 }} />
          </Pressable>
        }
        suffix={
          <Button size="small" type="primary">
            发送
          </Button>
        }
        placeholder="手机号"
        value={code}
        onChangeText={setCode}
        onClickInput={() => {
          setTempArea(area)
          setVisible(true)
        }}
      />

      <Popup visible={visible} round position="bottom" onClose={() => setVisible(false)}>
        <Picker
          title="选择区号"
          columns={columns}
          value={tempArea}
          onChange={val => setTempArea(val as string[])}
          onConfirm={() => {
            setArea(tempArea)
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Text, Pressable } from "react-native"
import { ArrowDown } from "react-native-system-icon"
import { Button, Field, Popup, Picker } from "react-native-system-ui"

export default function FieldButtonDemo() {
  const [code, setCode] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [area, setArea] = React.useState(["86"])
  const [tempArea, setTempArea] = React.useState(["86"])
  const columns = [
    [
      { label: "86 🇨🇳", value: "86" },
      { label: "87 🇺🇸", value: "87" },
      { label: "88 🏳️‍🌈", value: "88" },
      { label: "89 🏳️‍⚧️", value: "89" },
      { label: "90 🇵🇪", value: "90" },
      { label: "91 🇩🇪", value: "91" },
      { label: "92 🇯🇵", value: "92" },
    ],
  ]

  return (
    <>
      <Field
        center
        controlAlign="center"
        label="短信验证码"
        prefix={
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setTempArea(area)
              setVisible(true)
            }}
          >
            <Text>+{area[0]}</Text>
            <ArrowDown size={16} fill="#969799" color="#969799" style={{ marginLeft: 8 }} />
          </Pressable>
        }
        suffix={
          <Button size="small" type="primary">
            发送
          </Button>
        }
        placeholder="手机号"
        value={code}
        onChangeText={setCode}
        onClickInput={() => {
          setTempArea(area)
          setVisible(true)
        }}
      />

      <Popup visible={visible} round position="bottom" onClose={() => setVisible(false)}>
        <Picker
          title="选择区号"
          columns={columns}
          value={tempArea}
          onChange={val => setTempArea(val as string[])}
          onConfirm={() => {
            setArea(tempArea)
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        />
      </Popup>
    </>
  )
}
`}},title:"插入按钮",identifier:"field-custom",lang:"tsx",meta:{title:"插入按钮"}},{Component:F,key:"field-formatter",sources:{_:{tsx:`import React from "react"

import { Field, FieldGroup } from "react-native-system-ui"

const formatCard = (val: string) =>
  val
    .replace(/\\s/g, "")
    .replace(/\\D/g, "")
    .slice(0, 19)
    .replace(/(\\d{4})(?=\\d)/g, "$1 ")

export default function FieldFormatterDemo() {
  const [value1, setValue1] = React.useState("")
  const [value2, setValue2] = React.useState("")

  return (
    <FieldGroup>
      <Field
        label="银行卡"
        placeholder="输入时自动格式化"
        value={value1}
        onChangeText={setValue1}
        formatter={formatCard}
        maxLength={23}
      />
      <Field
        label="银行卡"
        placeholder="失焦时自动格式化"
        value={value2}
        onChangeText={setValue2}
        formatter={formatCard}
        formatTrigger="onBlur"
        maxLength={23}
        onBlur={() => setValue2(formatCard(value2))}
      />
    </FieldGroup>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"

import { Field, FieldGroup } from "react-native-system-ui"

const formatCard = (val: string) =>
  val
    .replace(/\\s/g, "")
    .replace(/\\D/g, "")
    .slice(0, 19)
    .replace(/(\\d{4})(?=\\d)/g, "$1 ")

export default function FieldFormatterDemo() {
  const [value1, setValue1] = React.useState("")
  const [value2, setValue2] = React.useState("")

  return (
    <FieldGroup>
      <Field
        label="银行卡"
        placeholder="输入时自动格式化"
        value={value1}
        onChangeText={setValue1}
        formatter={formatCard}
        maxLength={23}
      />
      <Field
        label="银行卡"
        placeholder="失焦时自动格式化"
        value={value2}
        onChangeText={setValue2}
        formatter={formatCard}
        formatTrigger="onBlur"
        maxLength={23}
        onBlur={() => setValue2(formatCard(value2))}
      />
    </FieldGroup>
  )
}
`}},title:"格式化输入内容",identifier:"field-formatter",lang:"tsx",meta:{title:"格式化输入内容"}},{Component:v,key:"field-textarea",sources:{_:{tsx:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldTextareaAutoDemo() {
  const [content, setContent] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={1}
      autoSize
      placeholder="请输入留言"
      value={content}
      onChangeText={setContent}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Field } from "react-native-system-ui"

export default function FieldTextareaAutoDemo() {
  const [content, setContent] = React.useState("")

  return (
    <Field
      label="留言"
      type="textarea"
      rows={1}
      autoSize
      placeholder="请输入留言"
      value={content}
      onChangeText={setContent}
    />
  )
}
`}},title:"高度自适应",identifier:"field-textarea",lang:"tsx",meta:{title:"高度自适应"}},{Component:b,key:"field-align",sources:{_:{tsx:`import React from "react"
import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldAlignDemo() {
  return (
    <FieldGroup>
      <Field
        label="文本"
        placeholder="输入框内容右对齐"
        inputAlign="right"
        center
      />
    </FieldGroup>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Field, FieldGroup } from "react-native-system-ui"

export default function FieldAlignDemo() {
  return (
    <FieldGroup>
      <Field
        label="文本"
        placeholder="输入框内容右对齐"
        inputAlign="right"
        center
      />
    </FieldGroup>
  )
}
`}},title:"输入框内容对齐",identifier:"field-align",lang:"tsx",meta:{title:"输入框内容对齐"}},{Component:C,key:"field-ref",sources:{_:{tsx:`import React from "react"
import { Button, Field } from "react-native-system-ui"
import type { FieldInstance } from "react-native-system-ui"

export default function FieldRefDemo() {
  const ref = React.useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={ref}
      label="文本"
      placeholder="请输入文本"
      suffix={
        <Button size="small" onPress={() => ref.current?.focus()}>
          聚焦
        </Button>
      }
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from "react"
import { Button, Field } from "react-native-system-ui"
import type { FieldInstance } from "react-native-system-ui"

export default function FieldRefDemo() {
  const ref = React.useRef<FieldInstance>(null)

  return (
    <Field
      center
      ref={ref}
      label="文本"
      placeholder="请输入文本"
      suffix={
        <Button size="small" onPress={() => ref.current?.focus()}>
          聚焦
        </Button>
      }
    />
  )
}
`}},title:"ref 调用",identifier:"field-ref",lang:"tsx",meta:{title:"ref 调用"}}],H={simulator:{compact:!0}},J=[{depth:1,text:"Field 输入框",id:"field-输入框"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"图标与清除",id:"图标与清除"},{depth:3,text:"错误提示",id:"错误提示"},{depth:3,text:"插入按钮",id:"插入按钮"},{depth:3,text:"格式化输入内容",id:"格式化输入内容"},{depth:3,text:"高度自适应",id:"高度自适应"},{depth:3,text:"输入框内容对齐",id:"输入框内容对齐"},{depth:3,text:"ref 调用",id:"ref-调用"},{depth:2,text:"API",id:"api"}],K="/docs/components/field.md",Q="Field 输入框",X="1766244172000",Ie=n=>n.children({MdContent:W,demos:O,frontmatter:H,slugs:J,filePath:K,title:Q,updatedTime:X});export{W as MdContent,Ie as default,O as demos,K as filePath,H as frontmatter,J as slugs,Q as title,X as updatedTime};
