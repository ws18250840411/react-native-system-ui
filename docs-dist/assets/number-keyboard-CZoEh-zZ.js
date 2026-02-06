import{R as w,r,j as e,V as y,s as Je}from"./main-CC2DK3OK.js";import{C}from"./index-Dueh9AzQ.js";import{c as Qe}from"./createPlatformShadow-BbOkyb5V.js";import{p as et}from"./number-BG570ZaL.js";import{L as tt}from"./Loading-_9EKEhr2.js";import{P as nt}from"./Portal-D9I31KH1.js";import{c as ot,T as H}from"./createComponentTokensHook-BcXZOvON.js";import{u as st}from"./useControllableValue-BBYtc-A6.js";import{M as Pe}from"./index-CN-rk8sC.js";import{A as le,E as z}from"./Animated-C-b5K9fC.js";import{S as rt}from"./SafeAreaView-CgItGtgs.js";import{n as lt}from"./animation-BpxpeSKC.js";import{T as Re}from"./index-CYc3exVx.js";import{F as it}from"./Field-DkY6Dtkh.js";import"./Arrow-CP2eQgBg.js";import"./IconBase-BNmvoXvm.js";import"./hairline-Bq3nniT3.js";import"./useAriaPress-DVn62gIQ.js";import"./index-CJrLMJTa.js";import"./index-BnjI8SiS.js";import"./extends-CF3RwP-h.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./index-D_JlQYPg.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./Checked-BJm2Hkef.js";import"./Close-BKbx2ovl.js";import"./index-BP7Blb5n.js";import"./useOverlayStack-xa377Hoz.js";import"./index-D03jSN7d.js";import"./useLocale-B4lUqsPR.js";import"./promise-DzoogS-n.js";import"./index-BfHwmVBQ.js";import"./color-BplLcdBL.js";import"./Popup-G3cXoDWN.js";import"./index-CfGUJPQW.js";const ut=l=>{const{palette:t,spacing:o,radii:d,fontSize:b}=l,a=t.primary.foreground??"#ffffff";return{colors:{background:t.default[100],title:t.default[700],keyBackground:"#ffffff",keyActiveBackground:t.default[50],keyText:t.default[900],keyTextActive:t.primary[600],closeBackground:t.primary[500],closeActiveBackground:t.primary[400],closeText:a,border:t.default[200]},spacing:{paddingHorizontal:o.ssm,paddingVertical:o.ssm,keyGap:o.ssm,titlePadding:o.md},sizing:{keyHeight:54,closeHeight:44,fontSize:28,titleFontSize:b.md},radii:{key:d.xs},shadow:{color:"#000000",opacity:.08,radius:6,offsetY:0,elevation:6}}},at=ot("numberKeyboard",ut),_=new Set,we=["1","2","3","4","5","6","7","8","9"],O="0",ct=l=>{const t=[...l];for(let o=t.length-1;o>0;o-=1){const d=Math.floor(Math.random()*(o+1));[t[o],t[d]]=[t[d],t[o]]}return t},g=w.memo(l=>{const{visible:t,title:o,tokensOverride:d,theme:b="default",extraKey:a,randomKeyOrder:V,showDeleteKey:I=!0,closeButtonText:$,deleteButtonText:ie,closeButtonLoading:W,onChange:Bt,onInput:ue,onDelete:ae,onClose:ce,onBlur:de,onHide:me,onShow:xe,value:Kt,defaultValue:kt,maxlength:Me,blurOnClose:pe=!0,safeAreaInsetBottom:ve=!0,transition:Ge=!0,transitionDuration:ze=300,numberKeyRender:X,deleteRender:ye,extraKeyRender:S,style:_e,...Oe}=l,He=at(d),{colors:i,radii:be,shadow:F,sizing:h,spacing:c}=He,[$e,Y]=st(l,{defaultValue:"",valuePropName:"value",defaultValuePropName:"defaultValue",trigger:"onChange"}),he=$e??"",L=et(Me,void 0),fe=L!==void 0&&Number.isFinite(L)&&L>=0?Math.floor(L):void 0,q=r.useRef(he),je=r.useRef(fe);q.current=he,je.current=fe;const T=b==="custom",K=T?$??"完成":$,Ce=r.useRef(ce);Ce.current=ce;const ge=r.useRef(de);ge.current=de;const De=r.useRef(xe);De.current=xe;const Be=r.useRef(me);Be.current=me;const Ke=r.useRef(ae);Ke.current=ae;const ke=r.useRef(ue);ke.current=ue;const j=r.useCallback(()=>{Ce.current?.(),pe&&ge.current?.()},[pe]),U=r.useRef(t);r.useEffect(()=>{t&&!U.current&&De.current?.(),!t&&U.current&&Be.current?.(),U.current=t},[t]),r.useEffect(()=>(t?(_.add(j),_.forEach(n=>{n!==j&&n()})):_.delete(j),()=>{_.delete(j)}),[t,j]);const Ne=r.useMemo(()=>{const s=(V&&t?ct(we):we).map(x=>({text:x,type:""}));if(T){const x=Array.isArray(a)?a:a?[a]:[];return x.length===1?s.push({text:O,type:"",wider:!0},{text:x[0],type:"extra"}):x.length>=2?s.push({text:x[0],type:"extra"},{text:O,type:""},{text:x[1],type:"extra"}):s.push({text:O,type:""}),s}const D=Array.isArray(a)?a[0]??"":a??"";return s.push({text:D,type:"extra"}),s.push({text:O,type:""}),s.push({type:I?"delete":"",text:I?void 0:""}),s},[a,T,V,I,t]),Ee=r.useCallback((n,m)=>{if(m==="delete"){const x=q.current;if(!x)return;Ke.current?.(),Y(x.slice(0,-1));return}if(m==="close"||m==="extra"&&!n){j();return}if(!n)return;const s=q.current,D=je.current;D!==void 0&&s.length>=D||(ke.current?.(n),Y(`${s}${n}`))},[j,Y]),We=r.useMemo(()=>Qe(F),[F.color,F.elevation,F.offsetY,F.opacity,F.radius]),R=r.useCallback((n,m,s=!1,D=!1,x)=>{const f=n.type===""&&!n.text,p=f||s&&W,G=p?void 0:()=>Ee(n.text,n.type),ne=s?i.closeBackground:i.keyBackground,A=s?i.closeActiveBackground:i.keyActiveBackground,P=s?i.closeText:i.keyText,oe=s?i.closeText:i.keyTextActive,se=x??(s?h.closeHeight:h.keyHeight),re=Math.round(h.fontSize*.64),Te=n.type==="close"||n.type==="extra"||n.type==="delete"?re:h.fontSize,k=n.text??"",N=n.type==="delete"?ye?.()??ie??"⌫":n.type==="extra"?S?S(k):k||"⌨︎":n.type==="close"?K??"完成":X?X(k):k;return e.jsx(Pe,{onPress:G,disabled:p,style:[{opacity:f?1:p?.6:1},D?{width:"100%",flexBasis:"auto",flexGrow:0,alignSelf:"stretch"}:{flexBasis:0,flexGrow:n.wider?2:1,flexShrink:1,minWidth:0}],accessible:!f,accessibilityRole:f?void 0:"button",accessibilityLabel:f?void 0:n.type==="delete"?"delete":n.type==="close"?K??"close":n.type==="extra"?k||"collapse":k,accessibilityState:f?void 0:{disabled:!!p},accessibilityElementsHidden:f,importantForAccessibility:f?"no-hide-descendants":void 0,children:({pressed:u})=>{const B=u&&!p,E=p?i.keyBackground:B?A:ne,Ae=B?oe:P;return e.jsx(y,{style:[v.key,{height:se,backgroundColor:E,borderRadius:be.key}],children:s&&W?e.jsx(tt,{size:18,color:Ae}):typeof N=="string"||typeof N=="number"?e.jsx(H,{style:[v.keyText,{color:Ae,fontSize:Te}],children:N}):N==null||N===!1?null:N})}},`${n.type}-${m}-${n.text??m}`)},[W,i.closeActiveBackground,i.closeBackground,i.closeText,i.keyActiveBackground,i.keyBackground,i.keyText,i.keyTextActive,ie,ye,S,Ee,X,be.key,h.closeHeight,h.fontSize,h.keyHeight,K]),Z=r.useRef(new le.Value(t?1:0)).current,M=r.useRef(null),J=r.useRef(0),[Xe,Ye]=r.useState(0),[qe,Ve]=r.useState(t),Fe=Ge===!1?0:ze;r.useEffect(()=>{J.current+=1;const n=J.current;t&&Ve(!0),M.current?.stop();const m=le.timing(Z,{toValue:t?1:0,duration:Fe,useNativeDriver:lt,easing:t?z.out(z.cubic):z.in(z.cubic)});return M.current=m,m.start(({finished:s})=>{s&&!t&&J.current===n&&Ve(!1)}),()=>{M.current?.stop(),M.current=null}},[Z,t,Fe]);const Ue=Z.interpolate({inputRange:[0,1],outputRange:[Xe||320,0]}),Ze=r.useCallback(n=>{const{height:m}=n.nativeEvent.layout;Ye(s=>Math.abs(m-s)>.5?m:s)},[]),Q=!T&&(o||$),ee=h.keyHeight*2+c.keyGap,te=r.useMemo(()=>{const n={paddingHorizontal:c.titlePadding},m=[v.defaultRow,{flexDirection:"column",flexWrap:"nowrap",paddingHorizontal:c.paddingHorizontal,paddingTop:c.keyGap,paddingBottom:c.keyGap,gap:c.keyGap}],s={flexDirection:"row",gap:c.keyGap},D=[v.customRow,{paddingHorizontal:c.paddingHorizontal,paddingTop:Q?0:c.keyGap,paddingBottom:c.keyGap,width:"100%"}],x=[v.customMain,{flexDirection:"column",flexWrap:"nowrap",gap:c.keyGap}],f=[v.customSidebar,{gap:c.keyGap,marginLeft:c.keyGap}],p=Ne.map((u,B)=>({key:u,index:B})),G=[];for(let u=0;u<p.length;u+=3)G.push(p.slice(u,u+3));const ne=e.jsx(y,{style:m,children:G.map((u,B)=>e.jsx(y,{style:s,children:u.map(E=>R(E.key,E.index))},`l-${B}`))}),A=[];for(let u=0;u<9&&u<p.length;u+=3)A.push(p.slice(u,u+3));const P=p.slice(9);P.length===1?A.push([{key:{type:""},index:1000001},P[0],{key:{type:""},index:1000002}]):P.length&&A.push(P);const oe=e.jsx(y,{style:x,children:A.map((u,B)=>e.jsx(y,{style:s,children:u.map(E=>R(E.key,E.index))},`cl-${B}`))}),se=I?R({type:"delete"},999,!1,!0,ee):null,re=R({type:"close"},1e3,!0,!0,ee);return{headerNode:Q?e.jsxs(y,{style:[v.header,n],children:[e.jsx(H,{style:[v.title,v.titleOverlay,{color:i.title,fontSize:h.titleFontSize}],numberOfLines:1,children:o}),K?e.jsx(Pe,{onPress:j,style:v.headerClose,accessibilityRole:"button",accessibilityLabel:K,children:e.jsx(H,{style:{color:i.title},children:K})}):null]}):null,bodyNode:T?e.jsxs(y,{style:D,children:[oe,e.jsxs(y,{style:f,children:[se,re]})]}):ne,safeAreaNode:ve&&e.jsx(rt,{edge:"bottom"})}},[j,i.title,ee,S,Q,T,Ne,R,K,ve,h.titleFontSize,c.keyGap,c.paddingHorizontal,c.titlePadding,o]);return!qe&&!t?null:e.jsx(nt,{children:e.jsxs(le.View,{...Oe,pointerEvents:t?"auto":"none",onLayout:Ze,style:[v.wrapper,We,_e,{transform:[{translateY:Ue}],backgroundColor:i.background}],children:[te.headerNode,te.bodyNode,te.safeAreaNode]})})}),v=Je.create({wrapper:{position:"absolute",left:0,right:0,bottom:0},header:{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",height:44,position:"relative"},title:{fontWeight:"600"},titleOverlay:{position:"absolute",left:12,right:12,textAlign:"center"},headerClose:{minWidth:56,alignItems:"flex-end"},key:{justifyContent:"center",alignItems:"center"},keyText:{includeFontPadding:!1,textAlign:"center"},defaultRow:{flexDirection:"row",flexWrap:"wrap"},customRow:{flexDirection:"row"},customMain:{flex:3,flexDirection:"row",flexWrap:"wrap"},customSidebar:{flex:1,flexDirection:"column",justifyContent:"flex-start"}});g.displayName="NumberKeyboard";function Ie(){const[l,t]=w.useState(null),o=V=>t(V),d=()=>t(null),b=V=>Re.info({message:`输入 ${V}`,duration:800}),a=()=>Re.info({message:"删除",duration:800});return e.jsxs(y,{style:{gap:12},children:[e.jsxs(C.Group,{children:[e.jsx(C,{title:"弹出默认键盘",isLink:!0,onPress:()=>o("v1")}),e.jsx(C,{title:"弹出带右侧栏的键盘",isLink:!0,onPress:()=>o("v2")}),e.jsx(C,{title:"弹出身份证号键盘",isLink:!0,onPress:()=>o("v3")}),e.jsx(C,{title:"弹出带标题的键盘",isLink:!0,onPress:()=>o("v4")}),e.jsx(C,{title:"弹出配置多个按键的键盘",isLink:!0,onPress:()=>o("v5")}),e.jsx(C,{title:"弹出配置随机数字的键盘",isLink:!0,onPress:()=>o("v6")})]}),e.jsx(g,{visible:l==="v1",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{theme:"custom",extraKey:".",closeButtonText:"完成",visible:l==="v2",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{extraKey:"X",closeButtonText:"完成",visible:l==="v3",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{title:"键盘标题",extraKey:".",closeButtonText:"完成",visible:l==="v4",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{theme:"custom",extraKey:["00","."],closeButtonText:"完成",visible:l==="v5",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{randomKeyOrder:!0,visible:l==="v6",onBlur:d,onInput:b,onDelete:a})]})}const dt=`import React from 'react'
import { View } from 'react-native'
import { Cell, NumberKeyboard, Toast } from 'react-native-system-ui'

type DemoKey = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null

export default function NumberKeyboardBasicDemo() {
  const [active, setActive] = React.useState<DemoKey>(null)

  const open = (key: Exclude<DemoKey, null>) => setActive(key)
  const close = () => setActive(null)

  const onInput = (val: string) => Toast.info({ message: \`输入 \${val}\`, duration: 800 })
  const onDelete = () => Toast.info({ message: '删除', duration: 800 })

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="弹出默认键盘" isLink onPress={() => open('v1')} />
        <Cell title="弹出带右侧栏的键盘" isLink onPress={() => open('v2')} />
        <Cell title="弹出身份证号键盘" isLink onPress={() => open('v3')} />
        <Cell title="弹出带标题的键盘" isLink onPress={() => open('v4')} />
        <Cell title="弹出配置多个按键的键盘" isLink onPress={() => open('v5')} />
        <Cell title="弹出配置随机数字的键盘" isLink onPress={() => open('v6')} />
      </Cell.Group>

      {/* 弹出默认键盘 */}
      <NumberKeyboard
        visible={active === 'v1'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带右侧栏的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v2'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出身份证号键盘 */}
      <NumberKeyboard
        extraKey="X"
        closeButtonText="完成"
        visible={active === 'v3'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带标题的键盘 */}
      <NumberKeyboard
        title="键盘标题"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v4'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置多个按键的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey={['00', '.']}
        closeButtonText="完成"
        visible={active === 'v5'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置随机数字的键盘 */}
      <NumberKeyboard
        randomKeyOrder
        visible={active === 'v6'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
    </View>
  )
}
`,mt={code:dt,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { Cell, NumberKeyboard, Toast } from 'react-native-system-ui'

type DemoKey = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null

export default function NumberKeyboardBasicDemo() {
  const [active, setActive] = React.useState<DemoKey>(null)

  const open = (key: Exclude<DemoKey, null>) => setActive(key)
  const close = () => setActive(null)

  const onInput = (val: string) => Toast.info({ message: \`输入 \${val}\`, duration: 800 })
  const onDelete = () => Toast.info({ message: '删除', duration: 800 })

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="弹出默认键盘" isLink onPress={() => open('v1')} />
        <Cell title="弹出带右侧栏的键盘" isLink onPress={() => open('v2')} />
        <Cell title="弹出身份证号键盘" isLink onPress={() => open('v3')} />
        <Cell title="弹出带标题的键盘" isLink onPress={() => open('v4')} />
        <Cell title="弹出配置多个按键的键盘" isLink onPress={() => open('v5')} />
        <Cell title="弹出配置随机数字的键盘" isLink onPress={() => open('v6')} />
      </Cell.Group>

      {/* 弹出默认键盘 */}
      <NumberKeyboard
        visible={active === 'v1'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带右侧栏的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v2'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出身份证号键盘 */}
      <NumberKeyboard
        extraKey="X"
        closeButtonText="完成"
        visible={active === 'v3'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带标题的键盘 */}
      <NumberKeyboard
        title="键盘标题"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v4'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置多个按键的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey={['00', '.']}
        closeButtonText="完成"
        visible={active === 'v5'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置随机数字的键盘 */}
      <NumberKeyboard
        randomKeyOrder
        visible={active === 'v6'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { Cell, NumberKeyboard, Toast } from 'react-native-system-ui'

type DemoKey = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null

export default function NumberKeyboardBasicDemo() {
  const [active, setActive] = React.useState<DemoKey>(null)

  const open = (key: Exclude<DemoKey, null>) => setActive(key)
  const close = () => setActive(null)

  const onInput = (val: string) => Toast.info({ message: \`输入 \${val}\`, duration: 800 })
  const onDelete = () => Toast.info({ message: '删除', duration: 800 })

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="弹出默认键盘" isLink onPress={() => open('v1')} />
        <Cell title="弹出带右侧栏的键盘" isLink onPress={() => open('v2')} />
        <Cell title="弹出身份证号键盘" isLink onPress={() => open('v3')} />
        <Cell title="弹出带标题的键盘" isLink onPress={() => open('v4')} />
        <Cell title="弹出配置多个按键的键盘" isLink onPress={() => open('v5')} />
        <Cell title="弹出配置随机数字的键盘" isLink onPress={() => open('v6')} />
      </Cell.Group>

      {/* 弹出默认键盘 */}
      <NumberKeyboard
        visible={active === 'v1'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带右侧栏的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v2'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出身份证号键盘 */}
      <NumberKeyboard
        extraKey="X"
        closeButtonText="完成"
        visible={active === 'v3'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带标题的键盘 */}
      <NumberKeyboard
        title="键盘标题"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v4'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置多个按键的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey={['00', '.']}
        closeButtonText="完成"
        visible={active === 'v5'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置随机数字的键盘 */}
      <NumberKeyboard
        randomKeyOrder
        visible={active === 'v6'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
    </View>
  )
}
`}},title:"基础用法",identifier:"number-keyboard-basic",lang:"tsx",meta:{title:"基础用法"}};function Se(){const[l,t]=w.useState(!1);return e.jsxs(y,{style:{gap:12},children:[e.jsx(C.Group,{children:e.jsx(C,{title:"自定义按键",isLink:!0,onPress:()=>t(!0)})}),e.jsx(g,{visible:l,theme:"custom",extraKey:[".","确认"],closeButtonText:"完成",numberKeyRender:o=>e.jsx(H,{style:{fontSize:24},children:o}),deleteButtonText:"退格",onClose:()=>t(!1),onBlur:()=>t(!1)})]})}const xt=`import React from 'react'
import { View, Text } from 'react-native'
import { NumberKeyboard, Cell } from 'react-native-system-ui'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="自定义按键" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="完成"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        deleteButtonText="退格"
        onClose={() => setVisible(false)}
        onBlur={() => setVisible(false)}
      />
    </View>
  )
}
`,pt={code:xt,sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { NumberKeyboard, Cell } from 'react-native-system-ui'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="自定义按键" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="完成"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        deleteButtonText="退格"
        onClose={() => setVisible(false)}
        onBlur={() => setVisible(false)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'
import { NumberKeyboard, Cell } from 'react-native-system-ui'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="自定义按键" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="完成"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        deleteButtonText="退格"
        onClose={() => setVisible(false)}
        onBlur={() => setVisible(false)}
      />
    </View>
  )
}
`}},title:"自定义按键",identifier:"number-keyboard-custom",lang:"tsx",meta:{title:"自定义按键"}};function Le(){const[l,t]=w.useState(!1),[o,d]=w.useState("123");return e.jsxs(y,{style:{gap:12},children:[e.jsx(it,{label:"双向绑定",value:o,readOnly:!0,placeholder:"点击唤起键盘",onClick:()=>t(!0)}),e.jsx(g,{visible:l,value:o,maxlength:6,onChange:d,onClose:()=>t(!1),blurOnClose:!0})]})}const vt=`import React from 'react'
import { View } from 'react-native'
import { Field, NumberKeyboard } from 'react-native-system-ui'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')

  return (
    <View style={{ gap: 12 }}>
      <Field
        label="双向绑定"
        value={value}
        readOnly
        placeholder="点击唤起键盘"
        onClick={() => setVisible(true)}
      />
      <NumberKeyboard
        visible={visible}
        value={value}
        maxlength={6}
        onChange={setValue}
        onClose={() => setVisible(false)}
        blurOnClose
      />
    </View>
  )
}
`,yt={code:vt,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { Field, NumberKeyboard } from 'react-native-system-ui'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')

  return (
    <View style={{ gap: 12 }}>
      <Field
        label="双向绑定"
        value={value}
        readOnly
        placeholder="点击唤起键盘"
        onClick={() => setVisible(true)}
      />
      <NumberKeyboard
        visible={visible}
        value={value}
        maxlength={6}
        onChange={setValue}
        onClose={() => setVisible(false)}
        blurOnClose
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { Field, NumberKeyboard } from 'react-native-system-ui'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')

  return (
    <View style={{ gap: 12 }}>
      <Field
        label="双向绑定"
        value={value}
        readOnly
        placeholder="点击唤起键盘"
        onClick={() => setVisible(true)}
      />
      <NumberKeyboard
        visible={visible}
        value={value}
        maxlength={6}
        onChange={setValue}
        onClose={() => setVisible(false)}
        blurOnClose
      />
    </View>
  )
}
`}},title:"双向绑定",identifier:"number-keyboard-controlled",lang:"tsx",meta:{title:"双向绑定"}},bt=function({previewer:l=()=>null,api:t=()=>null}){const o=l;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"numberkeyboard-数字键盘","data-anchor":"numberkeyboard-数字键盘",children:"NumberKeyboard 数字键盘"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"弹出式数字键盘，常与 Field/PasswordInput 搭配，用于输入金额、验证码等。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { NumberKeyboard } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(o,{...mt,children:e.jsx(Ie,{})})}),e.jsx("h3",{id:"自定义按键","data-anchor":"自定义按键",children:"自定义按键"}),e.jsx("div",{children:e.jsx(o,{...pt,children:e.jsx(Se,{})})}),e.jsx("h3",{id:"双向绑定","data-anchor":"双向绑定",children:"双向绑定"}),e.jsx("div",{children:e.jsx(o,{...yt,children:e.jsx(Le,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示键盘"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前输入值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"初始输入值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"extraKey"})}),e.jsx("td",{children:"自定义左下角按键，支持传入单个或两个字符"}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeButtonText"})}),e.jsx("td",{children:"关闭按钮文案（为空则不展示）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeButtonLoading"})}),e.jsxs("td",{children:["关闭按钮加载态，仅 ",e.jsx("code",{children:'theme="custom"'})," 时生效"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"deleteButtonText"})}),e.jsx("td",{children:"删除按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showDeleteKey"})}),e.jsx("td",{children:"是否展示删除键"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"randomKeyOrder"})}),e.jsx("td",{children:"数字键是否随机排列"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blurOnClose"})}),e.jsxs("td",{children:["点击关闭按钮时是否触发 ",e.jsx("code",{children:"onBlur"})]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"theme"})}),e.jsx("td",{children:"样式风格"}),e.jsx("td",{children:e.jsx("code",{children:"'default' | 'custom'"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxlength"})}),e.jsx("td",{children:"输入最大长度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onInput"})}),e.jsx("td",{children:"点击数字或自定义按键时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(key: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onDelete"})}),e.jsx("td",{children:"点击删除键时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"输入内容变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onBlur"})}),e.jsx("td",{children:"键盘关闭时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"onShow"})," / ",e.jsx("code",{children:"onHide"})]}),e.jsx("td",{children:"键盘完全弹出/收起时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"numberKeyRender"})}),e.jsx("td",{children:"自定义数字键渲染"}),e.jsx("td",{children:e.jsx("code",{children:"(key: string) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"deleteRender"})}),e.jsx("td",{children:"自定义删除键"}),e.jsx("td",{children:e.jsx("code",{children:"() => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"extraKeyRender"})}),e.jsx("td",{children:"自定义额外按键"}),e.jsx("td",{children:e.jsx("code",{children:"(key: string) => ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["需要与 Field 联动时，可将 ",e.jsx("code",{children:"visible"})," 和输入值托管在父组件中，由 Field 的 ",e.jsx("code",{children:"onFocus"})," 控制弹出。"]})})]})})},ht=[{Component:Ie,key:"number-keyboard-basic",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { Cell, NumberKeyboard, Toast } from 'react-native-system-ui'

type DemoKey = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null

export default function NumberKeyboardBasicDemo() {
  const [active, setActive] = React.useState<DemoKey>(null)

  const open = (key: Exclude<DemoKey, null>) => setActive(key)
  const close = () => setActive(null)

  const onInput = (val: string) => Toast.info({ message: \`输入 \${val}\`, duration: 800 })
  const onDelete = () => Toast.info({ message: '删除', duration: 800 })

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="弹出默认键盘" isLink onPress={() => open('v1')} />
        <Cell title="弹出带右侧栏的键盘" isLink onPress={() => open('v2')} />
        <Cell title="弹出身份证号键盘" isLink onPress={() => open('v3')} />
        <Cell title="弹出带标题的键盘" isLink onPress={() => open('v4')} />
        <Cell title="弹出配置多个按键的键盘" isLink onPress={() => open('v5')} />
        <Cell title="弹出配置随机数字的键盘" isLink onPress={() => open('v6')} />
      </Cell.Group>

      {/* 弹出默认键盘 */}
      <NumberKeyboard
        visible={active === 'v1'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带右侧栏的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v2'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出身份证号键盘 */}
      <NumberKeyboard
        extraKey="X"
        closeButtonText="完成"
        visible={active === 'v3'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带标题的键盘 */}
      <NumberKeyboard
        title="键盘标题"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v4'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置多个按键的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey={['00', '.']}
        closeButtonText="完成"
        visible={active === 'v5'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置随机数字的键盘 */}
      <NumberKeyboard
        randomKeyOrder
        visible={active === 'v6'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { Cell, NumberKeyboard, Toast } from 'react-native-system-ui'

type DemoKey = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null

export default function NumberKeyboardBasicDemo() {
  const [active, setActive] = React.useState<DemoKey>(null)

  const open = (key: Exclude<DemoKey, null>) => setActive(key)
  const close = () => setActive(null)

  const onInput = (val: string) => Toast.info({ message: \`输入 \${val}\`, duration: 800 })
  const onDelete = () => Toast.info({ message: '删除', duration: 800 })

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="弹出默认键盘" isLink onPress={() => open('v1')} />
        <Cell title="弹出带右侧栏的键盘" isLink onPress={() => open('v2')} />
        <Cell title="弹出身份证号键盘" isLink onPress={() => open('v3')} />
        <Cell title="弹出带标题的键盘" isLink onPress={() => open('v4')} />
        <Cell title="弹出配置多个按键的键盘" isLink onPress={() => open('v5')} />
        <Cell title="弹出配置随机数字的键盘" isLink onPress={() => open('v6')} />
      </Cell.Group>

      {/* 弹出默认键盘 */}
      <NumberKeyboard
        visible={active === 'v1'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带右侧栏的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v2'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出身份证号键盘 */}
      <NumberKeyboard
        extraKey="X"
        closeButtonText="完成"
        visible={active === 'v3'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出带标题的键盘 */}
      <NumberKeyboard
        title="键盘标题"
        extraKey="."
        closeButtonText="完成"
        visible={active === 'v4'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置多个按键的键盘 */}
      <NumberKeyboard
        theme="custom"
        extraKey={['00', '.']}
        closeButtonText="完成"
        visible={active === 'v5'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
      {/* 弹出配置随机数字的键盘 */}
      <NumberKeyboard
        randomKeyOrder
        visible={active === 'v6'}
        onBlur={close}
        onInput={onInput}
        onDelete={onDelete}
      />
    </View>
  )
}
`}},title:"基础用法",identifier:"number-keyboard-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:Se,key:"number-keyboard-custom",sources:{_:{tsx:`import React from 'react'
import { View, Text } from 'react-native'
import { NumberKeyboard, Cell } from 'react-native-system-ui'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="自定义按键" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="完成"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        deleteButtonText="退格"
        onClose={() => setVisible(false)}
        onBlur={() => setVisible(false)}
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View, Text } from 'react-native'
import { NumberKeyboard, Cell } from 'react-native-system-ui'

export default function NumberKeyboardCustomDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ gap: 12 }}>
      <Cell.Group>
        <Cell title="自定义按键" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <NumberKeyboard
        visible={visible}
        theme="custom"
        extraKey={['.', '确认']}
        closeButtonText="完成"
        numberKeyRender={key => <Text style={{ fontSize: 24 }}>{key}</Text>}
        deleteButtonText="退格"
        onClose={() => setVisible(false)}
        onBlur={() => setVisible(false)}
      />
    </View>
  )
}
`}},title:"自定义按键",identifier:"number-keyboard-custom",lang:"tsx",meta:{title:"自定义按键"}},{Component:Le,key:"number-keyboard-controlled",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'
import { Field, NumberKeyboard } from 'react-native-system-ui'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')

  return (
    <View style={{ gap: 12 }}>
      <Field
        label="双向绑定"
        value={value}
        readOnly
        placeholder="点击唤起键盘"
        onClick={() => setVisible(true)}
      />
      <NumberKeyboard
        visible={visible}
        value={value}
        maxlength={6}
        onChange={setValue}
        onClose={() => setVisible(false)}
        blurOnClose
      />
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'
import { Field, NumberKeyboard } from 'react-native-system-ui'

export default function NumberKeyboardControlledDemo() {
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState('123')

  return (
    <View style={{ gap: 12 }}>
      <Field
        label="双向绑定"
        value={value}
        readOnly
        placeholder="点击唤起键盘"
        onClick={() => setVisible(true)}
      />
      <NumberKeyboard
        visible={visible}
        value={value}
        maxlength={6}
        onChange={setValue}
        onClose={() => setVisible(false)}
        blurOnClose
      />
    </View>
  )
}
`}},title:"双向绑定",identifier:"number-keyboard-controlled",lang:"tsx",meta:{title:"双向绑定"}}],ft={simulator:{compact:!0}},jt=[{depth:1,text:"NumberKeyboard 数字键盘",id:"numberkeyboard-数字键盘"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义按键",id:"自定义按键"},{depth:3,text:"双向绑定",id:"双向绑定"},{depth:2,text:"API",id:"api"}],Ct="/docs/components/number-keyboard.md",gt="NumberKeyboard 数字键盘",Dt="1769570039000",cn=l=>l.children({MdContent:bt,demos:ht,frontmatter:ft,slugs:jt,filePath:Ct,title:gt,updatedTime:Dt});export{bt as MdContent,cn as default,ht as demos,Ct as filePath,ft as frontmatter,jt as slugs,gt as title,Dt as updatedTime};
