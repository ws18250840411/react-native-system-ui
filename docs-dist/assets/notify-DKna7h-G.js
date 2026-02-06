import{R as u,j as e,r as f,V as N,a as De,b as Ae,d as ze}from"./main-CC2DK3OK.js";import{C as l}from"./index-Dueh9AzQ.js";import{P as v}from"./Portal-D9I31KH1.js";import{c as Ve,T as $e}from"./createComponentTokensHook-BcXZOvON.js";import{u as qe}from"./useSafeAreaPadding-B0opQgwg.js";import{A as b,E as w}from"./Animated-C-b5K9fC.js";import{M as Ze}from"./index-CN-rk8sC.js";import{u as Ke}from"./useOverlayStack-xa377Hoz.js";import{n as Fe}from"./animation-BpxpeSKC.js";import{u as Ye}from"./useAriaPress-DVn62gIQ.js";import"./Arrow-CP2eQgBg.js";import"./IconBase-BNmvoXvm.js";import"./hairline-Bq3nniT3.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./index-D_JlQYPg.js";const Je=t=>({defaults:{type:"primary",position:"top",duration:3e3,closeOnClick:!1,animationDuration:180,safeAreaInsetTop:!0,safeAreaInsetBottom:!0},layout:{portal:{position:"absolute",left:0,right:0},container:{width:"100%"},safeArea:{width:"100%"},content:{width:"100%",justifyContent:"center"},text:{textAlign:"center",includeFontPadding:!1}},colors:{variants:{primary:{background:t.palette.primary[500],text:t.palette.primary.foreground??"#ffffff"},success:{background:t.palette.success[500],text:t.palette.success.foreground??"#ffffff"},danger:{background:t.palette.danger[500],text:t.palette.danger.foreground??"#ffffff"},warning:{background:t.palette.warning[500],text:t.palette.warning.foreground??"#261400"}}},typography:{fontSize:t.fontSize.sm,lineHeight:Math.round(t.fontSize.sm*t.typography.lineHeightMultiplier)},sizing:{minHeight:35},spacing:{paddingVertical:t.spacing.ssm,paddingHorizontal:t.spacing.md,none:t.spacing.none}}),Qe=Ve("notify",Je),Ue=t=>{const{visible:i,message:s,type:o,duration:m,position:d,offset:x,color:T,background:j,zIndex:D,closeOnClick:E,style:se,textStyle:oe,tokensOverride:Ie,onClick:_,onClose:re,onOpen:ue,onOpened:le,onClosed:ce}=t,n=Qe(Ie),de=qe({top:0,bottom:0}),Me=o??n.defaults.type,c=d??n.defaults.position,O=E??n.defaults.closeOnClick,Te=t.safeAreaInsetTop??(c==="top"?n.defaults.safeAreaInsetTop:!1),H=t.safeAreaInsetBottom??(c==="bottom"?n.defaults.safeAreaInsetBottom:!1),S=Te&&c==="top"?de.paddingTop:0,z=H&&c==="bottom"?de.paddingBottom:0,C=typeof x=="number"&&Number.isFinite(x)?Math.max(0,x):0,V=(r,a)=>typeof r=="string"?`calc(${r} + ${a}px)`:r+a,ae=H&&c==="bottom"&&typeof z=="number"?z+C:C,fe=c==="top"?V(S,C):void 0,$=H&&c==="bottom"?V(z,C):void 0,pe=n.colors.variants[Me],me=j??pe.background,he=T??pe.text,q=m??n.defaults.duration,Z=f.useRef(re);Z.current=re;const xe=f.useRef(ue);xe.current=ue;const K=f.useRef(le);K.current=le;const ye=f.useRef(ce);ye.current=ce;const je=f.useRef(_);je.current=_;const[Y,_e]=u.useState(0),Ce=f.useCallback(r=>{const a=r.nativeEvent.layout.height;a&&_e(B=>B===a?B:a)},[]),J=Y>0,[A,Q]=u.useState(i),h=u.useRef(new b.Value(0)).current,g=u.useRef(null),U=u.useRef(0),{zIndex:Oe}=Ke({visible:A,type:"notify",zIndex:D}),W=Oe??D,X=u.useRef(i),k=u.useRef(!1);u.useEffect(()=>{U.current+=1;const r=U.current;g.current?.stop();const a=n.defaults.animationDuration;if(i){if(Q(!0),!J){h.setValue(0);return}g.current=b.timing(h,{toValue:1,duration:a,easing:w.out(w.cubic),useNativeDriver:Fe,isInteraction:!1}),g.current.start()}else{if(!J){h.setValue(0),Q(!1);return}g.current=b.timing(h,{toValue:0,duration:a,easing:w.out(w.cubic),useNativeDriver:Fe,isInteraction:!1}),g.current.start(({finished:B})=>{!B||r!==U.current||Q(!1)})}},[h,J,n.defaults.animationDuration,i]),u.useEffect(()=>()=>{g.current?.stop()},[]),u.useEffect(()=>{let r=null;if(i){if(k.current=!1,!X.current&&(xe.current?.(),K.current)){const a=K.current;r=setTimeout(a,n.defaults.animationDuration)}}else X.current&&(k.current=!0);return X.current=i,()=>{r&&clearTimeout(r)}},[n.defaults.animationDuration,i]),u.useEffect(()=>{!A&&k.current&&(k.current=!1,ye.current?.())},[A]),u.useEffect(()=>{let r=null;return i&&q>0&&(r=setTimeout(()=>{Z.current?.()},q)),()=>{r&&clearTimeout(r)}},[q,i]);const F=Y>0?Y:n.sizing.minHeight,y=O||Ae(_),He=f.useCallback(()=>{je.current?.(),O&&Z.current?.()},[O]),ee=y?"button":"alert",Se=Ye({disabled:!y,onPress:He,extraProps:{accessibilityRole:ee,accessibilityLiveRegion:"assertive"}}),ge=f.useMemo(()=>c==="bottom"?h.interpolate({inputRange:[0,1],outputRange:[F,0]}):h.interpolate({inputRange:[0,1],outputRange:[-F,0]}),[h,F,c]),Ne=s!=null&&s!==!1&&s!=="",Ee=f.useMemo(()=>e.jsxs(N,{style:[n.layout.container,c==="top"?{paddingTop:fe??V(S,C)}:null,$!==void 0?{paddingBottom:$}:null],children:[e.jsx(N,{style:{height:F,overflow:"hidden"},children:e.jsx(b.View,{testID:"rv-notify-bar",accessibilityRole:y?void 0:ee,accessibilityLiveRegion:y?void 0:"assertive",onLayout:Ce,style:[n.layout.container,{opacity:h,transform:[{translateY:ge}]},se],children:e.jsx(N,{style:{backgroundColor:me},children:e.jsx(N,{style:[n.layout.content,{paddingHorizontal:n.spacing.paddingHorizontal,paddingVertical:n.spacing.paddingVertical,minHeight:n.sizing.minHeight}],children:Ne?De(s)?e.jsx($e,{style:[n.layout.text,{color:he,fontSize:n.typography.fontSize,lineHeight:n.typography.lineHeight},oe],children:s}):s:null})})})}),c==="bottom"?e.jsx(N,{style:{height:ae}}):null]}),[ee,h,F,Ce,Ne,y,s,C,n.spacing.paddingVertical,c,me,he,ae,S,se,oe,n.layout.container,n.layout.content,n.layout.text,n.sizing.minHeight,n.spacing.paddingHorizontal,n.typography.fontSize,n.typography.lineHeight,ge,$,fe]);return A?e.jsx(N,{testID:"rv-notify",pointerEvents:y?"box-none":"none",style:[n.layout.portal,c==="bottom"?{bottom:0}:{top:0},W!=null?{zIndex:W}:null],children:y?e.jsx(Ze,{...Se.interactionProps,disabled:!y,children:Ee}):Ee}):null},te=u.memo(Ue),We=t=>e.jsx(v,{children:e.jsx(te,{...t})}),ke=u.memo(We);te.displayName="NotifyContent";ke.displayName="Notify";const I=new Set,L=new Map,M=new Map;let Be=!1;const ne={type:"primary",position:"top",duration:3e3,safeAreaInsetTop:!0,safeAreaInsetBottom:!0};let R={...ne};const G=new Map,Pe=t=>u.isValidElement(t)||De(t)?{message:t}:t??{},Xe=(t,i)=>{const s=t.type??i,o={...R,...G.get(s)},m={...o,...t,type:s};return m.duration=m.duration??o.duration??3e3,m},ie=t=>{v.remove(t),I.delete(t),L.delete(t),M.delete(t)},be=t=>{const i=M.get(t);i?i.close():ie(t)},ve=({id:t,options:i})=>{const[s,o]=f.useState(!0);f.useEffect(()=>(M.set(t,{close:()=>o(!1)}),()=>{M.delete(t)}),[t]);const m=()=>{i.onClose?.(),o(!1)},d=()=>{i.onClosed?.(),ie(t)};return e.jsx(te,{...i,visible:s,onClose:m,onClosed:d})},P=(t,i="primary")=>{const s=Xe(Pe(t),i);Be||Array.from(I).forEach(d=>ie(d));const o=v.add(null);L.set(o,s),v.update(o,e.jsx(ve,{id:o,options:s})),I.add(o);const m=d=>{const x=L.get(o);if(!x)return;const T=Ae(d)?d(x):d,j=Pe(T),D=j.type??x.type??i,E={...x,...j,type:D};"duration"in j&&j.duration==null&&(E.duration=ne.duration),L.set(o,E),v.update(o,e.jsx(ve,{id:o,options:E}))};return{clear:()=>be(o),update:d=>m(d),config:m}},et={show:t=>P(t),primary:t=>P(t,"primary"),success:t=>P(t,"success"),danger:t=>P(t,"danger"),warning:t=>P(t,"warning"),clear:()=>{I.forEach(t=>be(t))},allowMultiple:(t=!0)=>{Be=t},setDefaultOptions:(t,i)=>{ze(t)?G.set(t,i??{}):R={...R,...t}},resetDefaultOptions:t=>{t?G.delete(t):(R={...ne},G.clear())}},p=Object.assign(ke,et);function we(){return e.jsxs(l.Group,{children:[e.jsx(l,{title:"显示通知",isLink:!0,onPress:()=>p.show("提示内容")}),e.jsx(l,{title:"底部通知",isLink:!0,onPress:()=>p.show({message:"底部提示",position:"bottom"})}),e.jsx(l,{title:"底部通知（偏移）",isLink:!0,onPress:()=>p.show({message:"底部偏移",position:"bottom",offset:12})})]})}const tt=`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
      <Cell
        title="底部通知"
        isLink
        onPress={() => Notify.show({ message: '底部提示', position: 'bottom' })}
      />
      <Cell
        title="底部通知（偏移）"
        isLink
        onPress={() =>
          Notify.show({
            message: '底部偏移',
            position: 'bottom',
            offset: 12,
          })
        }
      />
    </Cell.Group>
  )
}

`,nt={code:tt,sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
      <Cell
        title="底部通知"
        isLink
        onPress={() => Notify.show({ message: '底部提示', position: 'bottom' })}
      />
      <Cell
        title="底部通知（偏移）"
        isLink
        onPress={() =>
          Notify.show({
            message: '底部偏移',
            position: 'bottom',
            offset: 12,
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
      <Cell
        title="底部通知"
        isLink
        onPress={() => Notify.show({ message: '底部提示', position: 'bottom' })}
      />
      <Cell
        title="底部通知（偏移）"
        isLink
        onPress={() =>
          Notify.show({
            message: '底部偏移',
            position: 'bottom',
            offset: 12,
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"基础用法",identifier:"notify-basic",lang:"tsx",meta:{title:"基础用法"}};function Le(){return e.jsxs(l.Group,{children:[e.jsx(l,{title:"主要通知",isLink:!0,onPress:()=>p.primary("主要提示")}),e.jsx(l,{title:"成功通知",isLink:!0,onPress:()=>p.success("操作成功")}),e.jsx(l,{title:"危险通知",isLink:!0,onPress:()=>p.danger("操作失败")}),e.jsx(l,{title:"警告通知",isLink:!0,onPress:()=>p.warning("请注意风险")})]})}const it=`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyTypeDemo() {
  return (
    <Cell.Group>
      <Cell title="主要通知" isLink onPress={() => Notify.primary('主要提示')} />
      <Cell title="成功通知" isLink onPress={() => Notify.success('操作成功')} />
      <Cell title="危险通知" isLink onPress={() => Notify.danger('操作失败')} />
      <Cell title="警告通知" isLink onPress={() => Notify.warning('请注意风险')} />
    </Cell.Group>
  )
}

`,st={code:it,sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyTypeDemo() {
  return (
    <Cell.Group>
      <Cell title="主要通知" isLink onPress={() => Notify.primary('主要提示')} />
      <Cell title="成功通知" isLink onPress={() => Notify.success('操作成功')} />
      <Cell title="危险通知" isLink onPress={() => Notify.danger('操作失败')} />
      <Cell title="警告通知" isLink onPress={() => Notify.warning('请注意风险')} />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyTypeDemo() {
  return (
    <Cell.Group>
      <Cell title="主要通知" isLink onPress={() => Notify.primary('主要提示')} />
      <Cell title="成功通知" isLink onPress={() => Notify.success('操作成功')} />
      <Cell title="危险通知" isLink onPress={() => Notify.danger('操作失败')} />
      <Cell title="警告通知" isLink onPress={() => Notify.warning('请注意风险')} />
    </Cell.Group>
  )
}

`}},title:"通知类型",identifier:"notify-type",lang:"tsx",meta:{title:"通知类型"}};function Re(){return e.jsxs(l.Group,{children:[e.jsx(l,{title:"持续展示（手动关闭）",isLink:!0,onPress:()=>p.show({message:"不会自动关闭",duration:0})}),e.jsx(l,{title:"动态更新",isLink:!0,onPress:()=>{const t=p.show({message:"处理中...",duration:0});setTimeout(()=>{t.config({type:"success",message:"完成",duration:1500})},1e3)}}),e.jsx(l,{title:"关闭所有通知",isLink:!0,onPress:()=>p.clear()})]})}const ot=`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyDurationDemo() {
  return (
    <Cell.Group>
      <Cell
        title="持续展示（手动关闭）"
        isLink
        onPress={() => Notify.show({ message: '不会自动关闭', duration: 0 })}
      />
      <Cell
        title="动态更新"
        isLink
        onPress={() => {
          const notify = Notify.show({ message: '处理中...', duration: 0 })
          setTimeout(() => {
            notify.config({ type: 'success', message: '完成', duration: 1500 })
          }, 1000)
        }}
      />
      <Cell title="关闭所有通知" isLink onPress={() => Notify.clear()} />
    </Cell.Group>
  )
}

`,rt={code:ot,sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyDurationDemo() {
  return (
    <Cell.Group>
      <Cell
        title="持续展示（手动关闭）"
        isLink
        onPress={() => Notify.show({ message: '不会自动关闭', duration: 0 })}
      />
      <Cell
        title="动态更新"
        isLink
        onPress={() => {
          const notify = Notify.show({ message: '处理中...', duration: 0 })
          setTimeout(() => {
            notify.config({ type: 'success', message: '完成', duration: 1500 })
          }, 1000)
        }}
      />
      <Cell title="关闭所有通知" isLink onPress={() => Notify.clear()} />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyDurationDemo() {
  return (
    <Cell.Group>
      <Cell
        title="持续展示（手动关闭）"
        isLink
        onPress={() => Notify.show({ message: '不会自动关闭', duration: 0 })}
      />
      <Cell
        title="动态更新"
        isLink
        onPress={() => {
          const notify = Notify.show({ message: '处理中...', duration: 0 })
          setTimeout(() => {
            notify.config({ type: 'success', message: '完成', duration: 1500 })
          }, 1000)
        }}
      />
      <Cell title="关闭所有通知" isLink onPress={() => Notify.clear()} />
    </Cell.Group>
  )
}

`}},title:"动态更新",identifier:"notify-duration",lang:"tsx",meta:{title:"动态更新"}};function Ge(){return e.jsx(l.Group,{children:e.jsx(l,{title:"自定义背景色",isLink:!0,onPress:()=>p.show({message:"自定义样式",color:"#ffffff",background:"#722ed1"})})})}const ut=`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义背景色"
        isLink
        onPress={() =>
          Notify.show({
            message: '自定义样式',
            color: '#ffffff',
            background: '#722ed1',
          })
        }
      />
    </Cell.Group>
  )
}

`,lt={code:ut,sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义背景色"
        isLink
        onPress={() =>
          Notify.show({
            message: '自定义样式',
            color: '#ffffff',
            background: '#722ed1',
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义背景色"
        isLink
        onPress={() =>
          Notify.show({
            message: '自定义样式',
            color: '#ffffff',
            background: '#722ed1',
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"自定义颜色",identifier:"notify-custom",lang:"tsx",meta:{title:"自定义颜色"}},ct=function({previewer:t=()=>null,api:i=()=>null}){const s=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"notify-消息提示","data-anchor":"notify-消息提示",children:"Notify 消息提示"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在页面顶部/底部展示通知文案，常用于全局消息提醒。"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["默认情况下 Notify 不会阻止页面交互（不拦截点击/滚动）；当设置 ",e.jsx("code",{children:"onClick"})," 或 ",e.jsx("code",{children:"closeOnClick"})," 时才会响应点击。"]})}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Notify } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["使用 Notify 前，需在应用根节点包裹 ",e.jsx("strong",{children:"ConfigProvider"})," 或 ",e.jsx("strong",{children:"Portal.Host"}),"，否则弹层无法挂载。推荐使用 ",e.jsx("a",{href:"./config-provider.md",children:"ConfigProvider"}),"。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(s,{...nt,children:e.jsx(we,{})})}),e.jsx("h3",{id:"通知类型","data-anchor":"通知类型",children:"通知类型"}),e.jsx("div",{children:e.jsx(s,{...st,children:e.jsx(Le,{})})}),e.jsx("h3",{id:"持续展示与动态更新","data-anchor":"持续展示与动态更新",children:"持续展示与动态更新"}),e.jsx("div",{children:e.jsx(s,{...rt,children:e.jsx(Re,{})})}),e.jsx("h3",{id:"自定义颜色","data-anchor":"自定义颜色",children:"自定义颜色"}),e.jsx("div",{children:e.jsx(s,{...lt,children:e.jsx(Ge,{})})}),e.jsx("h3",{id:"静态调用","data-anchor":"静态调用",children:"静态调用"}),e.jsxs("p",{children:["Notify 支持 ",e.jsx("code",{children:"show/primary/success/danger/warning"})," 等静态方法，直接在任意位置调用即可展示通知。"]}),e.jsx(s,{code:`Notify.show('提示内容')
Notify.success({ message: '操作成功', duration: 2000 })
Notify.warning({ message: '注意检查参数', position: 'bottom', offset: 12 })`,lang:"ts"}),e.jsx("p",{children:"静态方法会返回句柄，可用于更新或关闭："}),e.jsx(s,{code:`const notify = Notify.show({ message: '处理中...', duration: 0 })
notify.config({ type: 'success', message: '完成', duration: 1500 })`,lang:"ts"}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示（受控模式）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"message"})}),e.jsx("td",{children:"通知内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"通知类型"}),e.jsx("td",{children:e.jsx("code",{children:"'primary' | 'success' | 'danger' | 'warning'"})}),e.jsx("td",{children:e.jsx("code",{children:"'primary'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"自动关闭延时（ms），0 表示不会自动关闭"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"position"})}),e.jsx("td",{children:"展示位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'bottom'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetTop"})}),e.jsxs("td",{children:["是否为顶部增加安全区（",e.jsx("code",{children:'position="top"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsxs("td",{children:["是否为底部增加安全区（",e.jsx("code",{children:'position="bottom"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"offset"})}),e.jsx("td",{children:"顶部/底部额外偏移（px）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClick"})}),e.jsx("td",{children:"点击通知后是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"自定义层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击通知时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭时触发（静态和受控模式均会回调）"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpened"})}),e.jsx("td",{children:"完全展示后的回调函数"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"动画结束后触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"静态方法","data-anchor":"静态方法",children:"静态方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"`Notify.show(options \\"}),e.jsx("td",{children:"message)`"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.primary / success / danger / warning(options)"})}),e.jsxs("td",{children:["快捷方法，自动设置 ",e.jsx("code",{children:"type"}),"，返回 ",e.jsxs("code",{children:["{"," clear, config, update ","}"]})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.clear()"})}),e.jsx("td",{children:"关闭所有通过静态方法创建的通知"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.allowMultiple(value)"})}),e.jsx("td",{children:"是否允许多个 Notify 同时存在，默认单例"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.setDefaultOptions(options)"})}),e.jsxs("td",{children:["设置全局默认配置，或针对某个 ",e.jsx("code",{children:"type"})," 设置默认项"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.resetDefaultOptions(type?)"})}),e.jsxs("td",{children:["重置默认配置，",e.jsx("code",{children:"type"})," 为空时清空所有默认项"]})]})]})]})]})})},dt=[{Component:we,key:"notify-basic",sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
      <Cell
        title="底部通知"
        isLink
        onPress={() => Notify.show({ message: '底部提示', position: 'bottom' })}
      />
      <Cell
        title="底部通知（偏移）"
        isLink
        onPress={() =>
          Notify.show({
            message: '底部偏移',
            position: 'bottom',
            offset: 12,
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyBasicDemo() {
  return (
    <Cell.Group>
      <Cell title="显示通知" isLink onPress={() => Notify.show('提示内容')} />
      <Cell
        title="底部通知"
        isLink
        onPress={() => Notify.show({ message: '底部提示', position: 'bottom' })}
      />
      <Cell
        title="底部通知（偏移）"
        isLink
        onPress={() =>
          Notify.show({
            message: '底部偏移',
            position: 'bottom',
            offset: 12,
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"基础用法",identifier:"notify-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:Le,key:"notify-type",sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyTypeDemo() {
  return (
    <Cell.Group>
      <Cell title="主要通知" isLink onPress={() => Notify.primary('主要提示')} />
      <Cell title="成功通知" isLink onPress={() => Notify.success('操作成功')} />
      <Cell title="危险通知" isLink onPress={() => Notify.danger('操作失败')} />
      <Cell title="警告通知" isLink onPress={() => Notify.warning('请注意风险')} />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyTypeDemo() {
  return (
    <Cell.Group>
      <Cell title="主要通知" isLink onPress={() => Notify.primary('主要提示')} />
      <Cell title="成功通知" isLink onPress={() => Notify.success('操作成功')} />
      <Cell title="危险通知" isLink onPress={() => Notify.danger('操作失败')} />
      <Cell title="警告通知" isLink onPress={() => Notify.warning('请注意风险')} />
    </Cell.Group>
  )
}

`}},title:"通知类型",identifier:"notify-type",lang:"tsx",meta:{title:"通知类型"}},{Component:Re,key:"notify-duration",sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyDurationDemo() {
  return (
    <Cell.Group>
      <Cell
        title="持续展示（手动关闭）"
        isLink
        onPress={() => Notify.show({ message: '不会自动关闭', duration: 0 })}
      />
      <Cell
        title="动态更新"
        isLink
        onPress={() => {
          const notify = Notify.show({ message: '处理中...', duration: 0 })
          setTimeout(() => {
            notify.config({ type: 'success', message: '完成', duration: 1500 })
          }, 1000)
        }}
      />
      <Cell title="关闭所有通知" isLink onPress={() => Notify.clear()} />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyDurationDemo() {
  return (
    <Cell.Group>
      <Cell
        title="持续展示（手动关闭）"
        isLink
        onPress={() => Notify.show({ message: '不会自动关闭', duration: 0 })}
      />
      <Cell
        title="动态更新"
        isLink
        onPress={() => {
          const notify = Notify.show({ message: '处理中...', duration: 0 })
          setTimeout(() => {
            notify.config({ type: 'success', message: '完成', duration: 1500 })
          }, 1000)
        }}
      />
      <Cell title="关闭所有通知" isLink onPress={() => Notify.clear()} />
    </Cell.Group>
  )
}

`}},title:"动态更新",identifier:"notify-duration",lang:"tsx",meta:{title:"动态更新"}},{Component:Ge,key:"notify-custom",sources:{_:{tsx:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义背景色"
        isLink
        onPress={() =>
          Notify.show({
            message: '自定义样式',
            color: '#ffffff',
            background: '#722ed1',
          })
        }
      />
    </Cell.Group>
  )
}

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Notify } from 'react-native-system-ui'

export default function NotifyCustomDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义背景色"
        isLink
        onPress={() =>
          Notify.show({
            message: '自定义样式',
            color: '#ffffff',
            background: '#722ed1',
          })
        }
      />
    </Cell.Group>
  )
}

`}},title:"自定义颜色",identifier:"notify-custom",lang:"tsx",meta:{title:"自定义颜色"}}],at={simulator:{compact:!0}},ft=[{depth:1,text:"Notify 消息提示",id:"notify-消息提示"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"通知类型",id:"通知类型"},{depth:3,text:"持续展示与动态更新",id:"持续展示与动态更新"},{depth:3,text:"自定义颜色",id:"自定义颜色"},{depth:3,text:"静态调用",id:"静态调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"静态方法",id:"静态方法"}],pt="/docs/components/notify.md",mt="Notify 消息提示",ht="1769769521000",Gt=t=>t.children({MdContent:ct,demos:dt,frontmatter:at,slugs:ft,filePath:pt,title:mt,updatedTime:ht});export{ct as MdContent,Gt as default,dt as demos,pt as filePath,at as frontmatter,ft as slugs,mt as title,ht as updatedTime};
