import{j as e,V as r,R as N,r as $,i as u,s as j}from"./main-CX5QgiXt.js";import{c as z,T as b}from"./createComponentTokensHook-Hc3l7riF.js";const H=t=>({defaults:{direction:"row",wrap:"nowrap",gutter:0,align:"start",justify:"start",columns:24},layout:{container:{}}}),W=z("flex",H),T=N.createContext({horizontalGap:0,verticalGap:0,columns:24}),G={start:"flex-start",center:"center",end:"flex-end",baseline:"baseline",stretch:"stretch"},L={start:"flex-start",end:"flex-end",center:"center",around:"space-around",between:"space-between"},O=t=>{const{tokensOverride:n,children:o,direction:i,wrap:f,gutter:m,align:c,justify:s,style:a,columns:d}=t,x=W(n),S=i??x.defaults.direction,E=f??x.defaults.wrap,p=m??x.defaults.gutter,D=c??x.defaults.align,R=s??x.defaults.justify,P=d??x.defaults.columns,A=Math.max(1,P),[M,_]=Array.isArray(p)?p:[p,0],g=Math.max(0,M??0),C=Math.max(0,_??0);return e.jsx(T.Provider,{value:{horizontalGap:g,verticalGap:C,columns:A},children:e.jsx(r,{style:[x.layout.container,{flexDirection:S,flexWrap:E,alignItems:G[D],justifyContent:L[R],marginHorizontal:void 0,marginVertical:void 0,columnGap:g,rowGap:C},a],children:o})})},q=t=>{if(u(t))return{flex:t};if(!t)return;const n=t.trim();if(!n)return;if(n==="auto")return{flexGrow:1,flexShrink:1,flexBasis:"auto"};if(n==="none")return{flexGrow:0,flexShrink:0,flexBasis:"auto"};const o=Number(n);if(u(o))return{flex:o};const i=n.split(/\s+/);if(i.length>=2){const[f,m]=i.map(Number);if(u(f)&&u(m)){const c=i.slice(2).join(" ");let s;if(c==="auto")s="auto";else if(c){const a=c.match(/^(-?\d+(?:\.\d+)?)px$/),d=Number(a?a[1]:c);u(d)&&(s=d)}return{flexGrow:f,flexShrink:m,flexBasis:s}}}},J=({span:t,flex:n,style:o,children:i})=>{const{horizontalGap:f,verticalGap:m,columns:c}=$.useContext(T);if(u(t)&&t<=0)return null;const s={};if(u(t)){const a=Math.max(1,c),d=Math.min(Math.max(t,0),a)/a;s.width=`${d*100}%`,s.flexGrow=0,s.flexShrink=0}return e.jsx(r,{style:[null,s,q(n),o],children:i})},l=Object.assign(O,{Item:J}),K={"tone-1":"#3f45ff","tone-2":"#4c52ff","tone-3":"#5a60ff","tone-4":"#686eff"},h=({label:t,tone:n})=>e.jsx(r,{style:[y.block,{backgroundColor:K[n]}],children:e.jsx(b,{style:y.blockText,children:t})}),I=()=>e.jsxs(r,{children:[e.jsx(r,{style:y.row,children:e.jsxs(l,{justify:"center",align:"center",children:[e.jsx(l.Item,{span:12,children:e.jsx(h,{label:"span: 12",tone:"tone-1"})}),e.jsx(l.Item,{span:12,children:e.jsx(h,{label:"span: 12",tone:"tone-2"})})]})}),e.jsx(r,{children:e.jsxs(l,{children:[e.jsx(l.Item,{span:8,children:e.jsx(h,{label:"span: 8",tone:"tone-2"})}),e.jsx(l.Item,{span:8,children:e.jsx(h,{label:"span: 8",tone:"tone-3"})}),e.jsx(l.Item,{span:8,children:e.jsx(h,{label:"span: 8",tone:"tone-4"})})]})})]}),y=j.create({row:{marginBottom:10},block:{height:30,alignItems:"center",justifyContent:"center"},blockText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#ffffff"}}),Q=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`,U={code:Q,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"基础用法",identifier:"flex-base",lang:"tsx",meta:{title:"基础用法"}},k=({label:t})=>e.jsx(r,{style:F.cell,children:e.jsx(b,{style:F.cellText,children:t})}),B=()=>e.jsxs(r,{children:[e.jsx(r,{style:F.row,children:e.jsx(l,{gutter:[12,12],children:new Array(3).fill(null).map((t,n)=>e.jsx(l.Item,{span:8,children:e.jsx(k,{label:"span: 8"})},`row1-${n}`))})}),e.jsx(r,{children:e.jsx(l,{gutter:[12,12],children:new Array(3).fill(null).map((t,n)=>e.jsx(l.Item,{span:8,children:e.jsx(k,{label:"span: 8"})},`row2-${n}`))})})]}),F=j.create({row:{marginBottom:10},cell:{height:30,alignItems:"center",justifyContent:"center",backgroundColor:"#dfe4ff"},cellText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#4f5bff"}}),X=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`,Y={code:X,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},title:"区域间隔",identifier:"flex-gutter",lang:"tsx",meta:{title:"区域间隔"}},Z={"tone-1":"#3f45ff","tone-2":"#4c52ff","tone-3":"#5a60ff"},ee=({label:t,tone:n})=>e.jsx(r,{style:[w.block,{backgroundColor:Z[n]}],children:e.jsx(b,{style:w.blockText,children:t})}),V=({direction:t})=>{const n=["tone-1","tone-2","tone-3"];return e.jsx(r,{style:w.row,children:e.jsx(l,{direction:t,children:n.map((o,i)=>e.jsx(l.Item,{span:8,children:e.jsx(ee,{label:`span: 8-${i+1}`,tone:o})},o))})})},v=()=>e.jsxs(r,{children:[e.jsx(V,{direction:"row"}),e.jsx(V,{direction:"row-reverse"})]}),w=j.create({row:{marginBottom:10},block:{height:30,alignItems:"center",justifyContent:"center"},blockText:{fontSize:13,lineHeight:30,fontWeight:"600",color:"#ffffff"}}),te=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`,ne={code:te,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"方向",identifier:"flex-direction",lang:"tsx",meta:{title:"方向"}},oe=function({previewer:t=()=>null,api:n=()=>null}){const o=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"flex-布局","data-anchor":"flex-布局",children:"Flex 布局"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsxs("p",{children:[e.jsx("code",{children:"Flex"})," 组件是 CSS ",e.jsx("code",{children:"flex"})," 布局的一个封装，提供 24 栅格、间距和方向控制能力。"]}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Flex } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsxs("p",{children:["使用 ",e.jsx("code",{children:"Flex"})," 与 ",e.jsx("code",{children:"Flex.Item"})," 即可快速构建 24 列栅格系统，所有列必须放在 ",e.jsx("code",{children:"Flex"})," 内。"]}),e.jsx("div",{children:e.jsx(o,{...U,children:e.jsx(I,{})})}),e.jsx("h3",{id:"区域间隔","data-anchor":"区域间隔",children:"区域间隔"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"gutter"})," 属性设置列元素之间的间距，数组写法可以同时指定水平/垂直间距。"]}),e.jsx("div",{children:e.jsx(o,{...Y,children:e.jsx(B,{})})}),e.jsx("h3",{id:"方向","data-anchor":"方向",children:"方向"}),e.jsxs("p",{children:["通过 ",e.jsx("code",{children:"direction"})," 属性设置弹性布局方向。默认是 ",e.jsx("code",{children:"row"}),"。"]}),e.jsx("div",{children:e.jsx(o,{...ne,children:e.jsx(v,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"flex-props","data-anchor":"flex-props",children:"Flex Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"direction"})}),e.jsx("td",{children:"项目定位方向"}),e.jsx("td",{children:e.jsx("code",{children:"'row' | 'row-reverse' | 'column' | 'column-reverse'"})}),e.jsx("td",{children:e.jsx("code",{children:"'row'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"wrap"})}),e.jsx("td",{children:"子元素换行方式"}),e.jsx("td",{children:e.jsx("code",{children:"'nowrap' | 'wrap' | 'wrap-reverse'"})}),e.jsx("td",{children:e.jsx("code",{children:"'nowrap'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"gutter"})}),e.jsxs("td",{children:["列间距，支持 ",e.jsx("code",{children:"[水平, 垂直]"})]}),e.jsx("td",{children:e.jsx("code",{children:"number | [number, number]"})}),e.jsx("td",{children:e.jsx("code",{children:"0"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"垂直对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'center' | 'end' | 'baseline' | 'stretch'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"justify"})}),e.jsx("td",{children:"水平排列方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'end' | 'center' | 'around' | 'between'"})}),e.jsx("td",{children:e.jsx("code",{children:"'start'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"columns"})}),e.jsxs("td",{children:["栅格总列数，用于计算 ",e.jsx("code",{children:"span"})]}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:e.jsx("code",{children:"24"})})]})]})]}),e.jsx("h3",{id:"flexitem-props","data-anchor":"flexitem-props",children:"Flex.Item Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"span"})}),e.jsx("td",{children:"栅格占位格数，为 0 时不渲染"}),e.jsx("td",{children:e.jsx("code",{children:"number"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"flex"})}),e.jsxs("td",{children:["Flex 布局属性，支持数字或 ",e.jsx("code",{children:"auto"}),"、",e.jsx("code",{children:"none"})," 以及 ",e.jsx("code",{children:"flex-grow flex-shrink flex-basis"})," 字符串写法（第三项支持 ",e.jsx("code",{children:"auto"})," 或数字/px）"]}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("blockquote",{children:e.jsxs("p",{children:["示例：",e.jsx("code",{children:'flex="auto"'}),"、",e.jsx("code",{children:'flex="0 0 auto"'}),"、",e.jsx("code",{children:'flex="2 1 120px"'}),"。由于 React Native 限制，目前不支持百分比等单位。",e.jsx("br",{}),"React Native 环境不支持 DOM 维度的 ",e.jsx("code",{children:"order"}),"、",e.jsx("code",{children:"offset"})," 等属性，如需更复杂的布局可以直接使用 ",e.jsx("code",{children:"View"})," + ",e.jsx("code",{children:"StyleSheet"})," 来实现。"]})})]})})},le=[{Component:I,key:"flex-base",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3' | 'tone-4'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
  'tone-4': '#686eff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex justify="center" align="center">
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-1" />
        </Flex.Item>
        <Flex.Item span={12}>
          <Block label="span: 12" tone="tone-2" />
        </Flex.Item>
      </Flex>
    </View>
    <View>
      <Flex>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-2" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-3" />
        </Flex.Item>
        <Flex.Item span={8}>
          <Block label="span: 8" tone="tone-4" />
        </Flex.Item>
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"基础用法",identifier:"flex-base",lang:"tsx",meta:{title:"基础用法"}},{Component:B,key:"flex-gutter",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

const Cell = ({ label }: { label: string }) => (
  <View style={styles.cell}>
    <Text style={styles.cellText}>{label}</Text>
  </View>
)

export default () => (
  <View>
    <View style={styles.row}>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row1-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
    <View>
      <Flex gutter={[12, 12]}>
        {new Array(3).fill(null).map((_, index) => (
          <Flex.Item span={8} key={\`row2-\${index}\`}>
            <Cell label="span: 8" />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  cell: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe4ff',
  },
  cellText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#4f5bff',
  },
})
`}},title:"区域间隔",identifier:"flex-gutter",lang:"tsx",meta:{title:"区域间隔"}},{Component:v,key:"flex-direction",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Flex } from 'react-native-system-ui'

type Tone = 'tone-1' | 'tone-2' | 'tone-3'

const toneColors: Record<Tone, string> = {
  'tone-1': '#3f45ff',
  'tone-2': '#4c52ff',
  'tone-3': '#5a60ff',
}

const Block = ({ label, tone }: { label: string; tone: Tone }) => (
  <View style={[styles.block, { backgroundColor: toneColors[tone] }]}>
    <Text style={styles.blockText}>{label}</Text>
  </View>
)

const DirectionRow = ({ direction }: { direction: 'row' | 'row-reverse' }) => {
  const tones: Tone[] = ['tone-1', 'tone-2', 'tone-3']
  return (
    <View style={styles.row}>
      <Flex direction={direction}>
        {tones.map((tone, index) => (
          <Flex.Item key={tone} span={8}>
            <Block label={\`span: 8-\${index + 1}\`} tone={tone} />
          </Flex.Item>
        ))}
      </Flex>
    </View>
  )
}

export default () => (
  <View>
    <DirectionRow direction="row" />
    <DirectionRow direction="row-reverse" />
  </View>
)

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  block: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 13,
    lineHeight: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
})
`}},title:"方向",identifier:"flex-direction",lang:"tsx",meta:{title:"方向"}}],re={simulator:{compact:!0}},se=[{depth:1,text:"Flex 布局",id:"flex-布局"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"区域间隔",id:"区域间隔"},{depth:3,text:"方向",id:"方向"},{depth:2,text:"API",id:"api"},{depth:3,text:"Flex Props",id:"flex-props"},{depth:3,text:"Flex.Item Props",id:"flexitem-props"}],ie="/docs/components/flex.md",ce="Flex 布局",ae="1769570039000",de=t=>t.children({MdContent:oe,demos:le,frontmatter:re,slugs:se,filePath:ie,title:ce,updatedTime:ae});export{oe as MdContent,de as default,le as demos,ie as filePath,re as frontmatter,se as slugs,ce as title,ae as updatedTime};
