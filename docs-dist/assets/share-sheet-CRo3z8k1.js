import{R as u,a3 as h,r,j as e,V as a,a as d,s as le,F as ue}from"./main-CC2DK3OK.js";import{e as b,b as B,S as D,a as A,c as V,d as de}from"./Wechat-BeY1ynsx.js";import{C as v}from"./index-Dueh9AzQ.js";import{a as he}from"./hairline-Bq3nniT3.js";import{P as pe}from"./Popup-G3cXoDWN.js";import{c as me,T as p}from"./createComponentTokensHook-BcXZOvON.js";import{M as H}from"./index-CN-rk8sC.js";import{u as $}from"./useAriaPress-DVn62gIQ.js";import{I as E}from"./Image-B67890TJ.js";import"./IconBase-BNmvoXvm.js";import"./Arrow-CP2eQgBg.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D9I31KH1.js";import"./Animated-C-b5K9fC.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./index-D_JlQYPg.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-xa377Hoz.js";import"./index-BP7Blb5n.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./index-BnjI8SiS.js";const xe=n=>{const{palette:i,spacing:t,fontSize:o}=n;return{colors:{background:"#ffffff",title:i.default[900],description:i.default[500],option:i.default[900],optionDesc:i.default[500],border:i.default[200],divider:i.default[100]},spacing:{horizontal:t.md,vertical:t.sm,gap:t.xs,popupPadding:0,headerPaddingTop:t.sm,headerPaddingHorizontal:t.lg,headerPaddingBottom:t.md,titleMarginTop:t.xs,descriptionMarginTop:t.xs,nodeMarginTop:t.xs,iconMarginHorizontal:t.md,optionTextPaddingHorizontal:t.xs,optionDescPaddingHorizontal:t.lg,cancelPaddingVertical:14,cancelMarginTop:t.sm},sizing:{icon:48},typography:{title:o.md,description:o.xs,option:o.xs,optionDesc:o.xxs,cancel:o.md}}},Se=me("shareSheet",xe),ge=n=>!n||n.length===0?[]:Array.isArray(n[0])?n:[n],fe=u.memo(({option:n,index:i,columns:t,tokens:o,onSelect:x})=>{const j={width:`${100/t}%`},S={width:o.sizing.icon,height:o.sizing.icon},g=$({onPress:()=>x(n,i),extraProps:{accessibilityRole:"menuitem",accessibilityLabel:d(n.name)?String(n.name):void 0,testID:`rv-share-sheet-item-${i}`}});return e.jsxs(H,{style:[c.option,j],...g.interactionProps,children:[e.jsx(a,{style:[c.icon,S,{marginHorizontal:o.spacing.iconMarginHorizontal}],children:n.icon}),h(n.name)?d(n.name)?e.jsx(p,{style:[c.optionText,{color:o.colors.option,fontSize:o.typography.option,paddingHorizontal:o.spacing.optionTextPaddingHorizontal}],children:n.name}):n.name:null,h(n.description)?d(n.description)?e.jsx(p,{style:[c.optionDesc,{color:o.colors.optionDesc,marginTop:o.spacing.gap,fontSize:o.typography.optionDesc,paddingHorizontal:o.spacing.optionDescPaddingHorizontal}],children:n.description}):e.jsx(a,{style:[c.optionDescNode,{marginTop:o.spacing.gap,paddingHorizontal:o.spacing.optionDescPaddingHorizontal}],children:n.description}):null]})}),be=u.memo(({cancelText:n,tokens:i,onPress:t})=>{const o=$({onPress:t,extraProps:{testID:"rv-share-sheet-cancel",accessibilityRole:"button"}});return e.jsx(a,{style:{backgroundColor:i.colors.divider},children:e.jsx(H,{style:[c.cancel,{backgroundColor:i.colors.background,paddingVertical:i.spacing.cancelPaddingVertical,marginTop:i.spacing.cancelMarginTop}],...o.interactionProps,children:d(n)?e.jsx(p,{style:[c.cancelText,{color:i.colors.option,fontSize:i.typography.cancel}],children:n}):n})})}),ve=n=>{const{visible:i,title:t,description:o,cancelText:x="取消",options:j,columns:S=4,closeOnSelect:g=!0,safeAreaInsetBottom:U=!0,children:X,tokensOverride:Y,onSelect:k,onCancel:R,onClose:O,lockScroll:Z=!0,overlay:ee=!0,round:ne=!0,style:te,placement:we,position:Te,...ie}=n,s=Se(Y),C=ge(j),M=ue(S)?Math.max(1,Math.floor(S)):4,y=h(t),F=h(o),oe=h(x),N=r.useRef(R);N.current=R;const W=r.useRef(O);W.current=O;const z=r.useRef(k);z.current=k;const f=r.useCallback(l=>{l&&N.current?.(),W.current?.()},[]),I=r.useCallback((l,P)=>{z.current?.(l,P),l.onPress?.(l),g&&f()},[f,g]),Q=r.useCallback(()=>f(!0),[f]),se=[c.wrapper,{backgroundColor:s.colors.background}],w=[c.optionsRow,{paddingLeft:s.spacing.gap,paddingVertical:12}],ce=r.useMemo(()=>{if(!C.length)return null;let l=0;return C.map((P,T)=>e.jsxs(a,{children:[T?e.jsx(a,{style:he({position:"top",color:s.colors.border,left:s.spacing.horizontal,right:s.spacing.horizontal})}):null,e.jsx(a,{style:w,children:P.map(L=>{const _=l++;return e.jsx(fe,{option:L,index:_,columns:M,tokens:s,onSelect:I},L.key??_)})})]},T))},[C,w,I,M,s]),ae=r.useMemo(()=>!y&&!F?null:e.jsxs(a,{style:[c.header,{paddingTop:s.spacing.headerPaddingTop,paddingHorizontal:s.spacing.headerPaddingHorizontal,paddingBottom:s.spacing.headerPaddingBottom}],children:[y?d(t)?e.jsx(p,{style:[c.title,{color:s.colors.title,fontSize:s.typography.title,marginTop:s.spacing.titleMarginTop}],children:t}):e.jsx(a,{style:[c.node,{marginTop:s.spacing.nodeMarginTop}],children:t}):null,F?d(o)?e.jsx(p,{style:[c.description,{color:s.colors.description,fontSize:s.typography.description,marginTop:s.spacing.descriptionMarginTop}],children:o}):e.jsx(a,{style:[c.node,{marginTop:s.spacing.nodeMarginTop}],children:o}):null]}),[o,F,y,t,s.colors.description,s.colors.title,s.spacing.descriptionMarginTop,s.spacing.headerPaddingBottom,s.spacing.headerPaddingHorizontal,s.spacing.headerPaddingTop,s.spacing.nodeMarginTop,s.spacing.titleMarginTop,s.typography.description,s.typography.title]),re=[{padding:s.spacing.popupPadding},te];return e.jsx(pe,{...ie,visible:i,placement:"bottom",round:ne,safeAreaInsetBottom:U,overlay:ee,lockScroll:Z,onClose:Q,style:re,children:e.jsxs(a,{accessibilityRole:"menu",style:se,children:[ae,ce,X,oe?e.jsx(be,{cancelText:x,tokens:s,onPress:Q}):null]})})},c=le.create({wrapper:{width:"100%"},header:{alignItems:"center"},title:{fontWeight:"normal",textAlign:"center"},description:{textAlign:"center"},node:{alignItems:"center"},optionsRow:{flexDirection:"row",flexWrap:"wrap"},option:{alignItems:"center",justifyContent:"center"},icon:{alignItems:"center",justifyContent:"center"},optionText:{fontWeight:"500",textAlign:"center"},optionDesc:{textAlign:"center"},optionDescNode:{alignItems:"center"},cancel:{alignItems:"center"},cancelText:{fontWeight:"500"}}),m=u.memo(ve);m.displayName="ShareSheet";const je=[{name:"微信",icon:e.jsx(b,{})},{name:"微博",icon:e.jsx(B,{})},{name:"分享海报",icon:e.jsx(D,{})},{name:"二维码",icon:e.jsx(A,{})}];function G(){const[n,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:n,title:"立即分享给好友",options:je,closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(t,o)=>{console.log("option",t),console.log("index",o),i(!1)}})]})}const Ce=`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetBasicDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`,ye={code:Ce,sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetBasicDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetBasicDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},title:"基础用法",identifier:"share-sheet-basic",lang:"tsx",meta:{title:"基础用法"}},Fe=[[{name:"微信",icon:e.jsx(b,{})},{name:"朋友圈",icon:e.jsx(b,{})},{name:"微博",icon:e.jsx(B,{})},{name:"QQ",icon:e.jsx(V,{})}],[{name:"复制链接",icon:e.jsx(V,{})},{name:"分享海报",icon:e.jsx(D,{})},{name:"二维码",icon:e.jsx(A,{})},{name:"小程序码",icon:e.jsx(de,{})}]];function q(){const[n,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:n,title:"立即分享给好友",options:Fe,closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(t,o)=>{console.log("option",t),console.log("index",o),i(!1)}})]})}const Pe=`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, WeappNav, Wechat } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Wechat /> },
    { name: '朋友圈', icon: <Wechat /> },
    { name: '微博', icon: <Share /> },
    { name: 'QQ', icon: <ShareO /> },
  ],
  [
    { name: '复制链接', icon: <ShareO /> },
    { name: '分享海报', icon: <Photo /> },
    { name: '二维码', icon: <Qr /> },
    { name: '小程序码', icon: <WeappNav /> },
  ],
]

export default function ShareSheetGroupsDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`,Ee={code:Pe,sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, WeappNav, Wechat } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Wechat /> },
    { name: '朋友圈', icon: <Wechat /> },
    { name: '微博', icon: <Share /> },
    { name: 'QQ', icon: <ShareO /> },
  ],
  [
    { name: '复制链接', icon: <ShareO /> },
    { name: '分享海报', icon: <Photo /> },
    { name: '二维码', icon: <Qr /> },
    { name: '小程序码', icon: <WeappNav /> },
  ],
]

export default function ShareSheetGroupsDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, WeappNav, Wechat } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Wechat /> },
    { name: '朋友圈', icon: <Wechat /> },
    { name: '微博', icon: <Share /> },
    { name: 'QQ', icon: <ShareO /> },
  ],
  [
    { name: '复制链接', icon: <ShareO /> },
    { name: '分享海报', icon: <Photo /> },
    { name: '二维码', icon: <Qr /> },
    { name: '小程序码', icon: <WeappNav /> },
  ],
]

export default function ShareSheetGroupsDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},title:"展示多行选项",identifier:"share-sheet-groups",lang:"tsx",meta:{title:"展示多行选项"}},Ve=[{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-fire.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})},{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-light.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})},{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-water.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})}];function J(){const[n,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:n,options:Ve,title:"立即分享给好友",closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(t,o)=>{console.log("option",t),console.log("index",o),i(!1)}})]})}const Be=`import React from 'react'
import { Cell, Image, ShareSheet } from 'react-native-system-ui'

const options = [
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
]

export default function ShareSheetCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`,De={code:Be,sources:{_:{tsx:`import React from 'react'
import { Cell, Image, ShareSheet } from 'react-native-system-ui'

const options = [
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
]

export default function ShareSheetCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Image, ShareSheet } from 'react-native-system-ui'

const options = [
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
]

export default function ShareSheetCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},title:"自定义图标",identifier:"share-sheet-custom",lang:"tsx",meta:{title:"自定义图标"}},Ae=[{name:"微信",icon:e.jsx(b,{})},{name:"微博",icon:e.jsx(B,{})},{name:"复制链接",icon:e.jsx(V,{}),description:"描述信息"},{name:"分享海报",icon:e.jsx(D,{})},{name:"二维码",icon:e.jsx(A,{})}];function K(){const[n,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:n,options:Ae,title:"立即分享给好友",description:"描述信息",closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(t,o)=>{console.log("option",t),console.log("index",o),i(!1)}})]})}const ke=`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        description="描述信息"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}

`,Re={code:ke,sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        description="描述信息"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}

`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        description="描述信息"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}

`}},title:"展示描述信息",identifier:"share-sheet-description",lang:"tsx",meta:{title:"展示描述信息"}},Oe=function({previewer:n=()=>null,api:i=()=>null}){const t=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"sharesheet-分享面板","data-anchor":"sharesheet-分享面板",children:"ShareSheet 分享面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"展示常见分享渠道或快捷操作的弹层，支持多行分组与自定义内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(t,{code:"import { ShareSheet } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["分享面板通过 ",e.jsx("code",{children:"options"})," 定义分享选项。"]}),e.jsx("div",{children:e.jsx(t,{...ye,children:e.jsx(G,{})})}),e.jsx("h3",{id:"展示多行选项","data-anchor":"展示多行选项",children:"展示多行选项"}),e.jsxs("p",{children:["当分享选项较多时，可将 ",e.jsx("code",{children:"options"})," 定义为二维数组，每个子数组会作为一行选项展示。"]}),e.jsx("div",{children:e.jsx(t,{...Ee,children:e.jsx(q,{})})}),e.jsx("h3",{id:"自定义图标","data-anchor":"自定义图标",children:"自定义图标"}),e.jsxs("p",{children:["除了使用图标组件外，也可以在 ",e.jsx("code",{children:"icon"})," 中传入图片节点来使用自定义图标。"]}),e.jsx("div",{children:e.jsx(t,{...De,children:e.jsx(J,{})})}),e.jsx("h3",{id:"展示描述信息","data-anchor":"展示描述信息",children:"展示描述信息"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"description"})," 属性可以设置标题下方的描述文字，在 ",e.jsx("code",{children:"options"})," 内设置 ",e.jsx("code",{children:"description"})," 可添加分享选项描述。"]}),e.jsx("div",{children:e.jsx(t,{...Re,children:e.jsx(K,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"sharesheet-props","data-anchor":"sharesheet-props",children:"ShareSheet Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"分享选项（支持二维数组分组）"}),e.jsx("td",{children:e.jsx("code",{children:"ShareSheetOptions"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelText"})}),e.jsx("td",{children:"底部取消按钮文字，传空隐藏"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsx("td",{children:"每行展示数量，用于计算宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"4"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnSelect"})}),e.jsx("td",{children:"点击选项后是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSelect"})}),e.jsx("td",{children:"选择分享项回调"}),e.jsx("td",{children:e.jsx("code",{children:"(option, index) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消或关闭时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsxs("td",{children:["透传 ",e.jsx("code",{children:"Popup"})," 的属性"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"sharesheetoption","data-anchor":"sharesheetoption",children:"ShareSheetOption"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"分享项名称"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"图标节点"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"副标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsxs("td",{children:["点击回调（先于 ",e.jsx("code",{children:"onSelect"})," 执行）"]}),e.jsx("td",{children:e.jsx("code",{children:"(option) => void"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前实现聚焦分享栅格场景，暂未提供图片资源加载、懒加载等能力；如需网络图标，可在 ",e.jsx("code",{children:"icon"})," 中传入自定义组件。"]})})]})})},Me=[{Component:G,key:"share-sheet-basic",sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetBasicDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetBasicDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},title:"基础用法",identifier:"share-sheet-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:q,key:"share-sheet-groups",sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, WeappNav, Wechat } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Wechat /> },
    { name: '朋友圈', icon: <Wechat /> },
    { name: '微博', icon: <Share /> },
    { name: 'QQ', icon: <ShareO /> },
  ],
  [
    { name: '复制链接', icon: <ShareO /> },
    { name: '分享海报', icon: <Photo /> },
    { name: '二维码', icon: <Qr /> },
    { name: '小程序码', icon: <WeappNav /> },
  ],
]

export default function ShareSheetGroupsDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, WeappNav, Wechat } from 'react-native-system-icon'

const options = [
  [
    { name: '微信', icon: <Wechat /> },
    { name: '朋友圈', icon: <Wechat /> },
    { name: '微博', icon: <Share /> },
    { name: 'QQ', icon: <ShareO /> },
  ],
  [
    { name: '复制链接', icon: <ShareO /> },
    { name: '分享海报', icon: <Photo /> },
    { name: '二维码', icon: <Qr /> },
    { name: '小程序码', icon: <WeappNav /> },
  ],
]

export default function ShareSheetGroupsDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        title="立即分享给好友"
        options={options}
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},title:"展示多行选项",identifier:"share-sheet-groups",lang:"tsx",meta:{title:"展示多行选项"}},{Component:J,key:"share-sheet-custom",sources:{_:{tsx:`import React from 'react'
import { Cell, Image, ShareSheet } from 'react-native-system-ui'

const options = [
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
]

export default function ShareSheetCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, Image, ShareSheet } from 'react-native-system-ui'

const options = [
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-fire.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-light.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
  {
    name: '名称',
    icon: <Image src="https://img.yzcdn.cn/vant/custom-icon-water.png" width={48} height={48} containerStyle={{ backgroundColor: 'transparent' }} />,
  },
]

export default function ShareSheetCustomDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}
`}},title:"自定义图标",identifier:"share-sheet-custom",lang:"tsx",meta:{title:"自定义图标"}},{Component:K,key:"share-sheet-description",sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        description="描述信息"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}

`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default function ShareSheetDescriptionDemo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <Cell title="显示分享面板" clickable isLink onPress={() => setVisible(true)} />
      <ShareSheet
        visible={visible}
        options={options}
        title="立即分享给好友"
        description="描述信息"
        closeOnSelect={false}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          console.log('option', option)
          console.log('index', index)
          setVisible(false)
        }}
      />
    </>
  )
}

`}},title:"展示描述信息",identifier:"share-sheet-description",lang:"tsx",meta:{title:"展示描述信息"}}],Ne={simulator:{compact:!0}},We=[{depth:1,text:"ShareSheet 分享面板",id:"sharesheet-分享面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"展示多行选项",id:"展示多行选项"},{depth:3,text:"自定义图标",id:"自定义图标"},{depth:3,text:"展示描述信息",id:"展示描述信息"},{depth:2,text:"API",id:"api"},{depth:3,text:"ShareSheet Props",id:"sharesheet-props"},{depth:3,text:"ShareSheetOption",id:"sharesheetoption"}],ze="/docs/components/share-sheet.md",Ie="ShareSheet 分享面板",Qe="1766319671000",mn=n=>n.children({MdContent:Oe,demos:Me,frontmatter:Ne,slugs:We,filePath:ze,title:Ie,updatedTime:Qe});export{Oe as MdContent,mn as default,Me as demos,ze as filePath,Ne as frontmatter,We as slugs,Ie as title,Qe as updatedTime};
