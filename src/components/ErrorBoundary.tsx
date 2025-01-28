// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  componentName?: string // Ensure this prop is included
}

interface ErrorBoundaryState {
  hasError: boolean
  errorMessage?: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            border: '2px solid red',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'rgba(255, 215, 215, 0.2)',
            color: '#d9534f',
            textAlign: 'center',
            margin: '20px',
          }}
        >
          <h1 style={{ margin: '0', fontSize: '24px' }}>
            Error in {this.props.componentName || 'Component'}
          </h1>
          <p style={{ margin: '10px 0', fontSize: '16px' }}>
            {this.state.errorMessage}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
