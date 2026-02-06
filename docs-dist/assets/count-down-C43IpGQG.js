import{r as n,i as $,R as b,b as W,j as e,V as H,a as O,s as q}from"./main-BuQiU471.js";import{c as G,T as D}from"./createComponentTokensHook-BZh_OSSd.js";import{f as J}from"./date-DjZXGQxL.js";import{B as A}from"./index-CvolElyI.js";import{S as P}from"./Space-BsyLL5rO.js";import"./createPlatformShadow-BbOkyb5V.js";import"./color-DLepBbWK.js";import"./number-DwcHNqSr.js";import"./useAriaPress-D5uAXibC.js";import"./index-CJrLMJTa.js";import"./index-BRfylSA6.js";import"./extends-CF3RwP-h.js";import"./index-CA-bMxjH.js";const R=t=>{const o=Math.max(t,0),r=Math.floor(o/(1440*60*1e3)),d=Math.floor(o%(1440*60*1e3)/(3600*1e3)),x=Math.floor(o%(3600*1e3)/(60*1e3)),h=Math.floor(o%(60*1e3)/1e3),f=o%1e3;return{total:o,days:r,hours:d,minutes:x,seconds:h,milliseconds:f}},K=t=>{const{time:o,millisecond:r=!1,onChange:d,onFinish:x}=t,h=n.useRef(o),f=n.useRef(r),w=n.useRef(d),E=n.useRef(x);h.current=o,f.current=r,w.current=d,E.current=x;const l=n.useRef(Math.max(0,o)),p=n.useRef(Date.now()+l.current),j=n.useRef(null),c=n.useRef(!1),[F,S]=n.useState(()=>R(l.current)),i=n.useCallback(()=>{j.current&&(clearTimeout(j.current),j.current=null)},[]),g=n.useCallback(s=>{l.current=s;const u=R(s);S(u),w.current?.(u),s===0&&(c.current=!1,i(),E.current?.())},[i]),a=n.useCallback(()=>{if(!c.current)return;i();const s=Math.max(p.current-Date.now(),0);if(g(s),s<=0)return;const u=f.current?Math.max(1,Math.min(30,s)):Math.max(1,Math.min(s,s%1e3+1));j.current=setTimeout(()=>{a()},u)},[i,g]),y=n.useCallback(()=>{c.current||l.current<=0||(c.current=!0,p.current=Date.now()+l.current,a())},[a]),m=n.useCallback(()=>{c.current&&(c.current=!1,l.current=Math.max(p.current-Date.now(),0),i())},[i]),v=n.useCallback(s=>{m();const u=Math.max(0,$(s)?s:h.current);l.current=u,p.current=Date.now()+u,S(R(u))},[m]);return n.useEffect(()=>()=>i(),[i]),{start:y,pause:m,reset:v,current:F}},Q=t=>{const{palette:o,fontSize:r,typography:d}=t,x=r.sm;return{defaults:{autoStart:!0,millisecond:!1,time:0,format:"HH:mm:ss"},layout:{text:{color:o.default[800],fontSize:x,lineHeight:20,fontFamily:d.fontFamily,fontWeight:d.weight.regular}}}},U=G("countDown",Q),X=(t,o)=>{const{tokensOverride:r,autoStart:d,millisecond:x,time:h,format:f,children:w,onChange:E,onFinish:l,style:p,...j}=t,c=U(r),F=d??c.defaults.autoStart,S=x??c.defaults.millisecond,i=h??c.defaults.time,g=f??c.defaults.format,a=Math.max(0,Number(i)||0),{start:y,pause:m,reset:v,current:s}=K({time:a,millisecond:S,onChange:E,onFinish:l}),u=n.useCallback(()=>{v(a),F&&a>0&&y()},[F,a,v,y]);n.useEffect(()=>(u(),()=>{m()}),[F,a,m,v,y]),n.useImperativeHandle(o,()=>({start:y,pause:m,reset:u}));const z=c.layout.text,T=W(w)?w(s):J(g,s),L=O(T)?e.jsx(D,{style:z,children:T}):T;return e.jsx(H,{style:p,...j,children:L})},k=b.forwardRef(X);k.displayName="CountDown";const B=b.memo(k),M=()=>e.jsx(B,{time:1800*60*1e3}),Y=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`,Z={code:Y,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},title:"基础用法",identifier:"count-down-basic",lang:"tsx",meta:{title:"基础用法"}},_=()=>e.jsx(B,{time:1800*60*1e3,format:"DD 天 HH 时 mm 分 ss 秒"}),ee=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`,te={code:ee,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},title:"自定义格式",identifier:"count-down-format",lang:"tsx",meta:{title:"自定义格式"}},I=()=>e.jsx(B,{time:1800*60*1e3,millisecond:!0,format:"HH:mm:ss:SS"}),ne=`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`,re={code:ne,sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},title:"毫秒级渲染",identifier:"count-down-millisecond",lang:"tsx",meta:{title:"毫秒级渲染"}},C=q.create({row:{flexDirection:"row",alignItems:"center"},block:{minWidth:28,paddingVertical:6,paddingHorizontal:6,borderRadius:6,backgroundColor:"#1989fa",color:"#ffffff",textAlign:"center"},colon:{marginHorizontal:4,color:"#1989fa"}}),N=()=>e.jsx(B,{time:1800*60*1e3,millisecond:!0,format:"HH:mm:ss:SS",children:t=>e.jsxs(H,{style:C.row,children:[e.jsx(D,{style:C.block,children:t.hours}),e.jsx(D,{style:C.colon,children:":"}),e.jsx(D,{style:C.block,children:t.minutes}),e.jsx(D,{style:C.colon,children:":"}),e.jsx(D,{style:C.block,children:t.seconds})]})}),oe=`import React from 'react'
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

`,se={code:oe,sources:{_:{tsx:`import React from 'react'
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

`}},title:"自定义样式",identifier:"count-down-custom-style",lang:"tsx",meta:{title:"自定义样式"}},V=()=>{const t=b.useRef(null);return e.jsxs(P,{direction:"vertical",gap:8,children:[e.jsx(B,{ref:t,autoStart:!1,time:60*1e3,format:"mm:ss"}),e.jsxs(P,{gap:8,children:[e.jsx(A,{text:"开始",onPress:()=>t.current?.start()}),e.jsx(A,{text:"暂停",onPress:()=>t.current?.pause()}),e.jsx(A,{text:"重置",onPress:()=>t.current?.reset()})]})]})},ce=`import React from 'react'
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
`,ue={code:ce,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"手动控制",identifier:"count-down-ref",lang:"tsx",meta:{title:"手动控制"}},ie=function({previewer:t=()=>null,api:o=()=>null}){const r=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"countdown-倒计时","data-anchor":"countdown-倒计时",children:"CountDown 倒计时"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于实时展示倒计时，支持毫秒渲染与受控启动/暂停。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { CountDown } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(r,{...Z,children:e.jsx(M,{})})}),e.jsx("h3",{id:"自定义格式","data-anchor":"自定义格式",children:"自定义格式"}),e.jsx("div",{children:e.jsx(r,{...te,children:e.jsx(_,{})})}),e.jsx("h3",{id:"毫秒级渲染","data-anchor":"毫秒级渲染",children:"毫秒级渲染"}),e.jsx("div",{children:e.jsx(r,{...re,children:e.jsx(I,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsx("div",{children:e.jsx(r,{...se,children:e.jsx(N,{})})}),e.jsx("h3",{id:"手动控制","data-anchor":"手动控制",children:"手动控制"}),e.jsx("div",{children:e.jsx(r,{...ue,children:e.jsx(V,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"time"})}),e.jsx("td",{children:"倒计时时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoStart"})}),e.jsx("td",{children:"是否自动开始"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"millisecond"})}),e.jsx("td",{children:"是否开启毫秒级渲染"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"format"})}),e.jsxs("td",{children:["展示格式（",e.jsx("code",{children:"DD HH mm ss S"})," 组合）"]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"HH:mm:ss"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"自定义渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(current) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"时间变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(current) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"倒计时结束回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"format-格式","data-anchor":"format-格式",children:"format 格式"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"格式"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"DD"})}),e.jsx("td",{children:"天数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"HH"})}),e.jsx("td",{children:"小时"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mm"})}),e.jsx("td",{children:"分钟"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ss"})}),e.jsx("td",{children:"秒数"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"S"})}),e.jsx("td",{children:"毫秒（1 位）"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SS"})}),e.jsx("td",{children:"毫秒（2 位）"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"SSS"})}),e.jsx("td",{children:"毫秒（3 位）"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"倒计时结束时触发"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"倒计时变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"current: CountDownCurrentTime"})})]})]})]}),e.jsx("h3",{id:"countdowncurrenttime-格式","data-anchor":"countdowncurrenttime-格式",children:"CountDownCurrentTime 格式"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"名称"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"total"})}),e.jsx("td",{children:"剩余总时间（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"days"})}),e.jsx("td",{children:"剩余天数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"hours"})}),e.jsx("td",{children:"剩余小时"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"minutes"})}),e.jsx("td",{children:"剩余分钟"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"seconds"})}),e.jsx("td",{children:"剩余秒数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"milliseconds"})}),e.jsx("td",{children:"剩余毫秒"}),e.jsx("td",{children:e.jsx("code",{children:"number"})})]})]})]}),e.jsx("h3",{id:"countdowninstance","data-anchor":"countdowninstance",children:"CountDownInstance"}),e.jsx("p",{children:"通过 ref 获取实例并操作倒计时："}),e.jsx(r,{code:`const ref = useRef<CountDownInstance>(null)
ref.current?.start()
ref.current?.pause()
ref.current?.reset()`,lang:"ts"}),e.jsx("h3",{id:"方法","data-anchor":"方法",children:"方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"参数"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"start"})}),e.jsx("td",{children:"开始倒计时"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"pause"})}),e.jsx("td",{children:"暂停倒计时"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"reset"})}),e.jsxs("td",{children:["重设倒计时（若 ",e.jsx("code",{children:"autoStart"})," 为 ",e.jsx("code",{children:"true"}),"，重设后会自动开始倒计时）"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"类型定义","data-anchor":"类型定义",children:"类型定义"}),e.jsx("p",{children:"组件导出以下类型定义："}),e.jsx(r,{code:"import type { CountDownInstance, CountDownCurrentTime } from 'react-native-system-ui'",lang:"ts"})]})})},de=[{Component:M,key:"count-down-basic",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} />
`}},title:"基础用法",identifier:"count-down-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:_,key:"count-down-format",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />

`}},title:"自定义格式",identifier:"count-down-format",lang:"tsx",meta:{title:"自定义格式"}},{Component:I,key:"count-down-millisecond",sources:{_:{tsx:`import React from 'react'
import { CountDown } from 'react-native-system-ui'

export default () => (
  <CountDown time={30 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"手动控制",identifier:"count-down-ref",lang:"tsx",meta:{title:"手动控制"}}],le={simulator:{compact:!1}},ae=[{depth:1,text:"CountDown 倒计时",id:"countdown-倒计时"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义格式",id:"自定义格式"},{depth:3,text:"毫秒级渲染",id:"毫秒级渲染"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"手动控制",id:"手动控制"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"format 格式",id:"format-格式"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CountDownCurrentTime 格式",id:"countdowncurrenttime-格式"},{depth:3,text:"CountDownInstance",id:"countdowninstance"},{depth:3,text:"方法",id:"方法"},{depth:3,text:"类型定义",id:"类型定义"}],xe="/docs/components/count-down.md",me="CountDown 倒计时",he="1765872729000",Te=t=>t.children({MdContent:ie,demos:de,frontmatter:le,slugs:ae,filePath:xe,title:me,updatedTime:he});export{ie as MdContent,Te as default,de as demos,xe as filePath,le as frontmatter,ae as slugs,me as title,he as updatedTime};
