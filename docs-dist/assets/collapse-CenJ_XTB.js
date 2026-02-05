import{r as c,R as V,b as J,Y as me,j as e,V as b,i as xe,a as he,c as Ce}from"./main-O6KZrSH_.js";import{S as fe}from"./Arrow-r8D7M_Tx.js";import{C as je}from"./index-DCx-GaLs.js";import{c as Ie,T as be}from"./createComponentTokensHook-KzOuLm4c.js";import{A as k,E as ve}from"./Animated-qBs3E5U6.js";import{a as ye}from"./hairline-Dpq7rEkb.js";import{S as Fe,a as ge,b as Ee}from"./VolumeO-B_GwwEXg.js";import{S as Pe}from"./Space-BUyxH04S.js";import"./IconBase-DZr7C-P7.js";import"./index-DvCZppP1.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-DMjZXFvR.js";import"./index-CJrLMJTa.js";import"./index--voB8Asl.js";import"./index-DcjI-aro.js";import"./index-C_v13XD0.js";import"./number-BcSDXImJ.js";const Be=o=>{const{palette:r,spacing:a,fontSize:h,typography:p,radii:v}=o;return{defaults:{accordion:!1,border:!0,iconPosition:"right",panelBorder:!0,panelIsLink:!0,panelSize:"normal",animationDuration:200},layout:{container:{position:"relative"},panel:{position:"relative"},hairline:{position:"absolute"},headerWrapper:{position:"relative"},bodyWrapper:{position:"relative",overflow:"hidden"},headerIconRow:{flexDirection:"row",alignItems:"center"},bodyContent:{position:"absolute",top:0,left:0,right:0}},colors:{border:r.default[200],title:r.default[800],description:r.default[500],background:"#ffffff",active:r.default[50],arrow:r.default[400],disabled:r.default[400]},typography:{titleSize:h.md,descriptionSize:h.sm,fontFamily:p.fontFamily,titleWeight:p.weight.medium},panel:{borderRadius:v.sm},spacing:{paddingVertical:a.md,paddingHorizontal:a.lg,descriptionTop:a.xs,iconGap:8}}},Ae=Ie("collapse",Be),Q=V.createContext(null),Y=o=>{if(o!==void 0)return Array.isArray(o)?o.map(String):o===null?[]:[String(o)]},Ve=(o,r)=>r?o[0]??"":o,n=(o=>{const{tokensOverride:r,children:a,accordion:h,value:p,defaultValue:v,onChange:C,border:O,iconPosition:i,expandIcon:S,disabled:y,style:L,...H}=o,x=Ae(r),m=h??x.defaults.accordion,j=O??x.defaults.border,M=i??x.defaults.iconPosition,{colors:E}=x,P=p!==void 0,R=Y(p),D=Y(v)??[],[f,F]=c.useState(()=>m?D.slice(0,1):D),g=P?m?(R??[]).slice(0,1):R??[]:f,B=c.useCallback((d,s)=>{if(y)return;const t=g,l=t.includes(d);let u;m?s===!0?u=l?t:[d]:s===!1?u=l?[]:t:u=l?[]:[d]:s===!0?u=l?t:[...t,d]:s===!1?u=l?t.filter(I=>I!==d):t:u=l?t.filter(I=>I!==d):[...t,d],P||F(u),C?.(Ve(u,m))},[m,g,P,y,C]),_=c.useMemo(()=>({activeKeys:g,toggle:B,accordion:m,iconPosition:M,expandIcon:S,border:j,disabled:y,tokens:x}),[m,g,j,y,S,M,x,B]),T=c.useMemo(()=>V.Children.toArray(a).map((s,t)=>{if(!V.isValidElement(s)||!J(s.type)&&!me(s.type))return s;const l=s.props.name??String(t);return V.cloneElement(s,{name:l,index:t})}),[a]);return e.jsx(Q.Provider,{value:_,children:e.jsxs(b,{style:[x.layout.container,j&&{backgroundColor:E.background},L],...H,children:[j&&e.jsx(z,{tokens:x,position:"top",color:E.border}),j&&e.jsx(z,{tokens:x,position:"bottom",color:E.border}),T]})})}),z=({tokens:o,position:r,color:a,inset:h=0})=>{const p=ye({position:r,color:a,left:h,right:h});return e.jsx(b,{pointerEvents:"none",style:[o.layout.hairline,p]})},U=V.forwardRef((o,r)=>{const a=c.useContext(Q);if(!a)throw new Error("Collapse.Panel must be used within Collapse");const{activeKeys:h,toggle:p,iconPosition:v,expandIcon:C,disabled:O,tokens:i}=a,{name:S="0",index:y=0,title:L,description:H,label:x,icon:m,extra:j,value:M,border:E=i.defaults.panelBorder,isLink:P=i.defaults.panelIsLink,size:R=i.defaults.panelSize,disabled:D,readOnly:f,children:F,style:g,titleStyle:B,descriptionStyle:_,...T}=o,d=String(S),s=h.includes(d),t=O||D,{colors:l,spacing:u,typography:I}=i,[N,le]=c.useState(0),A=c.useRef(new k.Value(s?1:0)).current,K=A.interpolate({inputRange:[0,1],outputRange:["90deg","-90deg"]});c.useEffect(()=>{k.timing(A,{toValue:s?1:0,duration:i.defaults.animationDuration,easing:ve.ease,useNativeDriver:!1}).start()},[A,s,i.defaults.animationDuration]);const oe=H??x,se=j??M,ne=c.useCallback(()=>{t||f||p(d)},[t,d,f,p]);c.useImperativeHandle(r,()=>({toggle:W=>{t||f||p(d,W)}}),[t,d,f,p]);const ae=c.useCallback(W=>{const w=W.nativeEvent.layout.height;xe(w)&&Number.isFinite(w)&&w!==N&&le(w)},[N]),ie=c.useMemo(()=>({height:A.interpolate({inputRange:[0,1],outputRange:[0,N]})}),[A,N]),G=c.useCallback(()=>J(C)?C(s):C||e.jsx(k.View,{style:{transform:[{rotate:K}]},children:e.jsx(fe,{size:16,fill:t?l.disabled:l.arrow})}),[l.arrow,l.disabled,C,s,t,K]),re=c.useMemo(()=>he(F)?e.jsx(be,{style:{color:t?l.disabled:l.description,fontSize:I.descriptionSize,lineHeight:Math.round(I.descriptionSize*1.5)},children:F}):F,[F,l.description,l.disabled,t,I.descriptionSize]),q=!!E,de=y>0&&q,ce=s&&q,$=P&&!f,ue=v==="left"?$||Ce(m)?e.jsxs(b,{style:i.layout.headerIconRow,children:[$?e.jsx(b,{style:{marginRight:m?i.spacing.iconGap:0},children:G()}):null,m]}):void 0:m,pe=v==="right"&&$?G():void 0;return e.jsxs(b,{style:[i.layout.panel,{backgroundColor:l.background},g],...T,children:[de?e.jsx(z,{tokens:i,position:"top",color:l.border,inset:u.paddingHorizontal}):null,e.jsxs(b,{style:i.layout.headerWrapper,children:[e.jsx(je,{title:L,label:oe,icon:ue,value:se,size:R,border:!1,disabled:t,onPress:f?void 0:ne,accessibilityState:{expanded:s,disabled:t},titleStyle:t?[B,{color:l.disabled}]:B,labelStyle:t?[_,{color:l.disabled}]:_,valueStyle:t?{color:l.disabled}:void 0,rightIcon:pe}),ce?e.jsx(z,{tokens:i,position:"bottom",color:l.border,inset:u.paddingHorizontal}):null]}),e.jsx(k.View,{style:[i.layout.bodyWrapper,ie],children:e.jsx(b,{onLayout:ae,style:[i.layout.bodyContent,{paddingVertical:u.paddingVertical,paddingHorizontal:u.paddingHorizontal,backgroundColor:l.background}],children:re})})]})});n.Panel=U;n.Item=U;n.displayName="Collapse";const X=()=>e.jsxs(n,{defaultValue:["1"],children:[e.jsx(n.Item,{name:"1",title:"标题1",label:"描述信息",children:"文字"}),e.jsx(n.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(n.Item,{name:"3",title:"标题3",children:"文字"})]}),Se=`import React from 'react'

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
`,Me={code:Se,sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},Z=()=>e.jsxs(n,{accordion:!0,defaultValue:"1",children:[e.jsx(n.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(n.Item,{name:"2",title:"标题2",children:"文字"}),e.jsx(n.Item,{name:"3",title:"标题3",children:"文字"})]}),Re=`import React from 'react'

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
`,De={code:Re,sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},ee=()=>e.jsxs(n,{defaultValue:["1"],children:[e.jsx(n.Item,{name:"1",title:"标题1",children:"文字"}),e.jsx(n.Item,{name:"2",title:"标题2",disabled:!0,children:"文字"}),e.jsx(n.Item,{name:"3",title:"标题3",disabled:!0,children:"文字"})]}),_e=`import React from 'react'

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

`,Ne={code:_e,sources:{_:{tsx:`import React from 'react'

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

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

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

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},te=()=>e.jsxs(Pe,{direction:"vertical",gap:12,children:[e.jsx(n,{expandIcon:o=>o?e.jsx(Fe,{fill:"#3b82f6",color:"#3b82f6"}):e.jsx(ge,{fill:"#3b82f6",color:"#3b82f6"}),border:!1,children:e.jsx(n.Item,{name:"1",title:"自定义图标",label:"描述信息",children:"文字"})}),e.jsx(n,{border:!1,iconPosition:"left",children:e.jsx(n.Item,{name:"2",title:"自定义标题",label:"描述信息",icon:e.jsx(Ee,{fill:"#f97316",color:"#f97316"}),children:"文字"})})]}),we=`import React from 'react'

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
`,ke={code:we,sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}},ze=function({previewer:o=()=>null,api:r=()=>null}){const a=o;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"collapse-折叠面板","data-anchor":"collapse-折叠面板",children:"Collapse 折叠面板"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"通过折叠面板收纳和展示内容，支持受控和手风琴模式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(a,{code:"import { Collapse } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(a,{...Me,children:e.jsx(X,{})})}),e.jsx("h3",{id:"手风琴模式","data-anchor":"手风琴模式",children:"手风琴模式"}),e.jsx("div",{children:e.jsx(a,{...De,children:e.jsx(Z,{})})}),e.jsx("h3",{id:"禁用状态","data-anchor":"禁用状态",children:"禁用状态"}),e.jsx("div",{children:e.jsx(a,{...Ne,children:e.jsx(ee,{})})}),e.jsx("h3",{id:"自定义图标与标题","data-anchor":"自定义图标与标题",children:"自定义图标与标题"}),e.jsx("div",{children:e.jsx(a,{...ke,children:e.jsx(te,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"collapse-props","data-anchor":"collapse-props",children:"Collapse Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"accordion"})}),e.jsx("td",{children:"是否开启手风琴模式"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsxs("td",{children:["当前展开面板，手风琴模式下为 ",e.jsx("code",{children:"string"}),"，否则为 ",e.jsx("code",{children:"string[]"})]}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认展开面板"}),e.jsx("td",{children:e.jsx("code",{children:"string | string[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"展开状态变化回调"}),e.jsx("td",{children:e.jsx("code",{children:"(value: string | string[]) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconPosition"})}),e.jsx("td",{children:"图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"expandIcon"})}),e.jsx("td",{children:"自定义展开图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | (active: boolean) => ReactNode"})}),e.jsx("td",{children:"默认箭头"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用全部面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"collapseitem-props","data-anchor":"collapseitem-props",children:"Collapse.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsx("td",{children:"唯一标识符"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"子序号"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"面板标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"标题下方描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"标题左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"标题右侧区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示内边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLink"})}),e.jsx("td",{children:"是否展示标题栏右侧箭头"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"标题栏大小"}),e.jsx("td",{children:e.jsx("code",{children:"'normal' | 'large'"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用当前面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"readOnly"})}),e.jsx("td",{children:"是否为只读状态，只读状态下无法操作面板"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsxs("blockquote",{children:[e.jsxs("p",{children:[e.jsx("code",{children:"Collapse.Item"})," 内部可以放任意自定义内容；当传入 ",e.jsx("code",{children:"expandIcon"})," 为函数时会收到当前展开状态。"]}),e.jsxs("p",{children:["为了兼容旧写法：",e.jsx("code",{children:"Collapse.Panel"})," 等价于 ",e.jsx("code",{children:"Collapse.Item"}),"，且 ",e.jsx("code",{children:"description/extra"})," 分别是 ",e.jsx("code",{children:"label/value"})," 的别名。"]})]})]})})},Oe=[{Component:X,key:"collapse-base",sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"基础用法",identifier:"collapse-base",lang:"tsx",meta:{title:"基础用法"}},{Component:Z,key:"collapse-accordion",sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"手风琴模式",identifier:"collapse-accordion",lang:"tsx",meta:{title:"手风琴模式"}},{Component:ee,key:"collapse-disabled",sources:{_:{tsx:`import React from 'react'

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

`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'

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

`}},title:"禁用状态",identifier:"collapse-disabled",lang:"tsx",meta:{title:"禁用状态"}},{Component:te,key:"collapse-custom",sources:{_:{tsx:`import React from 'react'

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
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

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
`}},title:"自定义图标",identifier:"collapse-custom",lang:"tsx",meta:{title:"自定义图标"}}],Le={simulator:{compact:!0}},He=[{depth:1,text:"Collapse 折叠面板",id:"collapse-折叠面板"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"手风琴模式",id:"手风琴模式"},{depth:3,text:"禁用状态",id:"禁用状态"},{depth:3,text:"自定义图标与标题",id:"自定义图标与标题"},{depth:2,text:"API",id:"api"},{depth:3,text:"Collapse Props",id:"collapse-props"},{depth:3,text:"Collapse.Item Props",id:"collapseitem-props"}],Te="/docs/components/collapse.md",$e="Collapse 折叠面板",We="1769570039000",rt=o=>o.children({MdContent:ze,demos:Oe,frontmatter:Le,slugs:He,filePath:Te,title:$e,updatedTime:We});export{ze as MdContent,rt as default,Oe as demos,Te as filePath,Le as frontmatter,He as slugs,$e as title,We as updatedTime};
