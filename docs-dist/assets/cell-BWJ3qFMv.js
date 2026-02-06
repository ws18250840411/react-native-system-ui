import{j as e}from"./main-BXb8DOxl.js";import{C as t}from"./index-BSmhLq_l.js";import{I as h}from"./Image-BkUMp8ay.js";import{S as C,a as j}from"./LocationO-DPc8b6Qg.js";import{S as v}from"./ShopO-BVnG-yMv.js";import{T as F}from"./createComponentTokensHook-C7GS3cUR.js";import"./Arrow-D1qxk6Xz.js";import"./IconBase-5wkEN6D1.js";import"./hairline-BrrexFH9.js";import"./index-DkTYenKX.js";import"./extends-CF3RwP-h.js";import"./useAriaPress-6bm6-278.js";import"./index-CJrLMJTa.js";import"./index-BPY4IQIH.js";import"./index-CysvSvJu.js";import"./index-9yrhdMQu.js";const i=()=>e.jsxs(t.Group,{children:[e.jsx(t,{title:"单元格",value:"内容"}),e.jsx(t,{title:"单元格",value:"内容",label:"描述信息"})]}),f=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" label="描述信息" />
  </Cell.Group>
)
`,E={code:f,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" label="描述信息" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" label="描述信息" />
  </Cell.Group>
)
`}},title:"基础用法",identifier:"cell-base",lang:"tsx",meta:{title:"基础用法"}},n=()=>e.jsx(t.Group,{children:Array.from({length:4}).map((r,u)=>e.jsx(t,{center:!0,title:`Avatar ${u}`,label:"Deserunt dolor",icon:e.jsx(h,{src:"https://img.yzcdn.cn/vant/apple-1.jpg",width:44,height:44,round:!0}),isLink:!0},u))}),y=`import React from 'react'

import { Cell, Image } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    {Array.from({ length: 4 }).map((_, idx) => (
      <Cell
        key={idx}
        center
        title={\`Avatar \${idx}\`}
        label="Deserunt dolor"
        icon={
          <Image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width={44}
            height={44}
            round
          />
        }
        isLink
      />
    ))}
  </Cell.Group>
)
`,G={code:y,sources:{_:{tsx:`import React from 'react'

import { Cell, Image } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    {Array.from({ length: 4 }).map((_, idx) => (
      <Cell
        key={idx}
        center
        title={\`Avatar \${idx}\`}
        label="Deserunt dolor"
        icon={
          <Image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width={44}
            height={44}
            round
          />
        }
        isLink
      />
    ))}
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Image } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    {Array.from({ length: 4 }).map((_, idx) => (
      <Cell
        key={idx}
        center
        title={\`Avatar \${idx}\`}
        label="Deserunt dolor"
        icon={
          <Image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width={44}
            height={44}
            round
          />
        }
        isLink
      />
    ))}
  </Cell.Group>
)
`}},title:"用户列表",identifier:"cell-list",lang:"tsx",meta:{title:"用户列表"}},c=()=>e.jsxs(t.Group,{children:[e.jsx(t,{title:"单元格",value:"内容",size:"large"}),e.jsx(t,{title:"单元格",value:"内容",label:"描述信息",size:"large"})]}),B=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" size="large" />
    <Cell title="单元格" value="内容" label="描述信息" size="large" />
  </Cell.Group>
)
`,A={code:B,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" size="large" />
    <Cell title="单元格" value="内容" label="描述信息" size="large" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" size="large" />
    <Cell title="单元格" value="内容" label="描述信息" size="large" />
  </Cell.Group>
)
`}},title:"单元格大小",identifier:"cell-size",lang:"tsx",meta:{title:"单元格大小"}},o=()=>e.jsxs(t.Group,{children:[e.jsx(t,{title:"单元格",icon:e.jsx(C,{})}),e.jsx(t,{title:"单元格",icon:e.jsx(j,{})})]}),g=`import React from 'react'

import { FireO, LocationO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<LocationO />} />
    <Cell title="单元格" icon={<FireO />} />
  </Cell.Group>
)
`,P={code:g,sources:{_:{tsx:`import React from 'react'

import { FireO, LocationO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<LocationO />} />
    <Cell title="单元格" icon={<FireO />} />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { FireO, LocationO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<LocationO />} />
    <Cell title="单元格" icon={<FireO />} />
  </Cell.Group>
)
`}},title:"展示图标",identifier:"cell-icon",lang:"tsx",meta:{title:"展示图标"}},s=()=>e.jsx(t.Group,{children:e.jsx(t,{value:"内容"})}),_=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell value="内容" /></Cell.Group>
`,D={code:_,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell value="内容" /></Cell.Group>
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell value="内容" /></Cell.Group>
`}},title:"只设置 value",identifier:"cell-value",lang:"tsx",meta:{title:"只设置 value"}},a=()=>e.jsxs(t.Group,{children:[e.jsx(t,{title:"单元格",isLink:!0}),e.jsx(t,{title:"单元格",isLink:!0,value:"内容"}),e.jsx(t,{title:"单元格",isLink:!0,arrowDirection:"down",value:"内容"})]}),R=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" isLink />
    <Cell title="单元格" isLink value="内容" />
    <Cell title="单元格" isLink arrowDirection="down" value="内容" />
  </Cell.Group>
)
`,M={code:R,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" isLink />
    <Cell title="单元格" isLink value="内容" />
    <Cell title="单元格" isLink arrowDirection="down" value="内容" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" isLink />
    <Cell title="单元格" isLink value="内容" />
    <Cell title="单元格" isLink arrowDirection="down" value="内容" />
  </Cell.Group>
)
`}},title:"展示箭头",identifier:"cell-arrow",lang:"tsx",meta:{title:"展示箭头"}},d=()=>e.jsxs(e.Fragment,{children:[e.jsx(t.Group,{title:"分组1",children:e.jsx(t,{title:"单元格",value:"内容"})}),e.jsx(t.Group,{title:"分组2",children:e.jsx(t,{title:"单元格",value:"内容"})})]}),N=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <>
    <Cell.Group title="分组1">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
    <Cell.Group title="分组2">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
  </>
)
`,L={code:N,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <>
    <Cell.Group title="分组1">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
    <Cell.Group title="分组2">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
  </>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <>
    <Cell.Group title="分组1">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
    <Cell.Group title="分组2">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
  </>
)
`}},title:"分组标题",identifier:"cell-group",lang:"tsx",meta:{title:"分组标题"}},p=()=>e.jsxs(t.Group,{card:!0,children:[e.jsx(t,{title:"单元格",value:"内容"}),e.jsx(t,{title:"单元格",value:"内容"})]}),b=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group card>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" />
  </Cell.Group>
)
`,k={code:b,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group card>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group card>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" />
  </Cell.Group>
)
`}},title:"卡片类型",identifier:"cell-card",lang:"tsx",meta:{title:"卡片类型"}},x=()=>e.jsx(t.Group,{children:e.jsx(t,{title:"单元格",icon:e.jsx(v,{}),children:e.jsx(F,{children:"自定义内容"})})}),w=`import React from 'react'
import { Text } from 'react-native'

import { ShopO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<ShopO />}>
      <Text>自定义内容</Text>
    </Cell>
  </Cell.Group>
)
`,I={code:w,sources:{_:{tsx:`import React from 'react'
import { Text } from 'react-native'

import { ShopO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<ShopO />}>
      <Text>自定义内容</Text>
    </Cell>
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Text } from 'react-native'

import { ShopO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<ShopO />}>
      <Text>自定义内容</Text>
    </Cell>
  </Cell.Group>
)
`}},title:"自定义内容",identifier:"cell-children",lang:"tsx",meta:{title:"自定义内容"}},m=()=>e.jsx(t.Group,{children:e.jsx(t,{center:!0,title:"单元格",value:"内容",label:"描述信息"})}),O=`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell center title="单元格" value="内容" label="描述信息" /></Cell.Group>
`,S={code:O,sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell center title="单元格" value="内容" label="描述信息" /></Cell.Group>
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell center title="单元格" value="内容" label="描述信息" /></Cell.Group>
`}},title:"垂直居中",identifier:"cell-vertical",lang:"tsx",meta:{title:"垂直居中"}},$=function({previewer:r=()=>null,api:u=()=>null}){const l=r;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"cell-单元格","data-anchor":"cell-单元格",children:"Cell 单元格"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"单元格为列表中的单个展示项。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(l,{code:"import { Cell } from 'react-native-system-ui'",lang:"js"}),e.jsx("blockquote",{children:e.jsxs("p",{children:[e.jsx("code",{children:"Cell"})," 底层基于 ",e.jsx("code",{children:"Pressable"})," 封装，除本文列出的属性外，也可透传 ",e.jsx("code",{children:"onPress"})," 等交互事件。"]})}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:[e.jsx("code",{children:"Cell"})," 可以单独使用，也可以与 ",e.jsx("code",{children:"Cell.Group"})," 搭配使用，",e.jsx("code",{children:"Cell.Group"})," 可以为 ",e.jsx("code",{children:"Cell"})," 提供上下外边框。"]}),e.jsx("div",{children:e.jsx(l,{...E,children:e.jsx(i,{})})}),e.jsx("h3",{id:"用户列表","data-anchor":"用户列表",children:"用户列表"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"icon"})," 属性可以自定义左侧内容。"]}),e.jsx("div",{children:e.jsx(l,{...G,children:e.jsx(n,{})})}),e.jsx("h3",{id:"单元格大小","data-anchor":"单元格大小",children:"单元格大小"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"size"})," 属性可以控制单元格的大小。"]}),e.jsx("div",{children:e.jsx(l,{...A,children:e.jsx(c,{})})}),e.jsx("h3",{id:"展示图标","data-anchor":"展示图标",children:"展示图标"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"icon"})," 属性在标题左侧展示图标。"]}),e.jsx("div",{children:e.jsx(l,{...P,children:e.jsx(o,{})})}),e.jsx("h3",{id:"只设置-value","data-anchor":"只设置-value",children:"只设置 value"}),e.jsxs("p",{children:["只设置 ",e.jsx("code",{children:"value"})," 时，内容会靠左对齐。"]}),e.jsx("div",{children:e.jsx(l,{...D,children:e.jsx(s,{})})}),e.jsx("h3",{id:"展示箭头","data-anchor":"展示箭头",children:"展示箭头"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"isLink"})," 属性后会在单元格右侧显示箭头，并且可以通过 ",e.jsx("code",{children:"arrowDirection"})," 属性控制箭头方向。"]}),e.jsx("div",{children:e.jsx(l,{...M,children:e.jsx(a,{})})}),e.jsx("h3",{id:"分组标题","data-anchor":"分组标题",children:"分组标题"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"Cell.Group"})," 的 ",e.jsx("code",{children:"title"})," 属性可以指定分组标题。"]}),e.jsx("div",{children:e.jsx(l,{...L,children:e.jsx(d,{})})}),e.jsx("h3",{id:"卡片类型","data-anchor":"卡片类型",children:"卡片类型"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"Cell.Group"})," 的 ",e.jsx("code",{children:"card"})," 属性可以展示卡片类型。"]}),e.jsx("div",{children:e.jsx(l,{...k,children:e.jsx(p,{})})}),e.jsx("h3",{id:"自定义内容","data-anchor":"自定义内容",children:"自定义内容"}),e.jsxs("p",{children:["可使用 ",e.jsx("code",{children:"children"})," 自定义右侧内容。"]}),e.jsx("div",{children:e.jsx(l,{...I,children:e.jsx(x,{})})}),e.jsx("h3",{id:"垂直居中","data-anchor":"垂直居中",children:"垂直居中"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"center"})," 属性可以让 ",e.jsx("code",{children:"Cell"})," 的左右内容都垂直居中。"]}),e.jsx("div",{children:e.jsx(l,{...S,children:e.jsx(m,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"cellgroup-props","data-anchor":"cellgroup-props",children:"CellGroup Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"分组标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示外边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"inset"})}),e.jsx("td",{children:"是否展示为圆角卡片风格"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"card"})}),e.jsx("td",{children:"卡片风格（圆角 + 阴影）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"cell-props","data-anchor":"cell-props",children:"Cell Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"左侧标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"value"})}),e.jsxs("td",{children:["右侧内容，支持字符串、数字或任意 ",e.jsx("code",{children:"ReactNode"}),"（节点会根据布局自动向左/右对齐）"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"label"})}),e.jsx("td",{children:"标题下方的描述信息"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"extra"})}),e.jsx("td",{children:"自定义单元格最右侧的额外内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"size"})}),e.jsx("td",{children:"单元格大小"}),e.jsx("td",{children:e.jsx("code",{children:"'normal' | 'large'"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"icon"})}),e.jsx("td",{children:"左侧图标"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"rightIcon"})}),e.jsxs("td",{children:["自定义右侧图标，默认在 ",e.jsx("code",{children:"isLink"})," 或 ",e.jsx("code",{children:"clickable"})," 时展示 ",e.jsx("code",{children:"Arrow"})]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示内边框"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"clickable"})}),e.jsx("td",{children:"是否开启点击反馈"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"isLink"})}),e.jsx("td",{children:"是否展示右侧箭头并开启点击反馈"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"required"})}),e.jsx("td",{children:"是否显示表单必填星号"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"center"})}),e.jsx("td",{children:"是否使内容垂直居中"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"arrowDirection"})}),e.jsx("td",{children:"箭头方向"}),e.jsx("td",{children:e.jsx("code",{children:"'left' | 'right' | 'up' | 'down'"})}),e.jsx("td",{children:e.jsx("code",{children:"'right'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleStyle"})}),e.jsx("td",{children:"标题样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"valueStyle"})}),e.jsx("td",{children:"右侧内容样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"labelStyle"})}),e.jsx("td",{children:"描述信息样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsxs("td",{children:["自定义 ",e.jsx("code",{children:"children"})," 容器样式"]}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"事件","data-anchor":"事件",children:"事件"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"事件名"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"回调参数"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onPress"})}),e.jsx("td",{children:"点击单元格（未禁用）时触发"}),e.jsx("td",{children:e.jsx("code",{children:"PressableProps['onPress']"})})]})})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["React Native 环境不支持路由 ",e.jsx("code",{children:"replace"})," 等 DOM 能力，因此 ",e.jsx("code",{children:"replace"}),"、",e.jsx("code",{children:"to"})," 等属性未实现，如需跳转请结合 React Navigation / Expo Router 使用。"]})}),e.jsx("h2",{id:"差异说明","data-anchor":"差异说明",children:"差异说明"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["React Vant 提供 ",e.jsx("code",{children:"titleClass/valueClass/labelClass"})," 等 className 能力；本库在 React Native 环境以 ",e.jsx("code",{children:"titleStyle/valueStyle/labelStyle"})," 等样式 props 作为替代。"]}),e.jsxs("li",{children:["React Vant 的点击事件为 ",e.jsx("code",{children:"onClick"}),"；本库使用 ",e.jsx("code",{children:"onPress"}),"（基于 ",e.jsx("code",{children:"Pressable"}),"）。"]})]})]})})},z=[{Component:i,key:"cell-base",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" label="描述信息" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" label="描述信息" />
  </Cell.Group>
)
`}},title:"基础用法",identifier:"cell-base",lang:"tsx",meta:{title:"基础用法"}},{Component:n,key:"cell-list",sources:{_:{tsx:`import React from 'react'

import { Cell, Image } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    {Array.from({ length: 4 }).map((_, idx) => (
      <Cell
        key={idx}
        center
        title={\`Avatar \${idx}\`}
        label="Deserunt dolor"
        icon={
          <Image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width={44}
            height={44}
            round
          />
        }
        isLink
      />
    ))}
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell, Image } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    {Array.from({ length: 4 }).map((_, idx) => (
      <Cell
        key={idx}
        center
        title={\`Avatar \${idx}\`}
        label="Deserunt dolor"
        icon={
          <Image
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width={44}
            height={44}
            round
          />
        }
        isLink
      />
    ))}
  </Cell.Group>
)
`}},title:"用户列表",identifier:"cell-list",lang:"tsx",meta:{title:"用户列表"}},{Component:c,key:"cell-size",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" size="large" />
    <Cell title="单元格" value="内容" label="描述信息" size="large" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" value="内容" size="large" />
    <Cell title="单元格" value="内容" label="描述信息" size="large" />
  </Cell.Group>
)
`}},title:"单元格大小",identifier:"cell-size",lang:"tsx",meta:{title:"单元格大小"}},{Component:o,key:"cell-icon",sources:{_:{tsx:`import React from 'react'

import { FireO, LocationO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<LocationO />} />
    <Cell title="单元格" icon={<FireO />} />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"react-native":{type:"NPM",value:">=0.72.0"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { FireO, LocationO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<LocationO />} />
    <Cell title="单元格" icon={<FireO />} />
  </Cell.Group>
)
`}},title:"展示图标",identifier:"cell-icon",lang:"tsx",meta:{title:"展示图标"}},{Component:s,key:"cell-value",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell value="内容" /></Cell.Group>
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell value="内容" /></Cell.Group>
`}},title:"只设置 value",identifier:"cell-value",lang:"tsx",meta:{title:"只设置 value"}},{Component:a,key:"cell-arrow",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" isLink />
    <Cell title="单元格" isLink value="内容" />
    <Cell title="单元格" isLink arrowDirection="down" value="内容" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" isLink />
    <Cell title="单元格" isLink value="内容" />
    <Cell title="单元格" isLink arrowDirection="down" value="内容" />
  </Cell.Group>
)
`}},title:"展示箭头",identifier:"cell-arrow",lang:"tsx",meta:{title:"展示箭头"}},{Component:d,key:"cell-group",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <>
    <Cell.Group title="分组1">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
    <Cell.Group title="分组2">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
  </>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <>
    <Cell.Group title="分组1">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
    <Cell.Group title="分组2">
      <Cell title="单元格" value="内容" />
    </Cell.Group>
  </>
)
`}},title:"分组标题",identifier:"cell-group",lang:"tsx",meta:{title:"分组标题"}},{Component:p,key:"cell-card",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group card>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" />
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group card>
    <Cell title="单元格" value="内容" />
    <Cell title="单元格" value="内容" />
  </Cell.Group>
)
`}},title:"卡片类型",identifier:"cell-card",lang:"tsx",meta:{title:"卡片类型"}},{Component:x,key:"cell-children",sources:{_:{tsx:`import React from 'react'
import { Text } from 'react-native'

import { ShopO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<ShopO />}>
      <Text>自定义内容</Text>
    </Cell>
  </Cell.Group>
)
`}},dependencies:{react:{type:"NPM",value:">=18.0.0"},"react-native":{type:"NPM",value:">=0.72.0"},"react-native-system-icon":{type:"NPM",value:"1.0.2"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { Text } from 'react-native'

import { ShopO } from 'react-native-system-icon'
import { Cell } from 'react-native-system-ui'

export default () => (
  <Cell.Group>
    <Cell title="单元格" icon={<ShopO />}>
      <Text>自定义内容</Text>
    </Cell>
  </Cell.Group>
)
`}},title:"自定义内容",identifier:"cell-children",lang:"tsx",meta:{title:"自定义内容"}},{Component:m,key:"cell-vertical",sources:{_:{tsx:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell center title="单元格" value="内容" label="描述信息" /></Cell.Group>
`}},dependencies:{react:{type:"NPM",value:"19.2.4"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"index.tsx":{type:"FILE",value:`import React from 'react'

import { Cell } from 'react-native-system-ui'

export default () => <Cell.Group><Cell center title="单元格" value="内容" label="描述信息" /></Cell.Group>
`}},title:"垂直居中",identifier:"cell-vertical",lang:"tsx",meta:{title:"垂直居中"}}],T={simulator:{compact:!0}},q=[{depth:1,text:"Cell 单元格",id:"cell-单元格"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"用户列表",id:"用户列表"},{depth:3,text:"单元格大小",id:"单元格大小"},{depth:3,text:"展示图标",id:"展示图标"},{depth:3,text:"只设置 value",id:"只设置-value"},{depth:3,text:"展示箭头",id:"展示箭头"},{depth:3,text:"分组标题",id:"分组标题"},{depth:3,text:"卡片类型",id:"卡片类型"},{depth:3,text:"自定义内容",id:"自定义内容"},{depth:3,text:"垂直居中",id:"垂直居中"},{depth:2,text:"API",id:"api"},{depth:3,text:"CellGroup Props",id:"cellgroup-props"},{depth:3,text:"Cell Props",id:"cell-props"},{depth:3,text:"事件",id:"事件"},{depth:2,text:"差异说明",id:"差异说明"}],V="/docs/components/cell.md",H="Cell 单元格",J="1769570039000",se=r=>r.children({MdContent:$,demos:z,frontmatter:T,slugs:q,filePath:V,title:H,updatedTime:J});export{$ as MdContent,se as default,z as demos,V as filePath,T as frontmatter,q as slugs,H as title,J as updatedTime};
