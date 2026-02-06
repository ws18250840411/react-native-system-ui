import{s as j,R as p,r,j as e,V as x,a as Ve,d as Te}from"./main-BaO0UwhN.js";import{T as X}from"./index-c00oQYhR.js";import{c as De,T as _}from"./createComponentTokensHook-CsVvHGcO.js";import{p as Q}from"./number-C0AOJ3fJ.js";import{u as Be}from"./useControllableValue-CUaUrHTT.js";import{M as ke}from"./index-DvDeiqEs.js";import{T as Ae}from"./index-Dhk5q2AX.js";import"./Portal-vGIZ7r4p.js";import"./Overlay-Dg1pVwqB.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./Loading-DQ_FTosf.js";import"./index-B5BUYRhk.js";import"./Checked-B0wewlVb.js";import"./IconBase-elbJGmhV.js";import"./Close-CwI1Rg5N.js";import"./index-DUXwXCyb.js";import"./index-B-eg80hO.js";import"./Animated-B6RZ2J5i.js";import"./index-CQklZrC-.js";import"./index-DbTCD1vV.js";import"./SafeAreaView-CB0OnAI8.js";import"./useSafeAreaPadding-wXYTmIbN.js";import"./useOverlayStack-B46smszT.js";import"./animation-BpxpeSKC.js";import"./useAriaPress-vCycRA2r.js";const _e=t=>({colors:{border:t.palette.default[100],text:t.palette.default[900],muted:t.palette.default[500],error:t.palette.danger[500],cursor:t.palette.default[800],background:"#ffffff",transparent:"transparent"},radii:{wrapper:t.radii.sm,cellGutter:t.radii.none},sizing:{cellHeight:50,cellTextSize:t.fontSize.xl,maskSize:10,cursorWidth:j.hairlineWidth||1,cursorHeightRatio:.4,cursorTopRatio:.3},typography:{fontFamily:t.typography.fontFamily,cellTextWeight:t.typography.weight.semiBold,infoSize:t.fontSize.sm,infoLineHeight:Math.round(t.fontSize.sm*t.typography.lineHeightMultiplier),infoWeight:t.typography.weight.regular},opacity:{disabled:.6,hidden:0},spacing:{infoMarginTop:t.spacing.sm,none:t.spacing.none}}),Me=De("passwordInput",_e),Ne={caretHidden:!0,autoCorrect:!1,spellCheck:!1,importantForAutofill:"no",autoComplete:"off"},$e=t=>t.replace(/[^0-9]/g,""),y=p.forwardRef((t,a)=>{const{value:o,defaultValue:f,onChange:st,length:se=6,mask:I=!0,gutter:re=0,type:w="text",info:ue,errorInfo:M,autoFocus:F=!1,disabled:l=!1,showCursor:E=!0,validator:R,cellStyle:ae,cellFilledStyle:ie,cellTextStyle:oe,maskStyle:le,cursorStyle:ce,highlightTextStyle:de,tokensOverride:he,style:pe,onSubmit:V,onFocus:N,onBlur:$,...me}=t,u=Math.max(1,Math.floor(Q(se,6)??6)),xe=Me(he),{colors:i,radii:T,sizing:d,typography:L,opacity:z,spacing:W}=xe,v=r.useRef(null),[fe,D]=r.useState(!0),m=r.useRef(null),[B,G]=r.useState(F),je=w==="number"?"number-pad":"default",ve=w==="number"?"numeric":"text",[ge="",H]=Be(t,{defaultValue:""}),k=r.useCallback(n=>{let s=n==null?"":Te(n)?n:String(n);return w==="number"&&(s=$e(s)),u>0&&s.length>u&&(s=s.slice(0,u)),s},[u,w]),c=k(ge),b=r.useCallback(n=>{const s=k(n);s!==c&&(R&&!R(s)||H(s))},[k,c,H,R]),A=r.useCallback(()=>{l||v.current?.focus()},[l]),O=r.useCallback(()=>{v.current?.blur()},[]),K=r.useCallback(()=>{b("")},[b]);r.useImperativeHandle(a,()=>({focus:A,blur:O,clear:K}),[O,K,A]),r.useEffect(()=>{if(!F||l)return;const n=setTimeout(()=>{v.current?.focus()},60);return()=>clearTimeout(n)},[F,l]);const ye=r.useCallback(n=>{b(n??"")},[b]),we=r.useCallback(()=>{G(!0),N?.()},[N]),be=r.useCallback(()=>{G(!1),$?.()},[$]),U=r.useRef({value:c,length:u});r.useEffect(()=>{const n=U.current;U.current={value:c,length:u},V&&n.length===u&&(u<=0||c.length!==u||n.value!==c&&(V(c),v.current?.blur()))},[u,c,V]),r.useEffect(()=>{const n=E&&B&&!l;return m.current&&(clearInterval(m.current),m.current=null),n?(D(!0),m.current=setInterval(()=>{D(s=>!s)},500)):D(!1),()=>{m.current&&(clearInterval(m.current),m.current=null)}},[l,B,E]);const Pe=Array.from({length:u},(n,s)=>{const S=c?.[s],g=!!S,Re=E&&B&&!l&&c.length===s&&s<u;return{key:s,char:S,isFilled:g,showBlink:Re}}),q=Math.max(0,Q(re,0)??0),P=q>0,C=M??ue,Ce=M?i.error:i.muted,J=P?i.transparent:i.background,Se={...Ne,underlineColorAndroid:i.transparent},Ie={color:i.text,fontSize:d.cellTextSize,fontWeight:L.cellTextWeight,fontFamily:L.fontFamily},Fe=[h.wrapper,{backgroundColor:J,borderRadius:T.wrapper,paddingHorizontal:W.none,opacity:l?z.disabled:1},!P&&{borderWidth:j.hairlineWidth,borderColor:i.border}],Ee=[h.security,{borderRadius:P?0:T.wrapper,backgroundColor:J}];return e.jsxs(x,{style:pe,children:[e.jsx(ke,{...me,style:Fe,onPress:A,disabled:l,accessibilityRole:"button",accessibilityState:{disabled:l},children:e.jsxs(x,{style:Ee,children:[Pe.map((n,s)=>{const S=[Ie,oe,!I&&n.isFilled&&de],g=[h.cell,{backgroundColor:i.background,height:d.cellHeight},ae,n.isFilled&&ie];return P?g.push(h.cellGutter,{borderColor:i.border,borderRadius:T.cellGutter},s>0&&{marginLeft:q}):s<u-1&&g.push({borderRightWidth:j.hairlineWidth,borderRightColor:i.border}),e.jsxs(x,{style:g,children:[I?e.jsx(x,{style:[{width:d.maskSize,height:d.maskSize,borderRadius:d.maskSize/2,backgroundColor:i.text,opacity:n.isFilled?1:0},le]}):e.jsx(_,{style:S,numberOfLines:1,children:n.char??""}),n.showBlink?e.jsx(x,{testID:"password-input-cursor",style:[h.cursor,{width:d.cursorWidth,height:`${d.cursorHeightRatio*100}%`,borderRadius:d.cursorWidth/2,top:`${d.cursorTopRatio*100}%`,marginLeft:-d.cursorWidth/2,backgroundColor:i.cursor,opacity:fe?1:0},ce]}):null]},n.key)}),e.jsx(Ae,{ref:v,value:c,editable:!l,keyboardType:je,inputMode:ve,maxLength:u,autoFocus:!1,secureTextEntry:I,...Se,style:[h.hiddenInput,{opacity:z.hidden}],onChangeText:ye,onFocus:we,onBlur:be,accessible:!1})]})}),C?e.jsx(x,{style:[h.infoWrapper,{marginTop:W.infoMarginTop}],children:Ve(C)?e.jsx(_,{style:[h.infoText,{color:Ce}],children:C}):C}):null]})}),h=j.create({wrapper:{alignSelf:"stretch"},security:{flexDirection:"row",alignItems:"center",position:"relative",overflow:"hidden"},cell:{flex:1,justifyContent:"center",alignItems:"center"},cellGutter:{borderWidth:j.hairlineWidth},cursor:{position:"absolute",left:"50%"},hiddenInput:{...j.absoluteFillObject},infoWrapper:{alignItems:"center"},infoText:{textAlign:"center"}});function Y(){const[t,a]=p.useState(""),o=p.useCallback(f=>{X.show({message:`输入的密码：${f}`})},[]);return e.jsxs(x,{style:{gap:16},children:[e.jsx(_,{style:{color:"#646566"},children:"请输入 6 位数字密码"}),e.jsx(y,{value:t,onChange:a,type:"number",info:"输入完成后会自动触发 onSubmit",onSubmit:o})]})}const Le=`import React from 'react'
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
`,ze={code:Le,sources:{_:{tsx:`import React from 'react'
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
`}},title:"基础用法",identifier:"password-input-basic",lang:"tsx",meta:{title:"基础用法"}};function Z(){const[t,a]=p.useState("");return e.jsx(y,{length:4,value:t,onChange:a,info:"只允许输入 4 位"})}const We=`import React from 'react'

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
`,Ge={code:We,sources:{_:{tsx:`import React from 'react'

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
`}},title:"限制长度",identifier:"password-input-limit",lang:"tsx",meta:{title:"限制长度"}};function ee(){const[t,a]=p.useState("");return e.jsx(y,{value:t,onChange:a,gutter:12,length:6,info:"格子之间增加间距"})}const He=`import React from 'react'

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
`,Oe={code:He,sources:{_:{tsx:`import React from 'react'

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
`}},title:"格子间距",identifier:"password-input-gutter",lang:"tsx",meta:{title:"格子间距"}};function te(){const[t,a]=p.useState("123");return e.jsx(y,{value:t,onChange:a,mask:!1,highlightTextStyle:{color:"#1989fa"},info:"明文展示并高亮输入字符"})}const Ke=`import React from 'react'

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
`,Ue={code:Ke,sources:{_:{tsx:`import React from 'react'

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
`}},title:"明文展示",identifier:"password-input-plain",lang:"tsx",meta:{title:"明文展示"}};function ne(){const[t,a]=p.useState(""),o=p.useCallback(f=>{X.show({message:`提交的值：${f}`})},[]);return e.jsx(y,{type:"number",value:t,onChange:a,validator:f=>/^[0-9]*$/.test(f),info:"只允许数字输入",onSubmit:o})}const qe=`import React from 'react'

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
`,Je={code:qe,sources:{_:{tsx:`import React from 'react'

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
`}},title:"只允许数字",identifier:"password-input-number",lang:"tsx",meta:{title:"只允许数字"}},Qe=function({previewer:t=()=>null,api:a=()=>null}){const o=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"passwordinput-密码输入框","data-anchor":"passwordinput-密码输入框",children:"PasswordInput 密码输入框"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"格子密码输入，常与 NumberKeyboard 联动，用于输入支付密码、验证码等定长口令。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { PasswordInput } from 'react-native-system-ui'",lang:"ts"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(o,{...ze,children:e.jsx(Y,{})})}),e.jsx("h3",{id:"限制长度","data-anchor":"限制长度",children:"限制长度"}),e.jsx("div",{children:e.jsx(o,{...Ge,children:e.jsx(Z,{})})}),e.jsx("h3",{id:"格子间距","data-anchor":"格子间距",children:"格子间距"}),e.jsx("div",{children:e.jsx(o,{...Oe,children:e.jsx(ee,{})})}),e.jsx("h3",{id:"明文展示","data-anchor":"明文展示",children:"明文展示"}),e.jsx("div",{children:e.jsx(o,{...Ue,children:e.jsx(te,{})})}),e.jsx("h3",{id:"只允许数字","data-anchor":"只允许数字",children:"只允许数字"}),e.jsx("div",{children:e.jsx(o,{...Je,children:e.jsx(ne,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"length"})}),e.jsx("td",{children:"密码长度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"6"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"输入类型，决定键盘与校验规则"}),e.jsx("td",{children:e.jsx("code",{children:"'text' | 'number'"})}),e.jsx("td",{children:e.jsx("code",{children:"'text'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mask"})}),e.jsx("td",{children:"是否以圆点显示内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gutter"})}),e.jsx("td",{children:"单元格之间的间距"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoFocus"})}),e.jsx("td",{children:"是否自动聚焦"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"info"})}),e.jsx("td",{children:"底部提示信息"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"errorInfo"})}),e.jsxs("td",{children:["底部错误提示（优先级高于 ",e.jsx("code",{children:"info"}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validator"})}),e.jsxs("td",{children:["自定义校验，返回 ",e.jsx("code",{children:"true"})," 才会更新值"]}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showCursor"})}),e.jsx("td",{children:"是否显示输入光标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cellStyle"})}),e.jsx("td",{children:"单个单元格样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cellFilledStyle"})}),e.jsx("td",{children:"单元格填充后的样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cellTextStyle"})}),e.jsx("td",{children:"非掩码模式下文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"highlightTextStyle"})}),e.jsx("td",{children:"明文且有值时的高亮样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maskStyle"})}),e.jsx("td",{children:"掩码视图样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cursorStyle"})}),e.jsx("td",{children:"光标样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"输入变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSubmit"})}),e.jsxs("td",{children:["输入长度满足 ",e.jsx("code",{children:"length"})," 后触发"]}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFocus"})}),e.jsx("td",{children:"聚焦时回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onBlur"})}),e.jsx("td",{children:"失焦时回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"ref","data-anchor":"ref",children:"Ref"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"ref"})," 可以调用下列方法："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"focus()"})}),e.jsx("td",{children:"聚焦隐藏输入框"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blur()"})}),e.jsx("td",{children:"取消聚焦"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clear()"})}),e.jsx("td",{children:"清空输入内容"})]})]})]})]})})},Xe=[{Component:Y,key:"password-input-basic",sources:{_:{tsx:`import React from 'react'
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
`}},title:"基础用法",identifier:"password-input-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:Z,key:"password-input-limit",sources:{_:{tsx:`import React from 'react'

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
`}},title:"限制长度",identifier:"password-input-limit",lang:"tsx",meta:{title:"限制长度"}},{Component:ee,key:"password-input-gutter",sources:{_:{tsx:`import React from 'react'

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
`}},title:"格子间距",identifier:"password-input-gutter",lang:"tsx",meta:{title:"格子间距"}},{Component:te,key:"password-input-plain",sources:{_:{tsx:`import React from 'react'

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
`}},title:"明文展示",identifier:"password-input-plain",lang:"tsx",meta:{title:"明文展示"}},{Component:ne,key:"password-input-number",sources:{_:{tsx:`import React from 'react'

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
`}},title:"只允许数字",identifier:"password-input-number",lang:"tsx",meta:{title:"只允许数字"}}],Ye={simulator:{compact:!0}},Ze=[{depth:1,text:"PasswordInput 密码输入框",id:"passwordinput-密码输入框"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"限制长度",id:"限制长度"},{depth:3,text:"格子间距",id:"格子间距"},{depth:3,text:"明文展示",id:"明文展示"},{depth:3,text:"只允许数字",id:"只允许数字"},{depth:2,text:"API",id:"api"},{depth:3,text:"Ref",id:"ref"}],et="/docs/components/password-input.md",tt="PasswordInput 密码输入框",nt="1766029030000",Vt=t=>t.children({MdContent:Qe,demos:Xe,frontmatter:Ye,slugs:Ze,filePath:et,title:tt,updatedTime:nt});export{Qe as MdContent,Vt as default,Xe as demos,et as filePath,Ye as frontmatter,Ze as slugs,tt as title,nt as updatedTime};
