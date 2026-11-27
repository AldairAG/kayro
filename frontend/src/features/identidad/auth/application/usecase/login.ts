import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthSessionDto, LoginRequestDto } from '../../domain/auth.dto'
import { login as loginRequest } from '../../infrastructure/authApi'
import { storeAuthToken } from '../../infrastructure/authTokenStorage'
import { getRoleFromJwt } from '../../infrastructure/jwtRole'

type LoginCredentials = LoginRequestDto & { remember: boolean }

export const loginUser = createAsyncThunk<
  AuthSessionDto,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async ({ remember, ...credentials }, { rejectWithValue }) => {
  try {
    const response = await loginRequest(credentials)
    const session = {
      ...response.data,
      username: credentials.username,
      rol: getRoleFromJwt(response.data.token),
    }
    storeAuthToken(session.token, remember)
    return session
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al iniciar sesión.',
    )
  }
})
