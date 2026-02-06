import{R as I,r as u,j as e,V as y,s as We}from"./main-BAeJvGa4.js";import{C}from"./index-bJvK1ILl.js";import{c as Xe}from"./createPlatformShadow-BbOkyb5V.js";import{p as Ye}from"./number-D4GYRO_w.js";import{L as qe}from"./Loading-CpmDHEQC.js";import{P as Ue}from"./Portal-DpGMOUoW.js";import{c as Ze,T as H}from"./createComponentTokensHook-C-NxqfEf.js";import{u as Je}from"./useControllableValue-Dp7VzsJy.js";import{M as Ne}from"./index-DkwLlxr6.js";import{A as re,E as z}from"./Animated-BC0ZtReY.js";import{S as Qe}from"./SafeAreaView-DvA24sN_.js";import{n as et}from"./animation-BpxpeSKC.js";import{T as Ee}from"./index-DyP2Y3u_.js";import{F as tt}from"./Field-BSylHY6l.js";import"./Arrow-DUiww19E.js";import"./IconBase-BXXvwLgA.js";import"./hairline-DQRu37Yt.js";import"./useAriaPress-B7BjoQga.js";import"./index-CJrLMJTa.js";import"./index-tIQ9IWf_.js";import"./extends-CF3RwP-h.js";import"./Overlay-DsrHAOal.js";import"./index-BQ9E3_S9.js";import"./index-Beiuxnvg.js";import"./index-OVYHKMmk.js";import"./useSafeAreaPadding-CHurfSaN.js";import"./Checked-Cm_Ob0Fm.js";import"./Close-Cz6HpK28.js";import"./index-DNlyIA0F.js";import"./useOverlayStack-D2UM4R66.js";import"./index-vDISk0oB.js";import"./useLocale-BmOENVyS.js";import"./promise-BSLZg49p.js";import"./index-PXiyNNr8.js";import"./color-CJcOUys4.js";import"./Popup-Dvt_YZ-j.js";import"./index-C2RJyUbd.js";const nt=l=>{const{palette:t,spacing:o,radii:d,fontSize:b}=l,a=t.primary.foreground??"#ffffff";return{colors:{background:t.default[100],title:t.default[700],keyBackground:"#ffffff",keyActiveBackground:t.default[50],keyText:t.default[900],keyTextActive:t.primary[600],closeBackground:t.primary[500],closeActiveBackground:t.primary[400],closeText:a,border:t.default[200]},spacing:{paddingHorizontal:o.ssm,paddingVertical:o.ssm,keyGap:o.ssm,titlePadding:o.md},sizing:{keyHeight:54,closeHeight:44,fontSize:28,titleFontSize:b.md},radii:{key:d.xs},shadow:{color:"#000000",opacity:.08,radius:6,offsetY:0,elevation:6}}},ot=Ze("numberKeyboard",nt),_=new Set,Ve=["1","2","3","4","5","6","7","8","9"],O="0",st=l=>{const t=[...l];for(let o=t.length-1;o>0;o-=1){const d=Math.floor(Math.random()*(o+1));[t[o],t[d]]=[t[d],t[o]]}return t},g=I.memo(l=>{const{visible:t,title:o,tokensOverride:d,theme:b="default",extraKey:a,randomKeyOrder:V,showDeleteKey:R=!0,closeButtonText:$,deleteButtonText:ie,closeButtonLoading:W,onChange:ht,onInput:ue,onDelete:ae,onClose:ce,onBlur:de,onHide:me,onShow:xe,value:ft,defaultValue:jt,maxlength:Pe,blurOnClose:pe=!0,safeAreaInsetBottom:ve=!0,transition:we=!0,transitionDuration:Ie=300,numberKeyRender:X,deleteRender:ye,extraKeyRender:S,style:Re,...Se}=l,Le=ot(d),{colors:r,radii:be,shadow:F,sizing:h,spacing:c}=Le,[Me,Y]=Je(l,{defaultValue:"",valuePropName:"value",defaultValuePropName:"defaultValue",trigger:"onChange"}),he=Me??"",L=Ye(Pe,void 0),fe=L!==void 0&&Number.isFinite(L)&&L>=0?Math.floor(L):void 0,q=u.useRef(he),je=u.useRef(fe);q.current=he,je.current=fe;const T=b==="custom",K=T?$??"完成":$,j=u.useCallback(()=>{ce?.(),pe&&de?.()},[pe,de,ce]),U=u.useRef(t);u.useEffect(()=>{t&&!U.current&&xe?.(),!t&&U.current&&me?.(),U.current=t},[t,xe,me]),u.useEffect(()=>(t?(_.add(j),_.forEach(n=>{n!==j&&n()})):_.delete(j),()=>{_.delete(j)}),[t,j]);const Ce=u.useMemo(()=>{const s=(V&&t?st(Ve):Ve).map(x=>({text:x,type:""}));if(T){const x=Array.isArray(a)?a:a?[a]:[];return x.length===1?s.push({text:O,type:"",wider:!0},{text:x[0],type:"extra"}):x.length>=2?s.push({text:x[0],type:"extra"},{text:O,type:""},{text:x[1],type:"extra"}):s.push({text:O,type:""}),s}const D=Array.isArray(a)?a[0]??"":a??"";return s.push({text:D,type:"extra"}),s.push({text:O,type:""}),s.push({type:R?"delete":"",text:R?void 0:""}),s},[a,T,V,R,t]),ge=u.useCallback((n,m)=>{if(m==="delete"){const x=q.current;if(!x)return;ae?.(),Y(x.slice(0,-1));return}if(m==="close"||m==="extra"&&!n){j();return}if(!n)return;const s=q.current,D=je.current;D!==void 0&&s.length>=D||(ue?.(n),Y(`${s}${n}`))},[j,ae,ue,Y]),Ge=u.useMemo(()=>Xe(F),[F.color,F.elevation,F.offsetY,F.opacity,F.radius]),w=u.useCallback((n,m,s=!1,D=!1,x)=>{const f=n.type===""&&!n.text,p=f||s&&W,G=p?void 0:()=>ge(n.text,n.type),ne=s?r.closeBackground:r.keyBackground,A=s?r.closeActiveBackground:r.keyActiveBackground,P=s?r.closeText:r.keyText,oe=s?r.closeText:r.keyTextActive,se=x??(s?h.closeHeight:h.keyHeight),le=Math.round(h.fontSize*.64),Ke=n.type==="close"||n.type==="extra"||n.type==="delete"?le:h.fontSize,k=n.text??"",N=n.type==="delete"?ye?.()??ie??"⌫":n.type==="extra"?S?S(k):k||"⌨︎":n.type==="close"?K??"完成":X?X(k):k;return e.jsx(Ne,{onPress:G,disabled:p,style:[{opacity:f?1:p?.6:1},D?{width:"100%",flexBasis:"auto",flexGrow:0,alignSelf:"stretch"}:{flexBasis:0,flexGrow:n.wider?2:1,flexShrink:1,minWidth:0}],accessible:!f,accessibilityRole:f?void 0:"button",accessibilityLabel:f?void 0:n.type==="delete"?"delete":n.type==="close"?K??"close":n.type==="extra"?k||"collapse":k,accessibilityState:f?void 0:{disabled:!!p},accessibilityElementsHidden:f,importantForAccessibility:f?"no-hide-descendants":void 0,children:({pressed:i})=>{const B=i&&!p,E=p?r.keyBackground:B?A:ne,ke=B?oe:P;return e.jsx(y,{style:[v.key,{height:se,backgroundColor:E,borderRadius:be.key}],children:s&&W?e.jsx(qe,{size:18,color:ke}):typeof N=="string"||typeof N=="number"?e.jsx(H,{style:[v.keyText,{color:ke,fontSize:Ke}],children:N}):N==null||N===!1?null:N})}},`${n.type}-${m}-${n.text??m}`)},[W,r.closeActiveBackground,r.closeBackground,r.closeText,r.keyActiveBackground,r.keyBackground,r.keyText,r.keyTextActive,ie,ye,S,ge,X,be.key,h.closeHeight,h.fontSize,h.keyHeight,K]),Z=u.useRef(new re.Value(t?1:0)).current,M=u.useRef(null),J=u.useRef(0),[ze,_e]=u.useState(0),[Oe,De]=u.useState(t),Be=we===!1?0:Ie;u.useEffect(()=>{J.current+=1;const n=J.current;t&&De(!0),M.current?.stop();const m=re.timing(Z,{toValue:t?1:0,duration:Be,useNativeDriver:et,easing:t?z.out(z.cubic):z.in(z.cubic)});return M.current=m,m.start(({finished:s})=>{s&&!t&&J.current===n&&De(!1)}),()=>{M.current?.stop(),M.current=null}},[Z,t,Be]);const He=Z.interpolate({inputRange:[0,1],outputRange:[ze||320,0]}),$e=u.useCallback(n=>{const{height:m}=n.nativeEvent.layout;_e(s=>Math.abs(m-s)>.5?m:s)},[]),Q=!T&&(o||$),ee=h.keyHeight*2+c.keyGap,te=u.useMemo(()=>{const n={paddingHorizontal:c.titlePadding},m=[v.defaultRow,{flexDirection:"column",flexWrap:"nowrap",paddingHorizontal:c.paddingHorizontal,paddingTop:c.keyGap,paddingBottom:c.keyGap,gap:c.keyGap}],s={flexDirection:"row",gap:c.keyGap},D=[v.customRow,{paddingHorizontal:c.paddingHorizontal,paddingTop:Q?0:c.keyGap,paddingBottom:c.keyGap,width:"100%"}],x=[v.customMain,{flexDirection:"column",flexWrap:"nowrap",gap:c.keyGap}],f=[v.customSidebar,{gap:c.keyGap,marginLeft:c.keyGap}],p=Ce.map((i,B)=>({key:i,index:B})),G=[];for(let i=0;i<p.length;i+=3)G.push(p.slice(i,i+3));const ne=e.jsx(y,{style:m,children:G.map((i,B)=>e.jsx(y,{style:s,children:i.map(E=>w(E.key,E.index))},`l-${B}`))}),A=[];for(let i=0;i<9&&i<p.length;i+=3)A.push(p.slice(i,i+3));const P=p.slice(9);P.length===1?A.push([{key:{type:""},index:1000001},P[0],{key:{type:""},index:1000002}]):P.length&&A.push(P);const oe=e.jsx(y,{style:x,children:A.map((i,B)=>e.jsx(y,{style:s,children:i.map(E=>w(E.key,E.index))},`cl-${B}`))}),se=R?w({type:"delete"},999,!1,!0,ee):null,le=w({type:"close"},1e3,!0,!0,ee);return{headerNode:Q?e.jsxs(y,{style:[v.header,n],children:[e.jsx(H,{style:[v.title,v.titleOverlay,{color:r.title,fontSize:h.titleFontSize}],numberOfLines:1,children:o}),K?e.jsx(Ne,{onPress:j,style:v.headerClose,accessibilityRole:"button",accessibilityLabel:K,children:e.jsx(H,{style:{color:r.title},children:K})}):null]}):null,bodyNode:T?e.jsxs(y,{style:D,children:[oe,e.jsxs(y,{style:f,children:[se,le]})]}):ne,safeAreaNode:ve&&e.jsx(Qe,{edge:"bottom"})}},[j,r.title,ee,S,Q,T,Ce,w,K,ve,h.titleFontSize,c.keyGap,c.paddingHorizontal,c.titlePadding,o]);return!Oe&&!t?null:e.jsx(Ue,{children:e.jsxs(re.View,{...Se,pointerEvents:t?"auto":"none",onLayout:$e,style:[v.wrapper,Ge,Re,{transform:[{translateY:He}],backgroundColor:r.background}],children:[te.headerNode,te.bodyNode,te.safeAreaNode]})})}),v=We.create({wrapper:{position:"absolute",left:0,right:0,bottom:0},header:{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",height:44,position:"relative"},title:{fontWeight:"600"},titleOverlay:{position:"absolute",left:12,right:12,textAlign:"center"},headerClose:{minWidth:56,alignItems:"flex-end"},key:{justifyContent:"center",alignItems:"center"},keyText:{includeFontPadding:!1,textAlign:"center"},defaultRow:{flexDirection:"row",flexWrap:"wrap"},customRow:{flexDirection:"row"},customMain:{flex:3,flexDirection:"row",flexWrap:"wrap"},customSidebar:{flex:1,flexDirection:"column",justifyContent:"flex-start"}});g.displayName="NumberKeyboard";function Fe(){const[l,t]=I.useState(null),o=V=>t(V),d=()=>t(null),b=V=>Ee.info({message:`输入 ${V}`,duration:800}),a=()=>Ee.info({message:"删除",duration:800});return e.jsxs(y,{style:{gap:12},children:[e.jsxs(C.Group,{children:[e.jsx(C,{title:"弹出默认键盘",isLink:!0,onPress:()=>o("v1")}),e.jsx(C,{title:"弹出带右侧栏的键盘",isLink:!0,onPress:()=>o("v2")}),e.jsx(C,{title:"弹出身份证号键盘",isLink:!0,onPress:()=>o("v3")}),e.jsx(C,{title:"弹出带标题的键盘",isLink:!0,onPress:()=>o("v4")}),e.jsx(C,{title:"弹出配置多个按键的键盘",isLink:!0,onPress:()=>o("v5")}),e.jsx(C,{title:"弹出配置随机数字的键盘",isLink:!0,onPress:()=>o("v6")})]}),e.jsx(g,{visible:l==="v1",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{theme:"custom",extraKey:".",closeButtonText:"完成",visible:l==="v2",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{extraKey:"X",closeButtonText:"完成",visible:l==="v3",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{title:"键盘标题",extraKey:".",closeButtonText:"完成",visible:l==="v4",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{theme:"custom",extraKey:["00","."],closeButtonText:"完成",visible:l==="v5",onBlur:d,onInput:b,onDelete:a}),e.jsx(g,{randomKeyOrder:!0,visible:l==="v6",onBlur:d,onInput:b,onDelete:a})]})}const lt=`import React from 'react'
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
`}},title:"基础用法",identifier:"number-keyboard-basic",lang:"tsx",meta:{title:"基础用法"}};function Te(){const[l,t]=I.useState(!1);return e.jsxs(y,{style:{gap:12},children:[e.jsx(C.Group,{children:e.jsx(C,{title:"自定义按键",isLink:!0,onPress:()=>t(!0)})}),e.jsx(g,{visible:l,theme:"custom",extraKey:[".","确认"],closeButtonText:"完成",numberKeyRender:o=>e.jsx(H,{style:{fontSize:24},children:o}),deleteButtonText:"退格",onClose:()=>t(!1),onBlur:()=>t(!1)})]})}const it=`import React from 'react'
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
`}},title:"自定义按键",identifier:"number-keyboard-custom",lang:"tsx",meta:{title:"自定义按键"}};function Ae(){const[l,t]=I.useState(!1),[o,d]=I.useState("123");return e.jsxs(y,{style:{gap:12},children:[e.jsx(tt,{label:"双向绑定",value:o,readOnly:!0,placeholder:"点击唤起键盘",onClick:()=>t(!0)}),e.jsx(g,{visible:l,value:o,maxlength:6,onChange:d,onClose:()=>t(!1),blurOnClose:!0})]})}const at=`import React from 'react'
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
`}},title:"双向绑定",identifier:"number-keyboard-controlled",lang:"tsx",meta:{title:"双向绑定"}}],xt={simulator:{compact:!0}},pt=[{depth:1,text:"NumberKeyboard 数字键盘",id:"numberkeyboard-数字键盘"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义按键",id:"自定义按键"},{depth:3,text:"双向绑定",id:"双向绑定"},{depth:2,text:"API",id:"api"}],vt="/docs/components/number-keyboard.md",yt="NumberKeyboard 数字键盘",bt="1769570039000",sn=l=>l.children({MdContent:dt,demos:mt,frontmatter:xt,slugs:pt,filePath:vt,title:yt,updatedTime:bt});export{dt as MdContent,sn as default,mt as demos,vt as filePath,xt as frontmatter,pt as slugs,yt as title,bt as updatedTime};
