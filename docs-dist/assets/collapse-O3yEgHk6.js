import{R as E,r,b as X,Z as he,j as e,V as v,i as Ce,a as fe,c as je}from"./main-BXb8DOxl.js";import{S as Ie}from"./Arrow-D1qxk6Xz.js";import{C as be}from"./index-BSmhLq_l.js";import{c as ve,T as ye}from"./createComponentTokensHook-C7GS3cUR.js";import{A as w,E as Fe}from"./Animated-BshxiKK9.js";import{a as ge}from"./hairline-BrrexFH9.js";import{S as Ee,a as Pe,b as Be}from"./VolumeO-ZMSXdTF-.js";import{S as Ae}from"./Space-Q2CXJN-f.js";import"./IconBase-5wkEN6D1.js";import"./index-DkTYenKX.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-6bm6-278.js";import"./index-CJrLMJTa.js";import"./index-ZIcEKt2e.js";import"./index-CysvSvJu.js";import"./index-BPY4IQIH.js";import"./number-BrRWL1fO.js";const Ve=o=>{const{palette:i,spacing:n,fontSize:x,typography:c,radii:y}=o;return{defaults:{accordion:!1,border:!0,iconPosition:"right",panelBorder:!0,panelIsLink:!0,panelSize:"normal",animationDuration:200},layout:{container:{position:"relative"},panel:{position:"relative"},hairline:{position:"absolute"},headerWrapper:{position:"relative"},bodyWrapper:{position:"relative",overflow:"hidden"},headerIconRow:{flexDirection:"row",alignItems:"center"},bodyContent:{position:"absolute",top:0,left:0,right:0}},colors:{border:i.default[200],title:i.default[800],description:i.default[500],background:"#ffffff",active:i.default[50],arrow:i.default[400],disabled:i.default[400]},typography:{titleSize:x.md,descriptionSize:x.sm,fontFamily:c.fontFamily,titleWeight:c.weight.medium},panel:{borderRadius:y.sm},spacing:{paddingVertical:n.md,paddingHorizontal:n.lg,descriptionTop:n.xs,iconGap:8}}},Re=ve("collapse",Ve),Y=E.createContext(null),U=o=>{if(o!==void 0)return Array.isArray(o)?o.map(String):o===null?[]:[String(o)]},Se=(o,i)=>i?o[0]??"":o,G=(o=>{const{tokensOverride:i,children:n,accordion:x,value:c,defaultValue:y,onChange:f,border:O,iconPosition:a,expandIcon:R,disabled:F,style:L,...H}=o,m=Re(i),u=x??m.defaults.accordion,I=O??m.defaults.border,S=a??m.defaults.iconPosition,{colors:P}=m,B=c!==void 0,M=U(c),D=U(y)??[],h=r.useRef(f);h.current=f;const[g,T]=r.useState(()=>u?D.slice(0,1):D),p=B?u?(M??[]).slice(0,1):M??[]:g,A=r.useCallback((d,t)=>{if(F)return;const l=p.includes(d),C=t??!l;let j;u?j=C?[d]:l?[]:p:j=C?l?p:[...p,d]:l?p.filter(_=>_!==d):p,B||T(j),h.current?.(Se(j,u))},[u,p,B,F]),$=r.useMemo(()=>({activeKeys:p,toggle:A,accordion:u,iconPosition:S,expandIcon:R,border:I,disabled:F,tokens:m}),[u,p,I,F,R,S,m,A]),b=r.useMemo(()=>E.Children.toArray(n).map((t,l)=>{if(!E.isValidElement(t)||!X(t.type)&&!he(t.type))return t;const C=t.props.name??String(l);return E.cloneElement(t,{name:C,index:l})}),[n]);return e.jsx(Y.Provider,{value:$,children:e.jsxs(v,{style:[m.layout.container,I&&{backgroundColor:P.background},L],...H,children:[I&&e.jsx(k,{tokens:m,position:"top",color:P.border}),I&&e.jsx(k,{tokens:m,position:"bottom",color:P.border}),b]})})}),k=({tokens:o,position:i,color:n,inset:x=0})=>{const c=ge({position:i,color:n,left:x,right:x});return e.jsx(v,{pointerEvents:"none",style:[o.layout.hairline,c]})},z=E.forwardRef((o,i)=>{const n=r.useContext(Y);if(!n)throw new Error("Collapse.Panel must be used within Collapse");const{activeKeys:x,toggle:c,iconPosition:y,expandIcon:f,disabled:O,tokens:a}=n,{name:R="0",index:F=0,title:L,description:H,label:m,icon:u,extra:I,value:S,border:P=a.defaults.panelBorder,isLink:B=a.defaults.panelIsLink,size:M=a.defaults.panelSize,disabled:D,readOnly:h,children:g,style:T,titleStyle:p,descriptionStyle:A,...$}=o,b=String(R),d=x.includes(b),t=O||D,{colors:l,spacing:C,typography:j}=a,[_,ne]=r.useState(0),V=r.useRef(new w.Value(d?1:0)).current,q=V.interpolate({inputRange:[0,1],outputRange:["90deg","-90deg"]});r.useEffect(()=>{w.timing(V,{toValue:d?1:0,duration:a.defaults.animationDuration,easing:Fe.ease,useNativeDriver:!1}).start()},[V,d,a.defaults.animationDuration]);const se=H??m,ae=I??S,ie=r.useCallback(()=>{t||h||c(b)},[t,b,h,c]);r.useImperativeHandle(i,()=>({toggle:K=>{t||h||c(b,K)}}),[t,b,h,c]);const re=r.useCallback(K=>{const N=K.nativeEvent.layout.height;Ce(N)&&Number.isFinite(N)&&ne(Q=>Q===N?Q:N)},[]),de=r.useMemo(()=>({height:V.interpolate({inputRange:[0,1],outputRange:[0,_]})}),[V,_]),Z=r.useCallback(()=>X(f)?f(d):f||e.jsx(w.View,{style:{transform:[{rotate:q}]},children:e.jsx(Ie,{size:16,fill:t?l.disabled:l.arrow})}),[l.arrow,l.disabled,f,d,t,q]),ce=r.useMemo(()=>fe(g)?e.jsx(ye,{style:{color:t?l.disabled:l.description,fontSize:j.descriptionSize,lineHeight:Math.round(j.descriptionSize*1.5)},children:g}):g,[g,l.description,l.disabled,t,j.descriptionSize]),J=!!P,ue=F>0&&J,pe=d&&J,W=B&&!h,me=y==="left"?W||je(u)?e.jsxs(v,{style:a.layout.headerIconRow,children:[W?e.jsx(v,{style:{marginRight:u?a.spacing.iconGap:0},children:Z()}):null,u]}):void 0:u,xe=y==="right"&&W?Z():void 0;return e.jsxs(v,{style:[a.layout.panel,{backgroundColor:l.background},T],...$,children:[ue?e.jsx(k,{tokens:a,position:"top",color:l.border,inset:C.paddingHorizontal}):null,e.jsxs(v,{style:a.layout.headerWrapper,children:[e.jsx(be,{title:L,label:se,icon:me,value:ae,size:M,border:!1,disabled:t,onPress:h?void 0:ie,accessibilityState:{expanded:d,disabled:t},titleStyle:t?[p,{color:l.disabled}]:p,labelStyle:t?[A,{color:l.disabled}]:A,valueStyle:t?{color:l.disabled}:void 0,rightIcon:xe}),pe?e.jsx(k,{tokens:a,position:"bottom",color:l.border,inset:C.paddingHorizontal}):null]}),e.jsx(w.View,{style:[a.layout.bodyWrapper,de],children:e.jsx(v,{onLayout:re,style:[a.layout.bodyContent,{paddingVertical:C.paddingVertical,paddingHorizontal:C.paddingHorizontal,backgroundColor:l.background}],children:ce})})]})});G.Panel=z;G.Item=z;const s=Object.assign(E.memo(G),{Panel:z,Item:z});s.displayName="Collapse";const ee=()=>e.jsxs(s,{defaultValue:["1"],children:[e.jsx(s.Item,{name:"1",title:"标题1",label:"描述信息",children:"文字"}),e.jsx(s.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(s.Item,{name:"3",title:"标题3",children:"文字"})]}),Me=`import React from 'react'

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
`,De={code:Me,sources:{_:{tsx:`import React from 'react'

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
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},te=()=>e.jsxs(s,{accordion:!0,defaultValue:"1",children:[e.jsx(s.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(s.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(s.Item,{name:"3",title:"标题3",children:"文字"})]}),_e=`import React from 'react'

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
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},le=()=>e.jsxs(s,{defaultValue:["1"],children:[e.jsx(s.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(s.Item,{name:"2",title:"标题2",disabled:!0,children:"文字"}),e.jsx(s.Item,{name:"3",title:"标题3",disabled:!0,children:"文字"})]}),we=`import React from 'react'

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

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},oe=()=>e.jsxs(Ae,{direction:"vertical",gap:12,children:[e.jsx(s,{expandIcon:o=>o?e.jsx(Ee,{fill:"#3b82f6",color:"#3b82f6"}):e.jsx(Pe,{fill:"#3b82f6",color:"#3b82f6"}),border:!1,children:e.jsx(s.Item,{name:"1",title:"自定义图标",label:"描述信息",children:"文字"})}),e.jsx(s,{border:!1,iconPosition:"left",children:e.jsx(s.Item,{name:"2",title:"自定义标题",label:"描述信息",icon:e.jsx(Be,{fill:"#f97316",color:"#f97316"}),children:"文字"})})]}),ze=`import React from 'react'

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
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}},Le=function({previewer:o=()=>null,api:i=()=>null}){const n=o;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"collapse-折叠面板","data-anchor":"collapse-折叠面板",children:"Collapse 折叠面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"通过折叠面板收纳和展示内容，支持受控和手风琴模式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(n,{code:"import { Collapse } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(n,{...De,children:e.jsx(ee,{})})}),e.jsx("h3",{id:"手风琴模式","data-anchor":"手风琴模式",children:"手风琴模式"}),e.jsx("div",{children:e.jsx(n,{...Ne,children:e.jsx(te,{})})}),e.jsx("h3",{id:"禁用状态","data-anchor":"禁用状态",children:"禁用状态"}),e.jsx("div",{children:e.jsx(n,{...ke,children:e.jsx(le,{})})}),e.jsx("h3",{id:"自定义图标与标题","data-anchor":"自定义图标与标题",children:"自定义图标与标题"}),e.jsx("div",{children:e.jsx(n,{...Oe,children:e.jsx(oe,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"collapse-props","data-anchor":"collapse-props",children:"Collapse Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"accordion"})}),e.jsx("td",{children:"是否开启手风琴模式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsxs("td",{children:["当前展开面板，手风琴模式下为 ",e.jsx("code",{children:"string"}),"，否则为 ",e.jsx("code",{children:"string[]"})]}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认展开面板"}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"展开状态变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string | string[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconPosition"})}),e.jsx("td",{children:"图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"expandIcon"})}),e.jsx("td",{children:"自定义展开图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (active: boolean) => ReactNode"})}),e.jsx("td",{children:"默认箭头"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用全部面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"collapseitem-props","data-anchor":"collapseitem-props",children:"Collapse.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"唯一标识符"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"子序号"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"面板标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"标题左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"标题右侧区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示内边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLink"})}),e.jsx("td",{children:"是否展示标题栏右侧箭头"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"标题栏大小"}),e.jsx("td",{children:e.jsx("code",{children:"'normal' | 'large'"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用当前面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否为只读状态，只读状态下无法操作面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsxs("blockquote",{children:[e.jsxs("p",{children:[e.jsx("code",{children:"Collapse.Item"})," 内部可以放任意自定义内容；当传入 ",e.jsx("code",{children:"expandIcon"})," 为函数时会收到当前展开状态。"]}),e.jsxs("p",{children:["为了兼容旧写法：",e.jsx("code",{children:"Collapse.Panel"})," 等价于 ",e.jsx("code",{children:"Collapse.Item"}),"，且 ",e.jsx("code",{children:"description/extra"})," 分别是 ",e.jsx("code",{children:"label/value"})," 的别名。"]})]})]})})},He=[{Component:ee,key:"collapse-base",sources:{_:{tsx:`import React from 'react'

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
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}}],Te={simulator:{compact:!0}},$e=[{depth:1,text:"Collapse 折叠面板",id:"collapse-折叠面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"手风琴模式",id:"手风琴模式"},{depth:3,text:"禁用状态",id:"禁用状态"},{depth:3,text:"自定义图标与标题",id:"自定义图标与标题"},{depth:2,text:"API",id:"api"},{depth:3,text:"Collapse Props",id:"collapse-props"},{depth:3,text:"Collapse.Item Props",id:"collapseitem-props"}],We="/docs/components/collapse.md",Ke="Collapse 折叠面板",Ge="1769570039000",ct=o=>o.children({MdContent:Le,demos:He,frontmatter:Te,slugs:$e,filePath:We,title:Ke,updatedTime:Ge});export{Le as MdContent,ct as default,He as demos,We as filePath,Te as frontmatter,$e as slugs,Ke as title,Ge as updatedTime};
