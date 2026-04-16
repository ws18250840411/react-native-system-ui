import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { View, Text, Pressable } from 'react-native'
import Slider from '..'
jest.mock('../../../hooks/aria/rn-aria/utils', () => ({ isRTL: jest.fn(() => false) }))
const getStyleVal = (style: unknown, key: string): unknown => {
  if (!style) return undefined
  if (Array.isArray(style)) { for (const it of style) { const v = getStyleVal(it, key); if (typeof v !== 'undefined') return v }; return undefined }
  return typeof style === 'object' ? (style as Record<string, unknown>)[key] : undefined
}
const isThumb = (node: renderer.ReactTestInstance) =>
  Array.isArray(node.props.style) &&
  node.props.style.some((s: unknown) => {
    if (!s || typeof s !== 'object') return false; const o = s as Record<string, unknown>
    return o.borderColor !== undefined && o.borderRadius !== undefined && typeof o.left === 'string'
  })
const mockRTL = () => (jest.requireMock('../../../hooks/aria/rn-aria/utils') as { isRTL: jest.Mock }).isRTL
describe('Slider', () => {
  beforeEach(() => mockRTL().mockReturnValue(false))
  it('renders single value slider', () => { expect(renderer.create(<Slider value={30} min={0} max={100} />).toJSON()).toBeTruthy() })
  it('renders range slider with two thumbs', () => {
    expect(renderer.create(<Slider range value={[20, 60]} />).root.findAll(n => isThumb(n)).length).toBeGreaterThanOrEqual(2)
  })
  it('reverses horizontal direction in RTL by default', () => {
    mockRTL().mockReturnValue(true); const thumb = renderer.create(<Slider value={0} min={0} max={100} />).root.findAll(n => isThumb(n))[0]
    expect(getStyleVal(thumb.props.style, 'left')).toBe('100%'); expect(getStyleVal(thumb.props.style, 'top')).toBe('50%')
  })
  it('centers thumb on cross axis for vertical slider', () => {
    const thumb = renderer.create(<Slider vertical value={50} min={0} max={100} />).root.findAll(n => isThumb(n))[0]
    expect(getStyleVal(thumb.props.style, 'left')).toBe('50%'); expect(getStyleVal(thumb.props.style, 'top')).toBe('50%')
  })
  it('updates repeatedly without crashing (perf smoke)', () => {
    let tree: renderer.ReactTestRenderer; act(() => { tree = renderer.create(<Slider value={0} min={0} max={100} />) })
    act(() => { for (let i = 1; i <= 200; i++) tree!.update(<Slider value={i % 101} min={0} max={100} />) }); expect(tree!.toJSON()).toBeTruthy()
  })
  it('renders custom thumb', () => {
    const tree = renderer.create(<Slider value={50} thumb={<Text>Thumb</Text>} />); expect(tree.root.findByType(Text).props.children).toBe('Thumb')
  })
  it('respects disabled state', () => {
    const onChange = jest.fn(); const tree = renderer.create(<Slider value={50} onChange={onChange} disabled />)
    expect(tree.root.findAllByType(View).find(v => v.props.pointerEvents === 'none')).toBeDefined(); expect(tree.root.findByType(Pressable).props.disabled).toBe(true)
  })
  const pressTrack = (track: renderer.ReactTestInstance, layout: { w: number; h: number }, loc: { x: number; y: number }) => {
    act(() => { track.props.onLayout?.({ nativeEvent: { layout: { width: layout.w, height: layout.h, x: 0, y: 0 } } }) })
    act(() => { track.props.onPress?.({ nativeEvent: { locationX: loc.x, locationY: loc.y, pageX: loc.x, pageY: loc.y }, preventDefault: jest.fn() }) })
  }
  it('jumps to clicked position on horizontal track', () => {
    const onChange = jest.fn(); const track = renderer.create(<Slider value={0} min={0} max={100} onChange={onChange} />).root.findByType(Pressable)
    pressTrack(track, { w: 100, h: 10 }, { x: 50, y: 0 }); expect(onChange).toHaveBeenCalled(); expect(onChange.mock.calls[0][0]).toBe(50)
  })
  it('jumps to clicked position on vertical track', () => {
    const onChange = jest.fn(); const track = renderer.create(<Slider vertical value={0} min={0} max={100} onChange={onChange} />).root.findByType(Pressable)
    pressTrack(track, { w: 10, h: 200 }, { x: 0, y: 150 }); expect(onChange).toHaveBeenCalled(); expect(onChange.mock.calls[0][0]).toBe(25)
  })
  it('respects step', () => {
    const onChange = jest.fn(); const track = renderer.create(<Slider value={0} min={0} max={10} step={2} onChange={onChange} />).root.findByType(Pressable)
    pressTrack(track, { w: 100, h: 10 }, { x: 40, y: 0 }); expect(onChange).toHaveBeenCalled(); expect(onChange.mock.calls[0][0]).toBe(4)
  })
  const naBtn = (v: unknown) => <Text testID="slider-value">{Array.isArray(v) ? (v as unknown[]).join(',') : String(v)}</Text>
  it('falls back when min is NaN', () => {
    const t = renderer.create(<Slider value={50} min={Number.NaN} max={100} button={({ value }) => naBtn(value)} />).root.findByProps({ testID: 'slider-value' })
    expect(String(t.props.children)).not.toContain('NaN')
  })
  it('does not crash when thumb/button is a string', () => {
    expect(() => renderer.create(<Slider value={50} thumb="drag" />)).not.toThrow()
    expect(() => renderer.create(<Slider range value={[20, 80]} leftThumb="L" rightThumb="R" />)).not.toThrow()
  })
  it('falls back when max is NaN', () => {
    const t = renderer.create(<Slider value={50} min={0} max={Number.NaN} button={({ value }) => naBtn(value)} />).root.findByProps({ testID: 'slider-value' })
    expect(String(t.props.children)).not.toContain('NaN')
  })
})
