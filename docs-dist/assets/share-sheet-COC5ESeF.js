import{r as a,D as ce,a3 as h,j as e,V as r,a as p,s as ae,R as u}from"./main-O6KZrSH_.js";import{e as v,b as A,S as B,a as k,c as V,d as re}from"./Wechat-DlJESbOm.js";import{C as j}from"./index-DCx-GaLs.js";import{a as le}from"./hairline-Dpq7rEkb.js";import{P as ue}from"./Popup-DvjP5SkZ.js";import{c as de,T as m}from"./createComponentTokensHook-KzOuLm4c.js";import{M as _}from"./index-DvCZppP1.js";import{u as L}from"./useAriaPress-DMjZXFvR.js";import{I as E}from"./Image-M4elApQ_.js";import"./IconBase-DZr7C-P7.js";import"./Arrow-r8D7M_Tx.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./Animated-qBs3E5U6.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-Tvvid2F1.js";import"./index-Cq_gACMg.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./index-ANZ1PvOD.js";const he=t=>{const{palette:i,spacing:n,fontSize:o}=t;return{colors:{background:"#ffffff",title:i.default[900],description:i.default[500],option:i.default[900],optionDesc:i.default[500],border:i.default[200],divider:i.default[100]},spacing:{horizontal:n.md,vertical:n.sm,gap:n.xs,popupPadding:0,headerPaddingTop:n.sm,headerPaddingHorizontal:n.lg,headerPaddingBottom:n.md,titleMarginTop:n.xs,descriptionMarginTop:n.xs,nodeMarginTop:n.xs,iconMarginHorizontal:n.md,optionTextPaddingHorizontal:n.xs,optionDescPaddingHorizontal:n.lg,cancelPaddingVertical:14,cancelMarginTop:n.sm},sizing:{icon:48},typography:{title:o.md,description:o.xs,option:o.xs,optionDesc:o.xxs,cancel:o.md}}},pe=de("shareSheet",he),me=t=>!t||t.length===0?[]:Array.isArray(t[0])?t:[t],xe=u.memo(({option:t,index:i,columns:n,tokens:o,onSelect:g})=>{const S=a.useMemo(()=>({width:`${100/n}%`}),[n]),d=a.useMemo(()=>({width:o.sizing.icon,height:o.sizing.icon}),[o.sizing.icon]),f=L({onPress:()=>g(t,i),extraProps:{accessibilityRole:"button",testID:`rv-share-sheet-item-${i}`}});return e.jsxs(_,{style:[c.option,S],...f.interactionProps,children:[e.jsx(r,{style:[c.icon,d,{marginHorizontal:o.spacing.iconMarginHorizontal}],children:t.icon}),h(t.name)?p(t.name)?e.jsx(m,{style:[c.optionText,{color:o.colors.option,fontSize:o.typography.option,paddingHorizontal:o.spacing.optionTextPaddingHorizontal}],children:t.name}):t.name:null,h(t.description)?p(t.description)?e.jsx(m,{style:[c.optionDesc,{color:o.colors.optionDesc,marginTop:o.spacing.gap,fontSize:o.typography.optionDesc,paddingHorizontal:o.spacing.optionDescPaddingHorizontal}],children:t.description}):e.jsx(r,{style:[c.optionDescNode,{marginTop:o.spacing.gap,paddingHorizontal:o.spacing.optionDescPaddingHorizontal}],children:t.description}):null]})}),ge=u.memo(({cancelText:t,tokens:i,onPress:n})=>{const o=L({onPress:n,extraProps:{testID:"rv-share-sheet-cancel",accessibilityRole:"button"}});return e.jsx(r,{style:{backgroundColor:i.colors.divider},children:e.jsx(_,{style:[c.cancel,{backgroundColor:i.colors.background,paddingVertical:i.spacing.cancelPaddingVertical,marginTop:i.spacing.cancelMarginTop}],...o.interactionProps,children:p(t)?e.jsx(m,{style:[c.cancelText,{color:i.colors.option,fontSize:i.typography.cancel}],children:t}):t})})}),x=t=>{const{visible:i,title:n,description:o,cancelText:g="取消",options:S,columns:d=4,closeOnSelect:f=!0,safeAreaInsetBottom:J=!0,children:K,tokensOverride:U,onSelect:M,onCancel:O,onClose:R,lockScroll:X=!0,overlay:Y=!0,round:Z=!0,style:D,placement:We,position:ze,...ee}=t,s=pe(U),C=a.useMemo(()=>me(S),[S]),N=a.useMemo(()=>ce(d)?Math.max(1,Math.floor(d)):4,[d]),y=h(n),F=h(o),ne=h(g),b=a.useCallback(l=>{l&&O?.(),R?.()},[O,R]),W=a.useCallback((l,P)=>{M?.(l,P),l.onPress?.(l),f&&b()},[b,f,M]),z=a.useCallback(()=>b(!0),[b]),te=a.useMemo(()=>[c.wrapper,{backgroundColor:s.colors.background}],[s.colors.background]),I=a.useMemo(()=>[c.optionsRow,{paddingLeft:s.spacing.gap,paddingVertical:12}],[s.spacing.gap]),ie=a.useMemo(()=>{if(!C.length)return null;let l=0;return C.map((P,Q)=>e.jsxs(r,{children:[Q?e.jsx(r,{style:le({position:"top",color:s.colors.border,left:s.spacing.horizontal,right:s.spacing.horizontal})}):null,e.jsx(r,{style:I,children:P.map(w=>{const T=l++;return e.jsx(xe,{option:w,index:T,columns:N,tokens:s,onSelect:W},w.key??T)})})]},Q))},[C,I,W,N,s]),oe=a.useMemo(()=>!y&&!F?null:e.jsxs(r,{style:[c.header,{paddingTop:s.spacing.headerPaddingTop,paddingHorizontal:s.spacing.headerPaddingHorizontal,paddingBottom:s.spacing.headerPaddingBottom}],children:[y?p(n)?e.jsx(m,{style:[c.title,{color:s.colors.title,fontSize:s.typography.title,marginTop:s.spacing.titleMarginTop}],children:n}):e.jsx(r,{style:[c.node,{marginTop:s.spacing.nodeMarginTop}],children:n}):null,F?p(o)?e.jsx(m,{style:[c.description,{color:s.colors.description,fontSize:s.typography.description,marginTop:s.spacing.descriptionMarginTop}],children:o}):e.jsx(r,{style:[c.node,{marginTop:s.spacing.nodeMarginTop}],children:o}):null]}),[o,F,y,n,s.colors.description,s.colors.title,s.spacing.descriptionMarginTop,s.spacing.headerPaddingBottom,s.spacing.headerPaddingHorizontal,s.spacing.headerPaddingTop,s.spacing.nodeMarginTop,s.spacing.titleMarginTop,s.typography.description,s.typography.title]),se=a.useMemo(()=>[c.popupOverride,{padding:s.spacing.popupPadding},D],[D,s.spacing.popupPadding]);return e.jsx(ue,{...ee,visible:i,placement:"bottom",round:Z,safeAreaInsetBottom:J,overlay:Y,lockScroll:X,onClose:z,style:se,children:e.jsxs(r,{style:te,children:[oe,ie,K,ne?e.jsx(ge,{cancelText:g,tokens:s,onPress:z}):null]})})},c=ae.create({popupOverride:{},wrapper:{width:"100%"},header:{alignItems:"center"},title:{fontWeight:"normal",textAlign:"center"},description:{textAlign:"center"},node:{alignItems:"center"},optionsRow:{flexDirection:"row",flexWrap:"wrap"},option:{alignItems:"center",justifyContent:"center"},icon:{alignItems:"center",justifyContent:"center"},optionText:{fontWeight:"500",textAlign:"center"},optionDesc:{textAlign:"center"},optionDescNode:{alignItems:"center"},cancel:{alignItems:"center"},cancelText:{fontWeight:"500"}});x.displayName="ShareSheet";const Se=[{name:"微信",icon:e.jsx(v,{})},{name:"微博",icon:e.jsx(A,{})},{name:"分享海报",icon:e.jsx(B,{})},{name:"二维码",icon:e.jsx(k,{})}],H=()=>{const[t,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(x,{visible:t,title:"立即分享给好友",options:Se,closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},fe=`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础用法",identifier:"share-sheet-basic",lang:"tsx",meta:{title:"基础用法"}},ve=[[{name:"微信",icon:e.jsx(v,{})},{name:"朋友圈",icon:e.jsx(v,{})},{name:"微博",icon:e.jsx(A,{})},{name:"QQ",icon:e.jsx(V,{})}],[{name:"复制链接",icon:e.jsx(V,{})},{name:"分享海报",icon:e.jsx(B,{})},{name:"二维码",icon:e.jsx(k,{})},{name:"小程序码",icon:e.jsx(re,{})}]],$=()=>{const[t,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(x,{visible:t,title:"立即分享给好友",options:ve,closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},je=`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"展示多行选项",identifier:"share-sheet-groups",lang:"tsx",meta:{title:"展示多行选项"}},ye=[{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-fire.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})},{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-light.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})},{name:"名称",icon:e.jsx(E,{src:"https://img.yzcdn.cn/vant/custom-icon-water.png",width:48,height:48,containerStyle:{backgroundColor:"transparent"}})}],q=()=>{const[t,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(x,{visible:t,options:ye,title:"立即分享给好友",closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},Fe=`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义图标",identifier:"share-sheet-custom",lang:"tsx",meta:{title:"自定义图标"}},Ee=[{name:"微信",icon:e.jsx(v,{})},{name:"微博",icon:e.jsx(A,{})},{name:"复制链接",icon:e.jsx(V,{}),description:"描述信息"},{name:"分享海报",icon:e.jsx(B,{})},{name:"二维码",icon:e.jsx(k,{})}],G=()=>{const[t,i]=u.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(j,{title:"显示分享面板",clickable:!0,isLink:!0,onPress:()=>i(!0)}),e.jsx(x,{visible:t,options:Ee,title:"立即分享给好友",description:"描述信息",closeOnSelect:!1,onCancel:()=>i(!1),onSelect:(n,o)=>{console.log("option",n),console.log("index",o),i(!1)}})]})},Ve=`import React from 'react'
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

`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

`}},title:"展示描述信息",identifier:"share-sheet-description",lang:"tsx",meta:{title:"展示描述信息"}},Be=function({previewer:t=()=>null,api:i=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"sharesheet-分享面板","data-anchor":"sharesheet-分享面板",children:"ShareSheet 分享面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"展示常见分享渠道或快捷操作的弹层，支持多行分组与自定义内容。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { ShareSheet } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["分享面板通过 ",e.jsx("code",{children:"options"})," 定义分享选项。"]}),e.jsx("div",{children:e.jsx(n,{...be,children:e.jsx(H,{})})}),e.jsx("h3",{id:"展示多行选项","data-anchor":"展示多行选项",children:"展示多行选项"}),e.jsxs("p",{children:["当分享选项较多时，可将 ",e.jsx("code",{children:"options"})," 定义为二维数组，每个子数组会作为一行选项展示。"]}),e.jsx("div",{children:e.jsx(n,{...Ce,children:e.jsx($,{})})}),e.jsx("h3",{id:"自定义图标","data-anchor":"自定义图标",children:"自定义图标"}),e.jsxs("p",{children:["除了使用图标组件外，也可以在 ",e.jsx("code",{children:"icon"})," 中传入图片节点来使用自定义图标。"]}),e.jsx("div",{children:e.jsx(n,{...Pe,children:e.jsx(q,{})})}),e.jsx("h3",{id:"展示描述信息","data-anchor":"展示描述信息",children:"展示描述信息"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"description"})," 属性可以设置标题下方的描述文字，在 ",e.jsx("code",{children:"options"})," 内设置 ",e.jsx("code",{children:"description"})," 可添加分享选项描述。"]}),e.jsx("div",{children:e.jsx(n,{...Ae,children:e.jsx(G,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"sharesheet-props","data-anchor":"sharesheet-props",children:"ShareSheet Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"分享选项（支持二维数组分组）"}),e.jsx("td",{children:e.jsx("code",{children:"ShareSheetOptions"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cancelText"})}),e.jsx("td",{children:"底部取消按钮文字，传空隐藏"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"'取消'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsx("td",{children:"每行展示数量，用于计算宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"4"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnSelect"})}),e.jsx("td",{children:"点击选项后是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否适配底部安全区"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onSelect"})}),e.jsx("td",{children:"选择分享项回调"}),e.jsx("td",{children:e.jsx("code",{children:"(option, index) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onCancel"})}),e.jsx("td",{children:"点击取消或关闭时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"其余"}),e.jsxs("td",{children:["透传 ",e.jsx("code",{children:"Popup"})," 的属性"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"sharesheetoption","data-anchor":"sharesheetoption",children:"ShareSheetOption"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"字段"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"分享项名称"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"图标节点"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"副标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsxs("td",{children:["点击回调（先于 ",e.jsx("code",{children:"onSelect"})," 执行）"]}),e.jsx("td",{children:e.jsx("code",{children:"(option) => void"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["当前实现聚焦分享栅格场景，暂未提供图片资源加载、懒加载等能力；如需网络图标，可在 ",e.jsx("code",{children:"icon"})," 中传入自定义组件。"]})})]})})},ke=[{Component:H,key:"share-sheet-basic",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础用法",identifier:"share-sheet-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:$,key:"share-sheet-groups",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"展示多行选项",identifier:"share-sheet-groups",lang:"tsx",meta:{title:"展示多行选项"}},{Component:q,key:"share-sheet-custom",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义图标",identifier:"share-sheet-custom",lang:"tsx",meta:{title:"自定义图标"}},{Component:G,key:"share-sheet-description",sources:{_:{tsx:`import React from 'react'
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

`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
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

`}},title:"展示描述信息",identifier:"share-sheet-description",lang:"tsx",meta:{title:"展示描述信息"}}],Me={simulator:{compact:!0}},Oe=[{depth:1,text:"ShareSheet 分享面板",id:"sharesheet-分享面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"展示多行选项",id:"展示多行选项"},{depth:3,text:"自定义图标",id:"自定义图标"},{depth:3,text:"展示描述信息",id:"展示描述信息"},{depth:2,text:"API",id:"api"},{depth:3,text:"ShareSheet Props",id:"sharesheet-props"},{depth:3,text:"ShareSheetOption",id:"sharesheetoption"}],Re="/docs/components/share-sheet.md",De="ShareSheet 分享面板",Ne="1766319671000",dn=t=>t.children({MdContent:Be,demos:ke,frontmatter:Me,slugs:Oe,filePath:Re,title:De,updatedTime:Ne});export{Be as MdContent,dn as default,ke as demos,Re as filePath,Me as frontmatter,Oe as slugs,De as title,Ne as updatedTime};
