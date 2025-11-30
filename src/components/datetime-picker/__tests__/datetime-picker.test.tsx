import React from "react"
import renderer, { act } from "react-test-renderer"

import DatetimePicker from ".."
import Picker from "../../picker"

describe("DatetimePicker", () => {
  it("formats and clamps date values", () => {
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2020, 11, 31)
    const handleChange = jest.fn()
    const tree = renderer.create(
      <DatetimePicker type="date" minDate={minDate} maxDate={maxDate} onChange={handleChange} />,
    )

    const picker = tree.root.findByType(Picker)

    act(() => {
      picker.props.onChange(["2021", "02", "30"], [])
    })

    expect(handleChange).toHaveBeenCalled()
    const nextDate = handleChange.mock.calls[0][0] as Date
    expect(nextDate.getFullYear()).toBe(2020)
  })

  it("emits time string when type is time", () => {
    const handleConfirm = jest.fn()
    const tree = renderer.create(
      <DatetimePicker type="time" minHour={9} defaultValue="09:30" onConfirm={handleConfirm} />,
    )
    const picker = tree.root.findByType(Picker)

    act(() => {
      picker.props.onChange(["10", "45"], [])
      picker.props.onConfirm()
    })

    expect(handleConfirm).toHaveBeenCalledWith("10:45")
  })
})
