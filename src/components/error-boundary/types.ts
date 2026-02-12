import type React from 'react'

export interface ErrorBoundaryProps {
  /** Fallback UI when an error is caught. Can be a ReactNode or a render function */
  fallback?: React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode)
  /** Callback when an error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  /** Callback when the error state is reset */
  onReset?: () => void
  /** Children to render */
  children?: React.ReactNode
}

export interface ErrorBoundaryState {
  error: Error | null
}

export interface ErrorBoundaryRef {
  /** Reset the error boundary to re-render children */
  reset: () => void
}
