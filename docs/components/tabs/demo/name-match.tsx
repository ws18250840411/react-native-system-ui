import React from "react"

import { Tabs } from "react-native-system-ui"
import "./style.css"

const panes = [
  { name: "a", label: "标签1", content: "通过 name=\"a\" 匹配" },
  { name: "b", label: "标签2", content: "可以与受控 active 联动" },
  { name: "c", label: "标签3", content: "默认激活第三项" },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="demo-tabs__block">{children}</div>
)

const Pane: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="demo-tabs__pane">{children}</div>
)

export default function TabsNameMatchDemo() {
  return (
    <div className="demo-tabs">
      <DemoBlock>
        <Tabs defaultActive="c" align="start" color="#3a7afe" titleActiveColor="#3a7afe">
          {panes.map(item => (
            <Tabs.TabPane key={item.name} name={item.name} title={item.label}>
              <Pane>{item.content}</Pane>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </div>
  )
}
