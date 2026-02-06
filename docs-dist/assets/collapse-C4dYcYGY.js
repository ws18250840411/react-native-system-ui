import{r as d,R as V,b as Q,Z as xe,j as e,V as b,i as he,a as Ce,c as fe}from"./main-BaO0UwhN.js";import{S as je}from"./Arrow-Y1DZl7O_.js";import{C as Ie}from"./index-BSowDGnV.js";import{c as be,T as ve}from"./createComponentTokensHook-CsVvHGcO.js";import{A as w,E as ye}from"./Animated-B6RZ2J5i.js";import{a as Fe}from"./hairline-BK-uo_cS.js";import{S as Ee,a as ge,b as Pe}from"./VolumeO-B8j4LtDd.js";import{S as Be}from"./Space-DQzTpaN5.js";import"./IconBase-elbJGmhV.js";import"./index-DvDeiqEs.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-vCycRA2r.js";import"./index-CJrLMJTa.js";import"./index-CQklZrC-.js";import"./index-B-eg80hO.js";import"./index-DbTCD1vV.js";import"./number-C0AOJ3fJ.js";const Ae=t=>{const{palette:r,spacing:s,fontSize:h,typography:c,radii:v}=t;return{defaults:{accordion:!1,border:!0,iconPosition:"right",panelBorder:!0,panelIsLink:!0,panelSize:"normal",animationDuration:200},layout:{container:{position:"relative"},panel:{position:"relative"},hairline:{position:"absolute"},headerWrapper:{position:"relative"},bodyWrapper:{position:"relative",overflow:"hidden"},headerIconRow:{flexDirection:"row",alignItems:"center"},bodyContent:{position:"absolute",top:0,left:0,right:0}},colors:{border:r.default[200],title:r.default[800],description:r.default[500],background:"#ffffff",active:r.default[50],arrow:r.default[400],disabled:r.default[400]},typography:{titleSize:h.md,descriptionSize:h.sm,fontFamily:c.fontFamily,titleWeight:c.weight.medium},panel:{borderRadius:v.sm},spacing:{paddingVertical:s.md,paddingHorizontal:s.lg,descriptionTop:s.xs,iconGap:8}}},Ve=be("collapse",Ae),U=V.createContext(null),J=t=>{if(t!==void 0)return Array.isArray(t)?t.map(String):t===null?[]:[String(t)]},Se=(t,r)=>r?t[0]??"":t,n=(t=>{const{tokensOverride:r,children:s,accordion:h,value:c,defaultValue:v,onChange:f,border:z,iconPosition:i,expandIcon:S,disabled:y,style:O,...L}=t,p=Ve(r),u=h??p.defaults.accordion,I=z??p.defaults.border,M=i??p.defaults.iconPosition,{colors:E}=p,g=c!==void 0,R=J(c),D=J(v)??[],[j,F]=d.useState(()=>u?D.slice(0,1):D),m=g?u?(R??[]).slice(0,1):R??[]:j,P=d.useCallback((x,a)=>{if(y)return;const l=m.includes(x),o=a??!l;let C;u?C=o?[x]:l?[]:m:C=o?l?m:[...m,x]:l?m.filter(B=>B!==x):m,g||F(C),f?.(Se(C,u))},[u,m,g,y,f]),_=d.useMemo(()=>({activeKeys:m,toggle:P,accordion:u,iconPosition:M,expandIcon:S,border:I,disabled:y,tokens:p}),[u,m,I,y,S,M,p,P]),H=d.useMemo(()=>V.Children.toArray(s).map((a,l)=>{if(!V.isValidElement(a)||!Q(a.type)&&!xe(a.type))return a;const o=a.props.name??String(l);return V.cloneElement(a,{name:o,index:l})}),[s]);return e.jsx(U.Provider,{value:_,children:e.jsxs(b,{style:[p.layout.container,I&&{backgroundColor:E.background},O],...L,children:[I&&e.jsx(k,{tokens:p,position:"top",color:E.border}),I&&e.jsx(k,{tokens:p,position:"bottom",color:E.border}),H]})})}),k=({tokens:t,position:r,color:s,inset:h=0})=>{const c=Fe({position:r,color:s,left:h,right:h});return e.jsx(b,{pointerEvents:"none",style:[t.layout.hairline,c]})},X=V.forwardRef((t,r)=>{const s=d.useContext(U);if(!s)throw new Error("Collapse.Panel must be used within Collapse");const{activeKeys:h,toggle:c,iconPosition:v,expandIcon:f,disabled:z,tokens:i}=s,{name:S="0",index:y=0,title:O,description:L,label:p,icon:u,extra:I,value:M,border:E=i.defaults.panelBorder,isLink:g=i.defaults.panelIsLink,size:R=i.defaults.panelSize,disabled:D,readOnly:j,children:F,style:m,titleStyle:P,descriptionStyle:_,...H}=t,x=String(S),a=h.includes(x),l=z||D,{colors:o,spacing:C,typography:B}=i,[W,oe]=d.useState(0),A=d.useRef(new w.Value(a?1:0)).current,K=A.interpolate({inputRange:[0,1],outputRange:["90deg","-90deg"]});d.useEffect(()=>{w.timing(A,{toValue:a?1:0,duration:i.defaults.animationDuration,easing:ye.ease,useNativeDriver:!1}).start()},[A,a,i.defaults.animationDuration]);const ne=L??p,se=I??M,ae=d.useCallback(()=>{l||j||c(x)},[l,x,j,c]);d.useImperativeHandle(r,()=>({toggle:$=>{l||j||c(x,$)}}),[l,x,j,c]);const ie=d.useCallback($=>{const N=$.nativeEvent.layout.height;he(N)&&Number.isFinite(N)&&oe(Z=>Z===N?Z:N)},[]),re=d.useMemo(()=>({height:A.interpolate({inputRange:[0,1],outputRange:[0,W]})}),[A,W]),G=d.useCallback(()=>Q(f)?f(a):f||e.jsx(w.View,{style:{transform:[{rotate:K}]},children:e.jsx(je,{size:16,fill:l?o.disabled:o.arrow})}),[o.arrow,o.disabled,f,a,l,K]),de=d.useMemo(()=>Ce(F)?e.jsx(ve,{style:{color:l?o.disabled:o.description,fontSize:B.descriptionSize,lineHeight:Math.round(B.descriptionSize*1.5)},children:F}):F,[F,o.description,o.disabled,l,B.descriptionSize]),q=!!E,ce=y>0&&q,ue=a&&q,T=g&&!j,pe=v==="left"?T||fe(u)?e.jsxs(b,{style:i.layout.headerIconRow,children:[T?e.jsx(b,{style:{marginRight:u?i.spacing.iconGap:0},children:G()}):null,u]}):void 0:u,me=v==="right"&&T?G():void 0;return e.jsxs(b,{style:[i.layout.panel,{backgroundColor:o.background},m],...H,children:[ce?e.jsx(k,{tokens:i,position:"top",color:o.border,inset:C.paddingHorizontal}):null,e.jsxs(b,{style:i.layout.headerWrapper,children:[e.jsx(Ie,{title:O,label:ne,icon:pe,value:se,size:R,border:!1,disabled:l,onPress:j?void 0:ae,accessibilityState:{expanded:a,disabled:l},titleStyle:l?[P,{color:o.disabled}]:P,labelStyle:l?[_,{color:o.disabled}]:_,valueStyle:l?{color:o.disabled}:void 0,rightIcon:me}),ue?e.jsx(k,{tokens:i,position:"bottom",color:o.border,inset:C.paddingHorizontal}):null]}),e.jsx(w.View,{style:[i.layout.bodyWrapper,re],children:e.jsx(b,{onLayout:ie,style:[i.layout.bodyContent,{paddingVertical:C.paddingVertical,paddingHorizontal:C.paddingHorizontal,backgroundColor:o.background}],children:de})})]})});n.Panel=X;n.Item=X;n.displayName="Collapse";const Y=()=>e.jsxs(n,{defaultValue:["1"],children:[e.jsx(n.Item,{name:"1",title:"标题1",label:"描述信息",children:"文字"}),e.jsx(n.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(n.Item,{name:"3",title:"标题3",children:"文字"})]}),Me=`import React from 'react'

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
`,Re={code:Me,sources:{_:{tsx:`import React from 'react'

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
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},ee=()=>e.jsxs(n,{accordion:!0,defaultValue:"1",children:[e.jsx(n.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(n.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(n.Item,{name:"3",title:"标题3",children:"文字"})]}),De=`import React from 'react'

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
`,_e={code:De,sources:{_:{tsx:`import React from 'react'

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
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},te=()=>e.jsxs(n,{defaultValue:["1"],children:[e.jsx(n.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(n.Item,{name:"2",title:"标题2",disabled:!0,children:"文字"}),e.jsx(n.Item,{name:"3",title:"标题3",disabled:!0,children:"文字"})]}),Ne=`import React from 'react'

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

`,we={code:Ne,sources:{_:{tsx:`import React from 'react'

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

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},le=()=>e.jsxs(Be,{direction:"vertical",gap:12,children:[e.jsx(n,{expandIcon:t=>t?e.jsx(Ee,{fill:"#3b82f6",color:"#3b82f6"}):e.jsx(ge,{fill:"#3b82f6",color:"#3b82f6"}),border:!1,children:e.jsx(n.Item,{name:"1",title:"自定义图标",label:"描述信息",children:"文字"})}),e.jsx(n,{border:!1,iconPosition:"left",children:e.jsx(n.Item,{name:"2",title:"自定义标题",label:"描述信息",icon:e.jsx(Pe,{fill:"#f97316",color:"#f97316"}),children:"文字"})})]}),ke=`import React from 'react'

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
`,ze={code:ke,sources:{_:{tsx:`import React from 'react'

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
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}},Oe=function({previewer:t=()=>null,api:r=()=>null}){const s=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"collapse-折叠面板","data-anchor":"collapse-折叠面板",children:"Collapse 折叠面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"通过折叠面板收纳和展示内容，支持受控和手风琴模式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(s,{code:"import { Collapse } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(s,{...Re,children:e.jsx(Y,{})})}),e.jsx("h3",{id:"手风琴模式","data-anchor":"手风琴模式",children:"手风琴模式"}),e.jsx("div",{children:e.jsx(s,{..._e,children:e.jsx(ee,{})})}),e.jsx("h3",{id:"禁用状态","data-anchor":"禁用状态",children:"禁用状态"}),e.jsx("div",{children:e.jsx(s,{...we,children:e.jsx(te,{})})}),e.jsx("h3",{id:"自定义图标与标题","data-anchor":"自定义图标与标题",children:"自定义图标与标题"}),e.jsx("div",{children:e.jsx(s,{...ze,children:e.jsx(le,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"collapse-props","data-anchor":"collapse-props",children:"Collapse Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"accordion"})}),e.jsx("td",{children:"是否开启手风琴模式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsxs("td",{children:["当前展开面板，手风琴模式下为 ",e.jsx("code",{children:"string"}),"，否则为 ",e.jsx("code",{children:"string[]"})]}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认展开面板"}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"展开状态变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string | string[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconPosition"})}),e.jsx("td",{children:"图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"expandIcon"})}),e.jsx("td",{children:"自定义展开图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (active: boolean) => ReactNode"})}),e.jsx("td",{children:"默认箭头"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用全部面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"collapseitem-props","data-anchor":"collapseitem-props",children:"Collapse.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"唯一标识符"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"子序号"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"面板标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"标题左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"标题右侧区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示内边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLink"})}),e.jsx("td",{children:"是否展示标题栏右侧箭头"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"标题栏大小"}),e.jsx("td",{children:e.jsx("code",{children:"'normal' | 'large'"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用当前面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否为只读状态，只读状态下无法操作面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsxs("blockquote",{children:[e.jsxs("p",{children:[e.jsx("code",{children:"Collapse.Item"})," 内部可以放任意自定义内容；当传入 ",e.jsx("code",{children:"expandIcon"})," 为函数时会收到当前展开状态。"]}),e.jsxs("p",{children:["为了兼容旧写法：",e.jsx("code",{children:"Collapse.Panel"})," 等价于 ",e.jsx("code",{children:"Collapse.Item"}),"，且 ",e.jsx("code",{children:"description/extra"})," 分别是 ",e.jsx("code",{children:"label/value"})," 的别名。"]})]})]})})},Le=[{Component:Y,key:"collapse-base",sources:{_:{tsx:`import React from 'react'

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
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},{Component:ee,key:"collapse-accordion",sources:{_:{tsx:`import React from 'react'

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
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},{Component:te,key:"collapse-disabled",sources:{_:{tsx:`import React from 'react'

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

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},{Component:le,key:"collapse-custom",sources:{_:{tsx:`import React from 'react'

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
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}}],He={simulator:{compact:!0}},Te=[{depth:1,text:"Collapse 折叠面板",id:"collapse-折叠面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"手风琴模式",id:"手风琴模式"},{depth:3,text:"禁用状态",id:"禁用状态"},{depth:3,text:"自定义图标与标题",id:"自定义图标与标题"},{depth:2,text:"API",id:"api"},{depth:3,text:"Collapse Props",id:"collapse-props"},{depth:3,text:"Collapse.Item Props",id:"collapseitem-props"}],$e="/docs/components/collapse.md",We="Collapse 折叠面板",Ke="1769570039000",dt=t=>t.children({MdContent:Oe,demos:Le,frontmatter:He,slugs:Te,filePath:$e,title:We,updatedTime:Ke});export{Oe as MdContent,dt as default,Le as demos,$e as filePath,He as frontmatter,Te as slugs,We as title,Ke as updatedTime};
