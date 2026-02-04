import React from "react"
import { Text } from "react-native"
import renderer, { act } from "react-test-renderer"

import Calendar from ".."
import { Portal, PortalHost } from "../../portal"

describe("Calendar", () => {
  afterEach(() => {
    act(() => {
      Portal.clear()
    })
  })

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

  it("disables days before min date", () => {
    const tree = renderer.create(
      <Calendar
        defaultValue={new Date(2024, 0, 15)}
        minDate={new Date(2024, 0, 10)}
        maxDate={new Date(2024, 0, 31)}
        showConfirm={false}
      />,
    )

    const disabledDay = tree.root.findByProps({ testID: "calendar-day-2024-01-05" })
    expect(disabledDay.props.disabled).toBe(true)
  })

  it("respects maxRange in range mode", () => {
    const handleSelect = jest.fn()
    const handleOverRange = jest.fn()
    const tree = renderer.create(
      <Calendar
        type="range"
        defaultValue={new Date(2024, 0, 5)}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 0, 31)}
        maxRange={2}
        onSelect={handleSelect}
        onOverRange={handleOverRange}
      />,
    )

    const start = tree.root.findByProps({ testID: "calendar-day-2024-01-05" })
    const far = tree.root.findByProps({ testID: "calendar-day-2024-01-10" })

    act(() => {
      start.props.onPress()
    })
    act(() => {
      far.props.onPress()
    })

    expect(handleSelect).toHaveBeenCalledTimes(1)
    expect(handleOverRange).toHaveBeenCalledTimes(1)
  })

  it("allows selecting same day when allowSameDay is true", () => {
    const handleSelect = jest.fn()
    const selected = new Date(2024, 0, 12)
    const tree = renderer.create(
      <Calendar
        type="range"
        allowSameDay
        defaultValue={selected}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 0, 31)}
        onSelect={handleSelect}
      />,
    )

    const day = tree.root.findByProps({ testID: "calendar-day-2024-01-12" })

    act(() => {
      day.props.onPress()
    })

    const lastCall = handleSelect.mock.calls[handleSelect.mock.calls.length - 1][0] as Date[]
    expect(Array.isArray(lastCall)).toBe(true)
    expect(lastCall).toHaveLength(2)
    expect(lastCall[0].getDate()).toBe(12)
    expect(lastCall[1].getDate()).toBe(12)
  })

  it("auto closes popup when confirming in poppable mode", () => {
    const handleVisibleChange = jest.fn()
    const handleConfirm = jest.fn()
    const tree = renderer.create(
      <PortalHost>
        <Calendar
          poppable
          defaultVisible
          showConfirm={false}
          defaultValue={new Date(2024, 0, 1)}
          minDate={new Date(2024, 0, 1)}
          maxDate={new Date(2024, 0, 31)}
          onVisibleChange={handleVisibleChange}
          onConfirm={handleConfirm}
        />
      </PortalHost>,
    )

    const dayButtons = tree.root.findAllByProps({ testID: "calendar-day-2024-01-10" })
    expect(dayButtons.length).toBeGreaterThan(0)
    const dayButton = dayButtons[0]

    act(() => {
      dayButton.props.onPress()
    })

    expect(handleConfirm).toHaveBeenCalledTimes(1)
    expect(handleVisibleChange).toHaveBeenCalledWith(false)
  })

  it("allows navigating months after selecting a value", () => {
    const tree = renderer.create(
      <Calendar
        defaultValue={new Date(2024, 0, 20)}
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
      />,
    )

    const nextButton = tree.root.findByProps({ testID: "calendar-nav-next" })

    act(() => {
      nextButton.props.onPress()
    })

    expect(tree.root.findByProps({ testID: "calendar-day-2024-02-01" })).toBeTruthy()
  })

  it("allows navigating months after reopening in poppable mode", () => {
    let visible = true
    let selected: Date | null = new Date(2024, 0, 20)

    const tree = renderer.create(
      <PortalHost>
        <Calendar
          poppable
          visible={visible}
          value={selected}
          showConfirm={false}
          minDate={new Date(2023, 0, 1)}
          maxDate={new Date(2025, 11, 31)}
          onSelect={next => {
            selected = next as Date
          }}
          onVisibleChange={next => {
            visible = next
          }}
        />
      </PortalHost>,
    )

    const dayButtons = tree.root.findAllByProps({ testID: "calendar-day-2024-01-10" })
    expect(dayButtons.length).toBeGreaterThan(0)
    const dayButton = dayButtons[0]

    act(() => {
      dayButton.props.onPress()
    })

    act(() => {
      tree.update(
        <PortalHost>
          <Calendar
            poppable
            visible={visible}
            value={selected}
            showConfirm={false}
            minDate={new Date(2023, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
            onSelect={next => {
              selected = next as Date
            }}
            onVisibleChange={next => {
              visible = next
            }}
          />
        </PortalHost>,
      )
    })

    act(() => {
      visible = true
      tree.update(
        <PortalHost>
          <Calendar
            poppable
            visible={visible}
            value={selected}
            showConfirm={false}
            minDate={new Date(2023, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
            onSelect={next => {
              selected = next as Date
            }}
            onVisibleChange={next => {
              visible = next
            }}
          />
        </PortalHost>,
      )
    })

    const nextButtons = tree.root.findAllByProps({ testID: "calendar-nav-next" })
    expect(nextButtons.length).toBeGreaterThan(0)
    const nextButton = nextButtons[0]
    act(() => {
      nextButton.props.onPress()
    })

    const febDays = tree.root.findAllByProps({ testID: "calendar-day-2024-02-01" })
    expect(febDays.length).toBeGreaterThan(0)
  })

  it('respects weekStartsOn', () => {
    
    const date = new Date(2023, 0, 1)
    const tree = renderer.create(
      <Calendar
        value={date}
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2023, 0, 31)}
        weekStartsOn={1} 
      />
    )
    
    
    const weekLabels = tree.root.findAllByType(Text)
      .filter(n => ['一', '二', '三', '四', '五', '六', '日'].includes(n.props.children))
    
    expect(weekLabels[0].props.children).toBe('一')
    expect(weekLabels[6].props.children).toBe('日')
  })

  it('formats month title', () => {
    const date = new Date(2023, 0, 1)
    const tree = renderer.create(
      <Calendar
        value={date}
        formatMonthTitle={d => `Title ${d.getMonth() + 1}`}
      />
    )
    
    // Header subtitle
    const texts = tree.root.findAllByType(Text)
    const title = texts.find(n => n.props.children === 'Title 1')
    expect(title).toBeDefined()
  })
})
