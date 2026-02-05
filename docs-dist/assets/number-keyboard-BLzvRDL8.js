import{R,r as u,j as e,V as y,s as We}from"./main-O6KZrSH_.js";import{C as g}from"./index-DCx-GaLs.js";import{c as Ye}from"./createPlatformShadow-BbOkyb5V.js";import{p as Xe}from"./number-BcSDXImJ.js";import{L as qe}from"./Loading-CdSfkQu4.js";import{P as Ue}from"./Portal-D2qUv7UW.js";import{c as Ze,T as H}from"./createComponentTokensHook-KzOuLm4c.js";import{u as Je}from"./useControllableValue-_OJua4RH.js";import{M as Ne}from"./index-DvCZppP1.js";import{A as re,E as _}from"./Animated-qBs3E5U6.js";import{S as Qe}from"./SafeAreaView-L8uUXbhq.js";import{n as et}from"./animation-BpxpeSKC.js";import{T as Ee}from"./index-CCLXK9-u.js";import{F as tt}from"./Field-Ckp9NSMz.js";import"./Arrow-r8D7M_Tx.js";import"./IconBase-DZr7C-P7.js";import"./hairline-Dpq7rEkb.js";import"./useAriaPress-DMjZXFvR.js";import"./index-CJrLMJTa.js";import"./index-ANZ1PvOD.js";import"./extends-CF3RwP-h.js";import"./Overlay-CmwAk_J5.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./Checked-Cm5uhjGy.js";import"./Close-DpyqkEOI.js";import"./index-Cq_gACMg.js";import"./useOverlayStack-Tvvid2F1.js";import"./index-NcsZVNiX.js";import"./useLocale-C-3I3wuL.js";import"./promise-DDQXV5JQ.js";import"./index-DzU_0rvq.js";import"./color-cEGfwRja.js";import"./Popup-DvjP5SkZ.js";import"./index-B3Y2P23a.js";const nt=l=>{const{palette:t,spacing:o,radii:c,fontSize:b}=l,a=t.primary.foreground??"#ffffff";return{colors:{background:t.default[100],title:t.default[700],keyBackground:"#ffffff",keyActiveBackground:t.default[50],keyText:t.default[900],keyTextActive:t.primary[600],closeBackground:t.primary[500],closeActiveBackground:t.primary[400],closeText:a,border:t.default[200]},spacing:{paddingHorizontal:o.ssm,paddingVertical:o.ssm,keyGap:o.ssm,titlePadding:o.md},sizing:{keyHeight:54,closeHeight:44,fontSize:28,titleFontSize:b.md},radii:{key:c.xs},shadow:{color:"#000000",opacity:.08,radius:6,offsetY:0,elevation:6}}},ot=Ze("numberKeyboard",nt),G=new Set,Ve=["1","2","3","4","5","6","7","8","9"],O="0",st=l=>{const t=[...l];for(let o=t.length-1;o>0;o-=1){const c=Math.floor(Math.random()*(o+1));[t[o],t[c]]=[t[c],t[o]]}return t},D=R.memo(l=>{const{visible:t,title:o,tokensOverride:c,theme:b="default",extraKey:a,randomKeyOrder:F,showDeleteKey:S=!0,closeButtonText:$,deleteButtonText:ie,closeButtonLoading:W,onChange:ht,onInput:ue,onDelete:ae,onClose:ce,onBlur:de,onHide:me,onShow:xe,value:ft,defaultValue:jt,maxlength:Pe,blurOnClose:pe=!0,safeAreaInsetBottom:ve=!0,transition:we=!0,transitionDuration:Ie=300,numberKeyRender:Y,deleteRender:ye,extraKeyRender:L,style:Re,...Se}=l,Le=ot(c),{colors:r,radii:be,shadow:h,sizing:f,spacing:T}=Le,[Me,X]=Je(l,{defaultValue:"",valuePropName:"value",defaultValuePropName:"defaultValue",trigger:"onChange"}),he=Me??"",fe=(()=>{const n=Xe(Pe,void 0);if(!(n===void 0||!Number.isFinite(n)||n<0))return Math.floor(n)})(),q=u.useRef(he),je=u.useRef(fe);q.current=he,je.current=fe;const A=b==="custom",k=A?$??"完成":$,C=u.useCallback(()=>{ce?.(),pe&&de?.()},[pe,de,ce]),U=u.useRef(t);u.useEffect(()=>{t&&!U.current&&xe?.(),!t&&U.current&&me?.(),U.current=t},[t,xe,me]),u.useEffect(()=>(t?(G.add(C),G.forEach(n=>{n!==C&&n()})):G.delete(C),()=>{G.delete(C)}),[t,C]);const Ce=u.useMemo(()=>{const s=(F&&t?st(Ve):Ve).map(m=>({text:m,type:""}));if(A){const m=Array.isArray(a)?a:a?[a]:[];return m.length===1?s.push({text:O,type:"",wider:!0},{text:m[0],type:"extra"}):m.length>=2?s.push({text:m[0],type:"extra"},{text:O,type:""},{text:m[1],type:"extra"}):s.push({text:O,type:""}),s}const B=Array.isArray(a)?a[0]??"":a??"";return s.push({text:B,type:"extra"}),s.push({text:O,type:""}),s.push({type:S?"delete":"",text:S?void 0:""}),s},[a,A,F,S,t]),ge=u.useCallback((n,d)=>{if(d==="delete"){const m=q.current;if(!m)return;ae?.(),X(m.slice(0,-1));return}if(d==="close"||d==="extra"&&!n){C();return}if(!n)return;const s=q.current,B=je.current;B!==void 0&&s.length>=B||(ue?.(n),X(`${s}${n}`))},[C,ae,ue,X]),ze=u.useMemo(()=>Ye({color:h.color,opacity:h.opacity,radius:h.radius,offsetY:h.offsetY,elevation:h.elevation}),[h.color,h.elevation,h.offsetY,h.opacity,h.radius]),p=T.keyGap,I=u.useCallback((n,d,s=!1,B=!1,m)=>{const j=n.type===""&&!n.text,x=j||s&&W,z=x?void 0:()=>ge(n.text,n.type),ne=s?r.closeBackground:r.keyBackground,P=s?r.closeActiveBackground:r.keyActiveBackground,w=s?r.closeText:r.keyText,oe=s?r.closeText:r.keyTextActive,se=m??(s?f.closeHeight:f.keyHeight),le=Math.round(f.fontSize*.64),Ke=n.type==="close"||n.type==="extra"||n.type==="delete"?le:f.fontSize,N=n.text??"",E=n.type==="delete"?ye?.()??ie??"⌫":n.type==="extra"?L?L(N):N||"⌨︎":n.type==="close"?k??"完成":Y?Y(N):N;return e.jsx(Ne,{onPress:z,disabled:x,style:[{opacity:j?1:x?.6:1},B?{width:"100%",flexBasis:"auto",flexGrow:0,alignSelf:"stretch"}:{flexBasis:0,flexGrow:n.wider?2:1,flexShrink:1,minWidth:0}],accessible:!j,accessibilityRole:j?void 0:"button",accessibilityLabel:j?void 0:n.type==="delete"?"delete":n.type==="close"?k??"close":n.type==="extra"?N||"collapse":N,accessibilityState:j?void 0:{disabled:!!x},accessibilityElementsHidden:j,importantForAccessibility:j?"no-hide-descendants":void 0,children:({pressed:i})=>{const K=i&&!x,V=x?r.keyBackground:K?P:ne,ke=K?oe:w;return e.jsx(y,{style:[v.key,{height:se,backgroundColor:V,borderRadius:be.key}],children:s&&W?e.jsx(qe,{size:18,color:ke}):typeof E=="string"||typeof E=="number"?e.jsx(H,{style:[v.keyText,{color:ke,fontSize:Ke}],children:E}):E==null||E===!1?null:E})}},`${n.type}-${d}-${n.text??d}`)},[W,r.closeActiveBackground,r.closeBackground,r.closeText,r.keyActiveBackground,r.keyBackground,r.keyText,r.keyTextActive,ie,ye,L,ge,Y,be.key,f.closeHeight,f.fontSize,f.keyHeight,k]),Z=u.useRef(new re.Value(t?1:0)).current,M=u.useRef(null),J=u.useRef(0),[_e,Ge]=u.useState(0),[Oe,De]=u.useState(t),Be=we===!1?0:Ie;u.useEffect(()=>{J.current+=1;const n=J.current;t&&De(!0),M.current?.stop();const d=re.timing(Z,{toValue:t?1:0,duration:Be,useNativeDriver:et,easing:t?_.out(_.cubic):_.in(_.cubic)});return M.current=d,d.start(({finished:s})=>{s&&!t&&J.current===n&&De(!1)}),()=>{M.current?.stop(),M.current=null}},[Z,t,Be]);const He=Z.interpolate({inputRange:[0,1],outputRange:[_e||320,0]}),$e=u.useCallback(n=>{const{height:d}=n.nativeEvent.layout;Ge(s=>Math.abs(d-s)>.5?d:s)},[]),Q=!A&&(o||$),ee=f.keyHeight*2+p,te=u.useMemo(()=>{const n={paddingHorizontal:T.titlePadding},d=[v.defaultRow,{flexDirection:"column",flexWrap:"nowrap",paddingHorizontal:T.paddingHorizontal,paddingTop:p,paddingBottom:p,gap:p}],s={flexDirection:"row",gap:p},B=[v.customRow,{paddingHorizontal:T.paddingHorizontal,paddingTop:Q?0:p,paddingBottom:p,width:"100%"}],m=[v.customMain,{flexDirection:"column",flexWrap:"nowrap",gap:p}],j=[v.customSidebar,{gap:p,marginLeft:p}],x=Ce.map((i,K)=>({key:i,index:K})),z=[];for(let i=0;i<x.length;i+=3)z.push(x.slice(i,i+3));const ne=e.jsx(y,{style:d,children:z.map((i,K)=>e.jsx(y,{style:s,children:i.map(V=>I(V.key,V.index))},`l-${K}`))}),P=[];for(let i=0;i<9&&i<x.length;i+=3)P.push(x.slice(i,i+3));const w=x.slice(9);w.length===1?P.push([{key:{type:""},index:1000001},w[0],{key:{type:""},index:1000002}]):w.length&&P.push(w);const oe=e.jsx(y,{style:m,children:P.map((i,K)=>e.jsx(y,{style:s,children:i.map(V=>I(V.key,V.index))},`cl-${K}`))}),se=S?I({type:"delete"},999,!1,!0,ee):null,le=I({type:"close"},1e3,!0,!0,ee);return{headerNode:Q?e.jsxs(y,{style:[v.header,n],children:[e.jsx(H,{style:[v.title,v.titleOverlay,{color:r.title,fontSize:f.titleFontSize}],numberOfLines:1,children:o}),k?e.jsx(Ne,{onPress:C,style:v.headerClose,accessibilityRole:"button",accessibilityLabel:k,children:e.jsx(H,{style:{color:r.title},children:k})}):null]}):null,bodyNode:A?e.jsxs(y,{style:B,children:[oe,e.jsxs(y,{style:j,children:[se,le]})]}):ne,safeAreaNode:ve&&e.jsx(Qe,{edge:"bottom"})}},[C,r.title,ee,L,Q,A,p,Ce,I,k,ve,f.titleFontSize,T.paddingHorizontal,T.titlePadding,o]);return!Oe&&!t?null:e.jsx(Ue,{children:e.jsxs(re.View,{...Se,pointerEvents:t?"auto":"none",onLayout:$e,style:[v.wrapper,ze,Re,{transform:[{translateY:He}],backgroundColor:r.background}],children:[te.headerNode,te.bodyNode,te.safeAreaNode]})})}),v=We.create({wrapper:{position:"absolute",left:0,right:0,bottom:0},header:{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",height:44,position:"relative"},title:{fontWeight:"600"},titleOverlay:{position:"absolute",left:12,right:12,textAlign:"center"},headerClose:{minWidth:56,alignItems:"flex-end"},key:{justifyContent:"center",alignItems:"center"},keyText:{includeFontPadding:!1,textAlign:"center"},defaultRow:{flexDirection:"row",flexWrap:"wrap"},customRow:{flexDirection:"row"},customMain:{flex:3,flexDirection:"row",flexWrap:"wrap"},customSidebar:{flex:1,flexDirection:"column",justifyContent:"flex-start"}});D.displayName="NumberKeyboard";function Fe(){const[l,t]=R.useState(null),o=F=>t(F),c=()=>t(null),b=F=>Ee.info({message:`输入 ${F}`,duration:800}),a=()=>Ee.info({message:"删除",duration:800});return e.jsxs(y,{style:{gap:12},children:[e.jsxs(g.Group,{children:[e.jsx(g,{title:"弹出默认键盘",isLink:!0,onPress:()=>o("v1")}),e.jsx(g,{title:"弹出带右侧栏的键盘",isLink:!0,onPress:()=>o("v2")}),e.jsx(g,{title:"弹出身份证号键盘",isLink:!0,onPress:()=>o("v3")}),e.jsx(g,{title:"弹出带标题的键盘",isLink:!0,onPress:()=>o("v4")}),e.jsx(g,{title:"弹出配置多个按键的键盘",isLink:!0,onPress:()=>o("v5")}),e.jsx(g,{title:"弹出配置随机数字的键盘",isLink:!0,onPress:()=>o("v6")})]}),e.jsx(D,{visible:l==="v1",onBlur:c,onInput:b,onDelete:a}),e.jsx(D,{theme:"custom",extraKey:".",closeButtonText:"完成",visible:l==="v2",onBlur:c,onInput:b,onDelete:a}),e.jsx(D,{extraKey:"X",closeButtonText:"完成",visible:l==="v3",onBlur:c,onInput:b,onDelete:a}),e.jsx(D,{title:"键盘标题",extraKey:".",closeButtonText:"完成",visible:l==="v4",onBlur:c,onInput:b,onDelete:a}),e.jsx(D,{theme:"custom",extraKey:["00","."],closeButtonText:"完成",visible:l==="v5",onBlur:c,onInput:b,onDelete:a}),e.jsx(D,{randomKeyOrder:!0,visible:l==="v6",onBlur:c,onInput:b,onDelete:a})]})}const lt=`import React from 'react'
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
`,rt={code:lt,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础用法",identifier:"number-keyboard-basic",lang:"tsx",meta:{title:"基础用法"}};function Te(){const[l,t]=R.useState(!1);return e.jsxs(y,{style:{gap:12},children:[e.jsx(g.Group,{children:e.jsx(g,{title:"自定义按键",isLink:!0,onPress:()=>t(!0)})}),e.jsx(D,{visible:l,theme:"custom",extraKey:[".","确认"],closeButtonText:"完成",numberKeyRender:o=>e.jsx(H,{style:{fontSize:24},children:o}),deleteButtonText:"退格",onClose:()=>t(!1),onBlur:()=>t(!1)})]})}const it=`import React from 'react'
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
`,ut={code:it,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义按键",identifier:"number-keyboard-custom",lang:"tsx",meta:{title:"自定义按键"}};function Ae(){const[l,t]=R.useState(!1),[o,c]=R.useState("123");return e.jsxs(y,{style:{gap:12},children:[e.jsx(tt,{label:"双向绑定",value:o,readOnly:!0,placeholder:"点击唤起键盘",onClick:()=>t(!0)}),e.jsx(D,{visible:l,value:o,maxlength:6,onChange:c,onClose:()=>t(!1),blurOnClose:!0})]})}const at=`import React from 'react'
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
`,ct={code:at,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"双向绑定",identifier:"number-keyboard-controlled",lang:"tsx",meta:{title:"双向绑定"}},dt=function({previewer:l=()=>null,api:t=()=>null}){const o=l;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"numberkeyboard-数字键盘","data-anchor":"numberkeyboard-数字键盘",children:"NumberKeyboard 数字键盘"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"弹出式数字键盘，常与 Field/PasswordInput 搭配，用于输入金额、验证码等。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { NumberKeyboard } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(o,{...rt,children:e.jsx(Fe,{})})}),e.jsx("h3",{id:"自定义按键","data-anchor":"自定义按键",children:"自定义按键"}),e.jsx("div",{children:e.jsx(o,{...ut,children:e.jsx(Te,{})})}),e.jsx("h3",{id:"双向绑定","data-anchor":"双向绑定",children:"双向绑定"}),e.jsx("div",{children:e.jsx(o,{...ct,children:e.jsx(Ae,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示键盘"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前输入值（受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"初始输入值（非受控）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"extraKey"})}),e.jsx("td",{children:"自定义左下角按键，支持传入单个或两个字符"}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeButtonText"})}),e.jsx("td",{children:"关闭按钮文案（为空则不展示）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeButtonLoading"})}),e.jsxs("td",{children:["关闭按钮加载态，仅 ",e.jsx("code",{children:'theme="custom"'})," 时生效"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"deleteButtonText"})}),e.jsx("td",{children:"删除按钮文案"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showDeleteKey"})}),e.jsx("td",{children:"是否展示删除键"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"randomKeyOrder"})}),e.jsx("td",{children:"数字键是否随机排列"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"blurOnClose"})}),e.jsxs("td",{children:["点击关闭按钮时是否触发 ",e.jsx("code",{children:"onBlur"})]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"theme"})}),e.jsx("td",{children:"样式风格"}),e.jsx("td",{children:e.jsx("code",{children:"'default' | 'custom'"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"maxlength"})}),e.jsx("td",{children:"输入最大长度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onInput"})}),e.jsx("td",{children:"点击数字或自定义按键时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(key: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onDelete"})}),e.jsx("td",{children:"点击删除键时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"输入内容变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭按钮时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onBlur"})}),e.jsx("td",{children:"键盘关闭时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("code",{children:"onShow"})," / ",e.jsx("code",{children:"onHide"})]}),e.jsx("td",{children:"键盘完全弹出/收起时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"numberKeyRender"})}),e.jsx("td",{children:"自定义数字键渲染"}),e.jsx("td",{children:e.jsx("code",{children:"(key: string) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"deleteRender"})}),e.jsx("td",{children:"自定义删除键"}),e.jsx("td",{children:e.jsx("code",{children:"() => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"extraKeyRender"})}),e.jsx("td",{children:"自定义额外按键"}),e.jsx("td",{children:e.jsx("code",{children:"(key: string) => ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["需要与 Field 联动时，可将 ",e.jsx("code",{children:"visible"})," 和输入值托管在父组件中，由 Field 的 ",e.jsx("code",{children:"onFocus"})," 控制弹出。"]})})]})})},mt=[{Component:Fe,key:"number-keyboard-basic",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础用法",identifier:"number-keyboard-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:Te,key:"number-keyboard-custom",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义按键",identifier:"number-keyboard-custom",lang:"tsx",meta:{title:"自定义按键"}},{Component:Ae,key:"number-keyboard-controlled",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"双向绑定",identifier:"number-keyboard-controlled",lang:"tsx",meta:{title:"双向绑定"}}],xt={simulator:{compact:!0}},pt=[{depth:1,text:"NumberKeyboard 数字键盘",id:"numberkeyboard-数字键盘"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义按键",id:"自定义按键"},{depth:3,text:"双向绑定",id:"双向绑定"},{depth:2,text:"API",id:"api"}],vt="/docs/components/number-keyboard.md",yt="NumberKeyboard 数字键盘",bt="1769570039000",sn=l=>l.children({MdContent:dt,demos:mt,frontmatter:xt,slugs:pt,filePath:vt,title:yt,updatedTime:bt});export{dt as MdContent,sn as default,mt as demos,vt as filePath,xt as frontmatter,pt as slugs,yt as title,bt as updatedTime};
