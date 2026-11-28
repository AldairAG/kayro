export const routes = {
  home: 'landing',
  auth: {
    login: 'login',
    register: 'register',
    forgotPassword: 'forgot-password',
  },
  usuario: {
    perfil: 'perfil',
    red: 'red',
    licencias: 'licencias',
  },
  admin: {
    usuarios: 'usuarios',
    pagos: 'pagos',
  },
} as const