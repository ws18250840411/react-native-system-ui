import{R as u,j as e,r as N,V as g,a as Ne,b as Ee,d as Te}from"./main-BuQiU471.js";import{C as l}from"./index-CvjfcfGO.js";import{P as v}from"./Portal-Bl5GJ6OP.js";import{c as _e,T as He}from"./createComponentTokensHook-BZh_OSSd.js";import{u as Oe}from"./useSafeAreaPadding-Dnz88xZy.js";import{A as w,E as L}from"./Animated-CaOvDCxr.js";import{M as Se}from"./index-BRfylSA6.js";import{u as ze}from"./useOverlayStack-B_-drOoO.js";import{n as je}from"./animation-BpxpeSKC.js";import{u as Ve}from"./useAriaPress-D5uAXibC.js";import"./Arrow-xfLuWLNA.js";import"./IconBase-CrFgzAiS.js";import"./hairline-MnVzd1gq.js";import"./Overlay-BCBJ7Bg0.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-CfLKkUWT.js";import"./index-BAZkLH96.js";import"./index-Ct6-Nt5P.js";const $e=t=>({defaults:{type:"primary",position:"top",duration:3e3,closeOnClick:!1,animationDuration:180,safeAreaInsetTop:!0,safeAreaInsetBottom:!0},layout:{portal:{position:"absolute",left:0,right:0},container:{width:"100%"},safeArea:{width:"100%"},content:{width:"100%",justifyContent:"center"},text:{textAlign:"center",includeFontPadding:!1}},colors:{variants:{primary:{background:t.palette.primary[500],text:t.palette.primary.foreground??"#ffffff"},success:{background:t.palette.success[500],text:t.palette.success.foreground??"#ffffff"},danger:{background:t.palette.danger[500],text:t.palette.danger.foreground??"#ffffff"},warning:{background:t.palette.warning[500],text:t.palette.warning.foreground??"#261400"}}},typography:{fontSize:t.fontSize.sm,lineHeight:Math.round(t.fontSize.sm*t.typography.lineHeightMultiplier)},sizing:{minHeight:35},spacing:{paddingVertical:t.spacing.ssm,paddingHorizontal:t.spacing.md,none:t.spacing.none}}),qe=_e("notify",$e),Ze=t=>{const{visible:i,message:s,type:o,duration:f,position:d,offset:h,color:_,background:y,zIndex:D,closeOnClick:E,style:se,textStyle:oe,tokensOverride:be,onClick:H,onClose:A,onOpen:re,onOpened:O,onClosed:ue}=t,n=qe(be),le=Oe({top:0,bottom:0}),we=o??n.defaults.type,c=d??n.defaults.position,S=E??n.defaults.closeOnClick,Le=t.safeAreaInsetTop??(c==="top"?n.defaults.safeAreaInsetTop:!1),z=t.safeAreaInsetBottom??(c==="bottom"?n.defaults.safeAreaInsetBottom:!1),V=Le&&c==="top"?le.paddingTop:0,$=z&&c==="bottom"?le.paddingBottom:0,j=typeof h=="number"&&Number.isFinite(h)?Math.max(0,h):0,q=(r,m)=>typeof r=="string"?`calc(${r} + ${m}px)`:r+m,ce=z&&c==="bottom"&&typeof $=="number"?$+j:j,de=c==="top"?q(V,j):void 0,Z=z&&c==="bottom"?q($,j):void 0,ae=n.colors.variants[we],fe=y??ae.background,pe=_??ae.text,K=f??n.defaults.duration,[Y,Re]=u.useState(0),me=N.useCallback(r=>{const m=r.nativeEvent.layout.height;m&&Re(b=>b===m?b:m)},[]),J=Y>0,[k,Q]=u.useState(i),p=u.useRef(new w.Value(0)).current,C=u.useRef(null),U=u.useRef(0),{zIndex:Ge}=ze({visible:k,type:"notify",zIndex:D}),W=Ge??D,X=u.useRef(i),B=u.useRef(!1);u.useEffect(()=>{U.current+=1;const r=U.current;C.current?.stop();const m=n.defaults.animationDuration;if(i){if(Q(!0),!J){p.setValue(0);return}C.current=w.timing(p,{toValue:1,duration:m,easing:L.out(L.cubic),useNativeDriver:je,isInteraction:!1}),C.current.start()}else{if(!J){p.setValue(0),Q(!1);return}C.current=w.timing(p,{toValue:0,duration:m,easing:L.out(L.cubic),useNativeDriver:je,isInteraction:!1}),C.current.start(({finished:b})=>{!b||r!==U.current||Q(!1)})}},[p,J,n.defaults.animationDuration,i]),u.useEffect(()=>()=>{C.current?.stop()},[]),u.useEffect(()=>{let r=null;return i?(B.current=!1,X.current||(re?.(),O&&(r=setTimeout(O,n.defaults.animationDuration)))):X.current&&(B.current=!0),X.current=i,()=>{r&&clearTimeout(r)}},[re,O,n.defaults.animationDuration,i]),u.useEffect(()=>{!k&&B.current&&(B.current=!1,ue?.())},[k,ue]),u.useEffect(()=>{let r=null;return i&&K>0&&(r=setTimeout(()=>{A?.()},K)),()=>{r&&clearTimeout(r)}},[A,K,i]);const F=Y>0?Y:n.sizing.minHeight,x=S||Ee(H),Ie=N.useCallback(()=>{H?.(),S&&A?.()},[S,H,A]),ee=x?"button":"alert",Me=Ve({disabled:!x,onPress:Ie,extraProps:{accessibilityRole:ee,accessibilityLiveRegion:"assertive"}}),he=N.useMemo(()=>c==="bottom"?p.interpolate({inputRange:[0,1],outputRange:[F,0]}):p.interpolate({inputRange:[0,1],outputRange:[-F,0]}),[p,F,c]),xe=s!=null&&s!==!1&&s!=="",ye=N.useMemo(()=>e.jsxs(g,{style:[n.layout.container,c==="top"?{paddingTop:de??q(V,j)}:null,Z!==void 0?{paddingBottom:Z}:null],children:[e.jsx(g,{style:{height:F,overflow:"hidden"},children:e.jsx(w.View,{testID:"rv-notify-bar",accessibilityRole:x?void 0:ee,accessibilityLiveRegion:x?void 0:"assertive",onLayout:me,style:[n.layout.container,{opacity:p,transform:[{translateY:he}]},se],children:e.jsx(g,{style:{backgroundColor:fe},children:e.jsx(g,{style:[n.layout.content,{paddingHorizontal:n.spacing.paddingHorizontal,paddingVertical:n.spacing.paddingVertical,minHeight:n.sizing.minHeight}],children:xe?Ne(s)?e.jsx(He,{style:[n.layout.text,{color:pe,fontSize:n.typography.fontSize,lineHeight:n.typography.lineHeight},oe],children:s}):s:null})})})}),c==="bottom"?e.jsx(g,{style:{height:ce}}):null]}),[ee,p,F,me,xe,x,s,j,n.spacing.paddingVertical,c,fe,pe,ce,V,se,oe,n.layout.container,n.layout.content,n.layout.text,n.sizing.minHeight,n.spacing.paddingHorizontal,n.typography.fontSize,n.typography.lineHeight,he,Z,de]);return k?e.jsx(g,{testID:"rv-notify",pointerEvents:x?"box-none":"none",style:[n.layout.portal,c==="bottom"?{bottom:0}:{top:0},W!=null?{zIndex:W}:null],children:x?e.jsx(Se,{...Me.interactionProps,disabled:!x,children:ye}):ye}):null},te=u.memo(Ze),Ke=t=>e.jsx(v,{children:e.jsx(te,{...t})}),Fe=u.memo(Ke);te.displayName="NotifyContent";Fe.displayName="Notify";const M=new Set,R=new Map,T=new Map;let Pe=!1;const ne={type:"primary",position:"top",duration:3e3,safeAreaInsetTop:!0,safeAreaInsetBottom:!0};let G={...ne};const I=new Map,Ce=t=>u.isValidElement(t)||Ne(t)?{message:t}:t??{},Ye=(t,i)=>{const s=t.type??i,o={...G,...I.get(s)},f={...o,...t,type:s};return f.duration=f.duration??o.duration??3e3,f},ie=t=>{v.remove(t),M.delete(t),R.delete(t),T.delete(t)},ve=t=>{const i=T.get(t);i?i.close():ie(t)},ge=({id:t,options:i})=>{const[s,o]=N.useState(!0);N.useEffect(()=>(T.set(t,{close:()=>o(!1)}),()=>{T.delete(t)}),[t]);const f=()=>{i.onClose?.(),o(!1)},d=()=>{i.onClosed?.(),ie(t)};return e.jsx(te,{...i,visible:s,onClose:f,onClosed:d})},P=(t,i="primary")=>{const s=Ye(Ce(t),i);Pe||Array.from(M).forEach(d=>ie(d));const o=v.add(null);R.set(o,s),v.update(o,e.jsx(ge,{id:o,options:s})),M.add(o);const f=d=>{const h=R.get(o);if(!h)return;const _=Ee(d)?d(h):d,y=Ce(_),D=y.type??h.type??i,E={...h,...y,type:D};"duration"in y&&y.duration==null&&(E.duration=ne.duration),R.set(o,E),v.update(o,e.jsx(ge,{id:o,options:E}))};return{clear:()=>ve(o),update:d=>f(d),config:f}},Je={show:t=>P(t),primary:t=>P(t,"primary"),success:t=>P(t,"success"),danger:t=>P(t,"danger"),warning:t=>P(t,"warning"),clear:()=>{M.forEach(t=>ve(t))},allowMultiple:(t=!0)=>{Pe=t},setDefaultOptions:(t,i)=>{Te(t)?I.set(t,i??{}):G={...G,...t}},resetDefaultOptions:t=>{t?I.delete(t):(G={...ne},I.clear())}},a=Object.assign(Fe,Je);function De(){return e.jsxs(l.Group,{children:[e.jsx(l,{title:"显示通知",isLink:!0,onPress:()=>a.show("提示内容")}),e.jsx(l,{title:"底部通知",isLink:!0,onPress:()=>a.show({message:"底部提示",position:"bottom"})}),e.jsx(l,{title:"底部通知（偏移）",isLink:!0,onPress:()=>a.show({message:"底部偏移",position:"bottom",offset:12})})]})}const Qe=`import React from 'react'

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

`,Ue={code:Qe,sources:{_:{tsx:`import React from 'react'

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

`}},title:"基础用法",identifier:"notify-basic",lang:"tsx",meta:{title:"基础用法"}};function Ae(){return e.jsxs(l.Group,{children:[e.jsx(l,{title:"主要通知",isLink:!0,onPress:()=>a.primary("主要提示")}),e.jsx(l,{title:"成功通知",isLink:!0,onPress:()=>a.success("操作成功")}),e.jsx(l,{title:"危险通知",isLink:!0,onPress:()=>a.danger("操作失败")}),e.jsx(l,{title:"警告通知",isLink:!0,onPress:()=>a.warning("请注意风险")})]})}const We=`import React from 'react'

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

`,Xe={code:We,sources:{_:{tsx:`import React from 'react'

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

`}},title:"通知类型",identifier:"notify-type",lang:"tsx",meta:{title:"通知类型"}};function ke(){return e.jsxs(l.Group,{children:[e.jsx(l,{title:"持续展示（手动关闭）",isLink:!0,onPress:()=>a.show({message:"不会自动关闭",duration:0})}),e.jsx(l,{title:"动态更新",isLink:!0,onPress:()=>{const t=a.show({message:"处理中...",duration:0});setTimeout(()=>{t.config({type:"success",message:"完成",duration:1500})},1e3)}}),e.jsx(l,{title:"关闭所有通知",isLink:!0,onPress:()=>a.clear()})]})}const et=`import React from 'react'

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

`,tt={code:et,sources:{_:{tsx:`import React from 'react'

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

`}},title:"动态更新",identifier:"notify-duration",lang:"tsx",meta:{title:"动态更新"}};function Be(){return e.jsx(l.Group,{children:e.jsx(l,{title:"自定义背景色",isLink:!0,onPress:()=>a.show({message:"自定义样式",color:"#ffffff",background:"#722ed1"})})})}const nt=`import React from 'react'

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

`,it={code:nt,sources:{_:{tsx:`import React from 'react'

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

`}},title:"自定义颜色",identifier:"notify-custom",lang:"tsx",meta:{title:"自定义颜色"}},st=function({previewer:t=()=>null,api:i=()=>null}){const s=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"notify-消息提示","data-anchor":"notify-消息提示",children:"Notify 消息提示"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"在页面顶部/底部展示通知文案，常用于全局消息提醒。"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["默认情况下 Notify 不会阻止页面交互（不拦截点击/滚动）；当设置 ",e.jsx("code",{children:"onClick"})," 或 ",e.jsx("code",{children:"closeOnClick"})," 时才会响应点击。"]})}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Notify } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["使用 Notify 前，需在应用根节点包裹 ",e.jsx("strong",{children:"ConfigProvider"})," 或 ",e.jsx("strong",{children:"Portal.Host"}),"，否则弹层无法挂载。推荐使用 ",e.jsx("a",{href:"./config-provider.md",children:"ConfigProvider"}),"。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(s,{...Ue,children:e.jsx(De,{})})}),e.jsx("h3",{id:"通知类型","data-anchor":"通知类型",children:"通知类型"}),e.jsx("div",{children:e.jsx(s,{...Xe,children:e.jsx(Ae,{})})}),e.jsx("h3",{id:"持续展示与动态更新","data-anchor":"持续展示与动态更新",children:"持续展示与动态更新"}),e.jsx("div",{children:e.jsx(s,{...tt,children:e.jsx(ke,{})})}),e.jsx("h3",{id:"自定义颜色","data-anchor":"自定义颜色",children:"自定义颜色"}),e.jsx("div",{children:e.jsx(s,{...it,children:e.jsx(Be,{})})}),e.jsx("h3",{id:"静态调用","data-anchor":"静态调用",children:"静态调用"}),e.jsxs("p",{children:["Notify 支持 ",e.jsx("code",{children:"show/primary/success/danger/warning"})," 等静态方法，直接在任意位置调用即可展示通知。"]}),e.jsx(s,{code:`Notify.show('提示内容')
Notify.success({ message: '操作成功', duration: 2000 })
Notify.warning({ message: '注意检查参数', position: 'bottom', offset: 12 })`,lang:"ts"}),e.jsx("p",{children:"静态方法会返回句柄，可用于更新或关闭："}),e.jsx(s,{code:`const notify = Notify.show({ message: '处理中...', duration: 0 })
notify.config({ type: 'success', message: '完成', duration: 1500 })`,lang:"ts"}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示（受控模式）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"message"})}),e.jsx("td",{children:"通知内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"通知类型"}),e.jsx("td",{children:e.jsx("code",{children:"'primary' | 'success' | 'danger' | 'warning'"})}),e.jsx("td",{children:e.jsx("code",{children:"'primary'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"自动关闭延时（ms），0 表示不会自动关闭"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"3000"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"position"})}),e.jsx("td",{children:"展示位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top' | 'bottom'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetTop"})}),e.jsxs("td",{children:["是否为顶部增加安全区（",e.jsx("code",{children:'position="top"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsxs("td",{children:["是否为底部增加安全区（",e.jsx("code",{children:'position="bottom"'}),"）"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"offset"})}),e.jsx("td",{children:"顶部/底部额外偏移（px）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnClick"})}),e.jsx("td",{children:"点击通知后是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"自定义层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClick"})}),e.jsx("td",{children:"点击通知时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"关闭时触发（静态和受控模式均会回调）"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onOpened"})}),e.jsx("td",{children:"完全展示后的回调函数"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"动画结束后触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"静态方法","data-anchor":"静态方法",children:"静态方法"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"`Notify.show(options \\"}),e.jsx("td",{children:"message)`"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.primary / success / danger / warning(options)"})}),e.jsxs("td",{children:["快捷方法，自动设置 ",e.jsx("code",{children:"type"}),"，返回 ",e.jsxs("code",{children:["{"," clear, config, update ","}"]})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.clear()"})}),e.jsx("td",{children:"关闭所有通过静态方法创建的通知"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.allowMultiple(value)"})}),e.jsx("td",{children:"是否允许多个 Notify 同时存在，默认单例"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.setDefaultOptions(options)"})}),e.jsxs("td",{children:["设置全局默认配置，或针对某个 ",e.jsx("code",{children:"type"})," 设置默认项"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Notify.resetDefaultOptions(type?)"})}),e.jsxs("td",{children:["重置默认配置，",e.jsx("code",{children:"type"})," 为空时清空所有默认项"]})]})]})]})]})})},ot=[{Component:De,key:"notify-basic",sources:{_:{tsx:`import React from 'react'

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

`}},title:"基础用法",identifier:"notify-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:Ae,key:"notify-type",sources:{_:{tsx:`import React from 'react'

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

`}},title:"通知类型",identifier:"notify-type",lang:"tsx",meta:{title:"通知类型"}},{Component:ke,key:"notify-duration",sources:{_:{tsx:`import React from 'react'

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

`}},title:"动态更新",identifier:"notify-duration",lang:"tsx",meta:{title:"动态更新"}},{Component:Be,key:"notify-custom",sources:{_:{tsx:`import React from 'react'

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

`}},title:"自定义颜色",identifier:"notify-custom",lang:"tsx",meta:{title:"自定义颜色"}}],rt={simulator:{compact:!0}},ut=[{depth:1,text:"Notify 消息提示",id:"notify-消息提示"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"通知类型",id:"通知类型"},{depth:3,text:"持续展示与动态更新",id:"持续展示与动态更新"},{depth:3,text:"自定义颜色",id:"自定义颜色"},{depth:3,text:"静态调用",id:"静态调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"静态方法",id:"静态方法"}],lt="/docs/components/notify.md",ct="Notify 消息提示",dt="1769769521000",bt=t=>t.children({MdContent:st,demos:ot,frontmatter:rt,slugs:ut,filePath:lt,title:ct,updatedTime:dt});export{st as MdContent,bt as default,ot as demos,lt as filePath,rt as frontmatter,ut as slugs,ct as title,dt as updatedTime};
