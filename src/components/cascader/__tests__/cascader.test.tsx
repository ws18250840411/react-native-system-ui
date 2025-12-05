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

  it("keeps popup open for async branch then closes after child loaded", () => {
    const handleVisibleChange = jest.fn()
    const handleFinish = jest.fn()
    const asyncOptions: CascaderOption[] = [
      {
        text: "浙江",
        value: "zhejiang",
        children: [],
      },
    ]

    const renderTree = (opts: CascaderOption[]) =>
      renderer.create(
        <PortalHost>
          <Cascader
            poppable
            defaultVisible
            options={opts}
            onVisibleChange={handleVisibleChange}
            onFinish={handleFinish}
          >
            {() => null}
          </Cascader>
        </PortalHost>,
      )

    const tree = renderTree(asyncOptions)

    const province = tree.root.findByProps({ testID: "cascader-option-0-zhejiang" })
    act(() => {
      province.props.onPress()
    })

    // 选中省份后因 children 为空但字段存在，弹层不应关闭
    expect(handleVisibleChange).not.toHaveBeenCalledWith(false)
    expect(handleFinish).not.toHaveBeenCalled()

    // 模拟异步加载完成后补充子级，再次更新组件
    const loadedOptions: CascaderOption[] = [
      {
        ...asyncOptions[0],
        children: [
          { text: "杭州", value: "hangzhou" },
          { text: "宁波", value: "ningbo" },
        ],
      },
    ]

    act(() => {
      tree.update(
        <PortalHost>
          <Cascader
            poppable
            defaultVisible
            options={loadedOptions}
            onVisibleChange={handleVisibleChange}
            onFinish={handleFinish}
          >
            {() => null}
          </Cascader>
        </PortalHost>,
      )
    })

    const city = tree.root.findByProps({ testID: "cascader-option-1-hangzhou" })
    act(() => {
      city.props.onPress()
    })

    expect(handleFinish).toHaveBeenCalledWith(
      ["zhejiang", "hangzhou"],
      [loadedOptions[0], loadedOptions[0].children?.[0]],
    )
    expect(handleVisibleChange).toHaveBeenCalledWith(false)
  })
})
