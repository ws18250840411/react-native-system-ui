import{R as h,r as o,d as _e,j as e,V as I,s as $e,$ as Se}from"./main-CC2DK3OK.js";import{C as c}from"./index-Dueh9AzQ.js";import{P as Ne}from"./Popup-G3cXoDWN.js";import{S as V}from"./index-Nb5Zafj3.js";import{c as Ve,T as ce}from"./createComponentTokensHook-BcXZOvON.js";import{M as Oe}from"./index-CN-rk8sC.js";import{I as He}from"./index-D_JlQYPg.js";import{P as H}from"./Portal-D9I31KH1.js";import{S as ie}from"./Close-BKbx2ovl.js";import{T as Xe}from"./index-CYc3exVx.js";import"./Arrow-CP2eQgBg.js";import"./IconBase-BNmvoXvm.js";import"./hairline-Bq3nniT3.js";import"./useAriaPress-DVn62gIQ.js";import"./index-CJrLMJTa.js";import"./createPlatformShadow-BbOkyb5V.js";import"./Animated-C-b5K9fC.js";import"./extends-CF3RwP-h.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./animation-BpxpeSKC.js";import"./useOverlayStack-xa377Hoz.js";import"./index-BP7Blb5n.js";import"./SafeAreaView-CgItGtgs.js";import"./useSafeAreaPadding-B0opQgwg.js";import"./number-BG570ZaL.js";import"./Loading-_9EKEhr2.js";import"./index-BnjI8SiS.js";import"./Checked-BJm2Hkef.js";const Ye=n=>{const{palette:t,radii:l,fontSize:d,spacing:u}=n;return{colors:{background:"rgba(0,0,0,0.95)",indexBackground:"rgba(0,0,0,0.35)",indexText:"#fff",indicatorActive:t.primary?.[500]??"#1989fa",indicatorInactive:"rgba(255,255,255,0.4)",transparent:"transparent"},spacing:{indexTop:24,indexPaddingHorizontal:u.lg,indexPaddingVertical:u.xs},layout:{popupPadding:0,popupRadius:0},radii:{indexBadge:l.pill},typography:{indexTextSize:d.sm}}},We=Ve("imagePreview",Ye),j=(n,t)=>t<=0?0:Math.max(0,Math.min(t-1,n)),qe={bottom:32},re=8,oe=re*re,Ue=h.memo(n=>{const{source:t,rendered:l,pressableHandlers:d,index:u,total:E}=n;return e.jsx(Oe,{accessibilityRole:"image",accessibilityLabel:`image ${u+1} of ${E}`,style:m.slidePressable,...d,children:l?e.jsx(He,{source:t,resizeMode:"contain",style:m.image,accessible:!0,accessibilityRole:"image"}):e.jsx(I,{style:m.imagePlaceholder})})},(n,t)=>n.source===t.source&&n.rendered===t.rendered&&n.pressableHandlers===t.pressableHandlers&&n.index===t.index&&n.total===t.total),Ke=(n,t)=>{const{visible:l,images:d=[],startPosition:u=0,swipeDuration:E=300,tokensOverride:L,lazyRender:C=!1,lazyRenderBuffer:ve=1,showIndex:X=!0,indexRender:B,showIndicators:Y=!1,closeable:je=!1,closeIcon:ye,closeIconPosition:Ce="top-right",closeOnlyClickCloseIcon:A=!1,overlay:Pe=!0,overlayStyle:Ie,closeOnBackPress:we,closeOnPopstate:Ee,zIndex:Re,duration:Fe,safeAreaInsetTop:ze=!0,safeAreaInsetBottom:be=!0,onChange:W,onClose:q,onClosed:ke,beforeClose:U}=n,{colors:g,layout:K,radii:Q,typography:J,spacing:v}=We(L),T=o.useRef(null),Z=o.useRef("close"),R=o.useRef(null),F=o.useRef(!1),p=d.length,[De,z]=o.useState(()=>j(u,p)),P=j(De,p),G=o.useRef({images:d,index:P,beforeClose:U,onClose:q});G.current={images:d,index:P,beforeClose:U,onClose:q};const ee=o.useMemo(()=>d.map(s=>_e(s)?{uri:s}:s),[d]);o.useEffect(()=>{z(s=>j(s,p))},[p]),o.useEffect(()=>{if(!l)return;const s=j(u,p);if(z(s),typeof requestAnimationFrame<"u"){const r=requestAnimationFrame(()=>{T.current?.swipeTo(s,!1)});return()=>cancelAnimationFrame(r)}},[p,u,l]);const b=o.useCallback(async s=>{const{beforeClose:r,images:i,index:a}=G.current;return r?await r({reason:s,index:a,image:i[a]})!==!1:!0},[]),k=o.useCallback(async(s,r=!1)=>{const{onClose:i,images:a,index:x}=G.current;!r&&!await b(s)||i?.({index:x,image:a[x]})},[b]),Le=o.useCallback(async s=>(Z.current=s,b(s)),[b]),Be=o.useCallback(()=>{k(Z.current,!0)},[k]);o.useImperativeHandle(t,()=>({swipeTo:(s,r=!0)=>{const i=j(s,p);z(i),T.current?.swipeTo(i,r)}}),[p]);const ne=o.useRef(W);ne.current=W;const te=o.useRef(P);te.current=P;const Ae=o.useCallback(s=>{te.current!==s&&(z(s),ne.current?.(s))},[]),se=o.useCallback(()=>{A||k("content")},[A,k]),D=o.useCallback(()=>{R.current=null,F.current=!1},[]),M=o.useCallback((s,r)=>{R.current={x:s,y:r},F.current=!1},[]),_=o.useCallback((s,r)=>{const i=R.current;if(!i)return;const a=s-i.x,x=r-i.y;a*a+x*x>=oe&&(F.current=!0)},[]),$=o.useCallback((s,r)=>{const i=R.current,a=F.current;if(D(),!i||a)return;const x=s-i.x,N=r-i.y;x*x+N*N>=oe||se()},[se,D]),Te=o.useMemo(()=>{const s={onTouchStart:r=>{const{pageX:i,pageY:a}=r.nativeEvent;i!=null&&a!=null&&M(i,a)},onTouchMove:r=>{const{pageX:i,pageY:a}=r.nativeEvent;i!=null&&a!=null&&_(i,a)},onTouchEnd:r=>{const{pageX:i,pageY:a}=r.nativeEvent;i!=null&&a!=null&&$(i,a)},onTouchCancel:D};return s.onMouseDown=r=>{const i=r.nativeEvent;i?.pageX!=null&&i?.pageY!=null&&M(i.pageX,i.pageY)},s.onMouseMove=r=>{const i=r.nativeEvent;i?.buttons===1&&i?.pageX!=null&&i?.pageY!=null&&_(i.pageX,i.pageY)},s.onMouseUp=r=>{const i=r.nativeEvent;i?.pageX!=null&&i?.pageY!=null&&$(i.pageX,i.pageY)},s},[_,M,D,$]),S=o.useCallback((s,r)=>{if(!X||r===0)return null;const i=`${s+1} / ${r}`;return e.jsx(I,{style:[m.index,{top:v.indexTop}],testID:"rv-image-preview-index",children:e.jsx(I,{style:[m.indexBadge,{backgroundColor:g.indexBackground,borderRadius:Q.indexBadge,paddingHorizontal:v.indexPaddingHorizontal,paddingVertical:v.indexPaddingVertical}],children:B?B({index:s,len:r}):e.jsx(ce,{style:[m.indexText,{color:g.indexText,fontSize:J.indexTextSize}],children:i})})})},[g.indexBackground,g.indexText,B,Q.indexBadge,X,v.indexPaddingHorizontal,v.indexPaddingVertical,v.indexTop,J.indexTextSize]),Ge=C?Math.max(0,ve|0):0,Me=o.useCallback((s,r)=>e.jsxs(e.Fragment,{children:[S(r,s),Y&&s>1&&e.jsx(V.PagIndicator,{total:s,current:r,activeColor:g.indicatorActive,inactiveColor:g.indicatorInactive,style:qe,testID:"rv-image-preview-indicators"})]}),[g.indicatorActive,g.indicatorInactive,S,Y]);return e.jsx(Ne,{visible:l,overlay:Pe,overlayStyle:Ie,closeOnOverlayPress:!A,closeOnBackPress:we,closeOnPopstate:Ee,zIndex:Re,duration:Fe,closeable:je,closeIcon:ye,closeIconPosition:Ce,stopPropagation:!1,round:!1,safeAreaInsetTop:ze,safeAreaInsetBottom:be,overlayTestID:"rv-image-preview-overlay",style:[m.popup,{backgroundColor:g.transparent,padding:K.popupPadding,borderRadius:K.popupRadius}],beforeClose:Le,onClose:Be,onClosed:ke,children:e.jsxs(I,{style:[m.content,{backgroundColor:g.background}],children:[p===1?S(0,1):null,p===0?e.jsx(I,{style:m.empty,testID:"rv-image-preview-empty"}):e.jsx(V,{ref:T,style:m.swiper,initialSwipe:j(u,p),loop:!1,autoplay:!1,touchable:p>1,indicator:Me,onChange:Ae,testID:"rv-image-preview-swiper",children:ee.map((s,r)=>e.jsx(V.Item,{style:m.slide,testID:`rv-image-preview-slide-${r}`,children:e.jsx(Ue,{source:s,rendered:!C||Math.abs(r-P)<=Ge,pressableHandlers:Te,index:r,total:ee.length})},r))})]})})},ae=h.forwardRef(Ke);ae.displayName="ImagePreview";const ue=h.memo(ae),m=$e.create({popup:{position:"absolute",top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",maxWidth:"100%",maxHeight:"100%"},content:{flex:1},swiper:{flex:1},slide:{justifyContent:"center",alignItems:"center",flex:1},slidePressable:{flex:1,width:"100%",height:"100%",justifyContent:"center",alignItems:"center"},image:{width:"100%",height:"100%"},imagePlaceholder:{width:"100%",height:"100%"},empty:{flex:1},index:{position:"absolute",left:0,right:0,alignItems:"center",zIndex:1},indexBadge:{},indexText:{fontWeight:"500"}}),y=new Set,w=new Map,de=n=>{H.remove(n),y.delete(n),w.delete(n)},O=n=>{const t=w.get(n);if(t){t();return}de(n)},Qe=({id:n,options:t})=>{const[l,d]=o.useState(!0),u=o.useCallback(()=>{d(!1)},[]);o.useEffect(()=>(w.set(n,u),()=>{w.get(n)===u&&w.delete(n)}),[u,n]);const E=o.useCallback(C=>{t.onClose?.(C),d(!1)},[t]),L=o.useCallback(()=>{t.onClosed?.(),de(n)},[n,t]);return e.jsx(ue,{...t,visible:l,onClose:E,onClosed:L})},le={open:(n={})=>{y.forEach(l=>O(l)),y.clear();const t=H.add(null);return y.add(t),H.update(t,e.jsx(Qe,{id:t,options:n})),()=>O(t)},clear:()=>{y.forEach(n=>O(n)),y.clear()}},Je=Object.assign(ue,{Host:Se,open:le.open,clear:le.clear}),f=Je,Ze=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function pe(){return e.jsx(c.Group,{children:e.jsx(c,{title:"预览图片",isLink:!0,onPress:()=>f.open({images:Ze,onChange:n=>console.log(`当前展示第${n+1}张`)})})})}const en=`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`,nn={code:en,sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"基础",identifier:"image-preview-basic",lang:"tsx",meta:{title:"基础"}},tn=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function me(){const n=h.useRef(null),t=l=>{n.current?.(),n.current=f.open({images:tn,...l})};return h.useEffect(()=>()=>{n.current?.(),n.current=null},[]),e.jsxs(c.Group,{title:"配置项",children:[e.jsx(c,{title:"指定初始位置",isLink:!0,onPress:()=>t({startPosition:2})}),e.jsx(c,{title:"展示关闭按钮",isLink:!0,onPress:()=>t({startPosition:2,closeable:!0,closeIcon:e.jsx(ie,{size:18,fill:"#fff",color:"#fff"})})}),e.jsx(c,{title:"只允许点击关闭按钮关闭",isLink:!0,onPress:()=>t({closeable:!0,closeOnlyClickCloseIcon:!0,closeIcon:e.jsx(ie,{size:18,fill:"#fff",color:"#fff"})})}),e.jsx(c,{title:"监听关闭事件",isLink:!0,onPress:()=>t({startPosition:2,onClose:()=>{Xe.info("关闭预览")}})}),e.jsx(c,{title:"展示指示点",isLink:!0,onPress:()=>t({showIndicators:!0,showIndex:!1})})]})}const sn=`import React from 'react'
import { Close } from 'react-native-system-icon'
import { Cell, ImagePreview, Toast } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewConfigDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (options: Parameters<typeof ImagePreview.open>[0]) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({ images, ...options })
  }

  React.useEffect(() => {
    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return (
    <Cell.Group title="配置项">
      <Cell title="指定初始位置" isLink onPress={() => open({ startPosition: 2 })} />
      <Cell
        title="展示关闭按钮"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            closeable: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="只允许点击关闭按钮关闭"
        isLink
        onPress={() =>
          open({
            closeable: true,
            closeOnlyClickCloseIcon: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="监听关闭事件"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            onClose: () => {
              Toast.info('关闭预览')
            },
          })
        }
      />
      <Cell
        title="展示指示点"
        isLink
        onPress={() =>
          open({
            showIndicators: true,
            showIndex: false,
          })
        }
      />
    </Cell.Group>
  )
}
`,rn={code:sn,sources:{_:{tsx:`import React from 'react'
import { Close } from 'react-native-system-icon'
import { Cell, ImagePreview, Toast } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewConfigDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (options: Parameters<typeof ImagePreview.open>[0]) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({ images, ...options })
  }

  React.useEffect(() => {
    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return (
    <Cell.Group title="配置项">
      <Cell title="指定初始位置" isLink onPress={() => open({ startPosition: 2 })} />
      <Cell
        title="展示关闭按钮"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            closeable: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="只允许点击关闭按钮关闭"
        isLink
        onPress={() =>
          open({
            closeable: true,
            closeOnlyClickCloseIcon: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="监听关闭事件"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            onClose: () => {
              Toast.info('关闭预览')
            },
          })
        }
      />
      <Cell
        title="展示指示点"
        isLink
        onPress={() =>
          open({
            showIndicators: true,
            showIndex: false,
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Close } from 'react-native-system-icon'
import { Cell, ImagePreview, Toast } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewConfigDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (options: Parameters<typeof ImagePreview.open>[0]) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({ images, ...options })
  }

  React.useEffect(() => {
    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return (
    <Cell.Group title="配置项">
      <Cell title="指定初始位置" isLink onPress={() => open({ startPosition: 2 })} />
      <Cell
        title="展示关闭按钮"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            closeable: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="只允许点击关闭按钮关闭"
        isLink
        onPress={() =>
          open({
            closeable: true,
            closeOnlyClickCloseIcon: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="监听关闭事件"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            onClose: () => {
              Toast.info('关闭预览')
            },
          })
        }
      />
      <Cell
        title="展示指示点"
        isLink
        onPress={() =>
          open({
            showIndicators: true,
            showIndex: false,
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"配置项",identifier:"image-preview-controls",lang:"tsx",meta:{title:"配置项"}},on=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function ge(){return e.jsx(c.Group,{children:e.jsx(c,{title:"异步关闭（2 秒后自动关闭）",isLink:!0,onPress:()=>{const n=f.open({images:on});setTimeout(()=>n(),2e3)}})})}const ln=`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}
`,cn={code:ln,sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}
`}},title:"异步关闭",identifier:"image-preview-async-close",lang:"tsx",meta:{title:"异步关闭"}},an=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function xe(){const[n,t]=h.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(c.Group,{children:e.jsx(c,{title:"组件调用",isLink:!0,onPress:()=>t(!0)})}),e.jsx(f,{visible:n,onClose:()=>t(!1),images:an,showIndicators:!0,showIndex:!1})]})}const un=`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}
`,dn={code:un,sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}
`}},title:"组件调用",identifier:"image-preview-component",lang:"tsx",meta:{title:"组件调用"}},pn=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function he(){return e.jsx(c.Group,{children:e.jsx(c,{title:"自定义页码",isLink:!0,onPress:()=>f.open({images:pn,showIndex:!0,indexRender:({index:n,len:t})=>e.jsx(ce,{style:{color:"#fff"},children:`${n+1} / ${t}`})})})})}const mn=`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`,gn={code:mn,sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"自定义页码",identifier:"image-preview-custom-index",lang:"tsx",meta:{title:"自定义页码"}},xn=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"];function fe(){const n=h.useRef(null),t=(u=0)=>{n.current?.(),n.current=f.open({images:xn,startPosition:u,showIndicators:!0})},l=()=>{n.current?.(),n.current=null},d=()=>{f.clear(),n.current=null};return e.jsxs(c.Group,{title:"静态调用",children:[e.jsx(c,{title:"打开预览",isLink:!0,onPress:()=>t(0)}),e.jsx(c,{title:"从第二张开始",isLink:!0,onPress:()=>t(1)}),e.jsx(c,{title:"关闭当前",isLink:!0,onPress:l}),e.jsx(c,{title:"清空所有",isLink:!0,onPress:d})]})}const hn=`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`,fn={code:hn,sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},title:"静态调用",identifier:"image-preview-imperative",lang:"tsx",meta:{title:"静态调用"}},vn=function({previewer:n=()=>null,api:t=()=>null}){const l=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"imagepreview-图片预览","data-anchor":"imagepreview-图片预览",children:"ImagePreview 图片预览"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"全屏浏览图片，支持横向滑动切换、页码/指示器展示以及遮罩关闭控制。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(l,{code:"import { ImagePreview } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("div",{children:e.jsx(l,{...nn,children:e.jsx(pe,{})})}),e.jsx("h3",{id:"配置项","data-anchor":"配置项",children:"配置项"}),e.jsx("div",{children:e.jsx(l,{...rn,children:e.jsx(me,{})})}),e.jsx("h3",{id:"异步关闭","data-anchor":"异步关闭",children:"异步关闭"}),e.jsx("div",{children:e.jsx(l,{...cn,children:e.jsx(ge,{})})}),e.jsx("h3",{id:"组件调用","data-anchor":"组件调用",children:"组件调用"}),e.jsx("div",{children:e.jsx(l,{...dn,children:e.jsx(xe,{})})}),e.jsx("h3",{id:"自定义页码","data-anchor":"自定义页码",children:"自定义页码"}),e.jsx("div",{children:e.jsx(l,{...gn,children:e.jsx(he,{})})}),e.jsx("h3",{id:"静态调用","data-anchor":"静态调用",children:"静态调用"}),e.jsx("div",{children:e.jsx(l,{...fn,children:e.jsx(fe,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"visible"})}),e.jsx("td",{children:"是否展示 ImagePreview"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"images"})}),e.jsxs("td",{children:["图片数组，支持字符串 URL 或 ",e.jsx("code",{children:"ImageSourcePropType"})]}),e.jsx("td",{children:e.jsx("code",{children:"(string | ImageSourcePropType)[]"})}),e.jsx("td",{children:e.jsx("code",{children:"[]"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"startPosition"})}),e.jsx("td",{children:"初始展示的图片下标"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeDuration"})}),e.jsx("td",{children:"图片切换动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRender"})}),e.jsx("td",{children:"按需渲染图片（仅渲染当前页附近图片以优化性能）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRenderBuffer"})}),e.jsxs("td",{children:[e.jsx("code",{children:"lazyRender"})," 开启时额外渲染的前后页数量"]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"1"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showIndex"})}),e.jsx("td",{children:"是否展示顶部页码"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"indexRender"})}),e.jsx("td",{children:"自定义页码渲染内容"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," index, len ","}",") => ReactNode"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"showIndicators"})}),e.jsx("td",{children:"是否展示底部指示器"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeable"})}),e.jsx("td",{children:"是否展示关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIcon"})}),e.jsx("td",{children:"自定义关闭图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeIconPosition"})}),e.jsx("td",{children:"关闭图标位置"}),e.jsx("td",{children:e.jsx("code",{children:"'top-left' | 'top-right'"})}),e.jsx("td",{children:e.jsx("code",{children:"'top-right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnlyClickCloseIcon"})}),e.jsx("td",{children:"仅点击关闭图标时才关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlay"})}),e.jsx("td",{children:"是否显示遮罩"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"overlayStyle"})}),e.jsx("td",{children:"遮罩样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnBackPress"})}),e.jsx("td",{children:"Android 返回键是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"closeOnPopstate"})}),e.jsx("td",{children:"Web history 返回时是否关闭"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"zIndex"})}),e.jsx("td",{children:"自定义层级"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"200"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsx("td",{children:"切换图片回调"}),e.jsx("td",{children:e.jsx("code",{children:"(index: number) => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClose"})}),e.jsx("td",{children:"请求关闭时触发"}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," index, image ","}",") => void"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeClose"})}),e.jsxs("td",{children:["关闭前回调，返回 ",e.jsx("code",{children:"false"})," 阻止关闭"]}),e.jsx("td",{children:e.jsxs("code",{children:["(","{"," reason, index, image ","}",") => boolean | Promise<boolean>"]})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClosed"})}),e.jsx("td",{children:"关闭动画完成回调"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})}),e.jsx("td",{children:e.jsx("code",{children:"-"})})]})]})]}),e.jsx("h3",{id:"静态方法","data-anchor":"静态方法",children:"静态方法"}),e.jsxs("p",{children:["当需要在业务逻辑中直接打开预览时，可以使用静态方法。若项目未使用 ",e.jsx("code",{children:"ConfigProvider"}),"（它会自动挂载 ",e.jsx("code",{children:"<ImagePreview.Host />"}),"），记得在应用根部渲染一次 ",e.jsx("code",{children:"<ImagePreview.Host />"}),"，否则静态预览不会出现在界面上。"]}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"方法"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"返回值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ImagePreview.open(options)"})}),e.jsx("td",{children:"打开图片预览"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ImagePreview.clear()"})}),e.jsx("td",{children:"关闭所有通过静态方法创建的预览"}),e.jsx("td",{children:e.jsx("code",{children:"void"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ImagePreview.Host"})}),e.jsx("td",{children:"手动挂载静态预览的渲染容器"}),e.jsx("td",{children:e.jsx("code",{children:"ReactElement"})})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["差异说明：当前版本暂未实现双指缩放/拖拽等高级手势，后续将结合 ",e.jsx("code",{children:"gesture kit"})," 再迭代。"]})})]})})},jn=[{Component:pe,key:"image-preview-basic",sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewBasicDemo() {
  return (
    <Cell.Group>
      <Cell
        title="预览图片"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            onChange: index => console.log(\`当前展示第\${index + 1}张\`),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"基础",identifier:"image-preview-basic",lang:"tsx",meta:{title:"基础"}},{Component:me,key:"image-preview-controls",sources:{_:{tsx:`import React from 'react'
import { Close } from 'react-native-system-icon'
import { Cell, ImagePreview, Toast } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewConfigDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (options: Parameters<typeof ImagePreview.open>[0]) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({ images, ...options })
  }

  React.useEffect(() => {
    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return (
    <Cell.Group title="配置项">
      <Cell title="指定初始位置" isLink onPress={() => open({ startPosition: 2 })} />
      <Cell
        title="展示关闭按钮"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            closeable: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="只允许点击关闭按钮关闭"
        isLink
        onPress={() =>
          open({
            closeable: true,
            closeOnlyClickCloseIcon: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="监听关闭事件"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            onClose: () => {
              Toast.info('关闭预览')
            },
          })
        }
      />
      <Cell
        title="展示指示点"
        isLink
        onPress={() =>
          open({
            showIndicators: true,
            showIndex: false,
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Close } from 'react-native-system-icon'
import { Cell, ImagePreview, Toast } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewConfigDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (options: Parameters<typeof ImagePreview.open>[0]) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({ images, ...options })
  }

  React.useEffect(() => {
    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return (
    <Cell.Group title="配置项">
      <Cell title="指定初始位置" isLink onPress={() => open({ startPosition: 2 })} />
      <Cell
        title="展示关闭按钮"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            closeable: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="只允许点击关闭按钮关闭"
        isLink
        onPress={() =>
          open({
            closeable: true,
            closeOnlyClickCloseIcon: true,
            closeIcon: <Close size={18} fill="#fff" color="#fff" />,
          })
        }
      />
      <Cell
        title="监听关闭事件"
        isLink
        onPress={() =>
          open({
            startPosition: 2,
            onClose: () => {
              Toast.info('关闭预览')
            },
          })
        }
      />
      <Cell
        title="展示指示点"
        isLink
        onPress={() =>
          open({
            showIndicators: true,
            showIndex: false,
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"配置项",identifier:"image-preview-controls",lang:"tsx",meta:{title:"配置项"}},{Component:ge,key:"image-preview-async-close",sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewAsyncCloseDemo() {
  return (
    <Cell.Group>
      <Cell
        title="异步关闭（2 秒后自动关闭）"
        isLink
        onPress={() => {
          const destroy = ImagePreview.open({ images })
          setTimeout(() => destroy(), 2000)
        }}
      />
    </Cell.Group>
  )
}
`}},title:"异步关闭",identifier:"image-preview-async-close",lang:"tsx",meta:{title:"异步关闭"}},{Component:xe,key:"image-preview-component",sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewComponentDemo() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Cell.Group>
        <Cell title="组件调用" isLink onPress={() => setVisible(true)} />
      </Cell.Group>
      <ImagePreview
        visible={visible}
        onClose={() => setVisible(false)}
        images={images}
        showIndicators
        showIndex={false}
      />
    </>
  )
}
`}},title:"组件调用",identifier:"image-preview-component",lang:"tsx",meta:{title:"组件调用"}},{Component:he,key:"image-preview-custom-index",sources:{_:{tsx:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:"0.83.1"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Cell, ImagePreview } from 'react-native-system-ui'
import { Text } from 'react-native'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewCustomIndexDemo() {
  return (
    <Cell.Group>
      <Cell
        title="自定义页码"
        isLink
        onPress={() =>
          ImagePreview.open({
            images,
            showIndex: true,
            indexRender: ({ index, len }) => (
              <Text style={{ color: '#fff' }}>{\`\${index + 1} / \${len}\`}</Text>
            ),
          })
        }
      />
    </Cell.Group>
  )
}
`}},title:"自定义页码",identifier:"image-preview-custom-index",lang:"tsx",meta:{title:"自定义页码"}},{Component:fe,key:"image-preview-imperative",sources:{_:{tsx:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, ImagePreview } from 'react-native-system-ui'

const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
]

export default function ImagePreviewImperativeDemo() {
  const destroyRef = React.useRef<null | (() => void)>(null)

  const open = (startPosition = 0) => {
    destroyRef.current?.()
    destroyRef.current = ImagePreview.open({
      images,
      startPosition,
      showIndicators: true,
    })
  }

  const close = () => {
    destroyRef.current?.()
    destroyRef.current = null
  }

  const clear = () => {
    ImagePreview.clear()
    destroyRef.current = null
  }

  return (
    <Cell.Group title="静态调用">
      <Cell title="打开预览" isLink onPress={() => open(0)} />
      <Cell title="从第二张开始" isLink onPress={() => open(1)} />
      <Cell title="关闭当前" isLink onPress={close} />
      <Cell title="清空所有" isLink onPress={clear} />
    </Cell.Group>
  )
}
`}},title:"静态调用",identifier:"image-preview-imperative",lang:"tsx",meta:{title:"静态调用"}}],yn={simulator:{compact:!0}},Cn=[{depth:1,text:"ImagePreview 图片预览",id:"imagepreview-图片预览"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"配置项",id:"配置项"},{depth:3,text:"异步关闭",id:"异步关闭"},{depth:3,text:"组件调用",id:"组件调用"},{depth:3,text:"自定义页码",id:"自定义页码"},{depth:3,text:"静态调用",id:"静态调用"},{depth:2,text:"API",id:"api"},{depth:3,text:"静态方法",id:"静态方法"}],Pn="/docs/components/image-preview.md",In="ImagePreview 图片预览",wn="1766649452000",et=n=>n.children({MdContent:vn,demos:jn,frontmatter:yn,slugs:Cn,filePath:Pn,title:In,updatedTime:wn});export{vn as MdContent,et as default,jn as demos,Pn as filePath,yn as frontmatter,Cn as slugs,In as title,wn as updatedTime};
