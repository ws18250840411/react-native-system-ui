import React from 'react'
import renderer from 'react-test-renderer'

import Picker from '../../picker'
import Area from '..'
import type { AreaList } from '../types'

const areaList: AreaList = {
  province_list: {
    '110000': '北京',
    '310000': '上海',
  },
  city_list: {
    '110100': '北京市',
    '310100': '上海市',
  },
  county_list: {
    '110101': '东城区',
    '110102': '西城区',
    '310101': '黄浦区',
  },
}

describe('Area', () => {
  it('passes cascade columns to Picker', () => {
    const tree = renderer.create(<Area areaList={areaList} columnsNum={3} />)
    const picker = tree.root.findByType(Picker)
    const columns = picker.props.columns as any[]

    expect(columns).toHaveLength(2)
    expect(columns[0].children?.length).toBeGreaterThan(0)
    expect(columns[0].children?.[0].children?.[0].label).toBe('东城区')
  })

  it('triggers onChange with normalized values', () => {
    const onChange = jest.fn()
    const tree = renderer.create(<Area areaList={areaList} onChange={onChange} />)
    const picker = tree.root.findByType(Picker)

    picker.props.onChange?.(['110000', '110100', '110101'], [
      { label: '北京', value: '110000' },
      { label: '北京市', value: '110100' },
      { label: '东城区', value: '110101' },
    ])

    expect(onChange).toHaveBeenCalledWith(
      ['110000', '110100', '110101'],
      expect.arrayContaining([
        expect.objectContaining({ label: '北京' }),
      ]),
    )
  })

  it('passes value and defaultValue to Picker', () => {
      const tree = renderer.create(
          <Area areaList={areaList} value="110101" defaultValue="110101" />
      )
      const picker = tree.root.findByType(Picker)
      expect(picker.props.value).toBe('110101')
      expect(picker.props.defaultValue).toBe('110101')
  })

  it('generates 2 columns when columnsNum is 2', () => {
      const tree = renderer.create(<Area areaList={areaList} columnsNum={2} />)
      const picker = tree.root.findByType(Picker)
      expect(picker.props.columns).toHaveLength(2)
  })

  it('handles confirm event', () => {
      const onConfirm = jest.fn()
      const tree = renderer.create(<Area areaList={areaList} onConfirm={onConfirm} />)
      const picker = tree.root.findByType(Picker)
      
      picker.props.onConfirm?.(['110000'], [{ label: 'Beijing', value: '110000' }])
      expect(onConfirm).toHaveBeenCalled()
  })
})
