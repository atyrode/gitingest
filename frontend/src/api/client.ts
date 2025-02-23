import { createHeaders } from '../utils/csrf'

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RateLimitError'
  }
}

import { ProcessRepositoryResponse } from '../types/api'

const DEFAULT_TIMEOUT = 30000 // 30 seconds

export const processRepository = async (
  url: string,
  timeout: number = DEFAULT_TIMEOUT
): Promise<ProcessRepositoryResponse> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({ url }),
      signal: controller.signal,
    })

    if (!response.ok) {
      if (response.status === 429) {
        throw new RateLimitError('Too many requests. Please try again later.')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error
    }
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out')
      }
      throw error
    }
    throw new Error('An unexpected error occurred')
  } finally {
    clearTimeout(timeoutId)
  }
}

export const getGitHubStars = async (): Promise<number> => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/saoudrizwan/gitingest',
      {
        headers: createHeaders(),
      }
    )

    if (!response.ok) {
      return 0
    }

    const data = await response.json()
    return data.stargazers_count || 0
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error)
    return 0
  }
}
