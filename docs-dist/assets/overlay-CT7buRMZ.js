import{r as s,e as O,f as H,g as R,s as m,_ as w,V as b,U as C,R as p,j as e}from"./main-CC2DK3OK.js";import{c as W}from"./createComponentTokensHook-BcXZOvON.js";import{P as G}from"./index-CJrLMJTa.js";import{_ as I}from"./extends-CF3RwP-h.js";import{B as D}from"./index-BfHwmVBQ.js";import{M}from"./index-CN-rk8sC.js";import{L as J}from"./Loading-_9EKEhr2.js";import"./createPlatformShadow-BbOkyb5V.js";import"./hairline-Bq3nniT3.js";import"./color-BplLcdBL.js";import"./number-BG570ZaL.js";import"./useAriaPress-DVn62gIQ.js";import"./index-BnjI8SiS.js";function Q(t){var n=t.children,r=s.useRef(null);if(O&&!r.current){var l=document.createElement("div");l&&document.body&&(document.body.appendChild(l),r.current=l)}return s.useEffect(()=>{if(O)return()=>{document.body&&r.current&&(document.body.removeChild(r.current),r.current=null)}},[]),r.current&&O?H.createPortal(n,r.current):null}var F=250;function X(t,n){return t==="slide"?n?ee:te:t==="fade"?n?ne:re:n?d.container:d.hidden}function Z(t){var n=t.animationType,r=t.children,l=t.onDismiss,o=t.onShow,i=t.visible,a=s.useState(!1),u=a[0],c=a[1],v=s.useRef(!1),y=s.useRef(!1),f=n&&n!=="none",h=s.useCallback(x=>{x&&x.currentTarget!==x.target||(i?o&&o():c(!1))},[o,i]);return s.useEffect(()=>{y.current&&!u&&l&&l(),y.current=u},[u,l]),s.useEffect(()=>{i&&c(!0),i!==v.current&&!f&&h(),v.current=i},[f,i,h]),u||i?R("div",{style:u?X(n,i):d.hidden,onAnimationEnd:h,children:r}):null}var d=m.create({container:{position:"fixed",top:0,right:0,bottom:0,left:0,zIndex:9999},animatedIn:{animationDuration:F+"ms",animationTimingFunction:"cubic-bezier(0.215, 0.61, 0.355, 1)"},animatedOut:{pointerEvents:"none",animationDuration:F+"ms",animationTimingFunction:"cubic-bezier(0.47, 0, 0.745, 0.715)"},fadeIn:{opacity:1,animationKeyframes:{"0%":{opacity:0},"100%":{opacity:1}}},fadeOut:{opacity:0,animationKeyframes:{"0%":{opacity:1},"100%":{opacity:0}}},slideIn:{transform:"translateY(0%)",animationKeyframes:{"0%":{transform:"translateY(100%)"},"100%":{transform:"translateY(0%)"}}},slideOut:{transform:"translateY(100%)",animationKeyframes:{"0%":{transform:"translateY(0%)"},"100%":{transform:"translateY(100%)"}}},hidden:{opacity:0}}),ee=[d.container,d.animatedIn,d.slideIn],te=[d.container,d.animatedOut,d.slideOut],ne=[d.container,d.animatedIn,d.fadeIn],re=[d.container,d.animatedOut,d.fadeOut],se=["active","children","onRequestClose","transparent"],ie=s.forwardRef((t,n)=>{var r=t.active,l=t.children,o=t.onRequestClose,i=t.transparent,a=w(t,se);s.useEffect(()=>{if(O){var c=v=>{r&&v.key==="Escape"&&(v.stopPropagation(),o&&o())};return document.addEventListener("keyup",c,!1),()=>document.removeEventListener("keyup",c,!1)}},[r,o]);var u=s.useMemo(()=>[g.modal,i?g.modalTransparent:g.modalOpaque],[i]);return s.createElement(b,I({},a,{"aria-modal":!0,ref:n,role:r?"dialog":null,style:u}),s.createElement(b,{style:g.container},l))}),g=m.create({modal:{position:"fixed",top:0,right:0,bottom:0,left:0},modalTransparent:{backgroundColor:"transparent"},modalOpaque:{backgroundColor:"white"},container:{top:0,flex:1}}),V=()=>R("div",{role:"none",tabIndex:0,style:ae.focusBracket});function k(t){if(!O)return!1;try{t.focus()}catch{}return document.activeElement===t}function A(t){for(var n=0;n<t.childNodes.length;n++){var r=t.childNodes[n];if(k(r)||A(r))return!0}return!1}function L(t){for(var n=t.childNodes.length-1;n>=0;n--){var r=t.childNodes[n];if(k(r)||L(r))return!0}return!1}var le=t=>{var n=t.active,r=t.children,l=s.useRef(),o=s.useRef({trapFocusInProgress:!1,lastFocusedElement:null});return s.useEffect(()=>{if(O){var i=()=>{if(!(l.current==null||o.current.trapFocusInProgress||!n)){try{if(o.current.trapFocusInProgress=!0,document.activeElement instanceof Node&&!l.current.contains(document.activeElement)){var a=A(l.current);o.current.lastFocusedElement===document.activeElement&&(a=L(l.current)),!a&&l.current!=null&&document.activeElement&&C.focus(l.current)}}finally{o.current.trapFocusInProgress=!1}o.current.lastFocusedElement=document.activeElement}};return i(),document.addEventListener("focus",i,!0),()=>document.removeEventListener("focus",i,!0)}},[n]),s.useEffect(function(){if(O){var i=document.activeElement;return function(){i&&document.contains(i)&&C.focus(i)}}},[]),s.createElement(s.Fragment,null,s.createElement(V,null),s.createElement(b,{ref:l},r),s.createElement(V,null))},ae=m.create({focusBracket:{outlineStyle:"none"}}),oe=["animationType","children","onDismiss","onRequestClose","onShow","transparent","visible"],ue=0,j=[],P={};function N(){if(j.length!==0){var t=j[j.length-1];j.forEach(n=>{n in P&&P[n](n===t)})}}function E(t){t in P&&(P[t](!1),delete P[t]);var n=j.indexOf(t);n!==-1&&(j.splice(n,1),N())}function ce(t,n){E(t),j.push(t),P[t]=n,N()}var de=s.forwardRef((t,n)=>{var r=t.animationType,l=t.children,o=t.onDismiss,i=t.onRequestClose,a=t.onShow,u=t.transparent,c=t.visible,v=c===void 0?!0:c,y=w(t,oe),f=s.useMemo(()=>ue++,[]),h=s.useState(!1),x=h[0],S=h[1],Y=s.useCallback(()=>{E(f),o&&o()},[f,o]),U=s.useCallback(()=>{ce(f,S),a&&a()},[f,a]);return s.useEffect(()=>()=>E(f),[f]),s.createElement(Q,null,s.createElement(Z,{animationType:r,onDismiss:Y,onShow:U,visible:v},s.createElement(le,{active:x},s.createElement(ie,I({},y,{active:x,onRequestClose:i,ref:n,transparent:u}),l))))});function ve({enabled:t,callback:n}){s.useEffect(()=>{var r,l;const o=i=>{i.key==="Escape"&&n()};return(r=document)===null||r===void 0||(r=r.body)===null||r===void 0||(l=r.addEventListener)===null||l===void 0||l.call(r,"keyup",o),()=>{var i,a;(i=document)===null||i===void 0||(i=i.body)===null||i===void 0||(a=i.removeEventListener)===null||a===void 0||a.call(i,"keyup",o)}},[t,n])}const ye=({enabled:t,callback:n})=>{s.useEffect(()=>()=>{},[t,n]),ve({enabled:t,callback:n})},_=p.createContext(null);let fe=0;function me(t){const[n,r]=p.useState([]),l=a=>{const u=++fe;return r(c=>c.concat([{id:u,node:a}])),u},o=(a,u)=>{r(c=>c.find(y=>y.id==a)?c.map(y=>y.id===a?{id:a,node:u}:y):c.concat([{id:a,node:u}]))},i=a=>{r(u=>u.filter(v=>v.id!==a))};return e.jsxs(_.Provider,{value:{items:n,setOverlayItem:l,removeOverlayItem:i,updateOverlayItem:o,isSSR:t?.isSSR},children:[t.children,n.map(a=>e.jsx(e.Fragment,{children:a.node}))]})}function be({style:t,...n}){return e.jsx(b,{pointerEvents:"box-none",style:[m.absoluteFill,t],collapsable:!1,...n})}const q=me;function he(t){const n=xe(),r=p.useRef(void 0),l=e.jsx(be,{...t});return s.useEffect(()=>{r.current===void 0?r.current=n?.setOverlayItem(l):r.current&&n?.updateOverlayItem(r.current,l)},[t]),s.useEffect(()=>()=>{r.current&&n?.removeOverlayItem(r.current)},[]),n!=null&&n.isSSR&&!r.current?e.jsx(b,{style:{display:"none"},children:l}):null}function xe(){return p.useContext(_)}const pe=t=>({layer:{zIndex:9999}}),je=W("overlay",pe),Oe=(t,n)=>{const{children:r,isOpen:l,visible:o,useRNModal:i,useRNModalOnAndroid:a=!1,isKeyboardDismissable:u=!0,animationPreset:c="fade",onRequestClose:v,style:y}=t,f=je(),h=i??!1,x={zIndex:f.layer.zIndex,position:"fixed",top:0,left:0,right:0,bottom:0},S=l??o??!1;return ye({enabled:!1,callback:v??(()=>{})}),S?h||a&&G.OS==="android"?e.jsx(de,{statusBarTranslucent:!0,transparent:!0,visible:S,onRequestClose:v,animationType:c,ref:n,children:r}):e.jsx(he,{style:[y,x],children:r}):null},T=p.forwardRef(Oe);T.displayName="Overlay";const $=p.memo(T);function K(){const[t,n]=p.useState(!1);return e.jsx(q,{children:e.jsxs(b,{style:{alignItems:"flex-start"},children:[e.jsx(D,{type:"primary",onPress:()=>n(!0),children:"显示遮罩"}),e.jsx($,{isOpen:t,onRequestClose:()=>n(!1),style:m.absoluteFillObject,children:e.jsx(M,{style:{...m.absoluteFillObject,backgroundColor:"rgba(0,0,0,0.6)"},onPress:()=>n(!1)})})]})})}const Pe=`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`,Se={code:Pe,sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},title:"基础用法",identifier:"overlay-basic",lang:"tsx",meta:{title:"基础用法"}};function z(){const[t,n]=p.useState(!1);return e.jsx(q,{children:e.jsxs(b,{style:{alignItems:"flex-start"},children:[e.jsx(D,{onPress:()=>n(!0),children:"加载中"}),e.jsxs($,{isOpen:t,onRequestClose:()=>n(!1),style:m.absoluteFillObject,children:[e.jsx(M,{style:[m.absoluteFillObject,{backgroundColor:"rgba(0,0,0,0.6)"}],onPress:()=>n(!1)}),e.jsx(b,{style:B.center,pointerEvents:"box-none",children:e.jsx(b,{style:B.content,children:e.jsx(J,{children:"加载中..."})})})]})]})})}const B=m.create({center:{...m.absoluteFillObject,alignItems:"center",justifyContent:"center"},content:{alignItems:"center",padding:24,borderRadius:6,backgroundColor:"#ffffff"}}),ge=`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`,Ee={code:ge,sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},title:"自定义内容",identifier:"overlay-content",lang:"tsx",meta:{title:"自定义内容"}},Ce=function({previewer:t=()=>null,api:n=()=>null}){const r=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"overlay-遮罩层","data-anchor":"overlay-遮罩层",children:"Overlay 遮罩层"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"创建一个全屏遮罩，用于阻止背景交互、强调浮层内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { Overlay, OverlayProvider } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Overlay 依赖 ",e.jsx("code",{children:"<OverlayProvider>"})," 作为宿主容器；如果你已经使用 ",e.jsx("code",{children:"PortalHost"}),"/",e.jsx("code",{children:"ConfigProvider"}),"，则无需额外包裹。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(r,{...Se,children:e.jsx(K,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsx("div",{children:e.jsx(r,{...Ee,children:e.jsx(z,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isOpen"})}),e.jsx("td",{children:"是否显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsxs("td",{children:[e.jsx("code",{children:"isOpen"})," 的兼容别名"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useRNModalOnAndroid"})}),e.jsxs("td",{children:["Android 端是否使用 ",e.jsx("code",{children:"Modal"})," 承载"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useRNModal"})}),e.jsxs("td",{children:["强制使用 ",e.jsx("code",{children:"Modal"})," 承载"]}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onRequestClose"})}),e.jsxs("td",{children:[e.jsx("code",{children:"Modal"})," 关闭回调"]}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isKeyboardDismissable"})}),e.jsx("td",{children:"是否允许点击遮罩关闭键盘"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animationPreset"})}),e.jsxs("td",{children:["动画类型（",e.jsx("code",{children:"Modal"})," 或 Overlay 容器展示策略）"]}),e.jsx("td",{children:e.jsx("code",{children:"fade | slide | none"})}),e.jsx("td",{children:e.jsx("code",{children:"fade"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"style"})}),e.jsx("td",{children:"Overlay 容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"Overlay 内部内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]})]})]})]})})},Fe=[{Component:K,key:"overlay-basic",sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Button, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayBasicDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button type="primary" onPress={() => setVisible(true)}>
          显示遮罩
        </Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' }}
            onPress={() => setVisible(false)}
          />
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

`}},title:"基础用法",identifier:"overlay-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:z,key:"overlay-content",sources:{_:{tsx:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Button, Loading, Overlay, OverlayProvider } from 'react-native-system-ui'

export default function OverlayContentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <OverlayProvider>
      <View style={{ alignItems: 'flex-start' }}>
        <Button onPress={() => setVisible(true)}>加载中</Button>
        <Overlay
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={StyleSheet.absoluteFillObject}
        >
          <Pressable
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: 'rgba(0,0,0,0.6)' },
            ]}
            onPress={() => setVisible(false)}
          />
          <View style={styles.center} pointerEvents="box-none">
            <View style={styles.content}>
              <Loading>加载中...</Loading>
            </View>
          </View>
        </Overlay>
      </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
})
`}},title:"自定义内容",identifier:"overlay-content",lang:"tsx",meta:{title:"自定义内容"}}],Ve={simulator:{compact:!1}},Be=[{depth:1,text:"Overlay 遮罩层",id:"overlay-遮罩层"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:2,text:"API",id:"api"}],Re="/docs/components/overlay.md",we="Overlay 遮罩层",Ie="1770111044000",Ue=t=>t.children({MdContent:Ce,demos:Fe,frontmatter:Ve,slugs:Be,filePath:Re,title:we,updatedTime:Ie});export{Ce as MdContent,Ue as default,Fe as demos,Re as filePath,Ve as frontmatter,Be as slugs,we as title,Ie as updatedTime};
