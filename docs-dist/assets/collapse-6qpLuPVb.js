import{R as E,r as d,b as X,Z as he,j as e,V as b,i as Ce,a as fe,c as je}from"./main-BuQiU471.js";import{S as Ie}from"./Arrow-xfLuWLNA.js";import{C as be}from"./index-CvjfcfGO.js";import{c as ve,T as ye}from"./createComponentTokensHook-BZh_OSSd.js";import{A as w,E as Fe}from"./Animated-CaOvDCxr.js";import{a as Ee}from"./hairline-MnVzd1gq.js";import{S as ge,a as Pe,b as Be}from"./VolumeO-BT77RE6G.js";import{S as Ae}from"./Space-BsyLL5rO.js";import"./IconBase-CrFgzAiS.js";import"./index-BRfylSA6.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-D5uAXibC.js";import"./index-CJrLMJTa.js";import"./index-CfLKkUWT.js";import"./index-BAZkLH96.js";import"./index-Ct6-Nt5P.js";import"./number-DwcHNqSr.js";const Ve=t=>{const{palette:r,spacing:n,fontSize:h,typography:c,radii:v}=t;return{defaults:{accordion:!1,border:!0,iconPosition:"right",panelBorder:!0,panelIsLink:!0,panelSize:"normal",animationDuration:200},layout:{container:{position:"relative"},panel:{position:"relative"},hairline:{position:"absolute"},headerWrapper:{position:"relative"},bodyWrapper:{position:"relative",overflow:"hidden"},headerIconRow:{flexDirection:"row",alignItems:"center"},bodyContent:{position:"absolute",top:0,left:0,right:0}},colors:{border:r.default[200],title:r.default[800],description:r.default[500],background:"#ffffff",active:r.default[50],arrow:r.default[400],disabled:r.default[400]},typography:{titleSize:h.md,descriptionSize:h.sm,fontFamily:c.fontFamily,titleWeight:c.weight.medium},panel:{borderRadius:v.sm},spacing:{paddingVertical:n.md,paddingHorizontal:n.lg,descriptionTop:n.xs,iconGap:8}}},Se=ve("collapse",Ve),Y=E.createContext(null),U=t=>{if(t!==void 0)return Array.isArray(t)?t.map(String):t===null?[]:[String(t)]},Me=(t,r)=>r?t[0]??"":t,K=(t=>{const{tokensOverride:r,children:n,accordion:h,value:c,defaultValue:v,onChange:f,border:O,iconPosition:i,expandIcon:S,disabled:y,style:L,...H}=t,p=Se(r),u=h??p.defaults.accordion,I=O??p.defaults.border,M=i??p.defaults.iconPosition,{colors:g}=p,P=c!==void 0,R=U(c),D=U(v)??[],[j,F]=d.useState(()=>u?D.slice(0,1):D),m=P?u?(R??[]).slice(0,1):R??[]:j,B=d.useCallback((x,s)=>{if(y)return;const l=m.includes(x),o=s??!l;let C;u?C=o?[x]:l?[]:m:C=o?l?m:[...m,x]:l?m.filter(A=>A!==x):m,P||F(C),f?.(Me(C,u))},[u,m,P,y,f]),_=d.useMemo(()=>({activeKeys:m,toggle:B,accordion:u,iconPosition:M,expandIcon:S,border:I,disabled:y,tokens:p}),[u,m,I,y,S,M,p,B]),T=d.useMemo(()=>E.Children.toArray(n).map((s,l)=>{if(!E.isValidElement(s)||!X(s.type)&&!he(s.type))return s;const o=s.props.name??String(l);return E.cloneElement(s,{name:o,index:l})}),[n]);return e.jsx(Y.Provider,{value:_,children:e.jsxs(b,{style:[p.layout.container,I&&{backgroundColor:g.background},L],...H,children:[I&&e.jsx(k,{tokens:p,position:"top",color:g.border}),I&&e.jsx(k,{tokens:p,position:"bottom",color:g.border}),T]})})}),k=({tokens:t,position:r,color:n,inset:h=0})=>{const c=Ee({position:r,color:n,left:h,right:h});return e.jsx(b,{pointerEvents:"none",style:[t.layout.hairline,c]})},z=E.forwardRef((t,r)=>{const n=d.useContext(Y);if(!n)throw new Error("Collapse.Panel must be used within Collapse");const{activeKeys:h,toggle:c,iconPosition:v,expandIcon:f,disabled:O,tokens:i}=n,{name:S="0",index:y=0,title:L,description:H,label:p,icon:u,extra:I,value:M,border:g=i.defaults.panelBorder,isLink:P=i.defaults.panelIsLink,size:R=i.defaults.panelSize,disabled:D,readOnly:j,children:F,style:m,titleStyle:B,descriptionStyle:_,...T}=t,x=String(S),s=h.includes(x),l=O||D,{colors:o,spacing:C,typography:A}=i,[G,ne]=d.useState(0),V=d.useRef(new w.Value(s?1:0)).current,q=V.interpolate({inputRange:[0,1],outputRange:["90deg","-90deg"]});d.useEffect(()=>{w.timing(V,{toValue:s?1:0,duration:i.defaults.animationDuration,easing:Fe.ease,useNativeDriver:!1}).start()},[V,s,i.defaults.animationDuration]);const se=H??p,ae=I??M,ie=d.useCallback(()=>{l||j||c(x)},[l,x,j,c]);d.useImperativeHandle(r,()=>({toggle:W=>{l||j||c(x,W)}}),[l,x,j,c]);const re=d.useCallback(W=>{const N=W.nativeEvent.layout.height;Ce(N)&&Number.isFinite(N)&&ne(Q=>Q===N?Q:N)},[]),de=d.useMemo(()=>({height:V.interpolate({inputRange:[0,1],outputRange:[0,G]})}),[V,G]),Z=d.useCallback(()=>X(f)?f(s):f||e.jsx(w.View,{style:{transform:[{rotate:q}]},children:e.jsx(Ie,{size:16,fill:l?o.disabled:o.arrow})}),[o.arrow,o.disabled,f,s,l,q]),ce=d.useMemo(()=>fe(F)?e.jsx(ye,{style:{color:l?o.disabled:o.description,fontSize:A.descriptionSize,lineHeight:Math.round(A.descriptionSize*1.5)},children:F}):F,[F,o.description,o.disabled,l,A.descriptionSize]),J=!!g,ue=y>0&&J,pe=s&&J,$=P&&!j,me=v==="left"?$||je(u)?e.jsxs(b,{style:i.layout.headerIconRow,children:[$?e.jsx(b,{style:{marginRight:u?i.spacing.iconGap:0},children:Z()}):null,u]}):void 0:u,xe=v==="right"&&$?Z():void 0;return e.jsxs(b,{style:[i.layout.panel,{backgroundColor:o.background},m],...T,children:[ue?e.jsx(k,{tokens:i,position:"top",color:o.border,inset:C.paddingHorizontal}):null,e.jsxs(b,{style:i.layout.headerWrapper,children:[e.jsx(be,{title:L,label:se,icon:me,value:ae,size:R,border:!1,disabled:l,onPress:j?void 0:ie,accessibilityState:{expanded:s,disabled:l},titleStyle:l?[B,{color:o.disabled}]:B,labelStyle:l?[_,{color:o.disabled}]:_,valueStyle:l?{color:o.disabled}:void 0,rightIcon:xe}),pe?e.jsx(k,{tokens:i,position:"bottom",color:o.border,inset:C.paddingHorizontal}):null]}),e.jsx(w.View,{style:[i.layout.bodyWrapper,de],children:e.jsx(b,{onLayout:re,style:[i.layout.bodyContent,{paddingVertical:C.paddingVertical,paddingHorizontal:C.paddingHorizontal,backgroundColor:o.background}],children:ce})})]})});K.Panel=z;K.Item=z;const a=Object.assign(E.memo(K),{Panel:z,Item:z});a.displayName="Collapse";const ee=()=>e.jsxs(a,{defaultValue:["1"],children:[e.jsx(a.Item,{name:"1",title:"标题1",label:"描述信息",children:"文字"}),e.jsx(a.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(a.Item,{name:"3",title:"标题3",children:"文字"})]}),Re=`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1" label="描述信息">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`,De={code:Re,sources:{_:{tsx:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1" label="描述信息">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1" label="描述信息">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},te=()=>e.jsxs(a,{accordion:!0,defaultValue:"1",children:[e.jsx(a.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(a.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(a.Item,{name:"3",title:"标题3",children:"文字"})]}),_e=`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse accordion defaultValue="1">
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`,Ne={code:_e,sources:{_:{tsx:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse accordion defaultValue="1">
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse accordion defaultValue="1">
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},le=()=>e.jsxs(a,{defaultValue:["1"],children:[e.jsx(a.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(a.Item,{name:"2",title:"标题2",disabled:!0,children:"文字"}),e.jsx(a.Item,{name:"3",title:"标题3",disabled:!0,children:"文字"})]}),we=`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2" disabled>
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3" disabled>
      文字
    </Collapse.Item>
  </Collapse>
)

`,ke={code:we,sources:{_:{tsx:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2" disabled>
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3" disabled>
      文字
    </Collapse.Item>
  </Collapse>
)

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2" disabled>
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3" disabled>
      文字
    </Collapse.Item>
  </Collapse>
)

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},oe=()=>e.jsxs(Ae,{direction:"vertical",gap:12,children:[e.jsx(a,{expandIcon:t=>t?e.jsx(ge,{fill:"#3b82f6",color:"#3b82f6"}):e.jsx(Pe,{fill:"#3b82f6",color:"#3b82f6"}),border:!1,children:e.jsx(a.Item,{name:"1",title:"自定义图标",label:"描述信息",children:"文字"})}),e.jsx(a,{border:!1,iconPosition:"left",children:e.jsx(a.Item,{name:"2",title:"自定义标题",label:"描述信息",icon:e.jsx(Be,{fill:"#f97316",color:"#f97316"}),children:"文字"})})]}),ze=`import React from 'react'

import { Minus, Plus, VolumeO } from 'react-native-system-icon'
import { Collapse, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse
      expandIcon={active =>
        active ? <Minus fill="#3b82f6" color="#3b82f6" /> : <Plus fill="#3b82f6" color="#3b82f6" />
      }
      border={false}
    >
      <Collapse.Item name="1" title="自定义图标" label="描述信息">
        文字
      </Collapse.Item>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Item
        name="2"
        title="自定义标题"
        label="描述信息"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        文字
      </Collapse.Item>
    </Collapse>
  </Space>
)
`,Oe={code:ze,sources:{_:{tsx:`import React from 'react'

import { Minus, Plus, VolumeO } from 'react-native-system-icon'
import { Collapse, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse
      expandIcon={active =>
        active ? <Minus fill="#3b82f6" color="#3b82f6" /> : <Plus fill="#3b82f6" color="#3b82f6" />
      }
      border={false}
    >
      <Collapse.Item name="1" title="自定义图标" label="描述信息">
        文字
      </Collapse.Item>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Item
        name="2"
        title="自定义标题"
        label="描述信息"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        文字
      </Collapse.Item>
    </Collapse>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Minus, Plus, VolumeO } from 'react-native-system-icon'
import { Collapse, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse
      expandIcon={active =>
        active ? <Minus fill="#3b82f6" color="#3b82f6" /> : <Plus fill="#3b82f6" color="#3b82f6" />
      }
      border={false}
    >
      <Collapse.Item name="1" title="自定义图标" label="描述信息">
        文字
      </Collapse.Item>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Item
        name="2"
        title="自定义标题"
        label="描述信息"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        文字
      </Collapse.Item>
    </Collapse>
  </Space>
)
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}},Le=function({previewer:t=()=>null,api:r=()=>null}){const n=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"collapse-折叠面板","data-anchor":"collapse-折叠面板",children:"Collapse 折叠面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"通过折叠面板收纳和展示内容，支持受控和手风琴模式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { Collapse } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(n,{...De,children:e.jsx(ee,{})})}),e.jsx("h3",{id:"手风琴模式","data-anchor":"手风琴模式",children:"手风琴模式"}),e.jsx("div",{children:e.jsx(n,{...Ne,children:e.jsx(te,{})})}),e.jsx("h3",{id:"禁用状态","data-anchor":"禁用状态",children:"禁用状态"}),e.jsx("div",{children:e.jsx(n,{...ke,children:e.jsx(le,{})})}),e.jsx("h3",{id:"自定义图标与标题","data-anchor":"自定义图标与标题",children:"自定义图标与标题"}),e.jsx("div",{children:e.jsx(n,{...Oe,children:e.jsx(oe,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"collapse-props","data-anchor":"collapse-props",children:"Collapse Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"accordion"})}),e.jsx("td",{children:"是否开启手风琴模式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsxs("td",{children:["当前展开面板，手风琴模式下为 ",e.jsx("code",{children:"string"}),"，否则为 ",e.jsx("code",{children:"string[]"})]}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认展开面板"}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"展开状态变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string | string[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconPosition"})}),e.jsx("td",{children:"图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"expandIcon"})}),e.jsx("td",{children:"自定义展开图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (active: boolean) => ReactNode"})}),e.jsx("td",{children:"默认箭头"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用全部面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"collapseitem-props","data-anchor":"collapseitem-props",children:"Collapse.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"唯一标识符"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"子序号"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"面板标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"标题左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"标题右侧区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示内边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLink"})}),e.jsx("td",{children:"是否展示标题栏右侧箭头"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"标题栏大小"}),e.jsx("td",{children:e.jsx("code",{children:"'normal' | 'large'"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用当前面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否为只读状态，只读状态下无法操作面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsxs("blockquote",{children:[e.jsxs("p",{children:[e.jsx("code",{children:"Collapse.Item"})," 内部可以放任意自定义内容；当传入 ",e.jsx("code",{children:"expandIcon"})," 为函数时会收到当前展开状态。"]}),e.jsxs("p",{children:["为了兼容旧写法：",e.jsx("code",{children:"Collapse.Panel"})," 等价于 ",e.jsx("code",{children:"Collapse.Item"}),"，且 ",e.jsx("code",{children:"description/extra"})," 分别是 ",e.jsx("code",{children:"label/value"})," 的别名。"]})]})]})})},He=[{Component:ee,key:"collapse-base",sources:{_:{tsx:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1" label="描述信息">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1" label="描述信息">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},{Component:te,key:"collapse-accordion",sources:{_:{tsx:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse accordion defaultValue="1">
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse accordion defaultValue="1">
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2">
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3">
      文字
    </Collapse.Item>
  </Collapse>
)
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},{Component:le,key:"collapse-disabled",sources:{_:{tsx:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2" disabled>
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3" disabled>
      文字
    </Collapse.Item>
  </Collapse>
)

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Collapse } from 'react-native-system-ui'

export default () => (
  <Collapse defaultValue={['1']}>
    <Collapse.Item name="1" title="标题1">
      文字
    </Collapse.Item>
    <Collapse.Item name="2" title="标题2" disabled>
      文字
    </Collapse.Item>
    <Collapse.Item name="3" title="标题3" disabled>
      文字
    </Collapse.Item>
  </Collapse>
)

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},{Component:oe,key:"collapse-custom",sources:{_:{tsx:`import React from 'react'

import { Minus, Plus, VolumeO } from 'react-native-system-icon'
import { Collapse, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse
      expandIcon={active =>
        active ? <Minus fill="#3b82f6" color="#3b82f6" /> : <Plus fill="#3b82f6" color="#3b82f6" />
      }
      border={false}
    >
      <Collapse.Item name="1" title="自定义图标" label="描述信息">
        文字
      </Collapse.Item>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Item
        name="2"
        title="自定义标题"
        label="描述信息"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        文字
      </Collapse.Item>
    </Collapse>
  </Space>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Minus, Plus, VolumeO } from 'react-native-system-icon'
import { Collapse, Space } from 'react-native-system-ui'

export default () => (
  <Space direction="vertical" gap={12}>
    <Collapse
      expandIcon={active =>
        active ? <Minus fill="#3b82f6" color="#3b82f6" /> : <Plus fill="#3b82f6" color="#3b82f6" />
      }
      border={false}
    >
      <Collapse.Item name="1" title="自定义图标" label="描述信息">
        文字
      </Collapse.Item>
    </Collapse>
    <Collapse border={false} iconPosition="left">
      <Collapse.Item
        name="2"
        title="自定义标题"
        label="描述信息"
        icon={<VolumeO fill="#f97316" color="#f97316" />}
      >
        文字
      </Collapse.Item>
    </Collapse>
  </Space>
)
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}}],Te={simulator:{compact:!0}},$e=[{depth:1,text:"Collapse 折叠面板",id:"collapse-折叠面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"手风琴模式",id:"手风琴模式"},{depth:3,text:"禁用状态",id:"禁用状态"},{depth:3,text:"自定义图标与标题",id:"自定义图标与标题"},{depth:2,text:"API",id:"api"},{depth:3,text:"Collapse Props",id:"collapse-props"},{depth:3,text:"Collapse.Item Props",id:"collapseitem-props"}],We="/docs/components/collapse.md",Ke="Collapse 折叠面板",Ge="1769570039000",ct=t=>t.children({MdContent:Le,demos:He,frontmatter:Te,slugs:$e,filePath:We,title:Ke,updatedTime:Ge});export{Le as MdContent,ct as default,He as demos,We as filePath,Te as frontmatter,$e as slugs,Ke as title,Ge as updatedTime};
