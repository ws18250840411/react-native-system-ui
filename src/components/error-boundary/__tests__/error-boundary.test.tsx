import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { Text, View } from 'react-native'

import { ErrorBoundary } from '..'
import type { ErrorBoundaryRef } from '..'

const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('Test error')
  return <Text>Normal render</Text>
}

const originalConsoleError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : (args[0] instanceof Error ? args[0].message : '')
    const full = args.map(a => (typeof a === 'string' ? a : a instanceof Error ? a.message : '')).join(' ')
    if (
      msg.includes('Error: Uncaught') ||
      msg.includes('The above error occurred') ||
      msg.includes('React will try to recreate') ||
      msg.includes('Test error') ||
      full.includes('ThrowError') ||
      full.includes('Test error')
    ) {
      return
    }
    originalConsoleError(...args)
  }
})
afterAll(() => {
  console.error = originalConsoleError
})

describe('ErrorBoundary', () => {
  it('renders children normally when no error', () => {
    const tree = renderer.create(
      <ErrorBoundary>
        <Text>Hello</Text>
      </ErrorBoundary>,
    )
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('Hello')
  })

  it('renders null fallback by default when an error occurs', () => {
    const tree = renderer.create(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )
    expect(tree.root.findAllByType(Text).length).toBe(0)
  })

  it('renders static fallback node when provided', () => {
    const tree = renderer.create(
      <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )
    const text = tree.root.findByType(Text)
    expect(text.props.children).toBe('Something went wrong')
  })

  it('renders function fallback with error and reset', () => {
    const tree = renderer.create(
      <ErrorBoundary
        fallback={(error, reset) => (
          <View>
            <Text testID="error-msg">{error.message}</Text>
            <Text testID="reset-fn">{typeof reset}</Text>
          </View>
        )}
      >
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )
    const errorMsg = tree.root.findByProps({ testID: 'error-msg' })
    expect(errorMsg.props.children).toBe('Test error')

    const resetType = tree.root.findByProps({ testID: 'reset-fn' })
    expect(resetType.props.children).toBe('function')
  })

  it('calls onError when an error is caught', () => {
    const onError = jest.fn()
    renderer.create(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error)
    expect(onError.mock.calls[0][0].message).toBe('Test error')
  })

  it('supports reset via ref', () => {
    const ref = React.createRef<ErrorBoundaryRef>()
    let shouldThrow = true

    const Wrapper: React.FC = () => (
      <ErrorBoundary ref={ref} fallback={<Text>Error</Text>}>
        {shouldThrow ? <ThrowError shouldThrow /> : <Text>Recovered</Text>}
      </ErrorBoundary>
    )

    const tree = renderer.create(<Wrapper />)

    expect(tree.root.findByType(Text).props.children).toBe('Error')
    expect(ref.current).toBeTruthy()
    expect(typeof ref.current!.reset).toBe('function')

    shouldThrow = false
    act(() => {
      ref.current!.reset()
      tree.update(<Wrapper />)
    })

    expect(tree.root.findByType(Text).props.children).toBe('Recovered')
  })

  it('calls onReset when reset is triggered', () => {
    const onReset = jest.fn()
    const ref = React.createRef<ErrorBoundaryRef>()

    renderer.create(
      <ErrorBoundary ref={ref} onReset={onReset} fallback={<Text>Error</Text>}>
        <ThrowError shouldThrow />
      </ErrorBoundary>,
    )

    act(() => {
      ref.current!.reset()
    })

    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('has correct displayName', () => {
    expect(ErrorBoundary.displayName).toBe('ErrorBoundary')
  })
})
