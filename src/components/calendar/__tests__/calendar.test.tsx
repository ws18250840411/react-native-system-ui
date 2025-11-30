import React from "react"
import renderer, { act } from "react-test-renderer"

import Calendar from ".."

describe("Calendar", () => {
  it("selects single date", () => {
    const handleSelect = jest.fn()
    const january2024 = new Date(2024, 0, 1)
    const tree = renderer.create(
      <Calendar
        defaultValue={january2024}
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        onSelect={handleSelect}
      />,
    )

    const dayButton = tree.root.findByProps({ testID: "calendar-day-2024-01-20" })

    act(() => {
      dayButton.props.onPress()
    })

    expect(handleSelect).toHaveBeenCalledTimes(1)
    const selectedDate = handleSelect.mock.calls[0][0]
    expect(selectedDate).toBeInstanceOf(Date)
    expect(selectedDate.getFullYear()).toBe(2024)
    expect(selectedDate.getMonth()).toBe(0)
    expect(selectedDate.getDate()).toBe(20)
  })
})
