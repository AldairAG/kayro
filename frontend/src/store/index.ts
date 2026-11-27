import { configureStore } from '@reduxjs/toolkit'
import { apiBase } from '../app/api/apiBase'
import authReducer from '../features/identidad/auth/store/auth.slice'
import perfilReducer from '../features/identidad/perfil/store/perfil.slice'
import redReducer from '../features/identidad/red/store/red.slice'
import usuarioReducer from '../features/identidad/usuario/store/usuario.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    perfil: perfilReducer,
    red: redReducer,
    usuario: usuarioReducer,
  },
})

apiBase.setStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
