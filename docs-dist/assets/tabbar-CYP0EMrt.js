import{r as n,R as F,j as e,V as d,s as Z,b as X,c as K,a as ve,S as fe}from"./main-O6KZrSH_.js";import{S as V,a as B}from"./SettingO-B0os3B8m.js";import{S as W}from"./HomeO-BRKD-0vB.js";import{S as $}from"./Search--X5QcCEe.js";import{b as Te}from"./hairline-Dpq7rEkb.js";import{c as Ie,T as je}from"./createComponentTokensHook-KzOuLm4c.js";import{u as ye}from"./useControllableValue-_OJua4RH.js";import{m as ge}from"./mergeTokensOverride-DdSb0rjB.js";import{S as Fe}from"./SafeAreaView-L8uUXbhq.js";import{B as Q}from"./Badge-APtmfgQT.js";import{M as Oe}from"./index-DvCZppP1.js";import{u as Ee}from"./useAriaPress-DMjZXFvR.js";import{I as Se}from"./index-C_v13XD0.js";import"./IconBase-DZr7C-P7.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./number-BcSDXImJ.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";import"./index-DcjI-aro.js";const ee=n.createContext(null),Ce=()=>n.useContext(ee),we=i=>{const{palette:u,spacing:r,fontSize:c}=i;return{defaults:{fixed:!0,border:!0,placeholder:!1,safeAreaInsetBottom:!1},colors:{background:"#ffffff",border:u.default[200],active:u.primary[600],inactive:u.default[600]},layout:{height:50,paddingHorizontal:0,paddingVertical:r.xs},icon:{size:22},typography:{fontSize:c.sm,fontWeight:"400"}}},te=Ie("tabbar",we),ae=i=>{const{children:u,value:r,defaultValue:c,fixed:j,border:q,zIndex:O=1,activeColor:P,inactiveColor:v,background:f,placeholder:M,safeAreaInsetBottom:N,iconSize:G,tokensOverride:E,style:D,contentStyle:A,onChange:y,...o}=i,t=te(E),b=j??t.defaults.fixed,h=q??t.defaults.border,S=f??t.colors.background,H=M??t.defaults.placeholder,R=G??t.icon.size,J=N??b,l=n.useMemo(()=>F.Children.toArray(u).filter(F.isValidElement),[u]),g=n.useMemo(()=>l.length?l[0].props.name??0:void 0,[l]),[T,_]=ye(i,{defaultValue:g,valuePropName:"value",defaultValuePropName:"defaultValue",trigger:"onChange"}),z=n.useMemo(()=>l.map((s,x)=>s.props.name??x),[l]),m=n.useMemo(()=>T==null?g:z.some(s=>s===T)?T:g,[T,g,z]),[C,I]=n.useState(t.layout.height),p=b&&H,ue=n.useCallback(s=>{if(!p)return;const x=s.nativeEvent.layout.height;I(w=>Math.abs(w-x)<.5?w:x)},[p]),U=n.useCallback((s,x)=>_(s,x),[_]),be=n.useMemo(()=>({activeValue:m,activeColor:P??t.colors.active,inactiveColor:v??t.colors.inactive,fontSize:t.typography.fontSize,fontWeight:t.typography.fontWeight,onSelect:U}),[P,m,v,U,t.colors.active,t.colors.inactive,t.typography.fontSize,t.typography.fontWeight]),me=n.useMemo(()=>l.map((s,x)=>{const w=s.props.name??x;return F.cloneElement(s,{key:s.key??w,name:w,index:x,iconSize:R,tokensOverride:ge(E,s.props.tokensOverride)})}),[R,l,E]);if(l.length===0)return null;const de=J?Fe:d,le=n.useMemo(()=>({height:C}),[C]),he=n.useMemo(()=>[k.container,b&&[k.fixed,{zIndex:O}],D],[b,D,O]),pe=n.useMemo(()=>[k.bar,{backgroundColor:S,paddingHorizontal:t.layout.paddingHorizontal,minHeight:t.layout.height},h?Te(t.colors.border):null,A],[S,h,A,t.colors.border,t.layout.height,t.layout.paddingHorizontal]),xe=n.useMemo(()=>[k.row,{minHeight:t.layout.height}],[t.layout.height]);return e.jsxs(e.Fragment,{children:[p&&e.jsx(d,{testID:"rv-tabbar-placeholder",style:le}),e.jsx(d,{...o,style:he,onLayout:ue,children:e.jsx(de,{style:pe,children:e.jsx(ee.Provider,{value:be,children:e.jsx(d,{style:xe,accessibilityRole:"tablist",children:me})})})})]})},k=Z.create({container:{width:"100%"},bar:{width:"100%"},row:{flexDirection:"row"},fixed:{position:"absolute",left:0,right:0,bottom:0}});ae.displayName="Tabbar";const ne=i=>{const{name:u,icon:r,badge:c,dot:j=!1,onClick:q,textStyle:O,iconStyle:P,children:v,disabled:f=!1,style:M,index:N,testID:G,iconSize:E,tokensOverride:D,...A}=i,y=te(D),o=Ce();if(!o)return null;const t=u??N??0,b=o.activeValue===t,h=b?o.activeColor:o.inactiveColor,S=E??y.icon.size,H=n.useCallback(m=>{if(!F.isValidElement(m))return m;const C=m,I={},p=C.props??{};return p.size==null&&(I.size=S),p.fill==null&&(I.fill=h),p.color==null&&(I.color=h),p.style!=null&&(I.style=[p.style,{color:h}]),F.cloneElement(C,I)},[h,S]),R=n.useCallback(()=>{if(!r)return null;const m=X(r)?r(b):r;return H(m)},[H,r,b]),J=n.useCallback(()=>X(v)?v(b):v,[v,b]),l=Ee({disabled:f,onPress:()=>{f||(q?.(),o.onSelect(t,N??0))},extraProps:{accessibilityRole:"tab",accessibilityState:{selected:b,disabled:f},testID:G??`rv-tabbar-item-${t}`}}),g=n.useMemo(()=>j||K(c),[c,j]),T=n.useCallback(()=>{if(K(c)){if(ve(c))return e.jsx(Q,{content:c});if(fe(c)){const m=c;return e.jsx(Q,{...m,dot:j||m.dot})}return c}return e.jsx(Q,{dot:!0})},[c,j]),_=n.useMemo(()=>[L.item,{height:y.layout.height,paddingVertical:y.layout.paddingVertical,opacity:f?.5:1},M],[f,M,y.layout.height,y.layout.paddingVertical]),z=n.useMemo(()=>[L.label,{color:h,fontSize:o.fontSize,fontWeight:o.fontWeight,lineHeight:o.fontSize},O],[h,o.fontSize,o.fontWeight,O]);return e.jsxs(Oe,{...A,...l.interactionProps,style:_,children:[e.jsxs(d,{style:[L.iconWrapper,P],children:[R(),g&&e.jsx(d,{style:L.badge,children:T()})]}),K(v)?e.jsx(je,{style:z,children:J()}):null]})},L=Z.create({item:{flex:1,alignItems:"center",justifyContent:"center",gap:4},iconWrapper:{alignItems:"center",justifyContent:"center"},badge:{position:"absolute",top:-4,right:-12},label:{includeFontPadding:!1}});ne.displayName="Tabbar.Item";const a=ae;a.Item=ne;const re=()=>e.jsx(d,{children:e.jsxs(a,{fixed:!1,children:[e.jsx(a.Item,{icon:e.jsx(W,{}),children:"标签"}),e.jsx(a.Item,{icon:e.jsx($,{}),children:"标签"}),e.jsx(a.Item,{icon:e.jsx(V,{}),children:"标签"}),e.jsx(a.Item,{icon:e.jsx(B,{}),children:"标签"})]})}),Ve=`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`,Be={code:Ve,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"基础用法",identifier:"tabbar-base",lang:"tsx",meta:{title:"基础用法"}},ie=()=>{const[i,u]=F.useState("setting");return e.jsx(d,{children:e.jsxs(a,{fixed:!1,value:i,onChange:r=>u(r),children:[e.jsx(a.Item,{name:"home",icon:e.jsx(W,{}),children:"标签"}),e.jsx(a.Item,{name:"search",icon:e.jsx($,{}),children:"标签"}),e.jsx(a.Item,{name:"firends",icon:e.jsx(V,{}),children:"标签"}),e.jsx(a.Item,{name:"setting",icon:e.jsx(B,{}),children:"标签"})]})})},Pe=`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  const [name, setName] = React.useState<string | number>('setting')

  return (
    <View>
      <Tabbar fixed={false} value={name} onChange={v => setName(v)}>
        <Tabbar.Item name="home" icon={<HomeO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="search" icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="firends" icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="setting" icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`,Me={code:Pe,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  const [name, setName] = React.useState<string | number>('setting')

  return (
    <View>
      <Tabbar fixed={false} value={name} onChange={v => setName(v)}>
        <Tabbar.Item name="home" icon={<HomeO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="search" icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="firends" icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="setting" icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  const [name, setName] = React.useState<string | number>('setting')

  return (
    <View>
      <Tabbar fixed={false} value={name} onChange={v => setName(v)}>
        <Tabbar.Item name="home" icon={<HomeO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="search" icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="firends" icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="setting" icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"受控组件",identifier:"tabbar-control",lang:"tsx",meta:{title:"受控组件"}},ce=()=>e.jsx(d,{children:e.jsxs(a,{fixed:!1,children:[e.jsx(a.Item,{icon:e.jsx(W,{}),children:"标签"}),e.jsx(a.Item,{badge:{dot:!0},icon:e.jsx($,{}),children:"标签"}),e.jsx(a.Item,{badge:{content:5},icon:e.jsx(V,{}),children:"标签"}),e.jsx(a.Item,{badge:{content:20},icon:e.jsx(B,{}),children:"标签"})]})}),Ne=`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item badge={{ dot: true }} icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 5 }} icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 20 }} icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}
`,De={code:Ne,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item badge={{ dot: true }} icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 5 }} icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 20 }} icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item badge={{ dot: true }} icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 5 }} icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 20 }} icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}
`}},title:"徽标提示",identifier:"tabbar-badge",lang:"tsx",meta:{title:"徽标提示"}},Y={active:"https://img.yzcdn.cn/vant/user-active.png",inactive:"https://img.yzcdn.cn/vant/user-inactive.png"},oe=()=>e.jsx(d,{children:e.jsxs(a,{fixed:!1,children:[e.jsx(a.Item,{icon:i=>e.jsx(Se,{accessibilityLabel:"tab",source:{uri:i?Y.active:Y.inactive},style:{width:24,height:24}}),children:"图标"}),e.jsx(a.Item,{icon:e.jsx(V,{}),children:"图标"}),e.jsx(a.Item,{icon:e.jsx(B,{}),children:"图标"})]})}),Ae=`import React from 'react'
import { Image, View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, SettingO } from 'react-native-system-icon'

const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
}

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item
          icon={ac => (
            <Image
              accessibilityLabel="tab"
              source={{ uri: ac ? icon.active : icon.inactive }}
              style={{ width: 24, height: 24 }}
            />
          )}
        >
          图标
        </Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>图标</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>图标</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`,He={code:Ae,sources:{_:{tsx:`import React from 'react'
import { Image, View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, SettingO } from 'react-native-system-icon'

const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
}

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item
          icon={ac => (
            <Image
              accessibilityLabel="tab"
              source={{ uri: ac ? icon.active : icon.inactive }}
              style={{ width: 24, height: 24 }}
            />
          )}
        >
          图标
        </Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>图标</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>图标</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Image, View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, SettingO } from 'react-native-system-icon'

const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
}

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item
          icon={ac => (
            <Image
              accessibilityLabel="tab"
              source={{ uri: ac ? icon.active : icon.inactive }}
              style={{ width: 24, height: 24 }}
            />
          )}
        >
          图标
        </Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>图标</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>图标</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"自定义图标",identifier:"tabbar-custom-icon",lang:"tsx",meta:{title:"自定义图标"}},se=()=>e.jsx(d,{children:e.jsxs(a,{fixed:!1,activeColor:"#f44336",inactiveColor:"#000",children:[e.jsx(a.Item,{icon:e.jsx(W,{}),children:"颜色"}),e.jsx(a.Item,{icon:e.jsx($,{}),children:"颜色"}),e.jsx(a.Item,{icon:e.jsx(V,{}),children:"颜色"}),e.jsx(a.Item,{icon:e.jsx(B,{}),children:"颜色"})]})}),Re=`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false} activeColor="#f44336" inactiveColor="#000">
        <Tabbar.Item icon={<HomeO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>颜色</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`,_e={code:Re,sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false} activeColor="#f44336" inactiveColor="#000">
        <Tabbar.Item icon={<HomeO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>颜色</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false} activeColor="#f44336" inactiveColor="#000">
        <Tabbar.Item icon={<HomeO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>颜色</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"自定义颜色",identifier:"tabbar-custom-color",lang:"tsx",meta:{title:"自定义颜色"}},ze=function({previewer:i=()=>null,api:u=()=>null}){const r=i;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"tabbar-标签栏","data-anchor":"tabbar-标签栏",children:"Tabbar 标签栏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"底部导航栏，用于在不同页面之间进行切换。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(r,{code:"import { Tabbar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["点击 ",e.jsx("code",{children:"Tabbar.Item"})," 即可切换选中的标签(非受控状态)。"]}),e.jsx(r,{...Be,children:e.jsx(re,{})}),e.jsx("h3",{id:"受控组件","data-anchor":"受控组件",children:"受控组件"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"value"})," 默认绑定选中标签的索引值，通过修改 ",e.jsx("code",{children:"value"})," 即可切换选中的标签。"]}),e.jsxs("li",{children:["在标签指定 ",e.jsx("code",{children:"name"})," 属性的情况下，",e.jsx("code",{children:"value"})," 的值为当前标签的 ",e.jsx("code",{children:"name"}),"。"]})]}),e.jsx(r,{...Me,children:e.jsx(ie,{})}),e.jsx("h3",{id:"徽标提示","data-anchor":"徽标提示",children:"徽标提示"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"badge"})," 属性，可以设置图标相应的徽标内容。"]}),e.jsx(r,{...De,children:e.jsx(ce,{})}),e.jsx("h3",{id:"自定义图标","data-anchor":"自定义图标",children:"自定义图标"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"icon"})," 属性自定义图标。"]}),e.jsx(r,{...He,children:e.jsx(oe,{})}),e.jsx("h3",{id:"自定义颜色","data-anchor":"自定义颜色",children:"自定义颜色"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"activeColor"})," 属性设置选中标签的颜色，通过 ",e.jsx("code",{children:"inactiveColor"})," 属性设置未选中标签的颜色。"]}),e.jsx(r,{..._e,children:e.jsx(se,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"tabbar-props","data-anchor":"tabbar-props",children:"Tabbar Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中标签的名称或索引值"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中标签的名称或索引值"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fixed"})}),e.jsx("td",{children:"是否固定在底部"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"元素 z-index"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"选中标签的颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题主色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactiveColor"})}),e.jsx("td",{children:"未选中标签的颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题默认色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"固定在底部时，是否在标签位置生成一个等高的占位元素"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否开启底部安全区适配，设置 fixed 时默认开启"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"tabbar-events","data-anchor":"tabbar-events",children:"Tabbar Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"切换标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(active: number | string, index: number) => void"})})]})})]}),e.jsx("h3",{id:"tabbaritem-props","data-anchor":"tabbaritem-props",children:"Tabbar.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"标签名称，作为匹配的标识符"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"当前标签的索引值"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (active: boolean) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"badge"})}),e.jsx("td",{children:"图标右上角徽标的内容"}),e.jsx("td",{children:e.jsx("code",{children:"BadgeProps | number | string"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["补充说明（RN 扩展）：额外支持 ",e.jsx("code",{children:"background"}),"、",e.jsx("code",{children:"contentStyle"}),"、",e.jsx("code",{children:"style"}),"、",e.jsx("code",{children:"iconSize"}),"、",e.jsx("code",{children:"dot"}),"、",e.jsx("code",{children:"disabled"}),"、",e.jsx("code",{children:"textStyle"}),"、",e.jsx("code",{children:"iconStyle"}),"、",e.jsx("code",{children:"testID"}),"、",e.jsx("code",{children:"onClick"})," 等属性。"]})})]})})},ke=[{Component:re,key:"tabbar-base",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"基础用法",identifier:"tabbar-base",lang:"tsx",meta:{title:"基础用法"}},{Component:ie,key:"tabbar-control",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  const [name, setName] = React.useState<string | number>('setting')

  return (
    <View>
      <Tabbar fixed={false} value={name} onChange={v => setName(v)}>
        <Tabbar.Item name="home" icon={<HomeO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="search" icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="firends" icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="setting" icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  const [name, setName] = React.useState<string | number>('setting')

  return (
    <View>
      <Tabbar fixed={false} value={name} onChange={v => setName(v)}>
        <Tabbar.Item name="home" icon={<HomeO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="search" icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="firends" icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item name="setting" icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"受控组件",identifier:"tabbar-control",lang:"tsx",meta:{title:"受控组件"}},{Component:ce,key:"tabbar-badge",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item badge={{ dot: true }} icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 5 }} icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 20 }} icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
        <Tabbar.Item badge={{ dot: true }} icon={<Search />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 5 }} icon={<FriendsO />}>
          标签
        </Tabbar.Item>
        <Tabbar.Item badge={{ content: 20 }} icon={<SettingO />}>
          标签
        </Tabbar.Item>
      </Tabbar>
    </View>
  )
}
`}},title:"徽标提示",identifier:"tabbar-badge",lang:"tsx",meta:{title:"徽标提示"}},{Component:oe,key:"tabbar-custom-icon",sources:{_:{tsx:`import React from 'react'
import { Image, View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, SettingO } from 'react-native-system-icon'

const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
}

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item
          icon={ac => (
            <Image
              accessibilityLabel="tab"
              source={{ uri: ac ? icon.active : icon.inactive }}
              style={{ width: 24, height: 24 }}
            />
          )}
        >
          图标
        </Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>图标</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>图标</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Image, View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, SettingO } from 'react-native-system-icon'

const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
}

export default () => {
  return (
    <View>
      <Tabbar fixed={false}>
        <Tabbar.Item
          icon={ac => (
            <Image
              accessibilityLabel="tab"
              source={{ uri: ac ? icon.active : icon.inactive }}
              style={{ width: 24, height: 24 }}
            />
          )}
        >
          图标
        </Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>图标</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>图标</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"自定义图标",identifier:"tabbar-custom-icon",lang:"tsx",meta:{title:"自定义图标"}},{Component:se,key:"tabbar-custom-color",sources:{_:{tsx:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false} activeColor="#f44336" inactiveColor="#000">
        <Tabbar.Item icon={<HomeO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>颜色</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { View } from 'react-native'

import { Tabbar } from 'react-native-system-ui'
import { FriendsO, HomeO, Search, SettingO } from 'react-native-system-icon'

export default () => {
  return (
    <View>
      <Tabbar fixed={false} activeColor="#f44336" inactiveColor="#000">
        <Tabbar.Item icon={<HomeO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>颜色</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>颜色</Tabbar.Item>
      </Tabbar>
    </View>
  )
}


`}},title:"自定义颜色",identifier:"tabbar-custom-color",lang:"tsx",meta:{title:"自定义颜色"}}],Le={simulator:{compact:!0}},We=[{depth:1,text:"Tabbar 标签栏",id:"tabbar-标签栏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"受控组件",id:"受控组件"},{depth:3,text:"徽标提示",id:"徽标提示"},{depth:3,text:"自定义图标",id:"自定义图标"},{depth:3,text:"自定义颜色",id:"自定义颜色"},{depth:2,text:"API",id:"api"},{depth:3,text:"Tabbar Props",id:"tabbar-props"},{depth:3,text:"Tabbar Events",id:"tabbar-events"},{depth:3,text:"Tabbar.Item Props",id:"tabbaritem-props"}],$e="/docs/components/tabbar.md",qe="Tabbar 标签栏",Ge="1769570039000",dt=i=>i.children({MdContent:ze,demos:ke,frontmatter:Le,slugs:We,filePath:$e,title:qe,updatedTime:Ge});export{ze as MdContent,dt as default,ke as demos,$e as filePath,Le as frontmatter,We as slugs,qe as title,Ge as updatedTime};
