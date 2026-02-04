

import React, { act, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'

import { Checkbox } from '..'

const click = (element: Element) => {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
}

const findElementByText = (root: ParentNode, text: string) => {
  const all = Array.from(root.querySelectorAll('*'))
  return all.find(el => el.textContent === text)
}

describe('Checkbox (DOM)', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })
    container.remove()
  })

  it('toggles controlled state when clicking label', () => {
    function Controlled() {
      const [checked, setChecked] = useState(false)
      return (
        <Checkbox checked={checked} onChange={setChecked}>
          复选框
        </Checkbox>
      )
    }

    act(() => {
      root.render(<Controlled />)
    })

    const label = findElementByText(container, '复选框')
    expect(label).toBeTruthy()

    act(() => {
      click(label!)
    })
    expect(container.textContent).toContain('✓')

    act(() => {
      click(label!)
    })
    expect(container.textContent).not.toContain('✓')
  })

  it('respects labelDisabled (label does not toggle, icon toggles)', () => {
    act(() => {
      root.render(
        <Checkbox defaultChecked labelDisabled>
          禁止文本点击
        </Checkbox>
      )
    })

    expect(container.textContent).toContain('✓')

    const label = findElementByText(container, '禁止文本点击')
    expect(label).toBeTruthy()

    act(() => {
      click(label!)
    })
    expect(container.textContent).toContain('✓')

    const checkbox = container.querySelector('[role="checkbox"]')
    expect(checkbox).toBeTruthy()

    act(() => {
      click(checkbox!)
    })
    expect(container.textContent).not.toContain('✓')
  })
})
