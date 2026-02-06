import{R as ae,r,j as e,a as T,V as F,c as ze,s as Le}from"./main-CC2DK3OK.js";import{S as $}from"./Info-B1ZwkZv6.js";import{S as Ve}from"./Arrow-CP2eQgBg.js";import{S as Te}from"./Close-BKbx2ovl.js";import{a as R}from"./number-BG570ZaL.js";import{c as We,T as w}from"./createComponentTokensHook-BcXZOvON.js";import{A as a,E as ie}from"./Animated-C-b5K9fC.js";import{M as oe}from"./index-CN-rk8sC.js";import{P as $e}from"./index-CJrLMJTa.js";import{u as ce}from"./useAriaPress-DVn62gIQ.js";import{n as W}from"./animation-BpxpeSKC.js";import"./IconBase-BNmvoXvm.js";import"./extends-CF3RwP-h.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./index-D_JlQYPg.js";const He=s=>{const{palette:x,fontSize:c,spacing:v,radii:_}=s;return{colors:{text:x.warning[600],background:x.warning[50]},typography:{fontSize:c.sm},layout:{minHeight:40,radius:_.lg,sideMinWidth:24},spacing:{paddingHorizontal:v.lg,paddingVertical:v.sm,wrapPaddingVertical:v.md,sidePadding:v.sm}}},Oe=We("noticeBar",He),qe=a.createAnimatedComponent(w);{const s=typeof globalThis<"u"?globalThis:window;s.global===void 0&&(s.global=s)}const Ye=s=>{const{text:x,children:c,color:v,background:_,leftIcon:H,rightIcon:fe,mode:k,tokensOverride:pe,delay:he=1,speed:je=60,scrollable:ye,wrapable:h=!1,direction:ve="horizontal",items:C,verticalInterval:Be=3e3,verticalDuration:Ne=300,onPress:S,onClose:O,onReplay:q,textProps:Fe,style:Ee,...be}=s,n=Oe(pe),d=v??n.colors.text,Ae=_??n.colors.background,E=x??c,Y=T(E),m=ve==="vertical",[j,ge]=r.useState(!0),{onLayout:b,...A}=Fe??{},[g,De]=r.useState(0),[D,Ce]=r.useState(0),l=r.useRef(new a.Value(0)).current,X=Math.max(0,R(he,1)),I=R(je,60),G=Math.max(0,R(Be,3e3)),J=Math.max(0,R(Ne,300)),y=r.useMemo(()=>{if(!m)return[];if(C&&C.length)return C;const t=ae.Children.toArray(c);return t.length?t:x!==void 0?[x]:[]},[c,m,C,x]),B=m&&y.length>1,P=r.useMemo(()=>B?[...y,y[0]]:y,[B,y]),f=r.useRef(new a.Value(0)).current,[N,Ie]=r.useState(0),M=r.useCallback(t=>{De(i=>Math.abs(i-t)<.5?i:t)},[]),K=r.useCallback(t=>{Ce(i=>Math.abs(i-t)<.5?i:t)},[]),Q=r.useRef(O);Q.current=O;const U=r.useRef(q);U.current=q;const Pe=r.useCallback(()=>{ge(!1),Q.current?.()},[]),Me=ce({disabled:k!=="closeable"||!j,onPress:Pe,extraProps:{accessibilityRole:"button",accessibilityLabel:"关闭"}}),Z=ce({disabled:!S||!j,onPress:S,extraProps:S?{accessibilityRole:"button"}:void 0}),z=k==="closeable"?e.jsx(oe,{hitSlop:8,...Me.interactionProps,children:e.jsx(Te,{size:16,fill:d,color:d})}):k==="link"?e.jsx(Ve,{size:16,fill:d,color:d}):fe||null,L=ze(H),ee=!!z,Re=Math.max(0,D-(L?n.spacing.sidePadding:0)-(ee?n.spacing.sidePadding:0)),V=!m&&!h&&(ye??g>Re);r.useEffect(()=>{if(!j){l.stopAnimation();return}if(m){l.stopAnimation();return}if(!V||g===0||D===0){l.setValue(0);return}if(I<=0||!Number.isFinite(I)){l.setValue(0);return}let t=!1;const i=(g+D)/I*1e3,u=ke=>{l.setValue(ke?0:D),a.sequence([a.delay(X*1e3),a.timing(l,{toValue:-g,duration:i,easing:ie.linear,useNativeDriver:W})]).start(({finished:Se})=>{Se&&!t&&(U.current?.(),u(!1))})};return u(!0),()=>{t=!0,l.stopAnimation()}},[V,l,j,X,I,g,D,m]),r.useEffect(()=>{if(!j){f.stopAnimation();return}if(!B||N===0){f.setValue(0);return}const t=[];for(let u=1;u<=y.length;u+=1)t.push(a.delay(G),a.timing(f,{toValue:-N*u,duration:J,easing:ie.linear,useNativeDriver:W}));t.push(a.timing(f,{toValue:0,duration:0,useNativeDriver:W}));const i=a.loop(a.sequence(t));return i.start(),()=>{i.stop(),f.stopAnimation()}},[j,B,N,J,G,y,f]);const te=r.useCallback(t=>{const i=t?.nativeEvent?.layout?.height;i&&Ie(u=>u===0||Math.abs(u-i)>=.5?i:u)},[]),we=r.useMemo(()=>{if(!m||P.length===0)return null;if(!B){const t=P[0];return T(t)?e.jsx(w,{onLayout:b,style:[o.text,{color:d,fontSize:n.typography.fontSize}],numberOfLines:1,ellipsizeMode:"tail",...A,children:t}):t}return e.jsx(F,{style:[o.verticalViewport,N?{height:N}:void 0],pointerEvents:"none",children:e.jsx(a.View,{style:[o.verticalTrack,{transform:[{translateY:f}]}],children:P.map((t,i)=>e.jsx(F,{onLayout:i===0?te:void 0,style:o.verticalItem,children:T(t)?e.jsx(w,{onLayout:b,style:[o.text,{color:d,fontSize:n.typography.fontSize}],numberOfLines:1,ellipsizeMode:"tail",...A,children:t}):t},i))})})},[te,B,m,N,d,A,b,n.typography.fontSize,P,f]),_e=r.useCallback(t=>{K(t.nativeEvent.layout.width)},[K]),re=r.useCallback(t=>{M(t.nativeEvent.layout.width),b?.(t)},[M,b]),ne=r.useCallback(t=>M(t.nativeEvent.layout.width),[M]);return j?e.jsxs(oe,{style:[o.container,{backgroundColor:Ae,paddingHorizontal:n.spacing.paddingHorizontal,paddingVertical:h?n.spacing.wrapPaddingVertical:n.spacing.paddingVertical,minHeight:n.layout.minHeight,borderRadius:n.layout.radius},Ee],disabled:Z.states.disabled,...Z.interactionProps,...be,children:[L?e.jsx(F,{style:[o.sideSection,{minWidth:n.layout.sideMinWidth}],children:H}):null,e.jsx(F,{onLayout:_e,style:[o.content,h&&o.contentWrap,L&&{paddingLeft:n.spacing.sidePadding},ee&&{paddingRight:n.spacing.sidePadding}],pointerEvents:"none",children:m?we:V?Y?e.jsx(qe,{onLayout:re,style:[o.text,o.scrollText,{color:d,fontSize:n.typography.fontSize,transform:[{translateX:l}]}],...A,children:E}):e.jsx(a.View,{onLayout:ne,style:[o.text,{transform:[{translateX:l}]}],children:E}):Y?e.jsx(w,{onLayout:re,style:[o.text,{color:d,fontSize:n.typography.fontSize},h&&o.wrapText],numberOfLines:h?void 0:1,ellipsizeMode:h?"tail":"clip",...A,children:E}):e.jsx(F,{onLayout:ne,style:[o.text,h&&o.wrapText],children:E})}),z?e.jsx(F,{style:[o.sideSection,{minWidth:n.layout.sideMinWidth}],children:z}):null]}):null},o=Le.create({container:{flexDirection:"row",alignItems:"center"},sideSection:{alignItems:"center",justifyContent:"center"},content:{flex:1,flexDirection:"row",overflow:"hidden"},text:{flexShrink:0},scrollText:$e.select({web:{whiteSpace:"nowrap",textOverflow:"clip"},default:{}}),wrapText:{flexWrap:"wrap",flexShrink:1},contentWrap:{flexDirection:"column"},verticalViewport:{width:"100%",overflow:"hidden"},verticalTrack:{flexDirection:"column",width:"100%"},verticalItem:{width:"100%",justifyContent:"center"}}),p=ae.memo(Ye);p.displayName="NoticeBar";function se(){return e.jsx(p,{scrollable:!0,leftIcon:e.jsx($,{size:16,fill:"#f97316",color:"#f97316"}),text:"技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"})}const Xe=`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarBaseDemo() {
  return (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
  )
}
`,Ge={code:Xe,sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarBaseDemo() {
  return (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarBaseDemo() {
  return (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
  )
}
`}},title:"基础用法",identifier:"notice-bar-base",lang:"tsx",meta:{title:"基础用法"}};function le(){return e.jsxs(e.Fragment,{children:[e.jsx(p,{mode:"closeable",children:"可关闭通知栏"}),e.jsx(p,{mode:"link",style:{marginTop:12},children:"链接模式通知栏"})]})}const Je=`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarModeDemo() {
  return (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
  )
}
`,Ke={code:Je,sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarModeDemo() {
  return (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarModeDemo() {
  return (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
  )
}
`}},title:"通知栏模式",identifier:"notice-bar-mode",lang:"tsx",meta:{title:"通知栏模式"}};function ue(){return e.jsx(p,{color:"#2563eb",background:"#e0edff",leftIcon:e.jsx($,{size:16,fill:"#2563eb",color:"#2563eb"}),children:"自定义颜色通知栏"})}const Qe=`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarStyleDemo() {
  return (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
  )
}
`,Ue={code:Qe,sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarStyleDemo() {
  return (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarStyleDemo() {
  return (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
  )
}
`}},title:"自定义样式",identifier:"notice-bar-style",lang:"tsx",meta:{title:"自定义样式"}},Ze="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。";function de(){return e.jsx(p,{text:Ze,scrollable:!0,delay:0})}const et=`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarScrollDemo() {
  return <NoticeBar text={text} scrollable delay={0} />
}
`,tt={code:et,sources:{_:{tsx:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarScrollDemo() {
  return <NoticeBar text={text} scrollable delay={0} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarScrollDemo() {
  return <NoticeBar text={text} scrollable delay={0} />
}
`}},title:"滚动播放",identifier:"notice-bar-scroll",lang:"tsx",meta:{title:"滚动播放"}},rt="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。";function me(){return e.jsx(p,{text:rt,wrapable:!0,scrollable:!1,leftIcon:e.jsx($,{size:16,fill:"#f97316",color:"#f97316"})})}const nt=`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarWrapDemo() {
  return (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
  )
}
`,it={code:nt,sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarWrapDemo() {
  return (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarWrapDemo() {
  return (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
  )
}
`}},title:"多行展示",identifier:"notice-bar-wrap",lang:"tsx",meta:{title:"多行展示"}},ot=["内容 1","内容 2","内容 3"];function xe(){return e.jsx(p,{direction:"vertical",items:ot})}const ct=`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default function NoticeBarVerticalDemo() {
  return <NoticeBar direction="vertical" items={messages} />
}
`,at={code:ct,sources:{_:{tsx:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default function NoticeBarVerticalDemo() {
  return <NoticeBar direction="vertical" items={messages} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default function NoticeBarVerticalDemo() {
  return <NoticeBar direction="vertical" items={messages} />
}
`}},title:"垂直滚动",identifier:"notice-bar-vertical",lang:"tsx",meta:{title:"垂直滚动"}},st=function({previewer:s=()=>null,api:x=()=>null}){const c=s;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"noticebar-通知栏","data-anchor":"noticebar-通知栏",children:"NoticeBar 通知栏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"用于循环滚动展示通知信息，支持可关闭、可点击链接与自定义图标，常用于系统公告和营销提醒。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(c,{code:"import { NoticeBar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(c,{...Ge,children:e.jsx(se,{})})}),e.jsx("h3",{id:"通知栏模式","data-anchor":"通知栏模式",children:"通知栏模式"}),e.jsxs("p",{children:[e.jsx("code",{children:'mode="closeable"'})," 显示关闭按钮，",e.jsx("code",{children:'mode="link"'})," 显示箭头。"]}),e.jsx("div",{children:e.jsx(c,{...Ke,children:e.jsx(le,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"color"}),"、",e.jsx("code",{children:"background"})," 自定义配色。"]}),e.jsx("div",{children:e.jsx(c,{...Ue,children:e.jsx(ue,{})})}),e.jsx("h3",{id:"滚动播放","data-anchor":"滚动播放",children:"滚动播放"}),e.jsx("p",{children:"内容溢出时可开启滚动。"}),e.jsx("div",{children:e.jsx(c,{...tt,children:e.jsx(de,{})})}),e.jsx("h3",{id:"多行展示","data-anchor":"多行展示",children:"多行展示"}),e.jsxs("p",{children:["选择 ",e.jsx("code",{children:"wrapable"})," 可改为换行展示。"]}),e.jsx("div",{children:e.jsx(c,{...it,children:e.jsx(me,{})})}),e.jsx("h3",{id:"垂直滚动","data-anchor":"垂直滚动",children:"垂直滚动"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:'direction="vertical"'})," 并提供 ",e.jsx("code",{children:"items"})," 数据源即可实现垂直轮播效果。"]}),e.jsx("div",{children:e.jsx(c,{...at,children:e.jsx(xe,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsxs("td",{children:["通知文本内容（与 ",e.jsx("code",{children:"children"})," 互斥）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"文本颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#f97316"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#fff7cc"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftIcon"})}),e.jsx("td",{children:"自定义左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightIcon"})}),e.jsx("td",{children:"自定义右侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mode"})}),e.jsx("td",{children:"通知栏模式"}),e.jsx("td",{children:e.jsx("code",{children:"'closeable' | 'link'"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"delay"})}),e.jsx("td",{children:"滚动延迟（秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"speed"})}),e.jsx("td",{children:"滚动速度（px/s）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"60"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"scrollable"})}),e.jsx("td",{children:"是否强制开启滚动"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"内容溢出时自动"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"wrapable"})}),e.jsx("td",{children:"是否换行，仅在不滚动时生效"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsxs("td",{children:["滚动方向，",e.jsx("code",{children:"horizontal"})," / ",e.jsx("code",{children:"vertical"})]}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal' | 'vertical'"})}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"items"})}),e.jsxs("td",{children:["垂直滚动时要循环展示的内容，不传时回退到 ",e.jsx("code",{children:"text"}),"/",e.jsx("code",{children:"children"})]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"verticalInterval"})}),e.jsx("td",{children:"垂直滚动的停留时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"verticalDuration"})}),e.jsx("td",{children:"垂直滚动的切换动画时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭按钮点击回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsx("td",{children:"整体点击回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onReplay"})}),e.jsx("td",{children:"每次横向滚动重新开始时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前滚动能力依赖 ",e.jsx("code",{children:"Animated"})," 与 ",e.jsx("code",{children:"measure"})," API，在 React Native Web 环境下需要组件挂载完成后才能正确计算宽度；纯原生端不受此限制。"]})})]})})},lt=[{Component:se,key:"notice-bar-base",sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarBaseDemo() {
  return (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarBaseDemo() {
  return (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
  )
}
`}},title:"基础用法",identifier:"notice-bar-base",lang:"tsx",meta:{title:"基础用法"}},{Component:le,key:"notice-bar-mode",sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarModeDemo() {
  return (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarModeDemo() {
  return (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
  )
}
`}},title:"通知栏模式",identifier:"notice-bar-mode",lang:"tsx",meta:{title:"通知栏模式"}},{Component:ue,key:"notice-bar-style",sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarStyleDemo() {
  return (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default function NoticeBarStyleDemo() {
  return (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
  )
}
`}},title:"自定义样式",identifier:"notice-bar-style",lang:"tsx",meta:{title:"自定义样式"}},{Component:de,key:"notice-bar-scroll",sources:{_:{tsx:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarScrollDemo() {
  return <NoticeBar text={text} scrollable delay={0} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarScrollDemo() {
  return <NoticeBar text={text} scrollable delay={0} />
}
`}},title:"滚动播放",identifier:"notice-bar-scroll",lang:"tsx",meta:{title:"滚动播放"}},{Component:me,key:"notice-bar-wrap",sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarWrapDemo() {
  return (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default function NoticeBarWrapDemo() {
  return (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
  )
}
`}},title:"多行展示",identifier:"notice-bar-wrap",lang:"tsx",meta:{title:"多行展示"}},{Component:xe,key:"notice-bar-vertical",sources:{_:{tsx:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default function NoticeBarVerticalDemo() {
  return <NoticeBar direction="vertical" items={messages} />
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default function NoticeBarVerticalDemo() {
  return <NoticeBar direction="vertical" items={messages} />
}
`}},title:"垂直滚动",identifier:"notice-bar-vertical",lang:"tsx",meta:{title:"垂直滚动"}}],ut={simulator:{compact:!0}},dt=[{depth:1,text:"NoticeBar 通知栏",id:"noticebar-通知栏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"通知栏模式",id:"通知栏模式"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"滚动播放",id:"滚动播放"},{depth:3,text:"多行展示",id:"多行展示"},{depth:3,text:"垂直滚动",id:"垂直滚动"},{depth:2,text:"API",id:"api"}],mt="/docs/components/notice-bar.md",xt="NoticeBar 通知栏",ft="1770373480000",Mt=s=>s.children({MdContent:st,demos:lt,frontmatter:ut,slugs:dt,filePath:mt,title:xt,updatedTime:ft});export{st as MdContent,Mt as default,lt as demos,mt as filePath,ut as frontmatter,dt as slugs,xt as title,ft as updatedTime};
