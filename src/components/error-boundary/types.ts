import type React from 'react'

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onReset?: () => void
  children?: React.ReactNode
}

export interface ErrorBoundaryState {
  error: Error | null
}

export interface ErrorBoundaryRef {
  reset: () => void
}
