import{r as w,c as i,j as e,V as o,a as c}from"./main-BaO0UwhN.js";import{S as fe}from"./ArrowLeft-C1faGPf7.js";import{c as pe}from"./hairline-BK-uo_cS.js";import{c as me,T as v}from"./createComponentTokensHook-CsVvHGcO.js";import{M as I}from"./index-DvDeiqEs.js";import{S as je}from"./SafeAreaView-CB0OnAI8.js";import{u as D}from"./useAriaPress-vCycRA2r.js";import{S as ve}from"./Search-65PVaotJ.js";import"./IconBase-elbJGmhV.js";import"./extends-CF3RwP-h.js";import"./useSafeAreaPadding-wXYTmIbN.js";import"./index-CJrLMJTa.js";class y{static alert(){}}const ye=({palette:r,spacing:h,fontSize:n})=>({defaults:{fixed:!1,placeholder:!1,border:!0,safeAreaInsetTop:!1,leftArrow:!1,zIndex:1},layout:{container:{width:"100%"},bar:{flexDirection:"row",alignItems:"center",minHeight:48,paddingHorizontal:h.md},center:{flex:1,alignItems:"center",justifyContent:"center",paddingHorizontal:12},side:{minWidth:60,flexDirection:"row",alignItems:"center",gap:4},rightAlign:{justifyContent:"flex-end"},sidePlaceholder:{minWidth:60},sideText:{fontSize:16},titleWrapper:{alignItems:"center"},title:{includeFontPadding:!1},description:{marginTop:2,includeFontPadding:!1},fixed:{position:"absolute",top:0,left:0,right:0}},colors:{background:"#ffffff",text:r.default[900],description:r.default[500],border:r.default[200],icon:r.default[700]},typography:{titleSize:n.lg,titleWeight:"600",descriptionSize:n.sm},sizing:{height:52}}),ge=me("navBar",ye),C=r=>{const{tokensOverride:h,title:n,description:x,children:F,leftText:l,rightText:s,leftIcon:E,rightIcon:k,leftArrow:z,fixed:_,placeholder:V,zIndex:H,border:W,safeAreaInsetTop:O,background:$,tintColor:g,titleStyle:q,descriptionStyle:G,sideStyle:f,onPressLeft:J,onClickLeft:K,onPressRight:Q,onClickRight:U,style:X,...Y}=r,t=ge(h),A=z??t.defaults.leftArrow,B=_??t.defaults.fixed,Z=V??t.defaults.placeholder,ee=H??t.defaults.zIndex,te=W??t.defaults.border,P=O??B,N=$??t.colors.background,p=J??K,m=Q??U,[re,ne]=w.useState(t.sizing.height),b=B&&Z,T=w.useCallback(d=>{if(!b)return;const a=d.nativeEvent.layout.height;ne(u=>Math.abs(u-a)<.5?u:a)},[b]),ie=g??t.colors.text,j=g??t.colors.icon,oe=c(l)?`${l}`:"返回",le=c(s)?`${s}`:"操作",se=D({disabled:!p,onPress:p,extraProps:{accessibilityRole:"button",accessibilityLabel:oe}}),ae=D({disabled:!m,onPress:m,extraProps:{accessibilityRole:"button",accessibilityLabel:le}}),ce=()=>{const d=A===!0?e.jsx(fe,{size:18,fill:j,color:j}):i(A)&&A;if(!(!!p||i(d)||i(l)||i(E)))return e.jsx(o,{style:t.layout.sidePlaceholder});const u=e.jsxs(e.Fragment,{children:[d,E,i(l)?c(l)?e.jsx(v,{numberOfLines:1,style:[t.layout.sideText,{color:j}],children:l}):l:null]});return p?e.jsx(I,{hitSlop:{top:8,right:8,bottom:8,left:8},testID:"rv-navbar-left",style:[t.layout.side,f],...se.interactionProps,children:u}):e.jsx(o,{testID:"rv-navbar-left",style:[t.layout.side,f],children:u})},de=()=>{if(!(!!m||i(s)||i(k)))return e.jsx(o,{style:t.layout.sidePlaceholder});const a=e.jsxs(e.Fragment,{children:[i(s)?c(s)?e.jsx(v,{numberOfLines:1,style:[t.layout.sideText,{color:j}],children:s}):s:null,k]});return m?e.jsx(I,{hitSlop:{top:8,right:8,bottom:8,left:8},testID:"rv-navbar-right",style:[t.layout.side,t.layout.rightAlign,f],...ae.interactionProps,children:a}):e.jsx(o,{testID:"rv-navbar-right",style:[t.layout.side,t.layout.rightAlign,f],children:a})},ue=i(F)?F:e.jsxs(o,{style:t.layout.titleWrapper,children:[i(n)?c(n)?e.jsx(v,{style:[t.layout.title,{color:ie,fontSize:t.typography.titleSize,fontWeight:t.typography.titleWeight},q],numberOfLines:1,children:n}):n:null,i(x)?c(x)?e.jsx(v,{style:[t.layout.description,{color:g??t.colors.description,fontSize:t.typography.descriptionSize},G],numberOfLines:1,children:x}):x:null]}),R=e.jsxs(o,{style:[t.layout.bar,{backgroundColor:N},te?pe(t.colors.border):null],onLayout:P?void 0:T,children:[ce(),e.jsx(o,{style:t.layout.center,children:ue}),de()]}),he=P?e.jsx(je,{onLayout:T,style:{backgroundColor:N},children:R}):R,xe=e.jsx(o,{...Y,style:[t.layout.container,B&&[t.layout.fixed,{zIndex:ee}],X],children:he});return e.jsxs(e.Fragment,{children:[b?e.jsx(o,{testID:"rv-navbar-placeholder",style:{height:re}}):null,xe]})};C.displayName="NavBar";const S=()=>e.jsx(o,{style:{height:120,backgroundColor:"#f4f5f7",margin:16,borderRadius:12}}),L=()=>e.jsxs(e.Fragment,{children:[e.jsx(C,{title:"标题",leftText:"返回",leftArrow:!0,rightText:"按钮",onClickLeft:()=>y.alert("点击返回"),onClickRight:()=>y.alert("点击按钮")}),e.jsx(S,{}),e.jsx(S,{})]}),Ae=`import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default () => (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      leftArrow
      rightText="按钮"
      onClickLeft={() => Alert.alert('点击返回')}
      onClickRight={() => Alert.alert('点击按钮')}
    />
    <Block />
    <Block />
  </>
)
`,Be={code:Ae,sources:{_:{tsx:`import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default () => (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      leftArrow
      rightText="按钮"
      onClickLeft={() => Alert.alert('点击返回')}
      onClickRight={() => Alert.alert('点击按钮')}
    />
    <Block />
    <Block />
  </>
)
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default () => (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      leftArrow
      rightText="按钮"
      onClickLeft={() => Alert.alert('点击返回')}
      onClickRight={() => Alert.alert('点击按钮')}
    />
    <Block />
    <Block />
  </>
)
`}},title:"基础用法",identifier:"nav-bar-basic",lang:"tsx",meta:{title:"基础用法"}},M=()=>e.jsx(C,{title:"标题",leftText:"返回",leftArrow:!0,rightText:e.jsx(ve,{size:20}),onClickLeft:()=>y.alert("点击返回"),onClickRight:()=>y.alert("点击按钮")}),be=`import React from 'react'
import { Alert } from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow
    rightText={<SearchIcon size={20} />}
    onClickLeft={() => Alert.alert('点击返回')}
    onClickRight={() => Alert.alert('点击按钮')}
  />
)
`,Ce={code:be,sources:{_:{tsx:`import React from 'react'
import { Alert } from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow
    rightText={<SearchIcon size={20} />}
    onClickLeft={() => Alert.alert('点击返回')}
    onClickRight={() => Alert.alert('点击按钮')}
  />
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Alert } from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow
    rightText={<SearchIcon size={20} />}
    onClickLeft={() => Alert.alert('点击返回')}
    onClickRight={() => Alert.alert('点击按钮')}
  />
)
`}},title:"自定义内容",identifier:"nav-bar-custom",lang:"tsx",meta:{title:"自定义内容"}},Fe=function({previewer:r=()=>null,api:h=()=>null}){const n=r;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"navbar-导航栏","data-anchor":"navbar-导航栏",children:"NavBar 导航栏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"为页面提供导航功能，常用于页面顶部。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { NavBar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"左右两侧可以放置返回文案和操作按钮。"}),e.jsx("div",{children:e.jsx(n,{...Be,children:e.jsx(L,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsx("p",{children:"自定义导航栏两侧的内容。"}),e.jsx("div",{children:e.jsx(n,{...Ce,children:e.jsx(M,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftText"})}),e.jsx("td",{children:"左侧文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightText"})}),e.jsx("td",{children:"右侧文案"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"''"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"leftArrow"})}),e.jsx("td",{children:"自定义左侧箭头"}),e.jsx("td",{children:e.jsx("code",{children:"boolean | ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示下边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fixed"})}),e.jsx("td",{children:"是否固定在顶部"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"导航栏 z-index"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"固定在顶部时，是否在标签位置生成一个等高的占位元素"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetTop"})}),e.jsx("td",{children:"是否开启顶部安全区适配"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickLeft"})}),e.jsx("td",{children:"点击左侧按钮时触发"}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickRight"})}),e.jsx("td",{children:"点击右侧按钮时触发"}),e.jsx("td",{children:"-"})]})]})]})]})})},Ee=[{Component:L,key:"nav-bar-basic",sources:{_:{tsx:`import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default () => (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      leftArrow
      rightText="按钮"
      onClickLeft={() => Alert.alert('点击返回')}
      onClickRight={() => Alert.alert('点击按钮')}
    />
    <Block />
    <Block />
  </>
)
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Alert, View } from 'react-native'

import { NavBar } from 'react-native-system-ui'

const Block = () => (
  <View style={{ height: 120, backgroundColor: '#f4f5f7', margin: 16, borderRadius: 12 }} />
)

export default () => (
  <>
    <NavBar
      title="标题"
      leftText="返回"
      leftArrow
      rightText="按钮"
      onClickLeft={() => Alert.alert('点击返回')}
      onClickRight={() => Alert.alert('点击按钮')}
    />
    <Block />
    <Block />
  </>
)
`}},title:"基础用法",identifier:"nav-bar-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:M,key:"nav-bar-custom",sources:{_:{tsx:`import React from 'react'
import { Alert } from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow
    rightText={<SearchIcon size={20} />}
    onClickLeft={() => Alert.alert('点击返回')}
    onClickRight={() => Alert.alert('点击按钮')}
  />
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Alert } from 'react-native'
import { Search as SearchIcon } from 'react-native-system-icon'

import { NavBar } from 'react-native-system-ui'

export default () => (
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow
    rightText={<SearchIcon size={20} />}
    onClickLeft={() => Alert.alert('点击返回')}
    onClickRight={() => Alert.alert('点击按钮')}
  />
)
`}},title:"自定义内容",identifier:"nav-bar-custom",lang:"tsx",meta:{title:"自定义内容"}}],ke={simulator:{compact:!0}},Pe=[{depth:1,text:"NavBar 导航栏",id:"navbar-导航栏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"}],Ne="/docs/components/nav-bar.md",Te="NavBar 导航栏",Re="1766649452000",$e=r=>r.children({MdContent:Fe,demos:Ee,frontmatter:ke,slugs:Pe,filePath:Ne,title:Te,updatedTime:Re});export{Fe as MdContent,$e as default,Ee as demos,Ne as filePath,ke as frontmatter,Pe as slugs,Te as title,Re as updatedTime};
