import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthRequestDto, AuthResponseDto } from '../../domain/auth.dto'
import { login as loginRequest } from '../../infrastructure/authApi'
import { storeAuthToken } from '../../infrastructure/authTokenStorage'

type LoginCredentials = AuthRequestDto & { remember: boolean }

export const loginUser = createAsyncThunk<
  AuthResponseDto,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async ({ remember, ...credentials }, { rejectWithValue }) => {
  try {
    const session = await loginRequest(credentials)
    storeAuthToken(session.token, remember)
    return session
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ocurrió un error al iniciar sesión.',
    )
  }
})
