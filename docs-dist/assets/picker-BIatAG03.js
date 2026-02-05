import{j as e,R as d,V as f}from"./main-O6KZrSH_.js";import{P as i}from"./Picker-C1PrIgoJ.js";import{T as u}from"./index-CCLXK9-u.js";import"./Loading-CdSfkQu4.js";import"./createComponentTokensHook-KzOuLm4c.js";import"./index-ANZ1PvOD.js";import"./extends-CF3RwP-h.js";import"./color-cEGfwRja.js";import"./number-BcSDXImJ.js";import"./index-CJrLMJTa.js";import"./index-DvCZppP1.js";import"./compare-B0QhPEQa.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./Checked-Cm5uhjGy.js";import"./IconBase-DZr7C-P7.js";import"./Close-DpyqkEOI.js";import"./index-Cq_gACMg.js";import"./Animated-qBs3E5U6.js";import"./index-C_v13XD0.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./useOverlayStack-Tvvid2F1.js";import"./animation-BpxpeSKC.js";import"./useAriaPress-DMjZXFvR.js";const a=[{label:"南京",value:0},{label:"苏州",value:1},{label:"常州",value:2},{label:"淮安",value:3},{label:"扬州",value:4},{label:"南通",value:5},{label:"宿迁",value:6},{label:"泰州",value:7},{label:"无锡",value:8},{label:"长沙",value:9}];function x(){return e.jsx(i,{title:"基础使用",columns:a,defaultValue:0,onChange:(n,t)=>{const l=a.findIndex(c=>c.value===n[0]);u.info(`选中值${n[0]}，索引: ${l}`),console.log("选中项: ",t)},onCancel:()=>u.info("点击取消按钮"),onConfirm:()=>u.info("点击确认按钮")})}const P=`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '南京', value: 0 },
  { label: '苏州', value: 1 },
  { label: '常州', value: 2 },
  { label: '淮安', value: 3 },
  { label: '扬州', value: 4 },
  { label: '南通', value: 5 },
  { label: '宿迁', value: 6 },
  { label: '泰州', value: 7 },
  { label: '无锡', value: 8 },
  { label: '长沙', value: 9 },
]

export default function PickerBasicDemo() {
  return (
    <Picker
      title="基础使用"
      columns={columns}
      defaultValue={0}
      onChange={(values, opts) => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
        console.log('选中项: ', opts)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`,k={code:P,sources:{_:{tsx:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '南京', value: 0 },
  { label: '苏州', value: 1 },
  { label: '常州', value: 2 },
  { label: '淮安', value: 3 },
  { label: '扬州', value: 4 },
  { label: '南通', value: 5 },
  { label: '宿迁', value: 6 },
  { label: '泰州', value: 7 },
  { label: '无锡', value: 8 },
  { label: '长沙', value: 9 },
]

export default function PickerBasicDemo() {
  return (
    <Picker
      title="基础使用"
      columns={columns}
      defaultValue={0}
      onChange={(values, opts) => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
        console.log('选中项: ', opts)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '南京', value: 0 },
  { label: '苏州', value: 1 },
  { label: '常州', value: 2 },
  { label: '淮安', value: 3 },
  { label: '扬州', value: 4 },
  { label: '南通', value: 5 },
  { label: '宿迁', value: 6 },
  { label: '泰州', value: 7 },
  { label: '无锡', value: 8 },
  { label: '长沙', value: 9 },
]

export default function PickerBasicDemo() {
  return (
    <Picker
      title="基础使用"
      columns={columns}
      defaultValue={0}
      onChange={(values, opts) => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
        console.log('选中项: ', opts)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},title:"基础用法",identifier:"picker-basic",lang:"tsx",meta:{title:"基础用法"}},o=n=>n.map(t=>({label:t,value:t})),r=[o(["周一","周二","周三","周四","周五"]),o(["上午","下午","晚上"])];function h(){const[n,t]=d.useState(["周二","晚上"]);return e.jsx(f,{children:e.jsx(i,{columns:r,value:n,onChange:l=>{const c=r.map((p,j)=>p.findIndex(b=>b.value===l[j]));u.info(`当前值：${l}，当前索引：${c}`),t(l)}})})}const F=`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'
import { View } from 'react-native'

const createOptions = (labels: string[]): PickerOption[] => labels.map(label => ({ label, value: label }))

const columns = [
  createOptions(['周一', '周二', '周三', '周四', '周五']),
  createOptions(['上午', '下午', '晚上']),
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['周二', '晚上'])

  return (
    <View>
      <Picker
        columns={columns}
        value={value}
        onChange={vals => {
          const indexes = columns.map((columnOptions, columnIndex) =>
            columnOptions.findIndex(option => option.value === vals[columnIndex])
          )
          Toast.info(\`当前值：\${vals}，当前索引：\${indexes}\`)
          setValue(vals)
        }}
      />
    </View>
  )
}
`,E={code:F,sources:{_:{tsx:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'
import { View } from 'react-native'

const createOptions = (labels: string[]): PickerOption[] => labels.map(label => ({ label, value: label }))

const columns = [
  createOptions(['周一', '周二', '周三', '周四', '周五']),
  createOptions(['上午', '下午', '晚上']),
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['周二', '晚上'])

  return (
    <View>
      <Picker
        columns={columns}
        value={value}
        onChange={vals => {
          const indexes = columns.map((columnOptions, columnIndex) =>
            columnOptions.findIndex(option => option.value === vals[columnIndex])
          )
          Toast.info(\`当前值：\${vals}，当前索引：\${indexes}\`)
          setValue(vals)
        }}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'
import { View } from 'react-native'

const createOptions = (labels: string[]): PickerOption[] => labels.map(label => ({ label, value: label }))

const columns = [
  createOptions(['周一', '周二', '周三', '周四', '周五']),
  createOptions(['上午', '下午', '晚上']),
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['周二', '晚上'])

  return (
    <View>
      <Picker
        columns={columns}
        value={value}
        onChange={vals => {
          const indexes = columns.map((columnOptions, columnIndex) =>
            columnOptions.findIndex(option => option.value === vals[columnIndex])
          )
          Toast.info(\`当前值：\${vals}，当前索引：\${indexes}\`)
          setValue(vals)
        }}
      />
    </View>
  )
}
`}},title:"多列",identifier:"picker-multi",lang:"tsx",meta:{title:"多列"}},C=[{label:"江苏",value:"1",children:[{label:"苏州",value:"1-1",children:[{label:"姑苏区",value:"1-1-1"},{label:"吴中区",value:"1-1-2"}]},{label:"扬州",value:"1-2",children:[{label:"广陵区",value:"1-2-1"},{label:"邗江区",value:"1-2-2"}]}]},{label:"浙江",value:"2",children:[{label:"杭州",value:"2-1",children:[{label:"西湖区",value:"2-1-1"},{label:"余杭区",value:"2-1-2"}]},{label:"温州",value:"2-2",children:[{label:"鹿城区",value:"2-2-1"},{label:"瓯海区",value:"2-2-2"}]}]}];function m(){const[n,t]=d.useState(["2","2-2","2-2-2"]);return e.jsx(i,{columns:C,value:n,onChange:t})}const A=`import React from 'react'
import { Picker } from 'react-native-system-ui'

const columns = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['2', '2-2', '2-2-2'])

  return (
    <Picker columns={columns} value={value} onChange={setValue} />
  )
}
`,y={code:A,sources:{_:{tsx:`import React from 'react'
import { Picker } from 'react-native-system-ui'

const columns = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['2', '2-2', '2-2-2'])

  return (
    <Picker columns={columns} value={value} onChange={setValue} />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker } from 'react-native-system-ui'

const columns = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['2', '2-2', '2-2-2'])

  return (
    <Picker columns={columns} value={value} onChange={setValue} />
  )
}
`}},title:"级联选择",identifier:"picker-cascade",lang:"tsx",meta:{title:"级联选择"}},s=[{label:"8:00",value:"0800"},{label:"9:00",value:"0900"},{label:"10:00",value:"1000"}];function v(){return e.jsx(i,{title:"会议时间",columns:s,defaultValue:"0800",confirmButtonText:"完成",cancelButtonText:"返回",toolbarPosition:"bottom",onChange:n=>{const t=s.findIndex(l=>l.value===n[0]);u.info(`选中值${n[0]}，索引: ${t}`)},onCancel:()=>u.info("点击取消按钮"),onConfirm:()=>u.info("点击确认按钮")})}const D=`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '8:00', value: '0800' },
  { label: '9:00', value: '0900' },
  { label: '10:00', value: '1000' },
]

export default function PickerToolbarDemo() {
  return (
    <Picker
      title="会议时间"
      columns={columns}
      defaultValue="0800"
      confirmButtonText="完成"
      cancelButtonText="返回"
      toolbarPosition="bottom"
      onChange={values => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`,B={code:D,sources:{_:{tsx:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '8:00', value: '0800' },
  { label: '9:00', value: '0900' },
  { label: '10:00', value: '1000' },
]

export default function PickerToolbarDemo() {
  return (
    <Picker
      title="会议时间"
      columns={columns}
      defaultValue="0800"
      confirmButtonText="完成"
      cancelButtonText="返回"
      toolbarPosition="bottom"
      onChange={values => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '8:00', value: '0800' },
  { label: '9:00', value: '0900' },
  { label: '10:00', value: '1000' },
]

export default function PickerToolbarDemo() {
  return (
    <Picker
      title="会议时间"
      columns={columns}
      defaultValue="0800"
      confirmButtonText="完成"
      cancelButtonText="返回"
      toolbarPosition="bottom"
      onChange={values => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},title:"底部工具栏",identifier:"picker-toolbar",lang:"tsx",meta:{title:"底部工具栏"}},T=function({previewer:n=()=>null,api:t=()=>null}){const l=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"picker-选择器","data-anchor":"picker-选择器",children:"Picker 选择器"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"多列滚轮选择器，常用于日期、城市、分类等多列数据。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(l,{code:"import { Picker } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(l,{...k,children:e.jsx(x,{})})}),e.jsx("h3",{id:"多列联动","data-anchor":"多列联动",children:"多列联动"}),e.jsx("div",{children:e.jsx(l,{...E,children:e.jsx(h,{})})}),e.jsx("h3",{id:"省市区联动","data-anchor":"省市区联动",children:"省市区联动"}),e.jsx("div",{children:e.jsx(l,{...y,children:e.jsx(m,{})})}),e.jsx("h3",{id:"自定义工具栏","data-anchor":"自定义工具栏",children:"自定义工具栏"}),e.jsx("div",{children:e.jsx(l,{...B,children:e.jsx(v,{})})}),e.jsx("h2",{id:"列数据结构","data-anchor":"列数据结构",children:"列数据结构"}),e.jsxs("p",{children:["Picker 的 ",e.jsx("code",{children:"columns"})," 接受三种结构："]}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"单列"}),"：",e.jsx("code",{children:"PickerOption[]"}),"（当选项不包含 ",e.jsx("code",{children:"children"})," 时），可直接传 ",e.jsxs("code",{children:["columns=","{","options","}"]}),"。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"多列"}),"：",e.jsx("code",{children:"PickerColumn[]"}),"，每列互不依赖；每列可为 ",e.jsx("code",{children:"PickerOption[]"})," 或 ",e.jsxs("code",{children:["{"," options: PickerOption[]; defaultValue?: PickerValue ","}"]}),"。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"级联"}),"：",e.jsx("code",{children:"PickerOption[]"}),"（根节点数组，且至少一个 option 含 ",e.jsx("code",{children:"children"}),"），Picker 会根据当前选中值补全后续列。"]})]}),e.jsxs("p",{children:["对于单列场景，",e.jsx("code",{children:"value/defaultValue"})," 也可以直接传 ",e.jsx("code",{children:"PickerValue"}),"（而非数组）。"]}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsx("td",{children:"选项集合，支持单列/多列/级联"}),e.jsx("td",{children:e.jsx("code",{children:"PickerColumn[] | PickerOption[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"PickerValue[] | PickerValue"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"PickerValue[] | PickerValue"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"任意列变更时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(value: PickerValue[], options: (PickerOption | undefined)[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击「确定」按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(value: PickerValue[], options: (PickerOption | undefined)[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击「取消」按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showToolbar"})}),e.jsx("td",{children:"是否展示工具栏"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"toolbarPosition"})}),e.jsx("td",{children:"工具栏位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'bottom'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonText"})}),e.jsx("td",{children:"确认按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'确定'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonText"})}),e.jsx("td",{children:"取消按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemHeight"})}),e.jsx("td",{children:"每个选项高度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"44"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visibleItemCount"})}),e.jsx("td",{children:"可见选项个数（会兜底为 ≥3 的奇数）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.defaults.visibleItemCount"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否显示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否只读（禁用滚动/选择）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"decelerationRate"})}),e.jsx("td",{children:"滚动减速率（仅原生 FlatList 分支生效）"}),e.jsx("td",{children:e.jsx("code",{children:"'normal' | 'fast' | number"})}),e.jsx("td",{children:e.jsx("code",{children:"iOS: 0.9975 / Android: 0.989"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeDuration"})}),e.jsx("td",{children:"释放后的滚动动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.defaults.swipeDuration"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maskColor"})}),e.jsx("td",{children:"蒙层颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题背景色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maskType"})}),e.jsx("td",{children:"蒙层类型"}),e.jsx("td",{children:e.jsx("code",{children:"'gradient' | 'solid'"})}),e.jsx("td",{children:e.jsx("code",{children:"tokens.defaults.maskType"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsTop"})}),e.jsx("td",{children:"列容器顶部插槽"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsBottom"})}),e.jsx("td",{children:"列容器底部插槽"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optionRender"})}),e.jsx("td",{children:"自定义选项渲染"}),e.jsx("td",{children:e.jsx("code",{children:"(option, context) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"emitConfirmOnAutoSelect"})}),e.jsxs("td",{children:["非受控模式下，自动补全值时是否同步触发 ",e.jsx("code",{children:"onConfirm"})]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]})]})]}),e.jsx("h3",{id:"pickercolumn","data-anchor":"pickercolumn",children:"PickerColumn"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"类型"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"PickerOption[]"})}),e.jsx("td",{children:"单列或多列静态数据"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("code",{children:["{"," options: PickerOption[]; defaultValue?: PickerValue ","}"]})}),e.jsx("td",{children:"多列数据，支持为该列指定默认值"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"PickerOption[]"}),"（含 ",e.jsx("code",{children:"children"}),"）"]}),e.jsxs("td",{children:["级联数据，使用 ",e.jsx("code",{children:"children"})," 描述下一级"]})]})]})]}),e.jsx("h3",{id:"pickeroption","data-anchor":"pickeroption",children:"PickerOption"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"展示文本"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"选项值"}),e.jsx("td",{children:e.jsx("code",{children:"PickerValue"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"级联子选项"}),e.jsx("td",{children:e.jsx("code",{children:"PickerOption[]"})})]})]})]})]})})},O=[{Component:x,key:"picker-basic",sources:{_:{tsx:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '南京', value: 0 },
  { label: '苏州', value: 1 },
  { label: '常州', value: 2 },
  { label: '淮安', value: 3 },
  { label: '扬州', value: 4 },
  { label: '南通', value: 5 },
  { label: '宿迁', value: 6 },
  { label: '泰州', value: 7 },
  { label: '无锡', value: 8 },
  { label: '长沙', value: 9 },
]

export default function PickerBasicDemo() {
  return (
    <Picker
      title="基础使用"
      columns={columns}
      defaultValue={0}
      onChange={(values, opts) => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
        console.log('选中项: ', opts)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '南京', value: 0 },
  { label: '苏州', value: 1 },
  { label: '常州', value: 2 },
  { label: '淮安', value: 3 },
  { label: '扬州', value: 4 },
  { label: '南通', value: 5 },
  { label: '宿迁', value: 6 },
  { label: '泰州', value: 7 },
  { label: '无锡', value: 8 },
  { label: '长沙', value: 9 },
]

export default function PickerBasicDemo() {
  return (
    <Picker
      title="基础使用"
      columns={columns}
      defaultValue={0}
      onChange={(values, opts) => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
        console.log('选中项: ', opts)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},title:"基础用法",identifier:"picker-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:h,key:"picker-multi",sources:{_:{tsx:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'
import { View } from 'react-native'

const createOptions = (labels: string[]): PickerOption[] => labels.map(label => ({ label, value: label }))

const columns = [
  createOptions(['周一', '周二', '周三', '周四', '周五']),
  createOptions(['上午', '下午', '晚上']),
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['周二', '晚上'])

  return (
    <View>
      <Picker
        columns={columns}
        value={value}
        onChange={vals => {
          const indexes = columns.map((columnOptions, columnIndex) =>
            columnOptions.findIndex(option => option.value === vals[columnIndex])
          )
          Toast.info(\`当前值：\${vals}，当前索引：\${indexes}\`)
          setValue(vals)
        }}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'
import { View } from 'react-native'

const createOptions = (labels: string[]): PickerOption[] => labels.map(label => ({ label, value: label }))

const columns = [
  createOptions(['周一', '周二', '周三', '周四', '周五']),
  createOptions(['上午', '下午', '晚上']),
]

export default function PickerMultiDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['周二', '晚上'])

  return (
    <View>
      <Picker
        columns={columns}
        value={value}
        onChange={vals => {
          const indexes = columns.map((columnOptions, columnIndex) =>
            columnOptions.findIndex(option => option.value === vals[columnIndex])
          )
          Toast.info(\`当前值：\${vals}，当前索引：\${indexes}\`)
          setValue(vals)
        }}
      />
    </View>
  )
}
`}},title:"多列",identifier:"picker-multi",lang:"tsx",meta:{title:"多列"}},{Component:m,key:"picker-cascade",sources:{_:{tsx:`import React from 'react'
import { Picker } from 'react-native-system-ui'

const columns = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['2', '2-2', '2-2-2'])

  return (
    <Picker columns={columns} value={value} onChange={setValue} />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker } from 'react-native-system-ui'

const columns = [
  {
    label: '江苏',
    value: '1',
    children: [
      {
        label: '苏州',
        value: '1-1',
        children: [
          { label: '姑苏区', value: '1-1-1' },
          { label: '吴中区', value: '1-1-2' },
        ],
      },
      {
        label: '扬州',
        value: '1-2',
        children: [
          { label: '广陵区', value: '1-2-1' },
          { label: '邗江区', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '浙江',
    value: '2',
    children: [
      {
        label: '杭州',
        value: '2-1',
        children: [
          { label: '西湖区', value: '2-1-1' },
          { label: '余杭区', value: '2-1-2' },
        ],
      },
      {
        label: '温州',
        value: '2-2',
        children: [
          { label: '鹿城区', value: '2-2-1' },
          { label: '瓯海区', value: '2-2-2' },
        ],
      },
    ],
  },
]

export default function PickerCascadeDemo() {
  const [value, setValue] = React.useState<(string | number)[]>(['2', '2-2', '2-2-2'])

  return (
    <Picker columns={columns} value={value} onChange={setValue} />
  )
}
`}},title:"级联选择",identifier:"picker-cascade",lang:"tsx",meta:{title:"级联选择"}},{Component:v,key:"picker-toolbar",sources:{_:{tsx:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '8:00', value: '0800' },
  { label: '9:00', value: '0900' },
  { label: '10:00', value: '1000' },
]

export default function PickerToolbarDemo() {
  return (
    <Picker
      title="会议时间"
      columns={columns}
      defaultValue="0800"
      confirmButtonText="完成"
      cancelButtonText="返回"
      toolbarPosition="bottom"
      onChange={values => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Picker, Toast, type PickerOption } from 'react-native-system-ui'

const columns: PickerOption[] = [
  { label: '8:00', value: '0800' },
  { label: '9:00', value: '0900' },
  { label: '10:00', value: '1000' },
]

export default function PickerToolbarDemo() {
  return (
    <Picker
      title="会议时间"
      columns={columns}
      defaultValue="0800"
      confirmButtonText="完成"
      cancelButtonText="返回"
      toolbarPosition="bottom"
      onChange={values => {
        const index = columns.findIndex(option => option.value === values[0])
        Toast.info(\`选中值\${values[0]}，索引: \${index}\`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
`}},title:"底部工具栏",identifier:"picker-toolbar",lang:"tsx",meta:{title:"底部工具栏"}}],g={simulator:{compact:!0}},V=[{depth:1,text:"Picker 选择器",id:"picker-选择器"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"多列联动",id:"多列联动"},{depth:3,text:"省市区联动",id:"省市区联动"},{depth:3,text:"自定义工具栏",id:"自定义工具栏"},{depth:2,text:"列数据结构",id:"列数据结构"},{depth:2,text:"API",id:"api"},{depth:3,text:"PickerColumn",id:"pickercolumn"},{depth:3,text:"PickerOption",id:"pickeroption"}],R="/docs/components/picker.md",$="Picker 选择器",I="1770276463000",re=n=>n.children({MdContent:T,demos:O,frontmatter:g,slugs:V,filePath:R,title:$,updatedTime:I});export{T as MdContent,re as default,O as demos,R as filePath,g as frontmatter,V as slugs,$ as title,I as updatedTime};
