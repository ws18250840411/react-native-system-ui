import{r as t,i as L,R as H,b as $,a as W,j as e,V as M,s as O}from"./main-O6KZrSH_.js";import{c as q,T as w}from"./createComponentTokensHook-KzOuLm4c.js";import{f as G}from"./date-DjZXGQxL.js";import{B as A}from"./index-DzU_0rvq.js";import{S as P}from"./Space-BUyxH04S.js";import"./color-cEGfwRja.js";import"./number-BcSDXImJ.js";import"./createPlatformShadow-BbOkyb5V.js";import"./index-CJrLMJTa.js";import"./useAriaPress-DMjZXFvR.js";import"./index-DvCZppP1.js";import"./extends-CF3RwP-h.js";import"./index-ANZ1PvOD.js";const R=n=>{const s=Math.max(n,0),r=Math.floor(s/(1440*60*1e3)),d=Math.floor(s%(1440*60*1e3)/(3600*1e3)),x=Math.floor(s%(3600*1e3)/(60*1e3)),h=Math.floor(s%(60*1e3)/1e3),f=s%1e3;return{total:s,days:r,hours:d,minutes:x,seconds:h,milliseconds:f}},J=n=>{const{time:s,millisecond:r=!1,onChange:d,onFinish:x}=n,h=t.useRef(s),f=t.useRef(r),p=t.useRef(d),S=t.useRef(x);h.current=s,f.current=r,p.current=d,S.current=x;const l=t.useRef(Math.max(0,s)),j=t.useRef(Date.now()+l.current),y=t.useRef(null),c=t.useRef(!1),[v,g]=t.useState(()=>R(l.current)),u=t.useCallback(()=>{y.current&&(clearTimeout(y.current),y.current=null)},[]),B=t.useCallback(o=>{l.current=o;const i=R(o);g(i),p.current?.(i),o===0&&(c.current=!1,u(),S.current?.())},[u]),a=t.useCallback(()=>{if(!c.current)return;u();const o=Math.max(j.current-Date.now(),0);if(B(o),o<=0)return;const i=f.current?Math.max(1,Math.min(30,o)):Math.max(1,Math.min(o,o%1e3+1));y.current=setTimeout(()=>{a()},i)},[u,B]),C=t.useCallback(()=>{c.current||l.current<=0||(c.current=!0,j.current=Date.now()+l.current,a())},[a]),m=t.useCallback(()=>{c.current&&(c.current=!1,l.current=Math.max(j.current-Date.now(),0),u())},[u]),E=t.useCallback(o=>{m();const i=Math.max(0,L(o)?o:h.current);l.current=i,j.current=Date.now()+i,g(R(i))},[m]);return t.useEffect(()=>()=>u(),[u]),{start:C,pause:m,reset:E,current:v}},K=n=>{const{palette:s,fontSize:r,typography:d}=n,x=r.sm;return{defaults:{autoStart:!0,millisecond:!1,time:0,format:"HH:mm:ss"},layout:{text:{color:s.default[800],fontSize:x,lineHeight:20,fontFamily:d.fontFamily,fontWeight:d.weight.regular}}}},Q=q("countDown",K),F=H.forwardRef((n,s)=>{const{tokensOverride:r,autoStart:d,millisecond:x,time:h,format:f,children:p,onChange:S,onFinish:l,style:j,...y}=n,c=Q(r),v=d??c.defaults.autoStart,g=x??c.defaults.millisecond,u=h??c.defaults.time,B=f??c.defaults.format,a=t.useMemo(()=>Math.max(0,Number(u)||0),[u]),{start:C,pause:m,reset:E,current:o}=J({time:a,millisecond:g,onChange:S,onFinish:l}),i=t.useCallback(()=>{E(a),v&&a>0&&C()},[v,a,E,C]);t.useEffect(()=>(i(),()=>{m()}),[v,a,m,E,C]),t.useImperativeHandle(s,()=>({start:C,pause:m,reset:i}));const b=c.layout.text,T=t.useMemo(()=>$(p)?p(o):G(B,o),[p,o,B]),z=t.useMemo(()=>W(T)?e.jsx(w,{style:b,children:T}):T,[T,b]);return e.jsx(M,{style:j,...y,children:z})});F.displayName="CountDown";const k=()=>e.jsx(F,{time:1800*60*1e3}),U=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`,X={code:U,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},title:"基础用法",identifier:"count-down-basic",lang:"tsx",meta:{title:"基础用法"}},_=()=>e.jsx(F,{time:1800*60*1e3,format:"DD 天 HH 时 mm 分 ss 秒"}),Y=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`,Z={code:Y,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},title:"自定义格式",identifier:"count-down-format",lang:"tsx",meta:{title:"自定义格式"}},I=()=>e.jsx(F,{time:1800*60*1e3,millisecond:!0,format:"HH:mm:ss:SS"}),ee=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`,te={code:ee,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},title:"毫秒级渲染",identifier:"count-down-millisecond",lang:"tsx",meta:{title:"毫秒级渲染"}},D=O.create({row:{flexDirection:"row",alignItems:"center"},block:{minWidth:28,paddingVertical:6,paddingHorizontal:6,borderRadius:6,backgroundColor:"#1989fa",color:"#ffffff",textAlign:"center"},colon:{marginHorizontal:4,color:"#1989fa"}}),N=()=>e.jsx(F,{time:1800*60*1e3,millisecond:!0,format:"HH:mm:ss:SS",children:n=>e.jsxs(M,{style:D.row,children:[e.jsx(w,{style:D.block,children:n.hours}),e.jsx(w,{style:D.colon,children:":"}),e.jsx(w,{style:D.block,children:n.minutes}),e.jsx(w,{style:D.colon,children:":"}),e.jsx(w,{style:D.block,children:n.seconds})]})}),ne=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CountDown } from 'react-native-system-ui'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#1989fa',
    color: '#ffffff',
    textAlign: 'center',
  },
  colon: {
    marginHorizontal: 4,
    color: '#1989fa',
  },
})

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS">
    {current => (
      <View style={styles.row}>
        <Text style={styles.block}>{current.hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.seconds}</Text>
      </View>
    )}
  </CountDown>
)

`,re={code:ne,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CountDown } from 'react-native-system-ui'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#1989fa',
    color: '#ffffff',
    textAlign: 'center',
  },
  colon: {
    marginHorizontal: 4,
    color: '#1989fa',
  },
})

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS">
    {current => (
      <View style={styles.row}>
        <Text style={styles.block}>{current.hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.seconds}</Text>
      </View>
    )}
  </CountDown>
)

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CountDown } from 'react-native-system-ui'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#1989fa',
    color: '#ffffff',
    textAlign: 'center',
  },
  colon: {
    marginHorizontal: 4,
    color: '#1989fa',
  },
})

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS">
    {current => (
      <View style={styles.row}>
        <Text style={styles.block}>{current.hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.seconds}</Text>
      </View>
    )}
  </CountDown>
)

`}},title:"自定义样式",identifier:"count-down-custom-style",lang:"tsx",meta:{title:"自定义样式"}},V=()=>{const n=H.useRef(null);return e.jsxs(P,{direction:"vertical",gap:8,children:[e.jsx(F,{ref:n,autoStart:!1,time:60*1e3,format:"mm:ss"}),e.jsxs(P,{gap:8,children:[e.jsx(A,{text:"开始",onPress:()=>n.current?.start()}),e.jsx(A,{text:"暂停",onPress:()=>n.current?.pause()}),e.jsx(A,{text:"重置",onPress:()=>n.current?.reset()})]})]})},oe=`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef<CountDownInstance>(null)

  return (
    <Space direction="vertical" gap={8}>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Space gap={8}>
        <Button text="开始" onPress={() => ref.current?.start()} />
        <Button text="暂停" onPress={() => ref.current?.pause()} />
        <Button text="重置" onPress={() => ref.current?.reset()} />
      </Space>
    </Space>
  )
}
`,se={code:oe,sources:{_:{tsx:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef<CountDownInstance>(null)

  return (
    <Space direction="vertical" gap={8}>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Space gap={8}>
        <Button text="开始" onPress={() => ref.current?.start()} />
        <Button text="暂停" onPress={() => ref.current?.pause()} />
        <Button text="重置" onPress={() => ref.current?.reset()} />
      </Space>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef<CountDownInstance>(null)

  return (
    <Space direction="vertical" gap={8}>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Space gap={8}>
        <Button text="开始" onPress={() => ref.current?.start()} />
        <Button text="暂停" onPress={() => ref.current?.pause()} />
        <Button text="重置" onPress={() => ref.current?.reset()} />
      </Space>
    </Space>
  )
}
`}},title:"手动控制",identifier:"count-down-ref",lang:"tsx",meta:{title:"手动控制"}},ce=function({previewer:n=()=>null,api:s=()=>null}){const r=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"countdown-倒计时","data-anchor":"countdown-倒计时",children:"CountDown 倒计时"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于实时展示倒计时，支持毫秒渲染与受控启动/暂停。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { CountDown } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(r,{...X,children:e.jsx(k,{})})}),e.jsx("h3",{id:"自定义格式","data-anchor":"自定义格式",children:"自定义格式"}),e.jsx("div",{children:e.jsx(r,{...Z,children:e.jsx(_,{})})}),e.jsx("h3",{id:"毫秒级渲染","data-anchor":"毫秒级渲染",children:"毫秒级渲染"}),e.jsx("div",{children:e.jsx(r,{...te,children:e.jsx(I,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsx("div",{children:e.jsx(r,{...re,children:e.jsx(N,{})})}),e.jsx("h3",{id:"手动控制","data-anchor":"手动控制",children:"手动控制"}),e.jsx("div",{children:e.jsx(r,{...se,children:e.jsx(V,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"time"})}),e.jsx("td",{children:"倒计时时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoStart"})}),e.jsx("td",{children:"是否自动开始"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"millisecond"})}),e.jsx("td",{children:"是否开启毫秒级渲染"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"format"})}),e.jsxs("td",{children:["展示格式（",e.jsx("code",{children:"DD HH mm ss S"})," 组合）"]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"HH:mm:ss"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"自定义渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(current) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"时间变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(current) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"倒计时结束回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"format-格式","data-anchor":"format-格式",children:"format 格式"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"格式"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DD"})}),e.jsx("td",{children:"天数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"HH"})}),e.jsx("td",{children:"小时"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mm"})}),e.jsx("td",{children:"分钟"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ss"})}),e.jsx("td",{children:"秒数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"S"})}),e.jsx("td",{children:"毫秒（1 位）"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SS"})}),e.jsx("td",{children:"毫秒（2 位）"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SSS"})}),e.jsx("td",{children:"毫秒（3 位）"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"倒计时结束时触发"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"倒计时变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"current: CountDownCurrentTime"})})]})]})]}),e.jsx("h3",{id:"countdowncurrenttime-格式","data-anchor":"countdowncurrenttime-格式",children:"CountDownCurrentTime 格式"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"名称"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"total"})}),e.jsx("td",{children:"剩余总时间（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"days"})}),e.jsx("td",{children:"剩余天数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"hours"})}),e.jsx("td",{children:"剩余小时"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minutes"})}),e.jsx("td",{children:"剩余分钟"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"seconds"})}),e.jsx("td",{children:"剩余秒数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"milliseconds"})}),e.jsx("td",{children:"剩余毫秒"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]})]})]}),e.jsx("h3",{id:"countdowninstance","data-anchor":"countdowninstance",children:"CountDownInstance"}),e.jsx("p",{children:"通过 ref 获取实例并操作倒计时："}),e.jsx(r,{code:`const ref = useRef<CountDownInstance>(null)
ref.current?.start()
ref.current?.pause()
ref.current?.reset()`,lang:"ts"}),e.jsx("h3",{id:"方法","data-anchor":"方法",children:"方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"start"})}),e.jsx("td",{children:"开始倒计时"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pause"})}),e.jsx("td",{children:"暂停倒计时"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"reset"})}),e.jsxs("td",{children:["重设倒计时（若 ",e.jsx("code",{children:"autoStart"})," 为 ",e.jsx("code",{children:"true"}),"，重设后会自动开始倒计时）"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("p",{children:"组件导出以下类型定义："}),e.jsx(r,{code:"import type { CountDownInstance, CountDownCurrentTime } from 'react-native-system-ui'",lang:"ts"})]})})},ue=[{Component:k,key:"count-down-basic",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},title:"基础用法",identifier:"count-down-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:_,key:"count-down-format",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},title:"自定义格式",identifier:"count-down-format",lang:"tsx",meta:{title:"自定义格式"}},{Component:I,key:"count-down-millisecond",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},title:"毫秒级渲染",identifier:"count-down-millisecond",lang:"tsx",meta:{title:"毫秒级渲染"}},{Component:N,key:"count-down-custom-style",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CountDown } from 'react-native-system-ui'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#1989fa',
    color: '#ffffff',
    textAlign: 'center',
  },
  colon: {
    marginHorizontal: 4,
    color: '#1989fa',
  },
})

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS">
    {current => (
      <View style={styles.row}>
        <Text style={styles.block}>{current.hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.seconds}</Text>
      </View>
    )}
  </CountDown>
)

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CountDown } from 'react-native-system-ui'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#1989fa',
    color: '#ffffff',
    textAlign: 'center',
  },
  colon: {
    marginHorizontal: 4,
    color: '#1989fa',
  },
})

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS">
    {current => (
      <View style={styles.row}>
        <Text style={styles.block}>{current.hours}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.minutes}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.block}>{current.seconds}</Text>
      </View>
    )}
  </CountDown>
)

`}},title:"自定义样式",identifier:"count-down-custom-style",lang:"tsx",meta:{title:"自定义样式"}},{Component:V,key:"count-down-ref",sources:{_:{tsx:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef<CountDownInstance>(null)

  return (
    <Space direction="vertical" gap={8}>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Space gap={8}>
        <Button text="开始" onPress={() => ref.current?.start()} />
        <Button text="暂停" onPress={() => ref.current?.pause()} />
        <Button text="重置" onPress={() => ref.current?.reset()} />
      </Space>
    </Space>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default () => {
  const ref = React.useRef<CountDownInstance>(null)

  return (
    <Space direction="vertical" gap={8}>
      <CountDown ref={ref} autoStart={false} time={60 * 1000} format="mm:ss" />
      <Space gap={8}>
        <Button text="开始" onPress={() => ref.current?.start()} />
        <Button text="暂停" onPress={() => ref.current?.pause()} />
        <Button text="重置" onPress={() => ref.current?.reset()} />
      </Space>
    </Space>
  )
}
`}},title:"手动控制",identifier:"count-down-ref",lang:"tsx",meta:{title:"手动控制"}}],ie={simulator:{compact:!1}},de=[{depth:1,text:"CountDown 倒计时",id:"countdown-倒计时"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义格式",id:"自定义格式"},{depth:3,text:"毫秒级渲染",id:"毫秒级渲染"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"手动控制",id:"手动控制"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"format 格式",id:"format-格式"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CountDownCurrentTime 格式",id:"countdowncurrenttime-格式"},{depth:3,text:"CountDownInstance",id:"countdowninstance"},{depth:3,text:"方法",id:"方法"},{depth:3,text:"类型定义",id:"类型定义"}],le="/docs/components/count-down.md",ae="CountDown 倒计时",xe="1765872729000",Se=n=>n.children({MdContent:ce,demos:ue,frontmatter:ie,slugs:de,filePath:le,title:ae,updatedTime:xe});export{ce as MdContent,Se as default,ue as demos,le as filePath,ie as frontmatter,de as slugs,ae as title,xe as updatedTime};
