import{s as j,R as h,r as s,j as e,V as x,a as Ae,d as _e}from"./main-CC2DK3OK.js";import{T as te}from"./index-CYc3exVx.js";import{c as Me,T as _}from"./createComponentTokensHook-BcXZOvON.js";import{p as ee}from"./number-BG570ZaL.js";import{u as Ne}from"./useControllableValue-BBYtc-A6.js";import{M as $e}from"./index-CN-rk8sC.js";import{T as Le}from"./index-CfGUJPQW.js";import"./Portal-D9I31KH1.js";import"./Loading-_9EKEhr2.js";import"./index-BnjI8SiS.js";import"./extends-CF3RwP-h.js";import"./Checked-BJm2Hkef.js";import"./IconBase-BNmvoXvm.js";import"./Close-BKbx2ovl.js";import"./index-BP7Blb5n.js";import"./index-CCOraIhd.js";import"./Animated-C-b5K9fC.js";import"./index-CJrLMJTa.js";import"./index-Cakcz3d2.js";import"./index-D_JlQYPg.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./useOverlayStack-xa377Hoz.js";import"./animation-BpxpeSKC.js";import"./useAriaPress-DVn62gIQ.js";const ze=t=>({colors:{border:t.palette.default[100],text:t.palette.default[900],muted:t.palette.default[500],error:t.palette.danger[500],cursor:t.palette.default[800],background:"#ffffff",transparent:"transparent"},radii:{wrapper:t.radii.sm,cellGutter:t.radii.none},sizing:{cellHeight:50,cellTextSize:t.fontSize.xl,maskSize:10,cursorWidth:j.hairlineWidth||1,cursorHeightRatio:.4,cursorTopRatio:.3},typography:{fontFamily:t.typography.fontFamily,cellTextWeight:t.typography.weight.semiBold,infoSize:t.fontSize.sm,infoLineHeight:Math.round(t.fontSize.sm*t.typography.lineHeightMultiplier),infoWeight:t.typography.weight.regular},opacity:{disabled:.6,hidden:0},spacing:{infoMarginTop:t.spacing.sm,none:t.spacing.none}}),We=Me("passwordInput",ze),Ge={caretHidden:!0,autoCorrect:!1,spellCheck:!1,importantForAutofill:"no",autoComplete:"off"},He=t=>t.replace(/[^0-9]/g,""),Oe=(t,a)=>{const{value:i,defaultValue:f,onChange:lt,length:ie=6,mask:I=!0,gutter:le=0,type:w="text",info:ce,errorInfo:M,autoFocus:F=!1,disabled:l=!1,showCursor:R=!0,validator:N,cellStyle:de,cellFilledStyle:he,cellTextStyle:pe,maskStyle:me,cursorStyle:xe,highlightTextStyle:fe,tokensOverride:je,style:ve,onSubmit:$,onFocus:L,onBlur:z,...ge}=t,u=Math.max(1,Math.floor(ee(ie,6)??6)),ye=We(je),{colors:o,radii:E,sizing:d,typography:W,opacity:G,spacing:H}=ye,v=s.useRef(null),[we,V]=s.useState(!0),m=s.useRef(null),[T,O]=s.useState(F),be=w==="number"?"number-pad":"default",Pe=w==="number"?"numeric":"text",[Ce="",K]=Ne(t,{defaultValue:""}),D=s.useCallback(n=>{let r=n==null?"":_e(n)?n:String(n);return w==="number"&&(r=He(r)),u>0&&r.length>u&&(r=r.slice(0,u)),r},[u,w]),c=D(Ce),B=s.useRef(N);B.current=N;const U=s.useRef(L);U.current=L;const q=s.useRef(z);q.current=z;const k=s.useRef($);k.current=$;const b=s.useCallback(n=>{const r=D(n);r!==c&&(B.current&&!B.current(r)||K(r))},[D,c,K]),A=s.useCallback(()=>{l||v.current?.focus()},[l]),J=s.useCallback(()=>{v.current?.blur()},[]),Q=s.useCallback(()=>{b("")},[b]);s.useImperativeHandle(a,()=>({focus:A,blur:J,clear:Q}),[J,Q,A]),s.useEffect(()=>{if(!F||l)return;const n=setTimeout(()=>{v.current?.focus()},60);return()=>clearTimeout(n)},[F,l]);const Se=s.useCallback(n=>{b(n??"")},[b]),Ie=s.useCallback(()=>{O(!0),U.current?.()},[]),Fe=s.useCallback(()=>{O(!1),q.current?.()},[]),X=s.useRef({value:c,length:u});s.useEffect(()=>{const n=X.current;X.current={value:c,length:u},k.current&&n.length===u&&(u<=0||c.length!==u||n.value!==c&&(k.current(c),v.current?.blur()))},[u,c]),s.useEffect(()=>{const n=R&&T&&!l;return m.current&&(clearInterval(m.current),m.current=null),n?(V(!0),m.current=setInterval(()=>{V(r=>!r)},500)):V(!1),()=>{m.current&&(clearInterval(m.current),m.current=null)}},[l,T,R]);const Re=Array.from({length:u},(n,r)=>{const S=c?.[r],g=!!S,ke=R&&T&&!l&&c.length===r&&r<u;return{key:r,char:S,isFilled:g,showBlink:ke}}),Y=Math.max(0,ee(le,0)??0),P=Y>0,C=M??ce,Ee=M?o.error:o.muted,Z=P?o.transparent:o.background,Ve={...Ge,underlineColorAndroid:o.transparent},Te={color:o.text,fontSize:d.cellTextSize,fontWeight:W.cellTextWeight,fontFamily:W.fontFamily},De=[p.wrapper,{backgroundColor:Z,borderRadius:E.wrapper,paddingHorizontal:H.none,opacity:l?G.disabled:1},!P&&{borderWidth:j.hairlineWidth,borderColor:o.border}],Be=[p.security,{borderRadius:P?0:E.wrapper,backgroundColor:Z}];return e.jsxs(x,{style:ve,children:[e.jsx($e,{...ge,style:De,onPress:A,disabled:l,accessibilityRole:"button",accessibilityState:{disabled:l},children:e.jsxs(x,{style:Be,children:[Re.map((n,r)=>{const S=[Te,pe,!I&&n.isFilled&&fe],g=[p.cell,{backgroundColor:o.background,height:d.cellHeight},de,n.isFilled&&he];return P?g.push(p.cellGutter,{borderColor:o.border,borderRadius:E.cellGutter},r>0&&{marginLeft:Y}):r<u-1&&g.push({borderRightWidth:j.hairlineWidth,borderRightColor:o.border}),e.jsxs(x,{style:g,children:[I?e.jsx(x,{style:[{width:d.maskSize,height:d.maskSize,borderRadius:d.maskSize/2,backgroundColor:o.text,opacity:n.isFilled?1:0},me]}):e.jsx(_,{style:S,numberOfLines:1,children:n.char??""}),n.showBlink?e.jsx(x,{testID:"password-input-cursor",style:[p.cursor,{width:d.cursorWidth,height:`${d.cursorHeightRatio*100}%`,borderRadius:d.cursorWidth/2,top:`${d.cursorTopRatio*100}%`,marginLeft:-d.cursorWidth/2,backgroundColor:o.cursor,opacity:we?1:0},xe]}):null]},n.key)}),e.jsx(Le,{ref:v,value:c,editable:!l,keyboardType:be,inputMode:Pe,maxLength:u,autoFocus:!1,secureTextEntry:I,...Ve,style:[p.hiddenInput,{opacity:G.hidden}],onChangeText:Se,onFocus:Ie,onBlur:Fe,accessible:!1})]})}),C?e.jsx(x,{style:[p.infoWrapper,{marginTop:H.infoMarginTop}],children:Ae(C)?e.jsx(_,{style:[p.infoText,{color:Ee}],children:C}):C}):null]})},ne=h.forwardRef(Oe);ne.displayName="PasswordInput";const y=h.memo(ne),p=j.create({wrapper:{alignSelf:"stretch"},security:{flexDirection:"row",alignItems:"center",position:"relative",overflow:"hidden"},cell:{flex:1,justifyContent:"center",alignItems:"center"},cellGutter:{borderWidth:j.hairlineWidth},cursor:{position:"absolute",left:"50%"},hiddenInput:{...j.absoluteFillObject},infoWrapper:{alignItems:"center"},infoText:{textAlign:"center"}});function se(){const[t,a]=h.useState(""),i=h.useCallback(f=>{te.show({message:`输入的密码：${f}`})},[]);return e.jsxs(x,{style:{gap:16},children:[e.jsx(_,{style:{color:"#646566"},children:"请输入 6 位数字密码"}),e.jsx(y,{value:t,onChange:a,type:"number",info:"输入完成后会自动触发 onSubmit",onSubmit:i})]})}const Ke=`import React from 'react'
import { View, Text } from 'react-native'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputBasicDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`输入的密码：\${val}\` })
  }, [])

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: '#646566' }}>请输入 6 位数字密码</Text>
      <PasswordInput
        value={value}
        onChange={setValue}
        type="number"
        info="输入完成后会自动触发 onSubmit"
        onSubmit={handleSubmit}
      />
    </View>
  )
}
`,Ue={code:Ke,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputBasicDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`输入的密码：\${val}\` })
  }, [])

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: '#646566' }}>请输入 6 位数字密码</Text>
      <PasswordInput
        value={value}
        onChange={setValue}
        type="number"
        info="输入完成后会自动触发 onSubmit"
        onSubmit={handleSubmit}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputBasicDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`输入的密码：\${val}\` })
  }, [])

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: '#646566' }}>请输入 6 位数字密码</Text>
      <PasswordInput
        value={value}
        onChange={setValue}
        type="number"
        info="输入完成后会自动触发 onSubmit"
        onSubmit={handleSubmit}
      />
    </View>
  )
}
`}},title:"基础用法",identifier:"password-input-basic",lang:"tsx",meta:{title:"基础用法"}};function re(){const[t,a]=h.useState("");return e.jsx(y,{length:4,value:t,onChange:a,info:"只允许输入 4 位"})}const qe=`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputLimitDemo() {
  const [value, setValue] = React.useState('')
  return (
    <PasswordInput
      length={4}
      value={value}
      onChange={setValue}
      info="只允许输入 4 位"
    />
  )
}
`,Je={code:qe,sources:{_:{tsx:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputLimitDemo() {
  const [value, setValue] = React.useState('')
  return (
    <PasswordInput
      length={4}
      value={value}
      onChange={setValue}
      info="只允许输入 4 位"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputLimitDemo() {
  const [value, setValue] = React.useState('')
  return (
    <PasswordInput
      length={4}
      value={value}
      onChange={setValue}
      info="只允许输入 4 位"
    />
  )
}
`}},title:"限制长度",identifier:"password-input-limit",lang:"tsx",meta:{title:"限制长度"}};function ue(){const[t,a]=h.useState("");return e.jsx(y,{value:t,onChange:a,gutter:12,length:6,info:"格子之间增加间距"})}const Qe=`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputGutterDemo() {
  const [value, setValue] = React.useState('')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      gutter={12}
      length={6}
      info="格子之间增加间距"
    />
  )
}
`,Xe={code:Qe,sources:{_:{tsx:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputGutterDemo() {
  const [value, setValue] = React.useState('')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      gutter={12}
      length={6}
      info="格子之间增加间距"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputGutterDemo() {
  const [value, setValue] = React.useState('')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      gutter={12}
      length={6}
      info="格子之间增加间距"
    />
  )
}
`}},title:"格子间距",identifier:"password-input-gutter",lang:"tsx",meta:{title:"格子间距"}};function ae(){const[t,a]=h.useState("123");return e.jsx(y,{value:t,onChange:a,mask:!1,highlightTextStyle:{color:"#1989fa"},info:"明文展示并高亮输入字符"})}const Ye=`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputPlainDemo() {
  const [value, setValue] = React.useState('123')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      mask={false}
      highlightTextStyle={{ color: '#1989fa' }}
      info="明文展示并高亮输入字符"
    />
  )
}
`,Ze={code:Ye,sources:{_:{tsx:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputPlainDemo() {
  const [value, setValue] = React.useState('123')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      mask={false}
      highlightTextStyle={{ color: '#1989fa' }}
      info="明文展示并高亮输入字符"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputPlainDemo() {
  const [value, setValue] = React.useState('123')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      mask={false}
      highlightTextStyle={{ color: '#1989fa' }}
      info="明文展示并高亮输入字符"
    />
  )
}
`}},title:"明文展示",identifier:"password-input-plain",lang:"tsx",meta:{title:"明文展示"}};function oe(){const[t,a]=h.useState(""),i=h.useCallback(f=>{te.show({message:`提交的值：${f}`})},[]);return e.jsx(y,{type:"number",value:t,onChange:a,validator:f=>/^[0-9]*$/.test(f),info:"只允许数字输入",onSubmit:i})}const et=`import React from 'react'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputNumberDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`提交的值：\${val}\` })
  }, [])

  return (
    <PasswordInput
      type="number"
      value={value}
      onChange={setValue}
      validator={val => /^[0-9]*$/.test(val)}
      info="只允许数字输入"
      onSubmit={handleSubmit}
    />
  )
}
`,tt={code:et,sources:{_:{tsx:`import React from 'react'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputNumberDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`提交的值：\${val}\` })
  }, [])

  return (
    <PasswordInput
      type="number"
      value={value}
      onChange={setValue}
      validator={val => /^[0-9]*$/.test(val)}
      info="只允许数字输入"
      onSubmit={handleSubmit}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputNumberDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`提交的值：\${val}\` })
  }, [])

  return (
    <PasswordInput
      type="number"
      value={value}
      onChange={setValue}
      validator={val => /^[0-9]*$/.test(val)}
      info="只允许数字输入"
      onSubmit={handleSubmit}
    />
  )
}
`}},title:"只允许数字",identifier:"password-input-number",lang:"tsx",meta:{title:"只允许数字"}},nt=function({previewer:t=()=>null,api:a=()=>null}){const i=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"passwordinput-密码输入框","data-anchor":"passwordinput-密码输入框",children:"PasswordInput 密码输入框"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"格子密码输入，常与 NumberKeyboard 联动，用于输入支付密码、验证码等定长口令。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(i,{code:"import { PasswordInput } from 'react-native-system-ui'",lang:"ts"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(i,{...Ue,children:e.jsx(se,{})})}),e.jsx("h3",{id:"限制长度","data-anchor":"限制长度",children:"限制长度"}),e.jsx("div",{children:e.jsx(i,{...Je,children:e.jsx(re,{})})}),e.jsx("h3",{id:"格子间距","data-anchor":"格子间距",children:"格子间距"}),e.jsx("div",{children:e.jsx(i,{...Xe,children:e.jsx(ue,{})})}),e.jsx("h3",{id:"明文展示","data-anchor":"明文展示",children:"明文展示"}),e.jsx("div",{children:e.jsx(i,{...Ze,children:e.jsx(ae,{})})}),e.jsx("h3",{id:"只允许数字","data-anchor":"只允许数字",children:"只允许数字"}),e.jsx("div",{children:e.jsx(i,{...tt,children:e.jsx(oe,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"length"})}),e.jsx("td",{children:"密码长度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"6"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"输入类型，决定键盘与校验规则"}),e.jsx("td",{children:e.jsx("code",{children:"'text' | 'number'"})}),e.jsx("td",{children:e.jsx("code",{children:"'text'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mask"})}),e.jsx("td",{children:"是否以圆点显示内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gutter"})}),e.jsx("td",{children:"单元格之间的间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoFocus"})}),e.jsx("td",{children:"是否自动聚焦"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"info"})}),e.jsx("td",{children:"底部提示信息"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"errorInfo"})}),e.jsxs("td",{children:["底部错误提示（优先级高于 ",e.jsx("code",{children:"info"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validator"})}),e.jsxs("td",{children:["自定义校验，返回 ",e.jsx("code",{children:"true"})," 才会更新值"]}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showCursor"})}),e.jsx("td",{children:"是否显示输入光标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cellStyle"})}),e.jsx("td",{children:"单个单元格样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cellFilledStyle"})}),e.jsx("td",{children:"单元格填充后的样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cellTextStyle"})}),e.jsx("td",{children:"非掩码模式下文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"highlightTextStyle"})}),e.jsx("td",{children:"明文且有值时的高亮样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maskStyle"})}),e.jsx("td",{children:"掩码视图样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cursorStyle"})}),e.jsx("td",{children:"光标样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"输入变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSubmit"})}),e.jsxs("td",{children:["输入长度满足 ",e.jsx("code",{children:"length"})," 后触发"]}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFocus"})}),e.jsx("td",{children:"聚焦时回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onBlur"})}),e.jsx("td",{children:"失焦时回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"ref","data-anchor":"ref",children:"Ref"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"ref"})," 可以调用下列方法："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"focus()"})}),e.jsx("td",{children:"聚焦隐藏输入框"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blur()"})}),e.jsx("td",{children:"取消聚焦"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clear()"})}),e.jsx("td",{children:"清空输入内容"})]})]})]})]})})},st=[{Component:se,key:"password-input-basic",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputBasicDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`输入的密码：\${val}\` })
  }, [])

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: '#646566' }}>请输入 6 位数字密码</Text>
      <PasswordInput
        value={value}
        onChange={setValue}
        type="number"
        info="输入完成后会自动触发 onSubmit"
        onSubmit={handleSubmit}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputBasicDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`输入的密码：\${val}\` })
  }, [])

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ color: '#646566' }}>请输入 6 位数字密码</Text>
      <PasswordInput
        value={value}
        onChange={setValue}
        type="number"
        info="输入完成后会自动触发 onSubmit"
        onSubmit={handleSubmit}
      />
    </View>
  )
}
`}},title:"基础用法",identifier:"password-input-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:re,key:"password-input-limit",sources:{_:{tsx:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputLimitDemo() {
  const [value, setValue] = React.useState('')
  return (
    <PasswordInput
      length={4}
      value={value}
      onChange={setValue}
      info="只允许输入 4 位"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputLimitDemo() {
  const [value, setValue] = React.useState('')
  return (
    <PasswordInput
      length={4}
      value={value}
      onChange={setValue}
      info="只允许输入 4 位"
    />
  )
}
`}},title:"限制长度",identifier:"password-input-limit",lang:"tsx",meta:{title:"限制长度"}},{Component:ue,key:"password-input-gutter",sources:{_:{tsx:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputGutterDemo() {
  const [value, setValue] = React.useState('')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      gutter={12}
      length={6}
      info="格子之间增加间距"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputGutterDemo() {
  const [value, setValue] = React.useState('')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      gutter={12}
      length={6}
      info="格子之间增加间距"
    />
  )
}
`}},title:"格子间距",identifier:"password-input-gutter",lang:"tsx",meta:{title:"格子间距"}},{Component:ae,key:"password-input-plain",sources:{_:{tsx:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputPlainDemo() {
  const [value, setValue] = React.useState('123')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      mask={false}
      highlightTextStyle={{ color: '#1989fa' }}
      info="明文展示并高亮输入字符"
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput } from 'react-native-system-ui'

export default function PasswordInputPlainDemo() {
  const [value, setValue] = React.useState('123')

  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      mask={false}
      highlightTextStyle={{ color: '#1989fa' }}
      info="明文展示并高亮输入字符"
    />
  )
}
`}},title:"明文展示",identifier:"password-input-plain",lang:"tsx",meta:{title:"明文展示"}},{Component:oe,key:"password-input-number",sources:{_:{tsx:`import React from 'react'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputNumberDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`提交的值：\${val}\` })
  }, [])

  return (
    <PasswordInput
      type="number"
      value={value}
      onChange={setValue}
      validator={val => /^[0-9]*$/.test(val)}
      info="只允许数字输入"
      onSubmit={handleSubmit}
    />
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { PasswordInput, Toast } from 'react-native-system-ui'

export default function PasswordInputNumberDemo() {
  const [value, setValue] = React.useState('')

  const handleSubmit = React.useCallback((val: string) => {
    Toast.show({ message: \`提交的值：\${val}\` })
  }, [])

  return (
    <PasswordInput
      type="number"
      value={value}
      onChange={setValue}
      validator={val => /^[0-9]*$/.test(val)}
      info="只允许数字输入"
      onSubmit={handleSubmit}
    />
  )
}
`}},title:"只允许数字",identifier:"password-input-number",lang:"tsx",meta:{title:"只允许数字"}}],rt={simulator:{compact:!0}},ut=[{depth:1,text:"PasswordInput 密码输入框",id:"passwordinput-密码输入框"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"限制长度",id:"限制长度"},{depth:3,text:"格子间距",id:"格子间距"},{depth:3,text:"明文展示",id:"明文展示"},{depth:3,text:"只允许数字",id:"只允许数字"},{depth:2,text:"API",id:"api"},{depth:3,text:"Ref",id:"ref"}],at="/docs/components/password-input.md",ot="PasswordInput 密码输入框",it="1766029030000",At=t=>t.children({MdContent:nt,demos:st,frontmatter:rt,slugs:ut,filePath:at,title:ot,updatedTime:it});export{nt as MdContent,At as default,st as demos,at as filePath,rt as frontmatter,ut as slugs,ot as title,it as updatedTime};
