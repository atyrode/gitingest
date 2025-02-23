export const getCsrfToken = (): string | undefined => {
  return document
    .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
    ?.content
}

export const addCsrfHeader = (headers: Headers): Headers => {
  const token = getCsrfToken()
  if (token) {
    headers.append('X-CSRF-Token', token)
  }
  return headers
}

export const createHeaders = (contentType = 'application/json'): Headers => {
  const headers = new Headers({
    'Content-Type': contentType,
  })
  return addCsrfHeader(headers)
}
