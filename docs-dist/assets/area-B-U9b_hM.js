import{r as d,j as e,V as b,s as _,R as g}from"./main-O6KZrSH_.js";import{T as R}from"./createComponentTokensHook-KzOuLm4c.js";import{P as w}from"./Picker-C1PrIgoJ.js";import{F as N}from"./Field-Ckp9NSMz.js";import{B as M}from"./index-DzU_0rvq.js";import"./Loading-CdSfkQu4.js";import"./index-ANZ1PvOD.js";import"./extends-CF3RwP-h.js";import"./color-cEGfwRja.js";import"./number-BcSDXImJ.js";import"./index-CJrLMJTa.js";import"./index-DvCZppP1.js";import"./compare-B0QhPEQa.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./IconBase-DZr7C-P7.js";import"./index-DCx-GaLs.js";import"./Arrow-r8D7M_Tx.js";import"./hairline-Dpq7rEkb.js";import"./useAriaPress-DMjZXFvR.js";import"./index-NcsZVNiX.js";import"./useLocale-C-3I3wuL.js";import"./promise-DDQXV5JQ.js";import"./Close-DpyqkEOI.js";import"./Popup-DvjP5SkZ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./Animated-qBs3E5U6.js";import"./index-C_v13XD0.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-Tvvid2F1.js";import"./index-Cq_gACMg.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./index-B3Y2P23a.js";const z=(t,n)=>t<n?-1:t>n?1:0,y=t=>t?Object.entries(t).sort(([n],[s])=>z(n,s)):[],A=t=>t.slice(0,2),V=t=>t.slice(0,4),O=(t,n=3)=>{const s=y(t.province_list);if(n===1)return s.map(([r,i])=>({label:i,value:r}));const u=new Map;if(y(t.city_list).forEach(([r,i])=>{const l=A(r),o={label:i,value:r},a=u.get(l);a?a.push(o):u.set(l,[o])}),n===3){const r=new Map;y(t.county_list).forEach(([i,l])=>{const o=V(i),a={label:l,value:i},c=r.get(o);c?c.push(a):r.set(o,[a])}),u.forEach(i=>{i.forEach(l=>{const o=V(l.value),a=r.get(o);a&&a.length&&(l.children=a)})})}return s.map(([r,i])=>{const l={label:i,value:r},o=A(r),a=u.get(o);return a&&a.length&&(l.children=a),l})},D=(t,n,s)=>{if(!n)return n;const u=Array.isArray(n)?n.map(String):[String(n)],r=[];let i=t;for(let l=0;l<s&&i?.length;l+=1){const o=u[l],a=i.find(c=>String(c.value)===o)??i[0];if(!a)break;r.push(String(a.value)),i=a.children}return r},x=t=>{const{areaList:n,columnsNum:s=3,value:u,defaultValue:r,onChange:i,onConfirm:l,interactionMode:o="sync",...a}=t,c=d.useMemo(()=>s===1||s===2||s===3?s:3,[s]),{province_list:C,city_list:S,county_list:T}=n,h=d.useMemo(()=>O({province_list:C,city_list:S,county_list:T},c),[S,T,C,c]),E=d.useMemo(()=>u===void 0?void 0:D(h,u,c),[h,c,u]),L=d.useMemo(()=>r===void 0?void 0:D(h,r,c),[h,r,c]),F=d.useCallback((p,v)=>{i?.(p.map(String),v)},[i]),P=d.useCallback((p,v)=>{l?.(p.map(String),v)},[l]);return e.jsx(w,{...a,columns:h,interactionMode:o,value:E,defaultValue:L,onChange:i?F:void 0,onConfirm:l?P:void 0})};x.displayName="Area";const m={province_list:{11e4:"北京",31e4:"上海"},city_list:{110100:"北京市",310100:"上海市"},county_list:{110101:"东城区",110102:"西城区",310101:"黄浦区"}};function k(){const[t,n]=g.useState(["110000","110100","110101"]);return e.jsx(x,{areaList:m,value:t,onChange:n,title:"选择地区"})}function I(){const[t,n]=g.useState(["110000","110100"]);return e.jsx(x,{areaList:m,columnsNum:2,value:t,onChange:n,title:"省市选择"})}function H(){const[t,n]=g.useState(["110000","110100","110101"]),s=[m.province_list[t[0]],m.city_list[t[1]],m.county_list[t[2]]].filter(Boolean).join(" / ");return e.jsxs(b,{style:{gap:12},children:[e.jsx(x,{areaList:m,value:t,onChange:n,title:"受控模式"}),e.jsx(N,{readOnly:!0,label:"选择结果",value:s}),e.jsx(M,{text:"切换至上海",onPress:()=>n(["310000","310100","310101"])})]})}const j=({title:t,children:n})=>e.jsxs(b,{style:f.section,children:[e.jsx(R,{style:f.title,children:t}),n]});function B(){return e.jsxs(b,{style:f.list,children:[e.jsx(j,{title:"基础用法",children:e.jsx(k,{})}),e.jsx(j,{title:"列数切换",children:e.jsx(I,{})}),e.jsx(j,{title:"受控模式",children:e.jsx(H,{})})]})}const f=_.create({list:{gap:16},section:{gap:12},title:{fontSize:14,color:"#323233",fontWeight:"600"}}),W=`import React from 'react'
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
`,G={code:W,sources:{_:{tsx:`import React from 'react'
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

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}},K=function({previewer:t=()=>null,api:n=()=>null}){const s=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"area-省市区","data-anchor":"area-省市区",children:"Area 省市区"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"基于 Picker 封装的省市区选择器，支持 1-3 列切换、受控模式与异步数据源。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Area } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["传入 ",e.jsx("code",{children:"areaList"})," 即可渲染省市区三级联动，并支持列数切换与受控模式。"]}),e.jsx("div",{children:e.jsx(s,{...G,children:e.jsx(B,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"area-props","data-anchor":"area-props",children:"Area Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"areaList"})}),e.jsx("td",{children:"省市区数据"}),e.jsx("td",{children:e.jsx("code",{children:"AreaList"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnsNum"})}),e.jsx("td",{children:"展示列数"}),e.jsx("td",{children:e.jsx("code",{children:"1 | 2 | 3"})}),e.jsx("td",{children:e.jsx("code",{children:"3"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中地区码数组（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中值"}),e.jsx("td",{children:e.jsx("code",{children:"string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"confirmButtonText"})}),e.jsx("td",{children:"确认按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'确定'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelButtonText"})}),e.jsx("td",{children:"取消按钮文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"itemHeight"})}),e.jsx("td",{children:"选项高度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visibleItemCount"})}),e.jsx("td",{children:"可见选项个数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"Picker 默认"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"loading"})}),e.jsx("td",{children:"是否显示加载状态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"interactionMode"})}),e.jsx("td",{children:"交互同步策略"}),e.jsx("td",{children:e.jsx("code",{children:"'auto' | 'freeze' | 'sync'"})}),e.jsx("td",{children:e.jsx("code",{children:"'sync'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选项改变回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onConfirm"})}),e.jsx("td",{children:"点击确认回调"}),e.jsx("td",{children:e.jsx("code",{children:"(values: string[], options: AreaOption[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"arealist-格式","data-anchor":"arealist-格式",children:"AreaList 格式"}),e.jsx(s,{code:`interface AreaList {
  province_list?: Record<string, string>
  city_list?: Record<string, string>
  county_list?: Record<string, string>
}`,lang:"ts"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["省市区数据结构兼容 Vant 的 ",e.jsx("a",{href:"https://vant-contrib.gitee.io/vant/v3/#/zh-CN/area",children:"Area"})," 示例；若需要自定义异步加载，可先处理数据再传入组件。"]})})]})})},U=[{Component:B,key:"area-basic",sources:{_:{tsx:`import React from 'react'
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

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

`}},title:!0,identifier:"area-basic",lang:"tsx",meta:{title:!0}}],q={simulator:{compact:!0}},J=[{depth:1,text:"Area 省市区",id:"area-省市区"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:2,text:"API",id:"api"},{depth:3,text:"Area Props",id:"area-props"},{depth:3,text:"AreaList 格式",id:"arealist-格式"}],Q="/docs/components/area.md",X="Area 省市区",Y="1769570039000",Re=t=>t.children({MdContent:K,demos:U,frontmatter:q,slugs:J,filePath:Q,title:X,updatedTime:Y});export{K as MdContent,Re as default,U as demos,Q as filePath,q as frontmatter,J as slugs,X as title,Y as updatedTime};
