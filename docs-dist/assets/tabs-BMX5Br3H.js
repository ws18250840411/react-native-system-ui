import{j as e,V as n,s as d}from"./main-CC2DK3OK.js";import{T as a}from"./index-Ccpl5y1z.js";import{T as i}from"./createComponentTokensHook-BcXZOvON.js";import"./number-BG570ZaL.js";import"./useControllableValue-BBYtc-A6.js";import"./Animated-C-b5K9fC.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-Cakcz3d2.js";import"./index-CCOraIhd.js";import"./index-D_JlQYPg.js";import"./index-CN-rk8sC.js";import"./useAriaPress-DVn62gIQ.js";const r="#3a7afe",u={flexGrow:1,flexShrink:1,flexBasis:0},b=[{key:"1",title:"标签 1"},{key:"2",title:"标签 2"},{key:"3",title:"标签 3"}];function m(){return e.jsxs(n,{style:l.root,children:[e.jsx(a,{defaultActive:"1",border:!1,color:r,titleActiveColor:r,tabStyle:u,children:b.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(n,{style:l.pane,children:e.jsxs(i,{style:l.paneText,children:["内容 ",t.key]})})},t.key))}),e.jsx(n,{style:l.gap}),e.jsx(a,{type:"capsule",border:!0,color:r,defaultActive:"1",tabBarStyle:{paddingHorizontal:0},tabStyle:u,children:b.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(n,{style:l.pane,children:e.jsxs(i,{style:l.paneText,children:["内容 ",t.key]})})},t.key))}),e.jsx(n,{style:l.gap}),e.jsx(a,{type:"jumbo",border:!0,color:r,defaultActive:"1",tabStyle:u,children:b.map((t,s)=>e.jsx(a.TabPane,{name:t.key,title:t.title,description:"描述信息",badge:s+1,children:e.jsx(n,{style:l.pane,children:e.jsxs(i,{style:l.paneText,children:["内容 ",t.key]})})},t.key))}),e.jsx(n,{style:l.gap}),e.jsx(a,{type:"card",color:r,defaultActive:"1",tabStyle:u,children:b.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(n,{style:l.pane,children:e.jsxs(i,{style:l.paneText,children:["内容 ",t.key]})})},t.key))})]})}const l=d.create({root:{width:"100%"},gap:{height:16},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),w=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const tabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const tabs = [
  { key: '1', title: '标签 1' },
  { key: '2', title: '标签 2' },
  { key: '3', title: '标签 3' },
]

export default function TabsBasicDemo() {
  return (
    <View style={styles.root}>
      {/* 下划线风格（默认） */}
      <Tabs
        defaultActive="1"
        border={false}
        color={primaryColor}
        titleActiveColor={primaryColor}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 胶囊风格 */}
      <Tabs
        type="capsule"
        border
        color={primaryColor}
        defaultActive="1"
        tabBarStyle={{ paddingHorizontal: 0 }}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* Jumbo 带描述 */}
      <Tabs
        type="jumbo"
        border
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map((tab, i) => (
          <Tabs.TabPane
            key={tab.key}
            name={tab.key}
            title={tab.title}
            description="描述信息"
            badge={i + 1}
          >
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 卡片风格 */}
      <Tabs
        type="card"
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gap: { height: 16 },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`,S={code:w,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const tabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const tabs = [
  { key: '1', title: '标签 1' },
  { key: '2', title: '标签 2' },
  { key: '3', title: '标签 3' },
]

export default function TabsBasicDemo() {
  return (
    <View style={styles.root}>
      {/* 下划线风格（默认） */}
      <Tabs
        defaultActive="1"
        border={false}
        color={primaryColor}
        titleActiveColor={primaryColor}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 胶囊风格 */}
      <Tabs
        type="capsule"
        border
        color={primaryColor}
        defaultActive="1"
        tabBarStyle={{ paddingHorizontal: 0 }}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* Jumbo 带描述 */}
      <Tabs
        type="jumbo"
        border
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map((tab, i) => (
          <Tabs.TabPane
            key={tab.key}
            name={tab.key}
            title={tab.title}
            description="描述信息"
            badge={i + 1}
          >
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 卡片风格 */}
      <Tabs
        type="card"
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gap: { height: 16 },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const tabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const tabs = [
  { key: '1', title: '标签 1' },
  { key: '2', title: '标签 2' },
  { key: '3', title: '标签 3' },
]

export default function TabsBasicDemo() {
  return (
    <View style={styles.root}>
      {/* 下划线风格（默认） */}
      <Tabs
        defaultActive="1"
        border={false}
        color={primaryColor}
        titleActiveColor={primaryColor}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 胶囊风格 */}
      <Tabs
        type="capsule"
        border
        color={primaryColor}
        defaultActive="1"
        tabBarStyle={{ paddingHorizontal: 0 }}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* Jumbo 带描述 */}
      <Tabs
        type="jumbo"
        border
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map((tab, i) => (
          <Tabs.TabPane
            key={tab.key}
            name={tab.key}
            title={tab.title}
            description="描述信息"
            badge={i + 1}
          >
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 卡片风格 */}
      <Tabs
        type="card"
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gap: { height: 16 },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"基础用法",identifier:"tabs-basic",lang:"tsx",meta:{title:"基础用法"}},C=[{name:"a",label:"标签名1",content:"内容 1"},{name:"b",label:"标签名2",content:"内容 2"},{name:"c",label:"标签名3",content:"内容 3"}],B=({children:t})=>e.jsx(n,{style:y.block,children:t}),V=({children:t})=>e.jsx(n,{style:y.pane,children:typeof t=="string"||typeof t=="number"?e.jsx(i,{style:y.paneText,children:t}):t});function T(){return e.jsx(n,{style:y.root,children:e.jsx(B,{children:e.jsx(a,{defaultActive:"c",color:"#3a7afe",titleActiveColor:"#3a7afe",tabStyle:{flexGrow:1,flexShrink:1,flexBasis:0},children:C.map(t=>e.jsx(a.TabPane,{name:t.name,title:t.label,children:e.jsx(V,{children:t.content})},t.name))})})})}const y=d.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),F=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2' },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsNameMatchDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="c"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`,P={code:F,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2' },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsNameMatchDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="c"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2' },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsNameMatchDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="c"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"通过名称匹配",identifier:"tabs-name-match",lang:"tsx",meta:{title:"通过名称匹配"}},v=[{key:"a",title:"标签名1"},{key:"b",title:"标签名2"},{key:"c",title:"标签名3"}],D=({children:t})=>e.jsx(n,{style:c.block,children:t}),p=({title:t,desc:s})=>e.jsxs(n,{style:c.pane,children:[e.jsx(i,{style:c.paneTitle,children:t}),e.jsx(i,{style:c.paneDesc,children:s})]});function j(){return e.jsx(n,{style:c.root,children:e.jsx(D,{children:e.jsx(a,{swipeable:{autoHeight:!0},lazyRender:!0,lazyRenderPlaceholder:e.jsx(p,{title:"加载中",desc:"内容"}),color:"#3a7afe",titleActiveColor:"#3a7afe",tabStyle:{flexGrow:1,flexShrink:1,flexBasis:0},children:v.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(p,{title:t.title,desc:"内容"})},t.key))})})})}const c=d.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneTitle:{marginBottom:6,fontSize:16,fontWeight:"600",color:"#323233"},paneDesc:{fontSize:14,color:"#323233",lineHeight:22}}),A=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  {
    key: 'a',
    title: '标签名1',
  },
  {
    key: 'b',
    title: '标签名2',
  },
  {
    key: 'c',
    title: '标签名3',
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

export default function TabsSwipeableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={section.title} desc="内容" />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#323233',
  },
  paneDesc: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`,R={code:A,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  {
    key: 'a',
    title: '标签名1',
  },
  {
    key: 'b',
    title: '标签名2',
  },
  {
    key: 'c',
    title: '标签名3',
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

export default function TabsSwipeableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={section.title} desc="内容" />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#323233',
  },
  paneDesc: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  {
    key: 'a',
    title: '标签名1',
  },
  {
    key: 'b',
    title: '标签名2',
  },
  {
    key: 'c',
    title: '标签名3',
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

export default function TabsSwipeableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={section.title} desc="内容" />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#323233',
  },
  paneDesc: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"滑动切换",identifier:"tabs-swipeable",lang:"tsx",meta:{title:"滑动切换"}},f=Array.from({length:8}).map((t,s)=>({key:`tab-${s+1}`,title:`标签名${s+1}`,desc:`内容 ${s+1}`})),E=({children:t})=>e.jsx(n,{style:x.block,children:t}),z=({children:t})=>e.jsx(n,{style:x.pane,children:e.jsx(i,{style:x.paneText,children:t})});function k(){return e.jsx(n,{style:x.root,children:e.jsx(E,{children:e.jsx(a,{defaultActive:f[0].key,color:"#3a7afe",titleActiveColor:"#3a7afe",scrollable:!0,align:"start",children:f.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(z,{children:t.desc})},t.key))})})})}const x=d.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),N=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const tabs = Array.from({ length: 8 }).map((_, idx) => ({
  key: \`tab-\${idx + 1}\`,
  title: \`标签名\${idx + 1}\`,
  desc: \`内容 \${idx + 1}\`,
}))

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsScrollableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={tabs[0].key}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          scrollable
          align="start"
        >
          {tabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`,H={code:N,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const tabs = Array.from({ length: 8 }).map((_, idx) => ({
  key: \`tab-\${idx + 1}\`,
  title: \`标签名\${idx + 1}\`,
  desc: \`内容 \${idx + 1}\`,
}))

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsScrollableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={tabs[0].key}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          scrollable
          align="start"
        >
          {tabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const tabs = Array.from({ length: 8 }).map((_, idx) => ({
  key: \`tab-\${idx + 1}\`,
  title: \`标签名\${idx + 1}\`,
  desc: \`内容 \${idx + 1}\`,
}))

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsScrollableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={tabs[0].key}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          scrollable
          align="start"
        >
          {tabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"标签栏滚动",identifier:"tabs-scrollable",lang:"tsx",meta:{title:"标签栏滚动"}},M=[{name:"a",label:"标签名1",content:"内容 1"},{name:"b",label:"标签名2",content:"内容 2",disabled:!0},{name:"c",label:"标签名3",content:"内容 3"}],_=({children:t})=>e.jsx(n,{style:h.block,children:t}),$=({children:t})=>e.jsx(n,{style:h.pane,children:e.jsx(i,{style:h.paneText,children:t})});function g(){return e.jsx(n,{style:h.root,children:e.jsx(_,{children:e.jsx(a,{defaultActive:"a",color:"#3a7afe",titleActiveColor:"#3a7afe",tabStyle:{flexGrow:1,flexShrink:1,flexBasis:0},children:M.map(t=>e.jsx(a.TabPane,{name:t.name,title:t.label,disabled:t.disabled,children:e.jsx($,{children:t.content})},t.name))})})})}const h=d.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),G=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2', disabled: true },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsDisabledDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="a"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane
              key={item.name}
              name={item.name}
              title={item.label}
              disabled={item.disabled}
            >
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`,I={code:G,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2', disabled: true },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsDisabledDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="a"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane
              key={item.name}
              name={item.name}
              title={item.label}
              disabled={item.disabled}
            >
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2', disabled: true },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsDisabledDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="a"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane
              key={item.name}
              name={item.name}
              title={item.label}
              disabled={item.disabled}
            >
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"禁用标签",identifier:"tabs-disabled",lang:"tsx",meta:{title:"禁用标签"}},L=function({previewer:t=()=>null,api:s=()=>null}){const o=t;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"tabs-标签页","data-anchor":"tabs-标签页",children:"Tabs 标签页"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"分隔内容并允许在同一页面中完成切换，支持行内、卡片、胶囊、Jumbo 描述等多种样式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Tabs } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"提供 4 种常见展现形式："}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"line"})," 下划线风格"]}),e.jsxs("li",{children:[e.jsx("code",{children:"capsule"})," 胶囊风格"]}),e.jsxs("li",{children:[e.jsx("code",{children:"jumbo"})," 带描述信息"]}),e.jsxs("li",{children:[e.jsx("code",{children:"card"})," 卡片风格"]})]}),e.jsx("div",{children:e.jsx(o,{...S,children:e.jsx(m,{})})}),e.jsx("h3",{id:"通过名称匹配","data-anchor":"通过名称匹配",children:"通过名称匹配"}),e.jsxs("p",{children:["在标签传入 ",e.jsx("code",{children:"name"})," 属性后，可结合 ",e.jsx("code",{children:"active"})," / ",e.jsx("code",{children:"defaultActive"})," 通过业务含义来切换，而不依赖索引。"]}),e.jsx("div",{children:e.jsx(o,{...P,children:e.jsx(T,{})})}),e.jsx("h3",{id:"滑动切换","data-anchor":"滑动切换",children:"滑动切换"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"swipeable"})," 后即可通过手势滑动切换标签，默认开启自适应高度，可结合 ",e.jsx("code",{children:"lazyRenderPlaceholder"})," 提示未渲染内容。"]}),e.jsx("div",{children:e.jsx(o,{...R,children:e.jsx(j,{})})}),e.jsx("h3",{id:"标签栏滚动","data-anchor":"标签栏滚动",children:"标签栏滚动"}),e.jsxs("p",{children:["当标签数量超过 ",e.jsx("code",{children:"swipeThreshold"})," 时，标签栏会自动开启横向滚动。"]}),e.jsx("div",{children:e.jsx(o,{...H,children:e.jsx(k,{})})}),e.jsx("h3",{id:"禁用标签","data-anchor":"禁用标签",children:"禁用标签"}),e.jsxs("p",{children:["在 ",e.jsx("code",{children:"Tabs.TabPane"})," 上设置 ",e.jsx("code",{children:"disabled"})," 可禁用对应标签，禁用项点击不会切换。"]}),e.jsx("div",{children:e.jsx(o,{...I,children:e.jsx(g,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"tabs-props","data-anchor":"tabs-props",children:"Tabs Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"active"})}),e.jsx("td",{children:"当前选中项标识符，受控模式"}),e.jsx("td",{children:e.jsx("code",{children:"TabsValue"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultActive"})}),e.jsx("td",{children:"默认选中项标识符"}),e.jsx("td",{children:e.jsx("code",{children:"TabsValue"})}),e.jsx("td",{children:"第一个 Tab"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"外观类型"}),e.jsx("td",{children:e.jsx("code",{children:"'line' | 'card' | 'capsule' | 'jumbo'"})}),e.jsx("td",{children:e.jsx("code",{children:"'line'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"非滚动模式下的对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'center'"})}),e.jsx("td",{children:e.jsx("code",{children:"center"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"指示器与激活文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"标签栏背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#fff"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示底部分隔线（仅 line）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lineWidth"})}),e.jsx("td",{children:"自定义指示条宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lineHeight"})}),e.jsx("td",{children:"自定义指示条高度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleActiveColor"})}),e.jsx("td",{children:"激活标签文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleInactiveColor"})}),e.jsx("td",{children:"默认标签文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"设计稿默认色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ellipsis"})}),e.jsx("td",{children:"是否省略过长标题"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeThreshold"})}),e.jsx("td",{children:"标签数量超过阈值后自动进入可滚动模式"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"5"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animated"})}),e.jsx("td",{children:"是否开启指示条动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"指示条动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeChange"})}),e.jsxs("td",{children:["切换前的回调，返回 ",e.jsx("code",{children:"false"})," 可阻止切换，支持 Promise"]}),e.jsx("td",{children:e.jsx("code",{children:"(name: TabsValue) => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRender"})}),e.jsx("td",{children:"延迟渲染 Tab 内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRenderPlaceholder"})}),e.jsxs("td",{children:[e.jsx("code",{children:"lazyRender"})," 模式下未激活时的占位内容"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeable"})}),e.jsxs("td",{children:["开启手势滑动切换，可传对象配置 ",e.jsx("code",{children:"autoHeight"}),"、",e.jsx("code",{children:"preventScroll"})]}),e.jsx("td",{children:"`boolean \\"}),e.jsx("td",{children:"TabsSwipeableConfig`"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"navLeft"})}),e.jsx("td",{children:"标签栏左侧扩展区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"navRight"})}),e.jsx("td",{children:"标签栏右侧扩展区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"navBottom"})}),e.jsx("td",{children:"标签栏下方扩展区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tabBarStyle"})}),e.jsx("td",{children:"标签栏容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tabStyle"})}),e.jsx("td",{children:"单个标签样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleStyle"})}),e.jsx("td",{children:"标题文字样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"descriptionStyle"})}),e.jsx("td",{children:"描述文字样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsx("td",{children:"内容区样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickTab"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(payload: TabsClickEvent) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsxs("td",{children:["当前激活标签改变时触发，参数为 ",e.jsx("code",{children:"(name, index)"})]}),e.jsx("td",{children:e.jsx("code",{children:"(name: TabsValue, index: number) => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"tabstabpane-props","data-anchor":"tabstabpane-props",children:"Tabs.TabPane Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsxs("td",{children:["标签名称，匹配 ",e.jsx("code",{children:"active"})]}),e.jsx("td",{children:e.jsx("code",{children:"TabsValue"})}),e.jsx("td",{children:"索引"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"副标题/描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"badge"})}),e.jsx("td",{children:"自定义徽标内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"tabsswipeableconfig","data-anchor":"tabsswipeableconfig",children:"TabsSwipeableConfig"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoHeight"})}),e.jsx("td",{children:"是否根据激活面板自适应高度"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"preventScroll"})}),e.jsx("td",{children:"是否锁定手势方向，避免垂直滚动误触切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]})]})]})]})})},W=[{Component:m,key:"tabs-basic",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const tabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const tabs = [
  { key: '1', title: '标签 1' },
  { key: '2', title: '标签 2' },
  { key: '3', title: '标签 3' },
]

export default function TabsBasicDemo() {
  return (
    <View style={styles.root}>
      {/* 下划线风格（默认） */}
      <Tabs
        defaultActive="1"
        border={false}
        color={primaryColor}
        titleActiveColor={primaryColor}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 胶囊风格 */}
      <Tabs
        type="capsule"
        border
        color={primaryColor}
        defaultActive="1"
        tabBarStyle={{ paddingHorizontal: 0 }}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* Jumbo 带描述 */}
      <Tabs
        type="jumbo"
        border
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map((tab, i) => (
          <Tabs.TabPane
            key={tab.key}
            name={tab.key}
            title={tab.title}
            description="描述信息"
            badge={i + 1}
          >
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 卡片风格 */}
      <Tabs
        type="card"
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gap: { height: 16 },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const tabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const tabs = [
  { key: '1', title: '标签 1' },
  { key: '2', title: '标签 2' },
  { key: '3', title: '标签 3' },
]

export default function TabsBasicDemo() {
  return (
    <View style={styles.root}>
      {/* 下划线风格（默认） */}
      <Tabs
        defaultActive="1"
        border={false}
        color={primaryColor}
        titleActiveColor={primaryColor}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 胶囊风格 */}
      <Tabs
        type="capsule"
        border
        color={primaryColor}
        defaultActive="1"
        tabBarStyle={{ paddingHorizontal: 0 }}
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* Jumbo 带描述 */}
      <Tabs
        type="jumbo"
        border
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map((tab, i) => (
          <Tabs.TabPane
            key={tab.key}
            name={tab.key}
            title={tab.title}
            description="描述信息"
            badge={i + 1}
          >
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>

      <View style={styles.gap} />

      {/* 卡片风格 */}
      <Tabs
        type="card"
        color={primaryColor}
        defaultActive="1"
        tabStyle={tabStyle}
      >
        {tabs.map(tab => (
          <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
            <View style={styles.pane}>
              <Text style={styles.paneText}>内容 {tab.key}</Text>
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { width: '100%' },
  gap: { height: 16 },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"基础用法",identifier:"tabs-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:T,key:"tabs-name-match",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2' },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsNameMatchDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="c"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2' },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsNameMatchDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="c"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"通过名称匹配",identifier:"tabs-name-match",lang:"tsx",meta:{title:"通过名称匹配"}},{Component:j,key:"tabs-swipeable",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  {
    key: 'a',
    title: '标签名1',
  },
  {
    key: 'b',
    title: '标签名2',
  },
  {
    key: 'c',
    title: '标签名3',
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

export default function TabsSwipeableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={section.title} desc="内容" />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#323233',
  },
  paneDesc: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const sections = [
  {
    key: 'a',
    title: '标签名1',
  },
  {
    key: 'b',
    title: '标签名2',
  },
  {
    key: 'c',
    title: '标签名3',
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <View style={styles.pane}>
    <Text style={styles.paneTitle}>{title}</Text>
    <Text style={styles.paneDesc}>{desc}</Text>
  </View>
)

export default function TabsSwipeableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={section.title} desc="内容" />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneTitle: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#323233',
  },
  paneDesc: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"滑动切换",identifier:"tabs-swipeable",lang:"tsx",meta:{title:"滑动切换"}},{Component:k,key:"tabs-scrollable",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const tabs = Array.from({ length: 8 }).map((_, idx) => ({
  key: \`tab-\${idx + 1}\`,
  title: \`标签名\${idx + 1}\`,
  desc: \`内容 \${idx + 1}\`,
}))

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsScrollableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={tabs[0].key}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          scrollable
          align="start"
        >
          {tabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const tabs = Array.from({ length: 8 }).map((_, idx) => ({
  key: \`tab-\${idx + 1}\`,
  title: \`标签名\${idx + 1}\`,
  desc: \`内容 \${idx + 1}\`,
}))

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsScrollableDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={tabs[0].key}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          scrollable
          align="start"
        >
          {tabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"标签栏滚动",identifier:"tabs-scrollable",lang:"tsx",meta:{title:"标签栏滚动"}},{Component:g,key:"tabs-disabled",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2', disabled: true },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsDisabledDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="a"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane
              key={item.name}
              name={item.name}
              title={item.label}
              disabled={item.disabled}
            >
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},dependencies:{react:{type:"NPM",value:"^19.2.0"},"react-native":{type:"NPM",value:"0.83.1"},"react-native-system-ui":{type:"NPM",value:"0.0.7"},"@types/react":{type:"NPM",value:"^19.1.1"},"index.tsx":{type:"FILE",value:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const panes = [
  { name: 'a', label: '标签名1', content: '内容 1' },
  { name: 'b', label: '标签名2', content: '内容 2', disabled: true },
  { name: 'c', label: '标签名3', content: '内容 3' },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.pane}>
    <Text style={styles.paneText}>{children}</Text>
  </View>
)

export default function TabsDisabledDemo() {
  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive="a"
          color="#3a7afe"
          titleActiveColor="#3a7afe"
          tabStyle={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
        >
          {panes.map(item => (
            <Tabs.TabPane
              key={item.name}
              name={item.name}
              title={item.label}
              disabled={item.disabled}
            >
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  block: {
    paddingTop: 6,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  pane: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"禁用标签",identifier:"tabs-disabled",lang:"tsx",meta:{title:"禁用标签"}}],J={simulator:{compact:!0}},q=[{depth:1,text:"Tabs 标签页",id:"tabs-标签页"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"通过名称匹配",id:"通过名称匹配"},{depth:3,text:"滑动切换",id:"滑动切换"},{depth:3,text:"标签栏滚动",id:"标签栏滚动"},{depth:3,text:"禁用标签",id:"禁用标签"},{depth:2,text:"API",id:"api"},{depth:3,text:"Tabs Props",id:"tabs-props"},{depth:3,text:"Tabs.TabPane Props",id:"tabstabpane-props"},{depth:3,text:"TabsSwipeableConfig",id:"tabsswipeableconfig"}],K="/docs/components/tabs.md",O="Tabs 标签页",Q="1769570039000",ce=t=>t.children({MdContent:L,demos:W,frontmatter:J,slugs:q,filePath:K,title:O,updatedTime:Q});export{L as MdContent,ce as default,W as demos,K as filePath,J as frontmatter,q as slugs,O as title,Q as updatedTime};
