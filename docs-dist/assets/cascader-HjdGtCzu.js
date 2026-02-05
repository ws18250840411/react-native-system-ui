import{r as m,i as Ce,j as e,V as R,a as $,R as E,b as hn,c as vn}from"./main-O6KZrSH_.js";import{S as mn}from"./Checked-Cm5uhjGy.js";import{S as fn,P as Cn}from"./Popup-DvjP5SkZ.js";import{T as ye}from"./index-DsqHyOwW.js";import{c as yn,T as q}from"./createComponentTokensHook-KzOuLm4c.js";import{u as je}from"./useControllableValue-_OJua4RH.js";import{u as jn}from"./index-Cq_gACMg.js";import{M as be}from"./index-DvCZppP1.js";import{F as gn}from"./index--voB8Asl.js";import{s as Z}from"./compare-B0QhPEQa.js";import{F as _}from"./Field-Ckp9NSMz.js";import{F as ee}from"./index-VgHZV5oW.js";import{B as ne}from"./index-DzU_0rvq.js";import{T as Fn}from"./index-CCLXK9-u.js";import{S as bn}from"./Space-BUyxH04S.js";import"./IconBase-DZr7C-P7.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-D2qUv7UW.js";import"./Overlay-CmwAk_J5.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./Animated-qBs3E5U6.js";import"./index-C_v13XD0.js";import"./index-DcjI-aro.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-Tvvid2F1.js";import"./useAriaPress-DMjZXFvR.js";import"./SafeAreaView-L8uUXbhq.js";import"./useSafeAreaPadding-CsLe5OYH.js";import"./number-BcSDXImJ.js";import"./index-DCx-GaLs.js";import"./Arrow-r8D7M_Tx.js";import"./hairline-Dpq7rEkb.js";import"./index-NcsZVNiX.js";import"./useLocale-C-3I3wuL.js";import"./promise-DDQXV5JQ.js";import"./Close-DpyqkEOI.js";import"./index-ANZ1PvOD.js";import"./index-B3Y2P23a.js";import"./color-cEGfwRja.js";import"./Loading-CdSfkQu4.js";const wn=n=>{const{palette:t,spacing:o,radii:u}=n,s=t.default[100],p="请选择";return{defaults:{placeholder:p,title:p,showHeader:!0,closeable:!0,swipeable:!0,poppable:!1,closeOnClickOverlay:!0,closeOnFinish:!0,popupPlacement:"bottom",popupRound:!0,loadingText:"加载中..."},layout:{container:{borderRadius:0,width:"100%"},header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:0},title:{lineHeight:20,includeFontPadding:!1},closeButton:{},tabsWrapper:{width:"100%"},tabsContentStatic:{width:"100%"},tabsItem:{alignItems:"center"},tabsTitle:{includeFontPadding:!1},tabTitleNode:{includeFontPadding:!1},optionList:{flexGrow:0},option:{justifyContent:"center"},optionContent:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},optionText:{lineHeight:20,includeFontPadding:!1},optionTextActive:{},optionLabel:{flex:1},empty:{textAlign:"center"},inlineChildren:{}},colors:{background:"#ffffff",headerText:t.default[900],placeholder:t.default[500],closeIcon:t.default[300],closeIconActive:t.default[500],tabText:t.default[900],tabActive:t.primary[500],tabInactive:t.default[500],optionText:t.default[900],optionDisabled:t.default[300],optionActiveBackground:s,optionActiveText:t.primary[500],divider:t.default[200]},typography:{titleSize:16,titleWeight:"500",tabsTitleSize:14,tabTitlePlaceholderWeight:"400",tabTitleWeight:"500",optionTextSize:14,optionTextActiveWeight:"500",emptyTextSize:14},sizing:{indicatorHeight:3,optionMinHeight:40,optionListHeight:384,headerHeight:48,closeIconSize:22,selectedIconSize:18},radii:{option:u.sm},spacing:{headerPaddingHorizontal:o.lg,tabNavPaddingHorizontal:6,tabNavPaddingVertical:2,tabPaddingHorizontal:10,optionPaddingVertical:10,optionPaddingHorizontal:o.lg,optionListPaddingTop:6,optionListPaddingBottom:0,closeButtonMarginLeft:8,optionLabelMarginRight:12,emptyPaddingVertical:24,inlineChildrenPaddingVertical:12}}},On=yn("cascader",wn),Vn=(n=[],t,o)=>{const u=(()=>{let i=1;const l=(h,x)=>{if(!h||!h.length)return;x>i&&(i=x);const g=x+1;h.forEach(f=>{Object.prototype.hasOwnProperty.call(f,t.childrenKey)&&g>i&&(i=g);const w=f[t.childrenKey];w&&w.length&&l(w,g)})};return l(n,1),i})(),s=!o||!o.length?[n]:o.reduce((i,l,h)=>{if(l==null)return i;const x=i[h];if(!x)return i;const f=x.find(b=>b[t.valueKey]===o[h])?.[t.childrenKey];return f&&i.push(f),i},[n]),p=!o||!o.length?[]:o.map((i,l)=>s[l]?.find(h=>h[t.valueKey]===i));return{tabs:s,items:p,depth:u}},En=n=>({textKey:n?.text??"text",valueKey:n?.value??"value",childrenKey:n?.children??"children"}),ge=(n=[],t,o)=>{const u=[];let s=n;return o.forEach(p=>{if(!s||!s.length)return;const i=s.find(l=>l[t.valueKey]===p);i&&(u.push(i),s=i[t.childrenKey]??[])}),u},L=n=>{const{tokensOverride:t,options:o=[],title:u,placeholder:s,activeColor:p,fieldNames:i,optionRender:l,showHeader:h,closeable:x,closeIcon:g,onChange:f,onClose:b,onFinish:w,onClickTab:I,onTabChange:ae,swipeable:Pe,style:De,testID:Se,children:z,poppable:Ae,visible:Yn,defaultVisible:Zn,onVisibleChange:et,closeOnClickOverlay:Te,closeOnFinish:ke,popupPlacement:Ne,popupRound:_e,popupProps:Le,loadingText:Ie,...ze}=n,a=On(t),J=u??a.defaults.title,O=s??a.defaults.placeholder,U=p??a.colors.tabActive,oe=h??a.defaults.showHeader,He=Pe??a.defaults.swipeable,v=Ae??a.defaults.poppable,Me=Te??a.defaults.closeOnClickOverlay,le=ke??a.defaults.closeOnFinish,re=Ne??a.defaults.popupPlacement,Ke=_e??a.defaults.popupRound,se=Ie??a.defaults.loadingText,[ie,G]=je(n,{defaultValue:[],trigger:"onChange"}),C=En(i),j=Array.isArray(ie)?ie:[],[Q,H]=m.useState(j),ce=x??a.defaults.closeable,[F,M]=je(n,{defaultValue:!1,valuePropName:"visible",defaultValuePropName:"defaultVisible",trigger:"onVisibleChange"}),V=v?Q:j,{tabs:ue,items:D,depth:S}=Vn(o,C,V),{width:We}=jn(),[$e,qe]=m.useState(0),Je=m.useCallback(r=>{const c=r.nativeEvent.layout.width;c&&qe(d=>d===c?d:c)},[]),Ue=ge(o,C,j),[Ge,de]=m.useState(0);m.useEffect(()=>{let c=Array.isArray(V)?V.length:0;c>=S&&(c=Math.max(S-1,0)),de(d=>d===c?d:c)},[V.length,S]),m.useEffect(()=>{if(!v){H(r=>Z(r,j)?r:j);return}F||H(r=>Z(r,j)?r:j)},[j,v,F]);const A=m.useCallback(()=>{!v||F||(H(r=>Z(r,j)?r:j),M(!0))},[j,v,F,M]),B=m.useCallback(r=>{!v||!F||(M(!1),r&&b?.())},[b,v,F,M]),Qe=m.useCallback(()=>{v&&(F?B(!0):A())},[B,A,v,F]),X=hn(z),pe=X?z:null,Xe=m.useCallback(r=>{const c=Ce(r.index)?r.index:Number(r.name);if(Number.isNaN(c))return;const d=D[c]?.[C.textKey],k=$(d)?String(d):O;I?.(c,k)},[D,C.textKey,I,O]),Ye=m.useCallback((r,c)=>{const d=Ce(c)?c:Number(r);Number.isNaN(d)||(de(d),ae?.(d))},[ae]),xe=m.useCallback((r,c)=>{if(r.disabled)return;const d=r[C.valueKey];if(d==null)return;const y=[...(v?Q:j).slice(0,c),d],N=ge(o,C,y),K=r[C.childrenKey]??[],W=Object.prototype.hasOwnProperty.call(r,C.childrenKey),P=K.length>0,Y=W&&!P,fe=y.length>=S,xn=!P&&!Y;v?(H(y),f?.(y,N)):G(y,N),(xn||fe)&&(v&&(G(y,N),le&&B(!0)),w?.(y,N))},[j,le,B,S,C,f,w,o,Q,v,G]),he=m.useCallback(r=>{if(r<=0)return O;const c=D[r-1];return!c||!Object.prototype.hasOwnProperty.call(c,C.childrenKey)?O:(c[C.childrenKey]??[]).length===0&&V.length===r?se:O},[V.length,D,C.childrenKey,se,O]),Ze=()=>{if(!ue.length)return e.jsx(Fe,{optionList:[],tabIndex:0,selectedValue:V[0],activeColor:U,keys:C,optionRender:l,onSelect:xe,tokens:a,emptyText:he(0)});const r=!!He,c=$e||We||void 0,d={height:a.sizing.headerHeight,paddingHorizontal:a.spacing.tabNavPaddingHorizontal,paddingVertical:a.spacing.tabNavPaddingVertical,backgroundColor:a.colors.background};return e.jsx(R,{style:a.layout.tabsWrapper,onLayout:Je,children:e.jsx(ye,{style:c?{width:c}:void 0,active:Ge,onChange:Ye,onClickTab:Xe,align:"center",swipeable:r,swipeThreshold:0,scrollable:!0,animated:!0,duration:300,color:U,lineHeight:a.sizing.indicatorHeight,titleActiveColor:a.colors.tabText,titleInactiveColor:a.colors.tabInactive,tabBarStyle:d,tabStyle:[a.layout.tabsItem,{paddingHorizontal:a.spacing.tabPaddingHorizontal}],titleStyle:[a.layout.tabsTitle,{fontSize:a.typography.tabsTitleSize}],contentStyle:r?void 0:a.layout.tabsContentStatic,children:ue.map((k,y)=>{const K=D[y]?.[C.textKey],W=$(K)?String(K):"",P=!W,Y=fe=>e.jsx(q,{style:[a.layout.tabTitleNode,{color:P?a.colors.tabInactive:a.colors.tabText,fontWeight:P?a.typography.tabTitlePlaceholderWeight:a.typography.tabTitleWeight}],children:P?O:W});return e.jsx(ye.TabPane,{name:y,title:Y,children:e.jsx(Fe,{optionList:k,tabIndex:y,selectedValue:V[y],activeColor:U,keys:C,optionRender:l,onSelect:xe,tokens:a,emptyText:he(y)})},y)})})})},ve=!v&&!X?z:null,me=e.jsxs(R,{testID:Se,style:[a.layout.container,{backgroundColor:a.colors.background},De],...ze,children:[oe?e.jsxs(R,{style:[a.layout.header,{height:a.sizing.headerHeight,paddingHorizontal:a.spacing.headerPaddingHorizontal}],children:[$(J)?e.jsx(q,{style:[a.layout.title,{color:a.colors.headerText,fontSize:a.typography.titleSize,fontWeight:a.typography.titleWeight}],children:J}):J,ce?e.jsx(be,{hitSlop:8,onPress:()=>{v?B(!0):b?.()},style:[a.layout.closeButton,{marginLeft:a.spacing.closeButtonMarginLeft}],accessibilityRole:"button",accessibilityLabel:"关闭",children:g??(r=>e.jsx(fn,{size:a.sizing.closeIconSize,fill:r.pressed?a.colors.closeIconActive:a.colors.closeIcon,color:r.pressed?a.colors.closeIconActive:a.colors.closeIcon}))}):null]}):null,Ze(),ve?e.jsx(R,{style:[a.layout.inlineChildren,{paddingVertical:a.spacing.inlineChildrenPaddingVertical,paddingHorizontal:a.spacing.headerPaddingHorizontal}],children:ve}):null]});if(!v)return me;const{closeOnOverlayPress:en,overlay:nn,onOpen:tn,onOpened:an,onClose:on,onClosed:ln,...T}=Le??{},rn=nn??!0,sn=en??Me,cn={open:A,close:()=>B(!0),toggle:Qe},un=m.useCallback(r=>{if(!E.isValidElement(r))return r;const c=r.props,d=()=>{c.onPress?.(),c.onClick?.(),A()};return E.cloneElement(r,{onPress:d,onClick:d})},[A]),dn=pe?pe(j,Ue,cn):X?null:z||null,pn=un(dn);return e.jsxs(e.Fragment,{children:[pn,e.jsx(Cn,{visible:F,placement:re,round:Ke,closeOnOverlayPress:sn,overlay:rn,safeAreaInsetTop:T?.safeAreaInsetTop!==void 0?T.safeAreaInsetTop:oe&&ce,safeAreaInsetBottom:T?.safeAreaInsetBottom!==void 0?T.safeAreaInsetBottom:re==="bottom",onOpen:tn,onOpened:an,onClose:()=>{on?.(),B(!0)},onClosed:ln,...T,style:{paddingLeft:0,paddingRight:0},children:me})]})},Bn=E.memo(({option:n,tabIndex:t,selected:o,activeColor:u,keys:s,optionRender:p,onSelect:i,tokens:l})=>{const h=n[s.valueKey],x=n[s.textKey],g=!!n.disabled,f=n.color??l.colors.optionText,b=g?l.colors.optionDisabled:o?n.color??u:f,w=p?p({option:n,selected:o}):$(x)?e.jsx(q,{style:[l.layout.optionText,{color:b,fontSize:l.typography.optionTextSize},o&&{fontWeight:l.typography.optionTextActiveWeight}],children:x}):vn(x)?x:null;return e.jsx(be,{testID:`cascader-option-${t}-${String(h)}`,style:({pressed:I})=>[l.layout.option,{minHeight:l.sizing.optionMinHeight,paddingVertical:l.spacing.optionPaddingVertical,paddingHorizontal:l.spacing.optionPaddingHorizontal},I&&!g&&{backgroundColor:l.colors.optionActiveBackground}],onPress:()=>i(n,t),disabled:g,children:e.jsxs(R,{style:l.layout.optionContent,children:[e.jsx(R,{style:[l.layout.optionLabel,{marginRight:l.spacing.optionLabelMarginRight}],children:w}),o?e.jsx(mn,{size:l.sizing.selectedIconSize,fill:u,color:u}):null]})})}),Fe=E.memo(({optionList:n,tabIndex:t,selectedValue:o,activeColor:u,keys:s,optionRender:p,onSelect:i,tokens:l,emptyText:h})=>{if(!n.length)return e.jsx(R,{style:[l.layout.optionList,{height:l.sizing.optionListHeight}],children:e.jsx(q,{style:[l.layout.empty,{color:l.colors.placeholder,paddingVertical:l.spacing.emptyPaddingVertical,fontSize:l.typography.emptyTextSize}],children:h})});const x=m.useCallback(({item:f})=>e.jsx(Bn,{option:f,tabIndex:t,selected:o===f[s.valueKey],activeColor:u,keys:s,optionRender:p,onSelect:i,tokens:l}),[u,s,i,p,o,t,l]),g=m.useCallback(f=>String(f[s.valueKey]),[s.valueKey]);return e.jsx(gn,{data:n,style:[l.layout.optionList,{height:l.sizing.optionListHeight}],contentContainerStyle:{paddingTop:l.spacing.optionListPaddingTop,paddingBottom:l.spacing.optionListPaddingBottom},showsVerticalScrollIndicator:!1,renderItem:x,keyExtractor:g,removeClippedSubviews:!0,initialNumToRender:20,windowSize:5})}),te=[{text:"浙江省",value:"330000",children:[{text:"杭州市",value:"330100",children:[{text:"上城区",value:"330102"},{text:"下城区",value:"330103"},{text:"江干区",value:"330104"}]},{text:"宁波市",value:"330200",children:[{text:"海曙区",value:"330203"},{text:"江北区",value:"330205"},{text:"北仑区",value:"330206"}]},{text:"温州市",value:"330300",children:[{text:"鹿城区",value:"330302"},{text:"龙湾区",value:"330303"},{text:"瓯海区",value:"330304"}]}]},{text:"江苏省",value:"320000",children:[{text:"南京市",value:"320100",children:[{text:"玄武区",value:"320102"},{text:"秦淮区",value:"320104"},{text:"建邺区",value:"320105"}]},{text:"无锡市",value:"320200",children:[{text:"锡山区",value:"320205"},{text:"惠山区",value:"320206"},{text:"滨湖区",value:"320211"}]},{text:"徐州市",value:"320300",children:[{text:"鼓楼区",value:"320302"},{text:"云龙区",value:"320303"},{text:"贾汪区",value:"320305"}]}]}],Rn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function we(){const[n,t]=E.useState([]);return e.jsx(L,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,value:n,onChange:o=>t(o),onFinish:o=>t(o),children:(o,u,s)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Rn(u),placeholder:"请选择地区",onClick:s.open})})}const Pn=`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`,Dn={code:Pn,sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"基础用法",identifier:"cascader-base",lang:"tsx",meta:{title:"基础用法"}},Sn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Oe(){const n=ee.useForm(),t=()=>{n.current?.setFieldsValue({area:["330000","330100","330104"]})};return e.jsxs(ee,{ref:n,style:{paddingHorizontal:12},onFinish:o=>Fn.info(JSON.stringify(o)),children:[e.jsx(ee.Item,{name:"area",trigger:"onChange",children:e.jsx(L,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,children:(o,u,s)=>e.jsx(_,{label:"地区",readOnly:!0,isLink:!0,value:Sn(u),placeholder:"请选择地区",onClick:s.open})})}),e.jsxs(bn,{justify:"center",style:{marginTop:20},children:[e.jsx(ne,{type:"primary",text:"提交",onPress:()=>n.current?.submit()}),e.jsx(ne,{text:"设置默认值",onPress:t})]})]})}const An=`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`,Tn={code:An,sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"Form中使用",identifier:"cascader-form",lang:"tsx",meta:{title:"Form中使用"}},kn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Ve(){const[n,t]=E.useState([{text:"浙江省",value:"330000",children:[]}]),[o,u]=E.useState([]),s=p=>{const i=String(p[p.length-1]??""),l=n[0].children?.length===0;i===String(n[0].value)&&l&&setTimeout(()=>{t(h=>{const x=[...h];return x[0]={...x[0],children:[{text:"杭州市",value:"330100"},{text:"宁波市",value:"330200"}]},x})},800)};return e.jsx(L,{poppable:!0,popupRound:!0,title:"请选择地区",options:n,value:o,onChange:p=>{u(p),s(p)},children:(p,i,l)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:kn(i),placeholder:"请选择地区",onClick:l.open})})}const Nn=`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`,_n={code:Nn,sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"异步加载选项",identifier:"cascader-async",lang:"tsx",meta:{title:"异步加载选项"}},Ln=[{label:"浙江省",code:"330000",items:[{label:"杭州市",code:"330100"}]},{label:"江苏省",code:"320000",items:[{label:"南京市",code:"320100"}]}],Ee={text:"label",value:"code",children:"items"},In=n=>n.map(t=>t?.[Ee.text]).filter(Boolean).join(" / ");function Be(){return e.jsx(L,{poppable:!0,popupRound:!0,fieldNames:Ee,title:"请选择地区",options:Ln,children:(n,t,o)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:In(t),placeholder:"请选择地区",onClick:o.open})})}const zn=`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`,Hn={code:zn,sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"自定义字段名",identifier:"cascader-fieldnames",lang:"tsx",meta:{title:"自定义字段名"}},Mn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Re(){const[n,t]=E.useState([]);return e.jsxs(e.Fragment,{children:[e.jsx(L,{poppable:!0,popupRound:!0,title:"请选择地区",options:te,value:n,onFinish:o=>t(o),children:(o,u,s)=>e.jsx(_,{label:"地区",isLink:!0,readOnly:!0,value:Mn(u),placeholder:"请选择地区",onClick:s.open})}),e.jsx(ne,{type:"primary",size:"small",style:{marginTop:12,alignSelf:"center",width:"90%"},text:"外部设置",onPress:()=>t(["330000","330100","330104"])})]})}const Kn=`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`,Wn={code:Kn,sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}},$n=function({previewer:n=()=>null,api:t=()=>null}){const o=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"cascader-级联选择","data-anchor":"cascader-级联选择",children:"Cascader 级联选择"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"级联选择框，用于多层级数据的选择，典型场景为省市区选择。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Cascader } from 'react-native-system-ui';",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx(o,{...Dn,children:e.jsx(we,{})}),e.jsx("h3",{id:"form中使用","data-anchor":"form中使用",children:"Form中使用"}),e.jsx(o,{...Tn,children:e.jsx(Oe,{})}),e.jsx("h3",{id:"异步加载选项","data-anchor":"异步加载选项",children:"异步加载选项"}),e.jsxs("p",{children:["可以监听 ",e.jsx("code",{children:"onChange"})," 事件并动态设置 ",e.jsx("code",{children:"options"}),"，实现异步加载选项。"]}),e.jsx(o,{..._n,children:e.jsx(Ve,{})}),e.jsx("h3",{id:"自定义字段名","data-anchor":"自定义字段名",children:"自定义字段名"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"fieldNames"})," 属性可以自定义 ",e.jsx("code",{children:"options"})," 里的字段名称。"]}),e.jsx(o,{...Hn,children:e.jsx(Be,{})}),e.jsx("h3",{id:"受控组件","data-anchor":"受控组件",children:"受控组件"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"value"})," 属性可以 Cascader 成为受控组件。"]}),e.jsx(o,{...Wn,children:e.jsx(Re,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"可选项数据源"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optionRender"})}),e.jsx("td",{children:"自定义选项文字"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," option: CascaderOption, selected: boolean ","}",") => ReactNode"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"未选中时的提示文案"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'请选择'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"选中状态的高亮颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否显示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldNames"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"options"})," 结构中的字段"]}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:e.jsxs("code",{children:["{"," text: 'text', value: 'value', children: 'children' ","}"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeable"})}),e.jsx("td",{children:"是否开启手势左右滑动切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[], actions: CascaderActions) => ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中项变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"全部选项选择完成后触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭图标时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickTab"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(tabIndex: number, title: string) => void"})})]})]})]}),e.jsx("h3",{id:"cascaderoption-数据结构","data-anchor":"cascaderoption-数据结构",children:"CascaderOption 数据结构"}),e.jsxs("p",{children:[e.jsx("code",{children:"options"})," 属性是一个由对象构成的数组，数组中的每个对象配置一个可选项，对象可以包含以下值："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"键名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsx("td",{children:"选项文字（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"选项对应的值（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string | number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"选项文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子选项列表"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用选项"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"className"})}),e.jsx("td",{children:"为对应列添加额外的 class"}),e.jsx("td",{children:e.jsx("code",{children:"string | Array | object"})})]})]})]}),e.jsx("h2",{id:"主题定制","data-anchor":"主题定制",children:"主题定制"}),e.jsx("h3",{id:"样式变量","data-anchor":"样式变量",children:"样式变量"}),e.jsxs("p",{children:["组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 ",e.jsx("a",{href:"/components/config-provider",children:"ConfigProvider 组件"}),"。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"名称"}),e.jsx("th",{children:"默认值"}),e.jsx("th",{children:"描述"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-header-height"}),e.jsx("td",{children:e.jsx("em",{children:"48px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-header-padding"}),e.jsx("td",{children:e.jsx("em",{children:"0 var(--rv-padding-md)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-title-font-size"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-font-size-lg)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-title-line-height"}),e.jsx("td",{children:e.jsx("em",{children:"20px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-size"}),e.jsx("td",{children:e.jsx("em",{children:"22px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-5)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-active-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-6)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-selected-icon-size"}),e.jsx("td",{children:e.jsx("em",{children:"18px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-tabs-height"}),e.jsx("td",{children:e.jsx("em",{children:"48px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-active-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-danger-color)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-options-height"}),e.jsx("td",{children:e.jsx("em",{children:"384px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-option-disabled-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-5)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-tab-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-text-color)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-unselected-tab-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-6)"})}),e.jsx("td",{children:"-"})]})]})]})]})})},qn=[{Component:we,key:"cascader-base",sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(row => row?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderBaseDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={options}
      value={value}
      onChange={val => setValue(val)}
      onFinish={val => setValue(val)}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}

`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"基础用法",identifier:"cascader-base",lang:"tsx",meta:{title:"基础用法"}},{Component:Oe,key:"cascader-form",sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, Form, Space, Toast, type CascaderOption } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderFormDemo() {
  const formRef = Form.useForm()

  const handleSetDefault = () => {
    formRef.current?.setFieldsValue({ area: ['330000', '330100', '330104'] })
  }

  return (
    <Form ref={formRef} style={{ paddingHorizontal: 12 }} onFinish={values => Toast.info(JSON.stringify(values))}>
      <Form.Item name="area" trigger="onChange">
        <Cascader poppable popupRound title="请选择地区" options={options}>
          {(_, rows, actions) => (
            <Field
              label="地区"
              readOnly
              isLink
              value={formatValue(rows)}
              placeholder="请选择地区"
              onClick={actions.open}
            />
          )}
        </Cascader>
      </Form.Item>
      <Space justify="center" style={{ marginTop: 20 }}>
        <Button type="primary" text="提交" onPress={() => formRef.current?.submit()} />
        <Button text="设置默认值" onPress={handleSetDefault} />
      </Space>
    </Form>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"Form中使用",identifier:"cascader-form",lang:"tsx",meta:{title:"Form中使用"}},{Component:Ve,key:"cascader-async",sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

interface AsyncOption extends CascaderOption {
  loading?: boolean
  children?: AsyncOption[]
}

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderAsyncDemo() {
  const [dynamicOpts, setDynamicOpts] = React.useState<AsyncOption[]>([
    { text: '浙江省', value: '330000', children: [] },
  ])
  const [value, setValue] = React.useState<CascaderValue[]>([])

  const handleChange = (val: CascaderValue[]) => {
    const last = String(val[val.length - 1] ?? '')
    const needRequest = dynamicOpts[0].children?.length === 0
    if (last === String(dynamicOpts[0].value) && needRequest) {
      setTimeout(() => {
        setDynamicOpts(prev => {
          const next = [...prev]
          next[0] = {
            ...next[0],
            children: [
              { text: '杭州市', value: '330100' },
              { text: '宁波市', value: '330200' },
            ],
          }
          return next
        })
      }, 800)
    }
  }

  return (
    <Cascader
      poppable
      popupRound
      title="请选择地区"
      options={dynamicOpts}
      value={value}
      onChange={val => {
        setValue(val)
        handleChange(val)
      }}
    >
      {(_, rows, actions) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"异步加载选项",identifier:"cascader-async",lang:"tsx",meta:{title:"异步加载选项"}},{Component:Be,key:"cascader-fieldnames",sources:{_:{tsx:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cascader, Field, type CascaderOption } from 'react-native-system-ui'

type Region = {
  label: string
  code: string
  items?: Region[]
  disabled?: boolean
}

const regions: Region[] = [
  {
    label: '浙江省',
    code: '330000',
    items: [{ label: '杭州市', code: '330100' }],
  },
  {
    label: '江苏省',
    code: '320000',
    items: [{ label: '南京市', code: '320100' }],
  },
]

const fieldNames = { text: 'label', value: 'code', children: 'items' } as const

const formatValue = (rows: CascaderOption[]) =>
  (rows as unknown as Region[])
    .map(row => row?.[fieldNames.text])
    .filter(Boolean)
    .join(' / ')

export default function CascaderFieldNamesDemo() {
  return (
    <Cascader
      poppable
      popupRound
      fieldNames={fieldNames}
      title="请选择地区"
      options={regions as unknown as CascaderOption[]}
    >
      {(
        _value: unknown,
        rows: CascaderOption[],
        actions: { open: () => void },
      ) => (
        <Field
          label="地区"
          isLink
          readOnly
          value={formatValue(rows)}
          placeholder="请选择地区"
          onClick={actions.open}
        />
      )}
    </Cascader>
  )
}
`}},title:"自定义字段名",identifier:"cascader-fieldnames",lang:"tsx",meta:{title:"自定义字段名"}},{Component:Re,key:"cascader-value",sources:{_:{tsx:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{import:"./options",path:"/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/components/cascader/demo/options.ts",content:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Button, Cascader, Field, type CascaderOption, type CascaderValue } from 'react-native-system-ui'

import options from './options'

const formatValue = (rows: CascaderOption[]) =>
  rows
    .map(item => item?.text)
    .filter(Boolean)
    .join(' / ')

export default function CascaderValueDemo() {
  const [value, setValue] = React.useState<CascaderValue[]>([])

  return (
    <>
      <Cascader
        poppable
        popupRound
        title="请选择地区"
        options={options}
        value={value}
        onFinish={val => setValue(val)}
      >
        {(_, rows, actions) => (
          <Field
            label="地区"
            isLink
            readOnly
            value={formatValue(rows)}
            placeholder="请选择地区"
            onClick={actions.open}
          />
        )}
      </Cascader>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, alignSelf: 'center', width: '90%' }}
        text="外部设置"
        onPress={() => setValue(['330000', '330100', '330104'])}
      >
      </Button>
    </>
  )
}
`},"options.ts":{type:"FILE",value:`const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          { text: '上城区', value: '330102' },
          { text: '下城区', value: '330103' },
          { text: '江干区', value: '330104' },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          { text: '海曙区', value: '330203' },
          { text: '江北区', value: '330205' },
          { text: '北仑区', value: '330206' },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          { text: '鹿城区', value: '330302' },
          { text: '龙湾区', value: '330303' },
          { text: '瓯海区', value: '330304' },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          { text: '玄武区', value: '320102' },
          { text: '秦淮区', value: '320104' },
          { text: '建邺区', value: '320105' },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          { text: '锡山区', value: '320205' },
          { text: '惠山区', value: '320206' },
          { text: '滨湖区', value: '320211' },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          { text: '鼓楼区', value: '320302' },
          { text: '云龙区', value: '320303' },
          { text: '贾汪区', value: '320305' },
        ],
      },
    ],
  },
]

export default options
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}}],Jn={simulator:{compact:!0}},Un=[{depth:1,text:"Cascader 级联选择",id:"cascader-级联选择"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"Form中使用",id:"form中使用"},{depth:3,text:"异步加载选项",id:"异步加载选项"},{depth:3,text:"自定义字段名",id:"自定义字段名"},{depth:3,text:"受控组件",id:"受控组件"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CascaderOption 数据结构",id:"cascaderoption-数据结构"},{depth:2,text:"主题定制",id:"主题定制"},{depth:3,text:"样式变量",id:"样式变量"}],Gn="/docs/components/cascader.md",Qn="Cascader 级联选择",Xn="1769570039000",Mt=n=>n.children({MdContent:$n,demos:qn,frontmatter:Jn,slugs:Un,filePath:Gn,title:Qn,updatedTime:Xn});export{$n as MdContent,Mt as default,qn as demos,Gn as filePath,Jn as frontmatter,Un as slugs,Qn as title,Xn as updatedTime};
