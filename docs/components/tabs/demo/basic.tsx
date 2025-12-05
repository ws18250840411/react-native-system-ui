import React from "react"

import { Tabs } from "react-native-system-ui"
import "./style.css"

const primaryColor = "#3a7afe"
const baseTabs = [1, 2, 3]

const makeTab = (prefix: string, index: number) => ({
  key: `${prefix}-${index}`,
  title: `标签${index}`,
})

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="demo-tabs__block">{children}</div>
)

const fullTabStyle = { flexBasis: `${100 / baseTabs.length}%`, flexGrow: 0 }
const scrollTabs = Array.from({ length: 8 }).map((_, idx) => makeTab("scroll", idx + 1))

const Pane: React.FC<{ children: React.ReactNode; tone?: "default" | "plain" }> = ({ children, tone = "default" }) => (
  <div className={`demo-tabs__pane${tone === "plain" ? " demo-tabs__pane--plain" : ""}`}>{children}</div>
)

export default function TabsBasicDemo() {
  const lineTabs = baseTabs.map(item => ({ ...makeTab("line", item), desc: `下划线标签页 ${item}` }))
  const capsuleTabs = baseTabs.map(item => ({ ...makeTab("capsule", item), desc: `胶囊标签页 ${item}` }))
  const jumboTabs = baseTabs.map(item => ({ ...makeTab("jumbo", item), desc: `带描述信息的标签页 ${item}`, badge: item }))
  const cardTabs = baseTabs.map(item => ({ ...makeTab("card", item), desc: `卡片标签页 ${item}` }))

  return (
    <div className="demo-tabs">
      <DemoBlock>
        <Tabs
          defaultActive={lineTabs[0].key}
          border={false}
          color={primaryColor}
          titleActiveColor={primaryColor}
          align="start"
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
          align="start"
          tabStyle={fullTabStyle}
          tabBarStyle={{ paddingHorizontal: 0 }}
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
          align="start"
          tabStyle={fullTabStyle}
        >
          {jumboTabs.map(tab => (
            <Tabs.TabPane
              key={tab.key}
              name={tab.key}
              title={tab.title}
              description="描述内容"
              badge={tab.badge}
            >
              <Pane>{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          defaultActive={scrollTabs[3].key}
          color={primaryColor}
          swipeThreshold={4}
          ellipsis={false}
        >
          {scrollTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane>{`内容 ${tab.title.replace("标签", "")}`}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>

      <DemoBlock>
        <Tabs
          type="card"
          color={primaryColor}
          defaultActive={cardTabs[0].key}
          align="start"
          tabStyle={fullTabStyle}
        >
          {cardTabs.map(tab => (
            <Tabs.TabPane key={tab.key} name={tab.key} title={tab.title}>
              <Pane tone="plain">{tab.desc}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </div>
  )
}
