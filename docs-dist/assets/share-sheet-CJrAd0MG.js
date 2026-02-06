import{a3 as d,r as u,j as e,V as a,a as h,s as ce,R as l,D as ae}from"./main-CX5QgiXt.js";import{e as b,b as A,S as B,a as k,c as V,d as re}from"./Wechat--qbRt7xn.js";import{C as v}from"./index-D361XNui.js";import{a as le}from"./hairline-6DGjxZ3L.js";import{P as ue}from"./Popup-DLZFaqRn.js";import{c as de,T as p}from"./createComponentTokensHook-Hc3l7riF.js";import{M as T}from"./index-CQ2P49YQ.js";import{u as _}from"./useAriaPress-sIRcrStb.js";import{I as E}from"./Image-Cprrse_9.js";import"./IconBase-D_kjvpJY.js";import"./Arrow-CFMZgj_G.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-BtmwX5Pt.js";import"./Overlay-uC1_KEGM.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./Animated-rPtBS5kg.js";import"./index-BEnr4R_B.js";import"./index-CTcRCRb2.js";import"./index-BDzwQtXM.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-CF7tueuh.js";import"./index-4qDXDIEs.js";import"./SafeAreaView-DiARkPwI.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./index-quLIWFrm.js";const he=t=>{const{palette:i,spacing:n,fontSize:o}=t;return{colors:{background:"#ffffff",title:i.default[900],description:i.default[500],option:i.default[900],optionDesc:i.default[500],border:i.default[200],divider:i.default[100]},spacing:{horizontal:n.md,vertical:n.sm,gap:n.xs,popupPadding:0,headerPaddingTop:n.sm,headerPaddingHorizontal:n.lg,headerPaddingBottom:n.md,titleMarginTop:n.xs,descriptionMarginTop:n.xs,nodeMarginTop:n.xs,iconMarginHorizontal:n.md,optionTextPaddingHorizontal:n.xs,optionDescPaddingHorizontal:n.lg,cancelPaddingVertical:14,cancelMarginTop:n.sm},sizing:{icon:48},typography:{title:o.md,description:o.xs,option:o.xs,optionDesc:o.xxs,cancel:o.md}}},pe=de("shareSheet",he),me=t=>!t||t.length===0?[]:Array.isArray(t[0])?t:[t],xe=l.memo(({option:t,index:i,columns:n,tokens:o,onSelect:x})=>{const j={width:`${100/n}%`},g={width:o.sizing.icon,height:o.sizing.icon},S=_({onPress:()=>x(t,i),extraProps:{accessibilityRole:"button",testID:`rv-share-sheet-item-${i}`}});return e.jsxs(T,{style:[c.option,j],...S.interactionProps,children:[e.jsx(a,{style:[c.icon,g,{marginHorizontal:o.spacing.iconMarginHorizontal}],children:t.icon}),d(t.name)?h(t.name)?e.jsx(p,{style:[c.optionText,{color:o.colors.option,fontSize:o.typography.option,paddingHorizontal:o.spacing.optionTextPaddingHorizontal}],children:t.name}):t.name:null,d(t.description)?h(t.description)?e.jsx(p,{style:[c.optionDesc,{color:o.colors.optionDesc,marginTop:o.spacing.gap,fontSize:o.typography.optionDesc,paddingHorizontal:o.spacing.optionDescPaddingHorizontal}],children:t.description}):e.jsx(a,{style:[c.optionDescNode,{marginTop:o.spacing.gap,paddingHorizontal:o.spacing.optionDescPaddingHorizontal}],children:t.description}):null]})}),ge=l.memo(({cancelText:t,tokens:i,onPress:n})=>{const o=_({onPress:n,extraProps:{testID:"rv-share-sheet-cancel",accessibilityRole:"button"}});return e.jsx(a,{style:{backgroundColor:i.colors.divider},children:e.jsx(T,{style:[c.cancel,{backgroundColor:i.colors.background,paddingVertical:i.spacing.cancelPaddingVertical,marginTop:i.spacing.cancelMarginTop}],...o.interactionProps,children:h(t)?e.jsx(p,{style:[c.cancelText,{color:i.colors.option,fontSize:i.typography.cancel}],children:t}):t})})}),m=t=>{const{visible:i,title:n,description:o,cancelText:x="取消",options:j,columns:g=4,closeOnSelect:S=!0,safeAreaInsetBottom:G=!0,children:J,tokensOverride:K,onSelect:O,onCancel:M,onClose:R,lockScroll:U=!0,overlay:X=!0,round:Y=!0,style:Z,placement:We,position:ze,...ee}=t,s=pe(K),C=me(j),D=ae(g)?Math.max(1,Math.floor(g)):4,y=d(n),F=d(o),ne=d(x),f=u.useCallback(r=>{r&&M?.(),R?.()},[M,R]),N=u.useCallback((r,P)=>{O?.(r,P),r.onPress?.(r),S&&f()},[f,S,O]),W=u.useCallback(()=>f(!0),[f]),te=[c.wrapper,{backgroundColor:s.colors.background}],z=[c.optionsRow,{paddingLeft:s.spacing.gap,paddingVertical:12}],ie=u.useMemo(()=>{if(!C.length)return null;let r=0;return C.map((P,I)=>e.jsxs(a,{children:[I?e.jsx(a,{style:le({position:"top",color:s.colors.border,left:s.spacing.horizontal,right:s.spacing.horizontal})}):null,e.jsx(a,{style:z,children:P.map(Q=>{const w=r++;return e.jsx(xe,{option:Q,index:w,columns:D,tokens:s,onSelect:N},Q.key??w)})})]},I))},[C,z,N,D,s]),oe=u.useMemo(()=>!y&&!F?null:e.jsxs(a,{style:[c.header,{paddingTop:s.spacing.headerPaddingTop,paddingHorizontal:s.spacing.headerPaddingHorizontal,paddingBottom:s.spacing.headerPaddingBottom}],children:[y?h(n)?e.jsx(p,{style:[c.title,{color:s.colors.title,fontSize:s.typography.title,marginTop:s.spacing.titleMarginTop}],children:n}):e.jsx(a,{style:[c.node,{marginTop:s.spacing.nodeMarginTop}],children:n}):null,F?h(o)?e.jsx(p,{style:[c.description,{color:s.colors.description,fontSize:s.typography.description,marginTop:s.spacing.descriptionMarginTop}],children:o}):e.jsx(a,{style:[c.node,{marginTop:s.spacing.nodeMarginTop}],children:o}):null]}),[o,F,y,n,s.colors.description,s.colors.title,s.spacing.descriptionMarginTop,s.spacing.headerPaddingBottom,s.spacing.headerPaddingHorizontal,s.spacing.headerPaddingTop,s.spacing.nodeMarginTop,s.spacing.titleMarginTop,s.typography.description,s.typography.title]),se=[c.popupOverride,{padding:s.spacing.popupPadding},Z];return e.jsx(ue,{...ee,visible:i,placement:"bottom",round:Y,safeAreaInsetBottom:G,overlay:X,lockScroll:U,onClose:W,style:se,children:e.jsxs(a,{style:te,children:[oe,ie,J,ne?e.jsx(ge,{cancelText:x,tokens:s,onPress:W}):null]})})},c=ce.create({popupOverride:{},wrapper:{width:"100%"},header:{alignItems:"center"},title:{fontWeight:"normal",textAlign:"center"},description:{textAlign:"center"},node:{alignItems:"center"},optionsRow:{flexDirection:"row",flexWrap:"wrap"},option:{alignItems:"center",justifyContent:"center"},icon:{alignItems:"center",justifyContent:"center"},optionText:{fontWeight:"500",textAlign:"center"},optionDesc:{textAlign:"center"},optionDescNode:{alignItems:"center"},cancel:{alignItems:"center"},cancelText:{fontWeight:"500"}});m.displayName="ShareSheet";const Se=[{name:"微信",icon:e.jsx(b,{})},{name:"微博",icon:e.jsx(A,{})},{name:"分享海报",icon:e.jsx(B,{})},{name:"二维码",icon:e.jsx(k,{})}],L=()=>{const[t,i]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:t,title:"立即分享给好友",options:Se,closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},fe=`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default () => {
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
`,be={code:fe,sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default () => {
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

export default () => {
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
`}},title:"基础用法",identifier:"share-sheet-basic",lang:"tsx",meta:{title:"基础用法"}},ve=[[{name:"微信",icon:e.jsx(b,{})},{name:"朋友圈",icon:e.jsx(b,{})},{name:"微博",icon:e.jsx(A,{})},{name:"QQ",icon:e.jsx(V,{})}],[{name:"复制链接",icon:e.jsx(V,{})},{name:"分享海报",icon:e.jsx(B,{})},{name:"二维码",icon:e.jsx(k,{})},{name:"小程序码",icon:e.jsx(re,{})}]],H=()=>{const[t,i]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:t,title:"立即分享给好友",options:ve,closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},je=`import React from 'react'
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

export default () => {
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
`,Ce={code:je,sources:{_:{tsx:`import React from 'react'
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

export default () => {
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

export default () => {
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
`}},title:"展示多行选项",identifier:"share-sheet-groups",lang:"tsx",meta:{title:"展示多行选项"}},ye=[{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-fire.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})},{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-light.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})},{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-water.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})}],$=()=>{const[t,i]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:t,options:ye,title:"立即分享给好友",closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},Fe=`import React from 'react'
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

export default () => {
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
`,Pe={code:Fe,sources:{_:{tsx:`import React from 'react'
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

export default () => {
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

export default () => {
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
`}},title:"自定义图标",identifier:"share-sheet-custom",lang:"tsx",meta:{title:"自定义图标"}},Ee=[{name:"微信",icon:e.jsx(b,{})},{name:"微博",icon:e.jsx(A,{})},{name:"复制链接",icon:e.jsx(V,{}),description:"描述信息"},{name:"分享海报",icon:e.jsx(B,{})},{name:"二维码",icon:e.jsx(k,{})}],q=()=>{const[t,i]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(m,{visible:t,options:Ee,title:"立即分享给好友",description:"描述信息",closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},Ve=`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default () => {
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

`,Ae={code:Ve,sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default () => {
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

export default () => {
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

`}},title:"展示描述信息",identifier:"share-sheet-description",lang:"tsx",meta:{title:"展示描述信息"}},Be=function({previewer:t=()=>null,api:i=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"sharesheet-分享面板","data-anchor":"sharesheet-分享面板",children:"ShareSheet 分享面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"展示常见分享渠道或快捷操作的弹层，支持多行分组与自定义内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { ShareSheet } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["分享面板通过 ",e.jsx("code",{children:"options"})," 定义分享选项。"]}),e.jsx("div",{children:e.jsx(n,{...be,children:e.jsx(L,{})})}),e.jsx("h3",{id:"展示多行选项","data-anchor":"展示多行选项",children:"展示多行选项"}),e.jsxs("p",{children:["当分享选项较多时，可将 ",e.jsx("code",{children:"options"})," 定义为二维数组，每个子数组会作为一行选项展示。"]}),e.jsx("div",{children:e.jsx(n,{...Ce,children:e.jsx(H,{})})}),e.jsx("h3",{id:"自定义图标","data-anchor":"自定义图标",children:"自定义图标"}),e.jsxs("p",{children:["除了使用图标组件外，也可以在 ",e.jsx("code",{children:"icon"})," 中传入图片节点来使用自定义图标。"]}),e.jsx("div",{children:e.jsx(n,{...Pe,children:e.jsx($,{})})}),e.jsx("h3",{id:"展示描述信息","data-anchor":"展示描述信息",children:"展示描述信息"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"description"})," 属性可以设置标题下方的描述文字，在 ",e.jsx("code",{children:"options"})," 内设置 ",e.jsx("code",{children:"description"})," 可添加分享选项描述。"]}),e.jsx("div",{children:e.jsx(n,{...Ae,children:e.jsx(q,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"sharesheet-props","data-anchor":"sharesheet-props",children:"ShareSheet Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"分享选项（支持二维数组分组）"}),e.jsx("td",{children:e.jsx("code",{children:"ShareSheetOptions"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelText"})}),e.jsx("td",{children:"底部取消按钮文字，传空隐藏"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsx("td",{children:"每行展示数量，用于计算宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"4"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnSelect"})}),e.jsx("td",{children:"点击选项后是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSelect"})}),e.jsx("td",{children:"选择分享项回调"}),e.jsx("td",{children:e.jsx("code",{children:"(option, index) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消或关闭时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsxs("td",{children:["透传 ",e.jsx("code",{children:"Popup"})," 的属性"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"sharesheetoption","data-anchor":"sharesheetoption",children:"ShareSheetOption"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"分享项名称"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"图标节点"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"副标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsxs("td",{children:["点击回调（先于 ",e.jsx("code",{children:"onSelect"})," 执行）"]}),e.jsx("td",{children:e.jsx("code",{children:"(option) => void"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前实现聚焦分享栅格场景，暂未提供图片资源加载、懒加载等能力；如需网络图标，可在 ",e.jsx("code",{children:"icon"})," 中传入自定义组件。"]})})]})})},ke=[{Component:L,key:"share-sheet-basic",sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default () => {
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

export default () => {
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
`}},title:"基础用法",identifier:"share-sheet-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:H,key:"share-sheet-groups",sources:{_:{tsx:`import React from 'react'
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

export default () => {
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

export default () => {
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
`}},title:"展示多行选项",identifier:"share-sheet-groups",lang:"tsx",meta:{title:"展示多行选项"}},{Component:$,key:"share-sheet-custom",sources:{_:{tsx:`import React from 'react'
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

export default () => {
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

export default () => {
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
`}},title:"自定义图标",identifier:"share-sheet-custom",lang:"tsx",meta:{title:"自定义图标"}},{Component:q,key:"share-sheet-description",sources:{_:{tsx:`import React from 'react'
import { Cell, ShareSheet } from 'react-native-system-ui'
import { Photo, Qr, Share, ShareO, Wechat } from 'react-native-system-icon'

const options = [
  { name: '微信', icon: <Wechat /> },
  { name: '微博', icon: <Share /> },
  { name: '复制链接', icon: <ShareO />, description: '描述信息' },
  { name: '分享海报', icon: <Photo /> },
  { name: '二维码', icon: <Qr /> },
]

export default () => {
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

export default () => {
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

`}},title:"展示描述信息",identifier:"share-sheet-description",lang:"tsx",meta:{title:"展示描述信息"}}],Oe={simulator:{compact:!0}},Me=[{depth:1,text:"ShareSheet 分享面板",id:"sharesheet-分享面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"展示多行选项",id:"展示多行选项"},{depth:3,text:"自定义图标",id:"自定义图标"},{depth:3,text:"展示描述信息",id:"展示描述信息"},{depth:2,text:"API",id:"api"},{depth:3,text:"ShareSheet Props",id:"sharesheet-props"},{depth:3,text:"ShareSheetOption",id:"sharesheetoption"}],Re="/docs/components/share-sheet.md",De="ShareSheet 分享面板",Ne="1766319671000",dn=t=>t.children({MdContent:Be,demos:ke,frontmatter:Oe,slugs:Me,filePath:Re,title:De,updatedTime:Ne});export{Be as MdContent,dn as default,ke as demos,Re as filePath,Oe as frontmatter,Me as slugs,De as title,Ne as updatedTime};
