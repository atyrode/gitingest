import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { usePageTracking } from './hooks/usePageTracking'

// Temporary placeholder component until we implement the actual components
const MainContent = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Gitingest</h1>
      <p className="mt-4 text-gray-600">
        Coming soon: Analyze and explore Git repositories
      </p>
    </div>
  </div>
)

const ErrorFallback = () => (
  <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="max-w-max mx-auto">
      <div className="sm:flex">
        <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">500</p>
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Something went wrong
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Please try refreshing the page or contact support if the problem persists.
            </p>
          </div>
          <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Refresh page
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  usePageTracking()

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Routes>
        <Route path="/" element={<MainContent />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
