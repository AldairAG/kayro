import { configureStore } from '@reduxjs/toolkit'
import { apiBase } from '../app/api/apiBase'
import authReducer from '../features/auth/store/auth.slice'
import perfilReducer from '../features/perfil/store/perfil.slice'
import redReducer from '../features/red/store/red.slice'
import usuarioReducer from '../features/usuario/store/usuario.slice'

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
