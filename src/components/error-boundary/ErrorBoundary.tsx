import React from 'react'
import type { ErrorBoundaryProps, ErrorBoundaryRef, ErrorBoundaryState } from './types'

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps & { forwardedRef?: React.Ref<ErrorBoundaryRef> }, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps & { forwardedRef?: React.Ref<ErrorBoundaryRef> }) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { error } }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void { this.props.onError?.(error, errorInfo) }
  componentDidMount(): void { this.bindRef() }
  componentDidUpdate(): void { this.bindRef() }
  private bindRef(): void { const { forwardedRef } = this.props; if (!forwardedRef) return; const refVal: ErrorBoundaryRef = { reset: this.reset }; if (typeof forwardedRef === 'function') forwardedRef(refVal); else if (forwardedRef && typeof forwardedRef === 'object') (forwardedRef as React.MutableRefObject<ErrorBoundaryRef | null>).current = refVal }
  reset = (): void => { this.props.onReset?.(); this.setState({ error: null }) }
  render(): React.ReactNode { const { error } = this.state; const { fallback, children } = this.props; if (error !== null) { if (typeof fallback === 'function') return fallback(error, this.reset); if (fallback !== undefined) return fallback; return null }; return children ?? null }
}

const ErrorBoundary = React.forwardRef<ErrorBoundaryRef, ErrorBoundaryProps>((props, ref) => <ErrorBoundaryClass {...props} forwardedRef={ref} />)
ErrorBoundary.displayName = 'ErrorBoundary'
export { ErrorBoundary }
export type { ErrorBoundaryProps, ErrorBoundaryRef } from './types'
export default ErrorBoundary
