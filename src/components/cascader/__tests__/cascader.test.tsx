import React from "react"
import renderer, { act } from "react-test-renderer"

import Cascader from ".."
import { PortalHost } from "../../portal"
import type { CascaderOption } from "../types"

const options: CascaderOption[] = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      {
        text: "杭州",
        value: "hangzhou",
        children: [
          { text: "西湖区", value: "xihu" },
          { text: "余杭区", value: "yuhang" },
        ],
      },
    ],
  },
  {
    text: "江苏",
    value: "jiangsu",
    children: [
      {
        text: "苏州",
        value: "suzhou",
        children: [
          { text: "园区", value: "yuanqu" },
        ],
      },
    ],
  },
]

describe("Cascader", () => {
  it("notifies change and finish", () => {
    const handleChange = jest.fn()
    const handleFinish = jest.fn()
    const tree = renderer.create(<Cascader options={options} onChange={handleChange} onFinish={handleFinish} />)

    const firstOption = tree.root.findByProps({ testID: "cascader-option-0-zhejiang" })
    act(() => {
      firstOption.props.onPress()
    })

    expect(handleChange).toHaveBeenCalledWith(["zhejiang"], [options[0]])

    const secondOption = tree.root.findByProps({ testID: "cascader-option-1-hangzhou" })
    act(() => {
      secondOption.props.onPress()
    })

    expect(handleChange).toHaveBeenLastCalledWith(["zhejiang", "hangzhou"], [options[0], options[0].children?.[0]])

    const thirdOption = tree.root.findByProps({ testID: "cascader-option-2-xihu" })
    act(() => {
      thirdOption.props.onPress()
    })

    expect(handleFinish).toHaveBeenCalledWith(
      ["zhejiang", "hangzhou", "xihu"],
      [options[0], options[0].children?.[0], options[0].children?.[0]?.children?.[0]],
    )
  })

  it("closes popup after finish when poppable", () => {
    const handleFinish = jest.fn()
    const handleVisibleChange = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <Cascader poppable defaultVisible options={options} onFinish={handleFinish} onVisibleChange={handleVisibleChange}>
          {() => null}
        </Cascader>
      </PortalHost>,
    )

    const first = tree.root.findByProps({ testID: "cascader-option-0-zhejiang" })
    act(() => {
      first.props.onPress()
    })
    const second = tree.root.findByProps({ testID: "cascader-option-1-hangzhou" })
    act(() => {
      second.props.onPress()
    })
    const third = tree.root.findByProps({ testID: "cascader-option-2-xihu" })
    act(() => {
      third.props.onPress()
    })

    expect(handleFinish).toHaveBeenCalled()
    expect(handleVisibleChange).toHaveBeenCalledWith(false)
  })
})
