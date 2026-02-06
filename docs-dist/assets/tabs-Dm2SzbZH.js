import{j as e,V as l,s as u}from"./main-BAeJvGa4.js";import{T as a}from"./index-DbbrlM-c.js";import{T as s}from"./createComponentTokensHook-C-NxqfEf.js";import"./number-D4GYRO_w.js";import"./useControllableValue-Dp7VzsJy.js";import"./Animated-BC0ZtReY.js";import"./index-CJrLMJTa.js";import"./extends-CF3RwP-h.js";import"./index-BQ9E3_S9.js";import"./index-Beiuxnvg.js";import"./index-OVYHKMmk.js";import"./index-DkwLlxr6.js";import"./useAriaPress-B7BjoQga.js";const c="#3a7afe",b=[1,2,3],m=(n,i)=>({key:`${n}-${i}`,title:`标签名${i}`}),f=({children:n})=>e.jsx(l,{style:r.block,children:n}),p={flexGrow:1,flexShrink:1,flexBasis:0},h=({children:n,tone:i="default"})=>e.jsx(l,{style:[r.pane,i==="plain"?r.panePlain:null],children:typeof n=="string"||typeof n=="number"?e.jsx(s,{style:r.paneText,children:n}):n});function B(){const n=b.map(t=>({...m("line",t),desc:`内容 ${t}`})),i=b.map(t=>({...m("capsule",t),desc:`内容 ${t}`})),o=b.map(t=>({...m("jumbo",t),desc:`内容 ${t}`,badge:t})),k=b.map(t=>({...m("card",t),desc:`内容 ${t}`}));return e.jsxs(l,{style:r.root,children:[e.jsx(f,{children:e.jsx(a,{defaultActive:n[0].key,border:!1,color:c,titleActiveColor:c,tabStyle:p,children:n.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(h,{children:t.desc})},t.key))})}),e.jsx(f,{children:e.jsx(a,{border:!0,type:"capsule",color:c,defaultActive:i[0].key,tabBarStyle:{paddingHorizontal:0},tabStyle:p,children:i.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(h,{children:t.desc})},t.key))})}),e.jsx(f,{children:e.jsx(a,{border:!0,type:"jumbo",color:c,defaultActive:o[0].key,tabStyle:p,children:o.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,description:"描述信息",badge:t.badge,children:e.jsx(h,{children:t.desc})},t.key))})}),e.jsx(f,{children:e.jsx(a,{type:"card",color:c,defaultActive:k[0].key,tabStyle:p,children:k.map(t=>e.jsx(a.TabPane,{name:t.key,title:t.title,children:e.jsx(h,{tone:"plain",children:t.desc})},t.key))})})]})}const r=u.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},panePlain:{backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),F=`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: \`\${prefix}-\${index}\`,
  title: \`标签名\${index}\`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const fullTabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const Pane: React.FC<{ children: React.ReactNode; tone?: 'default' | 'plain' }> = ({
  children,
  tone = 'default',
}) => (
  <View style={[styles.pane, tone === 'plain' ? styles.panePlain : null]}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab('line', item), desc: \`内容 \${item}\` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab('capsule', item), desc: \`内容 \${item}\` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab('jumbo', item), desc: \`内容 \${item}\`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab('card', item), desc: \`内容 \${item}\` }))

  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          tabStyle={fullTabStyle}
        >
          {lineTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="capsule"
          color={primaryColor}
          defaultActive={capsuleTabs[0].key}
          tabBarStyle={{ paddingHorizontal: 0 }}
          tabStyle={fullTabStyle}
        >
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="jumbo"
          color={primaryColor}
          defaultActive={jumboTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述信息"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
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
  panePlain: {
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`,D={code:F,sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: \`\${prefix}-\${index}\`,
  title: \`标签名\${index}\`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const fullTabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const Pane: React.FC<{ children: React.ReactNode; tone?: 'default' | 'plain' }> = ({
  children,
  tone = 'default',
}) => (
  <View style={[styles.pane, tone === 'plain' ? styles.panePlain : null]}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab('line', item), desc: \`内容 \${item}\` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab('capsule', item), desc: \`内容 \${item}\` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab('jumbo', item), desc: \`内容 \${item}\`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab('card', item), desc: \`内容 \${item}\` }))

  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          tabStyle={fullTabStyle}
        >
          {lineTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="capsule"
          color={primaryColor}
          defaultActive={capsuleTabs[0].key}
          tabBarStyle={{ paddingHorizontal: 0 }}
          tabStyle={fullTabStyle}
        >
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="jumbo"
          color={primaryColor}
          defaultActive={jumboTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述信息"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
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
  panePlain: {
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
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: \`\${prefix}-\${index}\`,
  title: \`标签名\${index}\`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const fullTabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const Pane: React.FC<{ children: React.ReactNode; tone?: 'default' | 'plain' }> = ({
  children,
  tone = 'default',
}) => (
  <View style={[styles.pane, tone === 'plain' ? styles.panePlain : null]}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab('line', item), desc: \`内容 \${item}\` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab('capsule', item), desc: \`内容 \${item}\` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab('jumbo', item), desc: \`内容 \${item}\`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab('card', item), desc: \`内容 \${item}\` }))

  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          tabStyle={fullTabStyle}
        >
          {lineTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="capsule"
          color={primaryColor}
          defaultActive={capsuleTabs[0].key}
          tabBarStyle={{ paddingHorizontal: 0 }}
          tabStyle={fullTabStyle}
        >
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="jumbo"
          color={primaryColor}
          defaultActive={jumboTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述信息"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
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
  panePlain: {
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"基础用法",identifier:"tabs-basic",lang:"tsx",meta:{title:"基础用法"}},v=[{name:"a",label:"标签名1",content:"内容 1"},{name:"b",label:"标签名2",content:"内容 2"},{name:"c",label:"标签名3",content:"内容 3"}],V=({children:n})=>e.jsx(l,{style:y.block,children:n}),R=({children:n})=>e.jsx(l,{style:y.pane,children:typeof n=="string"||typeof n=="number"?e.jsx(s,{style:y.paneText,children:n}):n});function P(){return e.jsx(l,{style:y.root,children:e.jsx(V,{children:e.jsx(a,{defaultActive:"c",color:"#3a7afe",titleActiveColor:"#3a7afe",tabStyle:{flexGrow:1,flexShrink:1,flexBasis:0},children:v.map(n=>e.jsx(a.TabPane,{name:n.name,title:n.label,children:e.jsx(R,{children:n.content})},n.name))})})})}const y=u.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),A=`import React from 'react'
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
`,E={code:A,sources:{_:{tsx:`import React from 'react'
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
`}},title:"通过名称匹配",identifier:"tabs-name-match",lang:"tsx",meta:{title:"通过名称匹配"}},N=[{key:"a",title:"标签名1"},{key:"b",title:"标签名2"},{key:"c",title:"标签名3"}],z=({children:n})=>e.jsx(l,{style:d.block,children:n}),j=({title:n,desc:i})=>e.jsxs(l,{style:d.pane,children:[e.jsx(s,{style:d.paneTitle,children:n}),e.jsx(s,{style:d.paneDesc,children:i})]});function C(){return e.jsx(l,{style:d.root,children:e.jsx(z,{children:e.jsx(a,{swipeable:{autoHeight:!0},lazyRender:!0,lazyRenderPlaceholder:e.jsx(j,{title:"加载中",desc:"内容"}),color:"#3a7afe",titleActiveColor:"#3a7afe",tabStyle:{flexGrow:1,flexShrink:1,flexBasis:0},children:N.map(n=>e.jsx(a.TabPane,{name:n.key,title:n.title,children:e.jsx(j,{title:n.title,desc:"内容"})},n.key))})})})}const d=u.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneTitle:{marginBottom:6,fontSize:16,fontWeight:"600",color:"#323233"},paneDesc:{fontSize:14,color:"#323233",lineHeight:22}}),$=`import React from 'react'
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
`,H={code:$,sources:{_:{tsx:`import React from 'react'
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
`}},title:"滑动切换",identifier:"tabs-swipeable",lang:"tsx",meta:{title:"滑动切换"}},g=Array.from({length:8}).map((n,i)=>({key:`tab-${i+1}`,title:`标签名${i+1}`,desc:`内容 ${i+1}`})),M=({children:n})=>e.jsx(l,{style:x.block,children:n}),_=({children:n})=>e.jsx(l,{style:x.pane,children:e.jsx(s,{style:x.paneText,children:n})});function S(){return e.jsx(l,{style:x.root,children:e.jsx(M,{children:e.jsx(a,{defaultActive:g[0].key,color:"#3a7afe",titleActiveColor:"#3a7afe",scrollable:!0,align:"start",children:g.map(n=>e.jsx(a.TabPane,{name:n.key,title:n.title,children:e.jsx(_,{children:n.desc})},n.key))})})})}const x=u.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),G=`import React from 'react'
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


`,I={code:G,sources:{_:{tsx:`import React from 'react'
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


`}},title:"标签栏滚动",identifier:"tabs-scrollable",lang:"tsx",meta:{title:"标签栏滚动"}},L=[{name:"a",label:"标签名1",content:"内容 1"},{name:"b",label:"标签名2",content:"内容 2",disabled:!0},{name:"c",label:"标签名3",content:"内容 3"}],W=({children:n})=>e.jsx(l,{style:T.block,children:n}),J=({children:n})=>e.jsx(l,{style:T.pane,children:e.jsx(s,{style:T.paneText,children:n})});function w(){return e.jsx(l,{style:T.root,children:e.jsx(W,{children:e.jsx(a,{defaultActive:"a",color:"#3a7afe",titleActiveColor:"#3a7afe",tabStyle:{flexGrow:1,flexShrink:1,flexBasis:0},children:L.map(n=>e.jsx(a.TabPane,{name:n.name,title:n.label,disabled:n.disabled,children:e.jsx(J,{children:n.content})},n.name))})})})}const T=u.create({root:{width:"100%"},block:{paddingTop:6,marginBottom:16,backgroundColor:"#ffffff"},pane:{paddingVertical:24,paddingHorizontal:20,backgroundColor:"#ffffff"},paneText:{fontSize:14,color:"#323233",lineHeight:22}}),q=`import React from 'react'
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


`,K={code:q,sources:{_:{tsx:`import React from 'react'
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


`}},title:"禁用标签",identifier:"tabs-disabled",lang:"tsx",meta:{title:"禁用标签"}},O=function({previewer:n=()=>null,api:i=()=>null}){const o=n;return e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("h1",{id:"tabs-标签页","data-anchor":"tabs-标签页",children:"Tabs 标签页"}),e.jsx("h2",{id:"介绍","data-anchor":"介绍",children:"介绍"}),e.jsx("p",{children:"分隔内容并允许在同一页面中完成切换，支持行内、卡片、胶囊、Jumbo 描述等多种样式。"}),e.jsx("h2",{id:"引入","data-anchor":"引入",children:"引入"}),e.jsx(o,{code:"import { Tabs } from 'react-native-system-ui'",lang:"js"}),e.jsx("h2",{id:"代码演示","data-anchor":"代码演示",children:"代码演示"}),e.jsx("h3",{id:"基础用法","data-anchor":"基础用法",children:"基础用法"}),e.jsx("p",{children:"提供 4 种常见展现形式："}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"line"})," 下划线风格"]}),e.jsxs("li",{children:[e.jsx("code",{children:"capsule"})," 胶囊风格"]}),e.jsxs("li",{children:[e.jsx("code",{children:"jumbo"})," 带描述信息"]}),e.jsxs("li",{children:[e.jsx("code",{children:"card"})," 卡片风格"]})]}),e.jsx("div",{children:e.jsx(o,{...D,children:e.jsx(B,{})})}),e.jsx("h3",{id:"通过名称匹配","data-anchor":"通过名称匹配",children:"通过名称匹配"}),e.jsxs("p",{children:["在标签传入 ",e.jsx("code",{children:"name"})," 属性后，可结合 ",e.jsx("code",{children:"active"})," / ",e.jsx("code",{children:"defaultActive"})," 通过业务含义来切换，而不依赖索引。"]}),e.jsx("div",{children:e.jsx(o,{...E,children:e.jsx(P,{})})}),e.jsx("h3",{id:"滑动切换","data-anchor":"滑动切换",children:"滑动切换"}),e.jsxs("p",{children:["设置 ",e.jsx("code",{children:"swipeable"})," 后即可通过手势滑动切换标签，默认开启自适应高度，可结合 ",e.jsx("code",{children:"lazyRenderPlaceholder"})," 提示未渲染内容。"]}),e.jsx("div",{children:e.jsx(o,{...H,children:e.jsx(C,{})})}),e.jsx("h3",{id:"标签栏滚动","data-anchor":"标签栏滚动",children:"标签栏滚动"}),e.jsxs("p",{children:["当标签数量超过 ",e.jsx("code",{children:"swipeThreshold"})," 时，标签栏会自动开启横向滚动。"]}),e.jsx("div",{children:e.jsx(o,{...I,children:e.jsx(S,{})})}),e.jsx("h3",{id:"禁用标签","data-anchor":"禁用标签",children:"禁用标签"}),e.jsxs("p",{children:["在 ",e.jsx("code",{children:"Tabs.TabPane"})," 上设置 ",e.jsx("code",{children:"disabled"})," 可禁用对应标签，禁用项点击不会切换。"]}),e.jsx("div",{children:e.jsx(o,{...K,children:e.jsx(w,{})})}),e.jsx("h2",{id:"api","data-anchor":"api",children:"API"}),e.jsx("h3",{id:"tabs-props","data-anchor":"tabs-props",children:"Tabs Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"active"})}),e.jsx("td",{children:"当前选中项标识符，受控模式"}),e.jsx("td",{children:e.jsx("code",{children:"TabsValue"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"defaultActive"})}),e.jsx("td",{children:"默认选中项标识符"}),e.jsx("td",{children:e.jsx("code",{children:"TabsValue"})}),e.jsx("td",{children:"第一个 Tab"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:"外观类型"}),e.jsx("td",{children:e.jsx("code",{children:"'line' | 'card' | 'capsule' | 'jumbo'"})}),e.jsx("td",{children:e.jsx("code",{children:"'line'"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"align"})}),e.jsx("td",{children:"非滚动模式下的对齐方式"}),e.jsx("td",{children:e.jsx("code",{children:"'start' | 'center'"})}),e.jsx("td",{children:e.jsx("code",{children:"center"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"color"})}),e.jsx("td",{children:"指示器与激活文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"background"})}),e.jsx("td",{children:"标签栏背景色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"#fff"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"border"})}),e.jsx("td",{children:"是否显示底部分隔线（仅 line）"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lineWidth"})}),e.jsx("td",{children:"自定义指示条宽度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lineHeight"})}),e.jsx("td",{children:"自定义指示条高度"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleActiveColor"})}),e.jsx("td",{children:"激活标签文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"主题色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleInactiveColor"})}),e.jsx("td",{children:"默认标签文字颜色"}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"设计稿默认色"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ellipsis"})}),e.jsx("td",{children:"是否省略过长标题"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeThreshold"})}),e.jsx("td",{children:"标签数量超过阈值后自动进入可滚动模式"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"5"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"animated"})}),e.jsx("td",{children:"是否开启指示条动画"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"duration"})}),e.jsx("td",{children:"指示条动画时长（ms）"}),e.jsx("td",{children:e.jsx("code",{children:"number | string"})}),e.jsx("td",{children:e.jsx("code",{children:"300"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"beforeChange"})}),e.jsxs("td",{children:["切换前的回调，返回 ",e.jsx("code",{children:"false"})," 可阻止切换，支持 Promise"]}),e.jsx("td",{children:e.jsx("code",{children:"(name: TabsValue) => boolean | Promise<boolean>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRender"})}),e.jsx("td",{children:"延迟渲染 Tab 内容"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"lazyRenderPlaceholder"})}),e.jsxs("td",{children:[e.jsx("code",{children:"lazyRender"})," 模式下未激活时的占位内容"]}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"swipeable"})}),e.jsxs("td",{children:["开启手势滑动切换，可传对象配置 ",e.jsx("code",{children:"autoHeight"}),"、",e.jsx("code",{children:"preventScroll"})]}),e.jsx("td",{children:"`boolean \\"}),e.jsx("td",{children:"TabsSwipeableConfig`"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"navLeft"})}),e.jsx("td",{children:"标签栏左侧扩展区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"navRight"})}),e.jsx("td",{children:"标签栏右侧扩展区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"navBottom"})}),e.jsx("td",{children:"标签栏下方扩展区域"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tabBarStyle"})}),e.jsx("td",{children:"标签栏容器样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tabStyle"})}),e.jsx("td",{children:"单个标签样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"titleStyle"})}),e.jsx("td",{children:"标题文字样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"descriptionStyle"})}),e.jsx("td",{children:"描述文字样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<TextStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"contentStyle"})}),e.jsx("td",{children:"内容区样式"}),e.jsx("td",{children:e.jsx("code",{children:"StyleProp<ViewStyle>"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onClickTab"})}),e.jsx("td",{children:"点击标签时触发"}),e.jsx("td",{children:e.jsx("code",{children:"(payload: TabsClickEvent) => void"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"onChange"})}),e.jsxs("td",{children:["当前激活标签改变时触发，参数为 ",e.jsx("code",{children:"(name, index)"})]}),e.jsx("td",{children:e.jsx("code",{children:"(name: TabsValue, index: number) => void"})}),e.jsx("td",{children:"-"})]})]})]}),e.jsx("h3",{id:"tabstabpane-props","data-anchor":"tabstabpane-props",children:"Tabs.TabPane Props"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"name"})}),e.jsxs("td",{children:["标签名称，匹配 ",e.jsx("code",{children:"active"})]}),e.jsx("td",{children:e.jsx("code",{children:"TabsValue"})}),e.jsx("td",{children:"索引"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:"标题"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:"副标题/描述"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"badge"})}),e.jsx("td",{children:"自定义徽标内容"}),e.jsx("td",{children:e.jsx("code",{children:"ReactNode"})}),e.jsx("td",{children:"-"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"disabled"})}),e.jsx("td",{children:"是否禁用"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"false"})})]})]})]}),e.jsx("h3",{id:"tabsswipeableconfig","data-anchor":"tabsswipeableconfig",children:"TabsSwipeableConfig"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"属性"}),e.jsx("th",{children:"说明"}),e.jsx("th",{children:"类型"}),e.jsx("th",{children:"默认值"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"autoHeight"})}),e.jsx("td",{children:"是否根据激活面板自适应高度"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"preventScroll"})}),e.jsx("td",{children:"是否锁定手势方向，避免垂直滚动误触切换"}),e.jsx("td",{children:e.jsx("code",{children:"boolean"})}),e.jsx("td",{children:e.jsx("code",{children:"true"})})]})]})]})]})})},Q=[{Component:B,key:"tabs-basic",sources:{_:{tsx:`import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Tabs } from 'react-native-system-ui'

const primaryColor = '#3a7afe'
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: \`\${prefix}-\${index}\`,
  title: \`标签名\${index}\`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const fullTabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const Pane: React.FC<{ children: React.ReactNode; tone?: 'default' | 'plain' }> = ({
  children,
  tone = 'default',
}) => (
  <View style={[styles.pane, tone === 'plain' ? styles.panePlain : null]}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab('line', item), desc: \`内容 \${item}\` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab('capsule', item), desc: \`内容 \${item}\` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab('jumbo', item), desc: \`内容 \${item}\`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab('card', item), desc: \`内容 \${item}\` }))

  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          tabStyle={fullTabStyle}
        >
          {lineTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="capsule"
          color={primaryColor}
          defaultActive={capsuleTabs[0].key}
          tabBarStyle={{ paddingHorizontal: 0 }}
          tabStyle={fullTabStyle}
        >
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="jumbo"
          color={primaryColor}
          defaultActive={jumboTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述信息"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
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
  panePlain: {
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
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: \`\${prefix}-\${index}\`,
  title: \`标签名\${index}\`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.block}>{children}</View>
)

const fullTabStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 }

const Pane: React.FC<{ children: React.ReactNode; tone?: 'default' | 'plain' }> = ({
  children,
  tone = 'default',
}) => (
  <View style={[styles.pane, tone === 'plain' ? styles.panePlain : null]}>
    {typeof children === 'string' || typeof children === 'number' ? (
      <Text style={styles.paneText}>{children}</Text>
    ) : (
      children
    )}
  </View>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab('line', item), desc: \`内容 \${item}\` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab('capsule', item), desc: \`内容 \${item}\` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab('jumbo', item), desc: \`内容 \${item}\`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab('card', item), desc: \`内容 \${item}\` }))

  return (
    <View style={styles.root}>
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          tabStyle={fullTabStyle}
        >
          {lineTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="capsule"
          color={primaryColor}
          defaultActive={capsuleTabs[0].key}
          tabBarStyle={{ paddingHorizontal: 0 }}
          tabStyle={fullTabStyle}
        >
          {capsuleTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          border
          type="jumbo"
          color={primaryColor}
          defaultActive={jumboTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述信息"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
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
  panePlain: {
    backgroundColor: '#ffffff',
  },
  paneText: {
    fontSize: 14,
    color: '#323233',
    lineHeight: 22,
  },
})
`}},title:"基础用法",identifier:"tabs-basic",lang:"tsx",meta:{title:"基础用法"}},{Component:P,key:"tabs-name-match",sources:{_:{tsx:`import React from 'react'
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
`}},title:"通过名称匹配",identifier:"tabs-name-match",lang:"tsx",meta:{title:"通过名称匹配"}},{Component:C,key:"tabs-swipeable",sources:{_:{tsx:`import React from 'react'
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
`}},title:"滑动切换",identifier:"tabs-swipeable",lang:"tsx",meta:{title:"滑动切换"}},{Component:S,key:"tabs-scrollable",sources:{_:{tsx:`import React from 'react'
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


`}},title:"标签栏滚动",identifier:"tabs-scrollable",lang:"tsx",meta:{title:"标签栏滚动"}},{Component:w,key:"tabs-disabled",sources:{_:{tsx:`import React from 'react'
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


`}},title:"禁用标签",identifier:"tabs-disabled",lang:"tsx",meta:{title:"禁用标签"}}],U={simulator:{compact:!0}},X=[{depth:1,text:"Tabs 标签页",id:"tabs-标签页"},{depth:2,text:"介绍",id:"介绍"},{depth:2,text:"引入",id:"引入"},{depth:2,text:"代码演示",id:"代码演示"},{depth:3,text:"基础用法",id:"基础用法"},{depth:3,text:"通过名称匹配",id:"通过名称匹配"},{depth:3,text:"滑动切换",id:"滑动切换"},{depth:3,text:"标签栏滚动",id:"标签栏滚动"},{depth:3,text:"禁用标签",id:"禁用标签"},{depth:2,text:"API",id:"api"},{depth:3,text:"Tabs Props",id:"tabs-props"},{depth:3,text:"Tabs.TabPane Props",id:"tabstabpane-props"},{depth:3,text:"TabsSwipeableConfig",id:"tabsswipeableconfig"}],Y="/docs/components/tabs.md",Z="Tabs 标签页",ee="1769570039000",fe=n=>n.children({MdContent:O,demos:Q,frontmatter:U,slugs:X,filePath:Y,title:Z,updatedTime:ee});export{O as MdContent,fe as default,Q as demos,Y as filePath,U as frontmatter,X as slugs,Z as title,ee as updatedTime};
