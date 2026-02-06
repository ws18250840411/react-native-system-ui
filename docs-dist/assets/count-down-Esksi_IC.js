import{r as n,i as O,R as A,b as q,a as H,j as e,V as k,s as G}from"./main-CC2DK3OK.js";import{c as J,T as y}from"./createComponentTokensHook-BcXZOvON.js";import{f as K}from"./date-DjZXGQxL.js";import{B as T}from"./index-BfHwmVBQ.js";import{S as M}from"./Space-DBTvvarp.js";import"./createPlatformShadow-BbOkyb5V.js";import"./hairline-Bq3nniT3.js";import"./color-BplLcdBL.js";import"./number-BG570ZaL.js";import"./useAriaPress-DVn62gIQ.js";import"./index-CJrLMJTa.js";import"./index-CN-rk8sC.js";import"./extends-CF3RwP-h.js";import"./index-BnjI8SiS.js";const b=t=>{const s=Math.max(t,0),o=Math.floor(s/(1440*60*1e3)),l=Math.floor(s%(1440*60*1e3)/(3600*1e3)),m=Math.floor(s%(3600*1e3)/(60*1e3)),h=Math.floor(s%(60*1e3)/1e3),f=s%1e3;return{total:s,days:o,hours:l,minutes:m,seconds:h,milliseconds:f}},Q=t=>{const{time:s,millisecond:o=!1,onChange:l,onFinish:m}=t,h=n.useRef(s),f=n.useRef(o),w=n.useRef(l),S=n.useRef(m);h.current=s,f.current=o,w.current=l,S.current=m;const d=n.useRef(Math.max(0,s)),p=n.useRef(Date.now()+d.current),j=n.useRef(null),u=n.useRef(!1),[F,g]=n.useState(()=>b(d.current)),i=n.useCallback(()=>{j.current&&(clearTimeout(j.current),j.current=null)},[]),R=n.useCallback(r=>{d.current=r;const c=b(r);g(c),w.current?.(c),r===0&&(u.current=!1,i(),S.current?.())},[i]),a=n.useCallback(()=>{if(!u.current)return;i();const r=Math.max(p.current-Date.now(),0);if(R(r),r<=0)return;const c=f.current?Math.max(1,Math.min(30,r)):Math.max(1,Math.min(r,r%1e3+1));j.current=setTimeout(()=>{a()},c)},[i,R]),D=n.useCallback(()=>{u.current||d.current<=0||(u.current=!0,p.current=Date.now()+d.current,a())},[a]),x=n.useCallback(()=>{u.current&&(u.current=!1,d.current=Math.max(p.current-Date.now(),0),i())},[i]),B=n.useCallback(r=>{x();const c=Math.max(0,O(r)?r:h.current);d.current=c,p.current=Date.now()+c,g(b(c))},[x]);return n.useEffect(()=>()=>i(),[i]),{start:D,pause:x,reset:B,current:F}},U=t=>{const{palette:s,fontSize:o,typography:l}=t,m=o.sm;return{defaults:{autoStart:!0,millisecond:!1,time:0,format:"HH:mm:ss"},layout:{text:{color:s.default[800],fontSize:m,lineHeight:20,fontFamily:l.fontFamily,fontWeight:l.weight.regular}}}},X=J("countDown",U),Y=(t,s)=>{const{tokensOverride:o,autoStart:l,millisecond:m,time:h,format:f,children:w,onChange:S,onFinish:d,style:p,...j}=t,u=X(o),F=l??u.defaults.autoStart,g=m??u.defaults.millisecond,i=h??u.defaults.time,R=f??u.defaults.format,a=Math.max(0,Number(i)||0),{start:D,pause:x,reset:B,current:r}=Q({time:a,millisecond:g,onChange:S,onFinish:d}),c=n.useCallback(()=>{B(a),F&&a>0&&D()},[F,a,B,D]);n.useEffect(()=>(c(),()=>{x()}),[F,a,x,B,D]),n.useImperativeHandle(s,()=>({start:D,pause:x,reset:c}));const $=u.layout.text,v=q(w)?w(r):K(R,r),W=H(v)?e.jsx(y,{style:$,children:v}):v,P=H(v)?String(v):`${r.hours}h ${r.minutes}m ${r.seconds}s`;return e.jsx(k,{accessibilityRole:"timer",accessibilityLiveRegion:"polite",accessibilityLabel:P,accessibilityValue:{text:P},style:p,...j,children:W})},_=A.forwardRef(Y);_.displayName="CountDown";const E=A.memo(_);function I(){return e.jsx(E,{time:1800*60*1e3})}const Z=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownBasicDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
`,ee={code:Z,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownBasicDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownBasicDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
`}},title:"基础用法",identifier:"count-down-basic",lang:"tsx",meta:{title:"基础用法"}};function N(){return e.jsx(E,{time:1800*60*1e3,format:"DD 天 HH 时 mm 分 ss 秒"})}const te=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownFormatDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
}
`,ne={code:te,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownFormatDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownFormatDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
}
`}},title:"自定义格式",identifier:"count-down-format",lang:"tsx",meta:{title:"自定义格式"}};function V(){return e.jsx(E,{time:1800*60*1e3,millisecond:!0,format:"HH:mm:ss:SS"})}const re=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownMillisecondDemo() {
  return (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
  )
}
`,oe={code:re,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownMillisecondDemo() {
  return (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownMillisecondDemo() {
  return (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
  )
}
`}},title:"毫秒级渲染",identifier:"count-down-millisecond",lang:"tsx",meta:{title:"毫秒级渲染"}},C=G.create({row:{flexDirection:"row",alignItems:"center"},block:{minWidth:28,paddingVertical:6,paddingHorizontal:6,borderRadius:6,backgroundColor:"#1989fa",color:"#ffffff",textAlign:"center"},colon:{marginHorizontal:4,color:"#1989fa"}});function z(){return e.jsx(E,{time:1800*60*1e3,millisecond:!0,format:"HH:mm:ss:SS",children:t=>e.jsxs(k,{style:C.row,children:[e.jsx(y,{style:C.block,children:t.hours}),e.jsx(y,{style:C.colon,children:":"}),e.jsx(y,{style:C.block,children:t.minutes}),e.jsx(y,{style:C.colon,children:":"}),e.jsx(y,{style:C.block,children:t.seconds})]})})}const se=`import React from 'react'
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

export default function CountDownCustomStyleDemo() {
  return (
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
}

`,ue={code:se,sources:{_:{tsx:`import React from 'react'
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

export default function CountDownCustomStyleDemo() {
  return (
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
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

export default function CountDownCustomStyleDemo() {
  return (
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
}

`}},title:"自定义样式",identifier:"count-down-custom-style",lang:"tsx",meta:{title:"自定义样式"}};function L(){const t=A.useRef(null);return e.jsxs(M,{direction:"vertical",gap:8,children:[e.jsx(E,{ref:t,autoStart:!1,time:60*1e3,format:"mm:ss"}),e.jsxs(M,{gap:8,children:[e.jsx(T,{text:"开始",onPress:()=>t.current?.start()}),e.jsx(T,{text:"暂停",onPress:()=>t.current?.pause()}),e.jsx(T,{text:"重置",onPress:()=>t.current?.reset()})]})]})}const ce=`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default function CountDownRefDemo() {
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
`,ie={code:ce,sources:{_:{tsx:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default function CountDownRefDemo() {
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default function CountDownRefDemo() {
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
`}},title:"手动控制",identifier:"count-down-ref",lang:"tsx",meta:{title:"手动控制"}},le=function({previewer:t=()=>null,api:s=()=>null}){const o=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"countdown-倒计时","data-anchor":"countdown-倒计时",children:"CountDown 倒计时"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于实时展示倒计时，支持毫秒渲染与受控启动/暂停。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { CountDown } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(o,{...ee,children:e.jsx(I,{})})}),e.jsx("h3",{id:"自定义格式","data-anchor":"自定义格式",children:"自定义格式"}),e.jsx("div",{children:e.jsx(o,{...ne,children:e.jsx(N,{})})}),e.jsx("h3",{id:"毫秒级渲染","data-anchor":"毫秒级渲染",children:"毫秒级渲染"}),e.jsx("div",{children:e.jsx(o,{...oe,children:e.jsx(V,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsx("div",{children:e.jsx(o,{...ue,children:e.jsx(z,{})})}),e.jsx("h3",{id:"手动控制","data-anchor":"手动控制",children:"手动控制"}),e.jsx("div",{children:e.jsx(o,{...ie,children:e.jsx(L,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"time"})}),e.jsx("td",{children:"倒计时时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoStart"})}),e.jsx("td",{children:"是否自动开始"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"millisecond"})}),e.jsx("td",{children:"是否开启毫秒级渲染"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"format"})}),e.jsxs("td",{children:["展示格式（",e.jsx("code",{children:"DD HH mm ss S"})," 组合）"]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"HH:mm:ss"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"自定义渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(current) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"时间变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(current) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"倒计时结束回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"format-格式","data-anchor":"format-格式",children:"format 格式"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"格式"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DD"})}),e.jsx("td",{children:"天数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"HH"})}),e.jsx("td",{children:"小时"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mm"})}),e.jsx("td",{children:"分钟"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ss"})}),e.jsx("td",{children:"秒数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"S"})}),e.jsx("td",{children:"毫秒（1 位）"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SS"})}),e.jsx("td",{children:"毫秒（2 位）"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SSS"})}),e.jsx("td",{children:"毫秒（3 位）"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"倒计时结束时触发"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"倒计时变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"current: CountDownCurrentTime"})})]})]})]}),e.jsx("h3",{id:"countdowncurrenttime-格式","data-anchor":"countdowncurrenttime-格式",children:"CountDownCurrentTime 格式"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"名称"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"total"})}),e.jsx("td",{children:"剩余总时间（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"days"})}),e.jsx("td",{children:"剩余天数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"hours"})}),e.jsx("td",{children:"剩余小时"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minutes"})}),e.jsx("td",{children:"剩余分钟"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"seconds"})}),e.jsx("td",{children:"剩余秒数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"milliseconds"})}),e.jsx("td",{children:"剩余毫秒"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]})]})]}),e.jsx("h3",{id:"countdowninstance","data-anchor":"countdowninstance",children:"CountDownInstance"}),e.jsx("p",{children:"通过 ref 获取实例并操作倒计时："}),e.jsx(o,{code:`const ref = useRef<CountDownInstance>(null)
ref.current?.start()
ref.current?.pause()
ref.current?.reset()`,lang:"ts"}),e.jsx("h3",{id:"方法","data-anchor":"方法",children:"方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"start"})}),e.jsx("td",{children:"开始倒计时"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pause"})}),e.jsx("td",{children:"暂停倒计时"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"reset"})}),e.jsxs("td",{children:["重设倒计时（若 ",e.jsx("code",{children:"autoStart"})," 为 ",e.jsx("code",{children:"true"}),"，重设后会自动开始倒计时）"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("p",{children:"组件导出以下类型定义："}),e.jsx(o,{code:"import type { CountDownInstance, CountDownCurrentTime } from 'react-native-system-ui'",lang:"ts"})]})})},de=[{Component:I,key:"count-down-basic",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownBasicDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownBasicDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} />
}
`}},title:"基础用法",identifier:"count-down-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:N,key:"count-down-format",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownFormatDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownFormatDemo() {
  return <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
}
`}},title:"自定义格式",identifier:"count-down-format",lang:"tsx",meta:{title:"自定义格式"}},{Component:V,key:"count-down-millisecond",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownMillisecondDemo() {
  return (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default function CountDownMillisecondDemo() {
  return (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
  )
}
`}},title:"毫秒级渲染",identifier:"count-down-millisecond",lang:"tsx",meta:{title:"毫秒级渲染"}},{Component:z,key:"count-down-custom-style",sources:{_:{tsx:`import React from 'react'
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

export default function CountDownCustomStyleDemo() {
  return (
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
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

export default function CountDownCustomStyleDemo() {
  return (
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
}

`}},title:"自定义样式",identifier:"count-down-custom-style",lang:"tsx",meta:{title:"自定义样式"}},{Component:L,key:"count-down-ref",sources:{_:{tsx:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default function CountDownRefDemo() {
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, CountDown, Space, type CountDownInstance } from 'react-native-system-ui'

export default function CountDownRefDemo() {
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
`}},title:"手动控制",identifier:"count-down-ref",lang:"tsx",meta:{title:"手动控制"}}],ae={simulator:{compact:!1}},me=[{depth:1,text:"CountDown 倒计时",id:"countdown-倒计时"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义格式",id:"自定义格式"},{depth:3,text:"毫秒级渲染",id:"毫秒级渲染"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"手动控制",id:"手动控制"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"format 格式",id:"format-格式"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CountDownCurrentTime 格式",id:"countdowncurrenttime-格式"},{depth:3,text:"CountDownInstance",id:"countdowninstance"},{depth:3,text:"方法",id:"方法"},{depth:3,text:"类型定义",id:"类型定义"}],xe="/docs/components/count-down.md",he="CountDown 倒计时",fe="1765872729000",be=t=>t.children({MdContent:le,demos:de,frontmatter:ae,slugs:me,filePath:xe,title:he,updatedTime:fe});export{le as MdContent,be as default,de as demos,xe as filePath,ae as frontmatter,me as slugs,he as title,fe as updatedTime};
