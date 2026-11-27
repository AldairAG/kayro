export type Perfil = {
  id?: number
  username?: string
  email?: string
  nombre: string
  apellidos: string
  telefono: string
  pais: string
  lada: string
}

export type PerfilFormValues = Pick<
  Perfil,
  'nombre' | 'apellidos' | 'telefono' | 'pais' | 'lada'
>