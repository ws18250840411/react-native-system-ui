import React from 'react'
import { act, create } from 'react-test-renderer'
import DatetimePicker from '../DatetimePicker'
jest.mock('../../picker', () => {
  const { View, Text, TouchableOpacity } = require('react-native')
  return (props: any) => (
    <View testID="picker-mock">
      {props.columns.map((col: any, colIndex: number) => (
        <View key={colIndex} testID={`column-${colIndex}`}>
          {col.map((item: any) => (
            <TouchableOpacity
              key={item.value}
              testID={`item-${colIndex}-${item.value}`}
              onPress={() => {
                const nextValue = [...props.value]
                nextValue[colIndex] = item.value
                props.onChange(nextValue)
              }}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity testID="confirm-btn" onPress={props.onConfirm} />
    </View>
  )
})

describe('DatetimePicker', () => {
  it('formats and clamps date values', () => {
    const onConfirm = jest.fn()
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2025, 11, 31)

    const tree = create(
      <DatetimePicker
        type="date"
        minDate={minDate}
        maxDate={maxDate}
        value={new Date(2023, 5, 15)}
        onConfirm={onConfirm}
      />
    )

    const confirmBtn = tree.root.findByProps({ testID: 'confirm-btn' })
    act(() => {
      confirmBtn.props.onPress()
    })

    expect(onConfirm).toHaveBeenCalledWith(new Date(2023, 5, 15))
  })

  it('emits time string when type is time', () => {
    const onConfirm = jest.fn()
    const tree = create(
      <DatetimePicker
        type="time"
        value="12:30"
        onConfirm={onConfirm}
      />
    )

    const confirmBtn = tree.root.findByProps({ testID: 'confirm-btn' })
    act(() => {
      confirmBtn.props.onPress()
    })

    expect(onConfirm).toHaveBeenCalledWith('12:30')
  })

  it('respects minDate and maxDate', () => {
    const onConfirm = jest.fn()
    const minDate = new Date(2023, 0, 10)
    const maxDate = new Date(2023, 0, 20)

    let tree = create(
      <DatetimePicker
        type="date"
        minDate={minDate}
        maxDate={maxDate}
        value={new Date(2023, 0, 1)}
        onConfirm={onConfirm}
      />
    )

    let confirmBtn = tree.root.findByProps({ testID: 'confirm-btn' })
    act(() => {
      confirmBtn.props.onPress()
    })
    expect(onConfirm).toHaveBeenLastCalledWith(minDate)

    tree = create(
      <DatetimePicker
        type="date"
        minDate={minDate}
        maxDate={maxDate}
        value={new Date(2023, 0, 25)}
        onConfirm={onConfirm}
      />
    )

    confirmBtn = tree.root.findByProps({ testID: 'confirm-btn' })
    act(() => {
      confirmBtn.props.onPress()
    })
    expect(onConfirm).toHaveBeenLastCalledWith(maxDate)
  })

  it('handles year-month type', () => {
    const onConfirm = jest.fn()
    const tree = create(
      <DatetimePicker
        type="year-month"
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        value={new Date(2023, 5, 15)}
        onConfirm={onConfirm}
      />
    )

    const confirmBtn = tree.root.findByProps({ testID: 'confirm-btn' })
    act(() => {
      confirmBtn.props.onPress()
    })

    expect(onConfirm).toHaveBeenCalledWith(new Date(2023, 5, 1))

    const columns = tree.root.findAllByType(require('react-native').View).filter(n => n.props.testID?.startsWith('column-'))
    expect(columns.length).toBe(2)
  })

  it('supports filter prop', () => {
    const filter = (type: string, values: string[]) => {
      if (type === 'minute') {
        return values.filter(v => parseInt(v) % 15 === 0)
      }
      return values
    }

    const tree = create(
      <DatetimePicker
        type="time"
        value="12:00"
        filter={filter}
      />
    )

    const minuteColumn = tree.root.findByProps({ testID: 'column-1' })
    const items = minuteColumn.props.children
    expect(items.length).toBe(4)
    expect(items[1].key).toBe('15')
  })

  it('supports minHour and maxHour', () => {
    const tree = create(
      <DatetimePicker
        type="time"
        minHour={9}
        maxHour={18}
        value="08:00"
      />
    )

    const hourColumn = tree.root.findByProps({ testID: 'column-0' })
    const items = hourColumn.props.children
    expect(items.length).toBe(10)
    expect(items[0].key).toBe('09')
    expect(items[items.length - 1].key).toBe('18')
  })
})
