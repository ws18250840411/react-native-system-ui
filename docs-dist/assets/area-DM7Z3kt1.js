import{R as p,r as u,j as e,V as C,s as k}from"./main-CC2DK3OK.js";import{c as M,T as O}from"./createComponentTokensHook-BcXZOvON.js";import{P as z}from"./Picker-BzpxbIBG.js";import{F as I}from"./Field-DkY6Dtkh.js";import{B as H}from"./index-BfHwmVBQ.js";import"./Loading-_9EKEhr2.js";import"./index-BnjI8SiS.js";import"./extends-CF3RwP-h.js";import"./color-BplLcdBL.js";import"./number-BG570ZaL.js";import"./index-CJrLMJTa.js";import"./index-CN-rk8sC.js";import"./compare-B0QhPEQa.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./IconBase-BNmvoXvm.js";import"./index-Dueh9AzQ.js";import"./Arrow-CP2eQgBg.js";import"./hairline-Bq3nniT3.js";import"./useAriaPress-DVn62gIQ.js";import"./index-D03jSN7d.js";import"./useLocale-B4lUqsPR.js";import"./promise-DzoogS-n.js";import"./Close-BKbx2ovl.js";import"./Popup-G3cXoDWN.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D9I31KH1.js";import"./Animated-C-b5K9fC.js";import"./index-D_JlQYPg.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-xa377Hoz.js";import"./index-BP7Blb5n.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./index-CfGUJPQW.js";const W=t=>({defaults:{columnsNum:3,interactionMode:"sync"}}),G=M("area",W),B=t=>t?Object.entries(t).sort(([n],[i])=>n.localeCompare(i)):[],E=t=>t.slice(0,2),F=t=>t.slice(0,4),L=(t,n)=>{const i=new Map;return B(t).forEach(([l,r])=>{const a=n(l),s=i.get(a);s?s.push({label:r,value:l}):i.set(a,[{label:r,value:l}])}),i},K=(t,n=3)=>{const i=B(t.province_list);if(n===1)return i.map(([r,a])=>({label:a,value:r}));const l=L(t.city_list,E);if(n===3){const r=L(t.county_list,F);l.forEach(a=>{a.forEach(s=>{const c=F(s.value),o=r.get(c);o&&o.length&&(s.children=o)})})}return i.map(([r,a])=>{const s={label:a,value:r},c=E(r),o=l.get(c);return o&&o.length&&(s.children=o),s})},U=(t,n,i)=>{if(!n)return n;const l=Array.isArray(n)?n.map(String):[String(n)],r=[];let a=t;for(let s=0;s<i&&a?.length;s+=1){const c=l[s],o=a.find(f=>String(f.value)===c)??a[0];if(!o)break;r.push(String(o.value)),a=o.children}return r},q=t=>{const n=G(),{areaList:i,columnsNum:l=n.defaults.columnsNum,value:r,defaultValue:a,onChange:s,onConfirm:c,interactionMode:o=n.defaults.interactionMode,...f}=t,h=u.useMemo(()=>l>=1&&l<=3?l:n.defaults.columnsNum,[l]),{province_list:T,city_list:A,county_list:S}=i,v=u.useMemo(()=>K({province_list:T,city_list:A,county_list:S},h),[A,S,T,h]),x=u.useCallback(d=>d===void 0?void 0:U(v,d,h),[v,h]),_=u.useMemo(()=>x(r),[x,r]),R=u.useMemo(()=>x(a),[x,a]),V=u.useRef(s);V.current=s;const D=u.useRef(c);D.current=c;const w=u.useCallback((d,j)=>{V.current?.(d.map(String),j)},[]),N=u.useCallback((d,j)=>{D.current?.(d.map(String),j)},[]);return e.jsx(z,{...f,columns:v,interactionMode:o,value:_,defaultValue:R,onChange:s?w:void 0,onConfirm:c?N:void 0})},y=p.memo(q);y.displayName="Area";const m={province_list:{11e4:"北京",31e4:"上海"},city_list:{110100:"北京市",310100:"上海市"},county_list:{110101:"东城区",110102:"西城区",310101:"黄浦区"}};function J(){const[t,n]=p.useState(["110000","110100","110101"]);return e.jsx(y,{areaList:m,value:t,onChange:n,title:"选择地区"})}function Q(){const[t,n]=p.useState(["110000","110100"]);return e.jsx(y,{areaList:m,columnsNum:2,value:t,onChange:n,title:"省市选择"})}function X(){const[t,n]=p.useState(["110000","110100","110101"]),i=[m.province_list[t[0]],m.city_list[t[1]],m.county_list[t[2]]].filter(Boolean).join(" / ");return e.jsxs(C,{style:{gap:12},children:[e.jsx(y,{areaList:m,value:t,onChange:n,title:"受控模式"}),e.jsx(I,{readOnly:!0,label:"选择结果",value:i}),e.jsx(H,{text:"切换至上海",onPress:()=>n(["310000","310100","310101"])})]})}const b=({title:t,children:n})=>e.jsxs(C,{style:g.section,children:[e.jsx(O,{style:g.title,children:t}),n]});function P(){return e.jsxs(C,{style:g.list,children:[e.jsx(b,{title:"基础用法",children:e.jsx(J,{})}),e.jsx(b,{title:"列数切换",children:e.jsx(Q,{})}),e.jsx(b,{title:"受控模式",children:e.jsx(X,{})})]})}const g=k.create({list:{gap:16},section:{gap:12},title:{fontSize:14,color:"#323233",fontWeight:"600"}}),Y=`import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Area, Button, Field, Tabs } from 'react-native-system-ui'

import { areaList } from './areaList'

function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])
  return <Area areaList={areaList} value={value} onChange={setValue} title="选择地区" />
}

function ColumnsDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100'])
  return (
    <Area areaList={areaList} columnsNum={2} value={value} onChange={setValue} title="省市选择" />
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area areaList={areaList} value={value} onChange={setValue} title="受控模式" />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button text="切换至上海" onPress={() => setValue(['310000', '310100', '310101'])} />
    </View>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
)

export default function AreaTabbedDemo() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.list}>
        <Section title="基础用法">
          <BasicDemo />
        </Section>
        <Section title="列数切换">
          <ColumnsDemo />
        </Section>
        <Section title="受控模式">
          <ControlledDemo />
        </Section>
      </View>
    )
  }

  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '33.33%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <BasicDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="columns" title="列数切换">
        <ColumnsDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="controlled" title="受控模式">
        <ControlledDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: '#323233',
    fontWeight: '600',
  },
})
`,Z={code:Y,sources:{_:{tsx:`import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Area, Button, Field, Tabs } from 'react-native-system-ui'

import { areaList } from './areaList'

function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])
  return <Area areaList={areaList} value={value} onChange={setValue} title="选择地区" />
}

function ColumnsDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100'])
  return (
    <Area areaList={areaList} columnsNum={2} value={value} onChange={setValue} title="省市选择" />
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area areaList={areaList} value={value} onChange={setValue} title="受控模式" />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button text="切换至上海" onPress={() => setValue(['310000', '310100', '310101'])} />
    </View>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
)

export default function AreaTabbedDemo() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.list}>
        <Section title="基础用法">
          <BasicDemo />
        </Section>
        <Section title="列数切换">
          <ColumnsDemo />
        </Section>
        <Section title="受控模式">
          <ControlledDemo />
        </Section>
      </View>
    )
  }

  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '33.33%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <BasicDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="columns" title="列数切换">
        <ColumnsDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="controlled" title="受控模式">
        <ControlledDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: '#323233',
    fontWeight: '600',
  },
})
`},"areaList.ts":{import:"./areaList",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/area/demo/areaList.ts",content:`export const areaList: {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
} = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '310101': '黄浦区',
  },
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Area, Button, Field, Tabs } from 'react-native-system-ui'

import { areaList } from './areaList'

function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])
  return <Area areaList={areaList} value={value} onChange={setValue} title="选择地区" />
}

function ColumnsDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100'])
  return (
    <Area areaList={areaList} columnsNum={2} value={value} onChange={setValue} title="省市选择" />
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area areaList={areaList} value={value} onChange={setValue} title="受控模式" />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button text="切换至上海" onPress={() => setValue(['310000', '310100', '310101'])} />
    </View>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
)

export default function AreaTabbedDemo() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.list}>
        <Section title="基础用法">
          <BasicDemo />
        </Section>
        <Section title="列数切换">
          <ColumnsDemo />
        </Section>
        <Section title="受控模式">
          <ControlledDemo />
        </Section>
      </View>
    )
  }

  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '33.33%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <BasicDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="columns" title="列数切换">
        <ColumnsDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="controlled" title="受控模式">
        <ControlledDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: '#323233',
    fontWeight: '600',
  },
})
`},"areaList.ts":{type:"FILE",value:`export const areaList: {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
} = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '310101': '黄浦区',
  },
}

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}},$=function({previewer:t=()=>null,api:n=()=>null}){const i=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"area-省市区","data-anchor":"area-省市区",children:"Area 省市区"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"基于 Picker 封装的省市区选择器，支持 1-3 列切换、受控模式与异步数据源。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Area } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["传入 ",e.jsx("code",{children:"areaList"})," 即可渲染省市区三级联动，并支持列数切换与受控模式。"]}),e.jsx("div",{children:e.jsx(i,{...Z,children:e.jsx(P,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"area-props","data-anchor":"area-props",children:"Area Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"areaList"})}),e.jsx("td",{children:"省市区数据"}),e.jsx("td",{children:e.jsx("code",{children:"AreaList"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsNum"})}),e.jsx("td",{children:"展示列数"}),e.jsx("td",{children:e.jsx("code",{children:"1 | 2 | 3"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中地区码数组（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中值"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonText"})}),e.jsx("td",{children:"确认按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'确定'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonText"})}),e.jsx("td",{children:"取消按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemHeight"})}),e.jsx("td",{children:"选项高度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visibleItemCount"})}),e.jsx("td",{children:"可见选项个数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否显示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"interactionMode"})}),e.jsx("td",{children:"交互同步策略"}),e.jsx("td",{children:e.jsx("code",{children:"'auto' | 'freeze' | 'sync'"})}),e.jsx("td",{children:e.jsx("code",{children:"'sync'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选项改变回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"arealist-格式","data-anchor":"arealist-格式",children:"AreaList 格式"}),e.jsx(i,{code:`interface AreaList {
  province_list?: Record<string, string>
  city_list?: Record<string, string>
  county_list?: Record<string, string>
}`,lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["省市区数据结构采用 ",e.jsx("code",{children:"province_list / city_list / county_list"})," 格式，key 为地区编码，value 为地区名称；若需要自定义异步加载，可先处理数据再传入组件。"]})})]})})},ee=[{Component:P,key:"area-basic",sources:{_:{tsx:`import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Area, Button, Field, Tabs } from 'react-native-system-ui'

import { areaList } from './areaList'

function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])
  return <Area areaList={areaList} value={value} onChange={setValue} title="选择地区" />
}

function ColumnsDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100'])
  return (
    <Area areaList={areaList} columnsNum={2} value={value} onChange={setValue} title="省市选择" />
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area areaList={areaList} value={value} onChange={setValue} title="受控模式" />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button text="切换至上海" onPress={() => setValue(['310000', '310100', '310101'])} />
    </View>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
)

export default function AreaTabbedDemo() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.list}>
        <Section title="基础用法">
          <BasicDemo />
        </Section>
        <Section title="列数切换">
          <ColumnsDemo />
        </Section>
        <Section title="受控模式">
          <ControlledDemo />
        </Section>
      </View>
    )
  }

  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '33.33%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <BasicDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="columns" title="列数切换">
        <ColumnsDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="controlled" title="受控模式">
        <ControlledDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: '#323233',
    fontWeight: '600',
  },
})
`},"areaList.ts":{import:"./areaList",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/area/demo/areaList.ts",content:`export const areaList: {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
} = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '310101': '黄浦区',
  },
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import { Area, Button, Field, Tabs } from 'react-native-system-ui'

import { areaList } from './areaList'

function BasicDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])
  return <Area areaList={areaList} value={value} onChange={setValue} title="选择地区" />
}

function ColumnsDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100'])
  return (
    <Area areaList={areaList} columnsNum={2} value={value} onChange={setValue} title="省市选择" />
  )
}

function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(['110000', '110100', '110101'])

  const displayValue = [
    areaList.province_list[value[0]],
    areaList.city_list[value[1]],
    areaList.county_list[value[2]],
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <View style={{ gap: 12 }}>
      <Area areaList={areaList} value={value} onChange={setValue} title="受控模式" />
      <Field readOnly label="选择结果" value={displayValue} />
      <Button text="切换至上海" onPress={() => setValue(['310000', '310100', '310101'])} />
    </View>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
)

export default function AreaTabbedDemo() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.list}>
        <Section title="基础用法">
          <BasicDemo />
        </Section>
        <Section title="列数切换">
          <ColumnsDemo />
        </Section>
        <Section title="受控模式">
          <ControlledDemo />
        </Section>
      </View>
    )
  }

  return (
    <Tabs
      defaultActive="basic"
      border={false}
      color="#3a7afe"
      titleActiveColor="#3a7afe"
      align="start"
      tabStyle={{ flexBasis: '33.33%', flexGrow: 0 }}
      tabBarStyle={{ paddingHorizontal: 0 }}
    >
      <Tabs.TabPane name="basic" title="基础用法">
        <BasicDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="columns" title="列数切换">
        <ColumnsDemo />
      </Tabs.TabPane>
      <Tabs.TabPane name="controlled" title="受控模式">
        <ControlledDemo />
      </Tabs.TabPane>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 16,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    color: '#323233',
    fontWeight: '600',
  },
})
`},"areaList.ts":{type:"FILE",value:`export const areaList: {
  province_list: Record<string, string>
  city_list: Record<string, string>
  county_list: Record<string, string>
} = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '310101': '黄浦区',
  },
}

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}}],te={simulator:{compact:!0}},ne=[{depth:1,text:"Area 省市区",id:"area-省市区"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:2,text:"API",id:"api"},{depth:3,text:"Area Props",id:"area-props"},{depth:3,text:"AreaList 格式",id:"arealist-格式"}],ie="/docs/components/area.md",ae="Area 省市区",se="1770373480000",Ie=t=>t.children({MdContent:$,demos:ee,frontmatter:te,slugs:ne,filePath:ie,title:ae,updatedTime:se});export{$ as MdContent,Ie as default,ee as demos,ie as filePath,te as frontmatter,ne as slugs,ae as title,se as updatedTime};
