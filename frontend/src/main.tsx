import { QueryClient } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AppProviders } from './providers/AppProviders'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: (failureCount: number, error: unknown) => {
        if (error instanceof Error && error.name === 'RateLimitError') {
          return false
        }
        return failureCount < 3
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders queryClient={queryClient}>
      <App />
    </AppProviders>
  </React.StrictMode>
)
