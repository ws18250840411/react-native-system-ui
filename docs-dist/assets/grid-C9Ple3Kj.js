import{j as e}from"./main-BuQiU471.js";import{S as c}from"./ShopO-DefZK97_.js";import{G as r}from"./index-6G3pFiFn.js";import{I as s}from"./Image-C7En2glh.js";import{S as x}from"./HomeO-B_AV1xpZ.js";import{S as j}from"./Search-BiBiRWIm.js";import"./IconBase-CrFgzAiS.js";import"./createComponentTokensHook-BZh_OSSd.js";import"./hairline-MnVzd1gq.js";import"./Badge-DJK4MxrJ.js";import"./number-DwcHNqSr.js";import"./index-BRfylSA6.js";import"./extends-CF3RwP-h.js";import"./index-Ct6-Nt5P.js";import"./index-BAZkLH96.js";import"./index-CA-bMxjH.js";const d=()=>e.jsxs(r,{children:[e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"}),e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"}),e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"}),e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"})]}),f=`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`,v={code:f,sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},title:"基础用法",identifier:"grid-base",lang:"tsx",meta:{title:"基础用法"}},l=()=>e.jsx(r,{columnNum:3,children:Array.from({length:6},(i,t)=>e.jsx(r.Item,{icon:(o,n)=>e.jsx(c,{size:o,fill:n,color:n}),text:"文字"},t))}),y=`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`,G={code:y,sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},title:"自定义列数",identifier:"grid-column",lang:"tsx",meta:{title:"自定义列数"}},u=()=>e.jsxs(r,{border:!1,columnNum:3,children:[e.jsx(r.Item,{children:e.jsx(s,{src:"https://img.yzcdn.cn/vant/apple-1.jpg",width:84,height:70})}),e.jsx(r.Item,{children:e.jsx(s,{src:"https://img.yzcdn.cn/vant/apple-2.jpg",width:84,height:70})}),e.jsx(r.Item,{children:e.jsx(s,{src:"https://img.yzcdn.cn/vant/apple-3.jpg",width:84,height:70})})]}),z=`import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default () => (
  <Grid border={false} columnNum={3}>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" width={84} height={70} />
    </Grid.Item>
  </Grid>
)
`,g={code:z,sources:{_:{tsx:`import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default () => (
  <Grid border={false} columnNum={3}>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" width={84} height={70} />
    </Grid.Item>
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default () => (
  <Grid border={false} columnNum={3}>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" width={84} height={70} />
    </Grid.Item>
  </Grid>
)
`}},title:"自定义内容",identifier:"grid-custom",lang:"tsx",meta:{title:"自定义内容"}},a=()=>e.jsx(r,{square:!0,children:Array.from({length:8},(i,t)=>e.jsx(r.Item,{icon:(o,n)=>e.jsx(c,{size:o,fill:n,color:n}),text:"文字"},t))}),F=`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid square>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`,I={code:F,sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid square>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid square>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},title:"正方形格子",identifier:"grid-square",lang:"tsx",meta:{title:"正方形格子"}},m=()=>e.jsx(r,{gutter:10,children:Array.from({length:8},(i,t)=>e.jsx(r.Item,{icon:(o,n)=>e.jsx(c,{size:o,fill:n,color:n}),text:"文字"},t))}),E=`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid gutter={10}>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`,B={code:E,sources:{_:{tsx:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid gutter={10}>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid gutter={10}>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},title:"格子间距",identifier:"grid-gutter",lang:"tsx",meta:{title:"格子间距"}},h=()=>e.jsxs(r,{direction:"horizontal",columnNum:3,children:[e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"}),e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"}),e.jsx(r.Item,{icon:(i,t)=>e.jsx(c,{size:i,fill:t,color:t}),text:"文字"})]}),C=`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`,A={code:C,sources:{_:{tsx:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},title:"内容横排",identifier:"grid-direction",lang:"tsx",meta:{title:"内容横排"}},p=()=>e.jsxs(r,{columnNum:2,children:[e.jsx(r.Item,{icon:(i,t)=>e.jsx(x,{size:i,fill:t,color:t}),text:"文字",badge:{dot:!0}}),e.jsx(r.Item,{icon:(i,t)=>e.jsx(j,{size:i,fill:t,color:t}),text:"文字",badge:{content:"99+"}})]}),S=`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { HomeO, Search } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={2}>
    <Grid.Item icon={(size, color) => <HomeO size={size} fill={color} color={color} />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={(size, color) => <Search size={size} fill={color} color={color} />} text="文字" badge={{ content: '99+' }} />
  </Grid>
)
`,O={code:S,sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { HomeO, Search } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={2}>
    <Grid.Item icon={(size, color) => <HomeO size={size} fill={color} color={color} />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={(size, color) => <Search size={size} fill={color} color={color} />} text="文字" badge={{ content: '99+' }} />
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { HomeO, Search } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={2}>
    <Grid.Item icon={(size, color) => <HomeO size={size} fill={color} color={color} />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={(size, color) => <Search size={size} fill={color} color={color} />} text="文字" badge={{ content: '99+' }} />
  </Grid>
)
`}},title:"徽标提示",identifier:"grid-badge",lang:"tsx",meta:{title:"徽标提示"}},N=function({previewer:i=()=>null,api:t=()=>null}){const o=i;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"grid-宫格","data-anchor":"grid-宫格",children:"Grid 宫格"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Grid } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"icon"})," 属性设置格子内的图标，",e.jsx("code",{children:"text"})," 属性设置文字内容。"]}),e.jsx("div",{children:e.jsx(o,{...v,children:e.jsx(d,{})})}),e.jsx("h3",{id:"自定义列数","data-anchor":"自定义列数",children:"自定义列数"}),e.jsxs("p",{children:["默认一行展示四个格子，可以通过 ",e.jsx("code",{children:"columnNum"})," 自定义列数。"]}),e.jsx("div",{children:e.jsx(o,{...G,children:e.jsx(l,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsx("p",{children:"通过插槽可以自定义格子展示的内容。"}),e.jsx("div",{children:e.jsx(o,{...g,children:e.jsx(u,{})})}),e.jsx("h3",{id:"正方形格子","data-anchor":"正方形格子",children:"正方形格子"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"square"})," 属性后，格子的高度会和宽度保持一致。"]}),e.jsx("div",{children:e.jsx(o,{...I,children:e.jsx(a,{})})}),e.jsx("h3",{id:"格子间距","data-anchor":"格子间距",children:"格子间距"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"gutter"})," 属性设置格子之间的距离。"]}),e.jsx("div",{children:e.jsx(o,{...B,children:e.jsx(m,{})})}),e.jsx("blockquote",{children:e.jsxs("p",{children:["Web 端对齐 Gluestack Grid：容器使用 CSS grid 布局，",e.jsx("code",{children:"gutter"})," 会映射为 ",e.jsx("code",{children:"rowGap/columnGap"}),"。"]})}),e.jsx("h3",{id:"内容横排","data-anchor":"内容横排",children:"内容横排"}),e.jsxs("p",{children:["将 ",e.jsx("code",{children:"direction"})," 属性设置为 ",e.jsx("code",{children:"horizontal"}),"，可以让宫格的内容呈横向排列。"]}),e.jsx("div",{children:e.jsx(o,{...A,children:e.jsx(h,{})})}),e.jsx("h3",{id:"徽标提示","data-anchor":"徽标提示",children:"徽标提示"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"dot"})," 属性后，会在图标右上角展示一个小红点。设置 ",e.jsx("code",{children:"badge"})," 属性后，会在图标右上角展示相应的徽标。"]}),e.jsx("div",{children:e.jsx(o,{...O,children:e.jsx(p,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"grid-props","data-anchor":"grid-props",children:"Grid Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columnNum"})}),e.jsx("td",{children:"列数"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"4"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconSize"})}),e.jsx("td",{children:"图标大小"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"28"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gutter"})}),e.jsxs("td",{children:["格子之间的间距，默认单位为",e.jsx("code",{children:"px"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"center"})}),e.jsx("td",{children:"是否将格子内容居中显示"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"square"})}),e.jsx("td",{children:"是否将格子固定为正方形"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsx("td",{children:"格子内容排列的方向"}),e.jsx("td",{children:e.jsx("code",{children:"'horizontal' | 'vertical'"})}),e.jsx("td",{children:e.jsx("code",{children:"'vertical'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"reverse"})}),e.jsx("td",{children:"是否调换图标和文本的位置"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clickable"})}),e.jsx("td",{children:"是否开启整组可点击态"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconColor"})}),e.jsx("td",{children:"图标颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"griditem-props","data-anchor":"griditem-props",children:"GridItem Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"参数"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text"})}),e.jsx("td",{children:"文字"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode | ((size: number, color: string) => ReactNode)"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"iconColor"})}),e.jsxs("td",{children:["图标颜色，等同于 Icon 组件的 ",e.jsx("a",{href:"/components/icon#props",children:"color 属性"})]}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"badge"})}),e.jsx("td",{children:"图标右上角徽标的内容"}),e.jsx("td",{children:e.jsx("code",{children:"BadgeProps"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"dot"})}),e.jsx("td",{children:"是否展示小红点"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsx("td",{children:"内容容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"textStyle"})}),e.jsx("td",{children:"文本样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"children"})}),e.jsxs("td",{children:["自定义格子内容，存在时会覆盖 ",e.jsx("code",{children:"icon/text"})]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["其余 ",e.jsx("code",{children:"Pressable"})," props"]}),e.jsxs("td",{children:["在 ",e.jsx("code",{children:"clickable"})," 或传入 ",e.jsx("code",{children:"onPress"})," 时生效"]}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"griditem-events","data-anchor":"griditem-events",children:"GridItem Events"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsx("td",{children:"点击格子时触发"}),e.jsx("td",{children:e.jsx("code",{children:"() => void"})})]})})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["React Native 不支持 web 端的路由 ",e.jsx("code",{children:"to/replace"}),"，如需跳转请结合 React Navigation、Expo Router 等导航库。"]})})]})})},P=[{Component:d,key:"grid-base",sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},title:"基础用法",identifier:"grid-base",lang:"tsx",meta:{title:"基础用法"}},{Component:l,key:"grid-column",sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},title:"自定义列数",identifier:"grid-column",lang:"tsx",meta:{title:"自定义列数"}},{Component:u,key:"grid-custom",sources:{_:{tsx:`import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default () => (
  <Grid border={false} columnNum={3}>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" width={84} height={70} />
    </Grid.Item>
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid, Image } from 'react-native-system-ui'

export default () => (
  <Grid border={false} columnNum={3}>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" width={84} height={70} />
    </Grid.Item>
    <Grid.Item>
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg" width={84} height={70} />
    </Grid.Item>
  </Grid>
)
`}},title:"自定义内容",identifier:"grid-custom",lang:"tsx",meta:{title:"自定义内容"}},{Component:a,key:"grid-square",sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid square>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid square>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},title:"正方形格子",identifier:"grid-square",lang:"tsx",meta:{title:"正方形格子"}},{Component:m,key:"grid-gutter",sources:{_:{tsx:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid gutter={10}>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid gutter={10}>
    {Array.from({ length: 8 }, (_, i) => (
      <Grid.Item key={i} icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    ))}
  </Grid>
)
`}},title:"格子间距",identifier:"grid-gutter",lang:"tsx",meta:{title:"格子间距"}},{Component:h,key:"grid-direction",sources:{_:{tsx:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Grid } from 'react-native-system-ui'
import { ShopO } from 'react-native-system-icon'

export default () => (
  <Grid direction="horizontal" columnNum={3}>
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
    <Grid.Item icon={(size, color) => <ShopO size={size} fill={color} color={color} />} text="文字" />
  </Grid>
)
`}},title:"内容横排",identifier:"grid-direction",lang:"tsx",meta:{title:"内容横排"}},{Component:p,key:"grid-badge",sources:{_:{tsx:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { HomeO, Search } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={2}>
    <Grid.Item icon={(size, color) => <HomeO size={size} fill={color} color={color} />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={(size, color) => <Search size={size} fill={color} color={color} />} text="文字" badge={{ content: '99+' }} />
  </Grid>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Grid } from 'react-native-system-ui'
import { HomeO, Search } from 'react-native-system-icon'

export default () => (
  <Grid columnNum={2}>
    <Grid.Item icon={(size, color) => <HomeO size={size} fill={color} color={color} />} text="文字" badge={{ dot: true }} />
    <Grid.Item icon={(size, color) => <Search size={size} fill={color} color={color} />} text="文字" badge={{ content: '99+' }} />
  </Grid>
)
`}},title:"徽标提示",identifier:"grid-badge",lang:"tsx",meta:{title:"徽标提示"}}],_={simulator:{compact:!0}},M=[{depth:1,text:"Grid 宫格",id:"grid-宫格"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"自定义列数",id:"自定义列数"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:3,text:"正方形格子",id:"正方形格子"},{depth:3,text:"格子间距",id:"格子间距"},{depth:3,text:"内容横排",id:"内容横排"},{depth:3,text:"徽标提示",id:"徽标提示"},{depth:2,text:"API",id:"api"},{depth:3,text:"Grid Props",id:"grid-props"},{depth:3,text:"GridItem Props",id:"griditem-props"},{depth:3,text:"GridItem Events",id:"griditem-events"}],D="/docs/components/grid.md",b="Grid 宫格",R="1770189574000",ee=i=>i.children({MdContent:N,demos:P,frontmatter:_,slugs:M,filePath:D,title:b,updatedTime:R});export{N as MdContent,ee as default,P as demos,D as filePath,_ as frontmatter,M as slugs,b as title,R as updatedTime};
