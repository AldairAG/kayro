import type { AuthRequestDto, AuthResponseDto, LoginRequestDto } from '../domain/auth.dto'
import { apiBase } from '../../../../app/api/apiBase'
import type { ApiResponse } from '../../../../app/api/apiTypes'

export function login(request: LoginRequestDto): Promise<ApiResponse<AuthResponseDto>> {
  return apiBase.post<AuthResponseDto>('/auth/login', request)
}

export function register(request: AuthRequestDto): Promise<ApiResponse<AuthResponseDto>> {
  return apiBase.post<AuthResponseDto>('/auth/registro', request)
}
