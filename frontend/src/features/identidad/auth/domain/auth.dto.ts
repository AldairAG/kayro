export type AuthRequestDto = {
  email: string
  password: string
  nombre?: string
  username?: string
  patrocinador?: string
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
  username: string
}

