import{R as p,r as c,j as e,V as g,s as N}from"./main-BXb8DOxl.js";import{T as z}from"./createComponentTokensHook-C7GS3cUR.js";import{P as M}from"./Picker-BV-pEfjz.js";import{F as O}from"./Field-CRK4EWhd.js";import{B as k}from"./index-B_Jsx0Km.js";import"./Loading-C0Kht0oY.js";import"./index-9yrhdMQu.js";import"./extends-CF3RwP-h.js";import"./color-DX_kf2WP.js";import"./number-BrRWL1fO.js";import"./index-CJrLMJTa.js";import"./index-DkTYenKX.js";import"./compare-B0QhPEQa.js";import"./index-ZIcEKt2e.js";import"./index-CysvSvJu.js";import"./IconBase-5wkEN6D1.js";import"./index-BSmhLq_l.js";import"./Arrow-D1qxk6Xz.js";import"./hairline-BrrexFH9.js";import"./useAriaPress-6bm6-278.js";import"./index-C4pDPcGj.js";import"./useLocale-PK1ub-S0.js";import"./promise-nIQVXYv7.js";import"./Close-BDE-d6Lo.js";import"./Popup-CKHRlZsm.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-DNoXqwcq.js";import"./Animated-BshxiKK9.js";import"./index-BPY4IQIH.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-VZ9qA3Du.js";import"./index-4Yp_2FWl.js";import"./SafeAreaView-DgWhFFT_.js";import"./useSafeAreaPadding-C6K9c3C6.js";import"./index-CUJhPZZs.js";const E=t=>t?Object.entries(t).sort(([n],[i])=>n.localeCompare(i)):[],D=t=>t.slice(0,2),B=t=>t.slice(0,4),L=(t,n)=>{const i=new Map;return E(t).forEach(([o,r])=>{const a=n(o),s=i.get(a);s?s.push({label:r,value:o}):i.set(a,[{label:r,value:o}])}),i},I=(t,n=3)=>{const i=E(t.province_list);if(n===1)return i.map(([r,a])=>({label:a,value:r}));const o=L(t.city_list,D);if(n===3){const r=L(t.county_list,B);o.forEach(a=>{a.forEach(s=>{const u=B(s.value),l=r.get(u);l&&l.length&&(s.children=l)})})}return i.map(([r,a])=>{const s={label:a,value:r},u=D(r),l=o.get(u);return l&&l.length&&(s.children=l),s})},H=(t,n,i)=>{if(!n)return n;const o=Array.isArray(n)?n.map(String):[String(n)],r=[];let a=t;for(let s=0;s<i&&a?.length;s+=1){const u=o[s],l=a.find(d=>String(d.value)===u)??a[0];if(!l)break;r.push(String(l.value)),a=l.children}return r},W=t=>{const{areaList:n,columnsNum:i=3,value:o,defaultValue:r,onChange:a,onConfirm:s,interactionMode:u="sync",...l}=t,d=c.useMemo(()=>i>=1&&i<=3?i:3,[i]),{province_list:C,city_list:S,county_list:T}=n,y=c.useMemo(()=>I({province_list:C,city_list:S,county_list:T},d),[S,T,C,d]),x=c.useCallback(m=>m===void 0?void 0:H(y,m,d),[y,d]),P=c.useMemo(()=>x(o),[x,o]),_=c.useMemo(()=>x(r),[x,r]),A=c.useRef(a);A.current=a;const V=c.useRef(s);V.current=s;const R=c.useCallback((m,j)=>{A.current?.(m.map(String),j)},[]),w=c.useCallback((m,j)=>{V.current?.(m.map(String),j)},[]);return e.jsx(M,{...l,columns:y,interactionMode:u,value:P,defaultValue:_,onChange:a?R:void 0,onConfirm:s?w:void 0})},v=p.memo(W);v.displayName="Area";const h={province_list:{11e4:"北京",31e4:"上海"},city_list:{110100:"北京市",310100:"上海市"},county_list:{110101:"东城区",110102:"西城区",310101:"黄浦区"}};function G(){const[t,n]=p.useState(["110000","110100","110101"]);return e.jsx(v,{areaList:h,value:t,onChange:n,title:"选择地区"})}function K(){const[t,n]=p.useState(["110000","110100"]);return e.jsx(v,{areaList:h,columnsNum:2,value:t,onChange:n,title:"省市选择"})}function U(){const[t,n]=p.useState(["110000","110100","110101"]),i=[h.province_list[t[0]],h.city_list[t[1]],h.county_list[t[2]]].filter(Boolean).join(" / ");return e.jsxs(g,{style:{gap:12},children:[e.jsx(v,{areaList:h,value:t,onChange:n,title:"受控模式"}),e.jsx(O,{readOnly:!0,label:"选择结果",value:i}),e.jsx(k,{text:"切换至上海",onPress:()=>n(["310000","310100","310101"])})]})}const f=({title:t,children:n})=>e.jsxs(g,{style:b.section,children:[e.jsx(z,{style:b.title,children:t}),n]});function F(){return e.jsxs(g,{style:b.list,children:[e.jsx(f,{title:"基础用法",children:e.jsx(G,{})}),e.jsx(f,{title:"列数切换",children:e.jsx(K,{})}),e.jsx(f,{title:"受控模式",children:e.jsx(U,{})})]})}const b=N.create({list:{gap:16},section:{gap:12},title:{fontSize:14,color:"#323233",fontWeight:"600"}}),q=`import React from 'react'
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
`,J={code:q,sources:{_:{tsx:`import React from 'react'
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

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}},Q=function({previewer:t=()=>null,api:n=()=>null}){const i=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"area-省市区","data-anchor":"area-省市区",children:"Area 省市区"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"基于 Picker 封装的省市区选择器，支持 1-3 列切换、受控模式与异步数据源。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { Area } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["传入 ",e.jsx("code",{children:"areaList"})," 即可渲染省市区三级联动，并支持列数切换与受控模式。"]}),e.jsx("div",{children:e.jsx(i,{...J,children:e.jsx(F,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"area-props","data-anchor":"area-props",children:"Area Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"areaList"})}),e.jsx("td",{children:"省市区数据"}),e.jsx("td",{children:e.jsx("code",{children:"AreaList"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsNum"})}),e.jsx("td",{children:"展示列数"}),e.jsx("td",{children:e.jsx("code",{children:"1 | 2 | 3"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中地区码数组（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中值"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonText"})}),e.jsx("td",{children:"确认按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'确定'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonText"})}),e.jsx("td",{children:"取消按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemHeight"})}),e.jsx("td",{children:"选项高度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visibleItemCount"})}),e.jsx("td",{children:"可见选项个数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否显示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"interactionMode"})}),e.jsx("td",{children:"交互同步策略"}),e.jsx("td",{children:e.jsx("code",{children:"'auto' | 'freeze' | 'sync'"})}),e.jsx("td",{children:e.jsx("code",{children:"'sync'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选项改变回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"arealist-格式","data-anchor":"arealist-格式",children:"AreaList 格式"}),e.jsx(i,{code:`interface AreaList {
  province_list?: Record<string, string>
  city_list?: Record<string, string>
  county_list?: Record<string, string>
}`,lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["省市区数据结构兼容 Vant 的 ",e.jsx("a",{href:"https://vant-contrib.gitee.io/vant/v3/#/zh-CN/area",children:"Area"})," 示例；若需要自定义异步加载，可先处理数据再传入组件。"]})})]})})},X=[{Component:F,key:"area-basic",sources:{_:{tsx:`import React from 'react'
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

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}}],Y={simulator:{compact:!0}},Z=[{depth:1,text:"Area 省市区",id:"area-省市区"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:2,text:"API",id:"api"},{depth:3,text:"Area Props",id:"area-props"},{depth:3,text:"AreaList 格式",id:"arealist-格式"}],$="/docs/components/area.md",ee="Area 省市区",te="1769570039000",ze=t=>t.children({MdContent:Q,demos:X,frontmatter:Y,slugs:Z,filePath:$,title:ee,updatedTime:te});export{Q as MdContent,ze as default,X as demos,$ as filePath,Y as frontmatter,Z as slugs,ee as title,te as updatedTime};
