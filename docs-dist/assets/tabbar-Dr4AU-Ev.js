import{R as T,r as u,j as e,V as b,s as Z,b as X,c as K,a as ve,S as fe}from"./main-CX5QgiXt.js";import{S as E,a as S}from"./SettingO-BEl_qiSe.js";import{S as R}from"./HomeO-DYLObVCW.js";import{S as _}from"./Search-B0YBmGnN.js";import{b as Te}from"./hairline-6DGjxZ3L.js";import{c as Ie,T as je}from"./createComponentTokensHook-Hc3l7riF.js";import{u as ye}from"./useControllableValue-wnptCJgI.js";import{m as ge}from"./mergeTokensOverride-0bmRzp_m.js";import{S as Fe}from"./SafeAreaView-DiARkPwI.js";import{B as Q}from"./Badge-62Eg6G2h.js";import{M as Oe}from"./index-CQ2P49YQ.js";import{u as Ee}from"./useAriaPress-sIRcrStb.js";import{I as Se}from"./index-BDzwQtXM.js";import"./IconBase-D_kjvpJY.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./number-DMCxwktP.js";import"./extends-CF3RwP-h.js";import"./index-CJrLMJTa.js";import"./index-CTcRCRb2.js";const ee=T.createContext(null),Ce=()=>u.useContext(ee),we=r=>{const{palette:c,spacing:n,fontSize:o}=r;return{defaults:{fixed:!0,border:!0,placeholder:!1,safeAreaInsetBottom:!1},colors:{background:"#ffffff",border:c.default[200],active:c.primary[600],inactive:c.default[600]},layout:{height:50,paddingHorizontal:0,paddingVertical:n.xs},icon:{size:22},typography:{fontSize:o.sm,fontWeight:"400"}}},te=Ie("tabbar",we),ae=r=>{const{children:c,value:n,defaultValue:o,fixed:y,border:z,zIndex:k=1,activeColor:C,inactiveColor:x,background:I,placeholder:L,safeAreaInsetBottom:w,iconSize:W,tokensOverride:g,style:$,contentStyle:q,onChange:V,...m}=r,a=te(g),d=y??a.defaults.fixed,v=z??a.defaults.border,B=I??a.colors.background,P=L??a.defaults.placeholder,N=W??a.icon.size,G=w??d,p=u.useMemo(()=>T.Children.toArray(c).filter(T.isValidElement),[c]),F=p.length?p[0].props.name??0:void 0,[j,D]=ye(r,{defaultValue:F,valuePropName:"value",defaultValuePropName:"defaultValue",trigger:"onChange"}),J=p.map((i,h)=>i.props.name??h),s=j==null?F:J.some(i=>i===j)?j:F,[M,f]=u.useState(a.layout.height),l=d&&P,ue=u.useCallback(i=>{if(!l)return;const h=i.nativeEvent.layout.height;f(O=>Math.abs(O-h)<.5?O:h)},[l]),U=u.useCallback((i,h)=>D(i,h),[D]),be=u.useMemo(()=>({activeValue:s,activeColor:C??a.colors.active,inactiveColor:x??a.colors.inactive,fontSize:a.typography.fontSize,fontWeight:a.typography.fontWeight,onSelect:U}),[C,s,x,U,a.colors.active,a.colors.inactive,a.typography.fontSize,a.typography.fontWeight]),me=u.useMemo(()=>p.map((i,h)=>{const O=i.props.name??h;return T.cloneElement(i,{key:i.key??O,name:O,index:h,iconSize:N,tokensOverride:ge(g,i.props.tokensOverride)})}),[N,p,g]);if(p.length===0)return null;const de=G?Fe:b,le={height:M},he=[A.container,d&&[A.fixed,{zIndex:k}],$],xe=[A.bar,{backgroundColor:B,paddingHorizontal:a.layout.paddingHorizontal,minHeight:a.layout.height},v?Te(a.colors.border):null,q],pe=[A.row,{minHeight:a.layout.height}];return e.jsxs(e.Fragment,{children:[l&&e.jsx(b,{testID:"rv-tabbar-placeholder",style:le}),e.jsx(b,{...m,style:he,onLayout:ue,children:e.jsx(de,{style:xe,children:e.jsx(ee.Provider,{value:be,children:e.jsx(b,{style:pe,accessibilityRole:"tablist",children:me})})})})]})},A=Z.create({container:{width:"100%"},bar:{width:"100%"},row:{flexDirection:"row"},fixed:{position:"absolute",left:0,right:0,bottom:0}});ae.displayName="Tabbar";const ne=r=>{const{name:c,icon:n,badge:o,dot:y=!1,onClick:z,textStyle:k,iconStyle:C,children:x,disabled:I=!1,style:L,index:w,testID:W,iconSize:g,tokensOverride:$,...q}=r,V=te($),m=Ce();if(!m)return null;const a=c??w??0,d=m.activeValue===a,v=d?m.activeColor:m.inactiveColor,B=g??V.icon.size,P=u.useCallback(s=>{if(!T.isValidElement(s))return s;const M=s,f={},l=M.props??{};return l.size==null&&(f.size=B),l.fill==null&&(f.fill=v),l.color==null&&(f.color=v),l.style!=null&&(f.style=[l.style,{color:v}]),T.cloneElement(M,f)},[v,B]),N=u.useCallback(()=>{if(!n)return null;const s=X(n)?n(d):n;return P(s)},[P,n,d]),G=u.useCallback(()=>X(x)?x(d):x,[x,d]),p=Ee({disabled:I,onPress:()=>{I||(z?.(),m.onSelect(a,w??0))},extraProps:{accessibilityRole:"tab",accessibilityState:{selected:d,disabled:I},testID:W??`rv-tabbar-item-${a}`}}),F=y||K(o),j=u.useCallback(()=>{if(K(o)){if(ve(o))return e.jsx(Q,{content:o});if(fe(o)){const s=o;return e.jsx(Q,{...s,dot:y||s.dot})}return o}return e.jsx(Q,{dot:!0})},[o,y]),D=[H.item,{height:V.layout.height,paddingVertical:V.layout.paddingVertical,opacity:I?.5:1},L],J=[H.label,{color:v,fontSize:m.fontSize,fontWeight:m.fontWeight,lineHeight:m.fontSize},k];return e.jsxs(Oe,{...q,...p.interactionProps,style:D,children:[e.jsxs(b,{style:[H.iconWrapper,C],children:[N(),F&&e.jsx(b,{style:H.badge,children:j()})]}),K(x)?e.jsx(je,{style:J,children:G()}):null]})},H=Z.create({item:{flex:1,alignItems:"center",justifyContent:"center",gap:4},iconWrapper:{alignItems:"center",justifyContent:"center"},badge:{position:"absolute",top:-4,right:-12},label:{includeFontPadding:!1}});ne.displayName="Tabbar.Item";const t=ae;t.Item=ne;const re=()=>e.jsx(b,{children:e.jsxs(t,{fixed:!1,children:[e.jsx(t.Item,{icon:e.jsx(R,{}),children:"标签"}),e.jsx(t.Item,{icon:e.jsx(_,{}),children:"标签"}),e.jsx(t.Item,{icon:e.jsx(E,{}),children:"标签"}),e.jsx(t.Item,{icon:e.jsx(S,{}),children:"标签"})]})}),Ve=`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},title:"基础用法",identifier:"tabbar-base",lang:"tsx",meta:{title:"基础用法"}},ie=()=>{const[r,c]=T.useState("setting");return e.jsx(b,{children:e.jsxs(t,{fixed:!1,value:r,onChange:n=>c(n),children:[e.jsx(t.Item,{name:"home",icon:e.jsx(R,{}),children:"标签"}),e.jsx(t.Item,{name:"search",icon:e.jsx(_,{}),children:"标签"}),e.jsx(t.Item,{name:"firends",icon:e.jsx(E,{}),children:"标签"}),e.jsx(t.Item,{name:"setting",icon:e.jsx(S,{}),children:"标签"})]})})},Pe=`import React from 'react'
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


`,Ne={code:Pe,sources:{_:{tsx:`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},title:"受控组件",identifier:"tabbar-control",lang:"tsx",meta:{title:"受控组件"}},ce=()=>e.jsx(b,{children:e.jsxs(t,{fixed:!1,children:[e.jsx(t.Item,{icon:e.jsx(R,{}),children:"标签"}),e.jsx(t.Item,{badge:{dot:!0},icon:e.jsx(_,{}),children:"标签"}),e.jsx(t.Item,{badge:{content:5},icon:e.jsx(E,{}),children:"标签"}),e.jsx(t.Item,{badge:{content:20},icon:e.jsx(S,{}),children:"标签"})]})}),De=`import React from 'react'
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
`,Me={code:De,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"徽标提示",identifier:"tabbar-badge",lang:"tsx",meta:{title:"徽标提示"}},Y={active:"https://img.yzcdn.cn/vant/user-active.png",inactive:"https://img.yzcdn.cn/vant/user-inactive.png"},oe=()=>e.jsx(b,{children:e.jsxs(t,{fixed:!1,children:[e.jsx(t.Item,{icon:r=>e.jsx(Se,{accessibilityLabel:"tab",source:{uri:r?Y.active:Y.inactive},style:{width:24,height:24}}),children:"图标"}),e.jsx(t.Item,{icon:e.jsx(E,{}),children:"图标"}),e.jsx(t.Item,{icon:e.jsx(S,{}),children:"图标"})]})}),Ae=`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},title:"自定义图标",identifier:"tabbar-custom-icon",lang:"tsx",meta:{title:"自定义图标"}},se=()=>e.jsx(b,{children:e.jsxs(t,{fixed:!1,activeColor:"#f44336",inactiveColor:"#000",children:[e.jsx(t.Item,{icon:e.jsx(R,{}),children:"颜色"}),e.jsx(t.Item,{icon:e.jsx(_,{}),children:"颜色"}),e.jsx(t.Item,{icon:e.jsx(E,{}),children:"颜色"}),e.jsx(t.Item,{icon:e.jsx(S,{}),children:"颜色"})]})}),Re=`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},title:"自定义颜色",identifier:"tabbar-custom-color",lang:"tsx",meta:{title:"自定义颜色"}},ze=function({previewer:r=()=>null,api:c=()=>null}){const n=r;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"tabbar-标签栏","data-anchor":"tabbar-标签栏",children:"Tabbar 标签栏"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"底部导航栏，用于在不同页面之间进行切换。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { Tabbar } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["点击 ",e.jsx("code",{children:"Tabbar.Item"})," 即可切换选中的标签(非受控状态)。"]}),e.jsx(n,{...Be,children:e.jsx(re,{})}),e.jsx("h3",{id:"受控组件","data-anchor":"受控组件",children:"受控组件"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"value"})," 默认绑定选中标签的索引值，通过修改 ",e.jsx("code",{children:"value"})," 即可切换选中的标签。"]}),e.jsxs("li",{children:["在标签指定 ",e.jsx("code",{children:"name"})," 属性的情况下，",e.jsx("code",{children:"value"})," 的值为当前标签的 ",e.jsx("code",{children:"name"}),"。"]})]}),e.jsx(n,{...Ne,children:e.jsx(ie,{})}),e.jsx("h3",{id:"徽标提示","data-anchor":"徽标提示",children:"徽标提示"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"badge"})," 属性，可以设置图标相应的徽标内容。"]}),e.jsx(n,{...Me,children:e.jsx(ce,{})}),e.jsx("h3",{id:"自定义图标","data-anchor":"自定义图标",children:"自定义图标"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"icon"})," 属性自定义图标。"]}),e.jsx(n,{...He,children:e.jsx(oe,{})}),e.jsx("h3",{id:"自定义颜色","data-anchor":"自定义颜色",children:"自定义颜色"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"activeColor"})," 属性设置选中标签的颜色，通过 ",e.jsx("code",{children:"inactiveColor"})," 属性设置未选中标签的颜色。"]}),e.jsx(n,{..._e,children:e.jsx(se,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"tabbar-props","data-anchor":"tabbar-props",children:"Tabbar Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中标签的名称或索引值"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中标签的名称或索引值"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fixed"})}),e.jsx("td",{children:"是否固定在底部"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"元素 z-index"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"选中标签的颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题主色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inactiveColor"})}),e.jsx("td",{children:"未选中标签的颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题默认色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"固定在底部时，是否在标签位置生成一个等高的占位元素"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"safeAreaInsetBottom"})}),e.jsx("td",{children:"是否开启底部安全区适配，设置 fixed 时默认开启"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"tabbar-events","data-anchor":"tabbar-events",children:"Tabbar Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"切换标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(active: number | string, index: number) => void"})})]})})]}),e.jsx("h3",{id:"tabbaritem-props","data-anchor":"tabbaritem-props",children:"Tabbar.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"标签名称，作为匹配的标识符"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"当前标签的索引值"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (active: boolean) => ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"badge"})}),e.jsx("td",{children:"图标右上角徽标的内容"}),e.jsx("td",{children:e.jsx("code",{children:"BadgeProps | number | string"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["补充说明（RN 扩展）：额外支持 ",e.jsx("code",{children:"background"}),"、",e.jsx("code",{children:"contentStyle"}),"、",e.jsx("code",{children:"style"}),"、",e.jsx("code",{children:"iconSize"}),"、",e.jsx("code",{children:"dot"}),"、",e.jsx("code",{children:"disabled"}),"、",e.jsx("code",{children:"textStyle"}),"、",e.jsx("code",{children:"iconStyle"}),"、",e.jsx("code",{children:"testID"}),"、",e.jsx("code",{children:"onClick"})," 等属性。"]})})]})})},ke=[{Component:re,key:"tabbar-base",sources:{_:{tsx:`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
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


`}},title:"自定义颜色",identifier:"tabbar-custom-color",lang:"tsx",meta:{title:"自定义颜色"}}],Le={simulator:{compact:!0}},We=[{depth:1,text:"Tabbar 标签栏",id:"tabbar-标签栏"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"受控组件",id:"受控组件"},{depth:3,text:"徽标提示",id:"徽标提示"},{depth:3,text:"自定义图标",id:"自定义图标"},{depth:3,text:"自定义颜色",id:"自定义颜色"},{depth:2,text:"API",id:"api"},{depth:3,text:"Tabbar Props",id:"tabbar-props"},{depth:3,text:"Tabbar Events",id:"tabbar-events"},{depth:3,text:"Tabbar.Item Props",id:"tabbaritem-props"}],$e="/docs/components/tabbar.md",qe="Tabbar 标签栏",Ge="1769570039000",dt=r=>r.children({MdContent:ze,demos:ke,frontmatter:Le,slugs:We,filePath:$e,title:qe,updatedTime:Ge});export{ze as MdContent,dt as default,ke as demos,$e as filePath,Le as frontmatter,We as slugs,qe as title,Ge as updatedTime};
