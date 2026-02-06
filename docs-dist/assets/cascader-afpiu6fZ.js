import{r as v,i as fe,j as e,V as B,a as W,R as O,b as hn,c as vn}from"./main-CX5QgiXt.js";import{S as mn}from"./Checked-C5Dq4Yeg.js";import{S as fn,P as Cn}from"./Popup-DLZFaqRn.js";import{T as Ce}from"./index-yxa9buJ4.js";import{c as yn,T as $}from"./createComponentTokensHook-Hc3l7riF.js";import{u as ye}from"./useControllableValue-wnptCJgI.js";import{u as gn}from"./index-4qDXDIEs.js";import{M as be}from"./index-CQ2P49YQ.js";import{F as jn}from"./index-BEnr4R_B.js";import{s as ge}from"./compare-B0QhPEQa.js";import{F as N}from"./Field-D9GqoDnQ.js";import{F as Z}from"./index-BHhMpEYB.js";import{B as ee}from"./index-B1BD4WKR.js";import{T as Fn}from"./index-BUHqkOou.js";import{S as bn}from"./Space-Cp0dJ6Ia.js";import"./IconBase-D_kjvpJY.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Portal-BtmwX5Pt.js";import"./Overlay-uC1_KEGM.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./Animated-rPtBS5kg.js";import"./index-BDzwQtXM.js";import"./index-CTcRCRb2.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-CF7tueuh.js";import"./useAriaPress-sIRcrStb.js";import"./SafeAreaView-DiARkPwI.js";import"./useSafeAreaPadding-Du1CT4G_.js";import"./number-DMCxwktP.js";import"./index-D361XNui.js";import"./Arrow-CFMZgj_G.js";import"./hairline-6DGjxZ3L.js";import"./index-D5gHWa6o.js";import"./useLocale-CcH7XcZU.js";import"./promise-Qds5Ah4Z.js";import"./Close-D6NXA1XS.js";import"./index-quLIWFrm.js";import"./index-yde5mSE_.js";import"./color-Cjzk_5VY.js";import"./Loading-Dy4Xe7Yb.js";const wn=n=>{const{palette:t,spacing:a,radii:c}=n,r=t.default[100],d="请选择";return{defaults:{placeholder:d,title:d,showHeader:!0,closeable:!0,swipeable:!0,poppable:!1,closeOnClickOverlay:!0,closeOnFinish:!0,popupPlacement:"bottom",popupRound:!0,loadingText:"加载中..."},layout:{container:{borderRadius:0,width:"100%"},header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:0},title:{lineHeight:20,includeFontPadding:!1},closeButton:{},tabsWrapper:{width:"100%"},tabsContentStatic:{width:"100%"},tabsItem:{alignItems:"center"},tabsTitle:{includeFontPadding:!1},tabTitleNode:{includeFontPadding:!1},optionList:{flexGrow:0},option:{justifyContent:"center"},optionContent:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},optionText:{lineHeight:20,includeFontPadding:!1},optionTextActive:{},optionLabel:{flex:1},empty:{textAlign:"center"},inlineChildren:{}},colors:{background:"#ffffff",headerText:t.default[900],placeholder:t.default[500],closeIcon:t.default[300],closeIconActive:t.default[500],tabText:t.default[900],tabActive:t.primary[500],tabInactive:t.default[500],optionText:t.default[900],optionDisabled:t.default[300],optionActiveBackground:r,optionActiveText:t.primary[500],divider:t.default[200]},typography:{titleSize:16,titleWeight:"500",tabsTitleSize:14,tabTitlePlaceholderWeight:"400",tabTitleWeight:"500",optionTextSize:14,optionTextActiveWeight:"500",emptyTextSize:14},sizing:{indicatorHeight:3,optionMinHeight:40,optionListHeight:384,headerHeight:48,closeIconSize:22,selectedIconSize:18},radii:{option:c.sm},spacing:{headerPaddingHorizontal:a.lg,tabNavPaddingHorizontal:6,tabNavPaddingVertical:2,tabPaddingHorizontal:10,optionPaddingVertical:10,optionPaddingHorizontal:a.lg,optionListPaddingTop:6,optionListPaddingBottom:0,closeButtonMarginLeft:8,optionLabelMarginRight:12,emptyPaddingVertical:24,inlineChildrenPaddingVertical:12}}},On=yn("cascader",wn),Vn=(n,t)=>{let a=1;const c=(r,d)=>{if(!r||!r.length)return;d>a&&(a=d);const u=d+1;r.forEach(l=>{Object.prototype.hasOwnProperty.call(l,t)&&u>a&&(a=u);const x=l[t];x&&x.length&&c(x,u)})};return c(n,1),a},En=(n=[],t,a)=>{const c=Vn(n,t.childrenKey),r=!a||!a.length?[n]:a.reduce((u,l,C)=>{if(l==null)return u;const x=u[C];if(!x)return u;const y=x.find(V=>V[t.valueKey]===a[C])?.[t.childrenKey];return y&&u.push(y),u},[n]),d=!a||!a.length?[]:a.map((u,l)=>r[l]?.find(C=>C[t.valueKey]===u));return{tabs:r,items:d,depth:c}},Bn=n=>({textKey:n?.text??"text",valueKey:n?.value??"value",childrenKey:n?.children??"children"}),je=(n=[],t,a)=>{const c=[];let r=n;return a.forEach(d=>{if(!r||!r.length)return;const u=r.find(l=>l[t.valueKey]===d);u&&(c.push(u),r=u[t.childrenKey]??[])}),c},_=n=>{const{tokensOverride:t,options:a=[],title:c,placeholder:r,activeColor:d,fieldNames:u,optionRender:l,showHeader:C,closeable:x,closeIcon:F,onChange:y,onClose:V,onFinish:L,onClickTab:I,onTabChange:te,swipeable:Pe,style:De,testID:Se,children:z,poppable:Ae,visible:Zn,defaultVisible:et,onVisibleChange:nt,closeOnClickOverlay:Te,closeOnFinish:ke,popupPlacement:Ne,popupRound:_e,popupProps:Le,loadingText:Ie,...ze}=n,o=On(t),q=c??o.defaults.title,b=r??o.defaults.placeholder,J=d??o.colors.tabActive,ae=C??o.defaults.showHeader,He=Pe??o.defaults.swipeable,h=Ae??o.defaults.poppable,Me=Te??o.defaults.closeOnClickOverlay,oe=ke??o.defaults.closeOnFinish,le=Ne??o.defaults.popupPlacement,Ke=_e??o.defaults.popupRound,se=Ie??o.defaults.loadingText,[re,U]=ye(n,{defaultValue:[],trigger:"onChange"}),m=Bn(u),g=Array.isArray(re)?re:[],[G,Q]=v.useState(g),ie=x??o.defaults.closeable,[j,H]=ye(n,{defaultValue:!1,valuePropName:"visible",defaultValuePropName:"defaultVisible",trigger:"onVisibleChange"}),w=h?G:g,{tabs:ce,items:P,depth:D}=En(a,m,w),{width:We}=gn(),[$e,qe]=v.useState(0),Je=v.useCallback(s=>{const i=s.nativeEvent.layout.width;i&&qe(p=>p===i?p:i)},[]),Ue=je(a,m,g),[Ge,ue]=v.useState(0);v.useEffect(()=>{let i=Array.isArray(w)?w.length:0;i>=D&&(i=Math.max(D-1,0)),ue(p=>p===i?p:i)},[w.length,D]),v.useEffect(()=>{(!h||!j)&&Q(s=>ge(s,g)?s:g)},[g,h,j]);const S=v.useCallback(()=>{!h||j||(Q(s=>ge(s,g)?s:g),H(!0))},[g,h,j,H]),E=v.useCallback(s=>{!h||!j||(H(!1),s&&V?.())},[V,h,j,H]),Qe=v.useCallback(()=>{h&&(j?E(!0):S())},[E,S,h,j]),X=hn(z),de=X?z:null,Xe=v.useCallback(s=>{const i=fe(s.index)?s.index:Number(s.name);if(Number.isNaN(i))return;const p=P[i]?.[m.textKey],T=W(p)?String(p):b;I?.(i,T)},[P,m.textKey,I,b]),Ye=v.useCallback((s,i)=>{const p=fe(i)?i:Number(s);Number.isNaN(p)||(ue(p),te?.(p))},[te]),pe=v.useCallback((s,i)=>{if(s.disabled)return;const p=s[m.valueKey];if(p==null)return;const f=[...(h?G:g).slice(0,i),p],k=je(a,m,f),M=s[m.childrenKey]??[],K=Object.prototype.hasOwnProperty.call(s,m.childrenKey),R=M.length>0,Y=K&&!R,me=f.length>=D,xn=!R&&!Y;h?(Q(f),y?.(f,k)):U(f,k),(xn||me)&&(h&&(U(f,k),oe&&E(!0)),L?.(f,k))},[g,oe,E,D,m,y,L,a,G,h,U]),xe=v.useCallback(s=>{if(s<=0)return b;const i=P[s-1];return!i||!Object.prototype.hasOwnProperty.call(i,m.childrenKey)?b:(i[m.childrenKey]??[]).length===0&&w.length===s?se:b},[w.length,P,m.childrenKey,se,b]),Ze=()=>{if(!ce.length)return e.jsx(Fe,{optionList:[],tabIndex:0,selectedValue:w[0],activeColor:J,keys:m,optionRender:l,onSelect:pe,tokens:o,emptyText:xe(0)});const s=!!He,i=$e||We||void 0,p={height:o.sizing.headerHeight,paddingHorizontal:o.spacing.tabNavPaddingHorizontal,paddingVertical:o.spacing.tabNavPaddingVertical,backgroundColor:o.colors.background};return e.jsx(B,{style:o.layout.tabsWrapper,onLayout:Je,children:e.jsx(Ce,{style:i?{width:i}:void 0,active:Ge,onChange:Ye,onClickTab:Xe,align:"center",swipeable:s,swipeThreshold:0,scrollable:!0,animated:!0,duration:300,color:J,lineHeight:o.sizing.indicatorHeight,titleActiveColor:o.colors.tabText,titleInactiveColor:o.colors.tabInactive,tabBarStyle:p,tabStyle:[o.layout.tabsItem,{paddingHorizontal:o.spacing.tabPaddingHorizontal}],titleStyle:[o.layout.tabsTitle,{fontSize:o.typography.tabsTitleSize}],contentStyle:s?void 0:o.layout.tabsContentStatic,children:ce.map((T,f)=>{const M=P[f]?.[m.textKey],K=W(M)?String(M):"",R=!K,Y=me=>e.jsx($,{style:[o.layout.tabTitleNode,{color:R?o.colors.tabInactive:o.colors.tabText,fontWeight:R?o.typography.tabTitlePlaceholderWeight:o.typography.tabTitleWeight}],children:R?b:K});return e.jsx(Ce.TabPane,{name:f,title:Y,children:e.jsx(Fe,{optionList:T,tabIndex:f,selectedValue:w[f],activeColor:J,keys:m,optionRender:l,onSelect:pe,tokens:o,emptyText:xe(f)})},f)})})})},he=!h&&!X?z:null,ve=e.jsxs(B,{testID:Se,style:[o.layout.container,{backgroundColor:o.colors.background},De],...ze,children:[ae?e.jsxs(B,{style:[o.layout.header,{height:o.sizing.headerHeight,paddingHorizontal:o.spacing.headerPaddingHorizontal}],children:[W(q)?e.jsx($,{style:[o.layout.title,{color:o.colors.headerText,fontSize:o.typography.titleSize,fontWeight:o.typography.titleWeight}],children:q}):q,ie?e.jsx(be,{hitSlop:8,onPress:()=>{h?E(!0):V?.()},style:[o.layout.closeButton,{marginLeft:o.spacing.closeButtonMarginLeft}],accessibilityRole:"button",accessibilityLabel:"关闭",children:F??(s=>e.jsx(fn,{size:o.sizing.closeIconSize,fill:s.pressed?o.colors.closeIconActive:o.colors.closeIcon,color:s.pressed?o.colors.closeIconActive:o.colors.closeIcon}))}):null]}):null,Ze(),he?e.jsx(B,{style:[o.layout.inlineChildren,{paddingVertical:o.spacing.inlineChildrenPaddingVertical,paddingHorizontal:o.spacing.headerPaddingHorizontal}],children:he}):null]});if(!h)return ve;const{closeOnOverlayPress:en,overlay:nn,onOpen:tn,onOpened:an,onClose:on,onClosed:ln,...A}=Le??{},sn=nn??!0,rn=en??Me,cn={open:S,close:()=>E(!0),toggle:Qe},un=v.useCallback(s=>{if(!O.isValidElement(s))return s;const i=s.props,p=()=>{i.onPress?.(),i.onClick?.(),S()};return O.cloneElement(s,{onPress:p,onClick:p})},[S]),dn=de?de(g,Ue,cn):X?null:z||null,pn=un(dn);return e.jsxs(e.Fragment,{children:[pn,e.jsx(Cn,{visible:j,placement:le,round:Ke,closeOnOverlayPress:rn,overlay:sn,safeAreaInsetTop:A?.safeAreaInsetTop!==void 0?A.safeAreaInsetTop:ae&&ie,safeAreaInsetBottom:A?.safeAreaInsetBottom!==void 0?A.safeAreaInsetBottom:le==="bottom",onOpen:tn,onOpened:an,onClose:()=>{on?.(),E(!0)},onClosed:ln,...A,style:{paddingLeft:0,paddingRight:0},children:ve})]})},Rn=O.memo(({option:n,tabIndex:t,selected:a,activeColor:c,keys:r,optionRender:d,onSelect:u,tokens:l})=>{const C=n[r.valueKey],x=n[r.textKey],F=!!n.disabled,y=n.color??l.colors.optionText,V=F?l.colors.optionDisabled:a?n.color??c:y,L=d?d({option:n,selected:a}):W(x)?e.jsx($,{style:[l.layout.optionText,{color:V,fontSize:l.typography.optionTextSize},a&&{fontWeight:l.typography.optionTextActiveWeight}],children:x}):vn(x)?x:null;return e.jsx(be,{testID:`cascader-option-${t}-${String(C)}`,style:({pressed:I})=>[l.layout.option,{minHeight:l.sizing.optionMinHeight,paddingVertical:l.spacing.optionPaddingVertical,paddingHorizontal:l.spacing.optionPaddingHorizontal},I&&!F&&{backgroundColor:l.colors.optionActiveBackground}],onPress:()=>u(n,t),disabled:F,children:e.jsxs(B,{style:l.layout.optionContent,children:[e.jsx(B,{style:[l.layout.optionLabel,{marginRight:l.spacing.optionLabelMarginRight}],children:L}),a?e.jsx(mn,{size:l.sizing.selectedIconSize,fill:c,color:c}):null]})})}),Fe=O.memo(({optionList:n,tabIndex:t,selectedValue:a,activeColor:c,keys:r,optionRender:d,onSelect:u,tokens:l,emptyText:C})=>{if(!n.length)return e.jsx(B,{style:[l.layout.optionList,{height:l.sizing.optionListHeight}],children:e.jsx($,{style:[l.layout.empty,{color:l.colors.placeholder,paddingVertical:l.spacing.emptyPaddingVertical,fontSize:l.typography.emptyTextSize}],children:C})});const x=v.useCallback(({item:y})=>e.jsx(Rn,{option:y,tabIndex:t,selected:a===y[r.valueKey],activeColor:c,keys:r,optionRender:d,onSelect:u,tokens:l}),[c,r,u,d,a,t,l]),F=v.useCallback(y=>String(y[r.valueKey]),[r.valueKey]);return e.jsx(jn,{data:n,style:[l.layout.optionList,{height:l.sizing.optionListHeight}],contentContainerStyle:{paddingTop:l.spacing.optionListPaddingTop,paddingBottom:l.spacing.optionListPaddingBottom},showsVerticalScrollIndicator:!1,renderItem:x,keyExtractor:F,removeClippedSubviews:!0,initialNumToRender:20,windowSize:5})}),ne=[{text:"浙江省",value:"330000",children:[{text:"杭州市",value:"330100",children:[{text:"上城区",value:"330102"},{text:"下城区",value:"330103"},{text:"江干区",value:"330104"}]},{text:"宁波市",value:"330200",children:[{text:"海曙区",value:"330203"},{text:"江北区",value:"330205"},{text:"北仑区",value:"330206"}]},{text:"温州市",value:"330300",children:[{text:"鹿城区",value:"330302"},{text:"龙湾区",value:"330303"},{text:"瓯海区",value:"330304"}]}]},{text:"江苏省",value:"320000",children:[{text:"南京市",value:"320100",children:[{text:"玄武区",value:"320102"},{text:"秦淮区",value:"320104"},{text:"建邺区",value:"320105"}]},{text:"无锡市",value:"320200",children:[{text:"锡山区",value:"320205"},{text:"惠山区",value:"320206"},{text:"滨湖区",value:"320211"}]},{text:"徐州市",value:"320300",children:[{text:"鼓楼区",value:"320302"},{text:"云龙区",value:"320303"},{text:"贾汪区",value:"320305"}]}]}],Pn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function we(){const[n,t]=O.useState([]);return e.jsx(_,{poppable:!0,popupRound:!0,title:"请选择地区",options:ne,value:n,onChange:a=>t(a),onFinish:a=>t(a),children:(a,c,r)=>e.jsx(N,{label:"地区",isLink:!0,readOnly:!0,value:Pn(c),placeholder:"请选择地区",onClick:r.open})})}const Dn=`import React from 'react'
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

`,Sn={code:Dn,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"基础用法",identifier:"cascader-base",lang:"tsx",meta:{title:"基础用法"}},An=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Oe(){const n=Z.useForm(),t=()=>{n.current?.setFieldsValue({area:["330000","330100","330104"]})};return e.jsxs(Z,{ref:n,style:{paddingHorizontal:12},onFinish:a=>Fn.info(JSON.stringify(a)),children:[e.jsx(Z.Item,{name:"area",trigger:"onChange",children:e.jsx(_,{poppable:!0,popupRound:!0,title:"请选择地区",options:ne,children:(a,c,r)=>e.jsx(N,{label:"地区",readOnly:!0,isLink:!0,value:An(c),placeholder:"请选择地区",onClick:r.open})})}),e.jsxs(bn,{justify:"center",style:{marginTop:20},children:[e.jsx(ee,{type:"primary",text:"提交",onPress:()=>n.current?.submit()}),e.jsx(ee,{text:"设置默认值",onPress:t})]})]})}const Tn=`import React from 'react'
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
`,kn={code:Tn,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"Form中使用",identifier:"cascader-form",lang:"tsx",meta:{title:"Form中使用"}},Nn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Ve(){const[n,t]=O.useState([{text:"浙江省",value:"330000",children:[]}]),[a,c]=O.useState([]),r=d=>{const u=String(d[d.length-1]??""),l=n[0].children?.length===0;u===String(n[0].value)&&l&&setTimeout(()=>{t(C=>{const x=[...C];return x[0]={...x[0],children:[{text:"杭州市",value:"330100"},{text:"宁波市",value:"330200"}]},x})},800)};return e.jsx(_,{poppable:!0,popupRound:!0,title:"请选择地区",options:n,value:a,onChange:d=>{c(d),r(d)},children:(d,u,l)=>e.jsx(N,{label:"地区",isLink:!0,readOnly:!0,value:Nn(u),placeholder:"请选择地区",onClick:l.open})})}const _n=`import React from 'react'
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
`,Ln={code:_n,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"异步加载选项",identifier:"cascader-async",lang:"tsx",meta:{title:"异步加载选项"}},In=[{label:"浙江省",code:"330000",items:[{label:"杭州市",code:"330100"}]},{label:"江苏省",code:"320000",items:[{label:"南京市",code:"320100"}]}],Ee={text:"label",value:"code",children:"items"},zn=n=>n.map(t=>t?.[Ee.text]).filter(Boolean).join(" / ");function Be(){return e.jsx(_,{poppable:!0,popupRound:!0,fieldNames:Ee,title:"请选择地区",options:In,children:(n,t,a)=>e.jsx(N,{label:"地区",isLink:!0,readOnly:!0,value:zn(t),placeholder:"请选择地区",onClick:a.open})})}const Hn=`import React from 'react'
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
`,Mn={code:Hn,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"自定义字段名",identifier:"cascader-fieldnames",lang:"tsx",meta:{title:"自定义字段名"}},Kn=n=>n.map(t=>t?.text).filter(Boolean).join(" / ");function Re(){const[n,t]=O.useState([]);return e.jsxs(e.Fragment,{children:[e.jsx(_,{poppable:!0,popupRound:!0,title:"请选择地区",options:ne,value:n,onFinish:a=>t(a),children:(a,c,r)=>e.jsx(N,{label:"地区",isLink:!0,readOnly:!0,value:Kn(c),placeholder:"请选择地区",onClick:r.open})}),e.jsx(ee,{type:"primary",size:"small",style:{marginTop:12,alignSelf:"center",width:"90%"},text:"外部设置",onPress:()=>t(["330000","330100","330104"])})]})}const Wn=`import React from 'react'
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
`,$n={code:Wn,sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}},qn=function({previewer:n=()=>null,api:t=()=>null}){const a=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"cascader-级联选择","data-anchor":"cascader-级联选择",children:"Cascader 级联选择"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"级联选择框，用于多层级数据的选择，典型场景为省市区选择。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(a,{code:"import { Cascader } from 'react-native-system-ui';",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx(a,{...Sn,children:e.jsx(we,{})}),e.jsx("h3",{id:"form中使用","data-anchor":"form中使用",children:"Form中使用"}),e.jsx(a,{...kn,children:e.jsx(Oe,{})}),e.jsx("h3",{id:"异步加载选项","data-anchor":"异步加载选项",children:"异步加载选项"}),e.jsxs("p",{children:["可以监听 ",e.jsx("code",{children:"onChange"})," 事件并动态设置 ",e.jsx("code",{children:"options"}),"，实现异步加载选项。"]}),e.jsx(a,{...Ln,children:e.jsx(Ve,{})}),e.jsx("h3",{id:"自定义字段名","data-anchor":"自定义字段名",children:"自定义字段名"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"fieldNames"})," 属性可以自定义 ",e.jsx("code",{children:"options"})," 里的字段名称。"]}),e.jsx(a,{...Mn,children:e.jsx(Be,{})}),e.jsx("h3",{id:"受控组件","data-anchor":"受控组件",children:"受控组件"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"value"})," 属性可以 Cascader 成为受控组件。"]}),e.jsx(a,{...$n,children:e.jsx(Re,{})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"props","data-anchor":"props",children:"Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"顶部标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"当前选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultValue"})}),e.jsx("td",{children:"默认选中的值"}),e.jsx("td",{children:e.jsx("code",{children:"(string | number)[]"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"options"})}),e.jsx("td",{children:"可选项数据源"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optionRender"})}),e.jsx("td",{children:"自定义选项文字"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," option: CascaderOption, selected: boolean ","}",") => ReactNode"]})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"placeholder"})}),e.jsx("td",{children:"未选中时的提示文案"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'请选择'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"activeColor"})}),e.jsx("td",{children:"选中状态的高亮颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否显示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"fieldNames"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"options"})," 结构中的字段"]}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:e.jsxs("code",{children:["{"," text: 'text', value: 'value', children: 'children' ","}"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeable"})}),e.jsx("td",{children:"是否开启手势左右滑动切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"渲染函数"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[], actions: CascaderActions) => ReactNode"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"events","data-anchor":"events",children:"Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"选中项变化时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onFinish"})}),e.jsx("td",{children:"全部选项选择完成后触发"}),e.jsx("td",{children:e.jsx("code",{children:"(val: (string | number)[], selectedRows: CascaderOption[]) => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"点击关闭图标时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickTab"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(tabIndex: number, title: string) => void"})})]})]})]}),e.jsx("h3",{id:"cascaderoption-数据结构","data-anchor":"cascaderoption-数据结构",children:"CascaderOption 数据结构"}),e.jsxs("p",{children:[e.jsx("code",{children:"options"})," 属性是一个由对象构成的数组，数组中的每个对象配置一个可选项，对象可以包含以下值："]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"键名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsx("td",{children:"选项文字（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsx("td",{children:"选项对应的值（必填）"}),e.jsx("td",{children:e.jsx("code",{children:"string | number"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"选项文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsx("td",{children:"子选项列表"}),e.jsx("td",{children:e.jsx("code",{children:"CascaderOption[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用选项"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"className"})}),e.jsx("td",{children:"为对应列添加额外的 class"}),e.jsx("td",{children:e.jsx("code",{children:"string | Array | object"})})]})]})]}),e.jsx("h2",{id:"主题定制","data-anchor":"主题定制",children:"主题定制"}),e.jsx("h3",{id:"样式变量","data-anchor":"样式变量",children:"样式变量"}),e.jsxs("p",{children:["组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 ",e.jsx("a",{href:"/components/config-provider",children:"ConfigProvider 组件"}),"。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"名称"}),e.jsx("th",{children:"默认值"}),e.jsx("th",{children:"描述"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-header-height"}),e.jsx("td",{children:e.jsx("em",{children:"48px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-header-padding"}),e.jsx("td",{children:e.jsx("em",{children:"0 var(--rv-padding-md)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-title-font-size"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-font-size-lg)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-title-line-height"}),e.jsx("td",{children:e.jsx("em",{children:"20px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-size"}),e.jsx("td",{children:e.jsx("em",{children:"22px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-5)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-close-icon-active-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-6)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-selected-icon-size"}),e.jsx("td",{children:e.jsx("em",{children:"18px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-tabs-height"}),e.jsx("td",{children:e.jsx("em",{children:"48px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-active-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-danger-color)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-options-height"}),e.jsx("td",{children:e.jsx("em",{children:"384px"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-option-disabled-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-5)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-tab-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-text-color)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"--rv-cascader-unselected-tab-color"}),e.jsx("td",{children:e.jsx("em",{children:"var(--rv-gray-6)"})}),e.jsx("td",{children:"-"})]})]})]})]})})},Jn=[{Component:we,key:"cascader-base",sources:{_:{tsx:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
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
`}},title:"受控组件",identifier:"cascader-value",lang:"tsx",meta:{title:"受控组件"}}],Un={simulator:{compact:!0}},Gn=[{depth:1,text:"Cascader 级联选择",id:"cascader-级联选择"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"Form中使用",id:"form中使用"},{depth:3,text:"异步加载选项",id:"异步加载选项"},{depth:3,text:"自定义字段名",id:"自定义字段名"},{depth:3,text:"受控组件",id:"受控组件"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:3,text:"CascaderOption 数据结构",id:"cascaderoption-数据结构"},{depth:2,text:"主题定制",id:"主题定制"},{depth:3,text:"样式变量",id:"样式变量"}],Qn="/docs/components/cascader.md",Xn="Cascader 级联选择",Yn="1769570039000",Kt=n=>n.children({MdContent:qn,demos:Jn,frontmatter:Un,slugs:Gn,filePath:Qn,title:Xn,updatedTime:Yn});export{qn as MdContent,Kt as default,Jn as demos,Qn as filePath,Un as frontmatter,Gn as slugs,Xn as title,Yn as updatedTime};
