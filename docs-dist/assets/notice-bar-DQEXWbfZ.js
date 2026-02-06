import{r,R as _e,j as e,a as V,V as b,c as ke,s as ze}from"./main-CX5QgiXt.js";import{S as $}from"./Info-CMTof8NR.js";import{S as Le}from"./Arrow-CFMZgj_G.js";import{S as Se}from"./Close-D6NXA1XS.js";import{a as R}from"./number-DMCxwktP.js";import{c as Te,T as w}from"./createComponentTokensHook-Hc3l7riF.js";import{A as s,E as ie}from"./Animated-rPtBS5kg.js";import{M as re}from"./index-CQ2P49YQ.js";import{P as Ve}from"./index-CJrLMJTa.js";import{u as ne}from"./useAriaPress-sIRcrStb.js";import{n as W}from"./animation-BpxpeSKC.js";import"./IconBase-D_kjvpJY.js";import"./extends-CF3RwP-h.js";import"./index-BEnr4R_B.js";import"./index-CTcRCRb2.js";import"./index-BDzwQtXM.js";const We=a=>{const{palette:m,fontSize:c,spacing:y,radii:_}=a;return{colors:{text:m.warning[600],background:m.warning[50]},typography:{fontSize:c.sm},layout:{minHeight:40,radius:_.lg,sideMinWidth:24},spacing:{paddingHorizontal:y.lg,paddingVertical:y.sm,wrapPaddingVertical:y.md,sidePadding:y.sm}}},$e=Te("noticeBar",We),He=s.createAnimatedComponent(w);{const a=typeof globalThis<"u"?globalThis:window;a.global===void 0&&(a.global=a)}const p=a=>{const{text:m,children:c,color:y,background:_,leftIcon:H,rightIcon:de,mode:k,tokensOverride:xe,delay:me=1,speed:he=60,scrollable:pe,wrapable:f=!1,direction:fe="horizontal",items:I,verticalInterval:je=3e3,verticalDuration:ve=300,onPress:z,onClose:O,onReplay:q,textProps:ye,style:Fe,...Be}=a,i=$e(xe),d=y??i.colors.text,be=_??i.colors.background,E=m??c,Y=V(E),x=fe==="vertical",[j,Ee]=r.useState(!0),{onLayout:N,...A}=ye??{},[g,Ne]=r.useState(0),[C,Ae]=r.useState(0),l=r.useRef(new s.Value(0)).current,X=Math.max(0,R(me,1)),D=R(he,60),G=Math.max(0,R(je,3e3)),J=Math.max(0,R(ve,300)),v=r.useMemo(()=>{if(!x)return[];if(I&&I.length)return I;const t=_e.Children.toArray(c);return t.length?t:m!==void 0?[m]:[]},[c,x,I,m]),F=x&&v.length>1,P=r.useMemo(()=>F?[...v,v[0]]:v,[F,v]),h=r.useRef(new s.Value(0)).current,[B,ge]=r.useState(0),M=r.useCallback(t=>{Ne(n=>Math.abs(n-t)<.5?n:t)},[]),K=r.useCallback(t=>{Ae(n=>Math.abs(n-t)<.5?n:t)},[]),Ce=r.useCallback(()=>{Ee(!1),O?.()},[O]),Ie=ne({disabled:k!=="closeable"||!j,onPress:Ce,extraProps:{accessibilityRole:"button",accessibilityLabel:"关闭"}}),Q=ne({disabled:!z||!j,onPress:z,extraProps:z?{accessibilityRole:"button"}:void 0}),L=k==="closeable"?e.jsx(re,{hitSlop:8,...Ie.interactionProps,children:e.jsx(Se,{size:16,fill:d,color:d})}):k==="link"?e.jsx(Le,{size:16,fill:d,color:d}):de||null,S=ke(H),U=!!L,De=Math.max(0,C-(S?i.spacing.sidePadding:0)-(U?i.spacing.sidePadding:0)),T=!x&&!f&&(pe??g>De);r.useEffect(()=>{if(!j){l.stopAnimation();return}if(x){l.stopAnimation();return}if(!T||g===0||C===0){l.setValue(0);return}if(D<=0||!Number.isFinite(D)){l.setValue(0);return}let t=!1;const n=(g+C)/D*1e3,u=Re=>{l.setValue(Re?0:C),s.sequence([s.delay(X*1e3),s.timing(l,{toValue:-g,duration:n,easing:ie.linear,useNativeDriver:W})]).start(({finished:we})=>{we&&!t&&(q?.(),u(!1))})};return u(!0),()=>{t=!0,l.stopAnimation()}},[T,l,j,X,D,g,C,q,x]),r.useEffect(()=>{if(!j){h.stopAnimation();return}if(!F||B===0){h.setValue(0);return}const t=[];for(let u=1;u<=v.length;u+=1)t.push(s.delay(G),s.timing(h,{toValue:-B*u,duration:J,easing:ie.linear,useNativeDriver:W}));t.push(s.timing(h,{toValue:0,duration:0,useNativeDriver:W}));const n=s.loop(s.sequence(t));return n.start(),()=>{n.stop(),h.stopAnimation()}},[j,F,B,J,G,v,h]);const Z=r.useCallback(t=>{const n=t?.nativeEvent?.layout?.height;n&&ge(u=>u===0||Math.abs(u-n)>=.5?n:u)},[]),Pe=r.useMemo(()=>{if(!x||P.length===0)return null;if(!F){const t=P[0];return V(t)?e.jsx(w,{onLayout:N,style:[o.text,{color:d,fontSize:i.typography.fontSize}],numberOfLines:1,ellipsizeMode:"tail",...A,children:t}):t}return e.jsx(b,{style:[o.verticalViewport,B?{height:B}:void 0],pointerEvents:"none",children:e.jsx(s.View,{style:[o.verticalTrack,{transform:[{translateY:h}]}],children:P.map((t,n)=>e.jsx(b,{onLayout:n===0?Z:void 0,style:o.verticalItem,children:V(t)?e.jsx(w,{onLayout:N,style:[o.text,{color:d,fontSize:i.typography.fontSize}],numberOfLines:1,ellipsizeMode:"tail",...A,children:t}):t},n))})})},[Z,F,x,B,d,A,N,i.typography.fontSize,P,h]),Me=r.useCallback(t=>{K(t.nativeEvent.layout.width)},[K]),ee=r.useCallback(t=>{M(t.nativeEvent.layout.width),N?.(t)},[M,N]),te=r.useCallback(t=>M(t.nativeEvent.layout.width),[M]);return j?e.jsxs(re,{style:[o.container,{backgroundColor:be,paddingHorizontal:i.spacing.paddingHorizontal,paddingVertical:f?i.spacing.wrapPaddingVertical:i.spacing.paddingVertical,minHeight:i.layout.minHeight,borderRadius:i.layout.radius},Fe],disabled:Q.states.disabled,...Q.interactionProps,...Be,children:[S?e.jsx(b,{style:[o.sideSection,{minWidth:i.layout.sideMinWidth}],children:H}):null,e.jsx(b,{onLayout:Me,style:[o.content,f&&o.contentWrap,S&&{paddingLeft:i.spacing.sidePadding},U&&{paddingRight:i.spacing.sidePadding}],pointerEvents:"none",children:x?Pe:T?Y?e.jsx(He,{onLayout:ee,style:[o.text,o.scrollText,{color:d,fontSize:i.typography.fontSize,transform:[{translateX:l}]}],...A,children:E}):e.jsx(s.View,{onLayout:te,style:[o.text,{transform:[{translateX:l}]}],children:E}):Y?e.jsx(w,{onLayout:ee,style:[o.text,{color:d,fontSize:i.typography.fontSize},f&&o.wrapText],numberOfLines:f?void 0:1,ellipsizeMode:f?"tail":"clip",...A,children:E}):e.jsx(b,{onLayout:te,style:[o.text,f&&o.wrapText],children:E})}),L?e.jsx(b,{style:[o.sideSection,{minWidth:i.layout.sideMinWidth}],children:L}):null]}):null},o=ze.create({container:{flexDirection:"row",alignItems:"center"},sideSection:{alignItems:"center",justifyContent:"center"},content:{flex:1,flexDirection:"row",overflow:"hidden"},text:{flexShrink:0},scrollText:Ve.select({web:{whiteSpace:"nowrap",textOverflow:"clip"},default:{}}),wrapText:{flexWrap:"wrap",flexShrink:1},contentWrap:{flexDirection:"column"},verticalViewport:{width:"100%",overflow:"hidden"},verticalTrack:{flexDirection:"column",width:"100%"},verticalItem:{width:"100%",justifyContent:"center"}});p.displayName="NoticeBar";const oe=()=>e.jsx(p,{scrollable:!0,leftIcon:e.jsx($,{size:16,fill:"#f97316",color:"#f97316"}),text:"技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"}),Oe=`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
)
`,qe={code:Oe,sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
)
`}},title:"基础用法",identifier:"notice-bar-base",lang:"tsx",meta:{title:"基础用法"}},ce=()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{mode:"closeable",children:"可关闭通知栏"}),e.jsx(p,{mode:"link",style:{marginTop:12},children:"链接模式通知栏"})]}),Ye=`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
)
`,Xe={code:Ye,sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
)
`}},title:"通知栏模式",identifier:"notice-bar-mode",lang:"tsx",meta:{title:"通知栏模式"}},se=()=>e.jsx(p,{color:"#2563eb",background:"#e0edff",leftIcon:e.jsx($,{size:16,fill:"#2563eb",color:"#2563eb"}),children:"自定义颜色通知栏"}),Ge=`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
)
`,Je={code:Ge,sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
)
`}},title:"自定义样式",identifier:"notice-bar-style",lang:"tsx",meta:{title:"自定义样式"}},Ke="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。",ae=()=>e.jsx(p,{text:Ke,scrollable:!0,delay:0}),Qe=`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => <NoticeBar text={text} scrollable delay={0} />
`,Ue={code:Qe,sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => <NoticeBar text={text} scrollable delay={0} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => <NoticeBar text={text} scrollable delay={0} />
`}},title:"滚动播放",identifier:"notice-bar-scroll",lang:"tsx",meta:{title:"滚动播放"}},Ze="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。",le=()=>e.jsx(p,{text:Ze,wrapable:!0,scrollable:!1,leftIcon:e.jsx($,{size:16,fill:"#f97316",color:"#f97316"})}),et=`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
)
`,tt={code:et,sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
)
`}},title:"多行展示",identifier:"notice-bar-wrap",lang:"tsx",meta:{title:"多行展示"}},it=["内容 1","内容 2","内容 3"],ue=()=>e.jsx(p,{direction:"vertical",items:it}),rt=`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default () => <NoticeBar direction="vertical" items={messages} />
`,nt={code:rt,sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default () => <NoticeBar direction="vertical" items={messages} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default () => <NoticeBar direction="vertical" items={messages} />
`}},title:"垂直滚动",identifier:"notice-bar-vertical",lang:"tsx",meta:{title:"垂直滚动"}},ot=function({previewer:a=()=>null,api:m=()=>null}){const c=a;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"noticebar-通知栏","data-anchor":"noticebar-通知栏",children:"NoticeBar 通知栏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"循环播放展示一组消息通知，默认交互遵循移动端常见习惯。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(c,{code:"import { NoticeBar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(c,{...qe,children:e.jsx(oe,{})})}),e.jsx("h3",{id:"通知栏模式","data-anchor":"通知栏模式",children:"通知栏模式"}),e.jsxs("p",{children:[e.jsx("code",{children:'mode="closeable"'})," 显示关闭按钮，",e.jsx("code",{children:'mode="link"'})," 显示箭头。"]}),e.jsx("div",{children:e.jsx(c,{...Xe,children:e.jsx(ce,{})})}),e.jsx("h3",{id:"自定义样式","data-anchor":"自定义样式",children:"自定义样式"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"color"}),"、",e.jsx("code",{children:"background"})," 自定义配色。"]}),e.jsx("div",{children:e.jsx(c,{...Je,children:e.jsx(se,{})})}),e.jsx("h3",{id:"滚动播放","data-anchor":"滚动播放",children:"滚动播放"}),e.jsx("p",{children:"内容溢出时可开启滚动。"}),e.jsx("div",{children:e.jsx(c,{...Ue,children:e.jsx(ae,{})})}),e.jsx("h3",{id:"多行展示","data-anchor":"多行展示",children:"多行展示"}),e.jsxs("p",{children:["选择 ",e.jsx("code",{children:"wrapable"})," 可改为换行展示。"]}),e.jsx("div",{children:e.jsx(c,{...tt,children:e.jsx(le,{})})}),e.jsx("h3",{id:"垂直滚动","data-anchor":"垂直滚动",children:"垂直滚动"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:'direction="vertical"'})," 并提供 ",e.jsx("code",{children:"items"})," 数据源即可实现垂直轮播效果。"]}),e.jsx("div",{children:e.jsx(c,{...nt,children:e.jsx(ue,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsxs("td",{children:["通知文本内容（与 ",e.jsx("code",{children:"children"})," 互斥）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"文本颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#f97316"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#fff7cc"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftIcon"})}),e.jsx("td",{children:"自定义左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightIcon"})}),e.jsx("td",{children:"自定义右侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"mode"})}),e.jsx("td",{children:"通知栏模式"}),e.jsx("td",{children:e.jsx("code",{children:"'closeable' | 'link'"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"delay"})}),e.jsx("td",{children:"滚动延迟（秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"speed"})}),e.jsx("td",{children:"滚动速度（px/s）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"60"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"scrollable"})}),e.jsx("td",{children:"是否强制开启滚动"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"内容溢出时自动"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"wrapable"})}),e.jsx("td",{children:"是否换行，仅在不滚动时生效"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsxs("td",{children:["滚动方向，",e.jsx("code",{children:"horizontal"})," / ",e.jsx("code",{children:"vertical"})]}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal' | 'vertical'"})}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"items"})}),e.jsxs("td",{children:["垂直滚动时要循环展示的内容，不传时回退到 ",e.jsx("code",{children:"text"}),"/",e.jsx("code",{children:"children"})]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"verticalInterval"})}),e.jsx("td",{children:"垂直滚动的停留时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"verticalDuration"})}),e.jsx("td",{children:"垂直滚动的切换动画时长（毫秒）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭按钮点击回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsx("td",{children:"整体点击回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onReplay"})}),e.jsx("td",{children:"每次横向滚动重新开始时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前滚动能力依赖 ",e.jsx("code",{children:"Animated"})," 与 ",e.jsx("code",{children:"measure"})," API，在 React Native Web 环境下需要组件挂载完成后才能正确计算宽度；纯原生端不受此限制。"]})})]})})},ct=[{Component:oe,key:"notice-bar-base",sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    scrollable
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
    text="技术是开发它的人的共同灵魂，在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
)
`}},title:"基础用法",identifier:"notice-bar-base",lang:"tsx",meta:{title:"基础用法"}},{Component:ce,key:"notice-bar-mode",sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <>
    <NoticeBar mode="closeable">可关闭通知栏</NoticeBar>
    <NoticeBar mode="link" style={{ marginTop: 12 }}>
      链接模式通知栏
    </NoticeBar>
  </>
)
`}},title:"通知栏模式",identifier:"notice-bar-mode",lang:"tsx",meta:{title:"通知栏模式"}},{Component:se,key:"notice-bar-style",sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

export default () => (
  <NoticeBar
    color="#2563eb"
    background="#e0edff"
    leftIcon={<Info size={16} fill="#2563eb" color="#2563eb" />}
  >
    自定义颜色通知栏
  </NoticeBar>
)
`}},title:"自定义样式",identifier:"notice-bar-style",lang:"tsx",meta:{title:"自定义样式"}},{Component:ae,key:"notice-bar-scroll",sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => <NoticeBar text={text} scrollable delay={0} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => <NoticeBar text={text} scrollable delay={0} />
`}},title:"滚动播放",identifier:"notice-bar-scroll",lang:"tsx",meta:{title:"滚动播放"}},{Component:le,key:"notice-bar-wrap",sources:{_:{tsx:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Info } from 'react-native-system-icon'
import { NoticeBar } from 'react-native-system-ui'

const text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'

export default () => (
  <NoticeBar
    text={text}
    wrapable
    scrollable={false}
    leftIcon={<Info size={16} fill="#f97316" color="#f97316" />}
  />
)
`}},title:"多行展示",identifier:"notice-bar-wrap",lang:"tsx",meta:{title:"多行展示"}},{Component:ue,key:"notice-bar-vertical",sources:{_:{tsx:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default () => <NoticeBar direction="vertical" items={messages} />
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { NoticeBar } from 'react-native-system-ui'

const messages = ['内容 1', '内容 2', '内容 3']

export default () => <NoticeBar direction="vertical" items={messages} />
`}},title:"垂直滚动",identifier:"notice-bar-vertical",lang:"tsx",meta:{title:"垂直滚动"}}],st={simulator:{compact:!0}},at=[{depth:1,text:"NoticeBar 通知栏",id:"noticebar-通知栏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"通知栏模式",id:"通知栏模式"},{depth:3,text:"自定义样式",id:"自定义样式"},{depth:3,text:"滚动播放",id:"滚动播放"},{depth:3,text:"多行展示",id:"多行展示"},{depth:3,text:"垂直滚动",id:"垂直滚动"},{depth:2,text:"API",id:"api"}],lt="/docs/components/notice-bar.md",ut="NoticeBar 通知栏",dt="1769570039000",It=a=>a.children({MdContent:ot,demos:ct,frontmatter:st,slugs:at,filePath:lt,title:ut,updatedTime:dt});export{ot as MdContent,It as default,ct as demos,lt as filePath,st as frontmatter,at as slugs,ut as title,dt as updatedTime};
