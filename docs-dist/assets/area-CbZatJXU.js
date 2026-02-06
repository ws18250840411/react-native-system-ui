import{r as d,j as e,V as f,s as R,R as b}from"./main-CX5QgiXt.js";import{T as w}from"./createComponentTokensHook-Hc3l7riF.js";import{P as N}from"./Picker-C-bovegc.js";import{F as z}from"./Field-D9GqoDnQ.js";import{B as M}from"./index-B1BD4WKR.js";import"./Loading-Dy4Xe7Yb.js";import"./index-quLIWFrm.js";import"./extends-CF3RwP-h.js";import"./color-Cjzk_5VY.js";import"./number-DMCxwktP.js";import"./index-CJrLMJTa.js";import"./index-CQ2P49YQ.js";import"./compare-B0QhPEQa.js";import"./index-BEnr4R_B.js";import"./index-CTcRCRb2.js";import"./IconBase-D_kjvpJY.js";import"./index-D361XNui.js";import"./Arrow-CFMZgj_G.js";import"./hairline-6DGjxZ3L.js";import"./useAriaPress-sIRcrStb.js";import"./index-D5gHWa6o.js";import"./useLocale-CcH7XcZU.js";import"./promise-Qds5Ah4Z.js";import"./Close-D6NXA1XS.js";import"./Popup-DLZFaqRn.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-BtmwX5Pt.js";import"./Overlay-uC1_KEGM.js";import"./Animated-rPtBS5kg.js";import"./index-BDzwQtXM.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-CF7tueuh.js";import"./index-4qDXDIEs.js";import"./SafeAreaView-DiARkPwI.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./index-yde5mSE_.js";const B=t=>t?Object.entries(t).sort(([n],[i])=>n.localeCompare(i)):[],A=t=>t.slice(0,2),V=t=>t.slice(0,4),D=(t,n)=>{const i=new Map;return B(t).forEach(([o,a])=>{const s=n(o),r=i.get(s);r?r.push({label:a,value:o}):i.set(s,[{label:a,value:o}])}),i},O=(t,n=3)=>{const i=B(t.province_list);if(n===1)return i.map(([a,s])=>({label:s,value:a}));const o=D(t.city_list,A);if(n===3){const a=D(t.county_list,V);o.forEach(s=>{s.forEach(r=>{const c=V(r.value),l=a.get(c);l&&l.length&&(r.children=l)})})}return i.map(([a,s])=>{const r={label:s,value:a},c=A(a),l=o.get(c);return l&&l.length&&(r.children=l),r})},k=(t,n,i)=>{if(!n)return n;const o=Array.isArray(n)?n.map(String):[String(n)],a=[];let s=t;for(let r=0;r<i&&s?.length;r+=1){const c=o[r],l=s.find(u=>String(u.value)===c)??s[0];if(!l)break;a.push(String(l.value)),s=l.children}return a},p=t=>{const{areaList:n,columnsNum:i=3,value:o,defaultValue:a,onChange:s,onConfirm:r,interactionMode:c="sync",...l}=t,u=d.useMemo(()=>i>=1&&i<=3?i:3,[i]),{province_list:g,city_list:C,county_list:T}=n,v=d.useMemo(()=>O({province_list:g,city_list:C,county_list:T},u),[C,T,g,u]),x=d.useCallback(h=>h===void 0?void 0:k(v,h,u),[v,u]),E=d.useMemo(()=>x(o),[x,o]),F=d.useMemo(()=>x(a),[x,a]),S=d.useCallback(h=>h?(P,_)=>h(P.map(String),_):void 0,[]);return e.jsx(N,{...l,columns:v,interactionMode:c,value:E,defaultValue:F,onChange:S(s),onConfirm:S(r)})};p.displayName="Area";const m={province_list:{11e4:"北京",31e4:"上海"},city_list:{110100:"北京市",310100:"上海市"},county_list:{110101:"东城区",110102:"西城区",310101:"黄浦区"}};function H(){const[t,n]=b.useState(["110000","110100","110101"]);return e.jsx(p,{areaList:m,value:t,onChange:n,title:"选择地区"})}function I(){const[t,n]=b.useState(["110000","110100"]);return e.jsx(p,{areaList:m,columnsNum:2,value:t,onChange:n,title:"省市选择"})}function W(){const[t,n]=b.useState(["110000","110100","110101"]),i=[m.province_list[t[0]],m.city_list[t[1]],m.county_list[t[2]]].filter(Boolean).join(" / ");return e.jsxs(f,{style:{gap:12},children:[e.jsx(p,{areaList:m,value:t,onChange:n,title:"受控模式"}),e.jsx(z,{readOnly:!0,label:"选择结果",value:i}),e.jsx(M,{text:"切换至上海",onPress:()=>n(["310000","310100","310101"])})]})}const y=({title:t,children:n})=>e.jsxs(f,{style:j.section,children:[e.jsx(w,{style:j.title,children:t}),n]});function L(){return e.jsxs(f,{style:j.list,children:[e.jsx(y,{title:"基础用法",children:e.jsx(H,{})}),e.jsx(y,{title:"列数切换",children:e.jsx(I,{})}),e.jsx(y,{title:"受控模式",children:e.jsx(W,{})})]})}const j=R.create({list:{gap:16},section:{gap:12},title:{fontSize:14,color:"#323233",fontWeight:"600"}}),G=`import React from 'react'
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
`,K={code:G,sources:{_:{tsx:`import React from 'react'
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

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}},U=function({previewer:t=()=>null,api:n=()=>null}){const i=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"area-省市区","data-anchor":"area-省市区",children:"Area 省市区"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"基于 Picker 封装的省市区选择器，支持 1-3 列切换、受控模式与异步数据源。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Area } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["传入 ",e.jsx("code",{children:"areaList"})," 即可渲染省市区三级联动，并支持列数切换与受控模式。"]}),e.jsx("div",{children:e.jsx(i,{...K,children:e.jsx(L,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"area-props","data-anchor":"area-props",children:"Area Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"areaList"})}),e.jsx("td",{children:"省市区数据"}),e.jsx("td",{children:e.jsx("code",{children:"AreaList"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsNum"})}),e.jsx("td",{children:"展示列数"}),e.jsx("td",{children:e.jsx("code",{children:"1 | 2 | 3"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中地区码数组（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中值"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonText"})}),e.jsx("td",{children:"确认按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'确定'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonText"})}),e.jsx("td",{children:"取消按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemHeight"})}),e.jsx("td",{children:"选项高度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visibleItemCount"})}),e.jsx("td",{children:"可见选项个数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否显示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"interactionMode"})}),e.jsx("td",{children:"交互同步策略"}),e.jsx("td",{children:e.jsx("code",{children:"'auto' | 'freeze' | 'sync'"})}),e.jsx("td",{children:e.jsx("code",{children:"'sync'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选项改变回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"arealist-格式","data-anchor":"arealist-格式",children:"AreaList 格式"}),e.jsx(i,{code:`interface AreaList {
  province_list?: Record<string, string>
  city_list?: Record<string, string>
  county_list?: Record<string, string>
}`,lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["省市区数据结构兼容 Vant 的 ",e.jsx("a",{href:"https://vant-contrib.gitee.io/vant/v3/#/zh-CN/area",children:"Area"})," 示例；若需要自定义异步加载，可先处理数据再传入组件。"]})})]})})},q=[{Component:L,key:"area-basic",sources:{_:{tsx:`import React from 'react'
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

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}}],J={simulator:{compact:!0}},Q=[{depth:1,text:"Area 省市区",id:"area-省市区"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:2,text:"API",id:"api"},{depth:3,text:"Area Props",id:"area-props"},{depth:3,text:"AreaList 格式",id:"arealist-格式"}],X="/docs/components/area.md",Y="Area 省市区",Z="1769570039000",we=t=>t.children({MdContent:U,demos:q,frontmatter:J,slugs:Q,filePath:X,title:Y,updatedTime:Z});export{U as MdContent,we as default,q as demos,X as filePath,J as frontmatter,Q as slugs,Y as title,Z as updatedTime};
