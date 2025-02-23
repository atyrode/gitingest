import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const usePageTracking = () => {
  const location = useLocation()
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window.posthog) {
      window.posthog.capture('$pageview', {
        path: location.pathname,
        url: window.location.href,
        referrer: document.referrer,
      })
    }
  }, [location])
}
