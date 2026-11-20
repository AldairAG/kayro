import type { ApiResponseDto, AuthRequestDto, AuthResponseDto } from '../domain/auth.dto'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '')

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isApiResponse(value: unknown): value is ApiResponseDto<AuthResponseDto> {
  if (!isRecord(value)) {
    return false
  }

  const data = value.data

  return (
    typeof value.success === 'boolean' &&
    (data === null ||
      (isRecord(data) &&
        typeof data.token === 'string' &&
        typeof data.email === 'string' &&
        typeof data.id === 'number'))
  )
}

async function postAuthRequest(
  endpoint: '/login' | '/registro',
  request: AuthRequestDto,
): Promise<AuthResponseDto> {
  const response = await fetch(`${apiBaseUrl}/api/auth${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new Error(
      response.ok
        ? 'El servidor devolvió una respuesta de autenticación inválida.'
        : `No fue posible completar la solicitud (HTTP ${response.status}).`,
    )
  }

  if (!isApiResponse(payload)) {
    throw new Error('El servidor devolvió una respuesta de autenticación inválida.')
  }

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || `No fue posible completar la solicitud (HTTP ${response.status}).`)
  }

  return payload.data
}

export function login(request: AuthRequestDto): Promise<AuthResponseDto> {
  return postAuthRequest('/login', request)
}

export function register(request: AuthRequestDto): Promise<AuthResponseDto> {
  return postAuthRequest('/registro', request)
}
