import React from "react"

import { Tabs } from "react-native-system-ui"
import "./style.css"

const sections = [
  {
    key: "feed",
    title: "推荐",
    desc: "根据你的偏好推荐图文与视频内容。",
  },
  {
    key: "city",
    title: "同城",
    desc: "发现附近正在发生的活动与话题。",
  },
  {
    key: "rank",
    title: "榜单",
    desc: "实时刷新的人气榜单，展示热度最高的条目。",
  },
]

const DemoBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="demo-tabs__block">{children}</div>
)

const Pane: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="demo-tabs__pane">
    <h4 style={{ marginBottom: 6 }}>{title}</h4>
    <p style={{ margin: 0, lineHeight: 1.6 }}>{desc}</p>
  </div>
)

export default function TabsSwipeableDemo() {
  return (
    <div className="demo-tabs">
      <DemoBlock>
        <Tabs
          swipeable={{ autoHeight: true }}
          lazyRender
          lazyRenderPlaceholder={<Pane title="加载中" desc="滑动即可查看内容" />}
          color="#3a7afe"
          titleActiveColor="#3a7afe"
        >
          {sections.map(section => (
            <Tabs.TabPane key={section.key} name={section.key} title={section.title}>
              <Pane title={`「${section.title}」频道`} desc={section.desc} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
    </div>
  )
}
