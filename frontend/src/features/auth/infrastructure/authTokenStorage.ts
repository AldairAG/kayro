const authTokenKey = 'kayro.auth.token'

export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem(authTokenKey) ?? sessionStorage.getItem(authTokenKey)
}

export function storeAuthToken(token: string, remember: boolean): void {
  localStorage.removeItem(authTokenKey)
  sessionStorage.removeItem(authTokenKey)

  if (remember) {
    localStorage.setItem(authTokenKey, token)
  } else {
    sessionStorage.setItem(authTokenKey, token)
  }
}

export function clearStoredAuthToken(): void {
  localStorage.removeItem(authTokenKey)
  sessionStorage.removeItem(authTokenKey)
}
