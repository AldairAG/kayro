export type AuthRequestDto = {
  email: string
  password: string
  nombre?: string
  username?: string
  rol?: 'USUARIO' | 'ADMINISTRADOR'
}

export type AuthResponseDto = {
  token: string
  type: string
  id: number
  email: string
}

export type ApiResponseDto<T> = {
  success: boolean
  data: T | null
  message: string | null
  codeError: string | null
}
