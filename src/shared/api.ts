const BASE_URL = import.meta.env.PROD ? 'https://api.sailormoonmuseum.com' : 'http://localhost:8080'

function getCsrfToken(): string | undefined {
  return document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
    ?.split('=')[1]
}

function buildHeaders(options?: RequestInit['headers'], body?: RequestInit['body']) {
  const base: Record<string, string> = {}

  if (!(body instanceof FormData)) {
    base['Content-Type'] = 'application/json'
  }

  if (options instanceof Headers) {
    options.forEach((value, key) => {
      base[key] = value
    })
  } else if (Array.isArray(options)) {
    options.forEach(([key, value]) => {
      base[key] = value
    })
  } else if (options) {
    Object.assign(base, options)
  }

  const csrfToken = getCsrfToken()
  if (csrfToken) {
    base['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken)
  }

  return base
}

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}) {
  const headers = buildHeaders(options.headers, options.body)

  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw { status: response.status, ...errorBody }
  }

  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}
