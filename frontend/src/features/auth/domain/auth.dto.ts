export type AuthRequestDto = {
  email: string
  password: string
  nombre?: string
  username?: string
  rol?: 'USUARIO' | 'ADMINISTRADOR'
}

export type LoginRequestDto = {
  username: string
  password: string
}

export type AuthResponseDto = {
  token: string
  type: string
  id: number
  email: string
}

export type AuthSessionDto = AuthResponseDto & {
  rol: string | null
}

